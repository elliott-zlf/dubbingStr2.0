(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["subpkg/pages/myfocus/myfocus"],{191:function(t,e,n){"use strict";(function(t){n(5);a(n(3));var e=a(n(192));function a(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=n,t(e.default)}).call(this,n(1)["createPage"])},192:function(t,e,n){"use strict";n.r(e);var a=n(193),r=n(195);for(var o in r)"default"!==o&&function(t){n.d(e,t,(function(){return r[t]}))}(o);n(197),n(199);var u,i=n(17),s=Object(i["default"])(r["default"],a["render"],a["staticRenderFns"],!1,null,"731c08c9",null,!1,a["components"],u);s.options.__file="subpkg/pages/myfocus/myfocus.vue",e["default"]=s.exports},193:function(t,e,n){"use strict";n.r(e);var a=n(194);n.d(e,"render",(function(){return a["render"]})),n.d(e,"staticRenderFns",(function(){return a["staticRenderFns"]})),n.d(e,"recyclableRender",(function(){return a["recyclableRender"]})),n.d(e,"components",(function(){return a["components"]}))},194:function(t,e,n){"use strict";var a;n.r(e),n.d(e,"render",(function(){return r})),n.d(e,"staticRenderFns",(function(){return u})),n.d(e,"recyclableRender",(function(){return o})),n.d(e,"components",(function(){return a}));try{a={uNavbar:function(){return n.e("uview-ui/components/u-navbar/u-navbar").then(n.bind(null,285))},uTabs:function(){return n.e("uview-ui/components/u-tabs/u-tabs").then(n.bind(null,324))},uLoadmore:function(){return n.e("uview-ui/components/u-loadmore/u-loadmore").then(n.bind(null,338))}}}catch(i){if(-1===i.message.indexOf("Cannot find module")||-1===i.message.indexOf(".vue"))throw i;console.error(i.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var r=function(){var t=this,e=t.$createElement;t._self._c},o=!1,u=[];r._withStripped=!0},195:function(t,e,n){"use strict";n.r(e);var a=n(196),r=n.n(a);for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);e["default"]=r.a},196:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=i(n(9)),r=n(80),o=i(n(69)),u=i(n(68));function i(t){return t&&t.__esModule?t:{default:t}}function s(t,e,n,a,r,o,u){try{var i=t[o](u),s=i.value}catch(c){return void n(c)}i.done?e(s):Promise.resolve(s).then(a,r)}function c(t){return function(){var e=this,n=arguments;return new Promise((function(a,r){var o=t.apply(e,n);function u(t){s(o,a,r,u,i,"next",t)}function i(t){s(o,a,r,u,i,"throw",t)}u(void 0)}))}}var l=function(){n.e("components/accesslist/accesslist").then(function(){return resolve(n(412))}.bind(null,n)).catch(n.oe)},d=function(){n.e("components/audio/audioplay").then(function(){return resolve(n(301))}.bind(null,n)).catch(n.oe)},f={components:{accesslist:l,musicAudio:d},data:function(){return{clickContent:"0",readList:[],attentionList:[],has_next:!0,play:u.default,playActive:o.default,pageData:{status:0,page:1,size:10},list:[{name:"我关注的",id:0},{name:"下过单的",id:1}],dataPlay:{works:{url:""}},scrollInto:0,current:0,audioShow:!1,defaultshow:!0}},onLoad:function(e){t.hideShareMenu(),this.handlegainCardData(this.pageData)},onHide:function(){this.musicClose()},methods:{change:function(t){this.current=t,this.pageData={status:this.current,page:1,size:10},this.handlegainCardData(this.pageData)},handlegainCardData:function(t){var e=this;return c(a.default.mark((function n(){var o;return a.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,(0,r.profileteacherlist)(t);case 2:o=n.sent,console.log("我的关注数据",o),e.readList=o.data,e.readList.length<o.count?e.has_next=!0:e.has_next=!1,0===e.readList.length?e.defaultshow=!1:e.defaultshow=!0,e.scrollInto=e.scrollTop,setTimeout((function(){e.scrollInto=0}),0);case 9:case"end":return n.stop()}}),n)})))()},handleVisitorsJump:function(e){t.navigateTo({url:"/subpkg/pages/teacherlist/teacherlist?id="+e.teacher_id})},handleDubbinglLibrary:function(){t.switchTab({url:"/pages/dubbinglibrary/dubbinglibrary"})},reachBottom:function(){var t=this;return c(a.default.mark((function e(){var n,o;return a.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!t.has_next){e.next=10;break}return n=t.pageData.page+1,t.pageData={page:n,size:10,status:t.current},e.next=5,(0,r.profileteacherlist)(t.pageData);case 5:o=e.sent,t.readList.length<o.count?t.has_next=!0:t.has_next=!1,o.data.map((function(e){t.readList.push(e)})),e.next=10;break;case 10:case"end":return e.stop()}}),e)})))()},tabScoll:function(t){this.scrollTop=t.detail.scrollTop},playTheMusic:function(t){var e=this;console.log("传过来的数据",t),this.audioShow=!0,this.dataPlay.works.url===t.teacher.works.url?this.readList.map((function(n){e.dataPlay===n?t.teacher.works.playStatus=!t.teacher.works.playStatus:n.playStatus=!1})):(this.readList.map((function(t){t.teacher.works.playStatus=!1})),t.teacher.works.playStatus=!0,this.dataPlay=t.teacher),setTimeout((function(){e.$refs.musicAudio.preStartPlay()}),0)},handleChangePlay:function(t){var e=this;this.readList.map((function(n){e.dataPlay===n?n.teacher.works.playStatus=t:n.teacher.works.playStatus=!1}))},musicClose:function(){this.readList.map((function(t){t.teacher.works.playStatus=!1})),this.audioShow=!1,this.dataPlay={works:{url:""}}}}};e.default=f}).call(this,n(1)["default"])},197:function(t,e,n){"use strict";n.r(e);var a=n(198),r=n.n(a);for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);e["default"]=r.a},198:function(t,e,n){},199:function(t,e,n){"use strict";n.r(e);var a=n(200),r=n.n(a);for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);e["default"]=r.a},200:function(t,e,n){}},[[191,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/subpkg/pages/myfocus/myfocus.js.map