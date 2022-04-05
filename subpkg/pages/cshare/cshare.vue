<template>
	<view  class="container">
		<u-navbar
			:is-back="false"
			:title="'试音列表' "
			title-size="36.232rpx"
			title-color="#000000"
			:border-bottom="true"
			:background="background"
			back-icon-color="#000000"
		></u-navbar>
		<view class="auditionListbox">
			<view class="shareportrait">
				<view class="audio_text">音频文件</view>
				<view class="choose_text"></view>
			</view>
			<view class="listcontentbox">
				<view class="listcontent" v-for="(item,index) in dataList" :key="index">
					<image class="btniconmini" :src="item.playStatus ? playActive : play" mode="scaleToFill" @click="playTheMusic(item)" />
					<view class="viotitle u-line-1">{{item.title}}</view>
					<view class="playimgbox">
						<image
							v-if="current!=0"
							class="dowanloadimg "
							src="@/static/teacherlist/download.png"
							mode="scaleToFill"
							@click="downloadcopy(item)"
						/>
					</view>
				</view>
			</view>
			<view class="sharebox">
                 <button
				     class="sharebtn"
					 open-type="share"
					 hover-class="button-hover"
				 >
				 <image
					class="share_icon"
					src="@/static/demand/share.png"
					mode="scaleToFill"
				  />
				 分享给朋友	 
				</button>
			</view>
			<view class="mianxiazhai">好友批量试听，免下载</view>
		</view>
	    <view v-if="audioShow" class="home_musicSrc_box disappear">
          <musicAudio 
			ref="musicAudio"
			:url="dataPlay.url"
			:autoplay="true"
			:portrait="dataPlay.teacher.avatar"
			:music_title="dataPlay.title"
			@handleChangePlay="handleChangePlay"  
			@musicClose="musicClose"
		  ></musicAudio>
	    </view>
	</view>
</template>

