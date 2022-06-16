<template>
  <view class="container">
    <u-navbar
			:is-back="true"
			:title="dataList.nickname ? dataList.nickname + '的主页': '主页' "
			title-size="36.232rpx"
			title-color="#FFFFFF"
			:border-bottom="false"
			:background="background"
			back-icon-color="#FFFFFF"
      :custom-back="handleGoBack"
		></u-navbar>
    <!-- :custom-back="handleGoBack" -->
    <view class="container_box">
	 <view class="pys_popup" v-if="sharePopShow">
        <view class="popup_conent">
          <image
            class="closeicon"
            src="@/static/home/close.png"
            mode="scaleToFill"
            @click="handleCanceShare"
          />
          <view>
            <view style="height: 17.971rpx"></view>
            <view class="check_WeChat_test"> 申请加入 </view>
            <view class="check_WeChat_tips">分享小程序后，即可查看配音师微信</view>
            <view class="share_btn_box">
              <button
                class="cancelSharebtn"
                hover-class="button-hover"
                open-type="share"
              >
                分享好友
              </button>
              <button
                class="sharebtn"
                open-type="share"
                hover-class="button-hover"
              >
                分享到群
              </button>
            </view>
          </view>
        </view>
   </view>
   <view class="pys_popup" v-if="erweimaShow">
		<view class="popup_conent">
			<image
				class="closeicon"
				src="@/static/home/close.png"
				mode="scaleToFill"
				@click="handleCanceShare"
			/>
			<view class="erweimabox">
			<view class="erweima_iconbox">
				<image
				class="erweima_icon"
				src="https://www.peiyinstreet.com/guidang/peiyinguwen.png"
				mode="scaleToFill"
				/>
			</view>	
			<view class="erweima_box">
			  截图加我微信，极速帮您试音
			</view>
			</view>
		</view>
	 </view>	
    <view class="banner">
      <!-- <view class="intro">
        <view class="goBack" @click="handleGoBack">
          <u-icon v-if="shareSow" name="arrow-left"></u-icon>
           <view class="homeye">
              <image
                class="homeye_img"
                src="@/static/home/home_icon.png"
                mode="scaleToFill"
              />
          </view>
        </view>
        <view class="greet u-line-1">{{ dataList.nickname || "" }}的名片</view>
      </view> -->
      <!-- <image
        class="banner_bcimg"
        src="@/static/home/homebc.png"
        mode="scaleToFill"
      /> -->
    </view>
    <view class="content">
      <view class="business_card">
        <view class="head_portrait">
          <view class="head_portraitimg_box">
            <image
              class="head_portraitimg"
              :src="dataList.avatar"
              mode="scaleToFill"
            />
            <image
              v-if="dataList.sex === 1"
              class="sex_icon"
              src="@/static/teacherlist/manicon.png"
              mode="scaleToFill"
            />
            <image
              v-else-if="dataList.sex === 2"
              class="sex_icon"
              src="@/static/teacherlist/woman.png"
              mode="scaleToFill"
            />
            <image
              v-else
              class="sex_icon"
              src="@/static/teacherlist/qi.png"
              mode="scaleToFill"
            />
          </view>
        </view>
        <view class="nick_namebox">
          <view class="nick_name u-line-1">
            {{dataList.nickname || ''}}
          </view>
          <view
                class="focus"
                v-if="dataList.follow === 0"
                @click="handleFocus(dataList.id, 0)"
              >
                <text>关注</text>
            </view>
            <view
                v-if="dataList.follow === 1"
                class="beenFocused"
                @click="handleFocus(dataList.id, 1)"
                >已关注
            </view>
        </view>
        <view class="personalFile">
          <view class="personal_list">
            <view class="personal_title">擅长</view>
            <view class="personal_content">
              <view v-for="(item, index) in dataList.theme" :key="index">
                <text v-if="item.type_id==2">{{ item.value }}</text>
                <view
                  v-if="dataList.theme.length - 1 !== index"
                  class="divider_line"
                ></view>
              </view>
            </view>
          </view>
          <view class="personal_list">
            <view class="personal_title">风格</view>
            <view class="personal_content">
              <view v-for="(item, index) in dataList.style" :key="index">
                <text>{{ item.value }}</text>
                <view
                  v-if="dataList.style.length - 1 !== index"
                  class="divider_line"
                ></view>
              </view>
            </view>
          </view>
          <view class="personal_list">
            <view class="personal_title">地区</view>
            <view class="personal_content">
              <text>{{ dataList.district || "" }}</text>
              <!-- <view class="divider_line"></view>
              <text>{{ dataList.district[1].name || "" }}</text> -->
            </view>
          </view>
          <!-- <view class="personal_list">
            <view class="personal_title">微信</view>
            <view class="personal_content focusBox">
              <text v-if="false">{{ dataList.wechat_number || "" }}</text>
              <view
                class="WeChat"
                v-if="dataList.share === 0"
                @click="handleInviteDubbing"
                >查看微信</view
              >
              <view
                class="WeChat"
                v-if="dataList.share === 1"
                @click="
                  downloadcopy(
                    dataList.wxnumber,
                    '复制成功，添加时备注：名片'
                  )
                "
                >复制微信</view
              >
              <view
                class="focus"
                v-if="dataList.follow === 0"
                @click="handleFocus(dataList.id, 0)"
              >
                <image
                  class="focusaixin"
                  src="@/static/carddetails/baiseaixin.png"
                  mode="scaleToFill"
                />
                <text>关注</text>
              </view>
              <view
                v-if="dataList.follow === 1"
                class="beenFocused"
                @click="handleFocus(dataList.id, 1)"
                >已关注</view
              >
            </view>
          </view> -->
        </view>
      </view>
      <view class="business_data">
        <view class="business_data_title">
          <view class="title_data">简介信息</view>
        </view>
        <view class="data_content_introduction">
          <view class="introduction_text">
            <view
              class="introduction_text_an"
              :class="moreShow ? 'u-line-1' : ''"
              >{{ dataList.intro }}</view
            >
            <view class="handlean_box" @click="handleTakeBack">
              <image
                class="handlean"
                src="@/static/carddetails/an.png"
                mode="scaleToFill"
              />
            </view>
          </view>
          <view class="tages_list_box">
            <view
              class="tages_list"
              v-for="(item, index) in itemList"
              :key="index"
              @click="handleClick(index, item)"
            >
              <view class="animate-wrap" v-if="giveIndex === index">
                <view
                  class="aa"
                  :class="{ bb: item.index }"
                  v-for="(item, index) in viewList"
                  :key="index"
                >
                  <image
                    style="width: 30upx; height: 30upx"
                    mode="widthFix"
                    :src="item.src"
                    :animation="item.animationData"
                  ></image>
                </view>
              </view>
              <image
                class="tages_list_img"
                src="@/static/home/dianzhanActive.png"
                mode="scaleToFill"
              />
              <text class="tages_list_conten">{{ item.name }}</text>
              <text class="tages_list_num">{{ item.count }}</text>
            </view>
          </view>
        </view>
      </view>
      <view class="business_data">
        <view class="business_data_title">
          <view class="title_data">我的服务<text  v-if="dataList.price_text == 1"  class="price_text">（限时价优惠中）</text></view>
        </view>
        <view class="data_content">
          <view class="list_worksbox" v-if="!addbtnShow">
            <view class="u-tabs-box">
              <my-tabs
                activeColor="#000000"
                bold
                ref="tabs"
                bg-color="#FFFFFF"
                inactive-color="#999999"
                :bar-style="barStyle"
                name="title"
                :is-scroll="true"
                :list="tabsItem"
                :current="current"
                @change="change"
                font-size="28.362"
              >
              </my-tabs>
            </view>
            <scroll-view
              scroll-y
              style="height: 100%; width: 100%"
              :refresher-triggered="triggered"
            >
              <view class="works_item_list_box" v-if="defaultshow">
                <view
                  class="works_item_list"
                  v-for="(item, index) in tabsList[current].works"
                  :key="index"
                >
                  <view class="list_item_paly" @click="playTheMusic(item)">
                    <image
                      class="paly_icon"
                      :src="item.playStatus ? playActive : play"
                      mode="scaleToFill"
                    />
                    <text class="works_title u-line-1">{{ item.title }}</text>
                  </view>
                  <!-- <view
                    class="use_box "
                    @click="handleUseOrder(item)"
                  >
                    <view class="use_btn">配音</view>
                  </view> -->
                  <view class="btn_item">
                    <!-- <view class="voice_btn" v-if="order_status==0" @click="handlefirstTimeUseOrder(item)">下单</view> -->
						        <!-- <view class="voice_btn" @click="handleUseOrder(item)">下单</view> -->
                    <view class="voice_btn" @click="downloadcopySampleVoices(item,'复制样音信息成功')">复制</view> 
                    <view class="voice_img_box" @click="handleOperation(item)">
                      <image
                        class="voice_img"
                        src="@/static/my/caozuo.png"
                        mode="scaleToFill"
                      />
                    </view>
                  </view>
                </view>
              </view>
              <view v-if="!defaultshow" class="page-box">
                <view class="defaltPage">
                  <!-- <image
								class="defaltPageimg"
								src="@/static/ui/defaultPage/d1.png"
								mode="scaleToFill"
							/> -->
                  <view class="defaltext">暂无匹配数据</view>
                </view>
              </view>
            </scroll-view>
          </view>
          <view v-if="addbtnShow" class="emptydata">
            <image
              class="emptydataimg"
              src="@/static/carddetails/emptydata.png"
              mode="scaleToFill"
            />
            <view class="emptydatatext">暂无数据</view>
          </view>
        </view>
      </view>
      <view class="business_data" v-if="caseData.length !==0">
        <view class="business_data_title">
          <view class="title_data">成品案例</view>
        </view>
        <view class="data_content" style="padding:0px">
          <view class="list_worksbox" v-if="!addbtnShow">
            <scroll-view
              scroll-y
              style="height: 100%; width: 100%"
              :refresher-triggered="triggered"
            >
              <view class="video_item" :class="{'dd': caseData.length-1 ==index }" v-for="(item,index) in caseData" :key="index" @click="handlecaseDetails(item)">
                <view class="video_box">
                  <view class="video_label">{{item.tags[0].value}}</view>
                  <image
                    class="video_cover"
                    :src="item.head_img"
                    mode="scaleToFill"
                  />
                  <view class="video_palybox">
                    <view class="video_paly">
                      <image
                        class="video_icon"
                        src="@/static/anli/anliplay.png"
                        mode="scaleToFill"
                      />
                      <span class="play_Num">{{item.play_num}}</span>
                    </view>
                    <view class="broadcasttime">{{item.works[0].time}}</view>
                  </view>
                </view>
                <view class="video_desc">
                  <view class="video_title u-line-1">{{item.works[0].title}}</view>
                  <view class="video_style u-line-1">{{item.title}}</view>
                  <view class="video_by">
                    <span class="video_name">{{item.created_at}}</span>
                  </view>
                </view>
              </view>
              <view v-if="!defaultshow" class="page-box">
                <view class="defaltPage">
                  <!-- <image
								class="defaltPageimg"
								src="@/static/ui/defaultPage/d1.png"
								mode="scaleToFill"
							/> -->
                  <view class="defaltext">暂无匹配数据</view>
                </view>
              </view>
            </scroll-view>
          </view>
          <view v-if="addbtnShow" class="emptydata">
            <image
              class="emptydataimg"
              src="@/static/carddetails/emptydata.png"
              mode="scaleToFill"
            />
            <view class="emptydatatext">暂无数据</view>
          </view>
        </view>
      </view>
    </view>
    <view style="height: 90px"></view>
    <!-- <view class="footer_prompt">
      <view class="footer_dianzhan_icon">
        <view class="sharebtn" @click="handleruku">
          试音
        </view>
        <view class="laceOrder" @click="handlePlaceOrder">
          下单
        </view>
      </view>
    </view> -->
    <view v-if="audioShow" class="home_musicSrc_box disappear">
      <musicAudio
        ref="musicAudio"
        :url="dataPlay.url"
        :autoplay="true"
        :portrait="dataList.avatar"
        :music_title="dataPlay.title"
        @handleChangePlay="handleChangePlay"
        @musicClose="musicClose"
      ></musicAudio>
    </view>
    </view>
    <!-- <view class="share_box">
      <button class="invitationBtn sharebtn" open-type="share">
          <image
            class="shareicon"
            src="@/static/carddetails/shareicon.png"
            mode="scaleToFill"
          />
      </button>
    </view> -->
    <u-popup v-model="submitShow" mode="bottom" height="1084.348rpx"  border-radius="24">
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
       <view class="collect_item" @click="handleUseOrder(operationItem)">
			  <image
			      class="collection"
				  src="@/static/teacherlist/copyicon.png"
				  mode="scaleToFill"
			  />
			  <view class="collect_text">按样下单</view>
		  </view>
		  <view class="collect_item" @click="handleCollectStatus">
			  <image
			      class="collection"
				  :src="operationItem.work_type===0 ? shouchang : yishouchang"
				  mode="scaleToFill"
			  />
			  <view :class="operationItem.work_type===0 ? 'collect_text' : 'redcollect_text'">{{operationItem.work_type===0 ? '收藏' : '已收藏'}}</view>
		  </view>
		  <view class="collect_item" @click="downloadcopy(operationItem.url,'下载链接已复制，请粘贴到浏览器打开')">
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
				  :src="operationItem.share_type===0 ? shouchang : yishouchang"
				  mode="scaleToFill"
			  />
			  <view class="cloudsharebox">
				<view class="collect_text" @click="operationItem.share_type===0 ? handlejoincloudAdd(operationItem) :  handlejoincloud(operationItem)">{{operationItem.share_type===0 ? '加入云分享' : '移除云分享'}}</view>
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
    <dropball :bottomdistance="270" title="找我试音">
	  </dropball>
     <view v-if="orderPromptShow" class="masklayer">
		  <view class="coupons_box">
			<image
				class="shutdown_icon"
				src="@/static/coupons/shutdownC.png"
				mode="scaleToFill"
				@click="handlecloseCoupons"
			/>
			<image
				class="coupons_icon"
				src="@/static/img/orderpro.png"
				mode="scaleToFill"
			/>
			<view class="coupons_content">
				<view class="content_text">
					<view class="text">1、更快速：交付<text class="red_text">速度翻倍</text></view>
					<view class="text">2、更便捷：告别<text class="red_text">频繁沟通</text></view>
					<view class="text">3、更省钱：成本价上<text class="red_text">再9折</text></view>
					<view class="text">4、质量保障：<text class="red_text">所听即所得</text></view>
					<view class="text">5、售后无忧：<text class="red_text">一对一</text>修改补录</view>
				</view>
				<view class="know_btn" @click="handlejupumUseOrder">我知道了</view>
			</view>
		</view>
	  </view>	
  </view>
