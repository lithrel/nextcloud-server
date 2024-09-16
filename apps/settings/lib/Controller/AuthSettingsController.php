<?php

/**
 * SPDX-FileCopyrightText: 2019-2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-FileCopyrightText: 2016 ownCloud, Inc.
 * SPDX-License-Identifier: AGPL-3.0-only
 */
namespace OCA\Settings\Controller;

use BadMethodCallException;
use OC\Authentication\Exceptions\InvalidTokenException as OcInvalidTokenException;
use OC\Authentication\Exceptions\PasswordlessTokenException;
use OC\Authentication\Token\INamedToken;
use OC\Authentication\Token\IProvider;
use OC\Authentication\Token\RemoteWipe;
use OCA\Settings\Activity\Provider;
use OCP\Activity\IManager;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\Attribute\PasswordConfirmationRequired;
use OCP\AppFramework\Http\JSONResponse;
use OCP\Authentication\Exceptions\ExpiredTokenException;
use OCP\Authentication\Exceptions\InvalidTokenException;
use OCP\Authentication\Exceptions\WipeTokenException;
use OCP\Authentication\Token\IToken;
use OCP\IRequest;
use OCP\ISession;
use OCP\IUserSession;
use OCP\Security\ISecureRandom;
use OCP\Session\Exceptions\SessionNotAvailableException;
use Psr\Log\LoggerInterface;

class AuthSettingsController extends Controller {
	/** @var IProvider */
	private $tokenProvider;

	/** @var ISession */
	private $session;

	/** @var IUserSession */
	private $userSession;

	/** @var string */
	private $uid;

	/** @var ISecureRandom */
	private $random;

	/** @var IManager */
	private $activityManager;

	/** @var RemoteWipe */
	private $remoteWipe;

	/** @var LoggerInterface */
	private $logger;

	/**
	 * @param string $appName
	 * @param IRequest $request
	 * @param IProvider $tokenProvider
	 * @param ISession $session
	 * @param ISecureRandom $random
	 * @param string|null $userId
	 * @param IUserSession $userSession
	 * @param IManager $activityManager
	 * @param RemoteWipe $remoteWipe
	 * @param LoggerInterface $logger
	 */
	public function __construct(string $appName,
		IRequest $request,
		IProvider $tokenProvider,
		ISession $session,
		ISecureRandom $random,
		?string $userId,
		IUserSession $userSession,
		IManager $activityManager,
		RemoteWipe $remoteWipe,
		LoggerInterface $logger) {
		parent::__construct($appName, $request);
		$this->tokenProvider = $tokenProvider;
		$this->uid = $userId;
		$this->userSession = $userSession;
		$this->session = $session;
		$this->random = $random;
		$this->activityManager = $activityManager;
		$this->remoteWipe = $remoteWipe;
		$this->logger = $logger;
	}

	/**
	 * @NoSubAdminRequired
	 *
	 * @param string $name
	 * @return JSONResponse
	 */
	#[NoAdminRequired]
	#[PasswordConfirmationRequired]
	public function create($name) {
		if ($this->checkAppToken()) {
			return $this->getServiceNotAvailableResponse();
		}

		try {
			$sessionId = $this->session->getId();
		} catch (SessionNotAvailableException $ex) {
			return $this->getServiceNotAvailableResponse();
		}
		if ($this->userSession->getImpersonatingUserID() !== null) {
			return $this->getServiceNotAvailableResponse();
		}

		try {
			$sessionToken = $this->tokenProvider->getToken($sessionId);
			$loginName = $sessionToken->getLoginName();
			try {
				$password = $this->tokenProvider->getPassword($sessionToken, $sessionId);
			} catch (PasswordlessTokenException $ex) {
				$password = null;
			}
		} catch (InvalidTokenException $ex) {
			return $this->getServiceNotAvailableResponse();
		}

		if (mb_strlen($name) > 128) {
			$name = mb_substr($name, 0, 120) . '…';
		}

		$token = $this->generateRandomDeviceToken();
		$deviceToken = $this->tokenProvider->generateToken($token, $this->uid, $loginName, $password, $name, IToken::PERMANENT_TOKEN);
		$tokenData = $deviceToken->jsonSerialize();
		$tokenData['canDelete'] = true;
		$tokenData['canRename'] = true;

		$this->publishActivity(Provider::APP_TOKEN_CREATED, $deviceToken->getId(), ['name' => $deviceToken->getName()]);

		return new JSONResponse([
			'token' => $token,
			'loginName' => $loginName,
			'deviceToken' => $tokenData,
		]);
	}

	/**
	 * @return JSONResponse
	 */
	private function getServiceNotAvailableResponse() {
		$resp = new JSONResponse();
		$resp->setStatus(Http::STATUS_SERVICE_UNAVAILABLE);
		return $resp;
	}

