<template>
  <view class="container">
    <u-navbar
      :is-back="true"
      title="创建订单"
      title-size="36.232rpx"
      title-color="#000000"
      :border-bottom="true"
      :background="background"
      back-icon-color="#000000"
    >
      <!-- <view slot="right">
        <view class="homeye" @click="handleGoBack">
          <image
            class="homeye_img"
            src="@/static/home/home_icon.png"
            mode="scaleToFill"
          />
        </view>
      </view> -->
    </u-navbar>
    <view class="integral">
      <view class="availableIntegral">
        <view class="score">
          <image
            class="clock_icon"
            src="@/static/coupons/zzxdan.png"
            mode="scaleToFill"
          />
          <view class="payment">向配音师下单</view>
        </view>
        <view class="score_text">下单前请先联系您的配音顾问</view>
      </view>
    </view>
    <view class="demandinfo_box">
      <view class="voice_teacher">
        <view class="item_list">
          <view class="title">服务配音师</view>
          <view
            class="content nicknamebox"
            @click="handleJumpdetails(paymentData.demand.teacher_id)"
          >
            <image
              class="avatar"
              :src="paymentData.teacher.avatar"
              mode="scaleToFill"
            />
            <text class="nickname">{{ paymentData.teacher.nickname }}</text>
            <image
              class="yhjright"
              src="@/static/coupons/yhjright.png"
              mode="scaleToFill"
            />
          </view>
        </view>
        <view class="item_list">
          <view class="title">服务单价</view>
          <view class="content" style="margin-right: 38rpx"
            >{{ paymentData.service.offer_price }}</view
          >
        </view>
      </view>
    </view>
    <view class="voice_teacher_box">
      <view class="voice_teacher">
        <view class="item_list">
          <view class="title">我的需求</view>
          <view class="content">
            <text class="nickname">{{paymentData.demand}}</text>
            <!-- <image
              class="yhjright"
              src="@/static/coupons/yhjright.png"
              mode="scaleToFill"
            /> -->
          </view>
        </view>
        <view class="item_list">
          <view class="title">终稿字数</view>
          <view class="content">
            <text class="nickname"
              >{{ paymentData.draft_word_count }}</text
            >
            <!-- <image
              class="yhjright"
              src="@/static/coupons/yhjright.png"
              mode="scaleToFill"
            /> -->
          </view>
        </view>
        <view class="item_list">
          <view class="title">订单金额</view>
          <view class="content">
            <!-- <text class="nickname" style="margin-right: 38rpx"
              >{{ paymentData.price }}元</text> -->
              <input
                class="price_input"
                v-model="price"
                placeholder="请询问你的配音顾问"
                placeholder-class="input-placeholder"
              />
          </view>
        </view>
      </view>
    </view>
    <view class="voice_teacher_box">
      <view class="voice_teacher">
        <view class="item_list">
          <view class="title">优惠券</view>
          <view class="content" @click="handleShowCoupons">
            <text class="red_text" v-if="paymentData.couponlist === 0"
              >暂无可用</text
            >
            <text v-else class="red_text">
              <text v-if="!selCoupon.price"
                >有{{ paymentData.couponlist }}张可用</text
              >
              <text v-else>-￥{{ creditAmount }}元</text>
            </text>
            <image
              class="yhjright"
              src="@/static/coupons/yhjright.png"
              mode="scaleToFill"
            />
          </view>
        </view>
        <view class="item_list">
          <view class="title">积分({{ paymentData.score }})</view>
          <view class="content">
            <text class="red_text">{{
              paymentData.score_price === 0
                ? "当前积分不可抵扣"
                : "-￥" + paymentData.score_price + ".00元"
            }}</text>
            <image
              class="yhjright"
              src="@/static/coupons/yhjright.png"
              mode="scaleToFill"
            />
          </view>
        </view>
      </view>
    </view>
    <view class="paybtn_box">
      <view class="pay_amount">￥{{ payPrice }}</view>
      <view class="paybtn_btn" @click="hanldeOrderPay(paymentData)"
        >立即支付</view
      >
    </view>
    <!-- <view class="lianxikefu" @click="handleruku">
		   <view class="service_box">
              <image
				class="service_icon"
				src="@/static/home/kefu.png"
				mode="scaleToFill"
			  /> 
			  <text class="lianxikefu_text">配音顾问</text>
		   </view>
		</view> -->
    <u-popup v-model="couponsShow" mode="bottom" height="984.348rpx" border-radius="24">
      <view class="u-tabs-box">
        <u-tabs
          activeColor="#000000"
          bold
          ref="tabs"
          bg-color="#FFFFFF"
          inactive-color="#666666"
          :bar-style="barStyle"
          name="title"
          :is-scroll="false"
          :list="list"
          :height="'120'"
          :current="current"
          @change="change"
          font-size="28.362"
        ></u-tabs>
      </view>
      <view class="coupons">
        <view class="coupons_contentbox">
          <view class="page-box" v-if="defaultshow">
            <view class="coupons_item_box">
              <view v-for="(item, index) in couponsData" :key="index">
                <view v-if="item.status === 1" class="coupons_item">
                  <view class="amount">
                    <view class="amount_quota">{{ item.price }}折</view>
                    <view class="combination">{{ item.title }}</view>
                    <image
                      class="amountbc"
                      src="@/static/coupons/wsyyouhuijuan.png"
                      mode="scaleToFill"
                    />
                  </view>
                  <view class="giving">
                    <view class="giving_text u-line-1">{{ item.rule }}</view>
                    <view class="giving_title u-line-1"
                      >{{ item.active_at }}-{{ item.inactive_at }}</view
                    >
                  </view>
                  <view class="coupons_state">
                    <view class="shareheckbox_box">
                      <u-checkbox
                        class="shareheckbox"
                        v-model="item.checkedbox"
                        size="50"
                        active-color="#FF445A"
                        shape="circle"
                        @change="handleCheckboxchange(item)"
                      />
                    </view>
                  </view>
                </view>
                <view v-if="item.status === 2" class="coupons_has_item">
                  <view class="amount">
                    <view class="amount_quota">{{ item.price }}折</view>
                    <view class="combination">{{ item.title }}</view>
                    <image
                      class="amountbc"
                      src="@/static/coupons/ysyyouhuijuan.png"
                      mode="scaleToFill"
                    />
                  </view>
                  <view class="giving">
                    <view class="giving_text u-line-1">{{ item.rule }}</view>
                    <view class="giving_title u-line-1"
                      >{{ item.active_at }}-{{ item.inactive_at }}</view
                    >
                  </view>
                  <view class="coupons_state">
                    <image
                      class="hasbeenused"
                      src="@/static/coupons/ysyicon.png"
                      mode="scaleToFill"
                    />
                  </view>
                </view>
                <view v-if="item.status === 3" class="coupons_has_item">
                  <view class="amount">
                    <view class="amount_quota">{{ item.price }}折</view>
                    <view class="combination">{{ item.title }}</view>
                    <image
                      class="amountbc"
                      src="@/static/coupons/ysyyouhuijuan.png"
                      mode="scaleToFill"
                    />
                  </view>
                  <view class="giving">
                    <view class="giving_text u-line-1">{{ item.rule }}</view>
                    <view class="giving_title u-line-1"
                      >{{ item.active_at }}-{{ item.inactive_at }}</view
                    >
                  </view>
                  <view class="coupons_state">
                    <image
                      class="hasbeenused"
                      src="@/static/coupons/ygqicon.png"
                      mode="scaleToFill"
                    />
                  </view>
                </view>
              </view>
              <view style="height: 217.391rpx"></view>
            </view>
            <view class="coupons_determine_box">
              <view class="coupons_determine" @click="handleSelectedCoupon">
                确定
              </view>
            </view>
          </view>
          <view v-if="!defaultshow" class="page-box">
            <view class="defaltPage">
              <image
                class="defaltPageimg"
                src="@/static/demand/defaulticon.png"
                mode="scaleToFill"
              />
              <!-- <view class="defaltext">你还没有优惠卷</view> -->
            </view>
          </view>
        </view>
      </view>
    </u-popup>
    <u-popup
      v-model="submitShow"
      mode="bottom"
      height="984.348rpx"
      border-radius="14"
    >
      <release
        ref="submitform"
        :bottomTitle="true"
        :data="demandProfile"
        :payment="true"
        :subTitle="false"
        @submitShow="hanldeSubmit"
        btnText="需求详情"
        resBtn="确认"
      ></release>
    </u-popup>
  </view>
