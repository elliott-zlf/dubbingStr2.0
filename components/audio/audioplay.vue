<template>
	<view v-if='url' class='xpj-audio-box'>
		<view class="portrait_view">
           <image
			class="portrait_img"
			:src="portrait"
			mode="scaleToFill"
			/>
			<view class='play-btn'  @click='startPlay'>
				<image :src='startImg' class='play-icon' v-show='!status'></image>
				<image :src='endImg' class='play-icon' v-show='status'></image>
			</view>
		</view>
		<view class="music_title_box">
			<view class="music_title p-line-1">
                {{music_title}}
			</view>
			<view class="slider_box">
              <view class='current-time time-text'>{{format(currentTime)}}</view>
			   <view class='audio-action'>
					<slider 
						@change='changeAudio' 
						:activeColor="activeColor" 
						:block-color="blockColor"
						:backgroundColor="backgroundColor" 
						block-size="12"
						:disabled="currentTime==0"
						:min='0' :max='duration.toFixed(0)' 
						:value='currentTime.toFixed(0)' 
						:step='0.1'>
					</slider>
				</view>
				<view class='duration-time time-text'>{{format(duration)}}</view>
			</view>
			<image
			  class="musicClose"
			  src="@/static/home/musicClose.png"
			  mode="scaleToFill"
			  @click="musicClose"
			/>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				xpjAudio: null,
				currentTime: 0,
				duration: 100,
                status: false,
				interval: ''
			}
		},
		props: {
			url: String,
			activeColor: {
				type: String,
				default: '#FFFFFF'
			},
			blockColor:{
				type:String,
				default:'#FFFFFF'
			},
			backgroundColor:{
				type:String,
				default:'#EFEFEF'
			},
			blockSize:{
				type:Number,
				default:12,
			},
			portrait: {
			  type:String,
			  default:'/static/tabbar/logo.png',	
			},
			music_title: {
			  type:String,
			  default:'',	
			},
			startImg: {
				type:String,
				default:'/static/home/start_img.png',
			},
			endImg: {
				type:String,
				default:'/static/home/stop_img.gif',
			},
		},
		created() {
			this.xpjAudio = uni.createInnerAudioContext();
			this.xpjAudio.src = this.url;
			uni.setInnerAudioOption({
				obeyMuteSwitch: false  
			})
			this.onTimeUpdate();
			this.onCanplay();
			this.onEnded();
			uni.$on('stop',()=> {
				this.xpjAudio.stop()
				this.status = false
			})
			// this.startPlay()
		},
		methods: {
			//开始播放事件
			startPlay() { 
				console.log('音乐播放器刚进来时',this.status)
				if(this.status) {
					this.xpjAudio.pause();
					this.status = !this.status;
				}else {
					uni.$emit('stop')
					this.xpjAudio.seek(this.currentTime)
					this.xpjAudio.play()
					this.status = !this.status;
				}
				this.$emit('handleChangePlay',this.status)
			},
			//父组件开始播放事件
			preStartPlay() { 
				console.log('音乐播放器刚进来时',this.status)
				if(this.status) {
					this.xpjAudio.pause();
					this.status = !this.status;
				}else {
					uni.$emit('stop')
					this.xpjAudio.seek(this.currentTime)
					this.xpjAudio.play()
					this.status = !this.status;
				}
			},
			//进入可播放状态
			onCanplay() { 
				this.xpjAudio.onCanplay(() => {
					console.log('音频时长', this.xpjAudio.duration)
					this.interval = setInterval(()=>{
						if(this.xpjAudio.duration != 0 && !isNaN(this.xpjAudio.duration)){
							this.duration = this.xpjAudio.duration;
							this.onTimeUpdate();
							clearInterval(this.interval)
						}
			    	},100)
					this.xpjAudio.duration;
					// setTimeout(()=>{
					// 	this.duration = this.xpjAudio.duration;
					// })
				})
			},
			 //音频播放进度更新
			onTimeUpdate() {
				this.xpjAudio.onTimeUpdate(() => {
					console.log('音频时长', this.currentTime)
					this.currentTime = this.xpjAudio.currentTime;
				})
			},
			//播放结束事件
			onEnded() { 
				this.xpjAudio.onEnded(()=> {
					this.status = false;
					this.currentTime = 0;
					this.$emit('handleChangePlay',this.status)
				})
			},
			musicClose() {
			  console.log('点击关闭')
			  this.$emit('musicClose')	
			},
			// 拖拽播放事件
			changeAudio(e) {
				let paused = this.xpjAudio.paused;
				this.xpjAudio.pause();
				this.xpjAudio.seek(e.detail.value)
				if(!paused) {
					this.xpjAudio.play();
				} 
			},
			format(num) {
				return '0'.repeat(2 - String(Math.floor(num / 60)).length) + Math.floor(num / 60) + ':' + '0'.repeat(2 -
					String(Math.floor(num % 60)).length) + Math.floor(num % 60)
			},
		},
		destroyed(){
			this.xpjAudio.stop();
		},
		watch:{
			url(newVal){
				console.log(newVal)
				if(newVal){
					this.xpjAudio.stop();
					this.xpjAudio.src = newVal;
					this.currentTime = 0;
					// this.onTimeUpdate();
					this.onCanplay();
					this.onEnded();
					this.status = false
				}
			}
		}
	}
</script>

<style lang="scss">
	.xpj-audio-box {
		display: flex;
		// justify-content: space-between;
		align-items: center;
		// background: rgba($color: #000000, $alpha: .2);
		height: 100%;
		.portrait_view {
		  width: 108.696rpx;
		  height: 108.696rpx;
		  position: relative;
          .portrait_img {
			position: absolute;  
			left: 0;
			top: 0;
			width: 108.696rpx;
			height: 108.696rpx;
			background: #000000;
			border-radius: 4px;
			opacity: 0.6;
			}
			.play-btn{
				position: absolute;
				width: 108.696rpx;
			    height: 108.696rpx;
				text-align: center;	
				.play-icon {
					margin-top: 18.161rpx;
					width: 72.464rpx;
					height: 72.464rpx;
				}
			}
		}
		.music_title_box {
			position: relative;
			width: 525.362rpx;
			margin-left: 41.667rpx;
			.music_title {
				width: 462.101rpx;
				height: 36.232rpx;
				font-size: 25.362rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				// padding-top: 10rpx;
				color: #FFFFFF;
				line-height: 36.232rpx;
			}
			.musicClose {
				position: absolute;
				top: 5.87rpx;
				right: 10.87rpx;
				width: 28.986rpx;
				height: 28.986rpx;
			}
		}
		.slider_box{
			display: flex;
			// justify-content: space-between;
			height: 58rpx;
			width: 462.101rpx;
		    align-items: center;
		}
		.time-text{
			width: 25px;
			font-size: 18.116rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #CCCCCC;
		}
		.audio-action{
			flex: 1;
		}
	}
</style>
