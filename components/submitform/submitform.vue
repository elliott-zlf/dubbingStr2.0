<template>
  <view class="home_demand_box">
    <view class="home_title_slogan_box">
      <image
        class="slogan_icon"
        src="@/static/home/lefticon.png"
        mode="scaleToFill"
      />
      <text class="title_slogan">填写需求，免费试音</text>
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
        <view class="label_text">
          <text class="subtitle_color">*</text>
          <text>要求</text>
        </view>
        <!-- #ifndef MP-ALIPAY -->
        <picker
          mode="multiSelector"
          @columnchange="bindMultiPickerColumnChange"
          :value="multiIndex"
          :range="multiArray"
          range-key="label"
        >
          <view class="drop_down_select_box">
            <view class="drop_down_box">
              <text class="drop_down_text">{{
                multiArray[0][multiIndex[0]].label
              }}</text>
              <image
                class="drop_down_img"
                src="@/static/home/drop-down.png"
                mode="scaleToFill"
              />
            </view>
            <view class="drop_down_box">
              <text class="drop_down_text">{{
                multiArray[1][multiIndex[1]].label
              }}</text>
              <image
                class="drop_down_img"
                src="@/static/home/drop-down.png"
                mode="scaleToFill"
              />
            </view>
            <view class="drop_down_box">
              <text class="drop_down_text">{{
                multiArray[2][multiIndex[2]].label
              }}</text>
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
        <view class="label_text">
          <text class="subtitle_color">*</text>
          <text>文本</text>
        </view>
        <view class="home_textarea_box">
          <view class="textarea_box">
            <textarea
              class="textareainput"
              v-model="form.text"
              :disable-default-padding="true"
              placeholder="输入20-200字的试音文本，或直接上传文稿；"
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
              <view v-if="fileShow" class="home_upload">上传</view>
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
      <view class="note_box margintop10">
        <view class="label_text">
          <text>备注</text>
        </view>
        <view class="note_text_box">
          <input
            class="note_text"
            type="text"
            placeholder="输入其他要求或上传参考样音"
            placeholder-class="textarea-placeholder"
          />
        </view>
        <view class="home_upload_box">
          <view v-if="fileShow" class="home_upload"  @click="handleUploadFile">上传</view>
          <view v-else class="upload_successful_box" @click="handleDeleteFile">
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
      <view class="home_submit_box">
        <view class="submit_btn" @click="submit">立即匹配 配音师试音</view>
      </view>
      <view v-if="bottomTitle" class="submit_remind">配音师会在10分钟内快速出试音</view>
    </view>
  </view>
</template>