</template>

<script>
import { couponPaylist, orderavailable } from "@/api/personal.js";
import release from "@/components/release/release.vue";
// 引入需求详情api
import { demandDetail, orderPay } from "@/api/myneeds.js";
export default {
  components: {
    release,
  },
  data() {
    return {
      background: {
        backgroundColor: "#FFFFFF",
      },
      type: "",
      play: "https://www.peiyinstreet.com/guidang/play.png",
      playActive: "https://www.peiyinstreet.com/guidang/palyActive.png",
      from: {
        orderamount: "",
      },
      list: [],
      couponsData: [],
      couponsShow: false,
      defaultshow: true,
      checkedbox: false,
      service_id: "",
      teacher_id: "",
      price: '',
      barStyle: {
        backgroundColor: "#FF445A",
      },
      // 选中的优惠卷
      selCoupon: {},
      current: 0,
      paymentData: {},
      payPrice: "",
      creditAmount: "",
      demandProfile: {},
      score_price: 0,
      submitShow: false,
    };
  },
  onLoad(options) {
    (this.service_id = options.id), (this.teacher_id = options.teacher_id);
    this.getPaymentData();
  },
  methods: {
    getPaymentData() {
      orderavailable({
        service_id: this.service_id,
        teacher_id: this.teacher_id,
        price: this.price
      }).then((res) => {
        console.log("订单数据", res);
        this.paymentData = res.data;
        this.payPrice =
          Number(this.paymentData.price) - this.paymentData.score_price;
        this.selCoupon = {};
      });
    },
    // 跳转到配音师详情
    handleJumpdetails(id) {
      uni.navigateTo({ url: "/subpkg/pages/teacherlist/teacherlist?id=" + id });
    },
    // 需求详情数据
    handleCheckdemand() {
      demandDetail({ demand_id: this.demand_id }).then((res) => {
        console.log("需求详情的数据---------", res);
        this.demandProfile = res.data;
        this.submitShow = true;
      });
    },
    hanldeSubmit() {
      this.submitShow = false;
      this.getPaymentData(this.demand_id);
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
    change(index) {
      this.current = index;
      this.handleShowCoupons();
    },
    // 展示优惠卷
    handleShowCoupons() {
      let UseSum = "";
      let notUse = "";
      couponPaylist({ status: this.current }).then((res) => {
        this.couponsData = res.data;
        if (res.data.length === 0) {
          this.defaultshow = false;
        } else {
          this.defaultshow = true;
        }
        UseSum = "可用优惠券(" + res.count.coupon_available_count + ")";
        notUse = "不可用优惠券(" + res.count.coupon_notavailable_count + ")";
        this.couponsData.map((itemData) => {
          if (itemData.id === this.selCoupon.id) {
            itemData.checkedbox = this.selCoupon.checkedbox;
          } else {
            itemData.checkedbox = false;
          }
        });
        this.list = [
          {
            name: UseSum,
            id: 0,
          },
          {
            name: notUse,
            id: 1,
          },
        ];
      });
      this.couponsShow = true;
    },
    // 选择优惠卷
    handleCheckboxchange(item) {
      console.log("选中的优惠卷", item);
      this.selCoupon = item;
      this.couponsData.map((itemData) => {
        if (itemData === item) {
          itemData.checkedbox = item.checkedbox;
        } else {
          itemData.checkedbox = false;
        }
      });
    },
    //  订单支付
    hanldeOrderPay(item) {
      console.log("支付参数", item);
      var payData = {
        order_id: "",
        price: item.price,
        total_price: this.payPrice,
        coupon_id: this.selCoupon.id,
        score: item.score_price,
        teacher_id: item.demand.teacher_id,
        demand_id: item.demand.id,
        service_id: item.demand.service_id,
      };
      orderPay(payData).then((res) => {
        console.log("支付返回参数", res);
        var order_id = res.order_id;
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
            console.log("fail返回的参数", res);
            uni.redirectTo({
              url: "/subpkg/pages/orderdetails/orderdetails?id=" + order_id+'&&type=index',
            });
          },
          fail: function (err) {
            console.log("fail返回的参数", err);
            console.log("fail:" + JSON.stringify(err));
            uni.redirectTo({
              url: "/subpkg/pages/orderdetails/orderdetails?id=" + order_id+'&&type=index',
            });
          },
        });
      });
    },
    // 选中的优惠卷数据
    handleSelectedCoupon() {
      this.couponsShow = false;
      this.payPrice = Number(this.paymentData.price);
      // this.payPrice = this.paymentData.price.toFixed(2)  - this.paymentData.score
      var num1 = this.payPrice * ((this.selCoupon.price * 10) / 100);
      var num = Math.floor(num1 * 100) / 100;
      this.creditAmount = Math.floor((this.payPrice - num) * 100) / 100;
      this.payPrice = num - this.paymentData.score_price;
    },
    handleGoBack() {
      uni.switchTab({ url: "/pages/index/index" });
    },
  },
};
</script>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
  width: 100%;
}
.input-placeholder {
  font-size: 25.362rpx !important;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999 !important;
  line-height: 36.232rpx;
}
.homeye {
  display: flex;
  width: 57.971rpx;
  height: 57.971rpx;
  margin-left: 12.681rpx;
  border-radius: 57.971rpx;
  background: #ffffff;
  border: 1.812rpx solid #f4f4f4;
  justify-content: center;
  align-items: center;
  background: white;
}
.homeye_img {
  width: 32.986rpx;
  height: 32.986rpx;
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
        font-size: 25.362rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 36.232rpx;
      }
    }
  }
  .demandinfo_box {
    position: relative;
    margin-top: -74.348rpx;
    padding: 38.043rpx 34.42rpx 0rpx 34.42rpx;
    width: 695.652rpx;
    margin-left: 27.174rpx;
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
          .yhjright {
            margin-left: 12.681rpx;
            width: 19.928rpx;
            height: 19.928rpx;
          }
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
          .yhjright {
            margin-left: 12.681rpx;
            width: 19.928rpx;
            height: 19.928rpx;
          }
          .red_text {
            color: #fe445a;
          }
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
          display: flex;
          align-items: center;
          font-size: 28.986rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #000000;
          .yhjright {
            margin-left: 12.681rpx;
            width: 19.928rpx;
            height: 19.928rpx;
          }
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
}
.u-tabs-box {
  position: fixed;
  top: 0rpx;
  left: 0rpx;
  width: 100%;
  z-index: 999;
}
.coupons {
  width: 100%;
  margin-top: 114.13rpx;
  display: flex;
  flex-direction: column;
  background: #f2f2f2;
  // .coupons_contentbox {
  //   height: 688.406rpx;
  // }
  // .coupons_item_box {
  //   height: 688.406rpx;
  //   overflow-y: auto;
  // }
  .coupons_item {
    margin-top: 27.174rpx;
    margin-left: 27.174rpx;
    width: 695.652rpx;
    height: 159.42rpx;
    display: flex;
    background: #ffffff;
    border-radius: 14.493rpx;
    .amount {
      position: relative;
      width: 195.652rpx;
      height: 159.42rpx;
      .amountbc {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0rpx;
        left: 0rpx;
        z-index: 1;
      }
      .amount_quota {
        position: relative;
        margin-top: 21.739rpx;
        text-align: center;
        font-size: 54.348rpx;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
        z-index: 99;
      }
      .combination {
        position: relative;
        margin-top: 9.058rpx;
        text-align: center;
        font-size: 21.739rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        z-index: 99;
      }
    }
    .giving {
      width: 311.594rpx;
      margin-left: 34.42rpx;
      .giving_text {
        margin-top: 39.855rpx;
        font-size: 28.986rpx;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #000000;
      }
      .giving_title {
        margin-top: 21.739rpx;
        font-size: 21.739rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
      }
    }
    .coupons_state {
      .beUsed_btn {
        margin-top: 30.797rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 123.188rpx;
        height: 57.971rpx;
        background: #ffffff;
        border-radius: 32.609rpx;
        border: 1.812rpx solid #ff4e65;
        font-size: 21.739rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ff4e65;
      }
      .shareheckbox_box {
        width: 156rpx;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .shareheckbox {
        }
      }
    }
  }
  .coupons_has_item {
    margin-top: 27.174rpx;
    margin-left: 27.174rpx;
    width: 695.652rpx;
    height: 159.42rpx;
    display: flex;
    background: #ffffff;
    border-radius: 14.493rpx;
    .amount {
      position: relative;
      width: 195.652rpx;
      height: 159.42rpx;
      .amountbc {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0rpx;
        left: 0rpx;
        z-index: 1;
      }
      .amount_quota {
        position: relative;
        margin-top: 21.739rpx;
        text-align: center;
        font-size: 54.348rpx;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
        z-index: 99;
      }
      .combination {
        position: relative;
        margin-top: 9.058rpx;
        text-align: center;
        font-size: 21.739rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        z-index: 99;
      }
    }
    .giving {
      width: 311.594rpx;
      margin-left: 34.42rpx;
      .giving_text {
        margin-top: 39.855rpx;
        font-size: 28.986rpx;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #000000;
      }
      .giving_title {
        margin-top: 21.739rpx;
        font-size: 21.739rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
      }
    }
    .coupons_state {
      .beUsed_btn {
        margin-top: 30.797rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 123.188rpx;
        height: 57.971rpx;
        background: #ffffff;
        border-radius: 32.609rpx;
        border: 1.812rpx solid #ff4e65;
        font-size: 21.739rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ff4e65;
      }
      .hasbeenused {
        margin-top: 23.551rpx;
        margin-left: 21rpx;
        width: 111.449rpx;
        height: 111.449rpx;
      }
    }
  }
  .coupons_determine_box {
    position: fixed;
    bottom: 0rpx;
    width: 100%;
    z-index: 999;
    height: 145.507rpx;
    background: #f2f2f2;
    .coupons_determine {
      margin-left: 36.232rpx;
      width: 677.536rpx;
      height: 86.957rpx;
      background: #ff445a;
      border-radius: 43.478rpx;
      font-size: 28.986rpx;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .defaltPage {
    text-align: center;
    height: 904.638rpx;
    .defaltPageimg {
      margin-top: 110.507rpx;
      width: 403.986rpx;
      height: 331.522rpx;
    }
    .defaltext {
      margin-top: -72.464rpx;
      text-align: center;
      font-size: 25.362rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #000000;
    }
  }
}
.price_input {
    text-align: right;
  }
</style>
