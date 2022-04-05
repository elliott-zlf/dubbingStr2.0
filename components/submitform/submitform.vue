<template>
  <view class="home_demand_box">
     <l-file ref="lFile" @up-success="onSuccess"></l-file>
    <view class="home_title_slogan_box">
      <image
        class="slogan_icon"
        src="@/static/home/lefticon.png"
        mode="scaleToFill"
      />
      <text class="title_slogan">填写需求，极速试音</text>
      <image
        class="slogan_icon"
        src="@/static/home/righticon.png"
        mode="scaleToFill"
      />
    </view>
    <view v-if="subTitle" class="subtitle"
      >从<text class="subtitle_color">500+</text>优质配音师中为您<text
        class="subtitle_color"
        >精准匹配</text
      ></view
    >
    <view class="home_from_box">
      <view class="requirementsbox">
        <!-- <view class="label_text">
          <text class="subtitle_color">*</text>
          <text>要求</text>
        </view> -->
        <!-- #ifndef MP-ALIPAY -->
        <picker
          mode="multiSelector"
          @columnchange="bindMultiPickerColumnChange"
          @change="handleChange"
          :value="multiIndex"
          :range="multiArray"
          range-key="value"
        >
          <view class="drop_down_select_box">
            <view class="drop_down_box" style="text-align:left;">
              <text class="tagtext" v-if="!themeValue">选择题材</text>
              <text v-else class="drop_down_text">{{themeValue}}</text>
              <image
                class="drop_down_img"
                src="@/static/home/drop-down.png"
                mode="scaleToFill"
              />
            </view>
            <view class="drop_down_box" style="text-align: center;">
              <text class="tagtext" v-if="!sexValue">选择性别</text>
              <text v-else class="drop_down_text">{{sexValue}}</text>
              <image
                class="drop_down_img"
                src="@/static/home/drop-down.png"
                mode="scaleToFill"
              />
            </view>
            <view class="drop_down_box" style="text-align: right;">
              <text class="tagtext" v-if="!styleValue">选择预算</text>
              <text v-else class="drop_down_text">{{styleValue}}</text>
              <image
                class="drop_down_img"
                src="@/static/home/drop-down.png"
                mode="scaleToFill"
              />
            </view>
          </view>
          <!-- <view class="uni-input">{{multiArray[0][multiIndex[0]]}}，{{multiArray[1][multiIndex[1]]}}，{{multiArray[2][multiIndex[2]]}}</view> -->
        </picker>
        <!-- #endif -->
      </view>
      <view class="home_textbox margintop10">
        <!-- <view class="label_text">
          <text class="subtitle_color">*</text>
          <text>文本</text>
        </view> -->
        <view class="home_textarea_box">
          <view class="textarea_box">
            <textarea
              class="textareainput"
              v-model="form.audition_text"
              :disable-default-padding="true"
              placeholder="输入20~200字的试音文本，\r\n 或直接从手机微信的聊天文件中上传文稿"
              maxlength="200"
              placeholder-class="textarea-placeholder"
              @input="handleInputEvents"
            />
          </view>
          <view class="statistical_box">
            <view class="textarea_num">
              <text>{{ textareanum }}</text>
              <text>/200</text>
            </view>
            <view class="home_upload_box">
              <view v-if="fileShow" class="home_upload_hot" @click="onUpload('file')">
                <view class="home_upload">上传</view>
              </view>
              <view
                v-else
                class="upload_successful_box"
                @click="handleDeleteFile('file')"
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
      <view class="note_box margintop10">
        <!-- <view class="label_text">
          <text>备注</text>
        </view> -->
        <view class="note_text_conten">
          <view class="note_text_box">
            <input
              v-model="form.content"
              class="note_text"
              type="text"
              placeholder="输入配音要求，或直接上传参考样音"
              placeholder-class="textarea-placeholder"
            />
          </view>
          <view class="home_upload_box">
            <view v-if="musicShow" class="home_upload_hot" @tap="onUpload('music')">
                <view class="home_upload">上传</view>
            </view>
            <view v-else class="upload_successful_box" @click="handleDeleteFile('music')">
              <image
                class="deletefile_img"
                src="@/static/home/deletefile.png"
                mode="scaleToFill"
              />
              <image
                class="successful_img"
                src="@/static/home/mp3icon.png"
                mode="scaleToFill"
              />
            </view>
          </view>
        </view>
      </view>
      <view class="home_submit_box">
        <button v-if="!phoneStatus" class="invitationBtn submit_btn" open-type="getPhoneNumber" @getphonenumber="onGetPhoneNumber">1秒匹配5人试音</button>
        <view v-else class="submit_btn" @tap="submit">1秒匹配5人试音</view>
      </view>
      <view v-if="bottomTitle" class="submit_remind">配音师会在10分钟内快速出试音</view>
    </view>
  </view>
