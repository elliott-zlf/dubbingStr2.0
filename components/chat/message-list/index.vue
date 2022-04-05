<template>
    <scroll-view 
		class="msg-list"
		scroll-y="true"
		:refresher-enabled="true"
		:scroll-top="scrollTop"
		:scroll-into-view="scrollToView"
		:refresher-triggered="triggered"
		@refresherrefresh="refresh"
		upper-threshold="50"
	>
		<view class="row" v-for="(item,index) in messageList" :key="index" :id="item.ID">
			<!-- 用户消息 -->
			<block v-if="conversation.type !== '@TIM#SYSTEM'">
				<view class="system">
					<!-- 文字消息 -->
					<view v-if="index%6==0" class="text">
						{{getcaculateTimeago(item.time) || '刚刚'}}
					</view>
				</view>
				<!-- 自己发出的消息 -->
				<view :class="item.flow==='out'? 'my':'other'">
					<!-- 左-头像 -->
					<view v-if="item.flow==='in'" class="left">
						<image :src="item.avatar"></image>
					</view>
					<!-- 左-消息 -->
					<view :class="item.flow==='out'? 'left':'right'">
						<!-- 文字消息 -->
						<TUI-TextMessage v-if="item.type === 'TIMTextElem'" :message="item" :isMine="item.flow==='out'"></TUI-TextMessage>
						<TUI-CustomMessage v-if="item.type === 'TIMCustomElem'" :message="item" :isMine="item.flow==='out'"></TUI-CustomMessage>
						<!-- 领取红包消息 -->
					</view>
					<!-- 右-头像 -->
					<view v-if="item.flow==='out'" class="right">
						<image :src="item.avatar"></image>
					</view>
				</view>
				<view class="system">
				  <view v-if="item.payload.data=='demand'" class="red-envelope">
					【平台提醒】先填写请求报价单，配音效率会更高哦
				  </view>
				</view>
			</block>
		</view>
	</scroll-view>
</template>

<script>
  import TUITextMessage from "../message-elements/text-message/index";
  import TUICustomMessage from "../message-elements/custom-message/index";
  import TUISystemMessage from "../message-elements/system-message/index";
  import TUIFileMessage from "../message-elements/file-message/index";
  import { caculateTimeago } from '@/utils/common';
  export default {
    data() {
      return {
        avatar: '',
        userID: '',
        // 当前会话
        messageList: [],
        // 自己的 ID 用于区分历史消息中，哪部分是自己发出的
        scrollView: '',
        scrollTop: 0,
        triggered: false,
        nextReqMessageID: '',
        // 下一条消息标志
        isCompleted: false, // 当前会话消息是否已经请求完毕
        // 滚动动画
        scrollAnimation:false,
        scrollToView: ''
      };
    },
    components: {
      TUITextMessage,
      TUICustomMessage,
      TUISystemMessage,
      TUIFileMessage
    },
    props: {
      conversation: {
        type: Object,
        default: () => {}
      }
    },
    watch: {
      conversation: {
        handler: function (newVal) {
          console.log('传过来的值', newVal)
          if (!newVal.conversationID) return;
          this.setData({
            conversation: newVal
          }, () => {
            this.getMessageList(newVal);
          });
        },
        immediate: true,
        deep: true
      }
    },
    mounted() {
      uni.$TUIKit.getMyProfile().then(res => {
        this.avatar = res.data.avatar;
        this.userID = res.data.userID;
      });
      uni.$TUIKit.on(uni.$TUIKitEvent.MESSAGE_RECEIVED, this.$onMessageReceived, this);
      uni.$TUIKit.on(uni.$TUIKitEvent.MESSAGE_READ_BY_PEER, this.$onMessageReadByPeer, this);
    },

    destroyed() {
      // 一定要解除相关的事件绑定
      uni.$TUIKit.off(uni.$TUIKitEvent.MESSAGE_RECEIVED, this.$onMessageReceived);
    },
    methods: {
      refresh() {
        this.triggered = true
        this._freshing = true	 
        if (this.isCompleted) {
          this.setData({isCompleted: true,});
          setTimeout(() => {
              this.triggered = false
              this._freshing = false
              }, 1000);
              return;
          }
          this.getMessageList(this.conversation);
            setTimeout(() => {
              this.triggered = false
              this._freshing = false
          }, 1000);
      },
       //  时间戳转换 
	  getcaculateTimeago(item) {
		  return caculateTimeago(item * 1000);
	  },
    // 获取配音师消息
    getMessageList(conversation) {
        if (!this.isCompleted) {
          uni.$TUIKit.getMessageList({
            conversationID: conversation.conversationID,
            nextReqMessageID: this.nextReqMessageID,
            count: 15
          }).then(res => {
            console.log('配音师列表数据', res, res.data.isCompleted)
            const {
              messageList
            } = res.data; // 消息列表。
            this.nextReqMessageID = res.data.nextReqMessageID; // 用于续拉，分页续拉时需传入该字段。
            this.isCompleted = res.data.isCompleted; // 表示是否已经拉完所有消息。
            this.messageList = [...messageList, ...this.messageList];
            this.$handleMessageRender(this.messageList, messageList);
            //这段代码很重要，不然每次加载历史数据都会跳到顶部
            this.$nextTick(function() {
              if (res.data.messageList.length === 0) {
                  return;
              } else {
                  this.scrollToView = res.data.messageList[res.data.messageList.length-1].ID;//跳转上次的第一行信息位置
              }
            });
          });
        }
      },

      // 自己的消息上屏
      updateMessageList(msg) {
        this.messageList = [...this.messageList, msg]
        this.scrollToButtom(msg)
      },

      // 消息已读更新
      $onMessageReadByPeer() {
        this.setData({
          messageList: this.messageList
        });
      },
      scrollToButtom(msg) {
        //这段代码很重要，不然每次加载历史数据都会跳到顶部
        this.$nextTick(function() {
          if (msg.ID) {
            this.scrollToView = msg.ID;//跳转上次的第一行信息位置
            this.$nextTick(function() {
            this.scrollAnimation = true;//恢复滚动动画
            });
          } else {
            this.scrollToView = msg.data[msg.data.length-1].ID;//跳转上次的第一行信息位置
            this.$nextTick(function() {
            this.scrollAnimation = true;//恢复滚动动画
            });	
          }
        });
      },
      // 收到的消息
      $onMessageReceived(value) {
        // 若需修改消息，需将内存的消息复制一份，不能直接更改消息，防止修复内存消息，导致其他消息监听处发生消息错误
        const event = value;
        const list = [];
        event.data.forEach(item => {
          if (item.conversationID === this.conversation.conversationID) {
            list.push(Object.assign(item));
          }
        });
        this.messageList = this.messageList.concat(list);
        this.scrollToButtom(value)
      },

      // 历史消息渲染
      $handleMessageRender(messageList) {
        if (messageList.length > 0) {
          this.setData({
            messageList,
          }, () => {});
          this.$nextTick(() => {
            //进入页面滚动到底部
		       	console.log('走这里了吗')
            this.scrollTop = 99999;
          });
        }
      },
    }
  };
</script>
<style>
    @import "./index.css";
</style>
