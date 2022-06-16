<template>
	<view class="container">
	  	<!--导航栏  -->
	  <view class="content">
		  <!-- tabs列表 -->
		  <view class="wrap">
			<view class="u-tabs-box">
				<u-tabs
					activeColor="#FF445A"
					bold
					ref="tabs"
					bg-color="#FFFFFF" 
					inactive-color="#666666" 
					:bar-style="barStyle" 
					name="title" 
					:is-scroll="false"
					:list="list" 
					:current="current" 
					@change="change" 
					font-size='28.362'
				>
				</u-tabs>
			</view>
			<!-- 搜索框 -->
			<view class="search_box">
				<view class="search_item">
					<image
						class="search_img"
						src="@/static/img/search.png"
						mode="scaleToFill"
					/>
					<input
						class="search_input"
						type="text"
						v-model="tagParameter.search"
						:placeholder="placeholderText"
						placeholder-class="input-placeholder"
						confirm-type="search"
						@confirm="handleSearch"
					/>
				</view>
				<view class="music_sorting">
					<view class="sorting_item" v-for="(item,index) in sortingitem" :key="index" @click="handleChangeSorting(item,index)">
						<view class="sorting_name" :class="item.sorting !==0 ? 'redClass' : ''">
							{{item.name}}
						</view>
						<view class="sorting_btn">
							<image
							    v-if="item.sorting ==0 "
							    class="sorting_arrow"
								src="@/static/img/moren.png"
								mode="scaleToFill"
							/>
							<image
							    v-if="item.sorting ==1 "
							    class="sorting_arrow"
								src="@/static/img/up.png"
								mode="scaleToFill"
							/>
							<image
							    v-if="item.sorting ==2 "
							    class="sorting_arrow"
								src="@/static/img/down.png"
								mode="scaleToFill"
							/>
                            <!-- <view class="arrow_up">	
							  <u-icon class="arrow_up_i" :class="item.sorting ===1 ? 'redClass' : ''"  name="arrow-up-fill"></u-icon>
							</view>
							<view class="arrow_down">
							  <u-icon class="arrow_down_i" :class="item.sorting ===2 ? 'redClass' : ''" name="arrow-down-fill"></u-icon>
							</view> -->
						</view>
					</view>
				</view>
		    </view>
		  </view>
		  <!-- list列表 -->
			<scroll-view 
			class="voice_list" 
			scroll-y
			@refresherrefresh="handlerefre"
			:refresher-enabled="true" 
			:scroll-top="scrollInto"
			@scroll="tabScoll"
			@scrolltolower="reachBottom"
			:refresher-triggered="triggered"
			>
			<!-- 音乐音效列表 -->
			<view class="music_item" v-for="(item,index) in musicData" :key="index">
               <view class="music_paly_box" @click="playTheMusic(item)">
				   <image
						class="music_paly_icon"
						:src="!item.playStatus ? play : playActive"
						mode="scaleToFill"
					/>
			   </view>
			   <view class="music_title u-line-1">
				   {{item.title}}
			   </view>
			   <view class="music_download"  @click="downloadcopy(item,'下载链接已复制，请粘贴到浏览器打开')">
				   <image
				       class="download_icon"
					   src="@/static/teacherlist/download12.png"
					   mode="scaleToFill"
				   />
			   </view>
			</view>
			<view v-if="has_next===false" class="defaltext">没有更多了</view>
			<u-loadmore v-if="has_next===true" style="margin-top: 30px;" status="loading" bgColor="#f2f2f2"></u-loadmore>
			<view v-if="defaultshow" class="page_box">
				<view class="defaltPage">
					<image
						class="defaltPageimg"
						src="@/static/demand/defaulticon.png"
						mode="scaleToFill"
					/>
					<view class="defaltext">暂无匹配数据</view>
				</view>
			</view>
			<view style="height:240px"></view>
		    </scroll-view>
	  </view>
	  <view v-if="audioShow" class="home_musicSrc_box disappear">
        <musicAudio 
		  ref="musicAudio"
		  :url="dataPlay.url"
		  :autoplay="true"
		  :portrait="dataPlay.avatar"
		  :music_title="dataPlay.title"
		  @handleChangePlay="handleChangePlay"  
		  @musicClose="musicClose"
		  ></musicAudio>
	  </view> 
	</view>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { voiceList, voicePlay } from "@/api/music.js"
