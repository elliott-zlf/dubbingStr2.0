// uniapp 已默认安装，不需要重新下载
import Vue from 'vue'
import Vuex from 'vuex'
// 导入search.js 暴露的对象
import user from './modules/user'

// 安装Vuex插件
Vue.use(Vuex)
// 3. 创建store实列
const store = new Vuex.Store({
    modules: {
        user
    }
})
export default store;