import request from '../utils/request'

export function logingroup(data) {
    return request ({
        url: '/resources/login/group',
        method: 'POST',
        data
    })
}
export function loginwebsite(data) {
    return request({
        url: '/resources/login/website',
        method: 'POST',
        data
    })
}
// 获取UserID
export function chatSignature(data) {
    return request({
        url: '/street/chat/signature',
        method: 'POST',
        data
    })
}
// 未读消息数量总数
export function newsCount(data) {
    return request({
        url: '/street/chat/newscount',
        method: 'POST',
        data
    })
}