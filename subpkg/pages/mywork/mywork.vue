<template>
  <view class="container">
    <u-navbar
      :is-back="true"
      title="我的样音"
      title-size="36.232rpx"
      title-color="#000000"
      :border-bottom="true"
    ></u-navbar>
    <view class="jisuangaodu">
      <view class="u-tabs-box">
        <u-tabs
          activeColor="#FF445A"
          bold
          ref="tabs"
          bg-color="#FFFFFF"
          inactive-color="#666666"
          :bar-style="barStyle"
          name="title"
          :is-scroll="false"
          :list="list"
          :current="current"
          @change="change"
          font-size="28.362"
        ></u-tabs>
      </view>
      <scroll-view
        class="scroll_view"
        :scroll-top="scrollInto"
        @scroll="tabScoll"
        @scrolltolower="reachBottom"
        scroll-y
      >
        <view v-if="defaultshow">
          <view
            class="works_item"
            v-for="(item, index) in readList"
            :key="index"
          >
            <view class="play_item" @click="playTheMusic(item)">
              <image
                class="head_portrait_img"
                :src="item.teacher.avatar"
                mode="aspectFill"
              />
              <image
                class="home_play"
                :src="item.works.playStatus ? playActive : play"
                mode="scaleToFill"
              />
              <view class="head_portrait_meng"></view>
            </view>
            <view class="works_name_item" @click="handleVisitorsJump(item)">
              <view class="works_name u-line-1">{{ item.works.title }}</view>
              <view class="works_style u-line-1">
                <span v-if="item.teacher.grade_text !== '无'">{{
                  item.teacher.grade_text
                }}</span>
                <span
                  v-if="item.teacher.grade_text !== '无'"
                  style="margin-left: 10rpx; margin-right: 10rpx"
                  >|</span
                >
                <span>{{ item.tags[0].value }}</span>
                <span style="margin-left: 10rpx; margin-right: 10rpx">|</span>
                <span>{{ transformsex(item.teacher.sex) }}</span>
                <!-- <span v-if="item.admin_price" style="margin-left:10rpx;margin-right:10rpx">|</span>
					<span>{{item.admin_price}}</span> <span v-if="item.admin_price">元</span> -->
              </view>
              <view class="price_item">
                <view class="price_text">{{ item.price_text }}</view>
                <view class="price_box">
                  <view v-if="item.admin_price" class="price_num">
                    <span>￥</span>
                    <span>{{ item.admin_price }}</span>
                  </view>
                  <view v-else class="price_num">见稿报价</view>
                </view>
                <view v-if="item.admin_price" class="price_line_box">
                  ￥{{ item.discount_price }}
                  <view class="price_line"></view>
                </view>
              </view>
            </view>
            <view class="btn_item">
              <view class="voice_btn" @click="handleUseOrder(item)">下单</view>
              <view class="voice_img_box" @click="handleOperation(item)">
                <image
                  class="voice_img"
                  src="@/static/my/caozuo.png"
                  mode="scaleToFill"
                />
              </view>
            </view>
          </view>
          <view v-if="has_next === false" class="defaltext">没有更多了</view>
          <u-loadmore
            v-if="has_next === true"
            status="loading"
            bgColor="#FFFFFF"
          ></u-loadmore>
        </view>
        <view v-if="!defaultshow" class="page-box">
          <view class="defaltPage">
            <image
              class="defaltPageimg"
              src="@/static/demand/defaulticon.png"
              mode="scaleToFill"
            />
            <!-- <view class="defaltext">你还没有订单</view> -->
          </view>
        </view>
        <view style="height: 90px"></view>
      </scroll-view>
    </view>
    <!-- <view class="findOut_box">
		<view class="findOut_btn" @click="handleDubbinglLibrary">去发现</view>
	</view> -->
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
    <!-- 下单 -->
    <u-popup
      v-model="submitShow"
      mode="bottom"
      height="1084.348rpx"
      border-radius="24"
    >
      <release
        ref="submitform"
        :bottomTitle="true"
        :data="dataObj"
        :subTitle="false"
        :srstatus="true"
        :btnText="btnText"
        @submitShow="getsubmitShow"
      >
      </release>
    </u-popup>
    <u-popup v-model="collectShow" mode="bottom" border-radius="24">
      <view
        class="collect_item"
        @click="downloadcopySampleVoices(operationItem, '复制样音信息成功')"
      >
        <image
          class="collection"
          src="@/static/teacherlist/copyicon.png"
          mode="scaleToFill"
        />
        <view class="collect_text">复制</view>
      </view>
      <view class="collect_item" @click="handleCollectStatus">
        <image
          class="collection"
          :src="operationItem.work_type === 0 ? shouchang : yishouchang"
          mode="scaleToFill"
        />
        <view
          :class="
            operationItem.work_type === 0 ? 'collect_text' : 'redcollect_text'
          "
          >{{ operationItem.work_type === 0 ? "收藏" : "已收藏" }}</view
        >
      </view>
      <view
        class="collect_item"
        @click="
          downloadcopy(
            operationItem.works.url,
            '下载链接已复制，请粘贴到浏览器打开'
          )
        "
      >
        <image
          class="collection"
          src="@/static/teacherlist/download.png"
          mode="scaleToFill"
        />
        <view class="collect_text">下载</view>
      </view>
      <view class="collect_item">
        <image
          class="collection"
          :src="operationItem.share_type === 0 ? shouchang : yishouchang"
          mode="scaleToFill"
        />
        <view class="cloudsharebox">
          <view
            class="collect_text"
            @click="
              operationItem.share_type === 0
                ? handlejoincloudAdd(operationItem)
                : handlejoincloud(operationItem)
            "
            >{{
              operationItem.share_type === 0 ? "加入云分享" : "移除云分享"
            }}</view
          >
          <view class="cloud_btn" @click="handleCloudShare(operationItem)">
            <span class="collect_text1">进入</span>
            <image
              class="rightarr_icon"
              src="@/static/coupons/rightarr.png"
              mode="scaleToFill"
            />
          </view>
        </view>
      </view>
      <view class="collect_item_btn" @click="hanldeCancelcoll">取消</view>
    </u-popup>
  </view>
