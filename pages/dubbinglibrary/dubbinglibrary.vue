<template>
  <view class="container">
    <u-navbar
      :is-back="false"
      title="配音师库"
      title-size="36.232rpx"
      :border-bottom="false"
      title-color="#000000"
    ></u-navbar>
    <view class="content">
      <!-- 入库二维码 -->
      <view class="pys_popup" v-if="rukuShow">
        <view class="popup_conent">
          <image
            class="closeicon"
            src="@/static/home/close.png"
            mode="scaleToFill"
            @click="handlecloseerweima"
          />
          <view class="erweimabox">
            <view class="erweima_iconbox">
              <image
                class="erweima_icon"
                src="https://www.peiyinstreet.com/guidang/peiyinguwen.png"
                mode="scaleToFill"
              />
            </view>
            <view class="erweima_box"> 截图加我微信，极速帮您试音 </view>
          </view>
        </view>
      </view>
      <!-- 未创建 -->
      <view class="pys_popup" v-if="notputShow">
        <view class="popup_conent">
          <image
            class="closeicon"
            src="@/static/home/close.png"
            mode="scaleToFill"
            @click="handlecloseerweima"
          />
          <view>
            <view style="height: 17.971rpx"></view>
            <view class="check_WeChat_test"> 申请入库 </view>
            <view class="check_WeChat_tips"
              >创建名片后即可免费加入中国配音师库</view
            >
            <view class="share_btn_box">
              <button
                class="cancelSharebtn"
                hover-class="button-hover"
                @click="handlecloseerweima"
              >
                我再想想
              </button>
              <button class="sharebtn" @click="handlechangehome">
                立即创建
              </button>
            </view>
          </view>
        </view>
      </view>
      <view class="count_box" @click="handleCheckWeb">
        <image
          class="count_box_img"
          src="https://www.peiyinstreet.com/guidang/peiyinshiku.png"
          mode="scaleToFill"
        />
      </view>
      <view
        class="home_swiper_list"
        v-for="(typeItem, index) in dataList"
        :key="index"
      >
        <view
          class="type_name"
          @click="handleVoicelist(typeItem, typeItem.list.title)"
        >
          <view class="type_title">
            <text>{{ typeItem.list.title }}</text>
            <text>({{ typeItem.list.count }}人)</text>
          </view>
          <view class="look_all">
            <view class="all_text">全部</view>
            <image
              class="arrorRight"
              src="@/static/home/arrorRight2.png"
              mode="scaleToFill"
            />
          </view>
        </view>
        <swiper
          class="swiper_item_box"
          style="height: 268.116rpx"
          :display-multiple-items="typeItem.data.length >= 2 ? 3 : 1"
          :acceleration="true"
          previous-margin="27.174rpx"
          next-margin="15.174rpx"
        >
          <swiper-item
            class="swiper_item"
            v-for="(lsitItem, indexs) in typeItem.data"
            :key="indexs"
          >
            <view class="swiper_item_list">
              <view
                class="card_content"
                @click="playTheMusic(lsitItem, typeItem.data)"
              >
                <image
                  class="portrait_img"
                  :src="lsitItem.teacher.avatar"
                  mode="scaleToFill"
                />
                <image
                  class="home_play"
                  :src="lsitItem.works.playStatus ? playActive : play"
                  mode="scaleToFill"
                />
                <view class="head_portrait_meng"></view>
              </view>
              <view class="card_dibu" @click="handleVisitorsJump(lsitItem)">
                <view class="nick_name">
                  <text class="nick_name_text u-line-1">{{
                    lsitItem.teacher.nickname
                  }}</text>
                  <image
                    v-if="lsitItem.teacher.sex === 1"
                    class="sex"
                    src="@/static/teacherlist/manicon.png"
                    mode="scaleToFill"
                  />
                  <image
                    v-else-if="lsitItem.teacher.sex === 2"
                    class="sex"
                    src="@/static/teacherlist/woman.png"
                    mode="scaleToFill"
                  />
                  <image
                    v-else-if="lsitItem.teacher.sex === 3"
                    class="sex"
                    src="@/static/teacherlist/qi.png"
                    mode="scaleToFill"
                  />
                </view>
                <view class="home_portrait">
                  <text class="zuopin"
                    >作品 {{ lsitItem.teacher.work_count }}</text
                  >
                  <text class="bofang"
                    >播放 {{ lsitItem.teacher.browse_count }}</text
                  >
                </view>
              </view>
            </view>
          </swiper-item>
        </swiper>
      </view>
      <view style="height: 80px"></view>
    </view>
    <view class="footer_prompt">
      <button class="invitationBtn" id="shou" open-type="share">
        <view class="footer_dianzhan_icon">
          <image
            class="give_like_icon"
            src="@/static/home/dianzhanActive.png"
            mode="scaleToFill"
          />
          <text class="give_like_text">推荐库给好友</text>
        </view>
        <view class="travel_to_box">
          <text class="travel_to_text">致力打造：中国权威专业的声音库大全</text>
          <image
            class="travel_to_img"
            src="@/static/home/arrorRight.png"
            mode="scaleToFill"
          />
        </view>
      </button>
    </view>
    <view class="lianxikefu" @click="handleruku">
      <view class="service_box">
        <image
          class="service_icon"
          src="@/static/home/kefu.png"
          mode="scaleToFill"
        />
        <text class="lianxikefu_text">配音顾问</text>
      </view>
    </view>
    <view v-if="audioShow" class="home_musicSrc_box disappear">
      <musicAudio
        ref="musicAudio"
        :url="dataPlay.works.url"
        :autoplay="true"
        :portrait="dataPlay.teacher.avatar"
        :music_title="dataPlay.works.title"
        @handleChangePlay="handleChangePlay"
        @musicClose="musicClose"
      ></musicAudio>
    </view>
    <view v-if="securitiesShow" class="securities">
      <image
        class="shutdown_icon"
        src="../../static/coupons/shutdown.png"
        mode="scaleToFill"
        @click="handlecloseCollection"
      />
      <image
        class="volume"
        src="https://www.peiyinstreet.com/guidang/Volume.png"
        mode="scaleToFill"
        @click="handleCouponCollection"
      />
    </view>
    <view v-if="couponsShow" class="masklayer" @tap.stop="handlecloseCoupons">
      <view class="coupons_box">
        <image
          class="shutdown_icon"
          src="../../static/coupons/shutdownC.png"
          mode="scaleToFill"
          @click="handlecloseCoupons"
        />
        <image
          class="coupons_icon"
          src="https://www.peiyinstreet.com/guidang/coupons.png"
          mode="scaleToFill"
          @tap="handlecloseCoupons"
        />
        <view class="coupons_content">
          <view class="discount_box">
            <view class="discount">{{ couponsData.price }}折</view>
            <view class="scope_discount">无门槛</view>
          </view>
          <view class="discounts_box">
            <view class="discounts_ins">{{ couponsData.rule }}</view>
            <view class="discounts_validity">有效期5天</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import musicAudio from "@/components/audio/audioplay.vue";
