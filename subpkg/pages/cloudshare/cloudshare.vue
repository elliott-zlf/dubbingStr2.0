<template>
	<view  class="container">
		<u-navbar
			:is-back="true"
			:title="'云分享' "
			title-size="36.232rpx"
			title-color="#000000"
			:border-bottom="true"
			:background="background"
			back-icon-color="#000000"
		></u-navbar>
		<view v-if="sharePopShow" class="beenSelected">已选中<text class="redtext">{{checkednum}}</text>个音频文件</view>
		<view class="auditionListbox">
			<view class="shareportrait">
				<view class="audio_text">音频</view>
				<view class="choose_text">选择</view>
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
						<u-checkbox
						    v-if="sharePopShow"
							class="shareheckbox"
							v-model="item.checkedbox" 
							size="40"
							active-color="#FF445A"
							@change="handleCheckboxchange(item)"
						/>
					</view>
				</view>
			</view>
			<view class="sharebox">
				 <button
				    v-if="selecteditem.length==0"
					class="sharebtn"
					@click="fenxiang"
				 >
				  <image
					class="share_icon"
					src="@/static/demand/share.png"
					mode="scaleToFill"
				  />
				  分享给朋友	 
				 </button>
                 <button
				     v-else
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
	import uniCopy from '@/utils/uni-copy.js'
	import { fabulouworks } from '@/api/index.js'
	import { mapState } from "vuex";
	import { buriedSomeStatistical } from '@/utils/encapsulation.js'
	export default {
		components:{
			musicAudio
		},
		data() {
			return {
				dataList: [
				],
				current: null,
				audioShow: false,
				palydata: {},
				selecteditem: [],
				title: '',
				play: 'https://www.peiyinstreet.com/guidang/play.png',
				playActive: "https://www.peiyinstreet.com/guidang/palyActive.png",
				statePlay:false,
				checkednum: 0,
				demand_id: '',
				dataPlay: {
					url: ''
				},
				sharePopShow: true
			}
		},
		computed: {
			...mapState("user", ["token", "userInfo"]),
		},
		onLoad(options) {
            this.current = options.current
			this.demand_id = options.demand_id
			this.handleGetShardata(this.current)
		},
		onShareAppMessage(res) {
			this.sharePopShow = false;
			if (res.from === "button") {
			}
            this.title = "试音列表"
			console.log('分享出去的数据',this.selecteditem)
			var myDatalist = JSON.stringify(this.selecteditem);
            return {
				title: this.title,
				path: "/subpkg/pages/cshare/cshare?selecteditem="+encodeURIComponent(myDatalist)+"&current="+this.current+"",
				complete: function (res) {
					console.log("分享成功", res);
					this.sharePopShow = true;
				},
			};
		},
		methods: {
		   fenxiang() {
			  uni.showToast({
					title: '请先勾选分享项',
					icon: 'none'
				})
		   },
		   handleGetShardata() {
			  fabulouworks({demand_id: this.demand_id, status: 1}).then((res)=>{
				 console.log('获取分享数据', res)
				 this.dataList = res.data
				 
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
				buriedSomeStatistical(0)
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
				//checkbox选中
				setTimeout(() => {
					let aa = this.dataList.filter((item)=>{
					   console.log('11111111', item)
					   return item.checkedbox === true
					})
					this.selecteditem=[...new Set(aa)]
					console.log('注意的是的说的很对aa', aa)
					this.checkednum = this.selecteditem.length
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
	min-height: 500rpx;
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

