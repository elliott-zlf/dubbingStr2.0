<template>
<view>
<view class="TUI-message-input-container">
    <view class="TUI-commom-function">
        <view v-for="(item, index) in commonFunction" :key="index" class="TUI-commom-function-item" :data-function="item" @tap="handleCommonFunctions">{{item.name}}</view>
    </view>
    <view class="TUI-message-input">
        <view v-if="!isAudio" class="TUI-message-input-main">
            <input class="TUI-message-input-area" :adjust-position="true" cursor-spacing="20" v-model="inputText" @input="onInputValueChange" maxlength="140" type="text"  placeholder-class="input-placeholder" placeholder="新消息..." @focus="inputBindFocus" @blur="inputBindBlur">
        </view>
        <view class="send" :class="isVoice?'hidden':''" @tap="sendTextMessage">
              <view class="btn">发送</view>
        </view>
    </view>
    <view class="place_view"></view>
    <TUI-Order-List class="tui-cards" :display="displayOrderList" :conversation="conversation" @sendCustomMessage="$handleSendCustomMessage" @close="$handleCloseCards"></TUI-Order-List>
</view>
<l-file ref="lFile" :logo="logo" @up-success="onSuccess"></l-file>
</view>
</template>

<script>
import TUIEmoji from "../message-elements/emoji/index";
import TUIOrderList from "../message-private/order-list/index";

export default {
  data() {
    return {
      // todo  conversation
      // conversation: {},
      inputText: '',
      extensionArea: false,
      sendMessageBtn: false,
      isAudio: false,
      bottomVal: 0,
      startPoint: 0,
      popupToggle: false,
      isRecording: false,
      canSend: true,
      text: '按住说话',
      title: ' ',
      notShow: false,
      isShow: true,
      recordTime: 0,
      recordTimer: null,
      commonFunction: [{
        name: '请求报价',
        key: '0'
      }, {
        name: '发送文件',
        key: '1'
      }],
      displayCommonWords: false,
      displayOrderList: false
    };
  },

  components: {
    TUIEmoji,
    TUIOrderList
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
        // todo 值会被改变
        // this.setData({
        //   conversation: newVal
        // });
      },
      immediate: true,
      deep: true
    }
  },

  beforeMount() {
  },

  methods: {

    handleCommonFunctions(e) {
      switch (e.target.dataset.function.key) {
        case '0':
          this.setData({
            displayOrderList: true
          });
          break;

        case '1': 
          this.onUpload()
          break;

        default:
          break;
      }
    },

    appendMessage(e) {
      this.setData({
        inputText: this.inputText + e.detail.message,
        sendMessageBtn: true
      });
    },

    getToAccount() {
      if (!this.conversation || !this.conversation.conversationID) {
        return '';
      }

      switch (this.conversation.type) {
        case 'C2C':
          return this.conversation.conversationID.replace('C2C', '');

        case 'GROUP':
          return this.conversation.conversationID.replace('GROUP', '');

        default:
          return this.conversation.conversationID;
      }
    },

    sendTextMessage(msg, flag) {
      const to = this.getToAccount();
      console.log('发送的消息内容to', to)
      const text = flag ? msg : this.inputText;
      const message = uni.$TUIKit.createTextMessage({
        to,
        conversationType: this.conversation.type,
        payload: {
          text
        }
      });
      this.setData({
        inputText: '',
        sendMessageBtn: false
      });
      this.$sendTIMMessage(message);
    },

    onInputValueChange(event) {
      if (event.detail.value) {
        this.setData({
          sendMessageBtn: true
        });
      } else {
        this.setData({
          sendMessageBtn: false
        });
      }
    },

    $handleSendCustomMessage(e) {
      console.log('发送的消息内容', e)
      const message = uni.$TUIKit.createCustomMessage({
        to: this.getToAccount(),
        conversationType: this.conversation.type,
        payload: e.detail.payload
      });
      this.$sendTIMMessage(message);
      this.setData({
        displayOrderList: false
      });
    },

    $handleCloseCards(e) {
      switch (e.detail.key) {
        case '0':
          this.setData({
            displayOrderList: false
          });
          break;

        default:
          break;
      }
    },

    $sendTIMMessage(message) {
      this.$emit('sendMessage', {
        detail: {
          message
        }
      });
      uni.$TUIKit.sendMessage(message)
      this.setData({
        displayFlag: ''
      });
    },

    handleClose() {
      this.setData({
        displayFlag: ''
      });
    },
    inputBindFocus() {
      console.log("占位：函数 inputBindFocus 未声明");
    },
    inputBindBlur() {
      console.log("占位：函数 inputBindBlur 未声明");
    },
     /* 上传 */
		onUpload() { 
				let platform =  uni.getSystemInfoSync().platform
        if (platform == 'android' || platform == 'ios' || platform == 'devtools') {
					this.$refs.lFile.upload({
						// #ifdef APP-PLUS
						// nvue页面使用时请查阅nvue获取当前webview的api，当前示例为vue窗口
						currentWebview: this.$mp.page.$getAppWebview(),
						// #endif
						url: "https://www.peiyinstreet.com/business/chat/upload", //替换为你的
						name: 'file',
						header: {  //根据你接口需求自定义
						userToken: this.token || ''	
						},
						formData: {
						fileName: '',
						},
					});
				}else {
					uni.showToast({
						title: "微信小程序仅支持从手机端上传",
						icon: 'none',
						mask: true,
						duration: 3000
					});
				}	
			},
			onSuccess(res) {
        console.log('上传成功回调',JSON.stringify(res), res);
        const size = this.formatFileSize(res.size)
        this.$handleSendCustomMessage({detail: {
            payload: {
              // data 字段作为表示，可以自定义
              data: 'file',
              description: res.fileName,
              // 获取骰子点数
              extension: JSON.stringify({
                fileName: res.fileName,
                size: size,
                url: res.data.data
              })
            }
        }})
				uni.showToast({
					title: '文件上传成功',
					icon: 'none'
				})
			},
     formatFileSize(fileSize) {
      if (fileSize < 1024) {
          return fileSize + 'B';
      } else if (fileSize < (1024*1024)) {
          var temp = fileSize / 1024;
          temp = temp.toFixed(2);
          return temp + 'KB';
      } else if (fileSize < (1024*1024*1024)) {
          var temp = fileSize / (1024*1024);
         temp = temp.toFixed(2);
         return temp + 'MB';
     } else {
         var temp = fileSize / (1024*1024*1024);
         temp = temp.toFixed(2);
         return temp + 'GB';
     }
   }
  }
};
</script>
<style>
@import "./index.css";
</style>
