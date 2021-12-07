<template>
	<view class="container">
      <view class="home_title_box">
          <view class="home_title_title">
			  <image
			      class="title_icon"
				  src="@/static/home/title_img.png"
				  mode="scaleToFill"
			  />
			  <text class="title_number">500+</text>
			  <text class="title_text">优质配音师</text>
		  </view>
		  <view class="home_view_more" @tap="$u.throttle(handleViewMore, 500)">
			  <text>查看更多</text>
			  <image
			      class="view_more_icon"
				  src="@/static/home/more.png"
				  mode="scaleToFill"
			  />
		  </view>
      </view>
	  <view class="home_swiper_list">
		 <swiper class="swiper_item_box" :display-multiple-items="3" previous-margin="27.174rpx" next-margin="15.174rpx">
			<swiper-item class="swiper_item" v-for="(item,index) in swiperList" :key="index">
				<view class="swiper_item_list">
					<view class="card_content" @click="playTheMusic(item)">

                      <image
							class="portrait_img"
							:src="item.teacher.avatar"
							mode="scaleToFill"
						/>
						<image
						    class="home_play"
							:src="item.playStatus ? playActive : play"
							mode="scaleToFill"
						/>
						<view class="nick_name p-line-1">{{item.teacher.nickname}}</view>
						<view class="home_portrait p-line-1">{{item.works[0].created_at}}</view>
					</view>
					<image
					    class="swiper_bg_img"
						:src="colorClass[index%3]"
						mode="scaleToFill"
					/>
				</view>
			</swiper-item>
		</swiper>
	  </view>
	  <image
	      class="soundWaves"
		  src="@/static/home/yinlang.png"
		  mode="scaleToFill"
	  />
	  <submit-form btnText="立即匹配 配音师试音"></submit-form>
	  <view v-if="audioShow" class="home_musicSrc_box disappear">
        <musicAudio 
		  :url="dataPlay.url"
		  :autoplay="true"
		  :portrait="dataPlay.avatar"
		  :music_title="dataPlay.tags[0].value"
		  @musicClose="musicClose"
		  ></musicAudio>
	  </view>
	</view>
</template>

<script>
import musicAudio from '@/components/audio/audioplay.vue'
import { getAllteacher } from "@/api/index.js"
import submitForm from '@/components/submitform/submitform.vue'
	export default {
		components: {
		  musicAudio,
		  submitForm
		},
		data() {
			return {
				swiperList: [],
				colorClass: ["https://www.peiyinstreet.com/guidang/colorRed.png","https://www.peiyinstreet.com/guidang/colorBlue.png","https://www.peiyinstreet.com/guidang/colorYellow.png"],
				play: 'https://www.peiyinstreet.com/guidang/play.png',
				playActive: "https://www.peiyinstreet.com/guidang/palyActive.gif",
				swiperId: '',
				musicSrc: '',
				dataPlay: {
				},
				getListArg: {
				  tag_data: [],
				  page: 1,
				  size: 10,
				  type: 1
				},
				audioShow: false,
			    innerAudio: '',
				innerAudioUrl: '',
			}
		},
		onLoad() {
			this.TowerSwiper()
		},
		onShow() {
			// 微信退出后台，播放按钮不更新
			this.swiperList.map((itemlist)=>{
                itemlist.playStatus = false
			})
		},
		onHide() {
			if(this.innerAudio){
              this.innerAudio.destroy()
			}
		},
		computed: {
		},
		methods: {
			// 首页查看更多跳转
			handleViewMore() {
				uni.navigateTo({ url: '/subpkg/pages/teacherlist/teacherlist' })
			},
			// 初始化towerSwiper
			TowerSwiper() {
				getAllteacher(this.getListArg).then((res)=>{
					console.log('配音师数据', res)
					var dataList = res.data.data
					dataList.map((item)=>{
						item.playStatus = false
					})
					this.swiperList = dataList
				}).catch(err=>{

				})
			},
			playTheMusic(item) {
				if (item.playStatus) {
					item.playStatus = false
					this.innerAudio.destroy(() => {
					  console.log('销毁')
					})
				} else {
					if (this.innerAudio) {
					  this.innerAudio.destroy()
					}
					this.swiperList.map((itemlist)=>{
                        itemlist.playStatus = false
					})
					// this.audioShow = true
					item.playStatus = true
					// this.dataPlay = item
					this.innerAudio = uni.createInnerAudioContext()
					this.innerAudio.autoplay = true
					this.innerAudio.src = item.works[0].url
					this.innerAudio.onPlay(() => {
					  console.log('开始播放')
					})
					this.innerAudio.onEnded(() => {
					  this.swiperList.map((itemlist)=>{
                        itemlist.playStatus = false
					  })
					})
					this.innerAudio.onError((res) => {
						console.log(res.errMsg)
						console.log(res.errCode)
					});
				}
                
					
			//   this.audioShow = true	
            //   this.dataPlay = item
			},
			musicClose() {
			  this.audioShow = false	
			  this.dataPlay = {}
			},
		}
	}
