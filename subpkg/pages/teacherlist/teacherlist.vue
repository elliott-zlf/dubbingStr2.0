<template>
    <view>
		<u-navbar :is-back="true" title="配音师列表" title-size="36.232rpx" title-color="#000000" :border-bottom="false"></u-navbar>
		<view class="teacherlist_box">
		<view class="wrap">
			<view class="u-tabs-box">
				<view style="width:617rpx">
                   <u-tabs
						activeColor="#FF445A"
						bold
						ref="tabs"
						bg-color="#FFFFFF" 
						inactive-color="#666666" 
						:bar-style="barStyle" 
						name="value" 
						:is-scroll="true"
						:list="tagList.tags" 
						:current="current" 
						swiper-width="617rpx"
						@change="change" 
						font-size='28.362'
					></u-tabs>
				</view>
				  <view class="screening_btn_box" @click="handleScreening">
					  <view class="screening_btn">
                        <text class="screening_text">筛选</text>
						<image
							class="screening_icon"
							src="@/static/teacherlist/screening.png"
							mode="scaleToFill"
						/>
					  </view>
				  </view>
			</view>
			<view class="price_screening_box">
				<view class="price_item" :class="activeIndex==index ? 'activeClass' : ''" v-for="(item,index) in priceList" :key="index" @click="handlePriceScreening(index)">
                 {{item}}
				</view>
			</view>
				<scroll-view scroll-y style="height: 100%;width: 100%;"
				    @refresherrefresh="handlere(current)"
					:refresher-enabled="true" 
					:scroll-top="scrollInto"
					@scroll="tabScoll"
					@scrolltolower="reachBottom"
					:refresher-triggered="triggered">
					<view class="page-box" v-if="defaultshow">
						<view class="teacherOrder" v-for="orderItem in dataList" :key="orderItem.id">
							<view class="teacher_top_Introduction">
								<view class="top_Introduction_left">
									<image
										class="teacher_portrait"
										:src="orderItem.teacher.avatar"
										mode="scaleToFill"
									/>
									<!-- <view class="online"></view> -->
								</view>
								<view class="top_Introduction_contenr">
								<view class="teacher_nikeName">
									<text class="teacher_nikeName_text u-line-1">{{orderItem.teacher.nickname}}</text>
									<image
										v-if="orderItem.teacher.sex === 1"
										class="teacher_sex"
										src="@/static/teacherlist/manicon.png"
										mode="scaleToFill"
									/>
									<image
										v-else
										class="teacher_sex"
										src="@/static/teacherlist/woman.png"
										mode="scaleToFill"
									/>
								</view>
								<view class="price_text">
									<text class="text_exclusive">专享价</text>
									<text class="text_price">{{orderItem.unit_price}}元/百字</text>
								</view>
								</view>
								<view class="top_Introduction_right">
									<view v-if="!orderItem.type" class="checkWeChat" @click="handleInviteDubbing(orderItem)">邀请试音</view>
									<!-- <view v-else class="reg_group" @click="downloadcopy(orderItem.teacher.wechat_number,'复制成功，添加时备注：小站')">复制微信</view> -->
								</view>
							</view>
							<view class="teacher_bot_voices">
								<view class="teacher_play_box" @click="playTheMusic(orderItem)">
                                  <image
									class="teacher_play_icon"
									:src="orderItem.playStatus ? playActive : play"
									mode="scaleToFill"
									/>
									<view class="service_name u-line-1">
										【{{ orderItem.tags.filter(item => item.type_id === 2)[0].value }}】 {{orderItem.title}}
									</view>
								</view>
								<view class="download_iconbox" @click="downloadcopy(orderItem.works[0].url,'下载链接已复制到剪贴板')">
                                  <image
										class="download_icon"
										src="@/static/teacherlist/download.png"
										mode="scaleToFill"
									/>
								</view>
							</view>
						</view>
						<view v-if="has_next===false" class="defaltext">没有更多了</view>
						<u-loadmore v-if="has_next===true" status="loading" bgColor="#f2f2f2"></u-loadmore>
					</view>
					<view v-if="!defaultshow" class="page-box">
						<view class="defaltPage">
							<!-- <image
								class="defaltPageimg"
								src="@/static/ui/defaultPage/d1.png"
								mode="scaleToFill"
							/> -->
							<view class="defaltext">暂无匹配数据</view>
						</view>
					</view>
					<view style="height:220px"></view>
				</scroll-view>
		</view>
		<u-popup v-model="screeningShow" :mask-close-able="true" mode="right" width="612.319rpx">
		<view class="popup_content_box">
			<scroll-view scroll-y="true" style="height: 75%;">
				<view class="selection_listbox">
					<view v-for="(item,index) in screenTag" :key="index">
                      <view class="item_name">{{item.value}}</view>
					  <view class="item_tag_box">
						<view 
							class="item_tag"
							:class="{activeClass:!selectedIdObj[item.id][0]}"
							@click="handleSubjectIndexTagAll(item.id)"
							>
							全部
						</view>  
						<view 
							class="item_tag"
							v-for="(tagitem,tagIndex) in item.tags"
							:key="tagIndex" 
							:class="{activeClass:(selectedIdObj[item.id]||[]).indexOf(tagitem.id)!==-1}"
							@click="handleSubjectIndexTagActive(item.id,tagitem.id)"
							>
							{{tagitem.value}}
						</view>
					  </view>
					</view>
				</view>
			</scroll-view>
			<view class="confrim_btn_box">
				<view class="cancel_btn" @click="handletagCancel">取消</view>
				<view class="confrim_btn" @click="handletagQuery">确定</view>
			</view>
		</view>
	    </u-popup>
		<u-popup v-model="submitShow" mode="bottom" height="984.348rpx">
			<submit-form ref="submitform" :bottomTitle="true" :subTitle="false" btnText="立即邀请"></submit-form>
	   </u-popup>
	   <view v-if="audioShow" class="home_musicSrc_box disappear">
        <musicAudio 
		  ref="musicAudio"
		  :url="dataPlay.works[0].url"
		  :autoplay="true"
		  :portrait="dataPlay.teacher.avatar"
		  :music_title="dataPlay.title"
		  @handleChangePlay="handleChangePlay"  
		  @musicClose="musicClose"
		  ></musicAudio>
	  </view>
	</view>
	</view>
