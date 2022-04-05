<script>
import { mapState, mapActions } from "vuex";
// import TIM from '@/TIM/tim-wx';
// import COS from "@/TIM/cos-wx-sdk-v5";
// import { chatSignature,newsCount } from '@/api/message.js'
	export default {
		onLaunch: function() {
        //   this.getUnionid()
		  //uni.setStorageSync('islogin', false);
		  // uni.$TUIKit = TIM.create({
		  //   SDKAppID: 1400535949
		  // });
		  // uni.$TUIKit.registerPlugin({
		  //   'cos-wx-sdk': COS
		  // });
		  // uni.$TUIKitTIM = TIM;
		  // uni.$TUIKitEvent = TIM.EVENT;
		  // uni.$TUIKitVersion = TIM.VERSION;
		  // uni.$TUIKitTypes = TIM.TYPES; // 监听系统级事件
		  // uni.$resetLoginData = this.resetLoginData()
		  
		  // uni.$TUIKit.on(uni.$TUIKitEvent.SDK_NOT_READY, this.onSdkNotReady);
		  // uni.$TUIKit.on(uni.$TUIKitEvent.KICKED_OUT, this.onKickedOut);
		  // uni.$TUIKit.on(uni.$TUIKitEvent.ERROR, this.onTIMError);
		  // uni.$TUIKit.on(uni.$TUIKitEvent.NET_STATE_CHANGE, this.onNetStateChange);
		  // uni.$TUIKit.on(uni.$TUIKitEvent.SDK_RELOAD, this.onSDKReload);
		  // uni.$TUIKit.on(uni.$TUIKitEvent.SDK_READY, this.onSDKReady);
		  // uni.$TUIKit.on(uni.$TUIKitEvent.MESSAGE_RECEIVED, this.onMessageReceived);
		},
		computed: {
		  ...mapState("user", ["token", "userId"]),
		},
		globalData: {
		  // userInfo: userID userSig token phone
		  userInfo: null,
		  // 个人信息
		  userProfile: null,
		  headerHeight: 0,
		  statusBarHeight: 0,
		  url: ''
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
            ...mapActions("user", ["login"]),
			getUnionid() {
				uni.login({
					provider: "weixin",
					success: async (result) => {
					await this.login(result.code);
					console.log('APP里面的登录')
					// const userIdres = await chatSignature()
					// console.log('userIdD', userIdres)
					// const userID = userIdres.data.userId
					// const userSig = userIdres.data.sign
					// this.getNewsCount(userID)
					// this.setData({
					//   userID: userID,
					// })
					// uni.$TUIKit.login({
					// 	userID: userID,
					// 	userSig: userSig
					// }).then(() => {}).catch(() => {});
					},
					fail: (error) => {
					console.log("登录失败", error);
					},
				});
			},
			// getNewsCount(userID) {
			//   newsCount({userId:userID}).then((res)=>{
			// 	const allMsg = res.data.AllC2CUnreadMsgNum + ''
			// 	if (allMsg=='0') {
			// 		 uni.removeTabBarBadge({
			// 			index: 2,
			// 		})
			// 	} else {
			// 		uni.setTabBarBadge({
			// 			index: 2,
			// 			text: allMsg
			// 		})
			// 	}
			//   })
			// },
			// TODO:
			// resetLoginData() {
			//   this.globalData.expiresIn = '';
			//   this.globalData.sessionID = '';
			//   this.globalData.userInfo = {
			//     userID: '',
			//     userSig: '',
			//     token: '',
			//     phone: ''
			//   };
			//   this.globalData.userProfile = null;
			// },
			// onTIMError() {},
			// onNetStateChange() {
			// },
			// onMessageReceived(event) {
			// 	console.log('牛逼了兄弟')
			// 	this.getNewsCount(this.userId)
			// },
			// onSDKReload() {},
			// onSDKReady() {},
			// onSdkNotReady() {},
			// onKickedOut() {
			//   uni.showToast({
			// 	title: '您被踢下线',
			// 	icon: 'error'
			//   });
			// },
		}
	}
	
</script>

<style>
	/*每个页面公共css */
	.home_musicSrc_box {
		width: 675.725rpx;
		height: 108.696rpx;
		margin-left: 38.043rpx;
		background: #000000;
		border-radius: 7.246rpx;
		opacity: 0.8;
	}
</style>
<style lang="scss">
	@import "uview-ui/index.scss";
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
		text-align: center;
		font-size: 25.362rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #000000;
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
	// 优惠卷样式
	.securities {
	position: fixed;
	bottom:295rpx;
	right: 23.551rpx;
	width: 123.986rpx;
	height: 130.326rpx;
	// animation: ghostUpdown 1s infinite alternate;
	.shutdown_icon {
		width: 32.986rpx;
		height: 32.986rpx;
		position: absolute;
		top: -36.232rpx;
		right: 0px;
	}
	.volume {
	  width: 123.986rpx;
	  height: 130.326rpx;
	  animation: zy 2.5s .15s linear infinite;
	  -moz-animation: zy 2.5s .15s linear infinite; /* Firefox */
	  -webkit-animation: zy 2.5s .15s linear infinite; /* Safari and Chrome */
	}
}
@-webkit-keyframes zy{
  10% {
    transform: rotate(15deg);
  }
  20% {
    transform: rotate(-10deg);
  }
  30% {
    transform: rotate(5deg);
  }
  40% {
    transform: rotate(-5deg);
  }
  50%,100% {
    transform: rotate(0deg);
  }
}
@-moz-keyframes zy{
  10% {
    transform: rotate(15deg);
  }
  20% {
    transform: rotate(-10deg);
  }
  30% {
    transform: rotate(5deg);
  }
  40% {
    transform: rotate(-5deg);
  }
  50%,100% {
    transform: rotate(0deg);
  }
}
@keyframes zy{
  10% {
    transform: rotate(15deg);
  }
  20% {
    transform: rotate(-10deg);
  }
  30% {
    transform: rotate(5deg);
  }
  40% {
    transform: rotate(-5deg);
  }
  50%,100% {
    transform: rotate(0deg);
  }

}
@keyframes ghostUpdown{
    from{right:13.551rpx;}
    to{right:23.551rpx;}
}
@-webkit-keyframes ghostUpdown{
    from{/*! bottom:110px; */}
    to{/*! bottom:120px; */}
}
</style>
