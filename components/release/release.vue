<template>
	<view class="container_res">
		<view class="content">
		  <l-file ref="lFile" @up-success="onSuccess"></l-file>	
            <view class="home_title_slogan_box">
				<image
					class="slogan_icon"
					src="@/static/home/lefticon.png"
					mode="scaleToFill"
				/>
				<text class="title_slogan">{{btnText}}</text>
				<image
					class="slogan_icon"
					src="@/static/home/righticon.png"
					mode="scaleToFill"
				/>
			</view>
		  <view class="release_form">
              <view class="form_item">
                    <!-- <input
					   v-if="editor"
						v-model="form.content"
						:disabled="!editor"
						class="note_text1"
						style="text-align:left"
						type="text"
						placeholder="输入配音要求，或注意事项"
						placeholder-class="textarea-placeholder"
					/> -->
					<textarea
					    v-if="editor"
						class="note_text_pading "
						v-model="form.content"
						:disabled="!editor"
						:disable-default-padding="true"
						placeholder="输入配音要求，或注意事项"
						:maxlength="-1"
						placeholder-class="textarea-placeholder"
					/>
				  <div v-if="!editor" class="input_text_box">
					  {{form.content}}
				  </div>
			  </view>
			  <view class="form_item">
				   <view class="home_textarea_box">
                    <view class="textarea_box">
						   <textarea
							class="textareainput"
							v-model="form.audition_text"
							:disabled="!editor"
							:disable-default-padding="true"
							placeholder="输入配音正文，或直接从手机微信的聊天文件中上传稿件"
							:maxlength="-1"
							placeholder-class="textarea-placeholder"
							@input="handleInputEvents"
						   />
					</view>
					<view class="statistical_box">
						<view class="home_upload_box">
							<view
							    v-for="(item,index) in form.audition_url"
                                :key="index"
								class="upload_successful_box"
								@click="editor ? handleDeleteFile(index) : ''"
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
							<view v-if="form.audition_url.length <= 2 && editor" class="home_upload_hot" @click="onUpload('file')">
								<image
									class="add_icon"
									src="@/static/coupons/tianjia.png"
									mode="scaleToFill"
								/>
							</view>
						</view>
						<view class="textarea_num">
						  <text>{{ textareanum }}</text>
						</view>
					</view>
					</view>
			  </view>
			  <view class="form_item">
				   <view class="item_title">终稿字数</view>
                   <input
				        v-model="form.draft_word_count"
						:disabled="!editor"
						class="note_text"
						type="number"
						placeholder="输入终稿字数，便于生成报价"
						placeholder-class="textarea-placeholder"
					/>
			  </view>
			  <view v-if="editor" class="form_item" @click="onUpload()">
				<view v-if="form.filename" class="item_title">参考样音</view>
				<view v-if="!form.filename" class="item_title">参考样音（选填）</view>
				<view v-if="form.filename == ''" class="note_textplaceholder textarea-placeholder">从微信聊天文件中选择</view>
				<view v-else class="note_text u-line-1">{{form.filename}}</view>
				 <view class="event_view">
					<image
						class="rightarr"
						src="@/static/coupons/rightarr.png"
						mode="scaleToFill"
					/>
				</view>
			  </view>
			  <view v-else class="form_item">
				<view class="item_title">参考样音</view>
				<view v-if="form.filename == ''"  :disabled="!editor" class="note_textplaceholder textarea-placeholder">从微信聊天文件中选择</view>
				<view v-else class="note_text u-line-1">{{form.filename}}</view>
				 <view class="event_view">
					<image
						class="rightarr"
						src="@/static/coupons/rightarr.png"
						mode="scaleToFill"
					/>
				</view>
			  </view>
			  <view v-if="srstatus" class="form_item" style="display: flex; justify-content: space-between;">
				<view class="item_title"><span class="red_span" style="color:#FF445A;margin-left: -12rpx;">*</span>跳过试音直接录制</view>
				<u-switch style="margin-right: 23.551rpx;" class="sr_status" v-model="form.sr_status" active-color="#FF445A" inactive-color="#E5E5E5"></u-switch>
			  </view>
		  </view>
		</view>
		<view class="release_btnbox" v-if="submitbtnS">
			 <button v-if="!phoneStatus" class="invitationBtn release_btn" open-type="getPhoneNumber" @getphonenumber="onGetPhoneNumber">发布需求</button>
			 <view v-else class="release_btn" @tap="submit">
			   {{resBtn}}
			 </view>
		</view>
	</view>
