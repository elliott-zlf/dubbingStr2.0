(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["subpkg/pages/orderdetails/orderdetails"],{241:function(e,n,t){"use strict";(function(e){t(5);o(t(3));var n=o(t(242));function o(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=t,e(n.default)}).call(this,t(1)["createPage"])},242:function(e,n,t){"use strict";t.r(n);var o=t(243),r=t(245);for(var i in r)"default"!==i&&function(e){t.d(n,e,(function(){return r[e]}))}(i);t(247);var a,u=t(17),s=Object(u["default"])(r["default"],o["render"],o["staticRenderFns"],!1,null,null,null,!1,o["components"],a);s.options.__file="subpkg/pages/orderdetails/orderdetails.vue",n["default"]=s.exports},243:function(e,n,t){"use strict";t.r(n);var o=t(244);t.d(n,"render",(function(){return o["render"]})),t.d(n,"staticRenderFns",(function(){return o["staticRenderFns"]})),t.d(n,"recyclableRender",(function(){return o["recyclableRender"]})),t.d(n,"components",(function(){return o["components"]}))},244:function(e,n,t){"use strict";var o;t.r(n),t.d(n,"render",(function(){return r})),t.d(n,"staticRenderFns",(function(){return a})),t.d(n,"recyclableRender",(function(){return i})),t.d(n,"components",(function(){return o}));try{o={uCountDown:function(){return t.e("uview-ui/components/u-count-down/u-count-down").then(t.bind(null,452))},uPopup:function(){return t.e("uview-ui/components/u-popup/u-popup").then(t.bind(null,466))},release:function(){return Promise.all([t.e("common/vendor"),t.e("components/release/release")]).then(t.bind(null,494))},dropball:function(){return t.e("components/dropball/dropball").then(t.bind(null,413))},prompt:function(){return t.e("components/prompt/prompt").then(t.bind(null,540))}}}catch(u){if(-1===u.message.indexOf("Cannot find module")||-1===u.message.indexOf(".vue"))throw u;console.error(u.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var r=function(){var e=this,n=e.$createElement;e._self._c;e._isMounted||(e.e0=function(n){n.stopPropagation(),e.handleCloseSubmitShow},e.e1=function(n){n.stopPropagation(),e.handleCloseSubmit})},i=!1,a=[];r._withStripped=!0},245:function(e,n,t){"use strict";t.r(n);var o=t(246),r=t.n(o);for(var i in o)"default"!==i&&function(e){t.d(n,e,(function(){return o[e]}))}(i);n["default"]=r.a},246:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=t(80),r=t(92),i=u(t(81)),a=t(732);function u(e){return e&&e.__esModule?e:{default:e}}var s=function(){t.e("components/audio/audioplay").then(function(){return resolve(t(422))}.bind(null,t)).catch(t.oe)},c=function(){t.e("components/pyspopup/pyspopup").then(function(){return resolve(t(549))}.bind(null,t)).catch(t.oe)},l=function(){Promise.all([t.e("common/vendor"),t.e("components/release/release")]).then(function(){return resolve(t(494))}.bind(null,t)).catch(t.oe)},d=function(){t.e("components/dropball/dropball").then(function(){return resolve(t(413))}.bind(null,t)).catch(t.oe)},p=function(){t.e("components/prompt/prompt").then(function(){return resolve(t(540))}.bind(null,t)).catch(t.oe)},f={components:{musicAudio:s,pyspopuup:c,release:l,dropball:d,prompt:p},data:function(){return{background:{backgroundColor:"#FFFFFF"},type:"",play:"https://www.peiyinstreet.com/guidang/play.png",playActive:"https://www.peiyinstreet.com/guidang/palyActive.png",orderId:"",orderData:{},dataPlay:{url:""},current:"",audioShow:!1,notputShow:!1,demandProfile:{},submitShow:!1,submitShow1:!1,urlpath:"",promptShow:!1}},onLoad:function(e){this.type=e.type,this.orderId=e.id,this.urlpath=e.type,this.getOrderDetail(this.orderId)},onHide:function(){this.musicClose()},methods:{getOrderDetail:function(e){var n=this;(0,o.orderDetail)({order_id:e}).then((function(e){n.orderData=e.data,n.current=n.orderData.status}))},handleCheckdemand:function(){var e=this;(0,r.demandDetail)({demand_id:this.orderData.demand_id}).then((function(n){console.log("需求详情的数据---------",n),e.submitShow1=!0,e.demandProfile=n.data}))},handleruku:function(){e.previewImage({urls:["https://www.peiyinstreet.com/guidang/peiyinguwen.png"],longPressActions:{itemList:["发送给朋友","保存图片","收藏"],success:function(e){console.log("选中了第"+(e.tapIndex+1)+"个按钮,第"+(e.index+1)+"张图片")},fail:function(e){console.log(e.errMsg)}}})},hanldeOrderPay:function(n){var t=this;(0,r.orderPay)({order_id:n.order_id}).then((function(n){console.log("支付返回参数",n);var o=n.order_id,r=t;e.requestPayment({provider:"wxpay",timeStamp:n.data.timeStamp,nonceStr:n.data.nonceStr,package:n.data.package,signType:n.data.signType,paySign:n.data.paySign,success:function(n){console.log("success:"+JSON.stringify(n)),r.getOrderDetail(o),e.requestSubscribeMessage({tmplIds:["EKGq56oSCMqh1bslBtr01L9ELuL7PjWhFb7vuoJuySk","L1BpikjyiraC4mZKTYm_YS5T4PRCp-9uW7DjWKlM8M8"],success:function(e){console.log(e)}})},fail:function(e){console.log("支付回调失败fail:"+JSON.stringify(e)),r.getOrderDetail(o)}})}))},handleCloseOrder:function(e){this.notputShow=!0},handleJumpdetails:function(n){console.log("该配音师已下架，请选择其他老师",n),0===n.teacher_status?e.showToast({title:"该配音师已下架，请选择其他老师",icon:"none"}):e.navigateTo({url:"/subpkg/pages/teacherlist/teacherlist?id="+n.teacher_id})},handleclose:function(){this.notputShow=!1},handleConfirm:function(){var e=this;(0,o.orderCancel)({order_id:this.orderData.id}).then((function(n){e.getOrderDetail(e.orderId),e.notputShow=!1}))},handlePrompt:function(){this.promptShow=!0},handleCloseSubmit:function(){this.promptShow=!1},playTheMusic:function(e){var n=this;console.log("传过来的数据",e,this.orderData),this.audioShow=!0,this.orderData.work.playStatus=!this.orderData.work.playStatus,this.dataPlay=e,setTimeout((function(){n.$refs.musicAudio.preStartPlay()}),0),this.orderData.work.playStatus&&(0,a.buriedSomeStatistical)(0)},handleChangePlay:function(e){this.orderData.work.playStatus=!this.orderData.work.playStatus},musicClose:function(){this.orderData.work.playStatus=!1,this.audioShow=!1,this.dataPlay={url:""}},handleCloseSubmitShow:function(){this.submitShow1=!1},downloadcopy:function(n,t){(0,i.default)({content:n,success:function(n){e.showToast({title:t,icon:"none"})},error:function(e){}})}},handleGoBack:function(){"index"==this.urlpath?e.navigateBack({delta:1}):e.switchTab({url:"/pages/index/index"})}};n.default=f}).call(this,t(1)["default"])},247:function(e,n,t){"use strict";t.r(n);var o=t(248),r=t.n(o);for(var i in o)"default"!==i&&function(e){t.d(n,e,(function(){return o[e]}))}(i);n["default"]=r.a},248:function(e,n,t){}},[[241,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/subpkg/pages/orderdetails/orderdetails.js.map