(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/submitform/submitform"],{429:function(t,e,n){"use strict";n.r(e);var o=n(430),i=n(432);for(var r in i)"default"!==r&&function(t){n.d(e,t,(function(){return i[t]}))}(r);n(434),n(436);var a,u=n(17),s=Object(u["default"])(i["default"],o["render"],o["staticRenderFns"],!1,null,null,null,!1,o["components"],a);s.options.__file="components/submitform/submitform.vue",e["default"]=s.exports},430:function(t,e,n){"use strict";n.r(e);var o=n(431);n.d(e,"render",(function(){return o["render"]})),n.d(e,"staticRenderFns",(function(){return o["staticRenderFns"]})),n.d(e,"recyclableRender",(function(){return o["recyclableRender"]})),n.d(e,"components",(function(){return o["components"]}))},431:function(t,e,n){"use strict";var o;n.r(e),n.d(e,"render",(function(){return i})),n.d(e,"staticRenderFns",(function(){return a})),n.d(e,"recyclableRender",(function(){return r})),n.d(e,"components",(function(){return o}));try{o={lFile:function(){return n.e("uni_modules/l-file/components/l-file/l-file").then(n.bind(null,556))}}}catch(u){if(-1===u.message.indexOf("Cannot find module")||-1===u.message.indexOf(".vue"))throw u;console.error(u.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var i=function(){var t=this,e=t.$createElement;t._self._c},r=!1,a=[];i._withStripped=!0},432:function(t,e,n){"use strict";n.r(e);var o=n(433),i=n.n(o);for(var r in o)"default"!==r&&function(t){n.d(e,t,(function(){return o[t]}))}(r);e["default"]=i.a},433:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=u(n(9)),i=n(46),r=n(92),a=n(12);function u(t){return t&&t.__esModule?t:{default:t}}function s(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function l(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?s(Object(n),!0).forEach((function(e){c(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function c(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function d(t,e,n,o,i,r,a){try{var u=t[r](a),s=u.value}catch(l){return void n(l)}u.done?e(s):Promise.resolve(s).then(o,i)}function f(t){return function(){var e=this,n=arguments;return new Promise((function(o,i){var r=t.apply(e,n);function a(t){d(r,o,i,a,u,"next",t)}function u(t){d(r,o,i,a,u,"throw",t)}a(void 0)}))}}var h={name:"submitform",props:{subTitle:{type:Boolean,required:!0},btnText:{type:String,required:"立即匹配 配音师试音"},bottomTitle:{type:Boolean,required:!1},teachrID:{type:String,required:""}},data:function(){return{texterheight:"70",form:{tag_data:{2:"",1:"",6:""},audition_text:"",audition_url:"",content:"",content_url:"",teacher_id:""},themeValue:"",sexValue:"",styleValue:"",multiArray:[],multiIndex:[0,0,0],textareanum:0,fileShow:!0,musicShow:!0,subjectShow:!1,uploaditem:"",submittime:!0,dataCode:""}},created:function(){this.getTagAll()},beforeMount:function(){var e=this;t.login({provider:"weixin",success:function(){var t=f(o.default.mark((function t(n){return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:console.log("这里走了几次"),e.dataCode=n.code,e.getTagAll();case 3:case"end":return t.stop()}}),t)})));function n(e){return t.apply(this,arguments)}return n}(),fail:function(t){console.log("登录失败",t)}})},computed:l({},(0,a.mapState)("user",["token","userId","phoneStatus"])),methods:l(l({},(0,a.mapActions)("user",["getIphoneStatus"])),{},{getTagAll:function(){var t=this;(0,i.homeTag)().then((function(e){console.log("标签列表数据",e);var n=[],o=[],i=[];e.data.map((function(t){"题材"===t.value?n=t.tags:"性别"===t.value?o=t.tags:"预算"===t.value&&(i=t.tags)})),t.multiArray=[n,o,i]}))},handleInputEvents:function(){this.textareanum=this.form.audition_text.length},submit:function(){var e=this;if(this.submittime)if(""===this.form.tag_data[2])t.showToast({title:"请先选择【题材、性别、预算】才能进行匹配",icon:"none",mask:!0,duration:2e3});else if(""==this.form.audition_text&&""==this.form.audition_url)t.showToast({title:"请输入20字以上的试音文本，\r\n或直接上传文稿",icon:"none",mask:!0,duration:2e3});else if(""==this.form.audition_url&&""!==this.form.audition_text&&this.form.audition_text.length<20)t.showToast({title:"请输入20字以上的试音文本，\r\n或直接上传文稿",icon:"none",mask:!0,duration:2e3});else{var n={audition_text:this.form.audition_text.substr(0,200),audition_url:this.form.audition_url,content:this.form.content,content_url:this.form.content_url,teacher_id:this.teachrID,tag_data:this.form.tag_data};this.submittime=!1,(0,i.demandPublish)(n).then((function(n){e.submittime=!0,e.fileShow=!0,e.musicShow=!0,e.form.audition_text="",e.form.audition_url="",e.form.content="",e.form.content_url="",e.form.teacher_id="",e.form.tag_data={2:"",1:"",6:""},e.themeValue="",e.sexValue="",e.styleValue="",(0,i.urlIndex)({demand_id:n.data}).then((function(t){console.log("生成页面短链",t)})),e.$emit("submitShow"),t.navigateTo({url:"/subpkg/pages/transitions/transitions?id="+n.data+"&status=0"})})).catch((function(t){e.submittime=!0,console.log(t)}))}},onGetPhoneNumber:function(e){var n=this;if(console.log("微信小程序id",e,this.phonebb,this.phoneNumber),e.detail.cloudID){var o={iv:e.detail.iv,code:this.dataCode,encryptedData:e.detail.encryptedData};(0,r.getphone)(o).then((function(t){console.log("手机号请求数据",t.data);var e={nickname:"",userId:"",avatar:"",phone:t.data};(0,i.profileUpdate)(e).then((function(t){n.getIphoneStatus().then((function(t){console.log(t)})),n.submit()})),n.confirmPopShow=!0})).catch((function(t){console.log("手机号请求数据",t)}))}else t.showToast({title:"请先授权手机号\r\n，否则无法试音哦",icon:"none",mask:!0,duration:2e3})},handleUploadFile:function(){},handleDeleteFile:function(t){"file"===t?this.fileShow=!0:this.musicShow=!0},bindMultiPickerColumnChange:function(t){console.log("修改的列为："+t.detail.column+"，值为："+t.detail.value)},handleChange:function(t){this.form.tag_data["2"]=this.multiArray[0][t.detail.value[0]].id,this.themeValue=this.multiArray[0][t.detail.value[0]].value,this.form.tag_data["1"]=this.multiArray[1][t.detail.value[1]].id,this.sexValue=this.multiArray[1][t.detail.value[1]].value,this.form.tag_data["6"]=this.multiArray[2][t.detail.value[2]].id,this.styleValue=this.multiArray[2][t.detail.value[2]].value},hadleUpdate:function(){var t=this;if(!this.form.audition_text){this.form.audition_text="输入20-200字的试音文本，或直接上传文稿；";var e=setTimeout((function(){t.form.audition_text="",clearTimeout(e)}),50)}},handleSubjectValue:function(t){this.form.subject=t[0].label},onUpload:function(e){var n=t.getSystemInfoSync().platform;"android"==n||"ios"==n||"devtools"==n?(this.uploaditem=e,this.$refs.lFile.upload({url:"https://www.peiyinstreet.com/street/chat/uploadfile",name:"file",header:{userToken:this.token||""},formData:{fileName:""}})):t.showToast({title:"微信小程序仅支持从手机端上传",icon:"none",mask:!0,duration:3e3})},onSuccess:function(e){console.log("上传成功回调",JSON.stringify(e),e),"file"===this.uploaditem?(this.fileShow=!1,this.form.audition_url=e.data.data):(this.musicShow=!1,this.form.content_url=e.data.data),t.showToast({title:"文件上传成功",icon:"none"})}})};e.default=h}).call(this,n(1)["default"])},434:function(t,e,n){"use strict";n.r(e);var o=n(435),i=n.n(o);for(var r in o)"default"!==r&&function(t){n.d(e,t,(function(){return o[t]}))}(r);e["default"]=i.a},435:function(t,e,n){},436:function(t,e,n){"use strict";n.r(e);var o=n(437),i=n.n(o);for(var r in o)"default"!==r&&function(t){n.d(e,t,(function(){return o[t]}))}(r);e["default"]=i.a},437:function(t,e,n){}}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/submitform/submitform.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/submitform/submitform-create-component',
    {
        'components/submitform/submitform-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('1')['createComponent'](__webpack_require__(429))
        })
    },
    [['components/submitform/submitform-create-component']]
]);
