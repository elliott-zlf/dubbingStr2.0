(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/dubbinglibrary/dubbinglibrary"],{61:function(t,n,e){"use strict";(function(t){e(5);o(e(3));var n=o(e(62));function o(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=e,t(n.default)}).call(this,e(1)["createPage"])},62:function(t,n,e){"use strict";e.r(n);var o=e(63),a=e(65);for(var i in a)"default"!==i&&function(t){e.d(n,t,(function(){return a[t]}))}(i);e(70),e(72);var r,u=e(17),s=Object(u["default"])(a["default"],o["render"],o["staticRenderFns"],!1,null,"04d07f86",null,!1,o["components"],r);s.options.__file="pages/dubbinglibrary/dubbinglibrary.vue",n["default"]=s.exports},63:function(t,n,e){"use strict";e.r(n);var o=e(64);e.d(n,"render",(function(){return o["render"]})),e.d(n,"staticRenderFns",(function(){return o["staticRenderFns"]})),e.d(n,"recyclableRender",(function(){return o["recyclableRender"]})),e.d(n,"components",(function(){return o["components"]}))},64:function(t,n,e){"use strict";var o;e.r(n),e.d(n,"render",(function(){return a})),e.d(n,"staticRenderFns",(function(){return r})),e.d(n,"recyclableRender",(function(){return i})),e.d(n,"components",(function(){return o}));try{o={uNavbar:function(){return e.e("uview-ui/components/u-navbar/u-navbar").then(e.bind(null,285))}}}catch(u){if(-1===u.message.indexOf("Cannot find module")||-1===u.message.indexOf(".vue"))throw u;console.error(u.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var a=function(){var t=this,n=t.$createElement;t._self._c},i=!1,r=[];a._withStripped=!0},65:function(t,n,e){"use strict";e.r(n);var o=e(66),a=e.n(o);for(var i in o)"default"!==i&&function(t){e.d(n,t,(function(){return o[t]}))}(i);n["default"]=a.a},66:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o,a=l(e(9)),i=e(67),r=e(12),u=l(e(68)),s=l(e(69)),c=e(46);function l(t){return t&&t.__esModule?t:{default:t}}function f(t,n,e,o,a,i,r){try{var u=t[i](r),s=u.value}catch(c){return void e(c)}u.done?n(s):Promise.resolve(s).then(o,a)}function d(t){return function(){var n=this,e=arguments;return new Promise((function(o,a){var i=t.apply(n,e);function r(t){f(i,o,a,r,u,"next",t)}function u(t){f(i,o,a,r,u,"throw",t)}r(void 0)}))}}function p(t,n){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable}))),e.push.apply(e,o)}return e}function h(t){for(var n=1;n<arguments.length;n++){var e=null!=arguments[n]?arguments[n]:{};n%2?p(Object(e),!0).forEach((function(n){g(t,n,e[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):p(Object(e)).forEach((function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(e,n))}))}return t}function g(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}var v=function(){e.e("components/audio/audioplay").then(function(){return resolve(e(301))}.bind(null,e)).catch(e.oe)},m=(o={components:{musicAudio:v},data:function(){return{audioShow:!1,rukuShow:!1,notputShow:!1,userCont:!0,staCount:{},dataList:[],play:u.default,playActive:s.default,listPlayData:[],servicePar:{page:1,size:5},dataPlay:{works:{url:""}},securitiesShow:!1,couponsShow:!1,couponsData:{}}},computed:h({},(0,r.mapState)("user",["token","userInfo"])),onShareAppMessage:function(t){return"button"===t.from&&console.log(t.target),{title:"中国配音师库",imageUrl:"",complete:function(t){console.log("分享成功",t)}}},onLoad:function(){},onShow:function(){this.getUnionid()},onHide:function(){this.musicClose()}},g(o,"computed",h({},(0,r.mapState)("user",["token","userId"]))),g(o,"methods",h(h({},(0,r.mapActions)("user",["login","getIphoneStatus"])),{},{getUnionid:function(){var n=this;t.login({provider:"weixin",success:function(){var t=d(a.default.mark((function t(e){return a.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,n.login(e.code);case 2:return t.next=4,n.getIphoneStatus();case 4:n.servicelist(),n.getCouponstatusStatus();case 6:case"end":return t.stop()}}),t)})));function e(n){return t.apply(this,arguments)}return e}(),fail:function(t){console.log("登录失败",t)}})},getCouponstatusStatus:function(){var t=this;(0,c.couponstatus)({status:0}).then((function(n){console.log("获取优惠卷的状态",n),n.data.coupon_status?t.securitiesShow=!1:t.securitiesShow=!0}))},servicelist:function(){var t=this;(0,i.servicelist)(this.servicePar).then((function(n){console.log("配音师数据",n),t.dataList=n.data})).catch((function(t){}))},handleCheckWeb:function(){this.erweimaShow=!0,t.navigateTo({url:"/subpkg/pages/webview/webview?src=https://mp.weixin.qq.com/s/oUOIOcT1Na68hTo7ZfS1MQ"})},handleVoicelist:function(n,e){console.log("111",n.list.cate),t.navigateTo({url:"/subpkg/pages/voicelist/voicelist?cate="+n.list.cate+"&name="+encodeURIComponent(e)})},handleruku:function(){t.previewImage({urls:["https://www.peiyinstreet.com/guidang/peiyinguwen.png"],longPressActions:{itemList:["发送给朋友","保存图片","收藏"],success:function(t){console.log("选中了第"+(t.tapIndex+1)+"个按钮,第"+(t.index+1)+"张图片")},fail:function(t){console.log(t.errMsg)}}})},handlecloseerweima:function(){this.notputShow=!1,this.rukuShow=!1},handlechangehome:function(){t.switchTab({url:"/pages/index/index"})},getUserInfo:function(){var n=this;t.showLoading({title:"加载中"}),t.getUserProfile({desc:"登录后可发布需求",success:function(){var e=d(a.default.mark((function e(o){var i;return a.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.showToast({title:"授权成功",icon:"default",mask:!0}),i={nickname:o.userInfo.nickName,userId:n.userId,avatar:o.userInfo.avatarUrl,phone:""},e.next=4,(0,c.profileUpdate)(i);case 4:n.handleCouponCollection();case 5:case"end":return e.stop()}}),e)})));function o(t){return e.apply(this,arguments)}return o}(),fail:function(){t.showToast({title:"授权已取消",icon:"default",mask:!0})},complete:function(){t.hideLoading()}})},handleCouponCollection:function(){var n=this;(0,c.loginStatus)().then((function(e){0==e.data.nickname?n.getUserInfo():(0,c.couponadd)().then((function(e){0===e.data.type?(n.couponsShow=!0,n.couponsData=e.data):t.showToast({title:"今天的券已经领取过啦",icon:"none",duration:2e3}),console.log("优惠卷数据",e)})).catch((function(t){console.log("优惠卷错误信息",t)}))})).catch((function(t){console.log("返回错误信息",t)}))},handlecloseCollection:function(){this.securitiesShow=!1,(0,c.couponstatus)({status:1}).then((function(t){console.log("获取优惠卷的状态",t)}))},handlecloseCoupons:function(){this.couponsShow=!1},handleVisitorsJump:function(n){t.setStorageSync("current",n.tags[0].value),t.navigateTo({url:"/subpkg/pages/teacherlist/teacherlist?id="+n.teacher_id})},playTheMusic:function(t,n){var e=this;this.audioShow=!0,this.listPlayData=n,this.dataPlay.works.url===t.works.url?this.dataList.map((function(n){n.data.map((function(n){e.dataPlay===n?t.works.playStatus=!t.works.playStatus:n.playStatus=!1}))})):(this.dataList.map((function(t){t.data.map((function(t){t.works.playStatus=!1}))})),t.works.playStatus=!0,this.dataPlay=t),setTimeout((function(){e.$refs.musicAudio.preStartPlay()}),0)},handleChangePlay:function(t){var n=this;this.dataList.map((function(e){e.data.map((function(e){n.dataPlay===e?e.works.playStatus=t:e.works.playStatus=!1}))}))},musicClose:function(){this.servicelist(),this.audioShow=!1,this.dataPlay={works:{url:""}}}})),o);n.default=m}).call(this,e(1)["default"])},70:function(t,n,e){"use strict";e.r(n);var o=e(71),a=e.n(o);for(var i in o)"default"!==i&&function(t){e.d(n,t,(function(){return o[t]}))}(i);n["default"]=a.a},71:function(t,n,e){},72:function(t,n,e){"use strict";e.r(n);var o=e(73),a=e.n(o);for(var i in o)"default"!==i&&function(t){e.d(n,t,(function(){return o[t]}))}(i);n["default"]=a.a},73:function(t,n,e){}},[[61,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/dubbinglibrary/dubbinglibrary.js.map