</template>

<script>

import { mapState, mapActions } from "vuex";
import uniCopy from "@/utils/uni-copy.js";
import musicAudio from "@/components/audio/audioplay.vue";
import myTabs from "@/components/my-tabs/my-tabs";
import {profileDetail,followFabulous} from "@/api/carddetails.js";
import { teacherdetail, shareAdd,shareDel } from "@/api/index.js";
import man from "@/static/teacherlist/manicon.png";
import female from "@/static/teacherlist/woman.png";
import qi from "@/static/teacherlist/woman.png";
import dianzhan from "@/static/home/dianzhanActive.png";
import { changeFocus } from "@/api/carddetails.js";
import shouchang from '@/static/img/shouchang.png'
import yishouchang from '@/static/img/yishouchang.png'
import { collection } from "@/api/voice.js"
import dropball from '@/components/dropball/dropball.vue'
// 埋点统计
import { buriedSomeStatistical } from '@/utils/encapsulation.js'
export default {
  components: {
    myTabs,
    musicAudio,
    dropball
  },
  data() {
    return {
      titleList: ["宣传片", "专题片", "有声小说"],
      viewList: [],
      pageDate: new Date(), //全局时间用于函数节流
      man: man,
      female: female,
      qi: qi,
      sharePopShow: false,
      checkeChat: true,
      moreShow: true,
      addbtnShow: false,
      currentIndex: 0,
      triggered: false,
      defaultshow: true,
      erweimaShow: false,
	    shareSow: true,
      giveIndex: null,
      play: 'https://www.peiyinstreet.com/guidang/play.png',
      playActive: "https://www.peiyinstreet.com/guidang/palyActive.png",
      woekslist: [],
      background: {
				backgroundColor: '#21283B',
			},
      woekslist1: [
        {
          name: "品牌广告",
          id: 1,
        },
        {
          name: "专题片",
          id: 2,
        },
        {
          name: "促销广告",
          id: 3,
        },
        {
          name: "纪录片",
          id: 4,
        },
        {
          name: "影视广告",
          id: 5,
        },
        {
          name: "影视广告",
          id: 6,
        },
      ],
      barStyle: {
        backgroundColor: "#000000",
      },
      dataList: [],
      tabsList: [],
	    tabsItem: [],
      audioList: [],
      caseData: [],
      current: 0,
      modifyShow: false,
      audioShow: false,
      dataPlay: {
        url: "",
      },
      itemList: [],
      // 发布框
      submitShow: false,
      dataObj: {
        teacher_id: '',
				service_id: '',
				status: 1,
				filename: '',
				content_url_escape: '',
				work_id: null,
        avatar: '',
			  nickname: '',
        offer_price: '',
        subjecttype: ''
      },
      btnText: '按作品效果下单',
      // 收藏的作品  
			collectShow: false,
      firstItem: {},
			orderPromptShow: false,
			// 操作item
			operationItem: {},
      shouchang:shouchang,
			yishouchang:yishouchang,
      avatarimageUrl: '',
      urlpath: '',
    };
  },
  onLoad(options) {
    this.cardId = options.id;
    this.dataObj.teacher_id = options.id;
    this.urlpath = options.url
    uni.showLoading({
        title: '加载中'
    });
    this.getUnionid();
  },
  onShow() {
    console.log('样音数据刷新', this.cardId,this.dataObj.teacher_id,this.urlpath)
	  this.shareSow = true
  },
  computed: {
    ...mapState("user", ["token", "userInfo","order_status"]),
  },
  onHide() {
    //   this.musicClose()
  },
  onShareAppMessage(res) {
    if (res.from === "button") {
      // 来自页面内分享按钮
      console.log(res.target);
    }
    return {
      // title: '这是'+this.dataList.nickname + "的声音主页，点击在线试听样音",
      title: '听一听这个配音师的声音，报价比市场价低一半',
      path: "/subpkg/pages/teacherlistbeifen/teacherlist?id="+this.cardId+"&&url=index",
      imageUrl: "",
      complete: function (res) {
        console.log("分享成功", res);
      },
    };
  },
  onShareTimeline(res) {
     console.log('走这里了吗')
			return {
				title: '听下这个配音师的声音，报价比市场价低一半',
        query: "id="+this.cardId+"&&url=index",
        imageUrl: this.avatarimageUrl,
				complete: function(res) {
					console.log('分享成功', res)
				},
			}
	},
  methods: {
    ...mapActions("user", ["login","getIphoneStatus"]),
    getUnionid() {
      uni.login({
        provider: "weixin",
        success: async (result) => {
          await this.login(result.code);
          await this.getIphoneStatus();
          this.woekslist = this.woekslist1;
          this.handleProfileDetail();
          // this.followFabuloulistData();
        },
        fail: (error) => {
          console.log("登录失败", error);
          this.woekslist = this.woekslist1;
          this.handleProfileDetail();
        },
      });
    },
    handleProfileDetail() {
      profileDetail({ id: this.cardId }).then((res) => {
        console.log("名片数据", res);
        this.dataList = res.data.data;
        this.avatarimageUrl = this.dataList.avatar
        const itemworks = res.data.list;
        this.caseData = res.data.case
        uni.hideLoading();
          this.itemList = res.data.row;
          itemworks.map((item) => {
            item.works.map((items) => {
              items.playStatus = false;
            });
          });
        console.log('传过来的值', itemworks)
        this.tabsItem = this.$u.deepClone(itemworks)
        var test = uni.getStorageSync('current')
        if(test !=='') {
          this.tabsItem.map((item,index) => {
            if(item.tags[0].value === test){
                this.current = index
            }
          })
          this.dataObj.service_id  = this.tabsItem[this.current].id
        }else {
          this.dataObj.service_id  = this.tabsItem[this.current].id
        }
        this.tabsList = itemworks
        if (this.tabsList.length === 0) {
          this.addbtnShow = true;
        } else {
          this.addbtnShow = false;
        }
      });
    },
    followFabuloulistData() {
      this.handleProfileDetail();
    },
    // 查看微信
    handleInviteDubbing(item) {
      this.sharePopShow = true;
    },
    handleCanceShare() {
      this.sharePopShow = false;
      this.erweimaShow = false
      uni.showShareMenu({
        title: "配音师资源",
      });
    },
    // 跳转案例详情页
    handlecaseDetails(item) {
      console.log('跳转到案例详情页面', item)  
      uni.navigateTo({ url: '/subpkg/pages/caseDetails/caseDetails?id='+item.id})
    },
    handleShowQrcode() {
      this.erweimaShow = true 
    },
    // handleGoBack() {
    //   this.$store.commit('user/setworkStatus', {}) 
    //   console.log('返回上一页传空值')
    //   uni.switchTab({ url: '/pages/soundlibrary/soundlibrary' })
    // },
     // 操作事件
		  handleOperation(item) {
			  this.operationItem = item
        console.log("点击操作打印数据---", item, this.operationItem);
        this.collectShow = true
		  },  
		  //  取消操作事件
		  hanldeCancelcoll() {
			  this.collectShow = false
		  },
		  // 收藏   
		  handleCollectStatus() {
        var coData = {
          work_id: this.operationItem.id,
          type:this.operationItem.work_type
        }  
              collection(coData).then((res)=>{
                console.log(res)
          if (this.operationItem.work_type ===1) {
            this.operationItem.work_type = 0
          } else {
            this.operationItem.work_type = 1
          }
        }).catch((err)=>{
        })
		  },
    // 查看更多
    handleTakeBack() {
      this.moreShow = !this.moreShow;
    },
    // 关注和已关注
    handleFocus(id, type) {
      changeFocus({ teacher_id: id, type: type }).then((res) => {
          console.log(res);
          if (type) {
            uni.showToast({
            title: '取消关注成功',
            icon: 'none',
            duration: 2000
          })
          } else {
            uni.showToast({
            title: '关注成功',
            icon: 'none',
            duration: 2000
          })
          }
          this.handleProfileDetail();
      });
      console.log("关注点击事件");
    },
    // 进入云分享页面  
		  handleCloudShare(item) {
             console.log('进入云分享',item)
			  uni.navigateTo({
				url:
				"/subpkg/pages/voicesshare/voicesshare"
			  });
			  this.collectShow = false
		   },
		   // 加入云分享
		   handlejoincloudAdd(item) {
			 console.log('加入云分享',item)
			 shareAdd({work_id: item.id}).then((res)=>{
				console.log()
				if (this.operationItem.share_type ===1) {
					this.operationItem.share_type = 0
					uni.showToast({
						title: '移除成功',
						icon: 'none'
				    })
				} else {
					this.operationItem.share_type = 1
				}
			 })
		   },
		    // 移除云分享
		   handlejoincloud(item) {
			 console.log('移除云分享',item)
			 let _this = this
			 shareDel({work_id: item.id}).then((res)=>{
				console.log()
				if (this.operationItem.share_type ===1) {
					this.operationItem.share_type = 0
					uni.showToast({
						title: '移除成功',
						icon: 'none'
				    })
				} else {
					this.operationItem.share_type = 1
				}
			 })
		   },
    // 下单
    // handlePlaceOrder() {
    //   this.dataObj.filename = ''
    //   this.dataObj.content_url_escape = ''
    //   this.submitShow = true
    //   this.btnText="填写需求，按样音录制"
    //   this.$nextTick(() => { 
    //     this.$refs.submitform.handlertextarea()
    //   });
    // },
    //  提示弹窗打开
		handlefirstTimeUseOrder(item) {
      this.firstItem = item
      this.orderPromptShow = true
      // 下单button
			buriedSomeStatistical(3)
			// 弹窗展示次数
			buriedSomeStatistical(4)
      },
    handlejupumUseOrder() {
         let item = this.firstItem
			   if(item.admin_price) {
            this.dataObj.service_id = item.service_id
            this.dataObj.teacher_id = item.teacher_id
            this.dataObj.filename = item.title
            this.dataObj.content_url_escape = item.url
            this.dataObj.work_id = item.id
            this.dataObj.avatar = this.dataList.avatar
            this.dataObj.nickname = this.dataList.nickname
            this.dataObj.offer_price = item.offer_price
            this.dataObj.subjecttype = this.tabsItem[this.current].tags[0].value
            console.log('跳转到',item,this.dataObj,this.tabsItem,this.current,this.tabsItem[this.current].tags[0].value)
            this.btnText="按作品效果下单"
            uni.setStorageSync('dataObj',this.dataObj)
            uni.navigateTo({ url: '/subpkg/pages/voicesrelease/voicesrelease' })
            // this.submitShow = true
            // this.btnText="按作品效果试音"
            // this.$nextTick(() => { 
            //   this.$refs.submitform.handlertextarea()
            // });
          } else {
            uni.showToast({
              title: '该服务暂不支持在线下单，请联系客服',
              icon: 'none'
            })
          }
        this.orderPromptShow = false
        // 点击我知道了在线下单
        buriedSomeStatistical(5)
      },
      // 提示弹窗关闭
    handlecloseCoupons() {
        this.orderPromptShow = false
      }, 
     // 使用样音下单  
    handleUseOrder(item) {
      console.log('使用样音下单service_id',item, item.id)
      if(item.admin_price) {
        this.dataObj.service_id = item.service_id
        this.dataObj.teacher_id = item.teacher_id
        this.dataObj.filename = item.title
        this.dataObj.content_url_escape = item.url
        this.dataObj.work_id = item.id
        this.dataObj.avatar = this.dataList.avatar
        this.dataObj.nickname = this.dataList.nickname
        this.dataObj.offer_price = item.offer_price
        this.dataObj.subjecttype = this.tabsItem[this.current].tags[0].value
        this.btnText="按作品效果下单"
				uni.setStorageSync('dataObj',this.dataObj)
				uni.navigateTo({ url: '/subpkg/pages/voicesrelease/voicesrelease' })
        // this.submitShow = true
        // this.btnText="按作品效果试音"
        // this.$nextTick(() => { 
        //   this.$refs.submitform.handlertextarea()
        // });
      } else {
				uni.showToast({
					title: '该服务暂不支持在线下单，请联系客服',
					icon: 'none'
				})
			}
      // 统计在线下单
			buriedSomeStatistical(3)
    },
    getsubmitShow() {
			this.submitShow = false
		},
    // tab栏切换
    change(index) {
      this.current = index;
      // this.dataObj.service_id = this.tabsItem[this.current].id
    },
    // 显示连续
    handleruku() {
				uni.previewImage({
					urls: ['https://www.peiyinstreet.com/guidang/peiyinguwen.png'],
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
    }, 
    // 音乐播放按钮
    playTheMusic(orderItem) {
      this.audioShow = true;
      if (this.dataPlay.url === orderItem.url) {
        this.tabsList.map((item) => {
          item.works.map((items) => {
            if (this.dataPlay === items) {
              orderItem.playStatus = !orderItem.playStatus;
            } else {
              items.playStatus = false;
            }
          });
        });
      } else {
        this.tabsList.map((item) => {
          item.works.map((items) => {
            items.playStatus = false;
          });
        });
        orderItem.playStatus = true;
        this.dataPlay = orderItem;
        buriedSomeStatistical(0)
      }
      setTimeout(() => {
        this.$refs.musicAudio.preStartPlay();
      }, 0);
    },
    handleChangePlay(status) {
      this.tabsList.map((item) => {
        item.works.map((items) => {
          if (this.dataPlay === items) {
            items.playStatus = status;
          } else {
            items.playStatus = false;
          }
        });
      });
    },
    handleGoBack() {
      if (this.urlpath == 'index') {
        uni.switchTab({ url: '/pages/index/index' })
      } else {
        uni.navigateBack({
          delta: 1
        })
      }
    },
    downloadcopy(groupNum, title) {
      uniCopy({
        content: groupNum,
        success: (res) => {
          uni.showToast({
            title: title,
            icon: "none",
			      duration: 2000
          });
        },
        error: (e) => {},
      });
      buriedSomeStatistical(1)
    },
    // 复制样音信息链接
		async downloadcopySampleVoices(item,title) {
      console.log(item,this.tabsItem,this.dataList)
      let res =  await teacherdetail({teacher_id: item.teacher_id})
      let groupNum = ''
      if (this.dataList.grade_text==='无') {
          groupNum = '样音信息：'+ this.dataList.nickname +
        '+' + item.title+ 
        '+' + item.offer_price+
        '+下载链接 ' + item.url
      } else {
       groupNum = '样音信息：'+ this.dataList.nickname + '('+ this.dataList.grade_text+')'+
			 '+' + item.title+ 
			 '+' + item.offer_price+
       '+下载链接 ' + item.url
      }
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
		},
    musicClose() {
      this.tabsList.map((item) => {
        item.works.map((items) => {
          items.playStatus = false;
        });
      });
      this.audioShow = false;
      this.dataPlay = {
        url: "",
      };
    },
    random() {
      let r = Math.floor(Math.random() * 256),
        g = Math.floor(Math.random() * 256),
        b = Math.floor(Math.random() * 256);
      return `rgb(${r},${g},${b})`;
    },
    // 点赞动画
    handleClick(index, listItem) {
      const par = {
        id: this.cardId,
        type: index,
      };
      followFabulous(par)
        .then((res) => {
          this.followFabuloulistData();
          this.giveIndex = index;
          let that = this;
          let arr = ["-", ""];
          let arrImg = [dianzhan];
          let randomImg = Math.floor(Math.random() * arrImg.length);
          let arrPush = {
            src: arrImg[randomImg], //用于随机图标
            back: this.random(), //可删除
            index: index, //可删除
            time: 5000, //动画时间
            animationData: {}, //每个盒子独立动画不可全局
            x: Math.ceil(Math.random() * 50), //方向间距
            q: Math.floor(Math.random() * arr.length), //用于随机方向
            lastIndex: 1, //用于删除数组
            timer: null, //定时器
            lastTime: 100, //删除的倒计时
          };
          //函数节流限制用户频繁快速点击
          if (new Date() - this.pageDate < 300) return; //如果点击的时间小于初始时间300
          this.pageDate = new Date(); //同步全局时间
          //------------
          this.viewList.push(arrPush);

          //核心动画
          this.viewList.forEach((i, o, v) => {
            var animate = uni.createAnimation({
              duration: i.time,
              timingFunction: "ease-out",
            });
            that.animation = animate;
            let time = arr[i.q] + i.x; //随机的方向和间距
            setTimeout(() => {
              that.animation.translateY(-100).step();
              that.animation.opacity(0).step();
              that.animation.translateX(Number(time)).step();
              i.animationData = that.animation.export();
              //函数防抖
              clearInterval(i.timer);
              i.timer = setInterval(() => {
                i.lastIndex--; //每个图标的倒计时到0删除
                if (i.lastIndex < 0) {
                  v.splice(i, 1);
                  clearInterval(i.timer);
                }
              }, i.lastTime);
            }, 100);
          });
        })
        .catch((err) => {
          uni.showToast({
            title: err.errmsg,
            icon: "none",
            duration: 2000,
          });
        });
    },
  },
};
</script>
<style lang="scss">
/* #ifdef MP-WEIXIN */
page {
  height: 100%;
  overflow: hidden;
  width: 100%;
}
.cellTa {
	position: relative;
  font-size: 32.609rpx;
  margin-left: 7.246rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
  line-height: 20px;
  	.cell {
	     position: absolute;
	     left: 0;
       height: 79.71rpx;
	     width: 543.478rpx;
       background: RGBA(245, 44, 90, 0.00);
       border-radius: 32px 0px 0px 32px;
	.wrapper {
	    height: 79.71rpx !important;
      line-height: 79.71rpx !important;	
	}
	.cell--bubble {
	   height: 79.71rpx !important;
	   width: 543.478rpx !important;
     display: flex;
	   align-items: center;
	   background: RGBA(245, 44, 90, 0.00) !important;
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
/* #endif */
.textarea-placeholder {
  font-size: 25.362rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
  line-height: 36.232rpx;
}
/* #ifdef MP-WEIXIN */
scroll-view ::v-deep ::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}
.u-mask {
  position: absolute !important;
}
.u-drawer {
  position: absolute !important;
}
/* #endif */
</style>
<style lang="scss" scoped>
.container {
  position: relative;
  height: 100%;
  .container_box {
		position: relative;
		height: 100%;
		top: -144.928rpx;
		overflow-y: auto;
	}
  .banner {
    position: relative;
    width: 750rpx;
    height: 503.623rpx;
    text-align: center;
    background-color: #21273A;
    .banner_bcimg {
      width: 750rpx;
      height: 503.623rpx;
    }
    .intro {
		position: absolute;
		width: 100%;
		top: calc(50rpx + var(--status-bar-height));
		align-items: center;
		left: 0rpx;
		color: #ffffff;
		display: flex;
		flex-direction: column;
      .goBack {
        width: 20%;
        text-align: left;
        position: absolute;
        left: 18.116rpx;
        font-size: 32.609rpx;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
      }
	  .homeye {
		    display: flex;
			width: 57.971rpx;
			height: 57.971rpx;
			border-radius: 32.609rpx;
			justify-content: center;
			align-items: center;
			background: white;
		}
		.homeye_img {
			width: 28.986rpx;
			height: 28.986rpx;
		}
      .greet {
        font-size: 32.609rpx;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        width: 500rpx;
        color: #ffffff;
      }
    }
  }
  .content {
    padding: 0 27.174rpx;
    .business_card {
      position: relative;
      margin-top: -193.841rpx;
      width: 695.652rpx;
      height: 430.072rpx;
      background: #ffffff;
      border-radius: 30rpx;
      box-shadow: 0px 3.623rpx 36.232rpx 0px rgba(0, 0, 0, 0.07);
      .head_portrait {
        position: relative;
        height: 85.145rpx;
        .head_portraitimg_box {
          position: absolute;
          top: -110.507rpx;
          left: 50%;
          transform: translate(-50%, 0);
          width: 195.652rpx;
          height: 195.652rpx;
          border-radius: 97.826rpx;
          .head_portraitimg {
            width: 195.652rpx;
            height: 195.652rpx;
            border-radius: 97.826rpx;
            box-shadow: 0px 3.623rpx 30.797rpx 0px rgba(0, 0, 0, 0.17);
            border: 5.623rpx solid RGBA(242, 242, 242, 1);
          }
          .sex_icon {
            position: absolute;
            bottom: 0;
            right: 28.986rpx;
            width: 32.609rpx;
            height: 32.609rpx;
          }
        }
      }
      .nick_namebox {
        position: relative;
        margin-top: 32.609rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        .nick_name {
          position: relative;
          text-align: center;
          display: inline-block;
          width: 199.275rpx;
          height: 50.725rpx;
          font-size: 36.232rpx;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #000000;
          line-height: 50.725rpx;
        }
        .name_certified {
          margin-left: 9.058rpx;
          position: absolute;
          right: -80.841rpx;
          top: 8rpx;
          width: 68.841rpx;
          height: 36.232rpx;
          background: #ffffff;
          text-align: center;
          border-radius: 7.246rpx;
          border: 1.812rpx solid #cecece;
          font-size: 18.116rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
          line-height: 36.232rpx;
        }
      }
      .personalFile {
        position: relative;
        padding: 11.681rpx 30.797rpx;
        margin-top: 25.362rpx;
        margin-left: 27.174rpx;
        width: 641.304rpx;
        height: 199.058rpx;
        background: #fcfbfc;
        border-radius: 14.493rpx;
        .travel_to {
          position: absolute;
          top: 50%;
          right: 36.232rpx;
          width: 36.232rpx;
          height: 36.232rpx;
          transform: translate(0%, -50%);
        }
        .personal_list {
          display: flex;
          margin-top: 18.116rpx;
          .personal_title {
            width: 105.072rpx;
            height: 36.232rpx;
            font-size: 25.362rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #999999;
            line-height: 36.232rpx;
          }
          .personal_content {
            width: 507.246rpx;
            height: 36.232rpx;
            font-size: 25.362rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            display: flex;
            color: #000000;
            line-height: 36.232rpx;
            .divider_line {
              display: inline-block;
              margin: 0 10px;
              width: 2.717rpx;
              height: 25.362rpx;
              line-height: 36.232rpx;
              background-color: #e7e6e7;
            }
          }
        }
      }
    }
    .business_data {
      margin-top: 36.232rpx;
      .business_data_title {
        display: flex;
        justify-content: space-between;
        .title_data {
          height: 39.855rpx;
          font-size: 28.986rpx;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #000000;
          line-height: 39.855rpx;
           .price_text {
              color: #E83035 !important;
           }
        }
      }
      .data_content {
        padding: 20rpx 0px 0px 0px;
        margin-top: 25.362rpx;
        width: 695.652rpx;
        min-height: 259.058rpx;
        background: #ffffff;
        box-shadow: 0px 3.623rpx 36.232rpx 0px rgba(0, 0, 0, 0.07);
        border-radius: 21.739rpx;
        .add_work {
          padding-top: 57.971rpx;
          .add_icon_box {
            text-align: center;
            .add_icon {
              width: 83.333rpx;
              height: 83.333rpx;
            }
          }
          .add_text {
            text-align: center;
            height: 36.232rpx;
            font-size: 25.362rpx;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #666666;
            line-height: 36.232rpx;
          }
        }
        .works_item_list_box {
          .works_item_list {
            display: flex;
            width: 100%;
            height: 119.565rpx;
            border-top: 1px solid #f4f4f4;
          }
          .list_item_paly {
            width: 493.565rpx;
            height: 100%;
            display: flex;
            align-items: center;
            .paly_icon {
              width: 40.826rpx;
              height: 40.826rpx;
              border-radius: 48.913rpx;
              margin-left: 30.493rpx;
            }
            .works_title {
              margin-left: 25.362rpx;
              width: 398rpx;
              font-size: 28.986rpx;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #666666;
            }
          }
          .download_box {
            display: flex;
            align-items: center;
            width: 70rpx;
            .download_icon {
              width: 30.797rpx;
              height: 28.986rpx;
            }
          }
          .btn_item {
            display: flex;
            align-items: center;
            margin-left: 20rpx;
            .voice_btn {
              display: flex;
              align-items: center;
              justify-content: center; 
              width: 108.696rpx;
              height: 50.725rpx;
              background: #FFFFFF;
              border-radius: 25.362rpx;
              border: 1.812rpx solid #FF4F64;
              font-size: 21.739rpx;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              color: #FF445A;
            }
            .voice_img_box{
              width: 76.232rpx;
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
          // .use_box {
          //   display: flex;
          //   align-items: center;
          //   .use_btn {
          //     display: flex;
          //     align-items: center;
          //     justify-content: center;
          //     width: 94.203rpx;
          //     height: 50.725rpx;
          //     background: #FFFFFF;
          //     border-radius: 7.246rpx;
          //     border: 1.812rpx solid #000000;
          //     font-size: 21.739rpx;
          //     font-family: PingFangSC-Medium, PingFang SC;
          //     font-weight: 500;
          //     color: #000000;
          //   }
          // }
        }
        // 案例item
       .dd {
          border-bottom-left-radius: 21.739rpx;
          border-bottom-right-radius: 21.739rpx;
          border-bottom: none !important;
        }
        // 案例item
        .video_item {
          display: flex;
          align-items: center;
          width: 695.652rpx;
          height: 250rpx;
          background: #FFFFFF;
          border-bottom: solid 1.812rpx #F7F7F7;
          padding-left: 27.174rpx;
          border-top-left-radius: 21.739rpx;
          border-top-right-radius: 21.739rpx;
        .video_box {
          position: relative;  
          width: 320.652rpx;
          height: 195.652rpx;
          border-radius: 14.493rpx;
          .video_label {
          position: absolute;	
          top: 10.87rpx;
          left: 10.87rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 97.71rpx;
          padding: 0 9.058rpx;
          height: 36.232rpx;
          background: #FF445A;
          border-radius: 7.246rpx;
          opacity: 0.9;
          font-size: 19.928rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #FFFFFF;
          }
          .video_cover {
          width: 320.652rpx;
          height: 195.652rpx;
          border-radius: 14.493rpx;
          }
          .video_palybox {
            position: absolute;
            display: flex;
            justify-content: space-between;
            margin: 0 18.116rpx;
            left: 0;
            width: 284.42rpx;
            bottom: 18.116rpx;
            .video_paly {
            display: flex;
            align-items: center;
            .video_icon {
              width: 19.928rpx;
              height: 21.739rpx;
            }
            .play_Num {
              margin-left: 5.435rpx;
                font-size: 23.551rpx;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #FFFFFF;
            }
            }
            .broadcasttime {
              font-size: 23.551rpx;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #FFFFFF;
            }
          }
        }
        .video_desc {
          position: relative;
          width: 350rpx;
          height: 195.652rpx;
          padding: 23.551rpx 30.797rpx;
          .video_title {
            font-size: 28.986rpx;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #000000;
          }
          .video_style {
            margin-top: 18.116rpx;
            font-size: 23.551rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #666666;
          }
          .video_by {
            position: absolute;
			      bottom: 18.116rpx;
            display: flex;
            align-items: center;
            .video_icon {
              width: 36.232rpx;
              height: 36.232rpx;
              border-radius: 18.116rpx;
            }
            .video_name {
              // margin-left: 9.058rpx; 
              font-size: 23.551rpx;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #666666;
              width: 259rpx;
            }
          }
        }
        }
      }
      .data_content_introduction {
        margin-top: 18.116rpx;
        padding: 28.986rpx;
        width: 695.652rpx;
        min-height: 195.652rpx;
        background: #ffffff;
        box-shadow: 0px 3.623rpx 36.232rpx 0px rgba(0, 0, 0, 0.07);
        border-radius: 21.739rpx;
        .introduction_text {
          width: 641.377rpx;
          font-size: 25.362rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #000000;
          position: relative;
          line-height: 43.478rpx;
          display: flex;
          .introduction_text_an {
            width: 600.377rpx;
            min-height: 43.478rpx;
            font-size: 25.362rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #000000;
          }
          .handlean_box {
            width: 70rpx;
            height: 40rpx;
          }
          .handlean {
            position: absolute;
            top: 18.058rpx;
            right: 0;
            width: 19.928rpx;
            height: 10.493rpx;
          }
        }
        .tages_list_box {
          margin-top: 28.986rpx;
          display: flex;
          .tages_list {
            position: relative;
            display: flex;
            align-items: center;
            padding: 0 18.116rpx;
            height: 30px;
            margin-right: 18.116rpx;
            background: #ffffff;
            border-radius: 7.246rpx;
            border: 1.812rpx solid #ffa53d;
            .tages_list_img {
              width: 21.739rpx;
              height: 21.739rpx;
            }
            .tages_list_conten {
              margin-left: 5.435rpx;
              font-size: 21.739rpx;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              color: #ffa53d;
            }
            .tages_list_num {
              margin-left: 5.435rpx;
              font-size: 21.739rpx;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              color: #ffa53d;
            }
          }
        }
      }
    }
  }
  .home_musicSrc_box {
    position: fixed;
    bottom: 36.232rpx;
  }
  .footer_prompt {
    padding: 0px 36.232rpx;
    position: fixed;
    bottom: 36.232rpx;
    width: 750rpx;
    justify-content: center;
    height: 97.826rpx;
    display: flex;
    .footer_dianzhan_icon {
      display: flex;
      align-items: center;
      .sharebtn {
        width: 333.333rpx;
        height: 90.58rpx;
        background: #FFECEE;
        border-radius: 54.348rpx;
        font-size: 32.609rpx;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #FF445A;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .laceOrder {
        width: 333.333rpx;
        margin-left: 28.986rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 32.609rpx;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
        height: 90.58rpx;
        background: #FF445A;
        border-radius: 54.348rpx;
      }
      .give_like_icon {
        width: 39.855rpx;
        height: 39.855rpx;
      }
      .give_like_text {
        width: 112px;
        height: 20px;
        font-size: 32.609rpx;
        margin-left: 7.246rpx;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
        line-height: 20px;
      }
    }
    .travel_to_box {
      display: flex;
      align-items: center;
      .travel_to_text {
        width: 394.928rpx;
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
}
.editor_icon_box {
  position: absolute;
  top: 32.609rpx;
  right: 32.609rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  .editor_icon {
    width: 25.362rpx;
    height: 25.362rpx;
  }
  .editor_text {
    margin-left: 9.058rpx;
    font-size: 25.362rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
  }
}
.editorbox {
  display: flex;
  align-items: center;
  margin-right: 32.609rpx;
  .editor_icon {
    width: 25.362rpx;
    height: 25.362rpx;
  }
  .editor_text {
    margin-left: 9.058rpx;
    font-size: 25.362rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
  }
  .additem {
    margin-left: 57.971rpx;
    display: flex;
    align-items: center;
  }
  .edititem {
    display: flex;
    align-items: center;
  }
}
.animate-wrap {
  display: inline-block;
  margin-right: 10px;
  position: absolute;
  top: -20rpx;
  left: 0rpx;
  width: 100upx;
}
.logo {
  display: inline-block;
  position: absolute;
  left: 0;
  width: 70upx;
  height: 70upx;
}
.aa {
  position: absolute;
  font-size: 30upx;
  color: white;
  text-align: center;
  line-height: 50upx;
  width: 80upx;
  transform: translateY(0);
}
.focusBox {
  display: flex;
  .WeChat {
    text-align: center;
    width: 114.058rpx;
    height: 43.478rpx;
    line-height: 43.478rpx;
    background: #1274ff;
    box-shadow: 0px 9.058rpx 12.681rpx 0rpx rgba(18, 70, 255, 0.18);
    border-radius: 21.739rpx;
    font-size: 21.739rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
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
    top: 50%;
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
    width: 213.768rpx;
    height: 79.71rpx;
    margin-left: 36.232rpx;
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
.emptydata {
  text-align: center;
  position: relative;
  .emptydataimg {
    width: 431.159rpx;
    height: 387.681rpx;
  }
  .emptydatatext {
    top: 300rpx;
    width: 100%;
    text-align: center;
    position: absolute;
    text-align: center;
    font-size: 25.362rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
  }
}
.nick_nameT {
		max-width: 450rpx;
		display: inline-block;
}
.share_box {
  position: fixed;
  bottom: 443.478rpx;
  right: 0rpx;
  width: 90.58rpx;
  height: 90.58rpx;
  border-radius: 45.29rpx;
  .invitationBtn {
     width: 90.58rpx;
     height: 90.58rpx;
     padding: 0 !important;
     margin: 0 !important;
     border: none !important;
     background-color: RGBA(241, 243, 246, 0) !important;
     display: flex;
     align-items: center;
     justify-content: center;
     border-radius: 45.29rpx;
  }
  .invitationBtn::after {
      border: none !important;
  }
  .shareicon {
    position: absolute;
    top: 0;
    left: 0;
     width: 90.58rpx;
     height: 90.58rpx;
  }
}
.collect_item {
	height: 108.696rpx;
	border-bottom: 1px solid #F7F7F7;
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
.focus {
    position: absolute;
    right: 163.043rpx;
    margin-left: 7.101rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 94.058rpx;
    height: 43.478rpx;
    border-radius: 21.739rpx;
    font-size: 21.739rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    border: 1.812rpx solid #FF4F64;
    color: #FF4F64;
    .focusaixin {
      width: 27.174rpx;
      height: 23.551rpx;
      margin-left: 5.435rpx;
      color: #FF4F64;
    }
  }
  .beenFocused {
    position: absolute;
    right: 163.043rpx;
    text-align: center;
    margin-left: 7.101rpx;
    width: 94.058rpx;
    height: 43.478rpx;
    line-height: 43.478rpx;
    background: #ffffff;
    border-radius: 21.739rpx;
    border: 1.812rpx solid #cecece;
    font-size: 21.739rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
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
    width: 597.826rpx;
    height: 760.87rpx;
    .shutdown_icon {
      position: absolute;
      right: 0;
      top: -65.899rpx;
      width: 38.043rpx;
      height: 38.043rpx;
    }
    .coupons_icon {
      width: 597.826rpx;
      height: 760.87rpx;
    }
    .coupons_content {
      position: absolute;
      top: 180rpx;
      width: 100%;
      left: 0px;
      .content_text {
		  padding: 0px 101.449rpx;
		  font-size: 28.986rpx;
		  font-family: PingFangSC-Regular, PingFang SC;
		  font-weight: 400;
		  color: #666666;
		  .text {
			  margin-top: 36.232rpx;
		  }
      .red_text {
			  color: #FF445A;
			  font-weight: 500;
		  }
	  }
	  .know_btn {
		  display: inline-block;
		  text-align: center;
		  margin-top: 59.783rpx;
		  margin-left: 148.551rpx;
		  width: 300.725rpx;
		  height: 86.957rpx;
		  line-height: 86.957rpx;
		  font-size: 28.986rpx;
	      font-family: PingFangSC-Medium, PingFang SC;
		  font-weight: 500;
		  color: #FFFFFF;
		  background: #FF445A;
		  border-radius: 43.478rpx;
	  }
    }
  }
}
</style>
