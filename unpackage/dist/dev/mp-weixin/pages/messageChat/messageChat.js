(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/messageChat/messageChat"],{109:function(e,n,t){"use strict";(function(e){t(5);r(t(3));var n=r(t(110));function r(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=t,e(n.default)}).call(this,t(1)["createPage"])},110:function(e,n,t){"use strict";t.r(n);var r=t(111),o=t(113);for(var c in o)"default"!==c&&function(e){t.d(n,e,(function(){return o[e]}))}(c);t(115),t(117);var u,a=t(17),i=Object(a["default"])(o["default"],r["render"],r["staticRenderFns"],!1,null,"0b704ff4",null,!1,r["components"],u);i.options.__file="pages/messageChat/messageChat.vue",n["default"]=i.exports},111:function(e,n,t){"use strict";t.r(n);var r=t(112);t.d(n,"render",(function(){return r["render"]})),t.d(n,"staticRenderFns",(function(){return r["staticRenderFns"]})),t.d(n,"recyclableRender",(function(){return r["recyclableRender"]})),t.d(n,"components",(function(){return r["components"]}))},112:function(e,n,t){"use strict";var r;t.r(n),t.d(n,"render",(function(){return o})),t.d(n,"staticRenderFns",(function(){return u})),t.d(n,"recyclableRender",(function(){return c})),t.d(n,"components",(function(){return r}));try{r={uNavbar:function(){return t.e("uview-ui/components/u-navbar/u-navbar").then(t.bind(null,392))},uIcon:function(){return t.e("uview-ui/components/u-icon/u-icon").then(t.bind(null,487))}}}catch(a){if(-1===a.message.indexOf("Cannot find module")||-1===a.message.indexOf(".vue"))throw a;console.error(a.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var o=function(){var e=this,n=e.$createElement;e._self._c},c=!1,u=[];o._withStripped=!0},113:function(e,n,t){"use strict";t.r(n);var r=t(114),o=t.n(r);for(var c in r)"default"!==c&&function(e){t.d(n,e,(function(){return r[e]}))}(c);n["default"]=o.a},114:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=t(12),o=t(46),c=t(732);function u(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?u(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):u(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var s={data:function(){return{conversationList:[],conversation:{},showSelectTag:!0,array:[{name:"发起会话"},{name:"发起群聊"},{name:"加入群聊"}],background:{backgroundColor:"#ffffff"},sessionAugments:{id:"",StartIndex:0,TimeStamp:0},sessionItemList:[],dataShow:!0}},computed:a({},(0,r.mapState)("user",["token","userId"])),onLoad:function(){},onUnload:function(){},methods:{handleRoute:function(){(0,c.buriedSomeStatistical)(2),wx.openCustomerServiceChat({extInfo:{url:"https://work.weixin.qq.com/kfid/kfcade993b61c3ff656"},corpId:"ww901fbb3c6ecf9871",success:function(e){console.log("接入小程序客服成功")},fail:function(n){console.log("接小程序客服失败",n),e.showToast({icon:"none",title:"仅支持在手机微信中使用该功能哦"})}})},handleInstructionManual:function(){(0,o.profilePlatform)().then((function(n){e.navigateTo({url:"/subpkg/pages/webview/webview?src="+n.data+"&&title=平台规范化运营手册"})}))},handleclose:function(){this.showSelectTag=!1}}};n.default=s}).call(this,t(1)["default"])},115:function(e,n,t){"use strict";t.r(n);var r=t(116),o=t.n(r);for(var c in r)"default"!==c&&function(e){t.d(n,e,(function(){return r[e]}))}(c);n["default"]=o.a},116:function(e,n,t){},117:function(e,n,t){"use strict";t.r(n);var r=t(118),o=t.n(r);for(var c in r)"default"!==c&&function(e){t.d(n,e,(function(){return r[e]}))}(c);n["default"]=o.a},118:function(e,n,t){}},[[109,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/messageChat/messageChat.js.map