</script>

<style lang="scss">
page {
	height: auto;
	min-height: 100%;
	background:#130836;
}
</style>
<style lang="scss" scoped>
.container {
	height: 100%;
	width: 100%;
	background:#130836;
}
.home_title_box {
	padding: 0 27.173913rpx;
	padding-top: 61.594rpx;
	// height: 54.348rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	.home_title_title {
	  height: 54.348rpx;
	  line-height: 54.348rpx;	
      .title_icon {
		width: 28.460145rpx;
		height: 39.855072rpx;
		margin-bottom: -3.623rpx;
		}
		.title_number {
			margin-left: 10.87rpx;
			font-size: 32.608696rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #FF445A;
			line-height: 45.289855rpx;

		}
		.title_text {
			font-size: 32.608696rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: white;
			line-height: 45.289855rpx;
		}
	}
	.home_view_more {
		width: 141.304rpx;
		height: 49rpx;
		line-height: 47rpx;
		text-align: center;
		border-radius: 28.985507rpx;
		border: 1px solid #FFFFFF;
		font-size: 21.73913rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
        .view_more_icon {
			width: 14.493rpx;
			height: 14.492754rpx;
		}
	}
}
// 滚动列表样式
.home_swiper_list {
  margin-top: 38.043rpx;
  height: 235.507rpx;
  .swiper_item {
	  width: 215.899rpx;
	  height: 231.884rpx;
	  .swiper_item_list {
		position: relative;  
		width: 215.899rpx;
	    height: 231.884rpx;
		.card_content {
			text-align: center;
           .portrait_img{
			width: 101.449rpx;
			height: 101.449rpx;
			margin-top: 21.739rpx;
			border-radius: 50.725rpx;
			}
			.nick_name {
				padding: 18.116rpx 18.116rpx 0px 18.116rpx;
                text-align: center;
				// height: 30.797rpx;
				font-size: 21.739rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				// line-height: 30.797rpx;
			}
			.home_portrait {
				text-align: center;
				padding: 0 18.116rpx;
				height: 25.362rpx;
				font-size: 18.116rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				line-height: 25.362rpx;
			}
			.home_play {
				position: absolute;
				top: 104.348rpx;
				left: 90.58rpx;
				width: 36.232rpx;
				height: 36.232rpx;
			}
		}
		.swiper_bg_img {
		   position: absolute;	
		   top: 0;
		   left: 0;
		   z-index: -1;
		   width: 215.899rpx;
	       height: 231.884rpx;
		}
	  } 
  }
}
.soundWaves {
	margin-top: 41.667rpx;
	margin-bottom: 31.667rpx;
	height: 28.986rpx;
	width: 695.652rpx;
	padding: 0rpx 27.174rpx;
}
.home_demand_box {
  margin-top: 30.797rpx;
}
.margintop10 {
	margin-top: 18.116rpx;
}
</style>
