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
		 <scroll-view 
		   v-if="conversationList.length !== 0"
		   class="session_item_scroll"
		   scroll-y
		>
			 <view class="session_item_box">
			  <view v-for="(item,index) in conversationList" :key="index" class="item_list" @tap="handleRoute(item.conversationID)">
				  <view class="head_img_box">
					  <view class="message_num" v-if="item.unreadCount !== 0">
						<view class="read-text" v-if="item.unreadCount > 99">99+</view>
						<view class="read-text" v-else>{{item.unreadCount}}</view>
					  </view>
					  <image
					      class="head_icon"
						  :src="item.userProfile.avatar"
						  mode="scaleToFill"
					  />
					  <!-- 在线状态 <view class="online"></view> -->
				  </view>
				  <view class="message_content">
                     <view class="message_body">
						 <view class="nick_name u-line-1">{{item.userProfile.nick}}</view>
						 <view class="message_text u-line-1">{{ setConversationAvatarHandler(item) }}</view>
					 </view>
					 <view class="message_time">
						 {{ getcaculateTimeago(item.lastMessage.lastTime) }}
					 </view>
				  </view>
			  </view>
		  </view>	
		 </scroll-view>	
          <view v-if="conversationList.length == 0" class="temporarily_box">
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
import { mapState } from "vuex";
import { caculateTimeago } from '@/utils/common';
	export default {
		data() {
			return {
				conversationList: [],
				conversation: {},
				showSelectTag: false,
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
			// 登入后拉去会话列表
			this.getConversationList();
			uni.$TUIKit.on(uni.$TUIKitEvent.CONVERSATION_LIST_UPDATED, this.onConversationListUpdated);
		},

		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload() {
			uni.$TUIKit.off(uni.$TUIKitEvent.SDK_READY, this.onConversationListUpdated);
		},
		methods: {
		handleRoute(id) {
			console.log('会话的ID是多少和userID',id,this.userId,this)
			// this.App.getNewsCount(userId)
			const url = `/subpkg/pages/chatpage/chatpage?conversationID=${id}`;
			uni.navigateTo({
				url
			});
			},
			// 对话列表更新
			onConversationListUpdated(event) {
			this.setData({
				conversationList: event.data
			});
		},
            // 请求列表数据
			getConversationList() {
			uni.$TUIKit.getConversationList().then(imResponse => {
				console.log('聊天的列表数据列表数据',imResponse)
				this.setData({
				conversationList: imResponse.data.conversationList
				});
			});
			},
			// 判断自定义文件类型
			setConversationAvatarHandler(item) {
				if (item.lastMessage.type === 'TIMTextElem') {
					return item.lastMessage.payload.text;
				}

				if (item.lastMessage.type === 'TIMCustomElem') {
					if (item.lastMessage.payload.data==="offer") {
						return "[请求报价单] " + item.lastMessage.payload.description
					} else if(item.lastMessage.payload.data==="file"){
						return "[文件] " + item.lastMessage.payload.description
					} else if(item.lastMessage.payload.data==="works"){
						return "[作品] " + item.lastMessage.payload.description
					}else if(item.lastMessage.payload.data==="finished"){
						return "[成品] " + item.lastMessage.payload.description
					}else if(item.lastMessage.payload.data==="demand"){
						return "[我的需求] " + item.lastMessage.payload.description
					}else if(item.lastMessage.payload.data==="order"){
						return "[配音报价单] " + item.lastMessage.payload.description
					}
				}
				if (item.lastMessage.type === 'GROUP') {
					return conversation.groupProfile.avatar || "";
				}
			},
		  //  时间戳转换 
		  getcaculateTimeago(item) {
            return caculateTimeago(item*1000)
		  }
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
