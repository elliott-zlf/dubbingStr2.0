
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import store from './store';
Vue.config.productionTip = false
// 全局mixins，用于实现setData等功能';
import Mixin from './polyfill/mixins';
Vue.mixin(Mixin);
App.mpType = 'app'
// main.js
Vue.use(uView);

const app = new Vue({
    ...App,
    store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app,
    store
  }
}
// #endif