<script>
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
  },
  data() {
    return {
      texterheight: "70",
      form: {
        subject: "题材",
        sex: "性别",
        style: "风格",
        text: "",
      },
      multiArray: [
        [
          {
            value: "0",
            label: "题材",
          },
          {
            value: "1",
            label: "促销广告",
          },
          {
            value: "2",
            label: "柔和甜美",
          },
        ],
        [
          {
            value: "0",
            label: "性别",
          },
          {
            value: "1",
            label: "男",
          },
          {
            value: "2",
            label: "女",
          },
          {
            value: "2",
            label: "男女组合",
          },
        ],
        [
          {
            value: "0",
            label: "风格",
          },
          {
            value: "1",
            label: "促销广告",
          },
          {
            value: "2",
            label: "柔和甜美",
          },
        ],
      ],
      multiIndex: [0, 0, 0],
      textareanum: 0,
      fileShow: false,
      subjectShow: false,
    };
  },
  created() {
    console.log("走这里了吗");
    this.getUnionid();
  },
  computed: {
    ...mapState("user", ["token", "userInfo"]),
  },
  methods: {
    ...mapActions("user", ["login"]),
    //  获取用户token
    getUnionid() {
      uni.login({
        provider: "weixin",
        success: async (result) => {
          await this.login(result.code);
          // this.getAllteacher()
        },
        fail: (error) => {
          console.log("登录失败", error);
        },
      });
    },
    // 计算输入框的字数
    handleInputEvents() {
      this.textareanum = this.form.text.length;
    },
    // 上传文件
    handleUploadFile() {

    },
	  // 删除文件事件
    handleDeleteFile() {
      this.fileShow = true;
    },
	  // 选择框的值
    bindMultiPickerColumnChange(e) {
    //   console.log(
    //     "修改的列为：" + e.detail.column + "，值为：" + e.detail.value
    //   );
	  this.multiIndex[e.detail.column] = e.detail.value
	  switch (e.detail.column) {
		  case 0:
			  this.form.subject = this.multiArray[e.detail.column][e.detail.value].label
			  break;
	      case 1:
              this.form.sex = this.multiArray[e.detail.column][e.detail.value].label
			  break;
		  case 2:
              this.form.style = this.multiArray[e.detail.column][e.detail.value].label
		  default:
			  break;
	  }
	  console.log('选择数据的值', this.form)
	  this.$forceUpdate()
    },
	// 更新text数据
	hadleUpdate() {
		if(!this.form.text){
			this.form.text='输入20-200字的试音文本，或直接上传文稿；';
			let timeId=setTimeout(()=>{
				this.form.text='';
				clearTimeout(timeId);
			},50);
        }
	},
    handleSubjectValue(e) {
      console.log("题材的值", e);
      this.form.subject = e[0].label;
    },
  },
};
</script>
<style lang="scss">
.uni-textarea {
  width: 523.551rpx !important;
  height: 190.072px !important;
}
.uni-textarea-textarea {
  width: 523.551rpx !important;
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
  width: 523.551rpx !important;
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
      height: 86.957rpx;
      align-items: center;
      background: #f1f3f7;
      border-radius: 6px;
      .label_text {
        width: 112.319rpx;
        height: 86.957rpx;
        text-align: center;
        line-height: 86.957rpx;
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
      }
      .drop_down_box {
        margin-right: 18.116rpx;
        position: relative;
        width: 155.797rpx;
        height: 57.971rpx;
        line-height: 57.971rpx;
        background: #ffffff;
        border-radius: 28.986rpx;
        .drop_down_text {
          margin-left: 18.116rpx;
          width: 110rpx;
          font-size: 21.739rpx;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #000000;
        }
        .drop_down_img {
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          right: 18.116rpx;
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
        width: 523.551rpx;
        height: 190.072rpx;
        .textarea_box {
          margin-top: 25.362rpx;
          width: 523.551rpx;
          height: 190.072rpx;
        }
        /* #ifdef H5 */
        .textarea_box {
          margin-top: 25.362rpx;
          width: 523.551rpx;
          height: 190.072rpx;
        }
        /* #endif */
        .statistical_box {
          margin-top: 10rpx;
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
            text-align: right;
            margin-right: 18.116rpx;
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
            .upload_successful_box {
              position: relative;
              display: inline-block;
              width: 36.232rpx;
              height: 36.232rpx;
              .successful_img {
                width: 36.232rpx;
                height: 36.232rpx;
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
      height: 86.957rpx;
      align-items: center;
      background: #f1f3f7;
      border-radius: 6px;
      .label_text {
        width: 112.319rpx;
        height: 86.957rpx;
        text-align: center;
        line-height: 86.957rpx;
        font-size: 25.362rpx;
        color: #000000;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        .subtitle_color {
          color: #ff445a;
        }
      }
      .note_text_box {
        width: 431.159rpx;
      }
      .home_upload_box {
        width: 76.087rpx;
        text-align: right;
        margin-right: 18.116rpx;
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
        .upload_successful_box {
          position: relative;
          display: inline-block;
          width: 36.232rpx;
          height: 36.232rpx;
          .successful_img {
            width: 36.232rpx;
            height: 36.232rpx;
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
      margin-top: 25.362rpx;
      text-align: center;
      .submit_btn {
        display: inline-block;
        text-align: center;
        width: 623.188rpx;
        height: 86.957rpx;
        background: #ff445a;
        border-radius: 43.478rpx;
        font-size: 28.986rpx;
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
  margin-top: 18.116rpx;
}
</style>
