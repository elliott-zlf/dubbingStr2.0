<template>
  <view class="tui-cards-container pys_popup" v-if="display">
    <view class="popup_conent requestObject">
        <image
          class="closeicon"
          src="@/static/home/close.png"
          mode="scaleToFill"
          @click="handleClose"
        />
    <view>
    <view style="height:17.971rpx"></view>	
    <view class="popup_title">
        <view class="title_left">请求对象</view>
        <view class="title_right">
          <image
            class="headPortrait"
            :src="conversation.userProfile.avatar"
            mode="scaleToFill"
          />
          <text class="nick_name">{{conversation.userProfile.nick}}</text>
        </view>
    </view>
    <view class="view_conten">
        <view class="textarea_box">
          <textarea
            class="textareainput"
            v-model="form.title"
            :disable-default-padding="true"
            placeholder="请输入录制成品时的详细要求；按照试音的感觉录 或其他注意事项"
            maxlength="200"
            placeholder-class="textarea-placeholder"
          />
        </view>
        <view class="manuscripts_box">
            <textarea
            class="textareainput_text"
            v-model="form.description"
            :disable-default-padding="true"
            placeholder="输入2000字以内的成品文本，或直接上传"
            maxlength="2000"
            placeholder-class="textarea-placeholder"
            @input="handleInputEvents"
          />
          <view class="statistical_box">
            <view class="textarea_num">
            <text>{{ textareanum }}</text>
            <text>/2000</text>
            </view>
            <view class="home_upload_box">
            <view v-if="form.url===''" class="home_upload" @click="onUpload">上传</view>
            <view
              v-else
              class="upload_successful_box"
              @click="handleDeleteFile"
            >
              <image
                class="deletefile_img"
                src="@/static/home/deletefile.png"
                mode="scaleToFill"
              />
              <image
                class="successful_img"
                src="@/static/home/wordicon.png"
                mode="scaleToFill"
              />
            </view>
            </view>
          </view>
        </view>
      </view>
      <view class="submit_btn" :data-order="form" @tap.stop="sendMessage">
          提交
      </view>
        <view class="prompt_box">
          <view class="prompt_text"><text class="round"></text>您提交后，配音师会在2h内做出报价</view>
          <view class="prompt_text"><text class="round"></text>您支付后，配音师会在规定时限内交付成品</view>
        </view>
      </view>
    </view>
    <l-file ref="lFile" :logo="logo" @up-success="onSuccess"></l-file>
  </view>
</template>

<script>
export default {
  data() {
    return {
      words: '',
      textareanum: 0,
      // 新增参数
			form: {
					title: '',
					description: '',
          url: '',
			},
      fileShow: true,
    };
  },

  components: {},
  props: {
    display: {
      type: Boolean,
      default: false
    },
    conversation: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    display: {
      handler: function (newVal) {
        // this.setData({
        //   display: newVal
        // });
      },
      immediate: true
    },
    conversation: {
      handler: function (newVal) {
        this.setData({
          conversation: newVal
        });
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    handleClose() {
      this.$emit('close', {
        detail: {
          key: '0'
        }
      });
    },
    // 计算输入框的字数
			handleInputEvents() {
       console.log('-------------++++++',this.conversation) 
			this.textareanum = this.form.description.length;
			},
    // 删除上传文件
    handleDeleteFile() {
      this.form.url = ''
    },
    // 发送消息
    sendMessage(e) {
      const {
        order
      } = e.currentTarget.dataset;
      if(this.form.title=='' && this.form.description=='') {
         uni.showToast({
						title: "请先输入录制成品时的详细要求哦",
						icon: 'none',
						mask: true,
						duration: 3000
				});
      }else if(this.form.url=='' && this.form.title !=='' && this.form.description.length < 20){
        uni.showToast({
						title: "请输入20字以上的成品文本，或直接上传文稿",
						icon: 'none',
						mask: true,
						duration: 3000
				});
      }else {
        this.$emit('sendCustomMessage', {
          detail: {
            payload: {
              // data 字段作为表示，可以自定义
              data: 'offer',
              description: order.description,
              // 获取骰子点数
              extension: JSON.stringify({
                title: order.title,
                imageUrl: order.description,
                url: order.url
              })
            }
          }
       });
      }
    },
    /* 上传 */
			onUpload(item) { 
				let platform =  uni.getSystemInfoSync().platform
        if (platform == 'android' || platform == 'ios' || platform == 'devtools') {
					this.forUploading = item
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
						// body参数直接写key,value,如：
						// formData: 'value1',
						// key2: 'value2',
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
				// if (this.forUploading==='new') {
				// 	this.worksItem.works.push({title:res.fileName, id: res.data.data})
				// } else {
				//     this.worksItem.works.push({title:res.fileName, id: res.data.data})
				// }
        console.log('上传成功回调',JSON.stringify(res), res);
        this.form.url = res.data.data
				uni.showToast({
					title: '文件上传成功',
					icon: 'none'
				})
			},
  }
};
</script>
<style>
@import "./index.css";
</style>
