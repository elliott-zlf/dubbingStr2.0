<template>
	<view
	 class="customer_service_box"
	 :style="{ width: `206.522rpx`, height: `79.71rpx`, top: `${top}px`, left: `${left}px` }"
	 @touchmove="touchmove"
	 @touchend="touchend"
	 @touchcancel="touchcancel"
	 @tap="onTap"
	 :animation="ballAnimation"
	 >
	 <button  class="invitationBtn" :style="{background:bg}" @click="handleJumpWeChat">
		  <image
			  class="service_icon"
			  src="@/static/my/cService1.png"
			  mode="scaleToFill"
		  />
		  <text class="service_text">{{ title }}</text>
	 </button>	  
	</view>
</template>

<script>
// 埋点统计
import { buriedSomeStatistical } from '@/utils/encapsulation.js'
export default {
    props: {
      title: {
        type: String,
        default: '配音顾问'
      },
	  bg: {
		type: String,
		default: '#FF445A'
	  },
	  bottomdistance: {
		  type: Number,
		  default: 150
	  }
    },
	data() {
		return {
			diameter: 0,
			top: 500,
			left: 750,
			isMove: false,
			ballAnimation: {},
			timeout: null,
			modile: {},
		};
	},
	name: 'hover-ball',
	created() {
		let _this = this;
		_this.modile = uni.getSystemInfoSync();
		_this.top = _this.modile.safeArea.bottom - _this.bottomdistance;
		_this.left = _this.modile.safeArea.right-100;
		_this.diameter = _this.modile.screenHeight / 15;
	},
	methods: {
		onTap() {
			// console.log('点击')
			// let _this = this;
			// let x = '0';
			// if (2 * _this.left >= _this.modile.safeArea.width) {
			// 	x = '-100%';
			// }
			// let create = uni.createAnimation({
			// 	duration: 0
			// });
			// create.translate(x).step();
			// _this.ballAnimation = create.export();
			// _this.overBall();
		},
		handleChangeDroball() {
          this.$emit('handleChangeDroball')
		},
		// 跳转到发布
		handleJumpWeChat() {
			  console.log('跳转到发布')
			  //统计极速试音埋点   
			  buriedSomeStatistical(2)
			  wx.openCustomerServiceChat({
					extInfo: {url: 'https://work.weixin.qq.com/kfid/kfcade993b61c3ff656'},
					corpId: 'ww901fbb3c6ecf9871',
					success(res) {
					  console.log('接入小程序客服成功')
					},
				    fail(err) {
                      console.log('接小程序客服失败',err)
					  uni.showToast({
							icon: 'none',
							title: '仅支持在手机微信中使用该功能哦'
					  });
					}
				})
		},
		touchmove(e) {
			let _this = this;
			_this.isMove = true;
			if (_this.timeout != null) {
				clearTimeout(_this.timeout);
				_this.timeout = null;
			}
			var touch = e.touches[0] || e.changedTouches[0];
			_this.left = touch.clientX;
			_this.top = touch.clientY;
		},
		touchend(e) {
			let _this = this;
			if (!_this.isMove) {
				return;
			}
			_this.finish(e);
		},
		touchcancel(e) {
			let _this = this;
			if (!_this.isMove) {
				return;
			}
			_this.finish(e);
		},
		finish(e) {
			let _this = this;
			_this.isMove = false;
			var touch = e.touches[0] || e.changedTouches[0];
			_this.left = touch.clientX;
			_this.top = touch.clientY;
			let x = '0';
			if (2 * _this.left + _this.diameter >= _this.modile.safeArea.width) {
				_this.left = _this.modile.safeArea.width;
				x = '-100%';
			} else {
				_this.left = _this.modile.safeArea.width;
			}
			if (_this.top > _this.modile.safeArea.height + _this.modile.safeAreaInsets.bottom) {
				_this.top = _this.modile.safeArea.height + _this.modile.safeAreaInsets.bottom; 
			} else if (_this.top < - _this.diameter / 2) {
				_this.top = _this.modile.safeArea.height + _this.modile.safeAreaInsets.bottom; 
			}
			let create = uni.createAnimation({
				duration: 0
			});
			create.translate(x).step();
			_this.ballAnimation = create.export();
			_this.overBall();
		},
		overBall() {
			let _this = this;
			_this.timeout = setTimeout(() => {
				_this.timeout = null;
				let create = uni.createAnimation({
					duration: 400,
					timingFunction: 'ease-in'
				});
				create.translate('-100%').step();
				_this.ballAnimation = create.export();
			}, 1200);
		}
	}
};
</script>

<style>
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
</style>
<style lang="scss">
.customer_service_box {
	position: fixed;
	text-align: center;
	width: 206.522rpx;
	height: 79.71rpx;
	line-height: 79.71rpx;
	// background: #FF445A;
	box-shadow: 0px 0px 6px 0px RGBA(99, 100, 104, 0.16);
	border-radius: 32px 0px 0px 32px;
	.service_icon {
		width: 21.739rpx;
		height: 30.986rpx;
		margin-left: 22.116rpx;
		margin-right: 5.435rpx;
	}
	.service_text {
		margin-left: 5rpx;
		font-size: 25.362rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		line-height: 36.232rpx;
		color: #FFFFFF;
	}

}

</style>
