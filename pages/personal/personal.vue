<template>
  <view class="personal_box">
    <u-navbar
      :is-back="false"
      title="个人中心"
      title-size="36.232rpx"
      title-color="#000000"
      :border-bottom="false"
    ></u-navbar>
    <view class="teacherlist_box">
	 <!-- <image
	    v-if="erweimaShow"
		class="erweima_icon"
		:show-menu-by-longpress="true"
		src="https://www.peiyinstreet.com/guidang/erweimaqun.jpeg"
		mode="widthFix"
	 />	 -->
	 <view class="pys_popup" v-if="erweimaShow">
		<view class="popup_conent">
			<image
				class="closeicon"
				src="@/static/home/close.png"
				mode="scaleToFill"
				@click="handlecloseerweima"
			/>
			<view>
            <view style="height: 17.971rpx"></view>
            <view class="check_WeChat_test"> 请在电脑端入驻，网址 </view>
            <view class="check_WeChat_tips"
              >https://www.peiyinstreet.com/t/#/</view
            >
            <view class="share_btn_box">
              <button
                class="cancelSharebtn"
                hover-class="button-hover"
                @click="handlecloseerweima"
              >
                取消
              </button>
              <button class="sharebtn" @click="downloadcopy('https://www.peiyinstreet.com/t/#/','链接复制成功')">
                复制
              </button>
            </view>
          </view>
		</view>
	 </view>	
	 <scroll-view class="scroll_box" scroll-y="true">
		<view class="head_card_box">
        <view class="my_avatar">
          <image
		    v-if="!loginStatusShow"
            class="avatar_icon"
            src="https://www.peiyinstreet.com/guidang/defaultAvatar.png"
			@click="handleClicklogin"
          />
		  <image
		    v-if="loginStatusShow"
            class="avatar_icon"
            :src="userInfo.avatar"
            mode="scaleToFill"
          />
          <view class="nick_name"> {{loginStatusShow ? userInfo.nickname : '未登录'}} </view>
        </view>
		<view class="integral">
			<view class="item" @click="handleCheckBalance">
              <view class="digital">0</view>
			  <view class="digital_text">钱包</view>
			</view>
			<view class="item" @click="handleIntegral">
              <view class="digital">{{userInfos.score || 0}}</view>
			  <view class="digital_text">积分</view>
			</view>
			<view class="item" @click="handlecoupons">
              <view class="digital">{{userInfos.coupon_count || 0}}</view>
			  <view class="digital_text">优惠券</view>
			</view>
		</view>
        <image
          class="background_icon"
          src="@/static/my/backgroundicon.png"
          mode="scaleToFill"
        />
      </view>
	   <view class="activity">
		   <view class="activity_title_box">
			   <view class="activity_title">我的订单</view>
			   <view class="activity_all">
				   <view class="activity_all_title" @click="handleJumpmyOrder(0)">查看全部</view>
				   <image
				       class="activity_all_img"
					   src="@/static/my/traveltoicon.png"
					   mode="scaleToFill"
				   />
			   </view>
		   </view>
		   <view class="item_list_box">
             <view class="orderitem_list" @click="handleJumpmyOrder(1)">
			   <u-badge  style="position:absolute;right: 40rpx; top: -45rpx;" :count="userInfos.order_paid_count" bgColor="#FE445A"></u-badge>	 
			   <image
			       class="item_icon"
				   src="@/static/coupons/daifukuan.png"
				   mode="scaleToFill"
			   />
			   <view class="item_title">待付款</view>
			 </view>
			  <view class="orderitem_list" @click="handleJumpmyOrder(2)">
			   <u-badge  style="position:absolute;right: 40rpx; top: -45rpx;" :count="userInfos.order_delivere_count" bgColor="#FE445A"></u-badge>		  
			   <image
			       class="item_icon"
				   src="@/static/coupons/daijiaofu.png"
				   mode="scaleToFill"
			   />
			   <view class="item_title">待交付</view>
			 </view>
			  <view class="orderitem_list" @click="handleJumpmyOrder(3)">
			   <u-badge  style="position:absolute;right: 40rpx; top: -45rpx;" :count="userInfos.order_completed_count" bgColor="#FE445A"></u-badge>		  
			   <image
			       class="item_icon"
				   src="@/static/coupons/yiwancheng.png"
				   mode="scaleToFill"
			   />
			   <view class="item_title">已完成</view>
			 </view>
		   </view>
	   </view>
	    <view class="activity">
		   <view class="activity_title_box">
			   <view class="activity_title">我的服务</view>
			   <!-- <view class="activity_all">
				   <view class="activity_all_title" @click="handleMyWorks">查看全部</view>
				   <image
				       class="activity_all_img"
					   src="@/static/my/traveltoicon.png"
					   mode="scaleToFill"
				   />
			   </view> -->
		   </view>
		   <view class="item_list_box">
             <view class="orderitem_list" @click="handleMyWorks"> 
			   <image
			       style="width: 48.913rpx;height: 59.725rpx;"
			       class="item_icon"
				   src="@/static/coupons/zuopin.png"
				   mode="scaleToFill"
			   />
			   <view class="item_title">样音</view>
			 </view>
			  <view class="orderitem_list" @click="handleMyFocus">	  
			   <image
			       style="width: 56.159rpx; height: 59.725rpx;"
			       class="item_icon"
				   src="@/static/coupons/peiyinshi.png"
				   mode="scaleToFill"
			   />
			   <view class="item_title">配音师</view>
			 </view>
			  <view class="orderitem_list">	
			    <button  class="orderitem_btn" open-type="contact" send-message-title="建议反馈" :show-message-card="true">	  
					<image
						style="width: 57.971rpx;height: 59.783rpx;"
						class="item_icon"
						src="@/static/coupons/fapiao.png"
						mode="scaleToFill"
					/>
					<view class="item_title">发票</view>
				</button>	
			 </view>
		   </view>
	   </view>
	   <!-- 我的配音师 -->
	  <!-- <view class="activity">
		   <view class="activity_title_box">
			   <view class="activity_title">我的配音师</view>
			   <view class="activity_all">
				   <view class="activity_all_title" @click="handleMyFocus">查看全部</view>
				   <image
				       class="activity_all_img"
					   src="@/static/my/traveltoicon.png"
					   mode="scaleToFill"
				   />
			   </view>
		   </view>
		   <view class="item_list_box">
             <view class="item_list" @click="handleMyFocus" v-for="(item,index) in 3" :key="index">
			   <view class="img_icon_box">
				  <image
				    v-if="voiceData[index]"
					class="img_icon"
					:src="voiceData[index].teacher.avatar"
					mode="scaleToFill"
			      /> 
				  <image
				    v-if="!voiceData[index]"
					class="img_icon"
					src="@/static/coupons/emptyRound.png"
					mode="scaleToFill"
			       />
				   <text v-if="!voiceData[index]" class="add_text">+</text>
			   </view>
			 </view>
		   </view>
	  </view>	 -->
      <view class="my_list_cell_box">
		<view class="list_cell">
			<button  
			  class="invitationBtn" 
			  hover-class="button-hover"
              open-type="share"> 
			<view class="cell_logo_box">
				<image
					class="cell_logo"
					src="@/static/img/sharechum.png"
					mode="scaleToFill"
				/>
				<text class="cell_text">分享好友</text>
			</view>
		   </button>
		   <view class="travel_to_iconbox">
			  <image
				class="travel_to_icon"
				src="@/static/my/traveltoicon.png"
				mode="scaleToFill"
			  />
	        </view>
	   </view>  
	    <view class="list_cell" @click="handleasreSources">
		   <view class="cell_logo_box">
             <image
			     class="cell_logo"
				 src="@/static/img/jiafangziyuan.png"
				 mode="scaleToFill"
			 />
			 <text class="cell_text">甲方资源</text>
		   </view>
		   <view class="travel_to_iconbox">
			  <image
				class="travel_to_icon"
				src="@/static/my/traveltoicon.png"
				mode="scaleToFill"
			  />
		   </view>
	   </view>
	   <view class="list_cell" @click="handleUtility">
		   <view class="cell_logo_box">
             <image
			     class="cell_logo"
				 src="@/static/img/yingrengongju.png"
				 mode="scaleToFill"
			 />
			 <text class="cell_text">影人工具</text>
		   </view>
		   <view class="travel_to_iconbox">
			  <image
				class="travel_to_icon"
				src="@/static/my/traveltoicon.png"
				mode="scaleToFill"
			  />
		   </view>
	   </view> 
       <view class="list_cell">
		    <button  class="invitationBtn" open-type="contact" send-message-title="建议反馈" :show-message-card="true">
				 <view class="cell_logo_box">
					<image
						class="cell_logo"
						src="@/static/my/cService.png"
						mode="scaleToFill"
					/>
					<text class="cell_text">建议反馈</text>
				</view>	  
			</button>
		   <view class="travel_to_iconbox">
			  <image
				class="travel_to_icon"
				src="@/static/my/traveltoicon.png"
				mode="scaleToFill"
			  />
		   </view>
	   </view>
	    <view class="list_cell" @click="handleJumpAbout">
		   <view class="cell_logo_box">
             <image
			     class="cell_logo"
				 src="@/static/my/aboutus.png"
				 mode="scaleToFill"
			 />
			 <text class="cell_text">关于我们</text>
		   </view>
		   <view class="travel_to_iconbox">
			  <image
				class="travel_to_icon"
				src="@/static/my/traveltoicon.png"
				mode="scaleToFill"
			  />
		   </view>
	   </view>
	   <view class="list_cell">
		 <button  class="invitationBtn" @click="handlJumpCard">  
		   <view class="cell_logo_box">
             <image
			     class="cell_logo"
				 src="@/static/my/in.png"
				 mode="scaleToFill"
			 />
			 <text class="cell_text">配音师入驻</text>
			 <text class="hotbtn">hot</text>
		   </view>
		  </button>
		   <view class="travel_to_iconbox">
			  <image
				class="travel_to_icon"
				src="@/static/my/traveltoicon.png"
				mode="scaleToFill"
			  />
		   </view>
	   </view>
	  </view>
	  <view style="height:30px"></view>
      <!-- <view class="weChat_card">
		  <view class="title_group_box">
            <image
			      class="group_icon"
				  src="@/static/my/qunicon.png"
				  mode="scaleToFill"
			  />
			  <text class="group_text">全国广告宣传片甲方资源置换微信群</text>
		  </view>
		  <view class="group_content">
			<button  class="invitationBtn" @click="handleCheckWeb"> 
			  <view class="group_content_box">
                <image
			        class="group_icon"
					src="@/static/my/placeholder.png"
					mode="scaleToFill"
				/>
				<view class="text_yanzheng">该群已开启进群验证</view>
				<view class="text_in">只可通过邀请进群</view>
				<view class="in_btn">点击加入</view>
			  </view>
			</button>  
		  </view>
	  </view> -->
	 </scroll-view>	
    </view>
  </view>
