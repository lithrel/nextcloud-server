"use strict";(self.webpackChunknextcloud=self.webpackChunknextcloud||[]).push([[3609],{19595:function(e,t,i){i.d(t,{Z:function(){return l}});var n={name:"ClockIcon",emits:["click"],props:{title:{type:String},fillColor:{type:String,default:"currentColor"},size:{type:Number,default:24}}},l=(0,i(51900).Z)(n,(function(){var e=this,t=e._self._c;return t("span",e._b({staticClass:"material-design-icon clock-icon",attrs:{"aria-hidden":!e.title,"aria-label":e.title,role:"img"},on:{click:function(t){return e.$emit("click",t)}}},"span",e.$attrs,!1),[t("svg",{staticClass:"material-design-icon__svg",attrs:{fill:e.fillColor,width:e.size,height:e.size,viewBox:"0 0 24 24"}},[t("path",{attrs:{d:"M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.9L16.2,16.2Z"}},[e.title?t("title",[e._v(e._s(e.title))]):e._e()])])])}),[],!1,null,null,null).exports},63609:function(e,t,i){i.r(t),i.d(t,{default:function(){return R}});var n=i(20144),l=i(79855),a=i(30050),o=i(31352),r=i(67242),s=i(62520),c=i(41861),u=i(20404),d=i(23873),p=i(5656),f=i(34829),m=i(15764),h=i(61149),y=i(19595),v=i(82675),g=i(93234),w=i(4777),_=i(74139),k=i(37487),b=i(79753),S=i(25108);const F=(0,a.n)({},(function(){return this._self._c,this._m(0)}),[function(){var e=this._self._c;return e("tr",{staticClass:"file-picker__row loading-row",attrs:{"aria-hidden":"true"}},[e("td",{staticClass:"row-checkbox"},[e("span")]),e("td",{staticClass:"row-name"},[e("span")]),e("td",{staticClass:"row-size"},[e("span")]),e("td",{staticClass:"row-modified"},[e("span")])])}],!1,null,"fc67157c",null,null).exports,C={long:(0,c.t)("a few seconds ago"),short:(0,c.t)("seconds ago"),narrow:(0,c.t)("sec. ago")},N=(0,n.defineComponent)({name:"NcDatetime",props:{timestamp:{type:[Date,Number],required:!0},format:{type:Object,default:()=>({timeStyle:"medium",dateStyle:"short"})},relativeTime:{type:[Boolean,String],default:"long",validator:e=>!1===e||["long","short","narrow"].includes(e)},ignoreSeconds:{type:Boolean,default:!1}},data(){return{currentTime:Date.now(),intervalId:void 0}},computed:{dateObject(){return new Date(this.timestamp)},formattedTime(){if(!1!==this.relativeTime){const e=new Intl.RelativeTimeFormat((0,o.aj)(),{numeric:"auto",style:this.relativeTime}),t=(this.dateObject.valueOf()-this.currentTime)/1e3;if(Math.abs(t)<=90)return this.ignoreSeconds?C[this.relativeTime]:e.format(Math.round(t),"second");const i=t/60;if(Math.abs(i)<=90)return e.format(Math.round(i),"minute");const n=i/60;if(Math.abs(n)<=72)return e.format(Math.round(n),"hour");const l=n/24;if(Math.abs(l)<=6)return e.format(Math.round(l),"day");const a=l/7;return Math.abs(a)<=52?e.format(Math.round(a),"week"):e.format(Math.round(l/365),"year")}return this.formattedFullTime},formattedFullTime(){return new Intl.DateTimeFormat((0,o.aj)(),this.format).format(this.dateObject)}},watch:{relativeTime(e){window.clearInterval(this.intervalId),this.intervalId=void 0,e&&(this.intervalId=window.setInterval(this.setCurrentTime,1e3))}},mounted(){!1!==this.relativeTime&&(this.intervalId=window.setInterval(this.setCurrentTime,1e3))},destroyed(){window.clearInterval(this.intervalId)},methods:{setCurrentTime(){this.currentTime=Date.now()}}}),x=(0,a.n)(N,(function(){var e=this,t=e._self._c;return e._self._setupProxy,t("span",{staticClass:"nc-datetime",attrs:{"data-timestamp":e.timestamp,title:e.formattedFullTime}},[e._v(e._s(e.formattedTime))])}),[],!1,null,null,null,null).exports,B=(0,n.defineComponent)({__name:"FileListRow",props:{allowPickDirectory:{type:Boolean},selected:{type:Boolean},canPick:{type:Boolean},node:null},emits:["update:selected","enter-directory"],setup(e,{emit:t}){const i=e,l=(0,n.computed)((()=>{var e;return(null==(e=i.node.attributes)?void 0:e.displayName)||i.node.basename.slice(0,i.node.extension?-i.node.extension.length:void 0)})),a=(0,n.computed)((()=>i.node.extension)),o=(0,n.computed)((()=>i.canPick&&(i.allowPickDirectory||"httpd/unix-directory"!==i.node.mime))),s=(0,n.computed)((()=>"url(".concat(window.OC.MimeType.getIconUrl(i.node.mime),")")));function u(){t("update:selected",!i.selected)}function d(){"httpd/unix-directory"===i.node.mime?t("enter-directory",i.node):u()}return{__sfc:!0,props:i,emit:t,displayName:l,fileExtension:a,isPickable:o,backgroundImage:s,toggleSelected:u,handleClick:d,handleKeyDown:function(e){"enter"===e.key&&d()},formatFileSize:p.sS,NcCheckboxRadioSwitch:r.rw,t:c.t,NcDatetime:x}}}),I=(0,a.n)(B,(function(){var e=this,t=e._self._c,i=e._self._setupProxy;return t("tr",{staticClass:"file-picker__row",attrs:{tabindex:"0"},on:{"key-down":i.handleKeyDown}},[t("td",{staticClass:"row-checkbox"},[t(i.NcCheckboxRadioSwitch,{attrs:{disabled:!i.isPickable,checked:e.selected,"aria-label":i.t("Select the row for {nodename}",{nodename:i.displayName})},on:{"update:checked":i.toggleSelected}})],1),t("td",{staticClass:"row-name",on:{click:i.handleClick}},[t("div",{staticClass:"file-picker__name-container"},[t("div",{staticClass:"file-picker__file-icon",style:{backgroundImage:i.backgroundImage}}),t("div",{staticClass:"file-picker__file-name",attrs:{title:i.displayName},domProps:{textContent:e._s(i.displayName)}}),t("div",{staticClass:"file-picker__file-extension",domProps:{textContent:e._s(i.fileExtension)}})])]),t("td",{staticClass:"row-size"},[e._v(" "+e._s(i.formatFileSize(e.node.size||0))+" ")]),t("td",{staticClass:"row-modified"},[e.node.mtime?t(i.NcDatetime,{attrs:{timestamp:e.node.mtime,"ignore-seconds":!0}}):t("span",[e._v(e._s(i.t("Unset")))])],1)])}),[],!1,null,"5e91572e",null,null).exports,P=(0,n.defineComponent)({__name:"FileList",props:{multiselect:{type:Boolean},allowPickDirectory:{type:Boolean},loading:{type:Boolean},files:null,selectedFiles:null,path:null},emits:["update:path","update:selectedFiles"],setup(e,{emit:t}){const i=e,l=(0,n.ref)(void 0),a=(0,n.ref)(void 0),p=(0,n.ref)(void 0),f={ascending:(e,t,i)=>i(e,t),descending:(e,t,i)=>i(t,e),none:(e,t,i)=>0},m=(e,t)=>t.basename.localeCompare(e.basename,(0,o.aj)()),h=(e,t)=>(t.size||0)-(e.size||0),y=(e,t)=>{var i,n;return((null==(i=e.mtime)?void 0:i.getTime())||0)-((null==(n=t.mtime)?void 0:n.getTime())||0)},v=e=>{"ascending"===e.value?e.value="descending":"descending"===e.value?e.value=void 0:e.value="ascending"},g=(0,n.computed)((()=>{const e=i.files.sort(((e,t)=>f[l.value||"none"](e,t,m)||f[a.value||"none"](e,t,h)||f[p.value||"none"](e,t,y)));return S.warn("files sorted"),e})),w=(0,n.computed)((()=>i.files.filter((e=>i.allowPickDirectory||"https/unix-directory"!==e.mime)))),_=(0,n.computed)((()=>!i.loading&&i.selectedFiles.length>=w.value.length));return{__sfc:!0,props:i,emit:t,sortByName:l,sortBySize:a,sortByModified:p,ordering:f,byName:m,bySize:h,byDate:y,toggleSorting:v,toggleSortByName:()=>v(l),toggleSortBySize:()=>v(a),toggleSortByModified:()=>v(p),sortedFiles:g,selectableFiles:w,allSelected:_,onSelectAll:function(){i.selectedFiles.length<w.value.length?t("update:selectedFiles",w.value):t("update:selectedFiles",[])},onNodeSelected:function(e){i.selectedFiles.includes(e)?t("update:selectedFiles",i.selectedFiles.filter((t=>t.path!==e.path))):t("update:selectedFiles",[...i.selectedFiles,e])},onChangeDirectory:function(e){t("update:path",(0,s.join)(i.path,e.basename))},NcButton:r.P2,NcCheckboxRadioSwitch:r.rw,t:c.t,IconSortAscending:u.Z,IconSortDescending:d.Z,LoadingTableRow:F,FileListRow:I}}}),D=(0,a.n)(P,(function(){var e=this,t=e._self._c,i=e._self._setupProxy;return t("div",{staticClass:"file-picker__files"},[t("table",[t("thead",[t("tr",[t("th",{staticClass:"row-checkbox"},[t("span",{staticClass:"hidden-visually"},[e._v(" "+e._s(i.t("Select entry"))+" ")]),i.props.multiselect?t(i.NcCheckboxRadioSwitch,{attrs:{"aria-label":i.t("Select all entries"),checked:i.allSelected},on:{"update:checked":i.onSelectAll}}):e._e()],1),t("th",{staticClass:"row-name",attrs:{"aria-sort":i.sortByName}},[t(i.NcButton,{attrs:{wide:!0,type:"tertiary"},on:{click:i.toggleSortByName},scopedSlots:e._u([{key:"icon",fn:function(){return["ascending"===i.sortByName?t(i.IconSortAscending,{attrs:{size:20}}):"descending"===i.sortByName?t(i.IconSortDescending,{attrs:{size:20}}):t("span",{staticStyle:{width:"44px"}})]},proxy:!0}])},[e._v(" "+e._s(i.t("Name"))+" ")])],1),t("th",{staticClass:"row-size",attrs:{"aria-sort":i.sortBySize}},[t(i.NcButton,{attrs:{wide:!0,type:"tertiary"},on:{click:i.toggleSortBySize},scopedSlots:e._u([{key:"icon",fn:function(){return["ascending"===i.sortBySize?t(i.IconSortAscending,{attrs:{size:20}}):"descending"===i.sortBySize?t(i.IconSortDescending,{attrs:{size:20}}):t("span",{staticStyle:{width:"44px"}})]},proxy:!0}])},[e._v(" "+e._s(i.t("Size"))+" ")])],1),t("th",{staticClass:"row-modified",attrs:{"aria-sort":i.sortByModified}},[t(i.NcButton,{attrs:{wide:!0,type:"tertiary"},on:{click:i.toggleSortByModified},scopedSlots:e._u([{key:"icon",fn:function(){return["ascending"===i.sortByModified?t(i.IconSortAscending,{attrs:{size:20}}):"descending"===i.sortByModified?t(i.IconSortDescending,{attrs:{size:20}}):t("span",{staticStyle:{width:"44px"}})]},proxy:!0}])},[e._v(" "+e._s(i.t("Modified"))+" ")])],1)])]),t("tbody",[e.loading?e._l([1,2,3,4],(function(e){return t(i.LoadingTableRow,{key:e})})):e._l(i.sortedFiles,(function(n){return t(i.FileListRow,{key:n.fileid||n.path,attrs:{"allow-pick-directory":e.allowPickDirectory,"can-pick":e.multiselect||0===e.selectedFiles.length||e.selectedFiles.includes(n),selected:e.selectedFiles.includes(n),node:n},on:{"update:selected":function(e){return i.onNodeSelected(n)},"enter-directory":i.onChangeDirectory}})}))],2)])])}),[],!1,null,"063ffa4f",null,null).exports,z=(0,n.defineComponent)({__name:"FilePickerBreadcrumbs",props:{path:null,showMenu:{type:Boolean}},emits:["update:path","create-node"],setup(e,{emit:t}){const i=e,l=(0,n.ref)(""),a=(0,n.ref)();function o(){var e,t,i,n;const o=l.value.trim(),r=null==(t=null==(e=a.value)?void 0:e.$el)?void 0:t.querySelector("input");let s="";return 0===o.length?s=(0,c.t)("File name cannot be empty."):o.includes("/")?s=(0,c.t)('"/" is not allowed inside a file name.'):["..","."].includes(o)?s=(0,c.t)('"{name}" is an invalid file name.',{name:o}):null!=(i=window.OC.config)&&i.blacklist_files_regex&&o.match(null==(n=window.OC.config)?void 0:n.blacklist_files_regex)&&(s=(0,c.t)('"{name}" is not an allowed filetype',{name:o})),r&&r.setCustomValidity(s),""===s}const s=(0,n.computed)((()=>i.path.split("/").filter((e=>""!==e)).map(((e,t,i)=>({name:e,path:"/"+i.slice(0,t+1).join("/")})))));return{__sfc:!0,props:i,emit:t,newNodeName:l,nameInput:a,validateInput:o,onSubmit:function(){const e=l.value.trim();o()&&(t("create-node",e),l.value="")},pathElements:s,IconFolder:f.default,IconHome:m.Z,IconPlus:h.Z,NcActions:r.O3,NcActionInput:r.Iw,NcBreadcrumbs:r.fg,NcBreadcrumb:r.$U,t:c.t}}}),T=(0,a.n)(z,(function(){var e=this,t=e._self._c,i=e._self._setupProxy;return t(i.NcBreadcrumbs,{staticClass:"file-picker__breadcrumbs",scopedSlots:e._u([{key:"default",fn:function(){return[t(i.NcBreadcrumb,{attrs:{name:i.t("Home"),title:i.t("Home")},on:{click:function(e){return i.emit("update:path","/")}},scopedSlots:e._u([{key:"icon",fn:function(){return[t(i.IconHome,{attrs:{size:20}})]},proxy:!0}])}),e._l(i.pathElements,(function(e){return t(i.NcBreadcrumb,{key:e.path,attrs:{name:e.name,title:e.path},on:{click:function(t){return i.emit("update:path",e.path)}}})}))]},proxy:!0},e.showMenu?{key:"actions",fn:function(){return[t(i.NcActions,{attrs:{"aria-label":i.t("Create directory"),"force-menu":!0,"force-title":!0,"menu-title":i.t("New"),type:"secondary"},on:{close:function(e){i.newNodeName=""}},scopedSlots:e._u([{key:"icon",fn:function(){return[t(i.IconPlus,{attrs:{size:20}})]},proxy:!0}],null,!1,2971667417)},[t(i.NcActionInput,{ref:"nameInput",attrs:{value:i.newNodeName,label:i.t("New folder"),placeholder:i.t("New folder name")},on:{"update:value":function(e){i.newNodeName=e},submit:i.onSubmit,input:i.validateInput},scopedSlots:e._u([{key:"icon",fn:function(){return[t(i.IconFolder,{attrs:{size:20}})]},proxy:!0}],null,!1,1614167509)})],1)]},proxy:!0}:null],null,!0)})}),[],!1,null,"5782a1a4",null,null).exports,M=(0,n.defineComponent)({__name:"FilePickerNavigation",props:{currentView:null,filterString:null,isCollapsed:{type:Boolean}},emits:["update:currentView","update:filterString"],setup(e,{emit:t}){const i=e,l=[{id:"files",label:(0,c.t)("All files"),icon:f.default},{id:"recent",label:(0,c.t)("Recent"),icon:y.Z},{id:"favorites",label:(0,c.t)("Favorites"),icon:w.default}],a=(0,n.computed)((()=>l.filter((e=>e.id===i.currentView))[0]));return{__sfc:!0,allViews:l,props:i,emit:t,currentViewObject:a,updateFilterValue:e=>t("update:filterString",e),IconClose:v.default,IconMagnify:g.default,NcButton:r.P2,NcSelect:r.QG,NcTextField:r.h3,t:c.t,Fragment:_.Fragment}}}),L=(0,a.n)(M,(function(){var e=this,t=e._self._c,i=e._self._setupProxy;return t(i.Fragment,[t(i.NcTextField,{staticClass:"file-picker__filter-input",attrs:{value:e.filterString,label:i.t("Filter file list"),"show-trailing-button":!!e.filterString},on:{"update:value":i.updateFilterValue,"trailing-button-click":function(e){return i.updateFilterValue("")}},scopedSlots:e._u([{key:"trailing-button-icon",fn:function(){return[t(i.IconClose,{attrs:{size:16}})]},proxy:!0}])},[t(i.IconMagnify,{attrs:{size:16}})],1),e.isCollapsed?t(i.NcSelect,{attrs:{"aria-label":i.t("Current view selector"),clearable:!1,searchable:!1,options:i.allViews,value:i.currentViewObject},on:{input:e=>i.emit("update:currentView",e.id)}}):t("ul",{staticClass:"file-picker__side",attrs:{role:"tablist","aria-label":i.t("Filepicker sections")}},e._l(i.allViews,(function(n){return t("li",{key:n.id},[t(i.NcButton,{attrs:{"aria-selected":e.currentView===n.id,type:e.currentView===n.id?"primary":"tertiary",wide:!0,role:"tab"},on:{click:function(t){return e.$emit("update:currentView",n.id)}},scopedSlots:e._u([{key:"icon",fn:function(){return[t(n.icon,{tag:"component",attrs:{size:20}})]},proxy:!0}],null,!0)},[e._v(" "+e._s(n.label)+" ")])],1)})),0)],1)}),[],!1,null,"69c4f473",null,null).exports,V=(0,n.defineComponent)({name:"FilePicker",props:{buttons:null,name:null,allowPickDirectory:{type:Boolean,default:!1},container:{default:"body"},filterFn:{default:void 0},mimetypeFilter:{default:()=>[]},multiselect:{type:Boolean,default:!0},path:{default:"/"}},emits:["close"],setup(e,{emit:t}){const i=e,o=(0,n.computed)((()=>({container:i.container,name:i.name,buttons:u.value,size:"large",navigationClasses:["file-picker__navigation"],contentClasses:["file-picker__content"]}))),u=(0,n.computed)((()=>("function"==typeof i.buttons?i.buttons(m.value,v.value,d.value):i.buttons).map((e=>({...e,callback:async()=>{const n=0===m.value.length&&i.allowPickDirectory?[await C(v.value)]:m.value;e.callback(n),t("close",m.value)}}))))),d=(0,n.ref)("files"),f=(0,n.computed)((()=>"favorites"===d.value?(0,c.t)("Favorites"):"recent"===d.value?(0,c.t)("Recent"):"")),m=(0,n.ref)([]),h=(0,n.ref)((null==window?void 0:window.sessionStorage.getItem("NC.FilePicker.LastPath"))||"/"),y=(0,n.ref)(),v=(0,n.computed)({get:()=>"files"===d.value?y.value||i.path||h.value:"/",set:e=>{void 0===i.path&&window.sessionStorage.setItem("NC.FilePicker.LastPath",e),y.value=e}}),g=(0,n.ref)(""),{isSupportedMimeType:w}=function(e){const t=(0,n.computed)((()=>e.value.map((e=>e.split("/")))));return{isSupportedMimeType:e=>{const i=e.split("/");return t.value.some((([e,t])=>!(i[0]!==e&&"*"!==e||i[1]!==t&&"*"!==t)))}}}((0,n.toRef)(i,"mimetypeFilter")),{files:_,isLoading:S,loadFiles:F,getFile:C,client:N}=function(e,t){const i=(0,p.rp)((0,b.generateRemoteUrl)("dav")),l=(0,n.ref)([]),a=(0,n.ref)(!0);async function o(){if(a.value=!0,"favorites"===e.value)l.value=await i.getDirectoryContents("".concat(p._o).concat(t.value),{details:!0,data:(0,p.fs)(),headers:{method:"REPORT"},includeSelf:!1}).then((e=>e.data.map((e=>(0,p.RL)(e)))));else if("recent"===e.value){const e=Math.round(Date.now()/1e3)-1209600,n=await i.getDirectoryContents(t.value,{details:!0,data:(0,p.tB)(e),headers:{method:"SEARCH","Content-Type":"application/xml; charset=utf-8"},deep:!0});l.value=n.data.map((e=>(0,p.RL)(e)))}else{const e=await i.getDirectoryContents("".concat(p._o).concat(t.value),{details:!0,data:(0,p.h7)()});l.value=e.data.map((e=>(0,p.RL)(e)))}a.value=!1}return(0,n.watch)([e,t],(()=>o())),{isLoading:a,files:l,loadFiles:()=>o(),getFile:async function(e){const t=await i.stat("".concat(p._o).concat(e),{details:!0});return(0,p.RL)(t.data)},client:i}}(d,v);(0,n.onMounted)((()=>F()));const x=(0,n.computed)((()=>{let e=_.value;return i.mimetypeFilter.length>0&&(e=e.filter((e=>"folder"===e.type||e.mime&&w(e.mime)))),g.value&&(e=e.filter((e=>e.basename.toLowerCase().includes(g.value.toLowerCase())))),i.filterFn&&(e=e.filter((e=>i.filterFn(e)))),e})),B=(0,n.computed)((()=>"files"===d.value?(0,c.t)("Upload some content or sync with your devices!"):"recent"===d.value?(0,c.t)("Files and folders you recently modified will show up here."):(0,c.t)("Files and folders you mark as favorite will show up here.")));return{__sfc:!0,props:i,emit:t,dialogProps:o,dialogButtons:u,currentView:d,viewHeadline:f,selectedFiles:m,savedPath:h,navigatedPath:y,currentPath:v,filterString:g,isSupportedMimeType:w,files:_,isLoading:S,loadFiles:F,getFile:C,client:N,filteredFiles:x,noFilesDescription:B,onCreateFolder:e=>{N.createDirectory((0,s.join)(p._o,v.value,e)).then((()=>F())).catch((e=>(0,k.i)((0,c.t)("Could not create the new folder"))))},IconFile:l.Z,DialogBase:a.D,FileList:D,FilePickerBreadcrumbs:T,FilePickerNavigation:L,NcEmptyContent:r.SL,t:c.t}}}),R=(0,a.n)(V,(function(){var e=this,t=e._self._c,i=e._self._setupProxy;return t(i.DialogBase,e._b({on:{close:function(e){return i.emit("close")}},scopedSlots:e._u([{key:"navigation",fn:function({isCollapsed:e}){return[t(i.FilePickerNavigation,{attrs:{"is-collapsed":e,"current-view":i.currentView,"filter-string":i.filterString},on:{"update:currentView":function(e){i.currentView=e},"update:current-view":function(e){i.currentView=e},"update:filterString":function(e){i.filterString=e},"update:filter-string":function(e){i.filterString=e}}})]}}])},"DialogBase",i.dialogProps,!1),[t("div",{staticClass:"file-picker__main"},["files"===i.currentView?t(i.FilePickerBreadcrumbs,{attrs:{path:i.currentPath,"show-menu":e.allowPickDirectory},on:{"update:path":function(e){i.currentPath=e},"create-node":i.onCreateFolder}}):t("div",{staticClass:"file-picker__view"},[t("h3",[e._v(e._s(i.viewHeadline))])]),i.isLoading||i.filteredFiles.length>0?t(i.FileList,{attrs:{"allow-pick-directory":e.allowPickDirectory,files:i.filteredFiles,multiselect:e.multiselect,loading:i.isLoading,path:i.currentPath,"selected-files":i.selectedFiles,name:i.viewHeadline},on:{"update:path":[function(e){i.currentPath=e},function(e){i.currentView="files"}],"update:selectedFiles":function(e){i.selectedFiles=e},"update:selected-files":function(e){i.selectedFiles=e}}}):i.filterString?t(i.NcEmptyContent,{attrs:{name:i.t("No matching files"),description:i.t("No files matching your filter were found.")},scopedSlots:e._u([{key:"icon",fn:function(){return[t(i.IconFile)]},proxy:!0}])}):t(i.NcEmptyContent,{attrs:{name:i.t("No files in here"),description:i.noFilesDescription},scopedSlots:e._u([{key:"icon",fn:function(){return[t(i.IconFile)]},proxy:!0}])})],1)])}),[],!1,null,"e305d2fb",null,null).exports}}]);
//# sourceMappingURL=3609-3609.js.map?v=93fa96d23b2f5334810f