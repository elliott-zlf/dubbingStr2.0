import request from '../utils/request'

// 配音师分类
export function servicelist(data) {
    return request ({
        url: '/street/service/servicelist',
        method: 'POST',
        data
    })
}
// 数量统计
export function servicecount(data) {
    return request ({
        url: '/business/service/servicecount',
        method: 'POST',
        data
    })
}
// 二级小标签
export function servicetag(data) {
    return request ({
        url: '/street/service/tag',
        method: 'POST',
        data
    })
}
// 二级列表
export function servicsecList(data) {
    return request ({
        url: '/street/service/servicedata',
        method: 'POST',
        data
    })
}
// 二级排名 
export function servicerank(data) {
    return request ({
        url: '/business/service/servicerank',
        method: 'POST',
        data
    })
}
// 收藏作品
export function collection(data) {
    return request ({
        url: '/street/profile/collection',
        method: 'POST',
        data
    })
}