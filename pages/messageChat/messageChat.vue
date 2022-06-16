<template>
	<view class="container">
		<u-navbar
			:is-back="false"
			:title="'我的消息' "
			title-size="36.232rpx"
			title-color="#000000"
			:border-bottom="true"
			:background="background"
			back-icon-color="#000000"
		></u-navbar>
		<view class="content">
		 <view class="noticebar"  v-if="showSelectTag" @tap.stop="handleInstructionManual">平台价格标准&质量保障&售后服务手册 
			 <view class="noticebar_close" @tap.stop="handleclose">
				 <u-icon name="close-circle-fill"></u-icon>
			 </view>
		</view>	
		 <scroll-view 
		   class="session_item_scroll"
		   scroll-y
		>
			 <view class="session_item_box">
			  <view class="item_list" @click="handleRoute">
				  <view class="head_img_box">
					  <!-- <view class="message_num">
						<view class="read-text">99+</view>
						<view class="read-text"></view>
					  </view> -->
					  <image
					      class="head_icon"
						  src="https://www.peiyinstreet.com/t/static/img/plylogo.5c2d1fa.jpg"
						  mode="scaleToFill"
					  />
					  <!-- 在线状态  -->
					  <view class="online"></view>
				  </view>
				  <view class="message_content">
                     <view class="message_body">
						 <view class="nick_name u-line-1">人工客服</view>
						 <view class="message_text u-line-1">点击查看会话</view>
					 </view>
					 <view class="message_time">
						 <!-- {{ getcaculateTimeago(item.lastMessage.lastTime) }} -->
					 </view>
				  </view>
			  </view>
		  </view>	
		 </scroll-view>	
          <!-- <view v-if="conversationList.length == 0" class="temporarily_box">
			<image
				class="temporarily_icon"
				src="@/static/demand/defaulticon.png"
				mode="scaleToFill"
			/>
			<view class="temporarily_text">暂无数据</view>
		</view> -->
		</view>
	</view>
</template>

<script>
import { mapState } from "vuex";
import { profilePlatform } from '@/api/index'
// 埋点统计
import { buriedSomeStatistical } from '@/utils/encapsulation.js'
	export default {
		data() {
			return {
				conversationList: [],
				conversation: {},
				showSelectTag: true,
				array: [{
					name: '发起会话'
				}, {
					name: '发起群聊'
				}, {
					name: '加入群聊'
				}],
				background: {
				  backgroundColor: '#ffffff',
			    },
				sessionAugments: {
					id: '',
					StartIndex: 0,
					TimeStamp: 0
				},
				sessionItemList: [],
				dataShow: true
			};
		},
		computed: {
			...mapState("user", ["token","userId"]),

		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad() {
			
		},

		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload() {
			
		},
		methods: {	
		// 跳转小程序客服
		handleRoute() {
		  //统计极速试音埋点   
		  buriedSomeStatistical(2)
	      wx.openCustomerServiceChat({
					extInfo: {url: 'https://work.weixin.qq.com/kfid/kfcade993b61c3ff656'},
					corpId: 'ww901fbb3c6ecf9871',
					success(res) {
					  console.log('接入小程序客服成功')
					},
				    fail(err) {
                      console.log('接小程序客服失败',err)
					  uni.showToast({
							icon: 'none',
							title: '仅支持在手机微信中使用该功能哦'
					  });
					}
				})
		},
		// 跳转到说明手册
		handleInstructionManual() {
		  profilePlatform().then((res)=>{
            uni.navigateTo({
			   url: "/subpkg/pages/webview/webview?src="+res.data+'&&title=平台规范化运营手册',
		    });
		  })	
		},
		// 关闭提示
		handleclose() {
			this.showSelectTag = false
		},
		}
	}
</script>
<style lang="scss">
page {
  height: 100%;
  // overflow: hidden;
  background: #F2F2F2;
}
</style>
<style lang="scss" scoped>
.container {
	width: 100%;
	display: flex;
	flex-direction: column;
	height: 100%;
}
.content {
  width: 100%;	
  height: 100%;
  .noticebar {
	    padding-left: 27.174rpx;
	    height: 72.464rpx;
		background: #FF445A;
		font-size: 28.986rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		position: relative;
		.noticebar_close {
          position: absolute;
		  width: 50rpx;
		  font-size: 40.362rpx;
		  padding-right: 27.174;
		  right: 0rpx;
		}
  }
  .session_item_scroll {
	width: 100%;
	height: 100%;
	.session_item_box {
	  background: #FFFFFF;
	  .message_num {
		position: absolute;
		top: 0;
		right: -12.058rpx;  
		display: flex;
		align-items: center;
		justify-content: center;  
		width: 32.609rpx;
		height: 32.609rpx;
		border-radius: 17.304rpx;
		background: #FF445A;
		// border: 1.812rpx solid #FFFFFF;
		font-size: 21.739rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
	  }
	  .item_list {
	    padding:0rpx 0rpx 0rpx 25.362rpx;	  
        width: 100%;
		height: 146.739rpx;
		display: flex;
		align-items: center;
		.head_img_box {
		  position: relative;	
		  width: 86.957rpx;
		  height: 86.957rpx;
		  .head_icon {
			width: 86.957rpx;
		    height: 86.957rpx;  
            border-radius: 34.42rpx;
		  }
		  .online {
			position: absolute;
			bottom: 0px;
			right: 0rpx; 
			width: 21.739rpx;
			height: 21.739rpx;
			border-radius: 10.87rpx;
			background: #26DA52;
			border: 1px solid #FFFFFF;
		  }
		}
		.message_content {
		  width: 614.13rpx;	
          height: 100%;
		  margin-left: 23.551rpx;
		  border-bottom: 1.812rpx solid #F6F6F6;
		  display: flex;
		  .message_body {
			margin-top: 30.797rpx;  
			width: 409.13rpx;
			.nick_name {
			  width: 409.13rpx;
			  height: 39.855rpx;
			  font-size: 28.986rpx;
			  font-family: PingFangSC-Medium, PingFang SC;
			  font-weight: 500;
			  color: #000000;
			  line-height: 39.855rpx;
			}
			.message_text {
				margin-top: 10.246rpx;
				width: 409.13rpx; 
				height: 36.232rpx;
				font-size: 25.362rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #BDBDBD;
				line-height: 36.232rpx;
			}
		  }
		  .message_time {
			width: 205rpx;
		    padding-right: 27.174rpx;
			margin-top: 34.42rpx;  
			height: 30.797rpx;
			text-align: right;
			font-size: 21.739rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #D0D0D0;
			line-height: 30.797rpx;
		  }
		}
	  }
	}
  }
}
.temporarily_box {
	padding-top: 211.957rpx;
	position: relative;	
	display: flex;
	align-items: center;
	justify-content: center; 
	margin-left: 27.174rpx; 
	width: 695.652rpx;
	height: 480.072rpx;
	border-radius: 25.362rpx;
	.temporarily_icon {
		width: 403.986rpx;
		height: 331.522rpx;
	}
	.temporarily_text {
		position: absolute;
		width: 100%;
		top: 410.319rpx;
		text-align: center;
	}
}
</style>
