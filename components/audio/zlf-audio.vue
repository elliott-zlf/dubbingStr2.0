<template>
	<view class="audio-warp" :style="[style]">
		<view class="cover-warp" :class="{ hasbg: !poster }">
			<image class="cover-img" :src="poster ? poster : defateimg"></image>
			<!-- <view class="play-btn" :class="{ pause: play }" @click="handleBtnClick"></view> -->
		</view>
		<view class="audio-con">
			<view class="audio-time-info">
				<text class="audio-time">{{ audioTimeUpdate }}</text>
				<slider class="audio-slider" :block-size="12" block-color="#FF445A" activeColor="#FF445A" :value="value" @changing="_seeking" @change="_seeked" />
				<text class="audio-time">{{ audioTimeTotal }}</text>
			</view>
			<text class="audio-title am-text-eill">{{ name }}</text>
			<!-- <text class="audio-author am-text-eill">{{ author }}</text> -->
		</view>
	</view>
</template>

<script>
/**
 * Props itemsProps
 * @prop {Boolean} play - 是否播放，双向绑定，绑定时需使用.sync 如果为true 则播放，为false 则暂停
 * @prop {Boolean} msshow 是否显示毫秒，默认是false
 * @prop {String} width 宽度,若是数值则单位是rpx，可带单位，但不可为 auto,默认是100%
 * @prop {String} size 字体大小,若是数值则单位是rpx，可带单位，但不可为 auto,APP和小程序默认是14px,H5默认是16px
 *
 * 支持通过refs调用获取音频信息
 * this.$refs.audio.getDuration()获取总时间
 * this.$refs.audio.getCurrentTime()获取当前时间
 *
 * 其他api同文档 （https://uniapp.dcloud.io/api/media/audio-context?id=createinneraudiocontext）
 */
let _this;
/**
 * 将秒转换为 分:秒
 * @param {Number} s - 秒数
 * @param {Boolean} flag是否显示毫秒
 */
