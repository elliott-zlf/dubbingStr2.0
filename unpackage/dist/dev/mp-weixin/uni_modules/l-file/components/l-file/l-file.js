(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uni_modules/l-file/components/l-file/l-file"],{556:function(e,t,n){"use strict";n.r(t);var o=n(557),r=n(559);for(var i in r)"default"!==i&&function(e){n.d(t,e,(function(){return r[e]}))}(i);n(561);var a,s=n(17),l=Object(s["default"])(r["default"],o["render"],o["staticRenderFns"],!1,null,"07c1f333",null,!1,o["components"],a);l.options.__file="uni_modules/l-file/components/l-file/l-file.vue",t["default"]=l.exports},557:function(e,t,n){"use strict";n.r(t);var o=n(558);n.d(t,"render",(function(){return o["render"]})),n.d(t,"staticRenderFns",(function(){return o["staticRenderFns"]})),n.d(t,"recyclableRender",(function(){return o["recyclableRender"]})),n.d(t,"components",(function(){return o["components"]}))},558:function(e,t,n){"use strict";var o;n.r(t),n.d(t,"render",(function(){return r})),n.d(t,"staticRenderFns",(function(){return a})),n.d(t,"recyclableRender",(function(){return i})),n.d(t,"components",(function(){return o}));var r=function(){var e=this,t=e.$createElement;e._self._c},i=!1,a=[];r._withStripped=!0},559:function(e,t,n){"use strict";n.r(t);var o=n(560),r=n.n(o);for(var i in o)"default"!==i&&function(e){n.d(t,e,(function(){return o[e]}))}(i);t["default"]=r.a},560:function(e,t,n){"use strict";(function(e){function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){if(null==e)return{};var n,o,r=s(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}function s(e,t){if(null==e)return{};var n,o,r={},i=Object.keys(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var l=function(){n.e("uni_modules/l-file/components/l-file/h5-file").then(function(){return resolve(n(612))}.bind(null,n)).catch(n.oe)},u={components:{h5File:l},props:{logo:{type:String,default:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F00%2F00%2F07%2F155788a6d8a5c42.jpg&refer=http%3A%2F%2Fbpic.588ku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1619847627&t=2da40b583002205c204d980b54b35040"},top:{type:String,default:"auto"},bgColor:{type:String,default:"RGBA(4, 4, 4, 0.5)"},color:{type:String,default:"#1E78FB"}},data:function(){return this.uploadTask=null,this.downloadTask=null,{cubgColor:"RGBA(4, 4, 4, 0.5)",loading:!1,value:0,show:!1,msg:"执行完毕~",showH5:!1,showTip:!1}},methods:{toast:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},o=n.duration,r=void 0===o?2e3:o,i=n.icon,a=void 0===i?"none":i;e.showToast({title:t,duration:r,icon:a})},getRequest:function(e){var t=new Object,n=e.indexOf("?");if(-1!=n)for(var o=e.substring(n+1),r=o.split("&"),i=0;i<r.length;i++)t[r[i].split("=")[0]]=unescape(r[i].split("=")[1]);return t},appChooseFile:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};e.currentWebview,e.url,e.name,e.header,a(e,["currentWebview","url","name","header"])},wxChooseFile:function(e){var t=this;console.log("微信上传的文件名",e),wx.chooseMessageFile({count:1,type:"all",success:function(n){var o=n.tempFiles;t.setdefUI(),console.log("微信上传返回的参数",o),t.handleWXUpload(e,o[0])},fail:function(){return t.errorHandler("文件选择失败",t.upErr)}})},h5ChooseFile:function(e){var t=this;this.showH5=!0,this.value=0,this.$nextTick((function(){t.$refs.h5File.hFile.onchange=function(n){t.handleH5Upload(e,n.target.files[0])}}))},handleH5Upload:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=t.url,o=t.name,r=void 0===o?"file":o,i=t.header,s=a(t,["url","name","header"]),l=arguments.length>1?arguments[1]:void 0,u=l.name,c=new FormData;for(var d in s)c.append(d,s[d]);for(var f in c.append(r,l),this.uploadTask=new XMLHttpRequest,this.uploadTask.open("POST",n,!0),i)this.uploadTask.setRequestHeader(f,i[f]);this.uploadTask.ontimeout=function(){setTimeout((function(){return e.showTip=!1,e.errorHandler("请求超时",e.upErr)}),1e3)},this.uploadTask.upload.addEventListener("progress",(function(t){t.lengthComputable&&(e.value=Math.ceil(100*t.loaded/t.total),console.log("会变化的value",e.value),e.value>100&&(e.value=100),e.$forceUpdate())}),!1),this.uploadTask.onreadystatechange=function(t){if(4==e.uploadTask.readyState)return console.log("status："+e.uploadTask.status),200==e.uploadTask.status?e.handleBack(u,e.uploadTask.responseText):(e.showTip=!1,0==e.uploadTask.status&&console.log("请检查请求头Content-Type与服务端是否匹配，并确认服务端已正确开启跨域"),e.errorHandler("文件上传失败",e.upErr))},this.showTip=!0,this.uploadTask.send(c)},handleWXUpload:function(){var t=this,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},o=n.url,r=n.name,i=void 0===r?"file":r,s=n.header,l=a(n,["url","name","header"]),u=arguments.length>1?arguments[1]:void 0;l["fileName"]=u.name;var c={url:o,name:i,formData:l,header:s,filePath:u.path},d=u.name,f=u.size;c["fail"]=function(e){return t.showTip=!1,t.errorHandler("文件上传失败",t.upErr)},c["success"]=function(e){if(200==e.statusCode){var n=JSON.parse(e.data);return t.onCommit(t.$emit("up-success",{fileName:d,data:n,size:f}))}return t.errorHandler("文件上传失败",t.upErr)},this.showTip=!0,this.uploadTask=e.uploadFile(c),this.uploadTask&&this.uploadTask.onProgressUpdate((function(e){var n=e.progress,o=void 0===n?0:n;o<=99&&(t.value=o,t.$forceUpdate())}))},onCloseH5:function(){this.showH5=!1},onAbort:function(){this.uploadTask&&this.uploadTask.abort(),this.showTip=!1},downOnAbort:function(){this.downloadTask&&this.downloadTask.abort(),this.onCommit(!1,"已取消")},handleBack:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"{}";console.log("可根据需求自行修改emit内容，服务端返回："+t);try{t=JSON.parse(t)}catch(n){t={id:t}}return this.onCommit(this.$emit("up-success",r({statusCode:200,fileName:e},t)))},upload:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(console.log("哪里都不走"),e.url){if(!this.loading)return console.log("微信端"),this.wxChooseFile(e);this.toast("文件正在上传，请稍候..")}else this.toast("上传地址不正确")},open:function(t){var n=e.getSystemInfoSync().platform;"ios"==n&&(t=encodeURI(t)),e.openDocument({filePath:t,success:function(e){console.log("打开文档成功")}})},plusSaveFile:function(e){var t=this,n=e.url,o=e.customName,i=void 0===o?"":o,a=e.opt;return new Promise((function(e,o){var s={method:"GET",timeout:120,retryInterval:10,filename:"file://storage/emulated/0/lFile/"+i};s=r(r({},s),a),t.downloadTask=plus.downloader.createDownload(n,s,(function(n,r){if(200==r){var i=n.filename;t.value=100,t.onCommit(e(i))}else t.errorHandler("下载失败",o);t.downloadTask=null})),t.downloadTask.addEventListener("statechanged",(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.downloadedSize,o=void 0===n?0:n,r=e.state,i=void 0===r?0:r,a=e.totalSize,s=void 0===a?0:a;if(3===i){var l=s>0?s:fileSize,u=Math.ceil(o/l*100);t.value=u>100?100:u,t.$forceUpdate()}}),!1),t.downloadTask.start()}))},download:function(t){var n=this,o=t.url,r=t.type,i=void 0===r?"temporary":r;t.customName,a(t,["url","type","customName"]);if(!this.loading)return this.setdefUI(),new Promise((function(t,r){o=encodeURI(o),n.downloadTask=e.downloadFile({url:o,success:function(o){var a=o.statusCode,s=o.tempFilePath;200===a&&("save"==i?e.saveFile({tempFilePath:s,success:function(e){var o=e.savedFilePath;return n.onCommit(t(o))},fail:function(){return n.errorHandler("下载失败",r)}}):n.onCommit(t(s)))},fail:function(){return n.errorHandler("下载失败",r)}}),n.downloadTask.onProgressUpdate((function(e){var t=e.progress,o=void 0===t?0:t;o<=100&&(n.value=o,n.$forceUpdate())}))}));this.toast("还有个文件玩命处理中，请稍候..")},onCommit:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"执行完毕~";return this.msg=n,this.loading=!1,this.showTip=!1,this.cubgColor="RGBA(4, 4, 4, 0.5)",this.uploadTask=null,this.downloadTask=null,setTimeout((function(){t.show=!1,t.showH5=!1}),1500),e},setdefUI:function(){this.cubgColor=this.bgColor,this.value=0,this.loading=!0,this.show=!0},upErr:function(e){this.$emit("up-error",e)},errorHandler:function(e,t){var n=this;return this.msg=e,this.loading=!1,this.cubgColor="RGBA(4, 4, 4, 0.5)",this.uploadTask=null,this.downloadTask=null,setTimeout((function(){n.show=!1}),1500),t(e)}}};t.default=u}).call(this,n(1)["default"])},561:function(e,t,n){"use strict";n.r(t);var o=n(562),r=n.n(o);for(var i in o)"default"!==i&&function(e){n.d(t,e,(function(){return o[e]}))}(i);t["default"]=r.a},562:function(e,t,n){}}]);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/l-file/components/l-file/l-file.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uni_modules/l-file/components/l-file/l-file-create-component',
    {
        'uni_modules/l-file/components/l-file/l-file-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('1')['createComponent'](__webpack_require__(556))
        })
    },
    [['uni_modules/l-file/components/l-file/l-file-create-component']]
]);
