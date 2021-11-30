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
			@custom-back="handleGoBack"
		></u-navbar>
		<view class="content">
		 <scroll-view 
		   v-if="this.sessionItemList.length !== 0"
		   class="session_item_scroll"
		   scroll-y
		   @refresherrefresh="handlere()"
		   :refresher-enabled="true"
		   :scroll-top="scrollInto"
		   @scroll="tabScoll"
		   @scrolltolower="reachBottom"
		   :refresher-triggered="triggered"
		>
			 <view class="session_item_box">
			  <view v-for="(item,index) in sessionItemList" :key="index" class="item_list" @click.stop="handlechatpage">
				  <view class="head_img_box">
					  <view class="message_num" v-if="item.newnum !== 0">
						<view class="read-text" v-if="item.newnum > 99">99+</view>
						<view class="read-text" v-else>{{item.newnum}}</view>
					  </view>
					  <image
					      class="head_icon"
						  :src="item.profile[1].Value"
						  mode="scaleToFill"
					  />
					  <view class="online"></view>
				  </view>
				  <view class="message_content">
                     <view class="message_body">
						 <view class="nick_name u-line-1">{{item.profile[0].Value}}</view>
						 <view v-if="item.content[0].MsgType==='TIMTextElem'" class="message_text u-line-1">{{item.content[0].MsgContent.Text}}</view>
					 </view>
					 <view class="message_time">
						 {{ getcaculateTimeago(item.MsgTime) }}
					 </view>
				  </view>
			  </view>
		  </view>	
		 </scroll-view>	
          <view v-if="this.sessionItemList.length == 0" class="temporarily_box">
			<image
				class="temporarily_icon"
				src="@/static/demand/defaulticon.png"
				mode="scaleToFill"
			/>
			<view class="temporarily_text">暂无数据</view>
		</view>
		</view>
	</view>
</template>

<script>
import { chatListaction } from '@/api/message.js'
import { mapState } from "vuex";
import { caculateTimeago } from '@/utils/common';
	export default {
		data() {
			return {
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
		onLoad(options) {
		  this.getChatListaction()
		},
		methods: {
		  // 获取会话列表
		  getChatListaction() {
			  this.sessionAugments = {
					id: 'teacher_1',
					StartIndex: 0,
					TimeStamp: 0
				}
			  chatListaction(this.sessionAugments).then((res)=>{
				  console.log('回话列表', res)
				  this.sessionItemList = res.data.SessionItem
			  })
			  .catch((err)=>{
				  console.log('列表错误的消息', err)
			  })
		  },
		  //  时间戳转换 
		  getcaculateTimeago(item) {
            return caculateTimeago(item*1000)
		  },
		  // 跳转到聊天详情
		  handlechatpage() {
			uni.navigateTo({ url: '/subpkg/pages/chatpage/chatpage' })
		  },
		  //  下拉刷新
		  async reachBottom() {
				if (this.has_next) {
					this.orderPar.page = this.orderPar.page + 1;
					const res = await orderList(this.orderPar);
					console.log("res新数据", res);
					this.triggered = false;
					this.has_next = res.has_next;
					res.data.map((item) => {
					this.orderList.push(item);
					});
					if (this.orderList.length === 0) {
					  this.defaultshow = true;
					  this.has_next = "";
					} else {
					  this.defaultshow = false;
					}
				} else {
				}
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
