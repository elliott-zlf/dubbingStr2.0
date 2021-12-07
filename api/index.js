import request from '../utils/request'

export function login(data) {
    return request ({
        url: '/common/oauth/userlogin',
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
export function saveUserInfo(data) {
    return request ({
        url: '/user/saveUserInfo',
        method: 'POST',
        data
    })
}
// 获取配音师列表
export function getAllteacher(data) {
    return request ({
        url: '/street/teacher/list',
        method: 'POST',
        data
    })
}
// 获取筛选标签
export function tagAll(data) {
    return request({
        url: '/street/tag/all',
        method: 'POST',
        data
    })
}
// 获取头像手机号用户状态 
export function loginStatus(data) {
    return request({
        url: '/street/login/status',
        method: 'POST',
        data
    })
}
// 发布需求
export function demandPublish(data) {
    return request({
        url: '/street/demand/publish',
        method: 'POST',
        data
    })
}
// 首页标签
export function homeTag(data) {
    return request ({
        url: '/street/tag/tag',
        method: 'POST',
        data: data
    })
}
// 保存个人头像和手机号
export function profileUpdate(data) {
    return request ({
        url: '/street/profile/update',
        method: 'POST',
        data: data
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
// 获取配音师个人信息
export function profileIndex(data) {
    return request({
        url: '/street/profile/index',
        method: 'POST',
        data
    })
}