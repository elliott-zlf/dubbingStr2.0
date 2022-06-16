import request from '../utils/request'
// 名片详情数据
export function casedataDetail(data) {
    return request ({
        url: '/street/case/casedata',
        method: 'POST',
        data
    })
}
// 案例推荐
export function recommendcase(data) {
    return request ({
        url: '/street/case/recommend',
        method: 'POST',
        data
    })
}
// 收藏案例
export function casecollection(data) {
    return request ({
        url: '/street/case/casecollection',
        method: 'POST',
        data
    })
}