</template>

<script>
import { homeTag,demandPublish,profileUpdate,urlIndex } from '@/api/index.js'
import { getphone } from "@/api/myneeds.js"
import { mapState, mapActions } from "vuex";
	export default {
		props: {
			subTitle: {
				type: Boolean,
				defaul: true  
			},
			srstatus: {
			    type: Boolean,
				defaul: false
			},
			btnText: {
				type: String,
				default: '填写需求，按样录制'
			},
			resBtn: {
				type: String,
				default: '提交'
			},
			bottomTitle: {
				type: Boolean,
				default: false
			},
			teachrID: {
			    type: String,
				default: ''
			},
			demandID: {
                type: String,
				default: ''
			},
			serviceId: {
			   type: String,
			   default: ''
			},
			status: {
				type: Number,
				default: 0
			},
			data: {
				type: Object,
				default: () =>{
					return {}
				}
			},
			payment: {
			  type: Boolean,
			  default: false
			},
			submitbtnS: {
			  type: Boolean,
			  default: true
			},
			editor: {
			  type: Boolean,
			  default: true
			},
		},
		data() {
			return {
			  background: '#FFF5E9',
			  form: {
				status: 0,  
                content: '',
				audition_text: '',
				audition_url: [],
				draft_word_count: Number,
				budget: null,
				discuss: false,
				filename: '',
				tag_data: {
				'2': '',
				'1': '',
				'5': ''
				},
				content_url: '',
				teacher_id: '',
				service_id: '',
				demand_id: '',
				work_id: null,
				sr_status: false
			  },
			  // pickView
			  multiArray: [],
              multiIndex: [0, 0, 0],
			  textareanum: 0,
			  fileShow: true,
			  // 题材、性别、预算
			  themeValue: '',
			  sexValue: '',
			  styleValue: '',
			  dataCode: '',
			  // 防止提交多次
			  submittime: true
			};
		},
		watch:{
			data: {
				handler(val) {
			     this.handleAssignment()
				},
				deep: true,
			}
		},
		created() {
		   console.log('每次都会走这里吗')
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
					}else if (item.value==="风格"){
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
			handlertextarea() {
				this.form.audition_text = '0'
				setTimeout(()=>{
				this.form.audition_text = ''
                this.form.content = ''
				this.form.audition_text = ''
				this.form.draft_word_count = '',
				this.form.budget = null,
				this.form.discuss = false,
				this.form.tag_data = {
				'2': '',
				'1': '',
				'5': ''
				},
				this.form.sr_status = false
				this.fileShow = true
				},50)
			},
			handleAssignment() {
				console.log('传到发布页面的数据', this.data)
				if (JSON.stringify(this.data) !== "{}") {
					// 修改需求赋值
					this.form = {
							status: this.data.status || 0, 
							content: this.data.content || '',
							audition_text: this.data.audition_text || '',
							audition_url: this.data.audition_url_escape || '',
							draft_word_count: this.data.draft_word_count || '',
							budget: this.data.budget || null,
							discuss: this.data.discuss || false,
							filename: this.data.filename || '',
							tag_data: this.data.tags || {'2': '','1': '','5': ''},
							content_url: this.data.content_url_escape || '',
							teacher_id: this.data.teacher_id || '',
							service_id: this.data.service_id || '',
							demand_id: this.data.demand_id || '',
							work_id: this.data.work_id || null,
							sr_status: false
						}
						this.form.work_id = this.data.work_id || null
					if (this.form.audition_text) {	
						this.textareanum = this.form.audition_text.length;
					}
				} else {
				}
			},
			bindMultiPickerColumnChange(e) {
				console.log(
					"修改的列为：" + e.detail.column + "，值为：" + e.detail.value
				);
			},
			// 选择框展示的值
			handleChange(e) {
				this.form.tag_data['2'] = this.multiArray[0][e.detail.value[0]].id
				this.themeValue = this.multiArray[0][e.detail.value[0]].value
				this.form.tag_data['1'] = this.multiArray[1][e.detail.value[1]].id
				this.sexValue = this.multiArray[1][e.detail.value[1]].value
				this.form.tag_data['5']= this.multiArray[2][e.detail.value[2]].id
				this.styleValue = this.multiArray[2][e.detail.value[2]].value
			},
			// 计算输入框的字数
			handleInputEvents() {
			  this.textareanum = this.form.audition_text.length;
			},
			 // 提交订单
			submit() {
				console.log('走这里了吗')		
				if (!this.submittime) {
					return;
				}
				this.submittime = false
				demandPublish(this.form).then((res)=>{
					console.log('code等于多少', res.errcode)
					this.submittime = true
					if (res.errcode ===1) {
						uni.showToast({
						title: res.errmsg,
						icon: 'none',
						mask: true,
						duration: 2000
						});
					} else {
						this.fileShow = true
						this.musicShow = true
						// this.form = {
						// 	status: 0,  
						// 	content: '',
						// 	audition_text: '',
						// 	audition_url: '',
						// 	draft_word_count: '',
						// 	budget: null,
						// 	discuss: false,
						// 	filename: '',
						// 	tag_data: {
						// 	'2': '',
						// 	'1': '',
						// 	'5': ''
						// 	},
						// 	content_url: '',
						// 	teacher_id: '',
						// 	service_id: '',
						// 	demand_id: ''
						// },
						// urlIndex({demand_id:res.data}).then((res)=>{
						//   console.log('生成页面短链', res)
						// })
						this.$emit('submitShow')
						if (res.cate===1) {
							if (!this.payment) {
								uni.navigateTo({
								url: '/subpkg/pages/payment/payment?id='+ res.data+'&status=0&teacher_id='+res.count,
								});
						    }
						} else {
							urlIndex({demand_id:res.data}).then((res)=>{
								console.log('生成页面短链', res)
							})
							uni.navigateTo({
								url: '/subpkg/pages/demanddetails/demanddetails?id='+ res.data+'&status=0',
							})
						}
						
					}
				}).catch((err)=>{
					this.submittime = true
					console.log(err)
				})
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
							}).catch((err)=>{
							console.log('手机号请求数据', err)
						})
				}  
			},
			 // 删除文件事件
			handleDeleteFile(index) {
				this.form.audition_url.splice(index,1)
			},
			// 选择优惠卷
			handleCheckboxchange(item) {
				console.log("选中的优惠卷", item);
				this.form.budget = null
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
					this.form.audition_url.push(res.data.data)
				}else {
					this.musicShow = false;
					console.log('上传成功回调文件名称', this.form,res.fileName)
					this.form.filename = res.fileName
					this.form.content_url = res.data.data
				}
				uni.showToast({
					title: '文件上传成功',
					icon: 'none'
				})
			},
		}
	}
