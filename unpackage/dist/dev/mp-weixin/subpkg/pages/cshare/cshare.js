(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["subpkg/pages/cshare/cshare"],{197:function(t,e,n){"use strict";(function(t){n(5);o(n(3));var e=o(n(198));function o(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=n,t(e.default)}).call(this,n(1)["createPage"])},198:function(t,e,n){"use strict";n.r(e);var o=n(199),a=n(201);for(var r in a)"default"!==r&&function(t){n.d(e,t,(function(){return a[t]}))}(r);n(203),n(205);var i,c=n(17),s=Object(c["default"])(a["default"],o["render"],o["staticRenderFns"],!1,null,"269faaef",null,!1,o["components"],i);s.options.__file="subpkg/pages/cshare/cshare.vue",e["default"]=s.exports},199:function(t,e,n){"use strict";n.r(e);var o=n(200);n.d(e,"render",(function(){return o["render"]})),n.d(e,"staticRenderFns",(function(){return o["staticRenderFns"]})),n.d(e,"recyclableRender",(function(){return o["recyclableRender"]})),n.d(e,"components",(function(){return o["components"]}))},200:function(t,e,n){"use strict";var o;n.r(e),n.d(e,"render",(function(){return a})),n.d(e,"staticRenderFns",(function(){return i})),n.d(e,"recyclableRender",(function(){return r})),n.d(e,"components",(function(){return o}));try{o={uPopup:function(){return n.e("uview-ui/components/u-popup/u-popup").then(n.bind(null,466))},release:function(){return Promise.all([n.e("common/vendor"),n.e("components/release/release")]).then(n.bind(null,494))}}}catch(c){if(-1===c.message.indexOf("Cannot find module")||-1===c.message.indexOf(".vue"))throw c;console.error(c.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var a=function(){var t=this,e=t.$createElement,n=(t._self._c,0==t.currentStatus?t.__map(t.dataList,(function(e,n){var o=t.__get_orig(e),a=t.transformsex(e.teacher.sex);return{$orig:o,m0:a}})):null);t.$mp.data=Object.assign({},{$root:{l0:n}})},r=!1,i=[];a._withStripped=!0},201:function(t,e,n){"use strict";n.r(e);var o=n(202),a=n.n(o);for(var r in o)"default"!==r&&function(t){n.d(e,t,(function(){return o[t]}))}(r);e["default"]=a.a},202:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=p(n(9)),a=n(12),r=n(67),i=n(46),c=p(n(68)),s=p(n(69)),u=p(n(103)),l=p(n(104)),d=n(732),f=p(n(81));function p(t){return t&&t.__esModule?t:{default:t}}function h(t,e,n,o,a,r,i){try{var c=t[r](i),s=c.value}catch(u){return void n(u)}c.done?e(s):Promise.resolve(s).then(o,a)}function m(t){return function(){var e=this,n=arguments;return new Promise((function(o,a){var r=t.apply(e,n);function i(t){h(r,o,a,i,c,"next",t)}function c(t){h(r,o,a,i,c,"throw",t)}i(void 0)}))}}function g(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function w(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?g(Object(n),!0).forEach((function(e){b(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):g(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function b(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var v=function(){n.e("components/dropball/dropball").then(function(){return resolve(n(413))}.bind(null,n)).catch(n.oe)},y=function(){n.e("components/audio/audioplay").then(function(){return resolve(n(422))}.bind(null,n)).catch(n.oe)},_={components:{dropball:v,musicAudio:y},data:function(){var t;return t={background:{backgroundColor:"#FFFFFF"},barStyle:{backgroundColor:"#FF445A"},orderPromptShow:!1,speedPromptShow:!1,current:0,play:c.default,playActive:s.default,tagParameter:{page:1,size:10},objData:{}},b(t,"play",c.default),b(t,"playActive",s.default),b(t,"shouchang",u.default),b(t,"yishouchang",l.default),b(t,"worksplay","https://www.peiyinstreet.com/guidang/play.png"),b(t,"worksplayActive","https://www.peiyinstreet.com/guidang/palyActive.png"),b(t,"options1",[]),b(t,"options2",[]),b(t,"options3",[]),b(t,"scrollInto",0),b(t,"scrollTop",0),b(t,"cate",1),b(t,"dataList",[]),b(t,"dataPlay",{works:{url:""}}),b(t,"submitShow",!1),b(t,"collectShow",!1),b(t,"currentStatus",0),b(t,"operationItem",{}),b(t,"audioShow",!1),b(t,"has_next",""),b(t,"dataObj",{teacher_id:"",service_id:"",status:1,filename:"",content_url_escape:"",work_id:"",avatar:"",nickname:"",offer_price:"",subjecttype:""}),b(t,"firstItem",{}),b(t,"triggered",!1),b(t,"_freshing",!1),b(t,"btnText","按样音效果试音"),b(t,"defaultshow",!1),b(t,"id",""),t},onShareTimeline:function(t){return{title:"云分享",desc:"",complete:function(t){console.log("分享成功",t)}}},computed:w({},(0,a.mapState)("user",["token","userInfo","workStatus","order_status","speedPrompt_status"])),onLoad:function(t){console.log("传过来的id",t),this.id=t.id,this.getUnionid()},onShareAppMessage:function(t){return t.from,{title:"",path:"",complete:function(t){console.log("分享成功",t)}}},onShow:function(){this.getUnionid()},onHide:function(){this.musicClose()},methods:w(w({},(0,a.mapActions)("user",["login","getIphoneStatus"])),{},{getUnionid:function(){var e=this;t.login({provider:"weixin",success:function(){var t=m(o.default.mark((function t(n){return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.login(n.code);case 2:return t.next=4,e.getIphoneStatus();case 4:e.getVoicelist();case 5:case"end":return t.stop()}}),t)})));function n(e){return t.apply(this,arguments)}return n}(),fail:function(t){console.log("登录失败",t),e.getVoicelist()}})},transformsex:function(t){return 1===t?"男声":2===t?"女声":"企业"},getVoicelist:function(){var t=this;(0,i.sharelist)({share_id:this.id}).then((function(e){console.log("分享的列表数据"),t.dataList=e.data,0===t.dataList.length?t.defaultshow=!0:t.defaultshow=!1}))},handleUseOrder:function(e){console.log("使用样音下单,用户下单状态",e,this.order_status),e.admin_price?(this.dataObj.service_id=e.service_id,this.dataObj.teacher_id=e.teacher_id,this.dataObj.filename=e.works.title,this.dataObj.content_url_escape=e.url,this.dataObj.work_id=e.works.id,this.dataObj.avatar=e.teacher.avatar,this.dataObj.nickname=e.teacher.nickname,this.dataObj.offer_price=e.offer_price,this.dataObj.subjecttype=e.tags[0].value,this.btnText="按样音效果试音",t.setStorageSync("dataObj",this.dataObj),t.navigateTo({url:"/subpkg/pages/voicesrelease/voicesrelease"})):t.showToast({title:"该服务暂不支持在线试音，请联系客服",icon:"none"}),(0,d.buriedSomeStatistical)(3)},handlecaseDetails:function(e){console.log("跳转到案例详情页面",e),t.navigateTo({url:"/subpkg/pages/caseDetails/caseDetails?id="+e.id})},handleOperation:function(t){console.log("点击操作打印数据",t),this.operationItem=t,this.collectShow=!0},hanldeCancelcoll:function(){this.collectShow=!1},handleCollectStatus:function(){var t=this,e={work_id:this.operationItem.works.id,type:this.operationItem.work_type};(0,r.collection)(e).then((function(e){console.log(e),1===t.operationItem.work_type?t.operationItem.work_type=0:t.operationItem.work_type=1})).catch((function(t){}))},getsubmitShow:function(){this.submitShow=!1},tabScoll:function(t){this.scrollTop=t.detail.scrollTop},handleVisitorsJump:function(e){t.setStorageSync("current",e.tags[0].value),t.navigateTo({url:"/subpkg/pages/teacherlist/teacherlist?id="+e.teacher_id})},replaceInput:function(t){var e=t.target.value;"11"===e&&(this.changeValue="2")},hideKeyboard:function(e){"123"===e.target.value&&t.hideKeyboard()},playTheMusic:function(t){var e=this;console.log("传过来的数据",t),this.audioShow=!0,this.dataPlay.works.url===t.works.url?this.dataList.map((function(n){e.dataPlay===n?t.works.playStatus=!t.works.playStatus:n.playStatus=!1})):(this.dataList.map((function(t){t.works.playStatus=!1})),t.works.playStatus=!0,this.dataPlay=t,(0,d.buriedSomeStatistical)(0)),setTimeout((function(){e.$refs.musicAudio.preStartPlay()}),0)},handleChangePlay:function(t){var e=this;this.dataList.map((function(n){e.dataPlay===n?n.works.playStatus=t:n.works.playStatus=!1}))},musicClose:function(){this.dataList.map((function(t){t.works.playStatus=!1})),this.audioShow=!1,this.dataPlay={works:{url:""}}},downloadcopy:function(e,n){(0,f.default)({content:e,success:function(e){t.showToast({title:n,icon:"none"})},error:function(t){}}),(0,d.buriedSomeStatistical)(1)},handleGoBack:function(){t.switchTab({url:"/pages/index/index"})},downloadcopySampleVoices:function(e,n){return m(o.default.mark((function a(){var r;return o.default.wrap((function(o){while(1)switch(o.prev=o.next){case 0:return o.next=2,(0,i.teacherdetail)({teacher_id:e.teacher_id});case 2:o.sent,r="样音信息："+e.teacher.nickname+"("+e.teacher.grade_text+")+"+e.title+"+"+e.offer_price+"+下载链接 "+e.works.url,console.log(e,r),(0,f.default)({content:r,success:function(e){t.showToast({title:n,icon:"none"})},error:function(t){}}),(0,d.buriedSomeStatistical)(9);case 7:case"end":return o.stop()}}),a)})))()}})};e.default=_}).call(this,n(1)["default"])},203:function(t,e,n){"use strict";n.r(e);var o=n(204),a=n.n(o);for(var r in o)"default"!==r&&function(t){n.d(e,t,(function(){return o[t]}))}(r);e["default"]=a.a},204:function(t,e,n){},205:function(t,e,n){"use strict";n.r(e);var o=n(206),a=n.n(o);for(var r in o)"default"!==r&&function(t){n.d(e,t,(function(){return o[t]}))}(r);e["default"]=a.a},206:function(t,e,n){}},[[197,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/subpkg/pages/cshare/cshare.js.map