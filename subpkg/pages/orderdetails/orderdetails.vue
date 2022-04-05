<template>
  <view class="container">
    <u-navbar
      :is-back="true"
      title="订单详情"
      title-size="36.232rpx"
      title-color="#000000"
      :border-bottom="true"
      :background="background"
      back-icon-color="#000000"
    ></u-navbar>
    <pyspopuup v-if="notputShow" @handleclose="handleclose" @handleConfirm="handleConfirm"></pyspopuup>
    <view class="integral">
      <view v-if="orderData.status == 1" class="availableIntegral">
        <view class="score">
          <image
            class="clock_icon"
            src="@/static/coupons/clock.png"
            mode="scaleToFill"
          />
          <view class="payment">待付款</view>
        </view>
        <view class="score_text">
          <u-count-down
            v-if="itemList.time !== 0"
            class="countdown_num"
            :timestamp="orderData.time"
            font-size="25.362"
            separator-size="25.362"
            bg-color="#FE445A"
            separator-color="#FFFFFF"
            color="#FFFFFF"
          ></u-count-down>
            未付款订单自动关闭
        </view>
      </view>
      <view v-if="orderData.status == 2" class="availableIntegral">
        <view class="score">
          <image
            class="clock_icon"
            src="@/static/coupons/clock.png"
            mode="scaleToFill"
          />
          <view class="payment">待交付</view>
        </view>
        <view class="score_text">
          成品交付后会短信通知您来下载
        </view>
      </view>
      <view v-if="orderData.status == 3" class="availableIntegral">
        <view class="score">
          <image
            class="clock_icon"
            src="@/static/coupons/wancheng.png"
            mode="scaleToFill"
          />
          <view class="payment">已完成</view>
        </view>
        <view class="score_text"> 成品若有疑问，请联系客服 </view>
      </view>
      <view v-if="orderData.status == 4" class="availableIntegral">
        <view class="score">
          <image
            class="clock_icon"
            src="@/static/coupons/clock.png"
            mode="scaleToFill"
          />
          <view class="payment">已关闭</view>
        </view>
        <view class="score_text">
          使用的优惠券和积分已自动返还
        </view>
      </view>
    </view>
    <view class="demandinfo_box">
      <view class="demandinfo_top">
        <view class="item_list">
          <view class="title">我的需求</view>
          <view class="content checkDemand" @click="handleCheckdemand">
			   <text class="toView">点击查看</text>
			   <image
				  class="yhjright"
				  src="@/static/coupons/yhjright.png"
				  mode="scaleToFill"
				/>
		  </view>
        </view>
        <view class="item_list">
          <view class="title">终稿字数</view>
          <view class="content checkDemand"  @click="handleCheckdemand">
			    {{ orderData.draft_word_count }}
          <image
            class="yhjright"
            src="@/static/coupons/yhjright.png"
            mode="scaleToFill"
          />
		  </view>
        </view>
        <view class="item_list">
          <view class="title">订单金额</view>
          <view class="content">￥{{ orderData.origin_price }}</view>
        </view>
        <view class="item_list">
          <view class="title">优惠券</view>
          <view class="content">-¥{{ orderData.discount_price }}</view>
        </view>
        <view class="item_list">
          <view class="title">积分</view>
          <view class="content">-¥{{ orderData.score_price }}</view>
        </view>
      </view>
      <view class="demandinfo_bottom">
        <view class="payable"><text>{{orderData.status == '1' || orderData.status == '4' ? '应付款：' : '实付款：' }}</text><text class="payable_num">￥{{ orderData.pay_price }}</text></view>
      </view>
    </view>
    <view class="voice_teacher_box">
      <view class="voice_teacher">
        <view class="item_list">
          <view class="title">服务配音师</view>
          <view class="content nicknamebox" @click="handleJumpdetails(orderData)">
            <image
              class="avatar"
              :src="orderData.teacher.avatar"
              mode="scaleToFill"
            />
            <text class="nickname">
              {{ orderData.teacher.nickname }}
            </text>
            <image
              class="yhjright"
              src="@/static/coupons/yhjright.png"
              mode="scaleToFill"
            />
          </view>
        </view>
        <view class="item_list">
          <view class="title">服务单价</view>
          <view class="content">{{orderData.offer_price}}</view>
        </view>
      </view>
    </view>
    <view class="voice_teacher_box">
      <view class="voice_teacher">
        <view class="item_list">
          <view class="title">订单编号</view>
          <view class="content">{{ orderData.order_id }}</view>
        </view>
        <view class="item_list">
          <view class="title">下单时间</view>
          <view class="content">{{ orderData.created_at }}</view>
        </view>
        <view class="item_list" v-if="orderData.status != 1 && orderData.status != 4">
          <view class="title">支付时间</view>
          <view class="content">{{ orderData.pay_at }}</view>
        </view>
      </view>
    </view>
    <view
      v-if="orderData.status == '1'"
      class="paybtn_box"
    >
      <view class="pay_amount">￥{{ orderData.pay_price }}</view>
      <view class="paybtn_btn_box">
         <view class="cancelbtn_btn" @click="handleCloseOrder(orderData.id)">取消支付</view>
         <view class="paybtn_btn" @click="hanldeOrderPay(orderData)">立即支付</view>
      </view>
    </view>
    <view v-if="orderData.status == '3'" class="finished_box">
      <view class="play_box" @click="playTheMusic(orderData.work)">
        <image class="play_icon" :src="orderData.work.playStatus ? playActive : play" mode="scaleToFill" />
        <text class="play_title">{{orderData.work.title}}</text>
      </view>
      <view class="download" @click="downloadcopy(orderData.work.url,'下载链接已复制，请粘贴到浏览器打开')">
        <image
          class="download_icon"
          src="@/static/teacherlist/download.png"
          mode="scaleToFill"
        />
      </view>
    </view>
    <!-- <view v-if="orderData.status !== '1'" class="lianxikefu" @click="handleruku">
      <view class="service_box">
        <image
          class="service_icon"
          src="@/static/home/kefu.png"
          mode="scaleToFill"
        />
        <text class="lianxikefu_text">配音顾问</text>
      </view>
    </view> -->
    <view
      v-if="audioShow"
      class="home_musicSrc_box disappear"
    >
      <musicAudio
        ref="musicAudio"
        :url="dataPlay.url"
        :autoplay="true"
        :portrait="orderData.teacher.avatar"
        :music_title="dataPlay.title"
        @handleChangePlay="handleChangePlay"
        @musicClose="musicClose"
      ></musicAudio>
    </view>
    <u-popup v-model="submitShow" mode="bottom" height="984.348rpx" border-radius="24">
			<!-- <release ref="submitform" :bottomTitle="true" :data="demandProfile" :payment="true" :subTitle="false" :editor="false" :submitbtnS="false" btnText="需求详情"></release> -->
	  </u-popup>
    <div v-show="submitShow1" class="custom_popup" @tap.stop="handleCloseSubmitShow">
       <div class="masklayer" @click.stop="!handleCloseSubmitShow">
         <release ref="submitform" :bottomTitle="true" :data="demandProfile" :payment="true" :subTitle="false" :editor="false" :submitbtnS="false" btnText="需求详情"></release>
       </div>
    </div>
    <dropball title="联系客服">
	  </dropball>
  </view>
