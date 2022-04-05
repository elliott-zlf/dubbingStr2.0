import request from '../utils/request'
// 名片详情数据
export function profileDetail(data) {
    return request ({
        url: '/street/profile/detail',
        method: 'POST',
        data
    })
}
// 点赞接口
export function followFabulous(data) {
    return request ({
        url: '/street/follow/fabulous',
        method: 'POST',
        data
    })
}
export function followFabuloulist() {
    return request ({
        url: '/business/follow/fabuloulist',
        method: 'POST'
    })
}
// 我的名片数据
export function followData(data) {
    return request ({
        url: '/business/follow/data',
        method: 'POST',
        data
    })
}
// 我访问的数据
export function followVisit(data) {
    return request ({
        url: '/business/follow/visit',
        method: 'POST',
        data
    })
}
// 关注和取消关注
export function changeFocus(data) {
    return request ({
        url: '/street/profile/follow',
        method: 'POST',
        data
    })
}
// 关注列表
export function followlist(data) {
    return request ({
        url: '/street/follow/followlist',
        method: 'POST',
        data
    })
}