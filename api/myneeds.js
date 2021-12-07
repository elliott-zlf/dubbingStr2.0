import request from '../utils/request'

// 我的需求、需求列表
export function demandSquare(data) {
    return request({
        url: '/street/demand/square',
        method: 'POST',
        data
    })
}
// 需求详情页数据
export function demandDetail(data) {
    return request({
        url: '/street/demand/detail',
        method: 'POST',
        data
    })
}
// 智能推荐弹窗
export function demandDemandteacher(data) {
    return request({
        url: '/street/demand/demandteacher',
        method: 'POST',
        data 
    })
}
// 收藏配音师
export function demandFabulousadd(data) {
    return request({
        url: '/street/demand/fabulousadd',
        method: 'POST',
        data 
    })
}
// 取消收藏配音师
export function demandFabulousdel(data) {
    return request({
        url: '/street/demand/fabulousdel',
        method: 'POST',
        data 
    })
}
// 邀请配音师
export function demandAdd(data) {
    return request({
        url: '/street/demand/add',
        method: 'POST',
        data
    })
}
// 取消邀请配音师
export function demandDel(data) {
    return request({
        url: '/street/demand/del',
        method: 'POST',
        data
    })
}
// 确认邀请配音师
export function demandConfirm(data) {
    return request({
        url: '/street/demand/confirm',
        method: 'POST',
        data
    })
}
// 需求待邀请的三个配音师
export function demandDetailteacher(data) {
    return request({
        url: '/street/demand/detailteacher',
        method: 'POST',
        data
    })
}
// 需求详情列表
export function demandFabulouslist(data) {
    return request({
        url: '/street/demand/fabulouslist',
        method: 'POST',
        data
    })
}
// 收藏的配音师
// export function demandFabulousadd(data) {
//     return request({
//         url: '/street/demand/fabulousadd',
//         method: 'POST',
//         data
//     })
// }