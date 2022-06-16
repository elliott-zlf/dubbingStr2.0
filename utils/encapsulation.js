import { statisticsIndex,serviceWorknum } from "@/api/index.js";
export function buriedSomeStatistical(index) {
    // 统计在线下单
        let platform =  uni.getSystemInfoSync().platform
        if (platform == 'android' || platform == 'ios' || platform == 'devtools') {
            let data = {
                status: index,
                type: 0
            }
            // 手机端
            statisticsIndex(data).then((res)=>{
                console.log(res)
            }).catch(err=>{
                console.log(res)
            }) 

        }else {
            // 电脑端
            let data = {
                status: index,
                type: 1
            }
            statisticsIndex(data).then((res)=>{
                console.log(res)
            }).catch(err=>{
                console.log(res)
            }) 
        }
}
export function statisticalnum(work_id,type) {
    // 统计在线下单
    serviceWorknum({work_id,type}).then((res)=>{
        console.log('成功')
    }).catch(err=>{
        console.log('失败')
    })
}