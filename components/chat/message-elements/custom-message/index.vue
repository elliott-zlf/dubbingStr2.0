<template>
<view>
  <!-- 配音报价单 -->
  <view v-if="renderDom[0].type ==='order'" class="bubble quotation_paid" @tap="handleJumpDetails(renderDom[0].demand_id,1)">
    <view class="quotation_title">
      <view class="quotation_logo_box">
        <image
          class="quotation_logo"
          src="@/static/messge_icon/dingdan.png"
          mode="scaleToFill"
        />
      </view>
      <view class="title_box">
        <text class="text u-line-1">配音师报价</text>
      </view>
      <view class="btn_box">
        <view v-if="renderDom[0].pay_state===0" class="unpaid_btn">待支付</view>
        <view v-if="renderDom[0].pay_state===1" class="paid_btn">已支付</view>
      </view>
    </view>
    <view class="quotation_conten">
      <view class="order_title u-line-1">{{renderDom[0].title}}</view>
      <view class="order_details">
        <view class="order_left">
          <text>订单金额：</text>
          <text>{{renderDom[0].price}}元</text>
        </view>
        <view class="order_right">
          <text>交付时限：</text>
          <text>{{renderDom[0].delivery}}h</text>
        </view>
      </view>
    </view>
  </view>
  <!-- 请求报价 -->
  <view v-if="renderDom[0].type ==='offer'" class="bubble quotation_paid" @click="handleOfferDetails(renderDom[0])">
    <view class="quotation_title">
      <view class="quotation_logo_box">
        <image
            class="quotation_logo"
          src="@/static/messge_icon/baojia.png"
          mode="scaleToFill"
        />
      </view>
      <view class="title_box">
        <text class="text u-line-1">请求报价</text>
      </view>
    </view>
    <view class="quotation_conten">
      <view class="demand_text_box">
        <view class="demand_title">要求：</view>
        <view class="demand_text u-line-1">{{renderDom[0].title}}</view>
      </view>
      <view class="demand_text_box">
        <view class="demand_title">文本：</view>
        <view class="demand_text u-line-2">{{renderDom[0].description}}</view>
      </view>
    </view>
  </view>
  <!-- 发送文件 -->
  <view v-if="renderDom[0].type==='file'" class="bubble quotation_paid">
    <view class="quotation_title">
      <view class="quotation_logo_box">
        <image
            class="quotation_logo"
          src="@/static/messge_icon/wenjian.png"
          mode="scaleToFill"
        />
      </view>
      <view class="title_box">
        <text class="text u-line-1">文件</text>
      </view>
      <view class="btn_box" @click.stop="downloadcopy(renderDom[0].url,'下载链接已复制到剪贴板')">
        <image
            class="download_logo"
          src="@/static/messge_icon/xiazhai.png"
          mode="scaleToFill"
        />
      </view>
    </view>
    <view class="quotation_conten">
      <view class="order_title">{{renderDom[0].fileName}}</view>
      <view class="order_details">
        <view class="order_left">
          <text>{{formatFileSize(renderDom[0].size)}}</text>
        </view>
      </view>
    </view>
  </view>
  <!-- 我的需求 -->
  <view v-if="renderDom[0].type=='demand'" class="bubble quotation_paid" @tap="handleJumpDetails(renderDom[0].demand_id,0)">
    <view class="quotation_title">
      <view class="quotation_logo_box">
        <image
            class="quotation_logo"
          src="@/static/messge_icon/xuqiu.png"
          mode="scaleToFill"
        />
      </view>
      <view class="title_box">
        <text class="text u-line-1">我的需求</text>
      </view>
    </view>
    <view class="quotation_conten">
      <view class="demand_text_box">
        <view class="demand_title">要求：</view>
        <view class="demand_text u-line-1">{{renderDom[0].tags}}</view>
      </view>
      <view class="demand_text_box">
        <view class="demand_title">文本：</view>
        <view class="demand_text u-line-2">{{renderDom[0].audition_text}}</view>
      </view>
      <view class="demand_text_box">
        <view class="demand_title">备注：</view>
        <view class="demand_text u-line-1">{{renderDom[0].content}}</view>
      </view>
    </view>
  </view>
  <!-- 发送成品 -->
  <view v-if="renderDom[0].type=='finished'" class="bubble quotation_paid" @tap="handleJumpDetails(renderDom[0].demand_id,2)">
    <view class="quotation_title">
      <view class="quotation_logo_box">
        <image
            class="quotation_logo"
          src="@/static/messge_icon/chengpin.png"
          mode="scaleToFill"
        />
      </view>
      <view class="title_box">
        <text class="text u-line-1">成品</text>
      </view>
      <view class="btn_box">
        <image
            @tap="playVoice(renderDom[0].msg)"
            class="play_logo"
            :src="playMsgid == renderDom[0].msg.id ? playActive : play"
            mode="scaleToFill"
        />
        <image
            @click.stop="downloadcopy(renderDom[0].url,'下载链接已复制到剪贴板')"
            class="download_logo"
            src="@/static/messge_icon/xiazhai.png"
            mode="scaleToFill"
        />
        <view v-if="renderDom[0].state===0" class="unpaid_btn" style="margin-left: 43.478rpx;">已交付</view>
        <view v-if="renderDom[0].state===1" class="paid_btn" style="margin-left: 43.478rpx;">已验收</view>
      </view>
    </view>
    <view class="quotation_conten">
      <view class="order_title">{{renderDom[0].title}}</view>
      <view class="order_details">
        <view class="order_left">
          <text>{{renderDom[0].timelength}}</text>
        </view>
      </view>
    </view>
  </view>	
  <!-- 发送作品 -->
  <view v-if="renderDom[0].type=='works'" class="bubble quotation_paid">
    <view class="quotation_title">
      <view class="quotation_logo_box">
        <image
            class="quotation_logo"
            src="@/static/messge_icon/chengpin.png"
            mode="scaleToFill"
        />
      </view>
      <view class="title_box">
        <text class="text u-line-1">作品</text>
      </view>
      <view class="btn_box">
        <image
            @tap="playVoice(renderDom[0].msg)"
            class="play_logo"
            :src="playMsgid == renderDom[0].msg.id ? playActive : play"
            mode="scaleToFill"
        />
         <image
            @click.stop="downloadcopy(renderDom[0].url,'下载链接已复制到剪贴板')"
            class="download_logo"
            src="@/static/messge_icon/xiazhai.png"
            mode="scaleToFill"
        />
        <!-- <view v-if="true" class="paid_btn">已交付</view> -->
      </view>
    </view>
    <view class="quotation_conten">
      <view class="order_title">{{renderDom[0].fileName}}</view>
      <view class="order_details">
        <view class="order_left">
          <text>{{renderDom[0].timelength}}</text>
        </view>
      </view>
    </view>
  </view>
  <view v-if="renderDom[0].type ==='notSupport'" class="message-body-span text-message">
    <view class="message-body-span-text">{{renderDom[0].text}}</view>
  </view>