<script>
	import musicAudio from "@/components/audio/audioplay.vue";
	import { mapState } from "vuex"
	import uniCopy from '@/utils/uni-copy.js'
	export default {
		components:{
			musicAudio
		},
		data() {
			return {
				dataList: [],
				current: null,
				audioShow: false,
				statePlay: false,
				palydata: {},
				textLink: '',
				selecteditem: [],
				play: 'https://www.peiyinstreet.com/guidang/play.png',
				playActive: "https://www.peiyinstreet.com/guidang/palyActive.png",
				dataPlay: {
					url: ''
				}
			}
		},
		computed: {
			...mapState("user", ["token", "userInfo"]),
		},
		watch: {
			palydata: {
				handler(val) {
					this.changeparentcomponent(val)
				},
				immediate: true,
				deep: true
			}
		},
		onLoad(options) {
			this.current = options.current
			console.log('分享后的样音',this.current)
			console.log('分享进来的数据', options,decodeURIComponent(options.selecteditem))
			var newdata = JSON.parse(decodeURIComponent(options.selecteditem))
			newdata.map((res)=>{
				res.statePlay = false
				res.checkedbox = false
			})
			this.dataList= newdata
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
			uni.hideHomeButton()
		},
		methods: {
		    changeparentcomponent(voicedata){
				this.dataList.map((item,index)=>{
					if(item.id===voicedata.id) {
					item.statePlay = voicedata.statePlay
					}else {
					item.statePlay= false
					}
				})
		   },
		    // 音乐播放按钮
		  playTheMusic(orderItem) {
			console.log("传过来的数据", orderItem, this.dataList);
			this.audioShow = true;
			if (this.dataPlay.url === orderItem.url) {
				this.dataList.map((item) => {
				if (this.dataPlay === item) {
					orderItem.playStatus = !orderItem.playStatus;
				} else {
					item.playStatus = false;
				}
			   });

			} else {
				this.dataList.map((item) => {
				item.playStatus = false;
				});
				orderItem.playStatus = true;
				this.dataPlay = orderItem;
			}
			setTimeout(() => {
				this.$refs.musicAudio.preStartPlay();
			}, 0);
		  },
		  handleChangePlay(status) {
				this.dataList.map((item) => {
					if (this.dataPlay === item) {
					item.playStatus = status;
					} else {
					item.playStatus = false;
					}
				});
		  },
		  musicClose() {
				this.dataList.map((item) => {
					item.playStatus = false;
				});
				this.audioShow = false;
				this.dataPlay = {
					url: "",
				};
		  },
		  handleCheckboxchange(item) {
                this.selecteditem.push(item)
				console.log( this.selecteditem)
				this.selecteditem=[...new Set(this.selecteditem)]
				//checkbox选中
				setTimeout(() => {
					let aa = this.dataList.filter((item)=>{
					return item.checked === true
					})
					this.checkednum = aa.length
				}, 0);
		   },
		   downloadcopy(item) {
				uniCopy({
					content:item.url,
					success:(res)=>{
						uni.showToast({
							title: '下载链接已复制，请粘贴到浏览器打开',
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
<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
  width: 100%;
}
.u-checkbox__label {
	margin-right: 0px !important;
}
.container {
	position: relative;
	height: 100%;
	width: 100%;
	overflow-y: auto;
	background: #f6f7f9;
	.home_musicSrc_box {
		position: fixed;
		z-index: 999999;
		bottom: 120rpx;
	}
	
    // .closeAudio {
    //     position: absolute;
    //     width: 80rpx;
    //     height: 120rpx;
    //     font-size: 40rpx;
    //     line-height: 120rpx;
    //     text-align: center;
    //     background: #EEEEEF;
    //     top: 0rpx;
    //     z-index: 1;
    //     right: 0rpx;
    // }
}
.navTitle {
	position: absolute;
	left: 0;
	width: 100%;
	text-align: center;
	font-size: 40rpx;
	font-family: PingFangSC-Semibold, PingFang SC;
	font-weight: 600;
	color: #111111;

}
.auditionListbox {
	margin-top: 34.42rpx;
	width: 700rpx;
	background-color: #FFFFFF;
	margin-left: 25rpx;
	padding-top: 1.812rpx;
	padding-bottom: 1.812rpx;
	border-radius: 25.362rpx;
	.shareportrait {
	  margin-top: 32rpx;	
      display: flex;
	  align-items: center;
	  padding: 0px 25rpx;
	  height: 36.232rpx;
	  font-size: 25.362rpx;
	  font-family: PingFangSC-Regular, PingFang SC;
	  font-weight: 400;
	  color: #999999;
	  line-height: 36.232rpx;
	  .audio_text {
		  width: 50%;
	  }
	  .choose_text {
		  text-align: right;
		  width: 50%;
	  }
	
	}
}
.listcontentbox {
	margin-top: 32rpx;
	background-color: #FFFFFF;
	border-radius: 25rpx;
	min-height: 505.797rpx;
  .listcontent {
	width: 100%;
	height: 128rpx;  
	padding: 15rpx 28rpx;
	justify-content: flex-end;
    display: flex;
	align-items: center;
	border-bottom: 1px #EDEDED dashed;
	.rankback {
		width: 44rpx;
		height: 44rpx;
		border-radius: 22rpx;
		text-align: center;
		background: linear-gradient(180deg, #FF3A3A 0%, #FE9E9F 100%);
		box-shadow: 0px 2px 4px 0px rgba(246, 87, 87, 0.5);
		.textrank {
			font-size: 20rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
		}
	}
	.viotitle {
		width: 400rpx;
		margin-left: 20rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #242424;
	}
	.playimgbox{
		display: flex;
		width: 200rpx;
		justify-content: flex-end;
	}
	.btniconmini{
		width: 47.101rpx;
		height: 47.101rpx;
	}
	.dowanloadimg {
		width: 40rpx;
		height: 38rpx;
		margin-right: 30rpx;
	}
	.shareheckbox {
	}
  }
}
.sharebox {
	text-align: center;
	margin-top: 74.275rpx;
	.sharebtn {
      width: 485.507rpx;
	  height: 90.58rpx;
	  border-radius: 45.29rpx;
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  background: #FF445A;
	  font-size: 32.609rpx;
	  font-family: PingFangSC-Medium, PingFang SC;
	  font-weight: 500;
	  color: #FFFFFF;
	  .share_icon {
		margin-right: 11px;  
		width: 34.42rpx;
		height: 34.42rpx;
	  }
	}
	.sharebtn::after {
        border: none !important;
	  }
 
}
.beenSelected {
	height: 137.681rpx;
	display: flex;
	margin-left: 27.174rpx;
	align-items: center;
	font-size: 18px;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: RGBA(4, 4, 4, 1.00);
}
.mianxiazhai {
	width: 100%;
	text-align: center;
	height: 36.232rpx;
	font-size: 25.362rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #999999;
	line-height: 36.232rpx;
	margin: 25.362rpx 0rpx;

}
.redtext {
	margin-left: 5.058rpx;
	margin-right: 5.058rpx;
	color: #FF445A;
}

</style>
