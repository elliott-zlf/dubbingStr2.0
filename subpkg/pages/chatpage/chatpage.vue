<template>
<view class="container">
 <u-navbar
	:is-back="true"
	:title="conversationName"
	title-size="36.232rpx"
	title-color="#000000"
	:border-bottom="false"
	:background="background"
	back-icon-color="#000000"
	:custom-back="goBack"
 >
   <view slot="right">  
	 <view class="homeye">
		<button  class="invitationBtn" open-type="contact" send-message-title="" :show-message-card="true"> 
			<image
				class="homeye_img"
				src="@/static/home/kefu.png"
				mode="scaleToFill"
			/>
		</button>
	 </view>	
   </view>
</u-navbar>
 <view class="notice" v-if="noticeShow">
    <u-notice-bar mode="vertical" :volume-icon="false" :autoplay="false" :duration="5000" bg-color="#FF445A" color="#FFFFFF" font-size="25.362rpx" :list="listtext"></u-notice-bar>
    <image
      class="closeicon"
      src="@/static/home/close.png"
      mode="scaleToFill"
      @click="handleclosenoticeShow"
    />
  </view>
  <view class="contents" :style="{bottom:keybottom + 'px'}">
    <view class="message-list content" @tap="triggerClose">
      <TUI-message-list  ref="messageList" id="message-list" :conversation="conversation"></TUI-message-list>
    </view>
    <view class="message-input" v-if="showChat">
      <TUI-message-input ref="messageInput"  id="message-input" :conversation="conversation" @sendMessage="sendMessage" @keybottm="handleKeybottom"></TUI-message-input>
    </view>
  </view>
</view>
</template>

<script>
import TUIMessageList from "@/components/chat/message-list/index";
import TUIMessageInput from "@/components/chat/message-input/index";
import { newsCount } from '@/api/message.js'
import { mapState } from "vuex";
export default {
  data() {
    return {
      conversationName: '',
      conversation: {},
      messageList: [],
      isShow: false,
      showChat: true,
      keybottom: 0,
      conversationID: '',
      videoMessage: {},
	  //  自定义数据
	  listtext: [
			'请勿交换个人联系方式或私下联系！否则将会封号处罚！',
	  ],
	  background: {
		backgroundColor: '#ffffff',
	  },
	  noticeShow: true,
    };
  },

  components: {
    TUIMessageList,
    TUIMessageInput
  },
  props: {},
  created(){
  },
  computed: {
			...mapState("user", ["token","userId"]),

	},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取会话列表的ID
    const {
      conversationID
    } = options;
    this.setData({
      conversationID
    });
    uni.$TUIKit.getConversationProfile(conversationID).then(res => {
      const {
        conversation
      } = res.data;
	    console.log('会话列表数据', conversation)
      this.conversation = conversation
      this.setData({
        conversationName: this.getConversationName(conversation),
      });
    });
  },
  onShow() {
    console.log('进入页面')
  },
  onUnload() {
   console.log('返回触发',this.conversationID)
   const _thia = this
   uni.$TUIKit.setMessageRead({
      conversationID: this.conversationID
    }).then(() => {
      newsCount({userId:this.userId}).then((res)=>{
				const allMsg = res.data.AllC2CUnreadMsgNum + ''
				if (allMsg=='0') {
					 uni.removeTabBarBadge({
						index: 2
					})
				} else {
					uni.setTabBarBadge({
						index: 2,
						text: allMsg
					})
				}
			})
    });
  },
  methods: {
    getConversationName(conversation) {
      if (conversation.type === '@TIM#SYSTEM') {
        this.setData({
          showChat: false
        });
        return '系统通知';
      }

      if (conversation.type === 'C2C') {
        return conversation.remark || conversation.userProfile.nick || conversation.userProfile.userID;
      }

      if (conversation.type === 'GROUP') {
        return conversation.groupProfile.name || conversation.groupProfile.groupID;
      }
    },
    handleKeybottom(eh) {
      this.keybottom = eh
    },
    sendMessage(event) {
      // 将自己发送的消息写进消息列表里面
      this.$refs.messageList.updateMessageList(event.detail.message);
    },

    triggerClose() {
      if(this.showChat) {
        this.$refs.messageInput.handleClose();
      }
    },

    goBack() {
      const pages = getCurrentPages(); // 当前页面栈
      if (pages[pages.length - 2].route === 'pages/TUI-Conversation/create-conversation/create' || pages[pages.length - 2].route === 'pages/TUI-Group/create-group/create' || pages[pages.length - 2].route === 'pages/TUI-Group/join-group/join') {
        uni.navigateBack({
          delta: 2
        });
      } else {
        uni.navigateBack({
          delta: 1
        });
      }

      uni.$TUIKit.setMessageRead({
        conversationID: this.conversationID
      }).then(() => {});
      newsCount({userId:this.userId}).then((res)=>{
        console.log('res.data.AllC2CUnreadMsgNum',res.data.AllC2CUnreadMsgNum )
				const allMsg = res.data.AllC2CUnreadMsgNum + ''
				if (allMsg=='0') {
					 uni.removeTabBarBadge({
						index: 2
					})
				} else {
					uni.setTabBarBadge({
						index: 2,
						text: allMsg
					})
				}
			})
    },
	// 关闭通知
	handleclosenoticeShow() {
		this.noticeShow = false
	}
  }
};
</script>
<style>
.invitationBtn {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	/* justify-content: space-between; */
	background: #FFFFFF !important;
	border: none;
	padding: 0 !important;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
}
.invitationBtn::after {
  border: none !important;
}
@import "./chat.css";
</style>
<style lang="scss">
@import "@/static/css/style.scss"; 
.contents {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}
</style>
