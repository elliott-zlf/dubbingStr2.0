(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{49:function(t,n,e){"use strict";(function(t){e(5);o(e(3));var n=o(e(50));function o(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=e,t(n.default)}).call(this,e(1)["createPage"])},50:function(t,n,e){"use strict";e.r(n);var o=e(51),r=e(53);for(var a in r)"default"!==a&&function(t){e.d(n,t,(function(){return r[t]}))}(a);e(57),e(59);var i,u=e(17),c=Object(u["default"])(r["default"],o["render"],o["staticRenderFns"],!1,null,"57280228",null,!1,o["components"],i);c.options.__file="pages/index/index.vue",n["default"]=c.exports},51:function(t,n,e){"use strict";e.r(n);var o=e(52);e.d(n,"render",(function(){return o["render"]})),e.d(n,"staticRenderFns",(function(){return o["staticRenderFns"]})),e.d(n,"recyclableRender",(function(){return o["recyclableRender"]})),e.d(n,"components",(function(){return o["components"]}))},52:function(t,n,e){"use strict";var o;e.r(n),e.d(n,"render",(function(){return r})),e.d(n,"staticRenderFns",(function(){return i})),e.d(n,"recyclableRender",(function(){return a})),e.d(n,"components",(function(){return o}));try{o={uNavbar:function(){return e.e("uview-ui/components/u-navbar/u-navbar").then(e.bind(null,285))},dropball:function(){return e.e("components/dropball/dropball").then(e.bind(null,292))}}}catch(u){if(-1===u.message.indexOf("Cannot find module")||-1===u.message.indexOf(".vue"))throw u;console.error(u.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var r=function(){var t=this,n=t.$createElement,e=(t._self._c,t.__map(t.hotworksData,(function(n,e){var o=t.__get_orig(n),r=t.transformsex(n.teacher.sex);return{$orig:o,m0:r}})));t.$mp.data=Object.assign({},{$root:{l0:e}})},a=!1,i=[];r._withStripped=!0},53:function(t,n,e){"use strict";e.r(n);var o=e(54),r=e.n(o);for(var a in o)"default"!==a&&function(t){e.d(n,t,(function(){return o[t]}))}(a);n["default"]=r.a},54:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=c(e(9)),r=e(46),a=e(12),i=c(e(55)),u=c(e(56));function c(t){return t&&t.__esModule?t:{default:t}}function s(t,n,e,o,r,a,i){try{var u=t[a](i),c=u.value}catch(s){return void e(s)}u.done?n(c):Promise.resolve(c).then(o,r)}function l(t){return function(){var n=this,e=arguments;return new Promise((function(o,r){var a=t.apply(n,e);function i(t){s(a,o,r,i,u,"next",t)}function u(t){s(a,o,r,i,u,"throw",t)}i(void 0)}))}}function f(t,n){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable}))),e.push.apply(e,o)}return e}function d(t){for(var n=1;n<arguments.length;n++){var e=null!=arguments[n]?arguments[n]:{};n%2?f(Object(e),!0).forEach((function(n){p(t,n,e[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):f(Object(e)).forEach((function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(e,n))}))}return t}function p(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}var h=function(){e.e("components/audio/audioplay").then(function(){return resolve(e(301))}.bind(null,e)).catch(e.oe)},w=function(){Promise.all([e.e("common/vendor"),e.e("components/submitform/submitform")]).then(function(){return resolve(e(308))}.bind(null,e)).catch(e.oe)},m=function(){e.e("components/dropball/dropball").then(function(){return resolve(e(292))}.bind(null,e)).catch(e.oe)},g={components:{musicAudio:h,submitForm:w,dropball:m},data:function(){return{background:{backgroundColor:"#FFFFFF"},swiperList:[],colorClass:["https://www.peiyinstreet.com/guidang/colorRed.png","https://www.peiyinstreet.com/guidang/colorBlue.png","https://www.peiyinstreet.com/guidang/colorYellow.png"],play:i.default,playActive:u.default,swiperId:"",musicSrc:"",dataPlay:{works:{url:""}},getListArg:{tag_data:[],page:1,size:10,type:1},hottopicsData:[],hotworksData:[],hotteacherData:[],audioShow:!1,innerAudio:"",innerAudioUrl:"",securitiesShow:!0,couponsShow:!1,couponsData:{}}},computed:d({},(0,a.mapState)("user",["token","userId"])),onLoad:function(){this.logins(),this.getHotData()},onShow:function(){},onHide:function(){this.musicClose()},onShareAppMessage:function(t){return"button"===t.from&&console.log(t.target),{title:"直接找配音师下单，配音只需成本价。点击极速试音~",desc:"",complete:function(t){console.log("分享成功",t)}}},methods:d(d({},(0,a.mapActions)("user",["login","getIphoneStatus"])),{},{logins:function(){var n=this;t.login({provider:"weixin",success:function(){var t=l(o.default.mark((function t(e){return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,n.login(e.code);case 2:return t.next=4,n.getIphoneStatus();case 4:n.getHotData();case 5:case"end":return t.stop()}}),t)})));function e(n){return t.apply(this,arguments)}return e}(),fail:function(t){console.log("登录失败",t)}})},handleServiceChat:function(){wx.openCustomerServiceChat({extInfo:{url:"https://work.weixin.qq.com/kfid/kfcade993b61c3ff656"},corpId:"ww901fbb3c6ecf9871",success:function(t){console.log("接入小程序客服成功")},fail:function(t){console.log("接小程序客服失败",t)}})},handleSoundlibrary:function(n,e){t.setStorageSync("worksType",n),e&&this.$store.commit("user/setworkStatus",e),t.switchTab({url:"/pages/soundlibrary/soundlibrary"})},handleViewMore:function(){t.switchTab({url:"/pages/dubbinglibrary/dubbinglibrary"})},getHotData:function(){var t=this;(0,r.servicehot)(this.getListArg).then((function(n){console.log("配音师数据",n),t.hottopicsData=n.data[0],t.hotworksData=n.data[1],t.hotteacherData=n.data[2]})).catch((function(t){}))},transformsex:function(t){return 1===t?"男声":2===t?"女声":"企业"},handleCouponCollection:function(){var t=this;this.couponsShow=!0,(0,r.couponadd)().then((function(n){t.couponsData=n.data,console.log("优惠卷数据",n)})).catch((function(t){console.log("优惠卷错误信息",t)}))},handlecloseCollection:function(){this.securitiesShow=!1},handlecloseCoupons:function(){this.couponsShow=!1},handleJumpPublishing:function(){console.log("跳转到发布"),t.showToast({title:"该功能尚未开放",icon:"none"})},handleVisitorsJump:function(n){t.setStorageSync("current",n.tags[0].value),t.navigateTo({url:"/subpkg/pages/teacherlist/teacherlist?id="+n.teacher_id})},playTheMusic:function(t){var n=this;console.log("传过来的数据",t),this.audioShow=!0,this.dataPlay.works.url===t.works.url?(this.hotteacherData.map((function(e){n.dataPlay===e?t.works.playStatus=!t.works.playStatus:e.playStatus=!1})),this.hotworksData.map((function(e){n.dataPlay===e?t.works.playStatus=!t.works.playStatus:e.playStatus=!1}))):(this.hotteacherData.map((function(t){t.works.playStatus=!1})),this.hotworksData.map((function(t){t.works.playStatus=!1})),t.works.playStatus=!0,this.dataPlay=t),setTimeout((function(){n.$refs.musicAudio.preStartPlay()}),0)},handleChangePlay:function(t){var n=this;this.hotteacherData.map((function(e){n.dataPlay===e?e.works.playStatus=t:e.works.playStatus=!1})),this.hotworksData.map((function(e){n.dataPlay===e?e.works.playStatus=t:e.works.playStatus=!1}))},musicClose:function(){this.hotteacherData.map((function(t){t.works.playStatus=!1})),this.hotworksData.map((function(t){t.works.playStatus=!1})),this.audioShow=!1,this.dataPlay={works:{url:""}}}})};n.default=g}).call(this,e(1)["default"])},57:function(t,n,e){"use strict";e.r(n);var o=e(58),r=e.n(o);for(var a in o)"default"!==a&&function(t){e.d(n,t,(function(){return o[t]}))}(a);n["default"]=r.a},58:function(t,n,e){},59:function(t,n,e){"use strict";e.r(n);var o=e(60),r=e.n(o);for(var a in o)"default"!==a&&function(t){e.d(n,t,(function(){return o[t]}))}(a);n["default"]=r.a},60:function(t,n,e){}},[[49,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map