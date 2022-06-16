<template>
	<view class="container">
	  <view class="content">
		<scroll-view 
			class="voice_list" 
			scroll-y
			>
			<view v-if="currentStatus==0">
               <view  class="works_item" v-for="(item,index) in dataList" :key="index">
					<view class="play_item" @click="playTheMusic(item)">
						<image
							class="head_portrait_img"
							:src="item.teacher.avatar"
							mode="aspectFill"
						/>
						<image
							class="home_play"
							:src="item.works.playStatus ? playActive : play"
							mode="scaleToFill"
						/>
						<view class="head_portrait_meng"></view>
						<!-- 在线状态  -->
					  <view class="online"></view>
					</view>
					<view class="works_name_item" @click="handleVisitorsJump(item)">
						<view class="works_name u-line-1">{{item.works.title}}</view>
						<view class="works_style u-line-1">
							<span v-if="item.teacher.grade_text!=='无'">{{item.teacher.grade_text}}</span>
							<span v-if="item.teacher.grade_text!=='无'" style="margin-left:10rpx;margin-right:10rpx">|</span>
							<span>{{item.tags[0].value}}</span>
							<span style="margin-left:10rpx;margin-right:10rpx">|</span>
							<span>{{ transformsex(item.teacher.sex)}}</span>
							<!-- <span v-if="item.admin_price" style="margin-left:10rpx;margin-right:10rpx">|</span>
							<span>{{item.admin_price}}</span><span v-if="item.admin_price">元</span> -->
						</view>
						<view class="price_item">
							<view class="price_text">{{item.price_text}}</view>
							<view class="price_box">
								<view v-if="item.admin_price" class="price_num">
                                    <span>￥</span>
								    <span>{{item.admin_price}}</span>
								</view>
								<view v-else class="price_num">见稿报价</view>
							</view>
							<view v-if="item.admin_price" class="price_line_box">
								￥{{item.discount_price}}
                                <view class="price_line"></view>
							</view>
						</view>	
					</view>
					<view class="btn_item">
						<!-- <view class="voice_btn" v-if="order_status==0" @click="handlefirstTimeUseOrder(item)">下单</view> -->
						<!-- <view class="voice_btn" @click="handleUseOrder(item)">下单</view> -->
						<view class="voice_btn" @click="downloadcopySampleVoices(item,'复制样音信息成功')">复制</view> 
						<view class="voice_img_box" @click="handleOperation(item)">
                          <image
						    class="voice_img"
							src="@/static/my/caozuo.png"
							mode="scaleToFill"
						  />
						</view>
					</view>
				</view>
			</view>
			<view v-if="defaultshow" class="page_box">
				<view class="defaltPage">
					<image
						class="defaltPageimg"
						src="@/static/demand/defaulticon.png"
						mode="scaleToFill"
					/>
					<view class="defaltext">暂无数据，可点【人工客服】进行匹配</view>
				</view>
			</view>
			<view style="height:253.623rpx"></view>
		</scroll-view>
		<view class="shareBox">
			<view class="sharebtn">
                 <button
					class="invitationBtn"
					open-type="share"
					hover-class="button-hover"
				>
					分享给朋友	 
				</button>
			</view>
		</view>
	  </view>	
	  <view v-if="audioShow" class="home_musicSrc_box disappear">
        <musicAudio 
		  ref="musicAudio"
		  :url="dataPlay.works.url"
		  :autoplay="true"
		  :portrait="dataPlay.teacher.avatar"
		  :music_title="dataPlay.works.title"
		  @handleChangePlay="handleChangePlay"  
		  @musicClose="musicClose"
		  ></musicAudio>
	  </view> 
	  <u-popup v-model="submitShow" mode="bottom" height="1084.348rpx"  border-radius="24">
			<release 
			  ref="submitform"
			  :bottomTitle="true"
              :data="dataObj"
			  :subTitle="false"
			  :srstatus="true"
              :btnText="btnText"
			  @submitShow="getsubmitShow"
			  >
			</release>
	  </u-popup>
	  <u-popup v-model="collectShow" mode="bottom" border-radius="24">
		  <view class="collect_item" @click="handleUseOrder(item)">
			  <image
			      class="collection"
				  src="@/static/teacherlist/copyicon.png"
				  mode="scaleToFill"
			  />
			  <view class="collect_text">按样下单</view>
		  </view>
		  <view class="collect_item" @click="handleCollectStatus">
			  <image
			      class="collection"
				  :src="operationItem.work_type===0 ? shouchang : yishouchang"
				  mode="scaleToFill"
			  />
			  <view :class="operationItem.work_type===0 ? 'collect_text' : 'redcollect_text'">{{operationItem.work_type===0 ? '收藏' : '已收藏'}}</view>
		  </view>
		  <view class="collect_item" @click="downloadcopy(operationItem.works.url,'下载链接已复制，请粘贴到浏览器打开')">
			  <image
			      class="collection"
				  src="@/static/teacherlist/download.png"
				  mode="scaleToFill"
			  />
			  <view class="collect_text">下载</view>
		  </view>
		  <view class="collect_item_btn" @click="hanldeCancelcoll">取消</view>
	  </u-popup>	  
	</view>
