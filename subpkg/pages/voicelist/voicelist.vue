<template>
	<view class="container">
	  <u-navbar 
		:is-back="true" 
		:title="navTitle" 
		title-size="36.232rpx" 
		title-color="#000000" 
		:custom-back="handleGoBack"
	  >
	  </u-navbar>
	  <view class="content">
		  <u-dropdown class="dropdown" ref="subuDropdown">
			<u-dropdown-item 
			  :title="subTitle" 
			>
			  <view class="slot-content">
				<view class="listItem" v-for="(item,index) in options1" :key="index" @click="handlecheckItem(item,index)">
					<view class="item_value u-line-1" :class="{ 'checkitem' : subvalue===index }">{{item.value}}</view>
					<view v-if="subvalue===index" class="checkbox_mark"><u-icon name="checkbox-mark"></u-icon></view>
				</view>  
			  </view>
			</u-dropdown-item>
			<u-dropdown-item v-model="sexvalue" :title="sexTitle">
				<view class="slot-content">
				<view class="listItem" v-for="(item,index) in options2" :key="index" @click="handlesexcheckItem(item,index)">
					<view class="item_value u-line-1" :class="{ 'checkitem' : sexvalue===index }">{{item.value}}</view>
					<view v-if="sexvalue===index" class="checkbox_mark"><u-icon name="checkbox-mark"></u-icon></view>
				</view>  
			    </view>
			</u-dropdown-item>
			<u-dropdown-item v-model="entvalue" :title="entTitle">
				<view class="slot-content">
				<view class="listItem" v-for="(item,index) in options3" :key="index" @click="handleentcheckItem(item,index)">
					<view class="item_value u-line-1" :class="{ 'checkitem' : entvalue===index }">{{item.value}}</view>
					<view v-if="entvalue===index" class="checkbox_mark"><u-icon name="checkbox-mark"></u-icon></view>
				</view>  
			    </view>
			</u-dropdown-item>
		  </u-dropdown>
		  <!-- 入库二维码 -->
		<view class="pys_popup" v-if="rukuShow">
			<view class="popup_conent">
				<image
					class="closeicon"
					src="@/static/home/close.png"
					mode="scaleToFill"
					@click="handlecloseerweima"
				/>
				<view class="erweimabox">
				<view class="erweima_iconbox">
					<image
					class="erweima_icon"
					src="https://www.peiyinstreet.com/guidang/peiyinguwen.png"
					mode="scaleToFill"
					/>
				</view>	
				<view class="erweima_box">
				  截图加我微信，极速帮您试音
				</view>
				</view>
			</view>
		</view>  
		<!-- 未创建 -->
		<view class="pys_popup" v-if="notputShow">
				<view class="popup_conent">
					<image
						class="closeicon"
						src="@/static/home/close.png"
						mode="scaleToFill"
						@click="handlecloseerweima"
					/>
					<view>
					<view style="height:17.971rpx"></view>	
					<view class="check_WeChat_test">
							申请入库
					</view>
					<view class="check_WeChat_tips">创建名片后即可免费加入中国配音师库</view>
					<view class="share_btn_box">
							<button
								class="cancelSharebtn"
								hover-class="button-hover"
								@click="handlecloseerweima"
							>
							我再想想	 
							</button>
							<button
								class="sharebtn"
								@click="handlechangehome"
							>
							立即创建 
							</button>
					</view>
					</view>
				</view>
		 </view>
		 <view class="pys_popup" v-if="rankingPopShow">
			<view class="popup_conent">
				<image
					class="closeicon"
					src="@/static/home/close.png"
					mode="scaleToFill"
					@click="handleCanceranking"
				/>
				<view>
				<view style="height:17.971rpx">

				</view>
				<view class="rankingbox">
					<view class="rankingtop_text_box">
						<view class="rankingtext">
							<view class="mingci">
								第<text class="mingci_num">{{rankData.id}}</text>位
							</view>
							<view class="tipstitle">您当前排名</view>
						</view>
						<view class="scoretest">
							<view class="jifne">
								{{rankData.score}}分
							</view>
							<view class="tipstitle">您的热度指数</view>
						</view>
					</view>
					<view class="prompt_box">
						<view style="height:43.478rpx"></view>
						<view class="defen">
							热度指数 = 访问人数*1 + 点赞人数*3 + 关注人数*5
						</view>
						<view style="height:19.478rpx"></view>
						<view class="defen2">
							得分越高，排名越靠前
						</view>
						<view style="height:36.232rpx"></view>
						<view class="know_btn" @click="handleCanceranking">知道了</view>
					</view>
				</view>
				</view>
			</view>
		 </view>
         <scroll-view 
		   class="voice_list" 
		   scroll-y
		   @refresherrefresh="handlere()"
		   :refresher-enabled="true" 
		   :scroll-top="scrollInto"
		   @scroll="tabScoll"
		   @scrolltolower="reachBottom"
		   :refresher-triggered="triggered"
		>
			 <view class="voice_item" v-for="(item,index) in dataList" :key="index">
                <view class="head_portrait_box" @click="playTheMusic(item)">
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
				</view>
				<view class="voice_introduce">
					<view class="voice_name">
                        <view class="rank" v-if="index < 9">{{'0' + (index+1)}}</view>
						<view class="rank" v-else>{{ index+1}}</view>
						<view class="name u-line-1"  @click="handleVisitorsJump(item)">{{item.teacher.nickname}}</view>
						<image
							v-if="item.teacher.sex===1"
							class="sex"
							src="@/static/teacherlist/manicon.png"
							mode="scaleToFill"
						/>
						<image
							v-else-if="item.teacher.sex===2"
							class="sex"
							src="@/static/teacherlist/woman.png"
							mode="scaleToFill"
						/>
						<image
								v-else-if="item.teacher.sex===3"
							class="sex"
							src="@/static/teacherlist/qi.png"
							mode="scaleToFill"
						/>
						<view v-if="item.type===0" class="focus_btn" @click="handleFocus(item,0)">关注</view>
						<view v-if="item.type===1" class="nofocus_btn" @click="handleFocus(item,1)">已关注</view>
					</view>
					<view @click="handleVisitorsJump(item)">
						<view class="numberworks">
							<text class="workscount">作品数{{item.teacher.work_count}}</text>
							<text class="playcount">播放量{{item.teacher.browse_count}}</text>
						</view>
						<view class="tagNum">
							<view v-for="(tagitem,tagindex) in item.teacher.tags" :key="tagindex" >
							<view v-if="tagitem.type_id===5" class="tag">
								{{tagitem.value}}
							</view>
							</view>
						</view>
						<view class="jianjie u-line-1">
							{{item.teacher.intro}}
						</view>
					</view>
				</view>
			 </view>
			 <view v-if="has_next===false" class="defaltext">没有更多了</view>
			 <u-loadmore v-if="has_next===true" style="margin-top: 30px;" status="loading" bgColor="#f2f2f2"></u-loadmore>
			 <view v-if="defaultshow" class="page_box">
						<view class="defaltPage">
							<!-- <image
								class="defaltPageimg"
								src="@/static/ui/defaultPage/d1.png"
								mode="scaleToFill"
							/> -->
						<view class="defaltext">暂无匹配数据</view>
					</view>
			 </view>
			<view style="height:180px"></view>
		 </scroll-view>
	  </view>
	  <!-- <cardball @handleChange="handleruku">
	  </cardball> -->
	 <view class="lianxikefu" @click="handleruku">
		   <view class="service_box">
              <image
				class="service_icon"
				src="@/static/home/kefu.png"
				mode="scaleToFill"
			  /> 
			  <text class="lianxikefu_text">配音顾问</text>
		   </view>
	 </view>
	 <view class="footer_prompt">
		   <button  class="invitationBtn" id="shou" open-type="share">	
				<view class="footer_dianzhan_icon">
					<image
						class="give_like_icon"
						src="@/static/home/dianzhanActive.png"
						mode="scaleToFill"
					/>
					<text class="give_like_text">推荐库给好友</text>
				</view>
				<view class="travel_to_box">
					<text class="travel_to_text">致力打造：中国权威专业的声音库大全</text>
					<image
						class="travel_to_img"
						src="@/static/home/arrorRight.png"
						mode="scaleToFill"
					/>
				</view>
		   </button>
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
	</view>