import dropball from '@/components/dropball/dropball.vue'
import musicAudio from '@/components/audio/audioplay.vue'
import { buriedSomeStatistical } from '@/utils/encapsulation.js'
// 播放图片
import play from '@/static/img/paly.png'
import playActive from '@/static/img/palyActive.svg'
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
			  current: 0,
			  play: play,
			  playActive: playActive,
			  list: [
				{
                  name: '找音效',
				  id: 0
				},
				{
				  name: '找音乐',
				  id: 2
				}
			  ],
			  sortingitem: [
				  {
					  name: '综合',
					  nameType: 'comprehensive',
					  sorting: 1,
					  sequence: false,
					  id: 1
				  },
				  {
					  name: '播放',
					  sorting: 0,
					  nameType: 'play',
					  sequence: false,
					  id: 2
				  },
				  {
					  name: '下载',
					  sorting: 0,
					  nameType: 'download',
					  sequence: false,
					  id: 3
				  }
			  ],
			  tagParameter: {
				  page: 1,
				  size: 10,
				  type: 0,
				  comprehensive: 1,
				  play: 0,
				  download: 0,
				  search: ''
			  },
			  musicData: [],
			  play: play,
			  playActive: playActive,
			  worksplay: 'https://www.peiyinstreet.com/guidang/play.png',
			  worksplayActive: "https://www.peiyinstreet.com/guidang/palyActive.png",
			  scrollInto: 0,
			  scrollTop: 0,
			  // 分类类型
			  cate: 1,
			  dataList: [],
			  dataPlay: {
				url: ''
			  },
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
			  },
			  triggered: false,
			  _freshing: false,
			  placeholderText: '搜索音效关键词',
			  defaultshow: false
			}
		},
		// 分享事件
		onShareAppMessage(res) {
			if (res.from === 'button') {// 来自页面内分享按钮
				console.log(res.target)
			}
			return {
				title: '别处要花钱买的音效素材，这里免费下载。赶紧收藏',
				desc: '',
				complete: function(res) {
					console.log('分享成功', res)
				},
			}
		},
		computed: {
		  ...mapState("user", ["token", "userInfo","workStatus"]),
		},
		onLoad(options) {
			this.current = options.type
			console.log('this.currue的值0',this.current)  
			// 登录事件
			this.getUnionid()
		},
		onHide() {
		 this.musicClose()
		 uni.setStorageSync('worksType', '')
		},
		methods: {
		  ...mapActions("user", ["login"]),
		  //  登录
		  getUnionid() {
			uni.login({
				provider: "weixin",
				success: async (result) => {
				console.log('this.currue的值4',this.current)
				await this.login(result.code);
				this.tagParameter.type = this.current
				this.handleGetvoiceList()
				},
				fail: (error) => {
				console.log("登录失败", error);
				},
			});
		  },
		  change(tabs) {
            console.log('点击的tabs',tabs)
			this.current = tabs
			this.tagParameter = {
				  page: 1,
				  size: 10,
				  type: tabs,
				  comprehensive: 1,
				  play: 0,
				  download: 0
			  }
			  if (this.current==0) {
					this.placeholderText = "搜索音效关键词"
				} else if(this.current==1) {
					this.placeholderText = "搜索音乐关键词"
				}
			this.handleGetvoiceList()  
		  },
		 //   排序点击切换
		 handleChangeSorting(item,index) {
			 this.sortingitem.map((items,indexs)=>{
                if (item.id===items.id) {
					if(this.sortingitem[index].sorting == 0 ) {
						this.sortingitem[index].sorting = 1
						this.tagParameter[items.nameType] = 1
					}else if(this.sortingitem[index].sorting == 1){
						this.sortingitem[index].sorting = 2
						this.tagParameter[items.nameType] = 2
					}else if(this.sortingitem[index].sorting == 2){
                        this.sortingitem[index].sorting = 1
						this.tagParameter[items.nameType] = 1
					}
				} else {
					items.sorting = 0
					 this.tagParameter[items.nameType] = 0
				}
			})
			this.tagParameter.page = 1
			console.log('上传参数', this.tagParameter)
			this.handleGetvoiceList()
		 },
		//  搜索列表数据
		handleSearch(event){
			 console.log('dengyuduoshao',event) 
			 this.tagParameter.page = 1
			 this.handleGetvoiceList()
            //  this.inputValue = event.target.value
		},
		//  列表数据请求
		handleGetvoiceList() {
			voiceList(this.tagParameter).then((res)=>{
               console.log('音乐音效数据',res)
			   this.musicData = res.data
			   this.triggered = false;
				this._freshing = false;
				this.scrollInto = this.scrollTop
				this.currentStatus = this.current
				if (this.musicData.length===0) {
						this.has_next = ''
						this.defaultshow = true
					} else {
						this.has_next = res.has_next
						this.defaultshow = false
					}
				setTimeout(()=>{
					this.scrollInto = 0
				},0)
			})
		},
		// 下拉刷新
		  handlerefre() {
			this.tagParameter.page = 1
			this.triggered = true;
			this._freshing = true;
			console.log('测试下来刷新复位问题', this.triggered,this._freshing)  
			this.handleGetvoiceList() 
		  },
		  // 上拉加载  
		  async reachBottom() {
				if (this.has_next) {
					this.tagParameter.page = this.tagParameter.page+1
					const res = await voiceList(this.tagParameter)
					console.log('res新数据',res)
					this.triggered = false
					this.has_next = res.has_next
					res.data.map((item)=>{
						this.musicData.push(item)
					})
					if (this.musicData.length===0) {
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
		// 播放三连
		playTheMusic(orderItem) {
				console.log('传过来的数据', orderItem)
				this.audioShow = true
				if(this.dataPlay.url === orderItem.url) {
				this.musicData.map((item)=>{
					if(this.dataPlay===item){
						orderItem.playStatus = !orderItem.playStatus
					}else {
						item.playStatus = false
					}
					})
				}else {
					this.musicData.map((item)=>{
					item.playStatus = false
					})

					orderItem.playStatus = true
					this.dataPlay = orderItem
					buriedSomeStatistical(0)
				}
				// 播放下载+1
				voicePlay({voice_id: orderItem.id,type:0}).then((res)=>{
                   console.log('播放下载成功+1', res)
				})
				setTimeout(()=>{
					this.$refs.musicAudio.preStartPlay()
				},0)
		  },
		  handleChangePlay(status) {
				this.musicData.map((item)=>{
					if(this.dataPlay===item){
						item.playStatus = status
					}else {
						item.playStatus = false
					}
				})

		  },
		  musicClose() {
				this.musicData.map((item)=>{
					item.playStatus = false
				})
				this.audioShow = false	
				this.dataPlay =  {
					url: ''
				}
		  },
		// 复制作品链接
		downloadcopy(item,title) {
			// 播放下载+1
			voicePlay({voice_id: item.id, type:1}).then((res)=>{
                console.log('播放下载成功+1', res)
			})
			uniCopy({
				content:item.url,
				success:(res)=>{
					uni.showToast({
						title: title,
						icon: 'none'
					})
				},
				error:(e)=>{
				}
			})
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
	border-radius: 57.971rpx 0px 0px 57.971rpx;
	/* justify-content: space-between; */
	border: none;
	padding: 0 !important;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
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
	.u-tabs-box {
		border-top-width: 1px;
		border-top-style: solid;
		border-top-color: #F7F7F7;
	}
	.search_box {
	  padding-top: 18.551rpx;	
	  width: 100%;	
	  background: #FFFFFF;
	  .search_item {
		display: flex;  
		align-items: center;
		margin-left: 36.232rpx;
        width: 677.536rpx;
		height: 68.841rpx;
		background: #F2F2F2;
		border-radius: 39.855rpx;
		.search_img {
			width: 32.609rpx;
			height: 32.609rpx;
			margin-left: 32.609rpx;
			margin-right: 18.116rpx;
		}
		.search_input {
		  width: 580rpx;	
		  height: 68.841rpx;
		}
	  }
	}
    .voice_list {
		height: 100%;
		.music_item {
		   display: flex;
		   align-items: center;
		   width: 695.652rpx;
		   height: 126.812rpx;
		   background: #FFFFFF;
		   justify-content: space-between;
		   border-radius: 14.493rpx;
		   margin-top: 25.362rpx;
		   margin-left: 27.174rpx;
		   .music_paly_box {
             width: 54.348rpx;
			 height: 54.348rpx; 
			 margin-left: 30.797rpx;
			 .music_paly_icon {
				width: 54.348rpx;
			    height: 54.348rpx; 
			 }
		   }
		   .music_title {
			   margin-left: 27.174rpx;
			   width: 463.768rpx;
			   font-size: 28.986rpx;
			   font-family: PingFangSC-Medium, PingFang SC;
			   font-weight: 500;
			   color: #000000;
		   }
		   .music_download {
               margin-right: 27.174rpx;
			   width: 90rpx;
			   display: flex;
			   align-items: center;
			   justify-content: flex-end;
			   .download_icon {
				   width: 36.232rpx;
				   height: 32.609rpx;
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
.music_sorting {
	display: flex;
	align-items: center;
	padding-bottom: 18.116rpx;
	padding-top: 18.116rpx;
	justify-content: space-between;
	.sorting_item {
		// width: 34%;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-left: 20px;
        margin-right: 20px;
		.sorting_name {
			font-size: 27.174rpx;
			color: #606266;
		}
		.sorting_btn {
		  margin-left: 2px;	
		  margin-top: -3.623rpx;
		  .sorting_arrow {
			 width: 10.87rpx;
			 height: 11px;
		  }
          .arrow_up {
			margin-bottom: -12px;
            .arrow_up_i {
				font-size: 18.174rpx;
				color: #606266;
			}
		  }
		  .arrow_down {
			  .arrow_down_i {
				 font-size: 18.174rpx;
				 color: #606266; 
			  }
		  }
		}
		.redClass {
			  color: #FF445A !important;
		}
	}
}
</style>

