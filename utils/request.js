import store from "../store";
// const BASE_URL = 'http://42.192.120.145:8001'
const BASE_URL = 'https://www.peiyinstreet.com'
function request({ url, data, method }) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: BASE_URL + url,
      data,
      method,
      header: {
        UserToken: 1 || ''
      },
      success: ({ data }) => {
        console.log('接口返回数据', data)
        if (data.errcode===0) {
          resolve(data);
        } else {
          reject(data.message);
        }
      },
      fail: (error) => {
        reject(error);
      }
    })
  })
}

export default request;