</template>

<script>
import accesslist from "@/components/accesslist/accesslist.vue";
import { collectionlist } from "@/api/personal.js";
import { servicetag, servicsecList, collection } from "@/api/voice.js";
import musicAudio from "@/components/audio/audioplay.vue";
import playActive from "@/static/teacherlist/palyActive2.png";
import play from "@/static/teacherlist/paly2.png";
import shouchang from "@/static/img/shouchang.png";
import {
  teacherdetail,
  shareAdd,
  shareDel,
} from "@/api/index.js";
import yishouchang from "@/static/img/yishouchang.png";
// 复制
import uniCopy from "@/utils/uni-copy.js";
import { buriedSomeStatistical } from '@/utils/encapsulation.js'
export default {
  components: { accesslist, musicAudio },
  data() {
    return {
      clickContent: "0",
      readList: [],
      attentionList: [],
      has_next: true,
      play: play,
      playActive: playActive,
      pageData: {
        status: 0,
        page: 1,
        size: 10,
      },
      list: [
        {
          name: "下过单的",
          id: 0,
        },
        {
          name: "我收藏的",
          id: 1,
        },
      ],
      dataPlay: {
        works: { url: "" },
      },
      scrollInto: 0,
      current: 0,
      audioShow: false,
      // 下单的参数
      submitShow: false,
      defaultshow: true,
      // 操作参数
      collectShow: false,
      operationItem: {},
      dataObj: {
        teacher_id: "",
        service_id: "",
        status: 1,
        filename: "",
        content_url_escape: "",
        work_id: "",
        subjecttype: "",
      },
      btnText: "按作品效果试音",
      //  收藏的icon
      shouchang: shouchang,
      yishouchang: yishouchang,
    };
  },
  onLoad(options) {
    uni.hideShareMenu();
    this.handlegainCardData(this.pageData);
  },
  onShow() {
	this.handlegainCardData(this.pageData);
  },
  onHide() {
    this.musicClose();
  },
  methods: {
    change(index) {
      this.current = index;
      (this.pageData = {
        status: this.current,
        page: 1,
        size: 10,
      }),
        this.handlegainCardData(this.pageData);
    },
    async handlegainCardData(item) {
      var res = await collectionlist(item);
      console.log("我的关注数据", res);
      this.readList = res.data;
      if (this.readList.length < res.count) {
        this.has_next = true;
      } else {
        this.has_next = false;
      }
      if (this.readList.length === 0) {
        this.defaultshow = false;
      } else {
        this.defaultshow = true;
      }
      this.scrollInto = this.scrollTop;
      setTimeout(() => {
        this.scrollInto = 0;
      }, 0);
    },
    transformsex(item) {
      if (item === 1) {
        return "男声";
      } else if (item === 2) {
        return "女声";
      } else {
        return "企业";
      }
    },
    // 跳转到配音师详情
    handleVisitorsJump(orderItem) {
      uni.navigateTo({
        url: "/subpkg/pages/teacherlist/teacherlist?id=" + orderItem.teacher_id,
      });
    },
    // 跳转到配音师库
    handleDubbinglLibrary() {
      uni.switchTab({ url: "/pages/dubbinglibrary/dubbinglibrary" });
    },
    async reachBottom() {
      if (this.has_next) {
        var pages = this.pageData.page + 1;
        this.pageData = {
          page: pages,
          size: 10,
          status: this.current,
        };
        // const res = await getDemandList({
        // 	state: this.list[idx].id
        // })
        const res = await followListdata(this.pageData);
        if (this.readList.length < res.count) {
          this.has_next = true;
        } else {
          this.has_next = false;
        }
        res.data.map((item) => {
          this.readList.push(item);
        });
      } else {
      }
    },
    tabScoll(e) {
      this.scrollTop = e.detail.scrollTop;
    },
    // 使用样音下单
    handleUseOrder(item) {
      console.log("使用样音下单,用户下单状态", item, this.order_status);
      if (item.admin_price) {
        this.dataObj.service_id = item.service_id;
        this.dataObj.teacher_id = item.teacher_id;
        this.dataObj.filename = item.works.title;
        this.dataObj.content_url_escape = item.url;
        this.dataObj.work_id = item.works.id;
        this.dataObj.avatar = item.teacher.avatar;
        this.dataObj.nickname = item.teacher.nickname;
        this.dataObj.offer_price = item.offer_price;
        this.dataObj.subjecttype = item.tags[0].value;
        // this.submitShow = true
        this.btnText = "按样音效果试音";
        uni.setStorageSync("dataObj", this.dataObj);
        uni.navigateTo({ url: "/subpkg/pages/voicesrelease/voicesrelease" });
        // this.$nextTick(() => {
        // 	this.$refs.submitform.handlertextarea()
        // });
      } else {
        uni.showToast({
          title: "该服务暂不支持在线试音，请联系客服",
          icon: "none",
        });
      }
      // 统计在线下单
      buriedSomeStatistical(3)
    },
    // 操作事件
    handleOperation(item) {
      console.log("点击操作打印数据", item);
      this.operationItem = item;
      this.collectShow = true;
    },
    //  取消操作事件
    hanldeCancelcoll() {
      this.collectShow = false;
    },
    // 收藏
    handleCollectStatus() {
      var coData = {
        work_id: this.operationItem.works.id,
        type: this.operationItem.work_type,
      };
      collection(coData)
        .then((res) => {
          console.log(res);
          if (this.operationItem.work_type === 1) {
            this.operationItem.work_type = 0;
          } else {
            this.operationItem.work_type = 1;
          }
        })
        .catch((err) => {});
    },
    // 进入云分享页面
    handleCloudShare(item) {
      console.log("进入云分享", item);
      uni.navigateTo({
        url: "/subpkg/pages/voicesshare/voicesshare",
      });
      this.collectShow = false;
    },
    // 加入云分享
    handlejoincloudAdd(item) {
      console.log("加入云分享", item);
      shareAdd({ work_id: item.works.id }).then((res) => {
        console.log();
        if (this.operationItem.share_type === 1) {
          this.operationItem.share_type = 0;
          uni.showToast({
            title: "移除成功",
            icon: "none",
          });
        } else {
          this.operationItem.share_type = 1;
        }
      });
    },
    // 移除云分享
    handlejoincloud(item) {
      console.log("移除云分享", item);
      let _this = this;
      shareDel({ work_id: item.works.id }).then((res) => {
        console.log();
        if (this.operationItem.share_type === 1) {
          this.operationItem.share_type = 0;
          uni.showToast({
            title: "移除成功",
            icon: "none",
          });
        } else {
          this.operationItem.share_type = 1;
        }
      });
    },
    // 关闭需求弹窗
    getsubmitShow() {
      this.submitShow = false;
    },
    playTheMusic(orderItem) {
      console.log("传过来的数据", orderItem);
      this.audioShow = true;
      if (this.dataPlay.works.url === orderItem.works.url) {
        this.readList.map((item) => {
          if (this.dataPlay === item) {
            orderItem.works.playStatus = !orderItem.works.playStatus;
          } else {
            item.playStatus = false;
          }
        });
      } else {
        this.readList.map((item) => {
          item.works.playStatus = false;
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
      this.readList.map((item) => {
        if (this.dataPlay === item) {
          item.works.playStatus = status;
        } else {
          item.works.playStatus = false;
        }
      });
    },
    musicClose() {
      this.readList.map((item) => {
        item.works.playStatus = false;
      });
      this.audioShow = false;
      this.dataPlay = {
        works: {
          url: "",
        },
      };
    },
    // 复制作品链接
    downloadcopy(groupNum, title) {
      uniCopy({
        content: groupNum,
        success: (res) => {
          uni.showToast({
            title: title,
            icon: "none",
          });
        },
        error: (e) => {},
      });
      buriedSomeStatistical(1)
    },
    // 复制样音信息链接
    async downloadcopySampleVoices(item, title) {
      let res = await teacherdetail({ teacher_id: item.teacher_id });
      let groupNum =
        "样音信息：" +
        item.teacher.nickname +
        "(" +
        item.teacher.grade_text +
        ")" +
        "+" +
        item.title +
        "+" +
        item.offer_price +
        "+下载链接 " +
        item.works.url;
      console.log(item, groupNum);
      uniCopy({
        content: groupNum,
        success: (res) => {
          uni.showToast({
            title: title,
            icon: "none",
          });
        },
        error: (e) => {},
      });
    },
  },
};
</script>

<style lang="scss">
page {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.invitationBtn {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  border-radius: 57.971rpx 0px 0px 57.971rpx;
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
.container {
  background: #f2f2f2;
  display: flex;
  height: 100%;
  flex-direction: column;
  .home_musicSrc_box {
    position: fixed;
    bottom: 100rpx;
    z-index: 9999;
  }
  .findOut_box {
    position: fixed;
    width: 100%;
    bottom: 60rpx;
    z-index: 999;
    display: flex;
    justify-content: center;
    .findOut_btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 579.71rpx;
      height: 90.58rpx;
      background: #ff445a;
      border-radius: 50.725rpx;
      font-size: 18px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
    }
  }
}
.defaltext {
  margin-top: 30rpx;
  text-align: center;
  font-size: 24rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #717171;
  line-height: 16px;
}
.visit_box {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.dataCard_box {
  background: #ffffff;
  z-index: 99;
  padding: 41.667rpx 27.174rpx 27.174rpx 27.174rpx;
}
.jisuangaodu {
  flex: 1;
  height: 100%;
  overflow-y: hidden;
  .scroll_view {
    height: 100%;
    .works_item {
      display: flex;
      align-items: center;
      width: 695.652rpx;
      height: 181.159rpx;
      background: #ffffff;
      border-radius: 14.493rpx;
      margin-top: 25.362rpx;
      margin-left: 27.174rpx;
      .play_item {
        position: relative;
        width: 123.188rpx;
        height: 123.188rpx;
        margin-left: 23.551rpx;
        .head_portrait_img {
          width: 123.188rpx;
          height: 123.188rpx;
          border-radius: 14.493rpx;
        }
        .home_play {
          position: absolute;
          top: 50%;
          left: 55%;
          transform: translate(-50%, -50%);
          width: 29.529rpx;
          height: 28.986rpx;
          z-index: 9;
        }
        .head_portrait_meng {
          position: absolute;
          left: 0px;
          top: 0;
          width: 123.188rpx;
          height: 123.188rpx;
          border-radius: 14.493rpx;
          background: rgba(0, 0, 0, 0.2);
        }
      }
      .btn_item {
        display: flex;
        align-items: center;
        margin-top: 70rpx;
        .voice_btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 108.696rpx;
          height: 50.725rpx;
          background: #ffffff;
          border-radius: 25.362rpx;
          border: 1.812rpx solid #ff4f64;
          font-size: 21.739rpx;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #ff445a;
        }
        .voice_img_box {
          width: 66.232rpx;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          .voice_img {
            margin-left: 9.058rpx;
            width: 7.246rpx;
            height: 32.609rpx;
          }
        }
      }
      .works_name_item {
        margin-left: 16.246rpx;
        width: 331.957rpx;
        margin-right: 20rpx;
        .works_name {
          font-size: 28.986rpx;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #000000;
        }
        .works_style {
          margin-top: 8rpx;
          font-size: 23.551rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #666666;
        }
        .price_item {
          display: flex;
          align-items: center;
          margin-top: 12rpx;
          .price_text {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 80.464rpx;
            height: 32.609rpx;
            border-radius: 4.623rpx;
            border: 1.812rpx solid #ff445a;
            font-size: 21.739rpx;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #ff445a;
          }
          .price_box {
            display: flex;
            margin-left: 16.304rpx;
            font-size: 23.551rpx;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #ff445a;
          }
          .price_line_box {
            position: relative;
            margin-left: 16.304rpx;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 23.551rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #999999;
            .price_line {
              position: absolute;
              left: 0px;
              width: 100%;
              height: 1.812rpx;
              background: #999999;
            }
          }
        }
      }
    }
    .voice_item {
      display: flex;
      width: 695.652rpx;
      height: 231.884rpx;
      background: #ffffff;
      border-radius: 14.493rpx;
      margin-top: 25.362rpx;
      margin-left: 27.174rpx;
      .head_portrait_box {
        position: relative;
        border-radius: 14.493rpx;
        width: 177.536rpx;
        height: 231.884rpx;
        background: rgba(0, 0, 0, 0.2);
        .head_portrait_img {
          border-radius: 14.493rpx;
          width: 177.536rpx;
          height: 231.884rpx;
        }
        .home_play {
          position: absolute;
          top: 101.449rpx;
          left: 76.992rpx;
          width: 23.551rpx;
          height: 28.986rpx;
          z-index: 9;
        }
        .head_portrait_meng {
          position: absolute;
          left: 0px;
          top: 0;
          border-radius: 14.493rpx;
          width: 177.536rpx;
          height: 231.884rpx;
          background: rgba(0, 0, 0, 0.1);
        }
      }
      .voice_introduce {
        margin-left: 16.246rpx;
        padding-top: 25.362rpx;
        width: 472rpx;
        .voice_name {
          display: flex;
          align-items: center;
          position: relative;
          .rank {
            height: 39.855rpx;
            font-size: 28.986rpx;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #000000;
            line-height: 39.855rpx;
          }
          .name {
            margin-left: 16.304rpx;
            max-width: 250rpx;
            height: 39.855rpx;
            font-size: 28.986rpx;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #000000;
            line-height: 39.855rpx;
          }
          .sex {
            margin-left: 3.623rpx;
            width: 25.362rpx;
            height: 25.362rpx;
          }
          .focus_btn {
            text-align: center;
            position: absolute;
            right: 10rpx;
            width: 101.449rpx;
            height: 45.29rpx;
            background: #ffffff;
            border-radius: 32.609rpx;
            border: 1px solid #ff445a;
            font-size: 21.739rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #ff445a;
            line-height: 43.478rpx;
          }
          .nofocus_btn {
            text-align: center;
            position: absolute;
            right: 10rpx;
            width: 101.449rpx;
            height: 45.29rpx;
            background: #ffffff;
            border-radius: 32.609rpx;
            border: 1px solid #cecece;
            font-size: 21.739rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #999999;
            line-height: 43.478rpx;
          }
        }
        .numberworks {
          height: 32.609rpx;
          margin: 14.493rpx 0;
          font-size: 23.551rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #666666;
          line-height: 32.609rpx;
          .workscount {
            margin-right: 30.797rpx;
          }
        }
        .tagNum {
          display: flex;
          margin-top: 14.493rpx;
          .tag {
            min-width: 108.696rpx;
            padding: 0 9.058rpx;
            height: 39.855rpx;
            background: rgba(255, 165, 61, 0.12);
            border-radius: 4.623rpx;
            font-size: 21.739rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #ff9c29;
            line-height: 39.855rpx;
            margin-right: 10.87rpx;
          }
        }
        .jianjie {
          margin-top: 14.493rpx;
          width: 461.957rpx;
          height: 32.609rpx;
          font-size: 23.551rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #666666;
          line-height: 32.609rpx;
        }
      }
    }
  }
}
.business_data {
  .business_data_title {
    display: flex;
    justify-content: space-between;
    .title_data {
      width: 173.913rpx;
      height: 39.855rpx;
      font-size: 28.986rpx;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #000000;
      line-height: 39.855rpx;
    }
  }
  .data_content {
    margin-top: 18.116rpx;
    width: 695.652rpx;
    height: 173.913rpx;
    background: #ffffff;
    box-shadow: 0px 3.623rpx 36.232rpx 0px rgba(0, 0, 0, 0.07);
    border-radius: 21.739rpx;
    display: flex;
    .seen_my {
      width: 33.333%;
      position: relative;
      text-align: center;
      .blue_line {
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 24px;
        height: 6px;
        background: #1274ff;
        border-radius: 3px;
        transform: translate(-50%, -50%);
      }
      .seen_num {
        position: relative;
        margin-top: 41.667rpx;
        height: 54.348rpx;
        font-size: 39.855rpx;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        line-height: 54.348rpx;
        color: #1274ff;
        .seen_badge {
          display: inline-block;
          position: relative;
          top: -20px;
          width: 36.232rpx;
          height: 36.232rpx;
          text-align: center;
          line-height: 36.232rpx;
          border-radius: 18.116rpx;
          font-size: 21.739rpx;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #ffffff;
          background: #ff445a;
        }
      }

      .seen_my_tile_box {
        display: flex;
        margin-top: 9.058rpx;
        align-items: center;
        justify-content: center;
        .seen_icon {
          width: 23.551rpx;
          height: 19.928rpx;
        }
        .seen_text {
          margin-left: 5.623rpx;
          height: 30.797rpx;
          font-size: 21.739rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
          line-height: 30.797rpx;
        }
      }
    }
  }
}
.collect_item {
  height: 108.696rpx;
  border-bottom: 1px solid #f7f7f7;
  display: flex;
  align-items: center;
  .collection {
    margin-left: 43.478rpx;
    width: 39.855rpx;
    height: 39.855rpx;
  }
  .collect_text {
    margin-left: 14.493rpx;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #000000;
  }
  .cloudsharebox {
		display: flex;
		align-items: center;
		width: 650rpx;
		justify-content: space-between;
        .collect_text {
            margin-left: 14.493rpx;
			font-size: 16px;
			width: 50%;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #000000;
		}
		.cloud_btn {
			display: flex;
			justify-content: flex-end;
		    align-items: center;
			width: 50%;
			.collect_text1 {
				margin-left: 14.493rpx;
				font-size: 16px;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #000000;
			}
			.rightarr_icon {
				width: 19.928rpx;
				height: 21.739rpx;
				margin: 0 13.551rpx;
		  }
		}
	}
  .redcollect_text {
    margin-left: 14.493rpx;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #000000;
  }
}
.collect_item_btn {
  height: 134.058rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
}
.defaltPage {
  text-align: center;
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
</style>