</template>

<script>
import { loginStatus,profileIndex,profileUpdate } from '@/api/index.js'
import { followList, profileinformation } from '@/api/personal.js'
import { mapState } from "vuex";
import uniCopy from '@/utils/uni-copy.js'
import { buriedSomeStatistical } from '@/utils/encapsulation.js'
export default {
  data() {
    return {
		erweimaShow: false,
		loginStatusShow: false,
		userInfo: {

		},
		userInfos: {},
		voiceData: []
	};
  },
  computed: {
  },
  onLoad() {
  },
  onShow() {
    // this.getloginStatus()
	// // 获取积分，优惠卷数据
	// this.getCoupondata()
	this.getIntegral()

  },
  onShareAppMessage(res) {
	if (res.from === 'button') {// 来自页面内分享按钮
		console.log('来自button', res.target)
		return {
			title: '推荐一个专业真人配音平台，配音只需成本价。点击收藏',
			desc: '',
			imageUrl: 'https://www.peiyinstreet.com/guidang/personalshare.png',
			path: "pages/index/index",
			complete: function(res) {
				console.log('分享成功', res)
			},
	    }
	}else {
        return {
			title: '全国影视宣传片甲方资源置换群入口',
			desc: '',
			complete: function(res) {
				console.log('分享成功', res)
			},
	   }
	}
  },
  computed: {
    ...mapState("user", ["token","userId"]),
  },
  methods: {
	getloginStatus() {
	   loginStatus().then((res)=>{
		   if(res.data.nickname===0) {
             this.loginStatusShow = false
           }else {
			 profileIndex().then((res)=>{	 
			   this.userInfo = res.data
			   this.loginStatusShow = true  
			 }) 
		   }
	   })	
	},
	getIntegral() {
		profileinformation().then((res)=>{
			console.log('订单滴滴代驾点击',res)
			this.userInfos = res.data
		})
	},
	// 查看余额
	handleCheckBalance() {
	  uni.showToast({
        icon: 'none',
        title: '钱包功能暂未开通'
      });
	},
	// 优惠卷积分数据
	getCoupondata() {
	  followList().then((res)=>{
        console.log('我的关注数据',res)
		this.voiceData = res.data
	  }).catch((err)=>{

	  })
	},
    handleClicklogin() {
	  this.getUserInfo()
	},
	// 跳转到问卷调查
	handleCheckWeb() {
		// this.erweimaShow = true
		uni.previewImage({
            urls: ['https://www.peiyinstreet.com/guidang/jinqun.png'],
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
	//   uni.navigateTo({ url: '/pages/webview/webview?src='+ this.webSrc })
	},
	handleJumpAbout() {
	  uni.navigateTo({ url: '/subpkg/pages/about/about' })
	},
	// 跳转到我的作品页面
	handleMyWorks() {
	   uni.navigateTo({ url: '/subpkg/pages/mywork/mywork' })	
	},
	// 跳转到我的配音师页面
	handleMyFocus() {
	   uni.navigateTo({ url: '/subpkg/pages/myfocus/myfocus' })	
	},
	handlecloseerweima() {
		this.erweimaShow = false
	},
	// 跳转到积分页面
	handleIntegral() {
	   uni.navigateTo({ url: '/subpkg/pages/integral/integral' })	
	},
	// 跳转到优惠卷
	handlecoupons() {
	  uni.navigateTo({ url: '/subpkg/pages/coupons/coupons' })
	},
	handleJumpmyOrder(index) {
	  uni.navigateTo({ url: '/subpkg/pages/myorder/myorder?type='+ index })
	},
	// 跳转甲方置换群
	handleasreSources() {
	  uni.navigateTo({ url: '/subpkg/pages/asresources/asresources' })
	},
	// 跳转甲方置换群
	handleUtility() {
	  uni.navigateTo({ url: '/subpkg/pages/utility/utility' })
	},
	handlJumpCard() {
		uni.previewImage({
            urls: ['https://www.peiyinstreet.com/guidang/qiyewechat.png'],
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
		//统计极速试音埋点 
		buriedSomeStatistical(7)
		// console.log('配音师弹窗',this.erweimaShow)
		// this.erweimaShow = true
			/* #ifdef MP-WEIXIN */
			//  wx.navigateToMiniProgram({
			// 	appId: '',
			// 	path: '',
			// 	extraData: {
			// 		foo: 'bar'
			// 	},
			// 	shortLink: '#小程序://配音师名片/配音师名片/wVGSK7UmpbJxS5c',
			// 	envVersion: 'release',
			// 	success(res) {
			// 		// 打开成功
			// 		console.log(res)
			//    }
		    // })
		  /* #endif */
	},
	onTabItemTap() {
		loginStatus().then((res)=>{
           if(res.data.nickname == 0) {
              this.getUserInfo()
            } else {
              this.getloginStatus()
			  // 获取积分，优惠卷数据
			  this.getCoupondata()
			}
         }).catch((err)=>{
           console.log('返回错误信息', err)
         })  
	    },
    getUserInfo() {
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
            phone: ''
          }
          await profileUpdate(userobj);
		  this.getloginStatus()
		  // 获取积分，优惠卷数据
		  this.getCoupondata()
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
	downloadcopy(groupNum,title) {
		uniCopy({
			content:groupNum,
			success:(res)=>{
				uni.showToast({
					title: title,
					icon: 'none'
				})
				this.erweimaShow = false
			},
			error:(e)=>{
			}
		})
	}
  }
};
</script>
<style lang="scss">
page {
  min-height: 100%;
  width: 100%;
  background: #f2f2f2;

}
.personal_box {
	width: 100%;
	height: 100%;
}
</style>
<style lang="scss">
.invitationBtn {
	width: 100%;
	display: flex;
	justify-content: space-between;
	border-radius: 8rpx;
	border: none;
	padding: 0 !important;
	background: #FFFFFF;
	font-size: 26rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
}
.invitationBtn::after {
  border: none !important;
}
.orderitem_btn::after {
  border: none !important;
}
.teacherlist_box {
  height: 100%;
  overflow-y: auto;
  position: relative;
  .scroll_box {
	  height: 100%;
  }
  .head_card_box {
    position: relative;
    margin-top: 27.174rpx;
    margin-left: 27.174rpx;
    width: 695.652rpx;
    height: 289.855rpx;
    .background_icon {
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0;
    }
    .my_avatar {
      display: flex;
	  align-items: center;
	  padding-top: 38.043rpx;
      z-index: 99;
      .avatar_icon {
		margin-left: 43.478rpx;  
		width: 108.696rpx;
		height: 108.696rpx;
	    border-radius: 181.58rpx;
		border: 2px solid #FFFFFF;
      }
      .nick_name {
		margin-left: 27.174rpx;  
        text-align: center;
        height: 43.478rpx;
        font-size: 32.609rpx;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
        line-height: 43.478rpx;
      }
    }
	.integral {
		display: flex;
		justify-content: space-between;
		margin: 43.478rpx 0rpx 0px 0rpx;
		.item {
			width: 50%;
			text-align: center;
			.digital {
				font-size: 32.609rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
			}
			.digital_text {
				font-size: 21.739rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
			}
		}
	}
  }
  .my_list_cell_box {
	margin-top: 21.739rpx;
    margin-left: 27.174rpx;  
    width: 695.652rpx;
	background: #FFFFFF;
	border-radius: 14.493rpx;
	.list_cell {
		height: 113.678rpx;
		display: flex;
		justify-content: space-between;
		.cell_logo_box {
			display: flex;
			align-items: center;
			.cell_logo {
				margin-left: 30.797rpx;
				width: 47.101rpx;
				height: 47.101rpx;
			}
			.cell_text {
				margin-left: 19.928rpx;
				height: 45.29rpx;
				font-size: 32.609rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #000000;
				line-height: 45.29rpx;
			}
			.hotbtn {
			  background-color: #FF445A;
			  font-size: 18.116rpx;
			  height: 32.609rpx;
              line-height: 30.609rpx;
			  font-family: PingFangSC-Semibold, PingFang SC;
			  color: #FFFFFF;
			  margin-left: 10.87rpx;
			  border-radius: 6rpx;
			  padding: 3.623rpx 9.058rpx;
		    }
		}
		.travel_to_iconbox {
			line-height: 113.678rpx;
			text-align: right;
            .travel_to_icon {
				width: 14.87rpx;
				height: 19.928rpx;
				margin-right: 27.174rpx;
			}
		}
	}
  }
  .weChat_card {
	padding: 38.043rpx 0px 0px 30.797rpx;  
	margin-bottom: 18.116rpx;
	margin-top: 21.739rpx;
    margin-left: 27.174rpx;    
	width: 695.652rpx;
	height: 492.754rpx;
	background: #FFFFFF;
	text-align: center;
	border-radius: 14.493rpx;
	.title_group_box {
		display: flex;
		text-align: center;
		align-items: center;
		.group_icon {
			width: 47.101rpx;
			height: 47.101rpx;
		}
		.group_text {
			margin-left: 19.928rpx;
			width: 551.739rpx;
			height: 45.29rpx;
			font-size: 31.609rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #000000;
			line-height: 45.29rpx;
		}
	}
	.group_content {
		display: inline-block;
		margin-top: 19.928rpx;
        width: 362.319rpx;
		height: 362.319rpx;
		position: relative;
		.group_icon {
		  position: absolute;
		  top: 0;
		  left: 0;	
          width: 362.319rpx;
		  height: 362.319rpx;
		}
		.text_yanzheng {
			margin-top: 97.826rpx;
			font-size: 28.986rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #666666;
			line-height: 45.29rpx;
		}
		.text_in {
			font-size: 28.986rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #666666;
			line-height: 45.29rpx;
		}
		.in_btn {
			margin-top: 16.304rpx;
			font-size: 32.609rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #FF445A;
			line-height: 45.29rpx;
		}
	}
  }
}
.pys_popup {
    position: fixed;
    height: 100%;
    width: 100%;
    background:rgba(0,0,0,0.5);
    z-index: 999999;
	.popup_conent {
		position: absolute;
		padding: 36.232rpx;
		top: 40%;
		left: 50%;
		transform: translate(-50%,-50%);
		min-width: 500.71rpx;
		min-height: 326.087rpx;
		background: #FFFFFF;
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
.applystorage {
	position: fixed;
	bottom: 70.391rpx;
	width: 100%;
	text-align: center;
	.rankbtn {
        display: inline-block;
		width: 579.71rpx;
		height: 94.203rpx;
		line-height: 94.203rpx;
		text-align: center;
		background: #1274FF;
		box-shadow: 0px 8px 10px 0px rgba(18, 70, 255, 0.18);
		border-radius: 30px;
		font-size: 32.609rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
	}
	.applystorage_btn {
		display: inline-block;
		width: 579.71rpx;
		height: 94.203rpx;
		text-align: center;
		background: #1274FF;
		box-shadow: 0px 8px 10px 0px rgba(18, 70, 255, 0.18);
		border-radius: 30px;
        .shenqing{
			margin-top: 10rpx;
           font-size: 32.609rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
		}
		.gengduo{
			font-size: 18.116rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
		}

	}

}
.rankingbox {
	.rankingtop_text_box{
		display: flex;
		justify-content: center;
		.rankingtext{
			width: 271.739rpx;
			.mingci {
                text-align: center;
				height: 50.725rpx;
				font-size: 36.232rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #000000;
				line-height: 50.725rpx;
				.mingci_num {
					color: #1274FF;
				}
			}
			.tipstitle {
				text-align: center;
				height: 36.232rpx;
				font-size: 25.362rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #000000;
				line-height: 36.232rpx;
			}

		}
		.scoretest {
			width: 271.739rpx;
			.jifne {
			    text-align: center;
				height: 50.725rpx;
				font-size: 36.232rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #000000;
				line-height: 50.725rpx;	
			}
			.tipstitle {
				text-align: center;
				height: 36.232rpx;
				font-size: 25.362rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #000000;
				line-height: 36.232rpx;
			}
		}
	}
	.prompt_box {
	  margin-top: 38.043rpx;
	  width: 543.478rpx;
	  height: 271.739rpx;
	  background: #F4F4F4;
	  border-radius: 14.493rpx;
	  text-align: center;
	  .defen {
		text-align: center;
		height: 30.797rpx;
		font-size: 21.739rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
		line-height: 30.797rpx;
	  }
	  .defen2 {
		text-align: center;
		height: 30.797rpx;
		font-size: 21.739rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
		line-height: 30.797rpx;
	  }
	  .know_btn {
		display: inline-block;
		width: 304.348rpx;
		height: 79.71rpx;
		line-height: 79.71rpx;
		background: #1274FF;
		box-shadow: 0px 14.493rpx 18.116rpx 0px rgba(18, 70, 255, 0.18);
		border-radius: 39.855rpx;
		font-size: 28.986rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
	  }
	}
}
.group_content_box {
	width: 100%;
	text-align: center;
}
// 活动样式
.activity {
  margin-left: 27.174rpx;	
  width: 695.652rpx;
  height: 217.391rpx;
  background: #FFFFFF;
  border-radius: 14.493rpx;
  margin-top: 21.739rpx;
  margin-bottom: 21.739rpx;
  .activity_title_box {
	  padding: 25.362rpx 30.797rpx;
	  display: flex;
	  justify-items: center;
	  justify-content: space-between;
      .activity_title {
		height: 36.232rpx;
		font-size: 26.362rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #000000;
		line-height: 36.232rpx;
	  }
	  .activity_all {
		  display: flex;
	      justify-items: center;
		  align-items: center;
		  .activity_all_title {
			font-size: 21.739rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #999999;
			margin-right: 8.246rpx;
		  }
		  .activity_all_img {
			width: 10.87rpx;
			height: 19.928rpx;

		  }
	  }
  }
  .item_list_box {
	margin-top: 15rpx;  
	width: 100%; 
	display: flex;
    justify-content: space-between;
	.orderitem_list {
		position: relative;
		text-align: center;
		width: 50%;
		.orderitem_btn {
		  position: relative;
		  text-align: center;
		  border: none;
		  padding: 0 !important;
		  background: RGBA(247, 247, 247, 0);
		  width: 100%;
		  line-height: 34.42rpx;
		}
		.item_icon {
			width: 59.783rpx;
			height: 50.725rpx;
		}
		.item_title {
			font-size: 25.362rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #666666;
		}
	}
	.item_list {
	  display: flex;
	  justify-content: center;
	  width: 50%;
	  .img_icon_box {
		 position: relative;
		 width: 100rpx;
		 height: 100rpx;
		 border-radius: 50rpx;
		.img_icon {
		  width: 100rpx;
		  height: 100rpx;
		  border-radius: 50rpx;
	    }
		.add_text {
			position: absolute;
			top: 48%;
            left: 52%;
			transform: translate(-50%,-50%);
			font-size: 47.101rpx;
			color: #D3D3D3;
		}
	  }
    }
  }
}
</style>
