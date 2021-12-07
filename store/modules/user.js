import { login, getWechatUserInfo } from 'api/index';
import { chatSignature } from '@/api/message.js'
const STORAGE_KEY = 'user-info';
const TOKEN_KEY = 'token';
const PHONE_NUM = 'phoneNumber'
export default {
  namespaced: true,
  state: () => {
    return {
      // 用户 token
      token: uni.getStorageSync(TOKEN_KEY) || '',
      // 用户信息
      userInfo: uni.getStorageSync(STORAGE_KEY) || {},
      phoneNumber: uni.getStorageSync(PHONE_NUM) || '',
      userId: ''
    };
  },
  mutations: {
    /**
     * 保存 token 到 vuex
     */
    setToken(state, token) {
      state.token = token;
      this.commit('user/saveToken');
    },
    /**
     * 保存 token 到 本地存储
     */
    saveToken(state) {
      uni.setStorage({
        key: TOKEN_KEY,
        data: state.token
      });
    },
    setUserId(state,userId) {
      console.log('userID',state,userId)
      state.userId = userId
    },
    setPhone(state,phone) {
      state.phoneNumber = phone;
      this.commit('user/savePhone');
    },
    savePhone(state) {
      uni.setStorage({
        key: PHONE_NUM,
        data: state.phoneNumber
      });
    },
    /**
     * 删除 token
     */
    removeToken(state) {
      state.token = '';
      this.commit('user/saveToken');
    },
  },
  actions: {
    /**
     * 完成登录
     */
    async login(context, userProfile) {
      // 用户数据
      const res = await login({
        code: userProfile,
      });
      // 登录逻辑
      console.log('登录请求', res.data.id)
      this.commit('user/setToken', res.data.id);
      const userIdres = await chatSignature()
      this.commit('user/setUserId', userIdres.data.userId);
    },

    async getWechatUserInfo(content) {
      const res = await getWechatUserInfo()
      this.commit('user/setPhone',res.data.phone)
    },
    /**
     * 退出登录
     */
    logout(context) {
      this.commit('user/removeToken');
      this.commit('user/removeUserInfo');
    },
    /**
     * 进行登录判定
     */
    async isLogin(context) {
      if (context.state.token) return true;
      // 如果用户未登录，则引导用户进入登录页面
      const [error, res] = await uni.showModal({
        title: '登录之后才可以进行后续操作',
        content: '立即跳转到登录页面？（登录后回自动返回当前页面哦~~~）'
      });
      const { cancel, confirm } = res;
      if (confirm) {
        uni.navigateTo({
          url: '/subpkg/pages/login-page/login-page'
        });
      }
      return false;
    }
  }
};