import { servicelist } from "@/api/voice.js";
import { mapState, mapActions } from "vuex";
import play from "@/static/teacherlist/paly2.png";
import playActive from "@/static/teacherlist/palyActive2.png";
// 优惠卷状态
import { couponadd,couponstatus } from "@/api/index.js";
import { profileUpdate, loginStatus, } from '@/api/index.js'
// 埋点统计
import { buriedSomeStatistical } from '@/utils/encapsulation.js'
export default {
  components: {
    musicAudio,
  },
  data() {
    return {
      audioShow: false,
      rukuShow: false,
      notputShow: false,
      userCont: true,
      staCount: {},
      dataList: [],
      play: play,
      playActive: playActive,
      listPlayData: [],
      servicePar: {
        page: 1,
        size: 5,
      },
      dataPlay: {
        works: { url: "" },
      },
      // 优惠卷显示
      securitiesShow: false,
      couponsShow: false,
      // 优惠卷数据
      couponsData: {},
    };
  },
  computed: {
    ...mapState("user", ["token", "userInfo"]),
  },
  onShareAppMessage(res) {
    if (res.from === "button") {
      // 来自页面内分享按钮
      console.log(res.target);
    }
    return {
      title: "中国配音师库",
      imageUrl: "",
      complete: function (res) {
        console.log("分享成功", res);
      },
    };
  },
  onLoad() {},
  onShow() {
    this.getUnionid();
  },
  onHide() {
    this.musicClose();
  },
  computed: {
    ...mapState("user", ["token", "userId"]),
  },
  methods: {
    ...mapActions("user", ["login", "getIphoneStatus"]),
    getUnionid() {
      uni.login({
        provider: "weixin",
        success: async (result) => {
          await this.login(result.code);
          await this.getIphoneStatus();
          this.servicelist();
		  //  获取优惠卷展示状态
		  this.getCouponstatusStatus()
        },
        fail: (error) => {
          console.log("登录失败", error);
        },
      });
    },
	getCouponstatusStatus() {
	  couponstatus({status:0}).then((res)=>{
        console.log('获取优惠卷的状态',res)
		if(res.data.coupon_status) {
          this.securitiesShow= false
		}else {
		  this.securitiesShow= true	
		}
	  })
	},
    servicelist() {
      servicelist(this.servicePar)
        .then((res) => {
          console.log("配音师数据", res);
          this.dataList = res.data;
        })
        .catch((err) => {});
    },
    // 跳转到问卷调查
    handleCheckWeb() {
      this.erweimaShow = true;
      uni.navigateTo({
        url: "/subpkg/pages/webview/webview?src=https://mp.weixin.qq.com/s/oUOIOcT1Na68hTo7ZfS1MQ",
      });
    },
    handleVoicelist(typeItem, name) {
      console.log("111", typeItem.list.cate);
      // uni.navigateTo({ url: '/subpkg/pages/teacherlist/teacherlist' })
      uni.navigateTo({
        url:
          "/subpkg/pages/voicelist/voicelist?cate=" +
          typeItem.list.cate +
          "&name=" +
          encodeURIComponent(name),
      });
    },
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
    handlecloseerweima() {
      this.notputShow = false;
      this.rukuShow = false;
    },
    handlechangehome() {
      uni.switchTab({ url: "/pages/index/index" });
    },
    getUserInfo() {
      // 获取用户资料
      uni.showLoading({
        title: "加载中",
      });
      uni.getUserProfile({
        desc: "登录后可发布需求",
        success: async (obj) => {
          uni.showToast({
            title: "授权成功",
            icon: "default",
            mask: true,
          });
          const userobj = {
            nickname: obj.userInfo.nickName,
            userId: this.userId,
            avatar: obj.userInfo.avatarUrl,
            phone: "",
          };
          await profileUpdate(userobj);
		  this.handleCouponCollection()
        },
        fail: () => {
          uni.showToast({
            title: "授权已取消",
            icon: "default",
            mask: true,
          });
        },
        complete: () => {
          // 隐藏loading
          uni.hideLoading();
        },
      });
    },
    // 点击领取优惠卷
    handleCouponCollection() {
	  loginStatus()
        .then((res) => {
          if (res.data.nickname == 0) {
            this.getUserInfo();
          } else {
			couponadd()
			.then((res) => {
				if (res.data.type === 0) {
					this.couponsShow = true;
					this.couponsData = res.data;
				} else {
				   uni.showToast({
						title: '今天的券已经领取过啦',
						icon: "none",
						duration: 2000
					})
				}
				console.log("优惠卷数据", res);
			})
			.catch((res) => {
			  console.log("优惠卷错误信息", res);
			});
          }
        })
        .catch((err) => {
          console.log("返回错误信息", err);
        });	
    },
    // 关闭优惠卷
    handlecloseCollection() {
      this.securitiesShow = false;
	    couponstatus({status:1}).then((res)=>{
        console.log('获取优惠卷的状态',res)
	    })
    },
    // 优惠卷弹窗
    handlecloseCoupons() {
      this.couponsShow = false;
    },
    // 跳转配音师名片
    handleVisitorsJump(orderItem) {
      uni.setStorageSync("current", orderItem.tags[0].value);
      uni.navigateTo({
        url: "/subpkg/pages/teacherlist/teacherlist?id=" + orderItem.teacher_id,
      });
    },
    playTheMusic(orderItem, listdata) {
      this.audioShow = true;
      this.listPlayData = listdata;
      if (this.dataPlay.works.url === orderItem.works.url) {
        this.dataList.map((item) => {
          item.data.map((items) => {
            if (this.dataPlay === items) {
              orderItem.works.playStatus = !orderItem.works.playStatus;
            } else {
              items.playStatus = false;
            }
          });
        });
      } else {
        this.dataList.map((item) => {
          item.data.map((items) => {
            items.works.playStatus = false;
          });
        });
        orderItem.works.playStatus = true;
        this.dataPlay = orderItem;
        buriedSomeStatistical(0)
      }
      setTimeout(() => {
        this.$refs.musicAudio.preStartPlay();
      }, 0);
    },
    handleChangePlay(status) {
      this.dataList.map((item) => {
        item.data.map((items) => {
          if (this.dataPlay === items) {
            items.works.playStatus = status;
          } else {
            items.works.playStatus = false;
          }
        });
      });
    },
    musicClose() {
      this.servicelist();
      this.audioShow = false;
      this.dataPlay = {
        works: {
          url: "",
        },
      };
    },
  },
};
</script>