</template>

<script>
import { homeConfig,serviceLits } from "@/api/index.js"
import play from '@/static/home/play.png'
import playActive from '@/static/home/palyActive.gif'
import submitForm from '@/components/submitform/submitform.vue'
import musicAudio from '@/components/audio/audioplay.vue'
import uniCopy from '@/utils/uni-copy.js'
import { mapState, mapActions } from "vuex";
export default {
	components: {
		submitForm,
		musicAudio
	},
	data() {
		return {
			dataList: [],
			play: play,
			erweimaShow: false,
			playActive: playActive,
			tagList: [],
			screenTag: [],
			scrollInto: 0,
			scrollTop: 0,
			tagParameter: {
				sort: {},
				page: 1,
				size: 10,
				type: 1,
				tag_data: {}
			},
			list: [
				{
                  name: '热门推荐',
				  id: 1
				},
				{
				  name: '宣传片',
				  id: 2
				},
				{
				  name: '专题片',
				  id: 3
				},
				{
				  name: '广告',
				  id: 4
				},
				{
				  name: '影视配音',
				  id: 5
				},
				{
				  name: '动漫',
				  id: 6
				},
				{
				  name: '影视配音',
				  id: 7
				},
				{
				  name: '动漫',
				  id: 8
				}],
			priceList: [
				'不限',
                '中级≤20元',
				'高级30元-40元',
				'特级≥50元',
			],
			current: 0,
			swiperCurrent: 0,
			tabsHeight: 0,
			playStatus: false,
			dx: 0,
			activeIndex: 0,
			selectedIdObj: {},
			tagDatas: {},
			barStyle: {
				backgroundColor: '#FF445A',
			},
			voiceTeacherId: '',
			countdown:[],
            defaultshow: true,
			loadmore: false,
			screeningShow: false,
			triggered: false,
			submitShow: false,
			audioShow: false,
			has_next: '',
			dataPlay: {
				works: [{
                  url: ''
				}	
				]
			},
			loadStatus: ['loadmore','loadmore','loadmore','loadmore'],
		};
	},
	onLoad(options) {
		this.getUnionid()
	},
	computed: {
      ...mapState("user", ["token", "userInfo"]),
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
				  this.handleList()
				// this.getAllteacher()
				},
				fail: (error) => {
				console.log("登录失败", error);
				},
			});
		},
		// 价格筛选
		handlePriceScreening(index) {
          this.activeIndex = index
		  this.tagParameter.page=1
		  this.getOrderList(this.tagParameter,this.current)
		},
		handleScreening() {
		  this.screeningShow = true
		},
		async handleList() {
		  const res = await homeConfig()
		  this.screenTag = res.data.tags
		  const tagListArr = res.data.tags.filter(item=>{
			  this.$set(this.selectedIdObj,item.id,[])
              return item.value == '题材'
		  })
		  var allList = {
			    created_at: "2021-05-26 21:37:08",
				filter: 0,
				id: 0,
				sort: 0,
				type_id: 0,
				value: "全部"
		  }
		  const a = this.$u.deepClone(tagListArr[0])
		  a.tags.unshift(allList)
		  console.log('tags', a)
		  this.tagList = a
		  this._freshing = false;
		  setTimeout(() => {
			this.triggered = true;
		  }, 1000)
		  // this.list = res.data
		//   this.getOrderList(0)

		},
		handlere(idx) {
		 this.triggered = true
		 if (idx === 0) {
			var tagData = {

		     }
		 } else {
			 var tagData = {
                 '2': [this.tagList.tags[idx].id]
		     }
		 }
		  this.tagParameter = {
				sort: {},
				page: 1,
				size: 10,
				type: 1,
				tag_data: tagData
			}
		 this.getOrderList(this.tagParameter,idx)
		},
		// 点击所有标签
		handleSubjectIndexTagAll(index) {
		  this.$set(this.selectedIdObj, index, [])
		  this.$forceUpdate()
		},
		// 标签点击事件
		handleSubjectIndexTagActive(index,id) {
			const selectTags = this.selectedIdObj[index] || []
			const num = selectTags.indexOf(id)
			if (num === -1) { // 该分类未选择该标签
				selectTags.push(id)
				this.$set(this.selectedIdObj, index, selectTags)
				console.log(this.selectedIdObj)
				this.tagDatas = this.selectedIdObj
				return
			}
			console.log(selectTags,num)
			// 该分类已选，需要剔除
			selectTags.splice(num, 1)
			this.$set(this.selectedIdObj, index, selectTags)
			this.tagDatas = this.selectedIdObj
			console.log(this.selectedIdObj)
			this.$forceUpdate()
		},
		// 查看微信
		handleInviteDubbing(item) {
			// console.log('配音师资源ID',item)
			// this.voiceTeacherId=item.teacher_id
			this.submitShow = true
			this.$refs.submitform.hadleUpdate()
		},
		handleCanceShare() {
			uni.showShareMenu({
			  title: '配音师资源',
		  })
		},
		handletagQuery() {
		this.screeningShow = false
		this.triggered = true
		  this.tagParameter = {
				sort: {},
				page: 1,
				size: 10,
				type: 1,
				tag_data: this.selectedIdObj
		  }
		  this.current = 0
		  this.getOrderList(this.tagParameter,this.current)
		},
		// 取消选择，收回弹窗
		handletagCancel(){
		  this.screeningShow = false
		},
		async reachBottom() {
			if (this.has_next) {
				var pages = this.tagParameter.page+1;
				console.log('上拉加载', pages)
				this.tagParameter = {
					sort: {},
					page: pages,
					size: 10,
					type: this.activeIndex +1,
					tag_data: this.tagDatas
				}
				// const res = await getDemandList({
				// 	state: this.list[idx].id
				// })
				const res = await serviceLits(this.tagParameter)
				this.triggered = false
				this.has_next = res.data.has_next
				res.data.data.map((item)=>{
					item.playStatus = false
					this.dataList.push(item)
				})
				if (this.dataList.length===0) {
					this.defaultshow = false
				} else {
					this.defaultshow = true
					this.loadmore = true
				}
				
			}else {

			}
		},
		// 音乐播放按钮
		playTheMusic(orderItem) {
		  console.log('音乐播放', orderItem, this.dataPlay)
		  this.audioShow = true
		  if(this.dataPlay.works[0].url === orderItem.works[0].url) {
			  this.dataList.map((item)=>{
				  if(this.dataPlay===item){
                     orderItem.playStatus = !orderItem.playStatus
				  }else {
                    item.playStatus = false
				  }
		      })
		  }else {
             this.dataList.map((item)=>{
			   item.playStatus = false
		     })
			  orderItem.playStatus = true
			  this.dataPlay = orderItem
		  }
		  setTimeout(()=>{
			this.$refs.musicAudio.preStartPlay()
		  },0)
		},
		handleChangePlay(status) {
            this.dataList.map((item)=>{
				  if(this.dataPlay===item){
					 console.log('子组件改变播放状态', status) 
                     item.playStatus = status
				  }else {
                     item.playStatus = false
				  }
		    })

		},
		// 页面数据
		async getOrderList(item,idx) {
			const tagParameter = {
				sort: item.sort,
				page: item.page,
				size: item.size,
				type: this.activeIndex +1,
				tag_data: item.tag_data
			}
			// const res = await getDemandList({
			// 	state: this.list[idx].id
			// })
			const res = await serviceLits(tagParameter)
			console.log('配音师列表数据', res)
			this.triggered = false
			this.has_next = res.data.has_next
			console.log('有没有下一页数据', this.has_next)
			res.data.data.map((item)=>{
				item.playStatus = false
			})
			this.dataList = res.data.data
			if (this.dataList.length===0) {
				this.defaultshow = false
			} else {
				this.defaultshow = true
				this.loadmore = true
			}
			this.scrollInto = this.scrollTop
			setTimeout(()=>{
              this.scrollInto = 0
			},0)
		},
		musicClose() {
          this.dataList.map((item)=>{
                item.playStatus = false
		    })
		  this.audioShow = false	
		  this.dataPlay =  {
				works: [{
                  url: ''
				}	
				]
			}
		},
		// tab栏切换
		change(index) {
			console.log('scrollInto', this.scrollInto)
			this.current = index;
				if (index === 0) {
					var tagData = {}
				} else {
				var tagData = {
					'2': [this.tagList.tags[index].id]
				}
			}
			this.tagDatas = tagData
			this.tagParameter = {
					sort: {},
					page: 1,
					size: 10,
					type: 1,
					tag_data: tagData
				}
			this.getOrderList(this.tagParameter,index)
		},
		// 配音师入驻
		handleVicTer() {
			this.erweimaShow = true
		},
		handlecloseerweima() {
			this.erweimaShow = false
		},
		tabScoll(e) {
		  this.scrollTop = e.detail.scrollTop;
		},
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
		}
	}
};
</script>
<style lang="scss">
page{
	min-height: 100%;
	overflow: hidden;
	width: 100%;
}
.textarea-placeholder {
  font-size: 25.362rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
  line-height: 36.232rpx;
}
/* #ifdef MP-WEIXIN */
scroll-view ::v-deep ::-webkit-scrollbar {
   width: 0;
   height: 0;
   color: transparent
}
.u-mask {
	position: absolute !important;
}
.u-drawer {
	position: absolute !important;
}
/* #endif */
</style>
<style lang="scss" scoped>
.defaltext {
	margin-top: 30rpx;
	text-align: center;
	font-size: 24rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #717171;
	line-height: 16px;
}
.teacherlist_box {
	position: relative;
	.home_musicSrc_box {
		position: absolute;
		bottom: 240rpx;
	}
}
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
		margin-left: 34.478rpx;
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
		margin-left: 43.478rpx;

	}
}
.u-tabs-box {
	min-height: 88.768rpx;
    background: white;
    position: relative;
    width: 617.754rpx;
	.screening_btn_box {
	  background: #FFFFFF;
	  height: 100%;
      position: absolute;
	  right: -142.246rpx;
	  top: 0;
	  display: flex;
	  align-items: center;
	  width: 143.246rpx;
	  .screening_btn {
		     width: 100rpx;
			height: 60rpx;
			display: -webkit-box;
			display: -webkit-flex;
			display: flex;
			margin-top: -10rpx;
			margin-left: 10rpx;
			justify-content: center;
			align-items: center;
			text-align: center;
			-webkit-box-pack: center;
			-webkit-justify-content: center;
			justify-content: center;
			border-radius: 30rpx;
			border: #2E2E2E 1px solid;
	  }
	//   top: 50%;
	//   align-items: center;
    //   transform: translate(-50%, -50%); 
	  .divider {
		  margin-left: 5rpx;
		  width: 9.058rpx;
		  height: 47.101rpx;
	  }
	  .screening_text {
		// margin-left: 16.304rpx;  
		width: 50.725rpx;
		height: 36.232rpx;
		font-size: 25.362rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #000000;
		line-height: 36.232rpx;
	  }
	  .screening_icon {
		  margin-left: 7.246rpx;
		  width: 21.739rpx;
		  height: 21.739rpx;
		  font-size: 36.232rpx;
	  }
	}
}
.price_screening_box {
  width: 100%;
  padding: 27.174rpx;
  display: flex;
  justify-content: space-between;
  .price_item{
	padding: 0 23.551rpx;
	height: 50.725rpx;
	line-height: 50.725rpx;
	background: #FFFFFF;
	border-radius: 25.362rpx;
	font-size: 21.739rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #666666;
  }
  .activeClass {
	background: #FF445A ;
	color: #FFFFFF;
  }
}
.teacherOrder {
	margin-left: 27.174rpx;
	padding: 36.232rpx 27.174rpx;
    width: 695.652rpx;
	height: 264.493rpx;
	background: #FFFFFF;
	border-radius: 25.362rpx;
	margin-bottom: 21.739rpx;
    .teacher_top_Introduction{
		display: flex;
		.top_Introduction_left{
			position: relative;
			width: 76.087rpx;
			height: 76.087rpx;
			.teacher_portrait {
			  width: 76.087rpx;
			  height: 76.087rpx;	
			  border-radius: 38.043rpx;
			}
			.online {
				position: absolute;
				bottom: 0;
				right: 0;
				width: 21.739rpx;
				height: 21.739rpx;
				border-radius: 10.87rpx;
				background: #26DA52;
				border: 3.623rpx solid #FFFFFF;
			}
		}
		.top_Introduction_contenr{
			margin-left: 18.116rpx;
			width: 387.681rpx;
		.teacher_nikeName_text{
			max-width: 300rpx;
			height: 22px;
			font-size: 16px;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #000000;
			line-height: 22px;
		}
		.teacher_sex {
			width: 25.362rpx;
			height: 25.362rpx;
		}

	    }
		.top_Introduction_right {
			.checkWeChat {
                margin-top: 5.058rpx;
				text-align: center;
				width: 159.42rpx;
				height: 65.217rpx;
				background: #FF445A;
				border-radius: 32.609rpx;
				font-size: 25.362rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				line-height: 65.217rpx;
			}
			.reg_group {
				 margin-top: 5.058rpx;
				text-align: center;
				width: 159.42rpx;
				height: 65.217rpx;
				background: #F3F4F9;
				border-radius: 32.609rpx;
				font-size: 25.362rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #000000;
				line-height: 65.217rpx;
			}
		}
	}
	.teacher_bot_voices {
	  margin-top: 25.362rpx;	
	  width: 639.493rpx;
	  height: 90.58rpx;
	  display: flex;
	  align-items: center;
	//   padding: 0 23.551rpx;
	  position: relative;
	  background: #F1F3F7;
	  border-radius: 6px;
	  .teacher_play_box {
		 height: 100%;
		 padding-left: 23.551rpx; 
		 display: flex;
	     align-items: center;
	  }
	  .teacher_play_icon {
		  width: 47.101rpx;
		  height: 47.101rpx;
	  }
	  .service_name {
        width: 513.304rpx;
		height: 36.232rpx;
		// margin-left: 16.304rpx;
		margin-top: 5rpx;
		font-size: 25.362rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #000000;
		line-height: 36.232rpx;
	  }
	  .download_iconbox {
		height: 100%;
		width: 54.609rpx;
		height: 28.986rpx; 
	  }
	  .download_icon{
		  width: 32.609rpx;
		  height: 28.986rpx;
	  }
	}
}
.wrap {
	display: flex;
	flex-direction: column;
	height: calc(100vh - var(--window-top));
	width: 100%;
	background: #F2F2F2;
}
.swiper-box {
	flex: 1;
}
.swiper-item {
	height: 100%;
}
.popup_content_box {
	height: 100%;
	.selection_listbox {
		padding:0rpx 18.116rpx 0rpx 32.609rpx;
	  .item_name {
		margin-top: 43.478rpx;  
		width: 28px;
		height: 20px;
		font-size: 14px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #000000;
		line-height: 20px;
	  }
	  .item_tag_box {
        display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		.item_tag {
			margin-top: 21.739rpx;
			margin-right: 18.116rpx;
			// margin: 21.739rpx ;
			text-align: center;
			font-size: 21.739rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #000000;
			width: 123.188rpx;
			height: 50.725rpx;
			line-height: 50.725rpx;
			background: #F3F4F9;
			border-radius: 27.174rpx;
		}
		 .activeClass {
			background: #FF445A;
			color: #FFFFFF;
		}
	  }
	}
	.confrim_btn_box {
		margin-top: 36.232rpx;
		display: flex;
		.cancel_btn {
			margin-left: 32.609rpx;
			text-align: center;
			font-size: 28.986rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #999999;
			width: 264.493rpx;
			height: 79.71rpx;
			line-height: 79.71rpx;
			background: #FFFFFF;
			border-radius: 39.855rpx;
			border: 1px solid #DEDEDE;
		}
		.confrim_btn {
			margin-left: 18.116rpx;
			text-align: center;
			width: 264.493rpx;
			height: 79.71rpx;
			line-height: 79.71rpx;
			background: #FF445A;
			border-radius: 39.855rpx;
            font-size: 28.986rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
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
.margintop10 {
	margin-top: 18.116rpx;
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
		width: 213.768rpx;
		height: 79.71rpx;
		background:#FF445A;
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
.customer_service_box {
	position: absolute;
	top: 1014.493rpx;
	right: 0;
	text-align: center;
	width: 206.522rpx;
	height: 79.71rpx;
	line-height: 79.71rpx;
	background: #FFFFFF;
	box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.15);
	border-radius: 57.971rpx 0px 0px 57.971rpx;
	border: 1px solid #EDEDED;
	.service_icon {
		width: 35.188rpx;
		height: 35.279rpx;
		margin-right: 5.435rpx;
		margin-bottom: -5.623rpx;

	}
	.service_text {
		font-size: 25.362rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #000000;
		line-height: 36.232rpx;
	}

}
</style>