</template>

<script>
	import { mapState, mapActions } from "vuex";
	import { collection } from "@/api/voice.js"
	import { teacherdetail,sharelist } from "@/api/index.js";
	import play from '@/static/teacherlist/paly2.png'
	import dropball from '@/components/dropball/dropball.vue'
	import musicAudio from '@/components/audio/audioplay.vue'
	import playActive from '@/static/teacherlist/palyActive2.png'
	import shouchang from '@/static/img/shouchang.png'
	import yishouchang from '@/static/img/yishouchang.png'
	import { buriedSomeStatistical } from '@/utils/encapsulation.js'
	// 复制
	import uniCopy from '@/utils/uni-copy.js'
	export default {
		components: {
			dropball,
			musicAudio
		},
		data() {
			return {
			 background: {
					backgroundColor: "#FFFFFF",
			 },
			 barStyle: {
				backgroundColor: '#FF445A',
			 },
			 orderPromptShow: false,
			 speedPromptShow: false,
			  current: 0,
			  play: play,
			  playActive: playActive,
			  tagParameter: {
				  page: 1,
				  size: 10,
			  },
			  objData: {},
			  play: play,
			  playActive: playActive,
			  shouchang:shouchang,
			  yishouchang:yishouchang,
			  worksplay: 'https://www.peiyinstreet.com/guidang/play.png',
			  worksplayActive: "https://www.peiyinstreet.com/guidang/palyActive.png",
			  options1: [],
			  options2: [],
			  options3: [],
			  scrollInto: 0,
			  scrollTop: 0,
			  // 分类类型
			  cate: 1,
			  dataList: [],
			  dataPlay: {
				works: {url: ''}
			  },
			  submitShow: false,
			  // 收藏的作品  
			  collectShow: false,
			  // 操作item
			  currentStatus: 0,
			  operationItem: {},
			  audioShow: false,
			  has_next:'',
			  dataObj: {
				teacher_id: '',
				service_id: '',
				status: 1,
				filename: '',
				content_url_escape: '',
				work_id: '',
				avatar: '',
				nickname: '',
				offer_price: '',
				subjecttype: ''
			  },
			  firstItem: {},
			  triggered: false,
			  _freshing: false,
			  btnText: '按样音效果试音',
			  defaultshow: false,
			  id: ''
			}
		},
		onShareTimeline(res) {
			return {
				title: '云分享',
				desc: '',
				complete: function(res) {
					console.log('分享成功', res)
				},
			}
		},
		computed: {
		  ...mapState("user", ["token", "userInfo","workStatus","order_status","speedPrompt_status"]),
		},
		onLoad(options) {
			console.log('传过来的id', options)
			this.id = options.id
			this.getUnionid()
		},
		onShareAppMessage(res) {
			if (res.from === "button") {
			}
            return {
				title: '',
				path: "",
				complete: function (res) {
					console.log("分享成功", res);
				},
			};
		},
		onShow() {
			this.getUnionid()
		},
		onHide() {
		 this.musicClose()
		},
		methods: {
		  ...mapActions("user", ["login", "getIphoneStatus"]),
		  getUnionid() {
			uni.login({
				provider: "weixin",
				success: async (result) => {
				await this.login(result.code);
				await this.getIphoneStatus();
				this.getVoicelist()
				},
				fail: (error) => {
					console.log("登录失败", error);
					this.getVoicelist()
				},
			});
		  },
		  transformsex(item) {
            if(item===1) {
				return '男声'
			}else if(item===2) {
				return '女声'
			}else {
				return '企业'
			}	
		  },
		  // 请求列表数据
		  getVoicelist() {
			sharelist({share_id: this.id}).then((res)=>{
			   console.log('分享的列表数据')	
               this.dataList = res.data
			   if (this.dataList.length===0) {
					this.defaultshow = true
				} else {
					this.defaultshow = false
			   }
			})
		   },
		   // 使用样音下单
		   handleUseOrder(item) {
			console.log('使用样音下单,用户下单状态',item,this.order_status)
			if (item.admin_price) {
				this.dataObj.service_id = item.service_id
				this.dataObj.teacher_id = item.teacher_id
				this.dataObj.filename = item.works.title
				this.dataObj.content_url_escape = item.url
				this.dataObj.work_id = item.works.id
				this.dataObj.avatar = item.teacher.avatar
				this.dataObj.nickname = item.teacher.nickname
				this.dataObj.offer_price = item.offer_price
				this.dataObj.subjecttype = item.tags[0].value
				// this.submitShow = true
				this.btnText="按样音效果试音"
				uni.setStorageSync('dataObj',this.dataObj)
				uni.navigateTo({ url: '/subpkg/pages/voicesrelease/voicesrelease' })
				// this.$nextTick(() => { 
				// 	this.$refs.submitform.handlertextarea()
				// });
			} else {
				uni.showToast({
					title: '该服务暂不支持在线试音，请联系客服',
					icon: 'none'
				})
			}
			// 统计在线下单
			buriedSomeStatistical(3)
		  },
		  // 跳转案例详情
		  handlecaseDetails(item) {
			console.log('跳转到案例详情页面', item)  
            uni.navigateTo({ url: '/subpkg/pages/caseDetails/caseDetails?id='+item.id})
		  },
		  // 操作事件
		  handleOperation(item) {
			console.log('点击操作打印数据',item)  
			this.operationItem = item
            this.collectShow = true
		  },  
		  //  取消操作事件
		  hanldeCancelcoll() {
			this.collectShow = false
		  },
		  // 收藏   
		  handleCollectStatus() {
			var coData = {
				work_id: this.operationItem.works.id,
				type:this.operationItem.work_type
			}  
            collection(coData).then((res)=>{
              console.log(res)
			  if (this.operationItem.work_type ===1) {
				  this.operationItem.work_type = 0
			  } else {
				  this.operationItem.work_type = 1
			  }
			}).catch((err)=>{
			})
		  },
		  // 关闭需求弹窗
		  getsubmitShow() {
			this.submitShow = false
		  },
		  tabScoll(e) {
			  this.scrollTop = e.detail.scrollTop;
		  },
		  // 跳转配音师名片
		  handleVisitorsJump(orderItem) {
			uni.setStorageSync("current", orderItem.tags[0].value);
			uni.navigateTo({
				url: "/subpkg/pages/teacherlist/teacherlist?id=" + orderItem.teacher_id,
			});
		  },
		  replaceInput: function(event) {
				var value = event.target.value;
				if (value === '11') {
					this.changeValue = '2';
				}
			},
			hideKeyboard: function(event) {
				if (event.target.value === '123') {
					uni.hideKeyboard();
			}
		  },
		  playTheMusic(orderItem) {
				console.log('传过来的数据', orderItem)
				this.audioShow = true
				if(this.dataPlay.works.url === orderItem.works.url) {
				this.dataList.map((item)=>{
					if(this.dataPlay===item){
						orderItem.works.playStatus = !orderItem.works.playStatus
					}else {
						item.playStatus = false
					}
					})
				}else {
					this.dataList.map((item)=>{
					item.works.playStatus = false
					})

					orderItem.works.playStatus = true
					this.dataPlay = orderItem
					buriedSomeStatistical(0)
				}
				setTimeout(()=>{
					this.$refs.musicAudio.preStartPlay()
				},0)
		  },
		  handleChangePlay(status) {
				this.dataList.map((item)=>{
					if(this.dataPlay===item){
						item.works.playStatus = status
					}else {
						item.works.playStatus = false
					}
				})

		  },
		  musicClose() {
				this.dataList.map((item)=>{
					item.works.playStatus = false
				})
				this.audioShow = false	
				this.dataPlay =  {
						works: {
						url: ''
					 }
				}
		  },
		  // 复制作品链接
		  downloadcopy(groupNum,title) {
			uniCopy({
				content:groupNum,
				success:(res)=>{
					uni.showToast({
						title: title,
						icon: 'none'
					})
				},
				error:(e)=>{
				}
			})
			buriedSomeStatistical(1)
		   },
		   handleGoBack() {
			  uni.switchTab({ url: '/pages/index/index' })
		   },
		  // 复制样音信息链接
		  async downloadcopySampleVoices(item,title) {
			let res =  await teacherdetail({teacher_id: item.teacher_id})  
			let groupNum = '样音信息：'+ item.teacher.nickname + '('+ item.teacher.grade_text+')'+
			 '+' + item.title+ 
			 '+' + item.offer_price +
			 '+下载链接 ' + item.works.url
			console.log(item,groupNum)
			uniCopy({
				content:groupNum,
				success:(res)=>{
					uni.showToast({
						title: title,
						icon: 'none'
					})
				},
				error:(e)=>{
				}
			})
			buriedSomeStatistical(9)
		   },
		}
	}
