(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["subpkg/pages/payment/payment"],{233:function(e,n,t){"use strict";(function(e){t(5);o(t(3));var n=o(t(234));function o(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=t,e(n.default)}).call(this,t(1)["createPage"])},234:function(e,n,t){"use strict";t.r(n);var o=t(235),a=t(237);for(var i in a)"default"!==i&&function(e){t.d(n,e,(function(){return a[e]}))}(i);t(239);var r,c=t(17),u=Object(c["default"])(a["default"],o["render"],o["staticRenderFns"],!1,null,null,null,!1,o["components"],r);u.options.__file="subpkg/pages/payment/payment.vue",n["default"]=u.exports},235:function(e,n,t){"use strict";t.r(n);var o=t(236);t.d(n,"render",(function(){return o["render"]})),t.d(n,"staticRenderFns",(function(){return o["staticRenderFns"]})),t.d(n,"recyclableRender",(function(){return o["recyclableRender"]})),t.d(n,"components",(function(){return o["components"]}))},236:function(e,n,t){"use strict";var o;t.r(n),t.d(n,"render",(function(){return a})),t.d(n,"staticRenderFns",(function(){return r})),t.d(n,"recyclableRender",(function(){return i})),t.d(n,"components",(function(){return o}));try{o={uNavbar:function(){return t.e("uview-ui/components/u-navbar/u-navbar").then(t.bind(null,285))},uPopup:function(){return t.e("uview-ui/components/u-popup/u-popup").then(t.bind(null,345))},uTabs:function(){return t.e("uview-ui/components/u-tabs/u-tabs").then(t.bind(null,324))},uCheckbox:function(){return t.e("uview-ui/components/u-checkbox/u-checkbox").then(t.bind(null,405))},release:function(){return Promise.all([t.e("common/vendor"),t.e("components/release/release")]).then(t.bind(null,373))}}}catch(c){if(-1===c.message.indexOf("Cannot find module")||-1===c.message.indexOf(".vue"))throw c;console.error(c.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var a=function(){var e=this,n=e.$createElement;e._self._c},i=!1,r=[];a._withStripped=!0},237:function(e,n,t){"use strict";t.r(n);var o=t(238),a=t.n(o);for(var i in o)"default"!==i&&function(e){t.d(n,e,(function(){return o[e]}))}(i);n["default"]=a.a},238:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=t(80),a=t(92),i=function(){Promise.all([t.e("common/vendor"),t.e("components/release/release")]).then(function(){return resolve(t(373))}.bind(null,t)).catch(t.oe)},r={components:{release:i},data:function(){return{background:{backgroundColor:"#FFFFFF"},type:"",play:"https://www.peiyinstreet.com/guidang/play.png",playActive:"https://www.peiyinstreet.com/guidang/palyActive.png",from:{orderamount:""},list:[],couponsData:[],couponsShow:!1,defaultshow:!0,checkedbox:!1,demand_id:"",teacher_id:"",barStyle:{backgroundColor:"#FF445A"},selCoupon:{},current:0,paymentData:{},payPrice:"",creditAmount:"",demandProfile:{},score_price:0,submitShow:!1}},onLoad:function(e){this.demand_id=e.id,this.teacher_id=e.teacher_id,this.getPaymentData()},methods:{getPaymentData:function(){var e=this;(0,o.orderavailable)({demand_id:this.demand_id,teacher_id:this.teacher_id}).then((function(n){console.log("订单数据",n),e.paymentData=n.data,e.payPrice=Number(e.paymentData.price)-e.paymentData.score_price,e.selCoupon={}}))},handleJumpdetails:function(n){e.navigateTo({url:"/subpkg/pages/teacherlist/teacherlist?id="+n})},handleCheckdemand:function(){var e=this;(0,a.demandDetail)({demand_id:this.demand_id}).then((function(n){console.log("需求详情的数据---------",n),e.demandProfile=n.data,e.submitShow=!0}))},hanldeSubmit:function(){this.submitShow=!1,this.getPaymentData(this.demand_id)},handleruku:function(){e.previewImage({urls:["https://www.peiyinstreet.com/guidang/peiyinguwen.png"],longPressActions:{itemList:["发送给朋友","保存图片","收藏"],success:function(e){console.log("选中了第"+(e.tapIndex+1)+"个按钮,第"+(e.index+1)+"张图片")},fail:function(e){console.log(e.errMsg)}}})},change:function(e){this.current=e,this.handleShowCoupons()},handleShowCoupons:function(){var e=this,n="",t="";(0,o.couponPaylist)({status:this.current}).then((function(o){e.couponsData=o.data,0===o.data.length?e.defaultshow=!1:e.defaultshow=!0,n="可用优惠券("+o.count.coupon_available_count+")",t="不可用优惠券("+o.count.coupon_notavailable_count+")",e.couponsData.map((function(n){n.id===e.selCoupon.id?n.checkedbox=e.selCoupon.checkedbox:n.checkedbox=!1})),e.list=[{name:n,id:0},{name:t,id:1}]})),this.couponsShow=!0},handleCheckboxchange:function(e){console.log("选中的优惠卷",e),this.selCoupon=e,this.couponsData.map((function(n){n.checkedbox=n===e&&e.checkedbox}))},hanldeOrderPay:function(n){console.log("支付参数",n);var t={order_id:"",price:n.price,total_price:this.payPrice,coupon_id:this.selCoupon.id,score:n.score_price,teacher_id:n.demand.teacher_id,demand_id:n.demand.id,service_id:n.demand.service_id};(0,a.orderPay)(t).then((function(n){console.log("支付返回参数",n);var t=n.order_id;e.requestPayment({provider:"wxpay",timeStamp:n.data.timeStamp,nonceStr:n.data.nonceStr,package:n.data.package,signType:n.data.signType,paySign:n.data.paySign,success:function(n){console.log("success:"+JSON.stringify(n)),console.log("fail返回的参数",n),e.redirectTo({url:"/subpkg/pages/orderdetails/orderdetails?id="+t})},fail:function(n){console.log("fail返回的参数",n),console.log("fail:"+JSON.stringify(n)),e.redirectTo({url:"/subpkg/pages/orderdetails/orderdetails?id="+t})}})}))},handleSelectedCoupon:function(){this.couponsShow=!1,this.payPrice=Number(this.paymentData.price);var e=this.payPrice*(10*this.selCoupon.price/100),n=Math.floor(100*e)/100;this.creditAmount=Math.floor(100*(this.payPrice-n))/100,this.payPrice=n-this.paymentData.score_price},handleGoBack:function(){e.switchTab({url:"/pages/index/index"})}}};n.default=r}).call(this,t(1)["default"])},239:function(e,n,t){"use strict";t.r(n);var o=t(240),a=t.n(o);for(var i in o)"default"!==i&&function(e){t.d(n,e,(function(){return o[e]}))}(i);n["default"]=a.a},240:function(e,n,t){}},[[233,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/subpkg/pages/payment/payment.js.map