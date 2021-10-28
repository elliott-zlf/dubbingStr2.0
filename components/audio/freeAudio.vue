<template>
	<view class="audio-page">
		<view class="box-left">
			<image class="box-img" :src="image" mode="aspectFill"></image>
			<view class="page-btn" @click="clickAudio">
				<image :src="music_play ? stop_img:start_img" mode="widthFix"></image>
			</view>
		</view>
		<view class="box-content">
			<view class="content-name">{{title}}</view>
			<view class="progress">
				<text>{{getMinuteTime(now_time)}}</text>
				<slider :value="now_time/total_time*100" block-size="10" block-color="#FF3333" activeColor="#FF3333" @change="sliderChange"></slider>
				<text>{{getMinuteTime(total_time)}}</text>
			</view>
		</view>
	</view>
</template>

<script>
import start_img from "@/static/home/start_img.png"
import stop_img from "@/static/home/stop_img.gif"
	export default {
		name:"WZS-Audio",
		// props: {
		// 	palydata: {
		// 		type: Object,
        //         default: () => {
		// 			return {}
		// 		}
		// 	}
		// },
		props:[
			"music","image","title","autoplay","palydata"
		],
		data() {
			return {
				music_play: false,
				AUDIO:'',
				total_time:'',
				now_time:0,
				timeupdata:'',
				interval:'',
				start_img: start_img,
				stop_img: stop_img
			};
		},
		watch: {
			autoplay: {
				handler(val) {
			     this.clickAudio()
				},
				deep: true,
			}
		},
		created() {
		  this.playAudio()
		},
		mounted(){
		},
		methods:{
			changeparentcomponent() {
              
			},
			// 播放音乐
			playAudio(){
				this.AUDIO = uni.createInnerAudioContext()
				this.AUDIO.src = this.music
				if(this.autoplay){
					this.AUDIO.autoplay = true
					this.music_play = true
					this.AUDIO.play()
				}
				this.interval = setInterval(()=>{
					if(this.AUDIO.duration != 0 && !isNaN(this.AUDIO.duration)){
						this.total_time = Math.round(this.AUDIO.duration)
						clearInterval(this.interval)
					}
				},100)
				this.timeupdata = setInterval(()=>{
					if(this.music_play){
						this.now_time ++
						if(this.now_time >= this.total_time){
							this.music_play = false
							this.now_time = 0
						}
					}
				},1000)
			},
			clickAudio(){
				console.log('音乐播放器',this.music_play)
				if(this.music_play){
					this.music_play = false
					this.AUDIO.pause()
				}else{
					this.music_play = true
					this.AUDIO.play()
				}
			},
			// 拖动进度条
			sliderChange(e){
				console.log(e)
				let second = e.detail.value / 100 * this.total_time
				this.AUDIO.seek(second)
				this.now_time = second
			},
			// 秒转换分秒
			getMinuteTime(data){
				let minute = parseInt(data/60)
				let second = parseInt(data%60)
				if(minute.toString().length == 1) minute = `0${minute}`
				if(second.toString().length == 1) second = `0${second}`
				return `${minute}:${second}`
			}
		},
		destroyed() {
			this.music_play = false
			this.AUDIO.pause()
			clearInterval(this.timeupdata)
		}
	}
</script>

<style lang="scss">
.audio-page{
	width: 650upx;
	height: 120upx;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background: #f6f7f9;
	box-shadow: 6upx 6upx 19upx #ccc;
	.box-left{
		width: 130upx;
		height: 130upx;
		position: absolute;
		left: 0;
		bottom: 0;
		display: flex;
		.box-img{
			width: 100%;
			height: 100%;
			// position: absolute;
			// left: 0;
			// top: 0;
			border-radius: 10rpx;
			z-index: 2;
		}
		.page-btn{
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			position: absolute;
			left: 0;
			top: 0;
			z-index: 3;
			image{
				width: 50upx;
				height: 50upx;
				background-color: rgba($color: #f6f7f9, $alpha: 0.3);
				border-radius: 50%;
			}
		}
	}
	.box-content{
		width: 400upx;
		margin-left: 140upx;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		// padding: 0 30upx;
		box-sizing: border-box;
		font-size: 24upx;
		.content-name{
			width: 100%;
			color: #979797;
			display: -webkit-box;/* 弹性盒模型 */
			-webkit-box-orient: vertical;/* 元素垂直居中*/
			-webkit-line-clamp: 1;/*  文字显示的行数*/
			overflow:hidden;/* 超出隐藏 */
		}
		.progress{
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			slider{
				width: 80%;
			}
		}
	}
}
</style>
