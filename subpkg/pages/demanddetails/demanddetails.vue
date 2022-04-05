<template>
  <view class="container">
    <u-navbar
      :is-back="true"
      :title="'需求详情'"
      title-size="36.232rpx"
      title-color="#000000"
      :border-bottom="false"
      :background="background"
      back-icon-color="#000000"
      :custom-back="handleGoBack"
    ></u-navbar>
    <view class="content">
      <!-- 确认成品弹窗 -->
      <view class="pys_popup" v-if="InvitedPopShow">
        <view class="popup_conent">
          <image
            class="closeicon"
            src="@/static/home/close.png"
            mode="scaleToFill"
            @click="handlecloseerPopShow"
          />
          <view>
            <view style="height: 17.971rpx"></view>
            <view class="check_WeChat_test"> 确认成品 </view>
            <view class="check_WeChat_tips"
              >是否已经收到成品，并且确认成品满意？</view
            >
            <view class="share_btn_box">
              <button
                class="cancelSharebtn"
                hover-class="button-hover"
                @click="handlecloseerPopShow"
              >
                取消
              </button>
              <button class="sharebtn" @click="handlefinishedMsg">确认</button>
            </view>
          </view>
        </view>
      </view>
      <view class="pys_popup" v-if="enddemandShow">
        <view class="popup_conent">
          <image
            class="closeicon"
            src="@/static/home/close.png"
            mode="scaleToFill"
            @click="handlecloseerPopShow"
          />
          <view>
            <view style="height: 17.971rpx"></view>
            <view class="check_WeChat_test"> 关闭需求 </view>
            <view class="check_WeChat_tips"
              >是否关闭需求，关闭后无法再收到试音</view
            >
            <view class="share_btn_box">
              <button
                class="cancelSharebtn"
                hover-class="button-hover"
                @click="handlecloseerPopShow"
              >
                取消
              </button>
              <button class="sharebtn" @click="handleenddomanreq">确认</button>
            </view>
          </view>
        </view>
      </view>
      <view class="demand_profile">
        <view class="head_portrait_box">
          <image
            class="head_portrait_img"
            :src="demandProfile.user.avatar"
            mode="scaleToFill"
          />
          <view class="nick_name u-line-1">{{
            demandProfile.user.nickname
          }}</view>
          <text class="deta_title">{{ demandProfile.created_at }}</text>
        </view>
        <view class="item_label">
          <view class="label">类型</view>
          <view class="label_value">
            <view class="profile_tag">
              <span>{{
                demandProfile.tags[0].value === "不限"
                  ? "题材" + demandProfile.tags[0].value
                  : demandProfile.tags[0].value
              }}</span>
              <span style="margin-left: 10rpx; margin-right: 10rpx">| </span>
              <span v-if="demandProfile.tags[1].value">{{
                demandProfile.tags[1].value === "不限"
                  ? "性别" + demandProfile.tags[1].value
                  : demandProfile.tags[1].value
              }}</span>
              <span
                v-if="demandProfile.tags[1].value"
                style="margin-left: 10rpx; margin-right: 10rpx"
                >|</span
              >
              <span v-if="demandProfile.tags[2].value">{{
                demandProfile.tags[2].value === "不限"
                  ? "风格" + demandProfile.tags[2].value
                  : demandProfile.tags[2].value
              }}</span>
              <span
                v-if="demandProfile.tags[2].value"
                style="margin-left: 10rpx; margin-right: 10rpx"
                >|</span
              >
              <span>{{ demandProfile.draft_word_count }}字</span>
              <span
                v-if="demandProfile.discuss || demandProfile.budget != 0"
                style="margin-left: 10rpx; margin-right: 10rpx"
                >|</span
              >
              <text style="margin-left: 9rpx" v-if="demandProfile.discuss"
                >价格商议</text
              >
              <text style="margin-left: 9rpx" v-else>
                <text v-if="demandProfile.budget != 0"
                  >{{ demandProfile.budget }}元</text
                >
              </text>
            </view>
          </view>
        </view>
        <view class="item_label">
          <view class="label_text">要求</view>
          <view class="label_value">
            <text class="label_value_text_active">
              {{ demandProfile.content || "未输入其他要求" }}
            </text>
          </view>
        </view>
        <view class="item_label" style="margin-top: 18.116rpx">
          <view class="label_text">文本</view>
          <view class="label_value">
            <text
              :class="anShow ? 'label_value_text' : 'label_value_text_active'"
            >
              {{ demandProfile.audition_text || "未输入试音文本" }}
            </text>
            <view
              v-if="demandProfile.audition_text.length > 30"
              class="label_anbox"
              @click="handleanorPack"
            >
              <image
                class="label_an"
                src="@/static/home/drop-down.png"
                mode="scaleToFill"
              />
            </view>
          </view>
        </view>
        <view class="placeholder_line"></view>
        <view class="item_label last_item_label" style="margin-top: 39.855rpx">
          <view class="label_text"></view>
          <view class="label_value">
            <view
              class="download_voices"
              @click="
                downloadcopy(
                  demandProfile.content_url,
                  '下载链接已复制，请粘贴到浏览器打开'
                )
              "
            >
              <image
                class="download_icon"
                src="@/static/home/mp3icon.png"
                mode="scaleToFill"
              />
              <text class="download_text">{{
                demandProfile.content_url ? "下载参考样音" : "无参考样音"
              }}</text>
            </view>
            <view
              class="download_voices"
              @click="
                downloadcopy(
                  demandProfile.audition_url,
                  '下载链接已复制，请粘贴到浏览器打开'
                )
              "
            >
              <image
                class="download_icon"
                src="@/static/home/wordicon.png"
                mode="scaleToFill"
              />
              <text class="download_text">{{
                demandProfile.audition_url ? "下载文本附件" : "无文本附件"
              }}</text>
            </view>
          </view>
        </view>
        <view class="release_btnbox">
          <view
            v-if="demandProfile.status === 0"
            class="release_btn"
            @tap="handleEndDemand"
          >
            关闭需求
          </view>
		  <view
            v-if="demandProfile.status === 2"
            class="hasended_btn"
          >
            试音已完成
          </view>
          <view v-if="demandProfile.status === 1" class="hasended_btn">
            需求已关闭
          </view>
        </view>
      </view>
      <view class="sampleVoices">
        <!-- 切换的tabs -->
        <!-- <view class="u-tabs-box">
					<u-tabs
						activeColor="#FF445A"
						bold
						ref="tabs"
						bg-color="#130836" 
						inactive-color="#FFFFFF" 
						:bar-style="barStyle" 
						name="title" 
						:is-scroll="false"
						:list="list" 
						:current="current" 
						@change="change" 
						font-size='28.362'
					></u-tabs>
				</view> -->
        <view class="divider">
          <view class="line"></view>
          <view class="text">{{ teacher_count }}已上传</view>
          <view class="line"></view>
        </view>
        <scroll-view class="itemList_scroll" scroll-y>
          <view v-if="listData.length > 0">
            <view v-if="current == 0" class="itemList_boxnew">
              <view
                class="item_list"
                v-for="(itemList, lsitindex) in listData"
                :key="lsitindex"
              >
                <view class="list_top">
                  <view
                    class="avatar_bxo"
                    @click="handleVisitorsJump(itemList.teacher_id)"
                  >
                    <image
                      class="avatar_img"
                      :src="itemList.teacher.avatar"
                      mode="scaleToFill"
                    />
                  </view>
                  <view v-if="itemList.url == null" class="nickname_box">
                    <view class="nicknamen u-line-1">
                      <view class="nickname_tetx u-line-1">{{
                        itemList.teacher.nickname
                      }}</view>
                    </view>
                  </view>
                  <view
                    v-if="itemList.url !== null"
                    class="nickname_box"
                    @click="handleVisitorsJump(itemList.teacher_id)"
                  >
                    <view class="nicknamen u-line-1">
                      <view class="nickname_tetx"
                        >{{ itemList.teacher.nickname }}
                        <span style="margin-left: 10rpx">{{
                          itemList.created_at
                        }}</span></view
                      >
                      <image
                        v-if="itemList.teacher.sex === 1"
                        class="sex_img"
                        src="@/static/teacherlist/manicon.png"
                        mode="scaleToFill"
                      />
                      <image
                        v-if="itemList.teacher.sex === 2"
                        class="sex_img"
                        src="@/static/teacherlist/woman.png"
                        mode="scaleToFill"
                      />
                      <image
                        v-if="itemList.teacher.sex === 3"
                        class="sex_img"
                        src="@/static/teacherlist/qi.png"
                        mode="scaleToFill"
                      />
                    </view>
                    <!-- <view class="price_box">
									报价：元
								  </view> -->
                  </view>
                  <view class="red_offer_box">
                    <!-- <view v-if="itemList.status === 0" class="red_offer">
                                        ￥{{itemList.total}}
									</view> -->
                    <view v-if="itemList.status === 0" class="red_offer">
                      ￥{{ itemList.total }}
                    </view>
                    <!-- <view v-if="itemList.status === 0" class="invitation_btn cellTa" @click="handlePlaceOrder(itemList)">
										下单
								   </view> -->
                  </view>
                </view>
                <view class="list_bottom">
                  <view class="play_list" v-if="itemList.url === null">
                    <!-- <view class="play_box">
									<image
										class="play"
										src="@/static/demand/loading.png"
										mode="scaleToFill"
									/> 
								</view> -->
                    <view class="nameWorks" style="margin-left: 20rpx">
                      正在为你试音中
                      <text v-if="itemList.time !== 0">，上传倒计时</text>
                      <u-count-down
                        v-if="itemList.time !== 0"
                        class="countdown_num"
                        :timestamp="itemList.time"
                        font-size="25.362"
                        separator-size="25.362"
                        :show-hours="false"
                        bg-color="#F1F3F7"
                        separator-color="#000000"
                        color="#000000"
                      ></u-count-down>
                    </view>
                  </view>
                  <view
                    class="play_list"
                    v-if="itemList.url !== null"
                    @click="playTheMusic(itemList)"
                  >
                    <view class="play_box">
                      <image
                        class="play"
                        :src="itemList.playStatus ? playActive : play"
                        mode="scaleToFill"
                      />
                    </view>
                    <view class="nameWork u-line-1">{{ itemList.title }}</view>
                  </view>
                  <view v-if="itemList.status === 0" class="btn_item">
                    <view class="voice_btn" @click="handlePlaceOrder(itemList)"
                      >下单</view
                    >
                    <view
                      class="voice_img_box"
                      @click="handleOperation(itemList)"
                    >
                      <image
                        class="voice_img"
                        src="@/static/my/caozuo.png"
                        mode="scaleToFill"
                      />
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </view>
          <view v-if="countSta == 0" class="auditionTips"
            >若试音都不合适，请联系客服匹配</view
          >
          <view v-if="listData.length === 0" class="temporarily_box">
            <image
              class="temporarily_icon"
              src="@/static/demand/defaulticon.png"
              mode="scaleToFill"
            />
            <view class="temporarily_text">暂无数据</view>
          </view>
          <view style="height: 80px"></view>
        </scroll-view>
      </view>
    </view>
    <view v-if="audioShow" class="home_musicSrc_box disappear">
      <musicAudio
        ref="musicAudio"
        :url="dataPlay.url"
        :autoplay="true"
        :portrait="dataPlay.teacher.avatar"
        :music_title="dataPlay.title"
        @handleChangePlay="handleChangePlay"
        @musicClose="musicClose"
      ></musicAudio>
    </view>
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
        :subTitle="false"
        btnText="确认需求，按试音录制"
        resBtn="确认"
        @submitShow="getsubmitShow"
      >
      </release>
    </u-popup>
    <dropball title="联系客服"> </dropball>
    <u-popup v-model="collectShow" mode="bottom" border-radius="24">
      <!-- <view class="collect_item" @click="handleCollectStatus">
			  <image
			      class="collection"
				  :src="operationItem.work_type===0 ? shouchang : yishouchang"
				  mode="scaleToFill"
			  />
			  <view :class="operationItem.work_type===0 ? 'collect_text' : 'redcollect_text'">{{operationItem.work_type===0 ? '收藏' : '已收藏'}}</view>
		  </view> -->
      <view
        class="collect_item"
        @click="
          downloadcopy(operationItem.url, '下载链接已复制，请粘贴到浏览器打开')
        "
      >
        <image
          class="collection"
          src="@/static/teacherlist/download.png"
          mode="scaleToFill"
        />
        <view class="collect_text">下载</view>
      </view>
      <view class="collect_item_btn" @click="hanldeCancelcoll">取消</view>
    </u-popup>
  </view>