function sToHs(s, flag = false) {
	//计算分钟
	//算法：将秒数除以60，然后下舍入，既得到分钟数
	let ms = s % 1000;
	s = s / 1000;
	let h;
	h = Math.floor(s / 60);
	//计算秒
	//算法：取得秒%60的余数，既得到秒数
	s = Math.floor(s % 60);
	//将变量转换为字符串
	h += '';
	s += '';
	ms += '';
	//如果只有一位数，前面增加一个0
	h = h.length === 1 ? '0' + h : h;
	s = s.length === 1 ? '0' + s : s;
	ms = ms.length === 1 ? '00' + ms : ms.length == 2 ? '0' + ms : ms;
	if (flag) return h + ':' + s + '.' + ms;
	return h + ':' + s;
}
import defateimg from "@/static/tabbar/logo.png"
import stop_img from "@/static/home/stop_img.gif"
export default {
	props: {
		play: {
			type: Boolean,
			required: true
		},
		src: {
			type: String
		},
		poster: {
			type: String,
			default: ''
		},
		name: {
			type: String,
			default: ''
		},
		author: {
			type: String,
			default: ''
		},
		autoplay: {
			type: Boolean,
			default: false
		},
		loop: {
			type: Boolean,
			default: false
		},
		obeyMuteSwitch: {
			type: Boolean,
			default: true
		},
		// 音量控制[0-1]
		volume: {
			type: Number,
			default: 1
		},
		//是否显示毫秒
		msshow: {
			type: Boolean,
			default: false
		},
		// 宽度,默认是100%
		width: {
			type: String,
			default: '100%'
		},
		//字体基准大小,布局是基于em而来的
		size: {
			type: String,
			default: '14px'
		},
		//滑动选择器滑块样式
		block: {
			type: Object,
			default() {
				return {
					size: 12,
					color: '#FF751f'
				};
			}
		}
	},
	computed: {
		style() {
			let style = {};
			//宽度
			if(this.width=='auto') style.width='100%';
			else style.width = this.addUnit(this.width);
			//字体大小
			if(this.size=='auto') style.fontSize='14px';
			else style.fontSize=this.addUnit(this.size);
			// #ifdef H5
			//H5默认字体是16px
			if(this.size=='auto') style.fontSize='16px';
			// #endif
			return style;
		}
	},
	data() {
		return {
			audioTimeUpdate: '00:00',
			audioTimeTotal: '00:00',
			innerAudioContext: null,
			value: 0,
			interval: '',
			defateimg: defateimg
		};
	},
	watch: {
		play(n) {
			if (n){
				_this.innerAudioContext.play();
			}
			else {
				_this.innerAudioContext.pause();
			}
		},
		src() {
			_this.innerAudioContext.destroy();
			_this.contextInit();
		}
	},
	created() {
		_this = this;
		if (_this.msshow) _this.audioTimeUpdate = '00:00.000';
		_this.contextInit();
	},
	beforeDestroy() {
		_this.innerAudioContext.destroy();
	},
	methods: {
		audioPlay() {
			_this.$emit('update:play', true);
		},
		audioPause() {
			_this.$emit('update:play', false);
		},
		handleBtnClick() {
			_this.$emit('update:play', !_this.play);
		},
		contextInit() {
			let innerAudioContext = uni.createInnerAudioContext();
			innerAudioContext.autoplay = _this.autoplay;
			innerAudioContext.src = _this.src;
			innerAudioContext.loop = _this.loop;
			//设置报错，提示它只是只读属性
			// innerAudioContext.obeyMuteSwitch = _this.obeyMuteSwitch;
			innerAudioContext.onCanplay(() => {
				this.interval = setInterval(()=>{
					if(innerAudioContext.duration != 0 && !isNaN(innerAudioContext.duration)){
						_this.audioTimeTotal = sToHs(Math.floor(innerAudioContext.duration * 1000), _this.msshow);
						clearInterval(this.interval)
					}
			    },100)
			});
			innerAudioContext.onPlay(() => {
				_this.audioTimeUpdate = sToHs(Math.floor(innerAudioContext.currentTime * 1000), _this.msshow);
				_this.audioPlay();
			});
			innerAudioContext.onTimeUpdate(function() {
				_this.audioTimeUpdate = sToHs(Math.floor(innerAudioContext.currentTime * 1000), _this.msshow);
				_this.value = (innerAudioContext.currentTime / innerAudioContext.duration) * 100; // 不在拖动状态下
			});
			innerAudioContext.onEnded(function() {
				_this.audioTimeUpdate = sToHs(Math.floor(innerAudioContext.duration * 1000), _this.msshow);
				_this.value = 100;
				_this.audioPause();
			});
            // setTimeout(()=>{
            //   _this.audioTimeTotal =  sToHs(Math.floor(innerAudioContext.duration * 1000), _this.msshow);
			// },2000)
			innerAudioContext.onError(res => {});
			_this.innerAudioContext = innerAudioContext;
			// _this.$emit('update:play', false);
		},
		_seeking(e) {},
		_seeked(e) {
			_this.innerAudioContext.seek((e.detail.value / 100) * _this.innerAudioContext.duration);
		},
		getDuration() {
			//返回总时间
			return _this.innerAudioContext.duration;
		},
		getCurrentTime() {
			return _this.innerAudioContext.currentTime;
		},
		// 添加单位，如果数值则单位是rpx，其它如rpx，%，px，em,vw,vh等单位结尾或者值为auto，直接返回
		addUnit(value = 'auto', unit = 'rpx') {
			value = String(value);
			return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value) ? `${value}${unit}` : value;
		}
	}
};
</script>

<style lang="scss">
.am-text-eill {
	/*超出省略号*/
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.audio-warp {
	display: flex;
	overflow: hidden;
	background: #EEEEEF;
    height: 120rpx;
	border-radius: 0.2em;
}

.cover-warp {
	position: absolute;
	top: -10rpx;
	flex-shrink: 0;

	width: 130upx;
	height: 130upx;

	&.hasbg {
		background-color: #e6e6e6;
	}

	.cover-img {
		width: 130upx;
		height: 130upx;
		position: absolute;
		left: 0;
		bottom: 0;
		border-radius: 10rpx;
	}

	.play-btn {
		//居中
		position: absolute;		
		left: 50%;
		top: 50%;
		transform: translateX(-50%) translateY(-50%);
		width: 2.5em;
		height: 2.5em;		
		border-radius: 50%;
		background-size: 100% 100%;
		background-image: url('@/static/home/start_img.png');

		&.pause {
			background-image: url('@/static/home/palyActive.png');
		}
	}
}

.audio-con {
	position: relative;
	margin-left: 135rpx;
	padding: 0 0.5em;
	background-color: #fcfcfc;

	.audio-title {
		position: absolute;
		top: 10rpx;
		color: #353535;
	}

	.audio-author {
		position: absolute;
		bottom: 0;
		color: #888888;
	}

	.audio-time-info {
		display: flex;
		flex-wrap: nowrap;
		width: 400rpx;
		height: 100%;
		align-items: center;
		//要添加该属性，防止滑动报错
		touch-action: none;

		.audio-time {
			margin-top: 30rpx;
			color: #9d9d9d;
		}

		.audio-slider {
			margin-top: 50rpx;
			margin-left: 20rpx;
			margin-right: 20rpx;
			color: #FF445A;
			flex: 1;
		}
	}
}
</style>
