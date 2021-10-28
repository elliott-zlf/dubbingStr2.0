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