</script>
<style>
page {
  height: 100%;
  overflow: hidden;
}
.invitationBtn {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	border-radius: 57.971rpx;
	/* justify-content: space-between; */
	border: none;
	padding: 0 !important;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	background: #FF445A;
	justify-content: center;
	font-size: 16px;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #FFFFFF;
}
.invitationBtn::after {
  border: none !important;
}
.container {
  height: 100%;	
  overflow-y: hidden;
  background: #F2F2F2;
}
.dropdown {
	background: #FFFFFF;
}
.u-dropdown {
  background: #FFFFFF;
}
.defaltext {
	margin-top: 30rpx;
	text-align: center;
	font-size: 24rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #717171;
	line-height: 16px;
}
</style>

<style lang="scss" scoped>
.container {
	position: relative;
	.home_musicSrc_box {
		position: fixed;
		bottom: 20rpx;
		z-index: 9999;
	}
}
.content {
	height: 100%;
	display: flex;
	flex-direction: column;
	.noticebar {
	    height: 72.464rpx;
		background: #4E94F4;
		font-size: 28.986rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		.noticebar_close {
          position: absolute;
		  width: 50rpx;
		  font-size: 40.362rpx;
		  padding-right: 27.174;
		  right: 0rpx;
		}
    }
	.u-tabs-box {
		border-top-width: 1px;
		border-top-style: solid;
		border-top-color: #F7F7F7;
	}
    .voice_list {
		height: 100%;
		.works_item {
		   display: flex;
		   align-items: center;
		   width: 695.652rpx;
		   height: 181.159rpx;
		   background: #FFFFFF;
		   border-radius: 14.493rpx;
		   margin-top: 25.362rpx;
		   margin-left: 27.174rpx;
		   .play_item {
			 position: relative;  
             width: 123.188rpx;
			 height: 123.188rpx;
			 margin-left: 23.551rpx;
			 .head_portrait_img {
				width: 123.188rpx;
				height: 123.188rpx;
				border-radius: 14.493rpx;
			 }
			 .home_play {
				position: absolute;
				top: 50%;
				left: 55%;
				transform: translate(-50%,-50%);
				width: 29.529rpx;
				height:28.986rpx;
				z-index: 9;
			 }
			 .online {
				position: absolute;
				bottom: 0px;
				right: 0rpx; 
				width: 21.739rpx;
				height: 21.739rpx;
				border-radius: 10.87rpx;
				background: #26DA52;
				z-index: 9;
				border: 1px solid #FFFFFF;
			}
			.head_portrait_meng {
				position: absolute;
				left: 0px;
				top: 0;
				width: 123.188rpx;
				height: 123.188rpx;
				border-radius: 14.493rpx;
				background: rgba(0, 0, 0, 0.2);	
			}
		   }
		   .btn_item {
			   display: flex;
			   align-items: center;
			   margin-top: 70rpx;
			   .voice_btn {
				  display: flex;
				  align-items: center;
				  justify-content: center; 
                  width: 108.696rpx;
				  height: 50.725rpx;
				  background: #FFFFFF;
				  border-radius: 25.362rpx;
				  border: 1.812rpx solid #FF445A;
				  font-size: 21.739rpx;
				  font-family: PingFangSC-Medium, PingFang SC;
				  font-weight: 500;
				  color: #FF445A;
			   }
			   .voice_img_box{
				  width: 66.232rpx;
				  height: 100%;
				  display: flex;
				  justify-content: center;
				  align-items: center;
                 .voice_img {
				   margin-left: 9.058rpx;
				   width: 7.246rpx;
				   height: 32.609rpx;
			     }
			   }
		   }
		   .works_name_item {
			   margin-left: 16.246rpx;
			   width: 331.957rpx;
			   margin-right: 20rpx;
			   .works_name {
				   font-size: 28.986rpx;
				   font-family: PingFangSC-Medium, PingFang SC;
				   font-weight: 500;
				   color: #000000;
			   }
			   .works_style {
				  margin-top: 8rpx;  
				  font-size: 23.551rpx;
				  font-family: PingFangSC-Regular, PingFang SC;
				  font-weight: 400;
				  color: #666666;
			   }
			    .price_item {
				   display: flex;
				   align-items: center;
				   margin-top: 12rpx;
				   .price_text {
					   display: flex;
					   align-items: center;
					   justify-content: center;
					   width: 80.464rpx;
					   height: 32.609rpx;
					   border-radius: 4.623rpx;
					   border: 1.812rpx solid #FF445A;
					   font-size: 21.739rpx;
					   font-family: PingFangSC-Medium, PingFang SC;
					   font-weight: 500;
					   color: #FF445A;
				   }
				   .price_box {
					   display: flex;
					   margin-left: 16.304rpx;
					   font-size: 23.551rpx;
					   font-family: PingFangSC-Medium, PingFang SC;
					   font-weight: 500;
					   color: #FF445A;
				   }
				   .price_line_box {
					   position: relative;
					   margin-left: 16.304rpx;
					   display: flex;
					   align-items: center;
					   justify-content: center;
					   font-size: 23.551rpx;
					   font-family: PingFangSC-Regular, PingFang SC;
					   font-weight: 400;
					   color: #999999;
                       .price_line {
						   position: absolute;
						   left: 0px;
						   width: 100%;
						   height: 1.812rpx;
						   background: #999999;
					   }
				   }
			   }
		   }
		}
		.voice_item {
			display: flex;
			width: 695.652rpx;
			height: 231.884rpx;
			background: #FFFFFF;
			border-radius: 14.493rpx;
			margin-top: 25.362rpx;
			margin-left: 27.174rpx;
			.head_portrait_box {
				position: relative;
				border-radius: 14.493rpx;
				width: 177.536rpx;
				height: 231.884rpx;
				background: rgba(0, 0, 0, 0.2);
				.video_label {
					position: absolute;	
					top: 10.87rpx;
					left: 10.87rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					padding: 0 9.058rpx;
					z-index: 999;
					height: 36.232rpx;
					background: #FF445A;
					border-radius: 7.246rpx;
					opacity: 0.9;
					font-size: 19.928rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
				}
				.head_portrait_img {
				    border-radius: 14.493rpx;
					width: 177.536rpx;
					height: 231.884rpx;
				}
				.home_play {
					position: absolute;
					top: 101.449rpx;
					left: 76.992rpx;
					width: 23.551rpx;
					height:28.986rpx;
					z-index: 9;
				}
				.online {
					position: absolute;
					bottom: 0px;
					right: 0rpx; 
					width: 21.739rpx;
					height: 21.739rpx;
					border-radius: 10.87rpx;
					z-index: 9;
					background: #26DA52;
					border: 1px solid #FFFFFF;
				}
				.head_portrait_meng {
					position: absolute;
					left: 0px;
					top: 0;
					border-radius: 14.493rpx;
					width: 177.536rpx;
					height: 231.884rpx;
					background: rgba(0, 0, 0, 0.1);	
				}
			}
			.voice_introduce {
				margin-left: 16.246rpx;
				padding-top: 25.362rpx;
				width: 472rpx;
				.voice_name {
					display: flex;
					align-items: center;
					position: relative;
					.rank {
						height: 39.855rpx;
						font-size: 28.986rpx;
						font-family: PingFangSC-Semibold, PingFang SC;
						font-weight: 600;
						color: #000000;
						line-height: 39.855rpx;
					}
					.name {
						// margin-left: 16.304rpx;
						max-width: 250rpx;
						height: 39.855rpx;
						font-size: 28.986rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #000000;
						line-height: 39.855rpx;
					}
					.sex {
						margin-left: 3.623rpx;
						width: 25.362rpx;
						height: 25.362rpx;
					}
					.focus_btn {
						text-align: center;
						position: absolute;
						right: 10rpx;
						width: 101.449rpx;
						height: 45.29rpx;
						background: #FFFFFF;
						border-radius: 32.609rpx;
						border: 1px solid #FF445A;
						font-size: 21.739rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #FF445A;
						line-height: 43.478rpx;
					}
					.nofocus_btn {
					    text-align: center;
						position: absolute;
						right: 10rpx;
						width: 101.449rpx;
						height: 45.29rpx;
						background: #FFFFFF;
						border-radius: 32.609rpx;
						border: 1px solid #CECECE;
						font-size: 21.739rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #999999;
						line-height: 43.478rpx;
					}
				}
				.numberworks {
					height: 32.609rpx;
					margin: 14.493rpx 0;
					font-size: 23.551rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #666666;
					line-height: 32.609rpx;
					.workscount {
						margin-right: 30.797rpx;
					}
				}
				.tagNum {
					display: flex;
					margin-top: 14.493rpx;
					.tag {
                        min-width: 108.696rpx;
						padding: 0 9.058rpx;
						height: 39.855rpx;
						background: rgba(255, 165, 61, 0.12);
						border-radius: 4.623rpx;
						font-size: 21.739rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #FF9C29;
						line-height: 39.855rpx;
						margin-right: 10.87rpx;
					}
				}
				.jianjie {
					margin-top: 14.493rpx;
					width: 461.957rpx;
					height: 32.609rpx;
					font-size: 23.551rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #666666;
					line-height: 32.609rpx;
				}
			}
		}
		.defaltPage {
			text-align: center;
			.defaltPageimg {
				margin-top: 110.507rpx;
				width: 403.986rpx;
				height: 331.522rpx;
			}
			.defaltext {
				margin-top: 30rpx;
				text-align: center;
				font-size: 24rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #717171;
				line-height: 16px;
			}
		}
	}
}
.slot-content {
	background: #FFFFFF;
	max-height: 860rpx;
    background: #FFFFFF;
    overflow-y: auto;
	.listItem {
		height: 90.58rpx;
		border-top: 1.812rpx solid #F1F3F6;
		align-items: center;
		display: flex;
		.item_value {
			padding-left: 36.232rpx;
			width: 80%;
			font-size: 27.174rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #636468;
		}
		.checkitem {
			padding-left: 36.232rpx;
			width: 80%;
			font-size: 27.174rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #1274FF;
		}
		.checkbox_mark {
          width: 20%;
		  text-align: right;
		  padding-right: 36.232rpx;
		  color: #1274FF;
		}
	}
}
.collect_item {
	height: 108.696rpx;
	border-bottom: 1px solid #F7F7F7;
	display: flex;
	align-items: center;
	.collection {
		margin-left: 43.478rpx;
		width: 39.855rpx;
		height: 39.855rpx;
	}
	.collect_text {
		margin-left: 14.493rpx;
		font-size: 16px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #000000;
	}
	.redcollect_text {
		margin-left: 14.493rpx;
		font-size: 16px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #000000;
	}
}
.collect_item_btn {
	height: 134.058rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 16px;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #999999;
}
// 案例item
.video_item {
    display: flex;
	width: 695.652rpx;
	height: 195.652rpx;
	background: #FFFFFF;
	border-radius: 14.493rpx;
	margin-top: 25.362rpx;
	margin-left: 27.174rpx;
  .video_box {
	position: relative;  
    width: 320.652rpx;
	height: 195.652rpx;
	border-radius: 14.493rpx;
	.video_label {
	  position: absolute;	
	  top: 10.87rpx;
	  left: 10.87rpx;
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  min-width: 97.71rpx;
	  padding: 0 9.058rpx;
	  height: 36.232rpx;
	  background: #FF445A;
	  border-radius: 7.246rpx;
	  opacity: 0.9;
	  font-size: 19.928rpx;
	  font-family: PingFangSC-Regular, PingFang SC;
	  font-weight: 400;
	  color: #FFFFFF;
	}
	.video_cover {
	   width: 320.652rpx;
	   height: 195.652rpx;
	   border-radius: 14.493rpx;
	}
	.video_palybox {
		position: absolute;
		display: flex;
		justify-content: space-between;
		margin: 0 18.116rpx;
		left: 0;
		width: 284.42rpx;
		bottom: 18.116rpx;
		.video_paly {
           display: flex;
		   align-items: center;
		   .video_icon {
			   width: 19.928rpx;
			   height: 21.739rpx;
		   }
		   .play_Num {
			   margin-left: 5.435rpx;
				font-size: 13px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
		   }
		}
	    .broadcasttime {
			font-size: 23.551rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
		}
	}
  }
  .video_desc {
	  position: relative;
	  width: 375rpx;
	  padding: 23.551rpx 30.797rpx;
	  .video_title {
		font-size: 28.986rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #000000;
	  }
	  .video_style {
		  margin-top: 18.116rpx;
		  font-size: 23.551rpx;
		  font-family: PingFangSC-Regular, PingFang SC;
		  font-weight: 400;
		  color: #666666;
	  }
	  .video_by {
		//   margin-top: 30.42rpx;
		  display: flex;
		  align-items: center;
		  position: absolute;
          bottom: 18.116rpx;
		  .video_icon {
			  width: 36.232rpx;
			  height: 36.232rpx;
			  border-radius: 18.116rpx;
		  }
		  .video_name {
			margin-left: 9.058rpx; 
			width: 269rpx;
			font-size: 23.551rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #666666;
		  }
	  }
  }
}
.masklayer {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9999;
  .coupons_box {
    position: relative;
    margin-top: 50%;
    margin-left: 67.029rpx;
    position: relative;
    transform: calc(0%, -50%);
    width: 597.826rpx;
    height: 760.87rpx;
    .shutdown_icon {
      position: absolute;
      right: 0;
      top: -65.899rpx;
      width: 38.043rpx;
      height: 38.043rpx;
    }
    .coupons_icon {
      width: 597.826rpx;
      height: 760.87rpx;
    }
    .coupons_content {
      position: absolute;
      top: 180rpx;
      width: 100%;
      left: 0px;
      .content_text {
		  padding: 0px 101.449rpx;
		  font-size: 28.986rpx;
		  font-family: PingFangSC-Regular, PingFang SC;
		  font-weight: 400;
		  color: #666666;
		  .text {
			  margin-top: 36.232rpx;
		  }
		  .red_text {
			  color: #FF445A;
			  font-weight: 500;
		  }
		  .bule_text {
			color: #1274FF;
			font-weight: 500;  
		  }
	  }
	//   .content_text_blue {
	// 	padding: 0px 80rpx !important;  
	//   }
	  .know_btn {
		  display: inline-block;
		  text-align: center;
		  margin-top: 59.783rpx;
		  margin-left: 148.551rpx;
		  width: 300.725rpx;
		  height: 86.957rpx;
		  line-height: 86.957rpx;
		  font-size: 28.986rpx;
	      font-family: PingFangSC-Medium, PingFang SC;
		  font-weight: 500;
		  color: #FFFFFF;
		  background: #FF445A;
		  border-radius: 43.478rpx;
	  }
	  .know_btn_bule {
		  display: inline-block;
		  text-align: center;
		  margin-top: 59.783rpx;
		  margin-left: 148.551rpx;
		  width: 300.725rpx;
		  height: 86.957rpx;
		  line-height: 86.957rpx;
		  font-size: 28.986rpx;
	      font-family: PingFangSC-Medium, PingFang SC;
		  font-weight: 500;
		  color: #FFFFFF;
		  background: #1274FF;
		  border-radius: 43.478rpx;
	  }
	  .know_btn_red {
		  display: inline-block;
		  text-align: center;
		  margin-top: 89.783rpx;
		  margin-left: 148.551rpx;
		  width: 300.725rpx;
		  height: 86.957rpx;
		  line-height: 86.957rpx;
		  font-size: 28.986rpx;
	      font-family: PingFangSC-Medium, PingFang SC;
		  font-weight: 500;
		  color: #FFFFFF;
		  background: #FF445A;
		  border-radius: 43.478rpx;
	  }
    }
  }
}
.shareBox {
	position: absolute;
	bottom: 83.406rpx;
	display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
	.sharebtn {
		width: 300.725rpx;
		height: 86.957rpx;
		background: #FF445A;
		border-radius: 43.478rpx;
		color: #FFFFFF;
	}
}
</style>

