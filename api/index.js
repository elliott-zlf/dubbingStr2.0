import request from '../utils/request'

export function login(data) {
    return request ({
        url: '/resources/login/login',
        method: 'POST',
        data
    })
}
export function getwechatDemand(data) {
    return request ({
        url: '/wechatDemand/add',
        method: 'POST',
        data
    })
}
export function getWechatUserInfo(data) {
    return request ({
        url: '/user/getWechatUserInfo',
        method: 'GET',
        data
    })
}
export function saveUserInfo(data) {
    return request ({
        url: '/user/saveUserInfo',
        method: 'POST',
        data
    })
}
export function getAllteacher() {
    return request ({
        url: '/resources/login/list',
        method: 'GET'
    })
}
export function serviceLits(data) {
    return request ({
        url: '/resources/login/list',
        method: 'POST',
        data: data
    })
}
// 筛选标签
export function homeConfig() {
    return request ({
        url: '/resources/home/config',
        method: 'GET'
    })
}
// 分享
export function loginShare(data) {
    return request({
        url: '/resources/login/share',
        method: 'POST',
        data
    })
}