</template>

<script>
import { servicetag, servicsecList, servicerank } from "@/api/voice.js"
import { changeFocus } from '@/api/carddetails.js'
import { mapState, mapActions } from "vuex";
import play from '@/static/teacherlist/paly2.png'
import cardball from "@/components/cardball/cardball.vue"
import musicAudio from '@/components/audio/audioplay.vue'
import playActive from '@/static/teacherlist/palyActive2.png'
	export default {
		components: {
			cardball,
			musicAudio
		},
		data() {
			return {
				subvalue: 0,
				sexvalue: 0,
				entvalue: 0,
				subTitle: '配音题材',
				sexTitle: '性别',
				entTitle: '个企',
				play: play,
				playActive: playActive,
				options1: [
				],
				options2: [
				],
				options3: [
				],
				current: 0,
				has_next:'',
				tagParameter: {
				  page: 1,
				  size: 10,
				  tag_data: {
					  2: []
				  },
				  cate: '',
				  sex: 0,
				  class: 0
				},
				cate: '',
				dataList: [],
				dataPlay: {
				  works: {url: ''}
			    },
				navTitle: '',
				rankData: {},
				userStatus: null,
				rankingPopShow: false,
				defaultshow: false,
				audioShow: false,
				triggered: false,
				scrollInto: 0,
			    scrollTop: 0,
				notputShow: false,
				rukuShow: false
			};
		},
		computed: {
		  ...mapState("user", ["token", "userInfo"]),
		},
		onShareAppMessage(res) {
			if (res.from === 'button') {// 来自页面内分享按钮
				console.log(res.target)
			}
			return {
				imageUrl: '',
				complete: function(res) {
					console.log('分享成功', res)
				},
			}
		},
		onLoad(options) {
          this.cate = options.cate
		  this.getUnionid()	
		},
		onHide() {
		  this.musicClose()	
		},
		methods: {
			...mapActions("user", ["login"]),
			getUnionid() {
				uni.login({
					provider: "weixin",
					success: async (result) => {
					await this.login(result.code);
					this.handleServicetag()
					this.tagParameter.cate = this.cate
					this.getVoicelist()
					},
					fail: (error) => {
					console.log("登录失败", error);
					},
				});
			},
			handleGoBack() {
				console.log('跳转回配音师库')
				uni.switchTab({ url: '/pages/dubbinglibrary/dubbinglibrary' })
			},
			completemessage(res) {
				console.log('微信二维码的回调函数',res)
			},
			startmessage(err) {
				console.log('微信二维码的回调函数', err)
			},
			handleServicetag() {
				servicetag({cate:this.cate}).then((res)=>{
				  console.log('标签数据', res.data)
				  this.options1 = res.data.tag_data
                  this.options2 = res.data.sex
				  this.options3 = res.data.class
				  this.userStatus = res.data.status
				  this.navTitle = res.data.catename
				})
			},
			handlere() {
			  this.triggered = true
			  this.getVoicelist()
			  this._freshing = true;
			  console.log('上拉加载')
			},
			// 请求列表数据
			async getVoicelist() {
				this.tagParameter.page = 1
                const res = await servicsecList(this.tagParameter)
				console.log('res新数据',res)
				this.triggered = false;
                this._freshing = false;
				this.dataList = res.data
				this.scrollInto = this.scrollTop
				if (this.dataList.length===0) {
					    this.has_next = ''
						this.defaultshow = true
					} else {
						this.has_next = res.has_next
						this.defaultshow = false
					}
				setTimeout(()=>{
				  this.scrollInto = 0
				},0)
			},
			async reachBottom() {
				if (this.has_next) {
					this.tagParameter.page = this.tagParameter.page+1
					const res = await servicsecList(this.tagParameter)
					console.log('res新数据',res)
					this.triggered = false
					this.has_next = res.has_next
					res.data.map((item)=>{
						this.dataList.push(item)
					})
					if (this.dataList.length===0) {
						this.defaultshow = true
						this.has_next = ''
					} else {
						this.defaultshow = false
					}
				}else {
				
				}
			},
			tabScoll(e) {
			  this.scrollTop = e.detail.scrollTop;
			},
			handlecheckItem(item,index) {
			   this.current = index
			   this.subvalue = index
			   this.subTitle = item.value
			   this.tagParameter.tag_data[2] = item.id
			   this.getVoicelist()
			   this.$refs.subuDropdown.close();
			},
			handlesexcheckItem(item,index) {
			   this.sexvalue = index
			   this.sexTitle = item.value
			   this.tagParameter.sex = item.id
			   this.getVoicelist()
			   this.$refs.subuDropdown.close();
			},
			handleentcheckItem(item,index) {
			   console.log('', item)	
			   this.entvalue = index
			   this.entTitle = item.value
			   this.tagParameter.class = item.id
			   this.getVoicelist()
			   this.$refs.subuDropdown.close();
			},
			handleSubChange(value) {
			  this.options1.map(item => {
				  if(item.value == value) {
					  this.subTitle = item.label
				  }
			  })
			},
			handleSexChange(value) {
              console.log('选项卡的值', value)
			  this.options2.map(item => {
				  if(item.value == value) {
					  this.sexTitle = item.label
				  }
			  })
			},
			handleEntChange(value) {
				 this.options3.map(item => {
				  if(item.value == value) {
					  this.entTitle = item.label
				  }
			  })
			},
			// 跳转配音师名片
			handleVisitorsJump(orderItem) {
			  console.log('配音师列表',orderItem.teacher_id)
			  uni.setStorageSync('current', this.options1[this.current].value)
			  uni.navigateTo({ url: '/subpkg/pages/teacherlist/teacherlist?id='+orderItem.teacher_id })
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
			// 显示排名
			handlerankingPopShow() {
				servicerank(this.tagParameter).then((res)=>{
					console.log('成功',res)
					this.rankData = res.data
					this.rankingPopShow = true
				}).catch((err)=>{
					console.log('失败')
					uni.showToast({
							title: err.errmsg,
							icon: 'none'
					}) 
				})
			},
			handleCanceranking() {
				this.rankingPopShow = false
			},
			handleruku() {
				uni.previewImage({
					urls: ['https://www.peiyinstreet.com/guidang/peiyinguwen.png'],
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
                // this.notputShow = true
				// this.rukuShow = true
			},
			handlecloseerweima() {
				this.notputShow = false
				this.rukuShow = false
			},
			handlechangehome() {
				uni.switchTab({ url: '/pages/index/index' })
			},
			handleFocus(item,index) {
				changeFocus({teacher_id:item.teacher_id,type: index}).then((res)=>{
					console.log('选中的配音师', item)
					this.dataList.map(Titem=>{
					  if(Titem.id == item.id) {
						 Titem.type = index === 1 ? 0 : 1
					   }
					})
				})
			},
		}
	}
</script>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
}
.lianxikefu {
	position: fixed;
	bottom: 225rpx;
	right: 0;
	display: flex;
    text-align: center;
    width: 206.522rpx;
    height: 79.71rpx;
    line-height: 79.71rpx;
    z-index: 9999;
    background: #FF445A;
    border-radius: 32px 0px 0px 32px;
	.service_box {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		.lianxikefu_text {
		font-size: 25.362rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		// z-index: 999;
		margin-left: 15rpx;
	}
	.service_icon {
		    width: 25.362rpx;
			height: 28.986rpx;
			margin-left: 25.116rpx;
	}
	}
	.cell {
	position: absolute;
	left: 0;
    height: 79.71rpx;
	width: 206.522rpx;
    background: RGBA(245, 44, 90, 0.00);
    border-radius: 32px 0px 0px 32px;
	.wrapper {
	  height: 79.71rpx !important;
      line-height: 79.71rpx !important;	
	}
	.cell--bubble {
	  height: 79.71rpx !important;
	  width: 206.522rpx !important;
      display: flex;
	  align-items: center;	
	  background: RGBA(245, 44, 90, 0.00) !important;
	}
	.light_without_border {
		 margin-left: 20rpx !important;
	}
	.cell--light_without_border {
		display: none;
		margin-left: 20rpx !important;
		width: 18px;
        height: 16px;
	}
}
}
.container {
  height: 100%;	
  background: #F2F2F2;
}
.dropdown {
	background: #FFFFFF;
}
.u-dropdown {
  background: #FFFFFF;
}
.invitationBtn {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	 background:rgba(0,0,0,0);
	/* justify-content: space-between; */
	border: none;
	padding: 0 !important;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
}
.invitationBtn::after {
  border: none !important;
}
</style>
<style lang="scss" scoped>
.container {
	position: relative;
	.home_musicSrc_box {
		position: fixed;
		bottom: 100rpx;
		z-index: 9999;
	}
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
.content {
	height: 100%;
	display: flex;
	flex-direction: column;
	.voice_list {
		height: 100%;
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
				border-top-left-radius: 14.493rpx;
				border-bottom-left-radius: 14.493rpx;
				width: 177.536rpx;
				height: 231.884rpx;
				background: rgba(0, 0, 0, 0.2);
				.head_portrait_img {
					border-top-left-radius: 14.493rpx;
				    border-bottom-left-radius: 14.493rpx;
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
				.head_portrait_meng {
					position: absolute;
					left: 0px;
					top: 0;
				    border-top-left-radius: 14.493rpx;
					border-bottom-left-radius: 14.493rpx;
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
						margin-left: 16.304rpx;
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
			.defaltPageimg {
				margin-top: 200rpx;
				margin-left: 225rpx;
				width: 300rpx;
				height: 300rpx;
			}
			.defaltext {
				margin-top: 70rpx;
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
.rankingbox {
	.rankingtop_text_box{
		display: flex;
		justify-content: center;
		.rankingtext{
			width: 271.739rpx;
			.mingci {
                text-align: center;
				height: 50.725rpx;
				font-size: 36.232rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #000000;
				line-height: 50.725rpx;
				.mingci_num {
					color: #1274FF;
				}
			}
			.tipstitle {
				text-align: center;
				height: 36.232rpx;
				font-size: 25.362rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #000000;
				line-height: 36.232rpx;
			}

		}
		.scoretest {
			width: 271.739rpx;
			.jifne {
			    text-align: center;
				height: 50.725rpx;
				font-size: 36.232rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #000000;
				line-height: 50.725rpx;	
			}
			.tipstitle {
				text-align: center;
				height: 36.232rpx;
				font-size: 25.362rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #000000;
				line-height: 36.232rpx;
			}
		}
	}
	.prompt_box {
	  margin-top: 38.043rpx;
	  width: 543.478rpx;
	  height: 271.739rpx;
	  background: #F4F4F4;
	  border-radius: 14.493rpx;
	  text-align: center;
	  .defen {
		text-align: center;
		height: 30.797rpx;
		font-size: 21.739rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
		line-height: 30.797rpx;
	  }
	  .defen2 {
		text-align: center;
		height: 30.797rpx;
		font-size: 21.739rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
		line-height: 30.797rpx;
	  }
	  .know_btn {
		display: inline-block;
		width: 304.348rpx;
		height: 79.71rpx;
		line-height: 79.71rpx;
		background: #1274FF;
		box-shadow: 0px 14.493rpx 18.116rpx 0px rgba(18, 70, 255, 0.18);
		border-radius: 39.855rpx;
		font-size: 28.986rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
	  }
	}
}
.footer_prompt {
	padding: 0px 30.232rpx;
	position: fixed;
	bottom: 0;
	width: 750rpx;
	height: 79.71rpx;
	background: #000000;
	display: flex;
	opacity: 0.66;
	.footer_dianzhan_icon {
		width: 230.203rpx;
		height: 100%;
		display: flex;
		align-items: center;
		.give_like_icon {
			width: 32.609rpx;
			height: 32.609rpx;
		}
		.give_like_text {
			width: 202.899rpx;
			height: 36.232rpx;
			font-size: 25.362rpx;
			text-align: left;
			margin-left: 25.246rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #FFB70A;
			line-height: 36.232rpx;
		}
	}
	.travel_to_box {
		display: flex;
		align-items: center;
		padding-right: 5.116rpx;
		.travel_to_text {
			width: 430.928rpx;
			height: 36.232rpx;
			font-size: 25.362rpx;
			text-align: right;
			margin-right: 9.058rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			line-height: 36.232rpx;
		}
		.travel_to_img {
			width: 13.428rpx;
			height: 17.935rpx;
		}
	}
}
.pys_popup {
	position: fixed;
	height: 100%;
	width: 100%;
	background:rgba(0,0,0,0.5);
	z-index: 999999;
	.popup_conent {
		position: absolute;
		padding: 36.232rpx;
		top: 40%;
		left: 50%;
		transform: translate(-50%,-50%);
		min-width: 500.71rpx;
		min-height: 326.087rpx;
		background: #FFFFFF;
		border-radius: 28.986rpx;
		.closeicon {
			position: absolute;
			width: 50.725rpx;
			height: 50.725rpx;
			top: -66.232rpx;
			right: 0;
		}
	}
}
// 入库
.erweimabox {
	position: relative;
	.close_iconbox{
		position: absolute;
		background: #000000;
		right: 0rpx;
		width: 50rpx;
		height: 50rpx;
		top: 0rpx;
		border-radius: 50%;
	.close_icon {
		width: 50rpx;
		height: 50rpx;
	}
	}
	.erweima_iconbox {
	}
	.erweima_icon {
		width: 491.014rpx;
		height: 491.014rpx;
		
	}
	.erweima_box {
		width: 471.014rpx;
		height: 36.232rpx;
		text-align: center;
		font-size: 25.362rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #999999;
		line-height: 36.232rpx;
	}
}
.check_WeChat_test {
	text-align: center;
	height: 39.855rpx;
	font-size: 28.986rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #000000;
	line-height: 39.855rpx;
}
.check_WeChat_tips {
	margin-top: 28.986rpx;
	margin-bottom: 36.232rpx;
	height: 36.232rpx;
	text-align: center;
	font-size: 25.362rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #000000;
	line-height: 36.232rpx;
}
.share_btn_box {
	display: flex;
	.cancelSharebtn {
		width: 213.768rpx;
		height: 79.71rpx;
		background: #FFFFFF;
		border-radius: 39.855rpx;
		border: 1.812rpx solid #DEDEDE;
		font-size: 28.986rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #999999;
	}
	.cancelSharebtn::after {
	border: none !important;
	}
	.sharebtn {
		margin-left: 36.232rpx;
		width: 213.768rpx;
		height: 79.71rpx;
		background:#1274FF;
		border-radius: 39.855rpx;
		font-size: 28.986rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 79.71rpx;
	}
	.sharebtn::after {
	border: none !important;
	}
}
</style>