<style lang="scss">
page {
  height: 100%;
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
  border-radius: 32px 0px 0px 32px;
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
}
.container {
  height: 100%;
  background: #f2f2f2;
}
.content {
  background: #f2f2f2;
}
.invitationBtn {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0);
  /* justify-content: space-between; */
  border: none;
  padding: 0 !important;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
}
.invitationBtn::after {
  border: none !important;
}
</style>
<style lang="scss" scoped>
.count_box {
  margin-top: 18.116rpx;
  width: 695.652rpx;
  height: 144.928rpx;
  margin-left: 27.174rpx;
  background: #1274ff;
  border-radius: 14.493rpx;
  display: flex;
  .count_box_img {
    width: 100%;
    height: 100%;
  }
  .count_item {
    width: 33%;
    .number {
      width: 100%;
      text-align: center;
      height: 54.348rpx;
      font-size: 39.855rpx;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
      line-height: 54.348rpx;
    }
    .number_title {
      width: 100%;
      text-align: center;
      height: 30.797rpx;
      font-size: 21.739rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 30.797rpx;
    }
  }
  .vertical_line {
    height: 100%;
    width: 1px;
    background: #ffffff;
    opacity: 0.11;
  }
}
.type_name {
  padding: 0rpx 27.174rpx 27.174rpx 27.174rpx;
  display: flex;
  justify-content: space-between;
  .type_title {
    height: 22px;
    font-size: 17px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #000000;
    line-height: 22px;
  }
  .look_all {
    display: flex;
    align-items: center;
    .all_text {
      height: 30.797rpx;
      font-size: 25.739rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #666666;
      line-height: 30.797rpx;
    }
    .arrorRight {
      margin-left: 9.058rpx;
      width: 10.246rpx;
      height: 15.681rpx;
    }
  }
}
// 滚动列表样式
.home_swiper_list {
  margin-top: 43.478rpx;
  .swiper_item {
    width: 216.377rpx;
    height: 268.116rpx;
    .swiper_item_list {
      position: relative;
      width: 216.377rpx;
      height: 268.116rpx;
      border-radius: 8px;
      background: #ffffff;
      .card_content {
        width: 216.377rpx;
        height: 144.928rpx;
        border-top-left-radius: 14.493rpx;
        border-top-right-radius: 14.493rpx;
        text-align: center;
        overflow: hidden;
        .portrait_img {
          width: 216.377rpx;
          height: 216.377rpx;
        }
        .home_play {
          position: absolute;
          top: 58rpx;
          left: 96.224rpx;
          width: 23.551rpx;
          height: 28.986rpx;
          z-index: 9;
        }
        .head_portrait_meng {
          position: absolute;
          left: 0px;
          top: 0;
          border-top-left-radius: 14.493rpx;
          border-top-right-radius: 14.493rpx;
          width: 216.377rpx;
          height: 144.928rpx;
          background: rgba(0, 0, 0, 0.1);
        }
      }
      .card_dibu {
        .nick_name {
          padding: 19.928rpx 18.116rpx 0px 18.116rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 25.362rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #000000;
          .nick_name_text {
            display: inline-block;
            max-width: 80%;
          }
          .sex {
            width: 19.928rpx;
            height: 19.928rpx;
          }
        }
        .home_portrait {
          // text-align: center;
          margin-top: 12.681rpx;
          padding: 0 18.116rpx;
          height: 25.362rpx;
          font-size: 19.928rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
          line-height: 25.362rpx;
          .zuopin {
            display: inline-block;
            width: 50%;
          }
          .bofang {
            display: inline-block;
            width: 50%;
          }
        }
      }
      .swiper_bg_img {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        width: 215.899rpx;
        height: 231.884rpx;
      }
    }
  }
}
.container {
  position: relative;
  .home_musicSrc_box {
    position: fixed;
    bottom: 100rpx;
    z-index: 9999;
  }
}
.footer_prompt {
  padding: 0px 30.232rpx;
  position: fixed;
  bottom: 0;
  width: 750rpx;
  height: 79.71rpx;
  background: #000000;
  display: flex;
  opacity: 0.66;
  .footer_dianzhan_icon {
    width: 680.203rpx;
    display: flex;
    height: 100%;
    align-items: center;
    .give_like_icon {
      width: 32.609rpx;
      height: 32.609rpx;
    }
    .give_like_text {
      // width: 112px;
      height: 36.232rpx;
      text-align: left;
      font-size: 23.551rpx;
      margin-left: 25.362rpx;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffb70a;
      line-height: 36.232rpx;
    }
  }
  .travel_to_box {
    display: flex;
    align-items: center;
    padding-right: 5.116rpx;
    .travel_to_text {
      width: 430.928rpx;
      height: 36.232rpx;
      font-size: 25.362rpx;
      text-align: right;
      margin-right: 9.058rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 36.232rpx;
    }
    .travel_to_img {
      width: 13.428rpx;
      height: 17.935rpx;
    }
  }
}
.pys_popup {
  position: fixed;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999999;
  .popup_conent {
    position: absolute;
    padding: 36.232rpx;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 500.71rpx;
    min-height: 326.087rpx;
    background: #ffffff;
    border-radius: 28.986rpx;
    .closeicon {
      position: absolute;
      width: 50.725rpx;
      height: 50.725rpx;
      top: -66.232rpx;
      right: 0;
    }
  }
}
// 入库
.erweimabox {
  position: relative;
  .close_iconbox {
    position: absolute;
    background: #000000;
    right: 0rpx;
    width: 50rpx;
    height: 50rpx;
    top: 0rpx;
    border-radius: 50%;
    .close_icon {
      width: 50rpx;
      height: 50rpx;
    }
  }
  .erweima_iconbox {
  }
  .erweima_icon {
    width: 491.014rpx;
    height: 491.014rpx;
  }
  .erweima_box {
    width: 471.014rpx;
    height: 36.232rpx;
    text-align: center;
    font-size: 25.362rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    line-height: 36.232rpx;
  }
}
.check_WeChat_test {
  text-align: center;
  height: 39.855rpx;
  font-size: 28.986rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #000000;
  line-height: 39.855rpx;
}
.check_WeChat_tips {
  margin-top: 28.986rpx;
  margin-bottom: 36.232rpx;
  height: 36.232rpx;
  text-align: center;
  font-size: 25.362rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #000000;
  line-height: 36.232rpx;
}
.share_btn_box {
  display: flex;
  .cancelSharebtn {
    width: 213.768rpx;
    height: 79.71rpx;
    background: #ffffff;
    border-radius: 39.855rpx;
    border: 1.812rpx solid #dedede;
    font-size: 28.986rpx;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #999999;
  }
  .cancelSharebtn::after {
    border: none !important;
  }
  .sharebtn {
    margin-left: 36.232rpx;
    width: 213.768rpx;
    height: 79.71rpx;
    background: #1274ff;
    border-radius: 39.855rpx;
    font-size: 28.986rpx;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
    line-height: 79.71rpx;
  }
  .sharebtn::after {
    border: none !important;
  }
}
.masklayer {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9999;
  .coupons_box {
    position: relative;
    margin-top: 50%;
    margin-left: 67.029rpx;
    position: relative;
    transform: calc(0%, -50%);
    width: 615.942rpx;
    height: 615.942rpx;
    .shutdown_icon {
      position: absolute;
      right: 0;
      top: -65.899rpx;
      width: 38.043rpx;
      height: 38.043rpx;
    }
    .coupons_icon {
      width: 615.942rpx;
      height: 615.942rpx;
    }
    .coupons_content {
      position: absolute;
      top: 240rpx;
      width: 100%;
      left: 0px;
      display: flex;
      .discount_box {
        margin-left: 106.884rpx;
        margin-top: 16.304rpx;
        .discount {
          font-size: 54.348rpx;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #fe445a;
        }
        .scope_discount {
          font-size: 28.362rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #fe445a;
        }
      }
      .discounts_box {
        margin-left: 120rpx;
        margin-top: 11px;
        .discounts_ins {
          font-size: 36rpx;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #000000;
        }
        .discounts_validity {
          font-size: 26.739rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
          margin-top: 20rpx;
        }
      }
    }
  }
}
</style>