</template>

<script>
import { orderDetail,orderCancel } from "@/api/personal.js";
// 支付接口
import { demandDetail,orderPay } from "@/api/myneeds.js";
// 播放组件
import musicAudio from "@/components/audio/audioplay.vue";
import uniCopy from '@/utils/uni-copy.js'
import pyspopuup from '@/components/pyspopup/pyspopup.vue'
import release from '@/components/release/release.vue'
import dropball from '@/components/dropball/dropball.vue'
export default {
  components: {
    musicAudio,
    pyspopuup,
    release,
    dropball
  },
  data() {
    return {
      background: {
        backgroundColor: "#FFFFFF",
      },
      type: "",
      play: "https://www.peiyinstreet.com/guidang/play.png",
      playActive: "https://www.peiyinstreet.com/guidang/palyActive.png",
      orderId: "",
      orderData: {},
      dataPlay: {
        url: ""
      },
      current: '',
      audioShow: false,
      notputShow: false,
      demandProfile: {},
      submitShow: false,
      submitShow1: false
    };
  },
  onLoad(options) {
    this.type = options.type;
    this.orderId = options.id;
    this.getOrderDetail(this.orderId);
  },
  onHide() {
	this.musicClose()
  },
  methods: {
    // 获取订单详情
    getOrderDetail(id) {
      orderDetail({ order_id: id }).then((res) => {
        this.orderData = res.data;
        this.current = this.orderData.status
      });
    },
    // 需求详情数据
    handleCheckdemand() {
      demandDetail({demand_id: this.orderData.demand_id}).then((res)=>{
        console.log('需求详情的数据---------', res)
        this.submitShow1 = true
        this.demandProfile = res.data
      })
    },
    //  入库
    handleruku() {
      uni.previewImage({
        urls: ["https://www.peiyinstreet.com/guidang/peiyinguwen.png"],
        longPressActions: {
          itemList: ["发送给朋友", "保存图片", "收藏"],
          success: function (data) {
            console.log(
              "选中了第" +
                (data.tapIndex + 1) +
                "个按钮,第" +
                (data.index + 1) +
                "张图片"
            );
          },
          fail: function (err) {
            console.log(err.errMsg);
          },
        },
      });
    },
    //  订单支付
    hanldeOrderPay(item) {
      orderPay({ order_id: item.order_id }).then((res) => {
        console.log("支付返回参数", res);
        var order_id = res.order_id
        const _that = this;
        // 仅作为示例，非真实参数信息。
        uni.requestPayment({
          provider: "wxpay",
          timeStamp: res.data.timeStamp,
          nonceStr: res.data.nonceStr,
          package: res.data.package,
          signType: res.data.signType,
          paySign: res.data.paySign,
          success: function (res) {
            console.log("success:" + JSON.stringify(res));
            _that.getOrderDetail(order_id);
          },
          fail: function (err) {
            console.log("fail:" + JSON.stringify(err));
            _that.getOrderDetail(order_id)
          },
        });
      });
    },
    // 手动取消订单
    handleCloseOrder(id) {
      this.notputShow = true
    },
    // 跳转到配音师详情
    handleJumpdetails(item) {
      console.log(item)
      if(item.cate===0) {
        
      }else {
        uni.navigateTo({ url: '/subpkg/pages/teacherlist/teacherlist?id='+ item.teacher_id })
      }
    },
    handleclose() {
      this.notputShow = false
    },
    handleConfirm() {
      orderCancel({order_id: this.orderData.id}).then((res)=>{
        this.getOrderDetail(this.orderId);
        this.notputShow= false
      })
    },
	  // 播放音频
    playTheMusic(orderItem) {
      console.log("传过来的数据", orderItem, this.orderData);
      this.audioShow = true;
	    this.orderData.work.playStatus = !this.orderData.work.playStatus
	    this.dataPlay = orderItem
      setTimeout(() => {
        this.$refs.musicAudio.preStartPlay();
      }, 0);
    },
	handleChangePlay(status) {
		this.orderData.work.playStatus = !this.orderData.work.playStatus
	},
	musicClose() {
		this.orderData.work.playStatus = false;
		this.audioShow = false;
		this.dataPlay = {
			url: ''
		};
	},
  // 关闭弹窗
  handleCloseSubmitShow() {
    this.submitShow1 = false
  },
	downloadcopy(groupNum,title) {
		uniCopy({
			content:groupNum,
			success:(res)=>{
				uni.showToast({
					title: title,
					icon: 'none'
				})
			},
			error:(e)=>{
			}
		})
	}
  },
};
</script>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
  width: 100%;
}
.lianxikefu {
  position: fixed;
  bottom: 125rpx;
  right: 0;
  display: flex;
  text-align: center;
  width: 206.522rpx;
  height: 79.71rpx;
  line-height: 79.71rpx;
  z-index: 9999;
  background: #ff445a;
  border-radius: 57.971rpx 0rpx 0rpx 57.971rpx;
  .service_box {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    .lianxikefu_text {
      font-size: 25.362rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 500;
      color: #ffffff;
      // z-index: 999;
      margin-left: 15rpx;
    }
    .service_icon {
      width: 25.362rpx;
      height: 28.986rpx;
      margin-left: 25.116rpx;
    }
  }
  .cell {
    position: absolute;
    left: 0;
    height: 79.71rpx;
    width: 206.522rpx;
    background: RGBA(245, 44, 90, 0);
    border-radius: 57.971rpx 0rpx 0rpx 57.971rpx;
    .wrapper {
      height: 79.71rpx !important;
      line-height: 79.71rpx !important;
    }
    .cell--bubble {
      height: 79.71rpx !important;
      width: 206.522rpx !important;
      display: flex;
      align-items: center;
      background: RGBA(245, 44, 90, 0) !important;
    }
    .light_without_border {
      margin-left: 20rpx !important;
    }
    .cell--light_without_border {
      display: none;
      margin-left: 20rpx !important;
      width: 32.609rpx;
      height: 28.986rpx;
    }
  }
}
.container {
  background: #f2f2f2;
  height: 100%;
  .home_musicSrc_box {
		position: fixed;
		bottom: 100rpx;
		z-index: 9999;
	}
  .integral {
    position: relative;
    width: 750rpx;
    height: 293.478rpx;
    background: #fe445a;
    display: flex;
    justify-content: center;
    .integral_use {
      position: absolute;
      right: 25.362rpx;
      top: 18.116rpx;
      display: flex;
      align-items: center;
      .integral_img {
        width: 27.174rpx;
        height: 27.174rpx;
        margin-right: 9.058rpx;
      }
      .integral_text {
        font-size: 25.362rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
      }
    }
    .availableIntegral {
      .score {
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        margin-top: 52.536rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ffffff;
        .clock_icon {
          width: 47.101rpx;
          height: 47.101rpx;
          margin-right: 9.058rpx;
        }
        .payment {
          font-size: 39.855rpx;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #ffffff;
        }
      }
      .score_text {
        margin-top: 18.116rpx;
        height: 36.232rpx;
        text-align: center;
        align-items: center;
        display: flex;
        font-size: 25.362rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 36.232rpx;
        .closeOrder {
          display: flex;
          align-items: center;
          height: 45.29rpx;
          margin-left: 7.246rpx;
          border-radius: 7.246rpx;
          padding: 0rpx 17rpx;
          border: 1.812rpx solid #ffa53d;
          font-size: 21.739rpx;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #ffa53d;
        }
      }
    }
  }
  .demandinfo_box {
    position: relative;
    margin-top: -74.348rpx;
    width: 695.652rpx;
    margin-left: 27.174rpx;
    height: 538.261rpx;
    background: #ffffff;
    border-radius: 14.493rpx;
    .demandinfo_top {
      width: 100%;
      height: 422.319rpx;
      border-bottom: 1.812rpx solid #f7f7f7;
      .item_list {
        padding: 38.232rpx 34.42rpx 0rpx 34.42rpx;
        display: flex;
        justify-content: space-between;
        .title {
          font-size: 28.986rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #666666;
        }
        .content {
          font-size: 28.986rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #000000;
        }
      }
    }
    .demandinfo_bottom {
      height: 114.13rpx;
      margin: 0 34.42rpx;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .payable {
        font-size: 21.739rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #000000;
        .payable_num {
          font-size: 39.855rpx;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #fe445a;
        }
      }
    }
  }
  .voice_teacher_box {
    margin-top: 27.174rpx;
    margin-left: 27.174rpx;
    padding: 38.232rpx 34.42rpx 0rpx 34.42rpx;
    width: 695.652rpx;
    background: #ffffff;
    border-radius: 14.493rpx;
    .voice_teacher {
      width: 100%;
      .item_list {
        padding-bottom: 38.232rpx;
        display: flex;
        justify-content: space-between;
        .title {
          font-size: 28.986rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #666666;
        }
        .content {
          font-size: 28.986rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #000000;
        }
        .nicknamebox {
          display: flex;
          align-items: center;
          .avatar {
            width: 50.725rpx;
            height: 50.725rpx;
            border-radius: 25rpx;
            margin-right: 9.058rpx;
          }
          .yhjright {
            margin-left: 9.058rpx;
            width: 21.928rpx;
            height: 21.928rpx;
          }
        }
      }
    }
  }
  .paybtn_box {
    position: fixed;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 750rpx;
    height: 108.696rpx;
    background: #ffffff;
    .pay_amount {
      margin-left: 41.667rpx;
      font-size: 39.855rpx;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #fe445a;
    }
    .paybtn_btn_box {
      display: flex;
      .cancelbtn_btn {
         width: 246.377rpx;
        height: 108.696rpx;
        font-size: 32.609rpx;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #9D9D9D;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .paybtn_btn {
        width: 246.377rpx;
        height: 108.696rpx;
        background: #fe445a;
        font-size: 32.609rpx;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
  .finished_box {
    position: fixed;
    bottom: 0;
    display: flex;
    align-items: center;
    width: 750rpx;
    height: 108.696rpx;
    background: #ffffff;
    .play_box {
      width: 663.043rpx;
      height: 100%;
      display: flex;
      align-items: center;
      .play_icon {
        margin-left: 41.667rpx;
        width: 39.855rpx;
        height: 39.855rpx;
      }
      .play_title {
        margin-left: 18.116rpx;
        font-size: 25.362rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #000000;
      }
    }
    .download {
      display: flex;
      align-items: center;
      width: 135rpx;
      height: 100%;
      justify-content: flex-end;
      .download_icon {
        margin-right: 52.536rpx;
        width: 34.42rpx;
        height: 32.609rpx;
      }
    }
  }
  .checkDemand {
	  display: flex;
	  align-items: center;
	  .yhjright {
		  margin-left: 9.058rpx;
		  width: 21.928rpx;
		  height: 21.928rpx;
	  }
  }
}
.custom_popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 100024;
  background-color: rgba(0, 0, 0, 0.6);
  .masklayer {
    width: 100%;
    position: fixed;
    height: 984rpx;
    bottom: 0px;
    border-top-right-radius: 24.493rpx;
    border-top-left-radius: 24.493rpx;
    background: #ffffff;
  }
}
</style>
