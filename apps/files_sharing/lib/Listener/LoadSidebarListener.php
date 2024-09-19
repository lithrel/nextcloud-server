<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Files_Sharing\Listener;

use OCA\Files\Event\LoadSidebar;
use OCA\Files_Sharing\AppInfo\Application;
use OCP\AppFramework\Services\IInitialState;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;
use OCP\Share\IManager;
use OCP\Util;

/**
 * @template-implements IEventListener<LoadSidebar>
 */
class LoadSidebarListener implements IEventListener {

	public function __construct(
		private IInitialState $initialState,
		private IManager $shareManager,
	) {
	}

	public function handle(Event $event): void {
		if (!($event instanceof LoadSidebar)) {
			return;
		}

		Util::addScript(Application::APP_ID, 'files_sharing_tab', 'files');
	}
}
