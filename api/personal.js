import request from '../utils/request'

// 关注列表
export function scorelist(data) {
    return request ({
        url: '/street/score/list',
        method: 'POST',
        data
    })
}

// 优惠卷列表
export function couponlist(data) {
    return request({
        url: '/street/coupon/list',
        method: 'POST',
        data
    })
}
// 订单列表
export function orderList(data) {
    return request({
        url: '/street/order/list',
        method: 'POST',
        data
    })
}
// 订单详情
export function orderDetail(data) {
    return request({
        url: '/street/order/detail',
        method: 'POST',
        data
    })
}
// 手动取消订单
export function orderCancel(data) {
    return request({
        url: '/street/order/cancel',
        method: 'POST',
        data
    })
}
// 支付可用优惠卷
export function couponPaylist(data) {
    return request({
        url: '/street/coupon/paylist',
        method: 'POST',
        data
    })
}
// 我的关注列表
export function followListdata(data) {
    return request({
        url: '/street/follow/followlist',
        method: 'POST',
        data
    })
}
// 我的关注展示
export function followList(data) {
    return request({
        url: '/street/follow/list',
        method: 'POST',
        data
    })
}
// 向商家付款
export function orderavailable(data) {
    return request({
        url: '/street/order/available',
        method: 'POST',
        data
    })
}
// 我的作品
export function collectionlist(data) {
    return request({
        url: '/street/profile/collectionlist',
        method: 'POST',
        data
    })
}
// 我的作品
export function profileteacherlist(data) {
    return request({
        url: '/street/profile/teacherlist',
        method: 'POST',
        data
    })
}
// 我的作品
export function profileinformation(data) {
    return request({
        url: '/street/profile/information',
        method: 'POST',
        data
    })
}