</template>

<script>
// import dropball from '@/components/cardball/cardball.vue'
import shouchang from "@/static/img/shouchang.png";
import yishouchang from "@/static/img/yishouchang.png";
import release from "@/components/release/release.vue";
// 引入需求详情api
import {
  demandDetail,
  demandDemandteacher,
  demandFabulousadd,
  demandFabulousdel,
  demandAdd,
  demandDetailteacher,
  demandDel,
  demandConfirm,
  demandFabulouslist,
  orderPay,
  orderConfirm,
  getphone,
  demandEnd,
} from "@/api/myneeds.js";
import { loginStatus, profileUpdate } from "@/api/index.js";
import { collection } from "@/api/voice.js";
// 复制
import uniCopy from "@/utils/uni-copy.js";
// 播放组件
import musicAudio from "@/components/audio/audioplay.vue";
import dropball from "@/components/dropball/dropball.vue";
export default {
  components: {
    musicAudio,
    release,
    dropball,
  },
  data() {
    return {
      list: [
        {
          name: "邀请的试音",
          id: 1,
        },
        {
          name: "报价与付款",
          id: 2,
        },
        {
          name: "交付与验收",
          id: 3,
        },
      ],
      consultantShow: false,
      consultantTitle: "截图加我微信，获取更多试音",
      play: "https://www.peiyinstreet.com/guidang/play.png",
      playActive: "https://www.peiyinstreet.com/guidang/palyActive.png",
      shouchang: shouchang,
      yishouchang: yishouchang,
      current: 0,
      countSta: 1,
      loadingmatchingShow: true,
      background: {
        backgroundColor: "#ffffff",
      },
      timestamp: 86400,
      InvitedPopShow: false,
      confirmPopShow: false,
      barStyle: {
        // backgroundColor: "#ffffff",
      },
      priceList: ["不限", "中级≤20元", "高级30元-40元", "特级≥50元"],
      activeIndex: 0,
      recommendedShow: false,
      anShow: true,
      demand_id: "",
      needType: "",
      demandProfile: {},
      // 推荐弹窗参数
      recommended: {
        demand_id: this.demand_id,
        type: 1,
        page: 1,
        size: 3,
      },
      audioShow: false,
      has_next: "",
      dataPlay: {
        url: "",
      },
      recommendedData: [],
      beConfirmedData: [],
      invitationCount: 0,
      // 邀请状态
      invitationStatus: 0,
      totalNum: 0,
      // 列表数据
      listData: [],
      listObj: {
        demand_id: "",
        status: 1,
      },
      iphonestatus: true,
      order_item: null,
      dataCode: "",
      // 需求状态
      demandState: true,
      // 结束订单弹窗
      enddemandShow: false,
      // 发布需求弹窗
      submitShow: false,
      teachrID: "",
      statusNum: 0,
      teacher_count: 0,
      // 收藏的作品
      collectShow: false,
      // 操作item
      operationItem: {},
    };
  },
  onLoad(options) {
    console.log("传过来的id", options);
    setTimeout(() => {
      this.loadingmatchingShow = false;
    }, 3000);
    this.demand_id = options.id;
    this.recommended.demand_id = options.id;
    this.listObj.demand_id = options.id;
    this.needType = options.status;
    if (options.status) {
      this.listObj.status = options.status;
      this.current = options.status;
    }
    this.getDemandDetail();
    this.getloginStatus();
    // 推荐弹窗
    this.getDemandDemandteacher();
  },
  onUnload() {
    // uni.$TUIKit.off(uni.$TUIKitEvent.SDK_READY, this.onConversationListUpdated);
  },
  onShow() {
    uni.login({
      provider: "weixin",
      success: async (result) => {
        this.dataCode = result.code;
      },
      fail: (error) => {
        console.log("登录失败", error);
      },
    });
  },
  onHide() {
    this.musicClose();
    this.$store.commit("user/setDemandcate", this.demandProfile.cate);
	  console.log('页面手动滑出会走这里吗')
  },
  methods: {
    getloginStatus() {
      loginStatus().then((res) => {
        console.log("登录状态", res);
        if (res.data.phone == 0) {
          this.iphonestatus = false;
        } else {
          this.iphonestatus = true;
        }
      });
    },
    // 需求详情数据
    getDemandDetail() {
      demandDetail({ demand_id: this.demand_id }).then((res) => {
        this.demandProfile = res.data;
        this.teacher_count = res.data.demanddata;
        this.getDemandDetailteacher();
        this.getlsitData(this.listObj);
        if (res.status === 0) {
          this.recommendedShow = false;
        } else {
          this.recommendedShow = false;
        }
        this.invitationStatus = res.status;
      });
    },
    // 跳转配音师名片
    handleVisitorsJump(teacher_id) {
      if (teacher_id) {
        uni.navigateTo({
          url: "/subpkg/pages/teacherlist/teacherlist?id=" + teacher_id,
        });
      } else {
      }
    },
    //  待邀请的配音师
    getDemandDetailteacher() {
      demandDetailteacher({ demand_id: this.demand_id }).then((res) => {
        this.invitationCount = res.data.length;
        this.beConfirmedData = res.data;
      });
    },
    handleConfirmInviteshow() {
      this.confirmPopShow = true;
    },
    handleviewInviteshow() {
      this.current = 0;
      this.listObj.status = 0;
      this.getlsitData(this.listObj);
    },
    handleShowerweima(itemTitle) {
      if (itemTitle === "联系") {
        this.consultantTitle = "截图加我微信，找我咨询下单";
      } else {
        this.consultantTitle = "截图加我微信，获取更多试音";
      }
      this.consultantShow = true;
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
    //  找他下单
    handlePlaceOrder(item) {
      console.log("点击配音师的的id", item);
      this.teachrID = item.teacher_id;
      this.demandProfile.teacher_id = item.teacher_id;
      this.demandProfile.filename = item.title;
      this.demandProfile.content_url_escape = item.url;
      this.submitShow = true;
    },
    getsubmitShow() {
      this.submitShow = false;
    },
    // 确认邀请配音师提示
    handleConfirmInvite() {
      demandConfirm({ demand_id: this.demand_id }).then((res) => {
        this.confirmPopShow = false;
        demandFabulouslist({ demand_id: this.demand_id, status: 0 }).then(
          (res) => {
            res.data.map((item) => {
              const to = "teacher_" + item.teacher_id;
              let tagstr = "";
              this.demandProfile.tags.map((item, index) => {
                if (index === 2) {
                  tagstr += item.value;
                } else {
                  tagstr += item.value + "-";
                }
              });
              const message = uni.$TUIKit.createCustomMessage({
                to,
                conversationType: "C2C",
                payload: {
                  data: "demand",
                  description: this.demandProfile.audition_text,
                  // 获取骰子点数
                  extension: JSON.stringify({
                    audition_text: this.demandProfile.audition_text,
                    content: this.demandProfile.content,
                    tags: tagstr,
                    demand_id: this.demand_id,
                  }),
                },
              });
              console.log("配音师需求发送消息", message);
              this.$sendTIMMessage(message);
            });
          }
        );
        this.getDemandDetail();
      });
    },
    //  没有待邀请的配音师提示
    handleDidnInvite() {
      uni.showToast({
        title: "您还没有邀请的配音师哦",
        icon: "none",
        duration: 2000,
      });
    },
    // 操作事件
    handleOperation(item) {
      this.operationItem = item;
      this.collectShow = true;
      console.log("点击操作打印数据", item, this.operationItem);
    },
    //  取消操作事件
    hanldeCancelcoll() {
      this.collectShow = false;
    },
    // 收藏
    handleCollectStatus() {
      var coData = {
        work_id: this.operationItem.id,
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
    // 智能推荐弹窗
    getDemandDemandteacher() {
      demandDemandteacher(this.recommended).then((res) => {
        console.log("智能推荐弹窗", res);
        if (res.teacher_count == 0) {
          this.totalNum = 0;
          this.recommendedData = res.data;
        } else {
          this.totalNum = Math.ceil(res.teacher_count / 3);
          this.recommendedData = res.data;
        }
      });
    },
    // 收藏和取消收藏配音师
    demandFabulousadd(item, index) {
      if (index === 0) {
        demandFabulousadd({
          demand_id: this.demand_id,
          service_id: item.id,
        }).then((res) => {
          uni.showToast({
            title: "已为您添加到【收藏的样音】里，\r\n可在需求详情页查看",
            icon: "none",
            duration: 2000,
          });
          this.recommendedData.map((recitem) => {
            if (item.teacher_id === recitem.teacher_id) {
              recitem.fabulous_status = 1;
            }
          });
        });
      } else {
        demandFabulousdel({
          demand_id: this.demand_id,
          service_id: item.id,
        }).then((res) => {
          uni.showToast({
            title: "取消收藏成功",
            icon: "none",
            duration: 2000,
          });
          this.recommendedData.map((recitem) => {
            if (item.teacher_id === recitem.teacher_id) {
              recitem.fabulous_status = 0;
            }
          });
          this.getlsitData(this.listObj);
        });
      }
    },
    //  换一批
    handleInbatch() {
      // 换一批
      if (this.recommended.page >= Math.ceil(this.totalNum)) {
        this.recommended.page = 1;
      } else {
        this.recommended.page += 1;
      }
      this.getDemandDemandteacher();
    },
    //  去确认
    invitationConfirm() {
      this.recommendedShow = false;
      this.getlsitData(this.listObj);
    },
    //  去邀请
    handleInvite() {
      if (this.invitationStatus) {
        this.recommendedShow = false;
      } else {
        uni.showToast({
          title: "你已确认邀请",
          icon: "none",
          duration: 2000,
        });
      }
    },
    // 邀请试音
    handleInvitedAudition(item) {
      if (this.invitationStatus) {
        demandAdd({ service_id: item.id, demand_id: this.demand_id })
          .then((res) => {
            uni.showToast({
              title: "谢谢邀请，确认后我会在10分钟内，\r\n快速出试音并上传哦",
              icon: "none",
              duration: 2000,
            });
            this.getDemandDemandteacher();
            this.getDemandDetailteacher();
          })
          .catch((err) => {
            uni.showToast({
              title: "每个需求最多可邀请3位试音哦\r\n快点击上方【去确认】吧",
              icon: "none",
              duration: 2000,
            });
          });
      } else {
        uni.showToast({
          title: "你已确认邀请",
          icon: "none",
          duration: 2000,
        });
      }
    },
    // 删除邀请配音师
    handleDemandDel(item) {
      demandDel({ service_id: item.id, demand_id: this.demand_id })
        .then((res) => {
          this.getDemandDemandteacher();
          this.getDemandDetailteacher();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleanorPack() {
      this.anShow = !this.anShow;
    },
    //  分享试音
    handleShareAudition() {
      uni.navigateTo({
        url:
          "/subpkg/pages/cloudshare/cloudshare?current=1&demand_id=" +
          this.demand_id,
      });
    },
    //  获取列表数据
    getlsitData(obj) {
      demandFabulouslist(obj).then((res) => {
        console.log("获取列表数据", res);
        this.current = obj.status;
        this.countSta = res.count;
        console.log("获取列表数据", this.countSta, obj.count);
        this.listData = res.data;
      });
    },
    change(index) {
      this.listObj.status = index;
      this.getlsitData(this.listObj);
    },
    handlecloseerPopShow() {
      this.InvitedPopShow = false;
      this.confirmPopShow = false;
      this.consultantShow = false;
      this.enddemandShow = false;
    },
    handlechangehome(item) {
      this.InvitedPopShow = true;
      this.order_item = item;
    },
    // 结束需求弹窗
    handleEndDemand() {
      this.enddemandShow = true;
    },
    handleenddomanreq() {
      demandEnd({ demand_id: this.demand_id })
        .then((res) => {
          // 需求状态
          this.demandProfile.status = 1;
          // 结束订单弹窗
          this.enddemandShow = false;
        })
        .catch((err) => {});
    },
    // 发送成品消息
    handlefinishedMsg() {
      orderConfirm({ order_id: this.order_item.order_id }).then((res) => {
        console.log(res);
        this.InvitedPopShow = false;
        this.finishedPayment(this.order_item);
        this.getDemandDetail();
      });
    },
    // 确认成品发送消息
    finishedPayment(item) {
      const id = "C2Cteacher_" + item.teacher_id;
      const to = "teacher_" + item.teacher_id;
      const message = uni.$TUIKit.createCustomMessage({
        to,
        conversationType: "C2C",
        payload: {
          data: "finished",
          description: item.works[0].title,
          extension: JSON.stringify({
            title: item.works[0].title,
            timelength: item.works[0].duration,
            demand_id: this.demand_id,
            url: item.works[0].url,
            state: 1,
            msg: item.works[0],
          }),
        },
      });
      this.$sendTIMMessage(message);
    },
    // 价格筛选
    handlePriceScreening(index) {
      this.activeIndex = index;
      this.recommended.page = 1;
      this.recommended.type = index + 1;
      this.getDemandDemandteacher();
    },
    //  订单支付
    hanldeOrderPay(item) {
      orderPay({ order_id: item.order_id }).then((res) => {
        console.log("支付返回参数", res);
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
            _that.getlsitData(_that.listObj);
            _that.orderPayment(item);
          },
          fail: function (err) {
            console.log("fail:" + JSON.stringify(err));
            _that.getlsitData(_that.listObj);
          },
        });
      });
    },
    //  IM催一催
    handleRoute(ids) {
      const id = "C2Cteacher_" + ids;
      console.log(ids, id);
      const url = `/subpkg/pages/chatpage/chatpage?conversationID=${id}`;
      uni.redirectTo({
        url,
      });
    },
    // 对话列表更新
    onConversationListUpdated(event) {
      this.setData({
        conversationList: event.data,
      });
    },
    // IM找TA下单
    handleTaOrder(ids) {
      const id = "C2Cteacher_" + ids;
      const url = `/subpkg/pages/chatpage/chatpage?conversationID=${id}`;
      uni.redirectTo({
        url,
      });
    },
    // 支付订单发起会话
    orderPayment(item) {
      const id = "C2Cteacher_" + item.teacher_id;
      const to = "teacher_" + item.teacher_id;
      const message = uni.$TUIKit.createCustomMessage({
        to,
        conversationType: "C2C",
        payload: {
          data: "order",
          description: this.demandProfile.audition_text,
          // 获取骰子点数
          extension: JSON.stringify({
            title: this.demandProfile.audition_text,
            price: item.pay_price,
            delivery: item.delivery_timeout_time,
            demand_id: this.demand_id,
            pay_state: 1,
          }),
        },
      });
      this.$sendTIMMessage(message);
      // const url = `/subpkg/pages/chatpage/chatpage?conversationID=${id}`;
      // 	uni.navigateTo({
      // 		url
      // 	});
    },
    $sendTIMMessage(message) {
      this.$emit("sendMessage", {
        detail: {
          message,
        },
      });
      uni.$TUIKit.sendMessage(message);
      this.setData({
        displayFlag: "",
      });
    },
    // 音乐播放按钮
    playTheMusic(orderItem) {
      console.log("传过来的数据", orderItem, this.recommendedData);
      this.audioShow = true;
      if (this.dataPlay.url === orderItem.url) {
        this.recommendedData.map((item) => {
          if (this.dataPlay === item) {
            orderItem.playStatus = !orderItem.playStatus;
          } else {
            item.playStatus = false;
          }
        });
        this.beConfirmedData.map((item) => {
          if (this.dataPlay === item) {
            orderItem.playStatus = !orderItem.playStatus;
          } else {
            item.playStatus = false;
          }
        });
        this.listData.map((item) => {
          if (this.dataPlay === item) {
            orderItem.playStatus = !orderItem.playStatus;
          } else {
            item.playStatus = false;
          }
        });
      } else {
        this.recommendedData.map((item) => {
          item.playStatus = false;
        });
        this.beConfirmedData.map((item) => {
          item.playStatus = false;
        });
        this.listData.map((item) => {
          item.playStatus = false;
        });

        orderItem.playStatus = true;
        this.dataPlay = orderItem;
      }
      setTimeout(() => {
        this.$refs.musicAudio.preStartPlay();
      }, 0);
    },
    handleChangePlay(status) {
      console.log("走这里没有", status);
      this.recommendedData.map((item) => {
        if (this.dataPlay === item) {
          item.playStatus = status;
        } else {
          item.playStatus = false;
        }
      });
      this.beConfirmedData.map((item) => {
        if (this.dataPlay === item) {
          item.playStatus = status;
        } else {
          item.playStatus = false;
        }
      });
      this.listData.map((item) => {
        if (this.dataPlay === item) {
          item.playStatus = status;
        } else {
          item.playStatus = false;
        }
      });
    },
    musicClose() {
      this.recommendedData.map((item) => {
        item.playStatus = false;
      });
      this.beConfirmedData.map((item) => {
        item.playStatus = false;
      });
      this.listData.map((item) => {
        item.playStatus = false;
      });
      this.audioShow = false;
      this.dataPlay = {
        url: "",
      };
    },
    onGetPhoneNumber(e) {
      console.log("微信小程序id", e, this.phonebb, this.phoneNumber);
      if (!e.detail.cloudID) {
        //用户决绝授权
        uni.showToast({
          title: "请先授权手机号\r\n，否则无法试音哦",
          icon: "none",
          mask: true,
          duration: 2000,
        });
      } else {
        //允许授权
        var data = {
          iv: e.detail.iv,
          code: this.dataCode,
          encryptedData: e.detail.encryptedData,
        };
        getphone(data)
          .then((res) => {
            console.log("手机号请求数据", res.data);
            const userobj = {
              nickname: "",
              userId: "",
              avatar: "",
              phone: res.data,
            };
            profileUpdate(userobj).then((res) => {
              this.getloginStatus();
            });
            this.confirmPopShow = true;
          })
          .catch((err) => {
            console.log("手机号请求数据", err);
          });
        // var  sessionkeys = uni.getStorageSync('sessionkey');
        // console.log('手机号请求数据', sessionkeys)
        // let pc = new WXBizDataCrypt('wx61103192dd39156f',sessionkey);      //wxXXXXXXX为你的小程序APPID
        // let data = pc.decryptData(e.detail.encryptedData , e.detail.iv);
        // console.log('手机号请求数据', e)
        // uni.setStorage({
        // 	key: 'phoneNum',
        // 	data: data.phoneNumber,
        // });
      }
    },
    handleGoBack() {
      console.log("返回上一页", this.demandProfile.cate);
      this.$store.commit("user/setDemandcate", this.demandProfile.cate);
      uni.switchTab({
        url: "/pages/demand/demand",
      });
    },
    downloadcopy(groupNum, title) {
      console.log('下载传过来的url',groupNum)
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
    // 企业微信联系我回调函数
    startmessage() {},
    completemessage(e) {
      console.log("联系我回调", e);
    },
  },
};
</script>
<style lang="scss">
.lianxikefu {
  position: fixed;
  bottom: 225rpx;
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
.cellTa {
  position: relative;
  .cell {
    position: absolute;
    left: 0;
    height: 79.71rpx;
    width: 206.522rpx;
    background: RGBA(245, 44, 90, 0);
    border-radius: 32px 0px 0px 32px;
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
      width: 18px;
      height: 16px;
    }
  }
}
.invitationBtn {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  border-radius: 57.971rpx 0px 0px 57.971rpx;
  border: none;
  background: rgba(0, 0, 0, 0);
  padding: 0 !important;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
}
.invitationBtn::after {
  border: none !important;
}
</style>
<style lang="scss">
page {
  height: 100%;
  // overflow: hidden;
  background: #f2f2f2;
}
.container {
  position: relative;
  height: 100%;
  overflow-y: auto;
  .home_musicSrc_box {
    position: fixed;
    z-index: 999999;
    bottom: 120rpx;
  }
}
.content {
  .head_portrait_box {
    display: flex;
    align-items: center;
    padding-bottom: 16.304rpx;
    .head_portrait_img {
      width: 39.855rpx;
      height: 39.855rpx;
      border-radius: 19.928rpx;
    }
    .nick_name {
      margin-left: 14.493rpx;
      max-width: 50%;
      font-size: 21.739rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #666666;
    }
    .deta_title {
      margin-left: 10.493rpx;
      font-size: 21.739rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #666666;
    }
  }
  .demand_profile {
    padding: 39.855rpx 0rpx 36.232rpx 36.232rpx;
    margin-top: 34.42rpx;
    margin-left: 27.174rpx;
    width: 695.652rpx;
    min-height: 344.203rpx;
    background: #ffffff;
    border-radius: 25.362rpx;
    .placeholder_line {
      position: relative;
      margin-top: 28.362rpx;
      margin-left: -36.232rpx;
      width: 695.652rpx;
      height: 1.812rpx;
      background: #f6f7fa;
    }
    .item_label {
      width: 100%;
      display: flex;
      margin-top: 12.116rpx;
      .label {
        display: flex;
        align-items: center;
        height: 28px;
        width: 76.087rpx;
        font-size: 25.362rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
      }
      .label_text {
        width: 76.087rpx;
        font-size: 25.362rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
      }
      .label_value {
        position: relative;
        display: flex;
        width: 100%;
        align-items: center;
        .profile_tag {
          display: flex;
          align-items: center;
          font-size: 25.362rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #000000;
        }
        .tag_line {
          margin: 0 22.116rpx;
          height: 18.116rpx;
          width: 1.812rpx;
          background: #000000;
        }
        .profile_tags {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 22.116rpx;
          height: 50.725rpx;
          margin-right: 14.493rpx;
          background: #f2f2f2;
          border-radius: 25.362rpx;
          font-size: 25.362rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #000000;
        }
        .label_value_text {
          display: inline-block;
          overflow: hidden;
          width: 465.58rpx;
          height: 35.855rpx;
          font-size: 25.362rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #000000;
        }
        .label_value_text_active {
          display: inline-block;
          overflow: hidden;
          width: 465.58rpx;
          // height: 22px;
          font-size: 25.362rpx;
          line-height: 36.232rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #000000;
        }
        .label_anbox {
          position: absolute;
          right: 0rpx;
          width: 40rpx;
          height: 100%;
          .label_an {
            width: 18.116rpx;
            height: 18.116rpx;
          }
        }
        .download_voices {
          display: flex;
          align-items: center;
          width: 50%;
          .download_icon {
            width: 36.232rpx;
            height: 36.232rpx;
          }
          .download_text {
            margin-left: 5rpx;
            height: 36.232rpx;
            font-size: 25.362rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #000000;
            line-height: 36.232rpx;
          }
        }
      }
    }
    .last_item_label {
      margin-bottom: 0;
    }
  }
  .invitation_vico {
    margin-left: 27.174rpx;
    margin-top: 18.116rpx;
    width: 695.652rpx;
    height: 615.942rpx;
    background: #ffffff;
    border-radius: 25.362rpx;
    .home_title_slogan_box {
      padding-top: 36.232rpx;
      text-align: center;
      .slogan_icon {
        width: 32.609rpx;
        height: 18.116rpx;
      }
      .title_slogan {
        margin: 0 21.739rpx;
        width: 293.478rpx;
        height: 45.29rpx;
        font-size: 32.609rpx;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #000000;
        line-height: 45.29rpx;
      }
      .red_num {
        font-size: 32.609rpx;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ff445a;
      }
    }
    .invitation_card {
      display: flex;
      justify-content: space-between;
      padding: 36.232rpx 36.232rpx 0 36.232rpx;
      .item_card {
        position: relative;
        text-align: center;
        width: 195.652rpx;
        height: 257.246rpx;
        background: #f1f3f7;
        border-radius: 14.493rpx;
        .card_head_portrait {
          margin-left: 36.232rpx;
          margin-top: 21.739rpx;
          width: 123.188rpx;
          height: 123.188rpx;
          position: relative;
          .card_head_img {
            width: 123.188rpx;
            height: 123.188rpx;
            border-radius: 61.594rpx;
          }
          .playActive {
            position: absolute;
            left: 38.043rpx;
            width: 47.101rpx;
            height: 47.101rpx;
            bottom: -15rpx;
          }
        }
        .invitation_btn {
          margin-top: 23.551rpx;
          font-size: 25.362rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #ff445a;
        }
        .nick_name {
          width: 90%;
          margin-left: 5%;
          margin-top: 15.058rpx;
          text-align: center;
          height: 36.232rpx;
          font-size: 25.362rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #000000;
          line-height: 36.232rpx;
        }
        .price_num {
          width: 90%;
          margin-left: 5%;
          margin-top: 2.058rpx;
          text-align: center;
          height: 30.797rpx;
          font-size: 21.739rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
          line-height: 30.797rpx;
        }
        .carddelet_box {
          position: absolute;
          right: 0;
          top: -13rpx;
          text-align: right;
          width: 46.232rpx;
          height: 46.232rpx;
          .carddelet {
            width: 25.362rpx;
            height: 25.362rpx;
          }
        }
      }
    }
    .confirminvitation {
      margin-top: 43.478rpx;
      margin-left: 36.232rpx;
      text-align: center;
      width: 623.188rpx;
      height: 90.58rpx;
      line-height: 90.58rpx;
      background: #ff445a;
      border-radius: 45.29rpx;
      font-size: 32.609rpx;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
    }
    .confirminvitation_grey {
      margin-top: 43.478rpx;
      margin-left: 36.232rpx;
      text-align: center;
      width: 623.188rpx;
      height: 90.58rpx;
      line-height: 90.58rpx;
      background: #f3f4f9;
      border-radius: 45.29rpx;
      font-size: 32.609rpx;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #999999;
    }
    .invitation_process {
      margin-top: 34.42rpx;
      text-align: center;
      height: 17px;
      font-size: 21.739rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #666666;
      line-height: 17px;
    }
  }
  .sampleVoices {
    margin-top: 36.232rpx;
    .itemList_scroll {
      margin-top: 9.058rpx;
      .paiditem {
        background: none;
      }
      .temporarily_box {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 27.174rpx;
        width: 695.652rpx;
        height: 480.072rpx;
        background: #ffffff;
        border-radius: 25.362rpx;
        .temporarily_icon {
          width: 403.986rpx;
          height: 331.522rpx;
        }
        .temporarily_text {
          position: absolute;
          width: 100%;
          top: 342.319rpx;
          text-align: center;
        }
      }
    }
  }
}
.divider {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 34.42rpx;
  .line {
    width: 56.159rpx;
    height: 1.812rpx;
    background: #bababa;
  }
  .text {
    margin-left: 23.551rpx;
    margin-right: 23.551rpx;
    text-align: center;
    height: 39.855rpx;
    font-size: 28.986rpx;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #000000;
    line-height: 39.855rpx;
  }
}
.itemList_boxnew {
  margin-left: 27.174rpx;
  width: 695.652rpx;
  // min-height: 480.072rpx;
  border-radius: 25.362rpx;
  .item_list {
    margin-top: 21.739rpx;
    background-color: #ffffff;
    padding-top: 25.362rpx;
    padding-bottom: 25.362rpx;
    border-radius: 25.362rpx;
    // padding-bottom: 36.232rpx;
    .list_top {
      padding: 0 25.362rpx;
      display: flex;
      .avatar_bxo {
        width: 39.855rpx;
        height: 39.855rpx;
        .avatar_img {
          width: 39.855rpx;
          height: 39.855rpx;
          border-radius: 19.928rpx;
        }
      }
      .default_nickname {
        display: flex;
        align-items: center;
      }
      .nickname_box {
        padding-left: 18.116rpx;
        width: 440.681rpx;
        .nicknamen {
          display: flex;
          align-items: center;
          width: 440.319rpx;
          height: 100%;
          font-size: 21.739rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #666666;
          .sex_img {
            margin-left: 7rpx;
            width: 25.362rpx;
            height: 25.362rpx;
          }
        }
        .price_box {
          margin-top: 5.435rpx;
          height: 30.797rpx;
          font-size: 21.739rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
          line-height: 30.797rpx;
          .price_text {
            color: #ff445a;
          }
        }
      }
      .demandQuotation {
        display: flex;
        align-items: center;
      }
      .red_offer_box {
        display: flex;
        width: 217.319rpx;
        .red_offer {
          display: flex;
          font-size: 28.986rpx;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #fe445a;
        }
      }
      .invitation_box {
        display: flex;
        width: 50%;
        justify-content: flex-end;
        .invitation_btn {
          display: flex;
          align-items: center;
          height: 65.217rpx;
          justify-content: center;
          width: 159.42rpx;
          border: 1px solid #ff445a;
          border-radius: 32.609rpx;
          font-size: 25.362rpx;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #ff445a;
        }
        .confirmed_btn {
          display: flex;
          align-items: center;
          height: 65.217rpx;
          justify-content: center;
          width: 159.42rpx;
          background: #f3f4f9;
          border-radius: 32.609rpx;
          font-size: 25.362rpx;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #000000;
        }
        .successful_btn {
          display: flex;
          align-items: center;
          height: 65.217rpx;
          justify-content: center;
          width: 159.42rpx;
          background: #f3f4f9;
          border-radius: 32.609rpx;
          font-size: 25.362rpx;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #999999;
        }
        .apush_btn {
          display: flex;
          align-items: center;
          height: 65.217rpx;
          justify-content: center;
          width: 159.42rpx;
          border: 1px solid #ff445a;
          border-radius: 32.609rpx;
          font-size: 25.362rpx;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #ff445a;
        }
      }
    }
    .list_bottom {
      margin: 25.362rpx 25.362rpx 0 25.362rpx;
      // width: 623.188rpx;
      height: 90.58rpx;
      background: #f1f3f7;
      display: flex;
      align-items: center;
      border-radius: 10.87rpx;
      .play_list {
        display: flex;
        align-items: center;
        .play_box {
          width: 86.957rpx;
          display: flex;
          justify-content: center;
          align-items: center;
          .play {
            width: 40.101rpx;
            height: 40.101rpx;
          }
        }
      }
	  .nameWorks {
		width: 450.145rpx;
        font-size: 25.362rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #000000; 
	  }
      .nameWork {
        width: 400.145rpx;
        font-size: 25.362rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #000000;
      }
      .collection_box {
        display: flex;
        width: 50%;
        justify-content: flex-end;
        margin-right: 27.174rpx;
        align-items: center;
        .collection {
          width: 39.855rpx;
          height: 39.855rpx;
        }
        .download {
          width: 32.609rpx;
          height: 28.986rpx;
        }
      }
    }
  }
  .item_share_box {
    margin-top: 9.058rpx;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    .item_share_btn {
      width: 326.087rpx;
      height: 90.58rpx;
      background: #ff445a;
      border-radius: 45.29rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      .share_icon {
        width: 34.42rpx;
        height: 34.42rpx;
      }
      .share_text {
        margin-left: 18.116rpx;
        font-size: 32.609rpx;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
      }
    }
    .tips_share {
      margin: 25.362rpx 0;
      width: 177.536rpx;
      height: 36.232rpx;
      font-size: 25.362rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 36.232rpx;
    }
  }
  .btn_item {
    display: flex;
    align-items: center;
    .voice_btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 108.696rpx;
      height: 50.725rpx;
      border-radius: 25.362rpx;
      border: 1.812rpx solid #ff4f64;
      font-size: 21.739rpx;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ff445a;
    }
    .voice_img_box {
      width: 60.232rpx;
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
}
.auditionTips {
  margin-top: 36.232rpx;
  width: 100%;
  text-align: center;
  font-size: 25.362rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
}
.release_btnbox {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 41.739rpx;
  .release_btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 579.71rpx;
    height: 90.58rpx;
    background: #ff445a;
    border-radius: 50.725rpx;
    font-size: 32.609rpx;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
  }
  .hasended_btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 579.71rpx;
    height: 90.58rpx;
    background: #d2d2d2;
    border-radius: 50.725rpx;
    font-size: 32.609rpx;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
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
</style>