	/**
	 * Return a 25 digit device password
	 *
	 * Example: AbCdE-fGhJk-MnPqR-sTwXy-23456
	 *
	 * @return string
	 */
	private function generateRandomDeviceToken() {
		$groups = [];
		for ($i = 0; $i < 5; $i++) {
			$groups[] = $this->random->generate(5, ISecureRandom::CHAR_HUMAN_READABLE);
		}
		return implode('-', $groups);
	}

	private function checkAppToken(): bool {
		return $this->session->exists('app_password');
	}

	/**
	 * @NoSubAdminRequired
	 *
	 * @param int $id
	 * @return array|JSONResponse
	 */
	#[NoAdminRequired]
	#[PasswordConfirmationRequired]
	public function destroy($id) {
		if ($this->checkAppToken()) {
			return new JSONResponse([], Http::STATUS_BAD_REQUEST);
		}

		try {
			$token = $this->findTokenByIdAndUser($id);
		} catch (WipeTokenException $e) {
			//continue as we can destroy tokens in wipe
			$token = $e->getToken();
		} catch (InvalidTokenException $e) {
			return new JSONResponse([], Http::STATUS_NOT_FOUND);
		}

		$this->tokenProvider->invalidateTokenById($this->uid, $token->getId());
		$this->publishActivity(Provider::APP_TOKEN_DELETED, $token->getId(), ['name' => $token->getName()]);
		return [];
	}

	/**
	 * @NoSubAdminRequired
	 *
	 * @param int $id
	 * @param array $scope
	 * @param string $name
	 * @return array|JSONResponse
	 */
	#[NoAdminRequired]
	#[PasswordConfirmationRequired]
	public function update($id, array $scope, string $name) {
		if ($this->checkAppToken()) {
			return new JSONResponse([], Http::STATUS_BAD_REQUEST);
		}

		try {
			$token = $this->findTokenByIdAndUser($id);
		} catch (InvalidTokenException $e) {
			return new JSONResponse([], Http::STATUS_NOT_FOUND);
		}

		$currentName = $token->getName();

		if ($scope !== $token->getScopeAsArray()) {
			$token->setScope([IToken::SCOPE_FILESYSTEM => $scope[IToken::SCOPE_FILESYSTEM]]);
			$this->publishActivity($scope[IToken::SCOPE_FILESYSTEM] ? Provider::APP_TOKEN_FILESYSTEM_GRANTED : Provider::APP_TOKEN_FILESYSTEM_REVOKED, $token->getId(), ['name' => $currentName]);
		}

		if (mb_strlen($name) > 128) {
			$name = mb_substr($name, 0, 120) . '…';
		}

		if ($token instanceof INamedToken && $name !== $currentName) {
			$token->setName($name);
			$this->publishActivity(Provider::APP_TOKEN_RENAMED, $token->getId(), ['name' => $currentName, 'newName' => $name]);
		}

		$this->tokenProvider->updateToken($token);
		return [];
	}

	/**
	 * @param string $subject
	 * @param int $id
	 * @param array $parameters
	 */
	private function publishActivity(string $subject, int $id, array $parameters = []): void {
		$event = $this->activityManager->generateEvent();
		$event->setApp('settings')
			->setType('security')
			->setAffectedUser($this->uid)
			->setAuthor($this->uid)
			->setSubject($subject, $parameters)
			->setObject('app_token', $id, 'App Password');

		try {
			$this->activityManager->publish($event);
		} catch (BadMethodCallException $e) {
			$this->logger->warning('could not publish activity', ['exception' => $e]);
		}
	}

	/**
	 * Find a token by given id and check if uid for current session belongs to this token
	 *
	 * @param int $id
	 * @return IToken
	 * @throws InvalidTokenException
	 */
	private function findTokenByIdAndUser(int $id): IToken {
		try {
			$token = $this->tokenProvider->getTokenById($id);
		} catch (ExpiredTokenException $e) {
			$token = $e->getToken();
		}
		if ($token->getUID() !== $this->uid) {
			/** @psalm-suppress DeprecatedClass We have to throw the OC version so both OC and OCP catches catch it */
			throw new OcInvalidTokenException('This token does not belong to you!');
		}
		return $token;
	}

	/**
	 * @NoSubAdminRequired
	 *
	 * @param int $id
	 * @return JSONResponse
	 * @throws InvalidTokenException
	 * @throws ExpiredTokenException
	 */
	#[NoAdminRequired]
	#[PasswordConfirmationRequired]
	public function wipe(int $id): JSONResponse {
		if ($this->checkAppToken()) {
			return new JSONResponse([], Http::STATUS_BAD_REQUEST);
		}

		try {
			$token = $this->findTokenByIdAndUser($id);
		} catch (InvalidTokenException $e) {
			return new JSONResponse([], Http::STATUS_NOT_FOUND);
		}

		if (!$this->remoteWipe->markTokenForWipe($token)) {
			return new JSONResponse([], Http::STATUS_BAD_REQUEST);
		}

		return new JSONResponse([]);
	}
}
