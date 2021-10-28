import request from '../utils/request'

export function getDemandList(data) {
    return request ({
        url: '/wechatDemand/getDemandList',
        method: 'GET',
        data
    })
}
export function wechatDemandDetails() {
    return request({
        url: '/wechatDemand/getOne',
        method: 'GET',
        data
    })
}
export function getStateList() {
    return request({
        url: '/wechatState/getStateList',
        method: 'POST'
    })
}