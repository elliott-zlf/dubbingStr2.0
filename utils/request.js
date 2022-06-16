import store from "../store";
// const BASE_URL = 'http://42.192.120.145:8001'
let url = ''
 // #ifdef MP-WEIXIN
const accountInfo = wx.getAccountInfoSync();
		   switch (accountInfo.miniProgram.envVersion) {
			case 'develop':
				console.log('测试环境')
				url = 'https://street.peiyinstreet.com';
        // url = 'https://www.peiyinstreet.com';
				break;
			case 'trial':
			  url = 'https://www.peiyinstreet.com';
				break;
			case 'release':
				console.log('正式环境环境')
				url = 'https://www.peiyinstreet.com';
				break;
			default:
				console.log('默认环境环境环境')
				url = 'https://www.peiyinstreet.com';
				break;
			}
 // #endif  
 // #ifndef  MP-WEIXIN  
  url = 'https://www.peiyinstreet.com';
 // #endif  
const BASE_URL = url
function request({ url, data, method }) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: BASE_URL + url,
      data,
      method,
      header: {
        UserToken: store.state.user.token || ''
      },
      success: ({ data }) => {
        if (data.errcode===0) {
          resolve(data);
        } else {
          resolve(data);
        }
      },
      fail: (error) => {
        reject(error);
      }
    })
  })
}

export default request;