</view>
</template>

<script>
import uniCopy from "@/utils/uni-copy.js";
export default {
  data() {
    return {
      play: 'https://www.peiyinstreet.com/guidang/play.png',
			playActive: "https://www.peiyinstreet.com/guidang/palyActive.png",
      AUDIO:uni.createInnerAudioContext(),
      playMsgid: '',
      msg: {
          id: '1',
          url:'https://pyj2021.oss-cn-shanghai.aliyuncs.com/project/voice/2021/06/17/60cb0274e2843.mp3'
      },
      conversation: {}
    };
  },

  components: {
  },
  props: {
    message: {
      type: Object,
      default: () => {}
    },
    isMine: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    message: {
      handler: function (newVal) {
        this.setData({
          message: newVal,
          renderDom: this.parseCustom(newVal)
        });
      },
      immediate: true,
      deep: true
    }
  },
  updated() {
    this.AUDIO.stop();
    this.AUDIO.onEnded((res)=>{
				this.playMsgid=null;
			});
  },
  methods: {
    // 跳转配音师详情
    handleJumpDetails(id,type) {
      uni.redirectTo({ url: '/subpkg/pages/demanddetails/demanddetails?id='+id+'&status='+type })
    },
    parseCustom(message) {
      // 约定自定义消息的 data 字段作为区分，不解析的不进行展示
      // 配音报价单
      if (message.payload.data === 'order') {
        const extension = JSON.parse(message.payload.extension);
        const renderDom = [{
          type: 'order',
          name: 'custom',
          title: extension.title || '',
          price: extension.price || 0,
          delivery: extension.delivery,
					demand_id: extension.demand_id,
					pay_state: extension.pay_state
        }];
        return renderDom;
      } 
      // 请求报价
      if (message.payload.data === 'offer') {
        const extension = JSON.parse(message.payload.extension);
        const renderDom = [{
          type: 'offer',
          name: 'custom',
          title: extension.title || '',
          url: extension.url || '',
          description: extension.description,
          size: extension.size || ''
        }];
        return renderDom;
      } 
      // 发送文件
      if (message.payload.data === 'file') {
        const extension = JSON.parse(message.payload.extension);
        const renderDom = [{
          type: 'file',
          name: 'custom',
          fileName: extension.fileName || '',
          url: extension.url || '',
          size: extension.size || '',
          description: message.payload.description
        }];
        return renderDom;
      } 
      // 我的需求
      if (message.payload.data === 'demand') {
        const extension = JSON.parse(message.payload.extension);
        const renderDom = [{
          type: 'demand',
          name: 'custom',
          audition_text: extension.audition_text || '',
          content: extension.content || '',
          tags: extension.tags || '',
          demand_id: extension.demand_id || '',
          description: message.payload.description
        }];
        return renderDom;
      }
      // 我的作品
      if (message.payload.data === 'works') {
        const extension = JSON.parse(message.payload.extension);
        const renderDom = [{
          type: 'works',
          name: 'custom',
          fileName: extension.fileName || '',
          timelength: extension.timelength || '',
          demand_id: extension.demand_id || '',
          url: extension.url || '',
          state: extension.state,
          msg:extension.msg
        }];
        return renderDom;
      }
      // 我的成品
      if (message.payload.data === 'finished') {
        const extension = JSON.parse(message.payload.extension);
        const renderDom = [{
          type: 'finished',
          name: 'custom',
          title: extension.title || '',
          timelength: extension.timelength || '',
          demand_id: extension.demand_id || '',
          url: extension.url || '',
          state: extension.state,
          msg:extension.msg
        }];
        return renderDom;
      }

      return [{
        type: 'notSupport',
        text: '[自定义消息]'
      }];
    },
    // 复制
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
		},
    // 播放语音
    playVoice(msg){
      console.log(msg)
      if (this.playMsgid==msg.id) {
        // 
        this.$nextTick(function() {
        this.AUDIO.stop();
        this.playMsgid = null
        })
      } else {
        this.playMsgid = msg.id;
        console.log('djahdajshmsg', this.playMsgid,msg.id)
        this.AUDIO.src = msg.url;	
        this.$nextTick(function() {
          this.AUDIO.play();
        })
      }
    },
    // 配音报价展示流程
    handleOfferDetails(data) {
      uni.$emit("handlePopDetails", JSON.stringify(data))
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
