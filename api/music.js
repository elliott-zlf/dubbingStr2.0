import request from '../utils/request'

// 配音配乐列表
export function voiceList(data) {
    return request ({
        url: '/street/voice/list',
        method: 'POST',
        data
    })
}
// 播放下载+1
export function voicePlay(data) {
    return request ({
        url: '/street/voice/play',
        method: 'POST',
        data
    })
}