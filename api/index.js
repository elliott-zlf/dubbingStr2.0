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
// 获取需求页面详情
export function urlIndex(data) {
    return request({
        url: '/street/url/index',
        method: 'POST',
        data
    })
}
// 筛选标签
export function homeConfig() {
    return request ({
        url: '/resources/home/config',
        method: 'GET'
    })
}
// 配音师库
export function serviceLits(data) {
    return request ({
        url: '/business/service/service',
        method: 'POST',
        data
    })
}
// 分享
export function profileShare(data) {
    return request ({
        url: '/business/profile/share',
        method: 'POST',
        data
    })
}
// 分享试音
export function fabulouworks(data) {
    return request({
        url: '/street/demand/fabulouworks',
        method: 'POST',
        data
    })
}
// 排名
export function serviceRank(data) {
    return request ({
        url: '/business/service/rank',
        method: 'POST',
        data
    })
}
// 领取优惠卷
export function couponadd(data) {
    return request ({
        url: '/street/coupon/add',
        method: 'POST',
        data
    })
}
// 优惠卷状态
export function couponstatus(data) {
    return request ({
        url: '/street/login/couponstatus',
        method: 'POST',
        data
    }) 
}
// 热门作品
export function servicehot(data) {
    return request({
        url: '/street/service/hot',
        method: 'POST',
        data
    })
}