</template>

<script>
import { homeTag,demandPublish,profileUpdate,urlIndex } from '@/api/index.js'
// 引入需求详情api
import { getphone } from "@/api/myneeds.js"
import { mapState, mapActions } from "vuex";
export default {
  name: "submitform",
  props: {
	  subTitle: {
		type: Boolean,
		required: true  
	  },
	  btnText: {
		  type: String,
		  required: '立即匹配 配音师试音'
	  },
    bottomTitle: {
      type: Boolean,
      required: false
    },
    teachrID: {
      type: String,
		  required: ''
    }
  },
  data() {
    return {
      texterheight: "70",
      form: {
        tag_data: {
          '2': '',
          '1': '',
          '6': ''
        },
        audition_text: '',
        audition_url: '',
        content: '',
        content_url: '',
        teacher_id: ''
      },
      themeValue: '',
      sexValue: '',
      styleValue: '',
      multiArray: [],
      multiIndex: [0, 0, 0],
      textareanum: 0,
      fileShow: true,
      musicShow: true,
      subjectShow: false,
      uploaditem: '',
      submittime: true,
      dataCode: '',
    };
  },
  created() {
    this.getTagAll()
  },
  beforeMount() {
		    uni.login({
				provider: "weixin",
				success: async (result) => {
            console.log('这里走了几次')
						this.dataCode = result.code
            this.getTagAll()
					},
					fail: (error) => {
					console.log("登录失败", error);
					},
				});
	},
  computed: {
    ...mapState("user", ["token","userId","phoneStatus"]),
  },
  methods: {
     ...mapActions("user", ['getIphoneStatus']),
    // 获取标签列表
    getTagAll() {
      homeTag().then((res)=>{
        console.log('标签列表数据',res)
        let themeArray=[]
        let sexArray = []
        let styleArray= []
        res.data.map((item)=>{
           if(item.value==="题材") {
              themeArray=item.tags
           }else if(item.value==="性别") {
              sexArray=item.tags
           }else if (item.value==="预算"){
              styleArray=item.tags
           }
        })
        this.multiArray = [themeArray,sexArray,styleArray]
        // this.form.tag_data={
        //   '2': themeArray[0].id,
        //   '1': sexArray[0].id,
        //   '5': styleArray[0].id
        // }
      })
    },
    // 计算输入框的字数
    handleInputEvents() {
      this.textareanum = this.form.audition_text.length;
    },
    // 提交订单
    submit() {
      if (!this.submittime) {
         return;
      }
      if (this.form.tag_data[2] === '') {
         uni.showToast({
						title: "请先选择【题材、性别、预算】才能进行匹配",
						icon: 'none',
						mask: true,
						duration: 2000
				});
      } else if(this.form.audition_text=='' && this.form.audition_url=='') {
          uni.showToast({
						title: "请输入20字以上的试音文本，\r\n或直接上传文稿",
						icon: 'none',
						mask: true,
						duration: 2000
				});
      }else if(this.form.audition_url=='' && this.form.audition_text !=='' && this.form.audition_text.length < 20){
        uni.showToast({
						title: "请输入20字以上的试音文本，\r\n或直接上传文稿",
						icon: 'none',
						mask: true,
						duration: 2000
				});
      } else {
          const formData = {
            "audition_text": this.form.audition_text.substr(0,200),
            "audition_url": this.form.audition_url,
            "content": this.form.content,
            "content_url": this.form.content_url,
            "teacher_id": this.teachrID,
            "tag_data":  this.form.tag_data,
          }
          this.submittime = false
          demandPublish(formData).then((res)=>{
            this.submittime = true
            this.fileShow = true
            this.musicShow = true
            this.form.audition_text=''
            this.form.audition_url=''
            this.form.content=''
            this.form.content_url = ''
            this.form.teacher_id = ''
            this.form.tag_data = {'2': '','1': '','6': ''},
            this.themeValue = ''
            this.sexValue = ''
            this.styleValue = ''
            urlIndex({demand_id:res.data}).then((res)=>{
                console.log('生成页面短链', res)
            })
            this.$emit('submitShow')
            uni.navigateTo({
              url: '/subpkg/pages/transitions/transitions?id='+ res.data+'&status=0',
            });
          }).catch(err=>{
            this.submittime = true
            console.log(err)
          })
      }
    },
    // 获取手机号
     onGetPhoneNumber(e){  
				console.log('微信小程序id', e, this.phonebb,this.phoneNumber)
				if(!e.detail.cloudID){       //用户决绝授权  
					uni.showToast({
						title: "请先授权手机号\r\n，否则无法试音哦",
						icon: 'none',
						mask: true,
						duration: 2000
					});
				}else{     
					//允许授权
					var data = {
						iv: e.detail.iv,
						code: this.dataCode,
						encryptedData: e.detail.encryptedData 
					}
					 getphone(data).then((res)=>{
							console.log('手机号请求数据', res.data)
							const userobj = {
								nickname: '',
								userId: '',
								avatar: '',
								phone: res.data
							}
							profileUpdate(userobj).then((res)=>{
                this.getIphoneStatus().then(res=>{
                  console.log(res)
                })
								this.submit()
							})
							this.confirmPopShow = true
							}).catch((err)=>{
							console.log('手机号请求数据', err)
						})
					// var  sessionkeys = uni.getStorageSync('sessionkey');
					// console.log('手机号请求数据', sessionkeys)
					// let pc = new WXBizDataCrypt('wx61103192dd39156f',sessionkey);      //wxXXXXXXX为你的小程序APPID 
					// let data = pc.decryptData(e.detail.encryptedData , e.detail.iv);
                    // console.log('手机号请求数据', e)
					// uni.setStorage({
					// 	key: 'phoneNum',
					// 	data: data.phoneNumber,
					// });
				}  
			},
    // 上传文件
    handleUploadFile() {

    },
	  // 删除文件事件
    handleDeleteFile(item) {
      if(item==='file') {
        this.fileShow = true;
      }else {
        this.musicShow = true;
      }
    },
	  // 选择框的值
    bindMultiPickerColumnChange(e) {
      console.log(
        "修改的列为：" + e.detail.column + "，值为：" + e.detail.value
      );
	  // this.multiIndex[e.detail.column] = e.detail.value
	  // switch (e.detail.column) {
		//   case 0:
		// 	  this.form.tag_data['2'] = this.multiArray[e.detail.column][e.detail.value].id
    //     this.themeValue = this.multiArray[e.detail.column][e.detail.value].value
		// 	  break;
	  //     case 1:
    //     this.form.tag_data['1'] = this.multiArray[e.detail.column][e.detail.value].id
    //     this.sexValue = this.multiArray[e.detail.column][e.detail.value].value
		// 	  break;
		//   case 2:
    //     this.form.tag_data['5']= this.multiArray[e.detail.column][e.detail.value].id
    //     this.styleValue = this.multiArray[e.detail.column][e.detail.value].value
		//   default:
		// 	  break;
	  // }
	  // console.log('选择数据的值', this.form)
	  // this.$forceUpdate()
    },
    handleChange(e) {
       this.form.tag_data['2'] = this.multiArray[0][e.detail.value[0]].id
       this.themeValue = this.multiArray[0][e.detail.value[0]].value
       this.form.tag_data['1'] = this.multiArray[1][e.detail.value[1]].id
       this.sexValue = this.multiArray[1][e.detail.value[1]].value
       this.form.tag_data['6']= this.multiArray[2][e.detail.value[2]].id
       this.styleValue = this.multiArray[2][e.detail.value[2]].value
    },
    // 更新text数据
    hadleUpdate() {
      if(!this.form.audition_text){
        this.form.audition_text='输入20-200字的试音文本，或直接上传文稿；';
        let timeId=setTimeout(()=>{
          this.form.audition_text='';
          clearTimeout(timeId);
        },50);
          }
    },
    handleSubjectValue(e) {
      this.form.subject = e[0].label;
    },
     /* 上传 */
		onUpload(item) { 
				let platform =  uni.getSystemInfoSync().platform
        if (platform == 'android' || platform == 'ios' || platform == 'devtools') {
          this.uploaditem = item
            this.$refs.lFile.upload({
              // #ifdef APP-PLUS
              // nvue页面使用时请查阅nvue获取当前webview的api，当前示例为vue窗口
              currentWebview: this.$mp.page.$getAppWebview(),
              // #endif
              url: "https://www.peiyinstreet.com/street/chat/uploadfile",
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
         if(this.uploaditem==='file') {
            this.fileShow = false;
            this.form.audition_url = res.data.data
         }else {
            this.musicShow = false;
            this.form.content_url = res.data.data
        }
				uni.showToast({
					title: '文件上传成功',
					icon: 'none'
				})
		},
  },
};
</script>
<style lang="scss">
.uni-textarea {
  width: 591.551rpx !important;
  height: 190.072px !important;
}
.uni-textarea-textarea {
  width: 591.551rpx !important;
  height: 190.072px !important;
}
.textarea-placeholder {
  font-size: 25.362rpx !important;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999 !important;
  line-height: 36.232rpx;
}
.textareainput {
  .u-input__textarea {
    // padding: 0px !important;
    height: 190.072rpx !important;
  }
  height: 190.072rpx !important;
  width: 591.551rpx !important;
  font-size: 25.362rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  line-height: 36.232rpx;
  color: #000000;
}
</style>
<style lang="scss">
// 提交需求样式
.home_demand_box {
  margin-left: 27.174rpx;
  width: 695.652rpx;
  height: 804.348rpx;
  background: #ffffff;
  border-radius: 25.362rpx;
  .home_title_slogan_box {
    padding-top: 36.232rpx;
    text-align: center;
    .slogan_icon {
      width: 32.609rpx;
      height: 18.116rpx;
    }
    .title_slogan {
      margin: 0 21.739rpx;
      width: 293.478rpx;
      height: 45.29rpx;
      font-size: 32.609rpx;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #000000;
      line-height: 45.29rpx;
    }
  }
  .subtitle {
    margin-top: 12.681rpx;
    text-align: center;
    height: 30.797rpx;
    font-size: 21.739rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #000000;
    line-height: 30.797rpx;
    .subtitle_color {
      color: #ff445a;
    }
  }
  .home_from_box {
    margin-top: 32.609rpx;
    .requirementsbox {
      display: flex;
      margin-left: 27.174rpx;
      width: 641.304rpx;
      height: 96.957rpx;
      align-items: center;
      background: #f1f3f7;
      border-radius: 6px;
      .label_text {
        width: 112.319rpx;
        height: 96.957rpx;
        text-align: center;
        line-height: 96.957rpx;
        font-size: 25.362rpx;
        color: #000000;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        .subtitle_color {
          color: #ff445a;
        }
      }
      .drop_down_select_box {
        display: flex;
        width: 641.304rpx;
        justify-content: space-between;
      }
      .drop_down_box {
        margin-right: 23.551rpx;
        position: relative;
        width: 33%;
        text-align: center;
        height: 57.971rpx;
        line-height: 57.971rpx;
        // background: #ffffff;
        border-radius: 28.986rpx;
        .tagtext {
          margin-left: 23.551rpx;
          font-size: 25.362rpx;
          color: #999999;
        }
        .drop_down_text {
          margin-left: 23.551rpx;
          font-size: 25.362rpx;
          // font-weight: 500;
          color: #000000;
        }
        .drop_down_img {
          // position: absolute;
          // top: 50%;
          // transform: translate(-50%, -50%);
          // right: 18.116rpx;
          margin-left: 9.058rpx;
          width: 12.681rpx;
          height: 12.681rpx;
        }
      }
    }
    .home_textbox {
      margin-left: 27.174rpx;
      display: flex;
      width: 641.304rpx;
      height: 288.043rpx;
      background: #f1f3f7;
      border-radius: 10.87rpx;
      .label_text {
        margin-top: 25.362rpx;
        width: 112.319rpx;
        text-align: center;
        font-size: 25.362rpx;
        color: #000000;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        .subtitle_color {
          color: #ff445a;
        }
      }
      .home_textarea_box {
        width: 641.304rpx;
        padding: 0 23.551rpx;
        height: 190.072rpx;
        .textarea_box {
          margin-top: 25.362rpx;
          width: 591rpx;
          height: 190.072rpx;
        }
        /* #ifdef H5 */
        .textarea_box {
          margin-top: 25.362rpx;
          width: 591rpx;
          height: 190.072rpx;
        }
        /* #endif */
        .statistical_box {
          margin-top: 20rpx;
          display: flex;
          justify-content: space-between;
          .textarea_num {
            width: 63.406rpx;
            height: 30.797rpx;
            font-size: 21.739rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #999999;
            line-height: 30.797rpx;
          }
          .home_upload_box {
            width: 76.087rpx;
            width: 138rpx;
            text-align: right;
            // margin-right: 18.116rpx;
            .home_upload_hot {
               width: 138rpx;
               height: 54.348rpx;
               display: flex;
               justify-content: flex-end;
               .home_upload {
                  text-align: center;
                  font-size: 21.739rpx;
                  font-family: PingFangSC-Regular, PingFang SC;
                  font-weight: 400;
                  color: #999999;
                  width: 76.087rpx;
                  height: 36.232rpx;
                  border-radius: 19.928rpx;
                  border: 1.812rpx solid #c8c8c8;
                }
            }
            .upload_successful_box {
              position: relative;
              display: inline-block;
              width: 100%;
              height: 36.232rpx;
              .successful_img {
                width: 46.232rpx;
                height: 46.232rpx;
              }
              .deletefile_img {
                position: absolute;
                top: -7rpx;
                right: -7rpx;
                width: 18.116rpx;
                height: 18.116rpx;
              }
            }
          }
        }
      }
    }
    .note_box {
      display: flex;
      margin-left: 27.174rpx;
      width: 641.304rpx;
      height: 96.957rpx;
      align-items: center;
      background: #f1f3f7;
      border-radius: 6px;
      .label_text {
        width: 112.319rpx;
        height: 96.957rpx;
        text-align: center;
        line-height: 96.957rpx;
        font-size: 25.362rpx;
        color: #000000;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        .subtitle_color {
          color: #ff445a;
        }
      }
      .note_text_conten {
        padding: 0 23.551rpx;
        width: 641.304rpx;
        display: flex;
        justify-content: space-between;
      }
      .note_text_box {
        width: 508.159rpx;
        // padding-left: 23.551rpx;
      }
      .home_upload_box {
        width: 138rpx;
        text-align: right;
        // margin-right: 18.116rpx;
        .home_upload_hot {
            width: 138rpx;
            height: 54.348rpx;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            .home_upload {
              text-align: center;
              font-size: 21.739rpx;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #999999;
              width: 76.087rpx;
              height: 36.232rpx;
              border-radius: 19.928rpx;
              border: 1.812rpx solid #c8c8c8;
            }
        }
        .upload_successful_box {
          position: relative;
          display: inline-block;
          width: 136rpx;
          .successful_img {
            width: 49.232rpx;
            height: 46.232rpx;
          }
          .deletefile_img {
            position: absolute;
            top: -7rpx;
            right: -7rpx;
            width: 18.116rpx;
            height: 18.116rpx;
          }
        }
      }
    }
    .home_submit_box {
      margin-top: 39.362rpx;
      text-align: center;
      .submit_btn {
        display: inline-block;
        text-align: center;
        width: 623.188rpx;
        height: 86.957rpx;
        background: #ff445a;
        letter-spacing: 2rpx;
        border-radius: 43.478rpx;
        font-size: 32.609rpx;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
        line-height: 86.957rpx;
      }
    }
  }
}
.submit_remind {
  margin-top: 30.797rpx;
  text-align: center;
  font-size: 21.739rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
}
.margintop10 {
  margin-top: 25.116rpx;
}
</style>
