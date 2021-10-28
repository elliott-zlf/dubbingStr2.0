import { login, getWechatUserInfo,saveUserInfo } from 'api/index';
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
    /**
     * 保存 用户信息 到 vuex
     */
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
      this.commit('user/saveUserInfo');
    },
    /**
     * 保存 用户信息 到 本地存储
     */
    saveUserInfo(state) {
      uni.setStorage({
        key: STORAGE_KEY,
        data: state.userInfo
      });
    },
    /**
     * 删除用户信息
     */
    removeUserInfo(state) {
      state.userInfo = {};
      this.commit('user/saveUserInfo');
    }
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
      console.log('登录请求', res.data)
      this.commit('user/setToken', res.data);
      // this.commit('user/setUserInfo', JSON.parse(userProfile.rawData));
    },
    async saveUserInfo(content,userProfile) {
      console.log('user个人资料', userProfile)
      const data = userProfile.userInfo
      const wechatUser = {
        avatar: data.avatarUrl,
        city: data.province,
        nickname: data.nickName
      }
      // const res = await saveUserInfo(wechatUser)
      this.commit('user/setUserInfo', JSON.parse(userProfile.rawData));
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