</script>
<style>
page {
  height: 100%;
  overflow: hidden;
  width: 100%;
}
.u-checkbox__label {
	margin-right: 0px !important;
}
.textarea-placeholder {
    font-size: 28.986rpx !important;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400 !important;
	color: #999999 !important;
}
</style>
<style lang="scss" scoped>
.container_res {
	height: 100%;
	background: #FFFFFF;
	.content {
		.home_title_slogan_box {
			height: 117.754rpx;
			display: flex;
			align-items: center;
			justify-content: center;
            border-bottom: 1px solid #F4F4F4;
			.slogan_icon {
			  width: 32.609rpx;
			  height: 18.116rpx;
			}
			.title_slogan {
				margin: 0 21.739rpx;
				height: 45.29rpx;
				font-size: 32.609rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #000000;
				line-height: 45.29rpx;
			}
		}
		.release_form {
		  background: #FFFFFF;	
		  .form_item {
              display: flex;
			  align-items: center;
			  width: 100%;
			  min-height: 108.696rpx;
			  border-bottom: 1px solid #F4F4F4;
			  .input_text_box {
				flex: 1;
				margin: 0px 27.174rpx;
				padding-top: 18.116rpx;
				overflow: auto;
				text-align: left;
				height: 122.464rpx;
				font-size: 28.986rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #000000;
			  }
			  .note_text1 {
				flex: 1;
				margin: 0px 27.174rpx;  
				text-align: left;
				font-size: 28.986rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #000000;
			  }
			  .note_text_pading {
				flex: 1;
				margin: 0px 27.174rpx;
				padding-top: 18.116rpx;
				text-align: left;
				height: 122.464rpx;
				font-size: 28.986rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #000000;
			  }
			  .note_text {
				flex: 1;
				margin: 0px 27.174rpx;
				text-align: right;
				font-size: 28.986rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #000000;
			  }
			  .note_textplaceholder {
				flex: 1;
				margin: 0px 27.174rpx;
				text-align: right;
			  }
			  .placeholder_text {
				  flex: 1;
				  margin: 0px 27.174rpx;
				  text-align: right;
				  font-size: 28.986rpx;
				  font-family: PingFangSC-Regular, PingFang SC;
				  font-weight: 400;
				  color: #999999;
			  }
			  .item_title {
				  margin-left: 27.174rpx;
				  font-size: 28.986rpx;
				  font-family: PingFangSC-Regular, PingFang SC;
				  font-weight: 400;
				  color: #666666;
			  }
			  .picker_view {
				  flex: 1;
			  }
			  .event_view {
				  margin-right: 27.174rpx;
				  display: flex;
				  align-items: center;
				  .event_text {
					font-size: 28.986rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #000000;
				  }
				  .rightarr {
					width: 12.681rpx;
					height: 25.362rpx;	
				  }
			  }
			  .home_textarea_box {
				width: 100%;
				padding: 0 23.551rpx;
				.textarea_box {
					margin-top: 25.362rpx;
					height: 190.072rpx;
					.textareainput {
						width: 100%;
						height: 100%;
						font-size: 28.986rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #000000;
					}
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
				padding-bottom: 36.232rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.textarea_num {
					width: 63.406rpx;
					font-size: 28.986rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					text-align: right;
					color: #999999;
				}
				.home_upload_box {
					// width: 76.087rpx;
					// width: 138rpx;
					text-align: right;
					display: flex;
					// margin-right: 18.116rpx;
					.home_upload_hot {
						// width: 138rpx;
						height: 64.348rpx;
						display: flex;
						justify-content: flex-end;
					.add_icon {
                      width: 64.348rpx;
					  height: 64.348rpx;
					}
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
						width: 66.232rpx;
						height: 66.232rpx;
						margin-right: 10px;
					}
					.deletefile_img {
						position: absolute;
						top: -7rpx;
						right: 16rpx;
						width: 18.116rpx;
						height: 18.116rpx;
					}
					}
				}
				}
			  }
		  }
		}
        .form_item {
              display: flex;
			  align-items: center;
			  background: #FFFFFF;
			  width: 100%;
			  min-height: 108.696rpx;
			  border-bottom: 1px solid #F4F4F4;
			  .note_text {
				flex: 1;
				margin: 0px 27.174rpx;
				text-align: right;
				font-size: 28.986rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #000000;
			  }
			  .note_textplaceholder {
				flex: 1;
				margin: 0px 27.174rpx;
				text-align: right;
			  }
			  .item_title {
				  margin-left: 27.174rpx;
				  font-size: 28.986rpx;
				  font-family: PingFangSC-Regular, PingFang SC;
				  font-weight: 400;
				  color: #666666;
			  }
			  .event_view {
				  margin-right: 27.174rpx;
				  display: flex;
				  align-items: center;
				  .event_text {
					font-size: 28.986rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #000000;
				  }
				  .rightarr {
					width: 12.681rpx;
					height: 25.362rpx;	
				  }
			  }
		}
	}
	.release_btnbox {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		margin-top: 70.739rpx;
		.release_btn {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 579.71rpx;
			height: 90.58rpx;
			background: #FF445A;
			border-radius: 50.725rpx;
            font-size: 32.609rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
		}
	}
}
</style>
