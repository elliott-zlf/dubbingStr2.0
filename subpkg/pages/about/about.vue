 <template>
  <view class="about">
        <u-navbar
        :is-back="true"
        title="关于我们"
        title-size="36.232rpx"
        title-color="#000000"
        :border-bottom="true"
        ></u-navbar>
        <view class="content">
          <view class="about-item">
            <view class="title_box">
                <text class="title_gongs">公司介绍</text>
                <!-- <img class="sanjiao" src="../../assets/img/sanjiao.png" alt=""> -->
            </view>
            
            <text>配音街是一个能直接找配音师下单的平台。
            500+专业配音师，配音只需成本价。10min极速试音，2h内出成品，质量服务保障。

            平台由上海邋遢侠科技有限公司联合中诚嘉音创立。中诚嘉音成立于2008年，是国内知名的配音服务品牌和语音处理解决方案供应商，目前跟全国的千余家广告制作公司、广播电台、电视媒体等有着长期稳定的合作关系。
            </text>
                <!-- <image class="about_banner" src="https://www.peiyinstreet.com/guidang/about_banner.png" alt=""> -->
            </view>
            <view class="about-item">
                <view class="title_box">
                    <text class="title_gongs">我们的愿景</text>
                    <!-- <img class="sanjiao" src="../../assets/img/sanjiao.png" alt=""> -->
                </view>
                <text>通过整合行业资源，既能为每个客户提供高性价比的配音服务，也能为每个配音师提供一个自由接单平台来赚取收益。</text>
            </view>
            <view class="about-item">
                <view class="title_box">
                    <text class="title_gongs">配音街平台5大特点</text>
                    <!-- <img class="sanjiao" src="../../assets/img/sanjiao.png" alt=""> -->
                </view>
                <text>1.选择多：500+专业配音师，5000+样音供自由选择
                        2.速度快：需求直达配音师，10min极速试音，2h内出成品
                        3.品控好：成品通过平台二次校对后才交付，客服24h在线提供售后服务
                        4.更省钱：直接找配音师下单，配音只需成本价
                        5.模式新：既可以发布需求，平台匹配配音师配音。也可以在声音库里选择满意的声音，按效果配音。能自己自由选配音师，能直接找配音师下单，让配音像点外卖一样简单 
                </text>
            </view>
            <view class="about-item">
                <view class="title_box">
                    <view class="title_gongs">联系我们</view>
                    <!-- <img class="sanjiao" src="../../assets/img/sanjiao.png" alt=""> -->
                </view>
                <view>电话： <span>15136427280</span></view>
                <view>微信： <span>k85836427280</span></view>
                <view>公司地址： <span>上海市宜山路1602宏汇国际2楼</span></view>
            </view>
        </view>
  </view>
</template>

<script>
export default {
    data() {
    return {
		erweimaShow: false,
		loginStatusShow: false,
		userInfo: {

		}
	};
  },
  onLoad() {
  },
}
</script>

<style lang="scss">
.content {
   padding: 36.232rpx;
  .about_banner{width: 100%;margin-top: 10px;}
  .title_box{
    display: flex;
    align-items: center;
    margin-bottom:8px;
    }
    .sanjiao{
        width: 8px;
        height: 8px;
        margin-left: 10px;
    }
    .title_gongs {
        font-size: 28.986rpx;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #000000;
    }
    .about-item:not(:first-child){
        margin-top: 30px;
    }
    .about-item h2{
        font-weight: bold;
        margin-bottom: 16px;
    }
    .about-item p{
        line-height: 20px;text-align: justify;font-size: 14px;
    }
}
</style>
