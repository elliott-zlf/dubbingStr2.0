<template>
 <view class="container">
   <u-navbar :is-back="false" title="极速试音" title-size="36.232rpx" title-color="#000000" :border-bottom="true"></u-navbar>
   <view class="content">
     <view class="peipei">
        <u-circle-progress active-color="#37C59D" :width="200" :border-width="7" :percent="100" duration="2000">
                <view class="u-progress-content">
                    <image
                        class="progress_content_img"
                        src="https://www.peiyinstreet.com/1.png"
                        mode="scaleToFill"
                    />
                </view>
        </u-circle-progress>
        <view class="tiptext">正在为您匹配符合要求</view>
        <view class="tiptext">并且可以极速试音的配音师</view>
     </view> 
   </view>
 </view>
</template>

<script>
export default{
    data() {
        return {
            timemiao: 3,
            timeupdata:'',
            id: ''
        }
    },
    onLoad(options) {
        this.id = options.id
    },
    onReady() {
    setTimeout(()=>{
          uni.redirectTo({
              url: '/subpkg/pages/demanddetails/demanddetails?id='+ this.id+'&status=0',
          })
      },2000)
       this.timeupdata = setInterval(()=>{
         if (this.timemiao===0) {
             this.timemiao = 0
         } else {
           this.timemiao = this.timemiao - 1  
         }
       },1200)
    },
    onHide() {
      clearInterval(this.timeupdata)
    }
}
</script>

<style>
.content {
    

}
.peipei {
    margin-top: 200rpx;
    text-align: center;
}
.u-progress-content {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 180rpx;
    height: 180rpx;
}
.progress_content_img {
    width: 100%;
    height: 100%;
    border-radius: 140rpx;
}
.timem {
    font-size: 27.174rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #37C59D;
}
.tiptext {
    margin-top: 18.116rpx;
    font-size: 27.174rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 500;
    color: #000000;
}
.u-progress-dot {
    margin-top: 18.116rpx;
    width: 16rpx;
    height: 16rpx;
    border-radius: 50%;
    background-color: #fb9126;
}

.u-progress-info {
    font-size: 28rpx;
    padding-left: 16rpx;
    letter-spacing: 2rpx
}
</style>
