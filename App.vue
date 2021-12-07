<script>
import { mapState, mapActions } from "vuex";
import TIM from '@/TIM/tim-wx';
import COS from "@/TIM/cos-wx-sdk-v5";
import { chatSignature } from '@/api/message.js'
	export default {
		onLaunch: function() {
          this.getUnionid()
		  uni.setStorageSync('islogin', false);
		  // 重点注意： 为了 uni-app 更好地接入使用 tim，快速定位和解决问题，请勿修改 uni.$TUIKit 命名。
		  // 如果您已经接入 tim ，请将 uni.tim 修改为 uni.$TUIKit。
		  uni.$TUIKit = TIM.create({
		    SDKAppID: 1400535949
		  });
		  uni.$TUIKit.registerPlugin({
		    'cos-wx-sdk': COS
		  });
		  uni.$TUIKitTIM = TIM;
		  uni.$TUIKitEvent = TIM.EVENT;
		  uni.$TUIKitVersion = TIM.VERSION;
		  uni.$TUIKitTypes = TIM.TYPES; // 监听系统级事件
		  uni.$resetLoginData = this.resetLoginData()
		  
		  uni.$TUIKit.on(uni.$TUIKitEvent.SDK_NOT_READY, this.onSdkNotReady);
		  uni.$TUIKit.on(uni.$TUIKitEvent.KICKED_OUT, this.onKickedOut);
		  uni.$TUIKit.on(uni.$TUIKitEvent.ERROR, this.onTIMError);
		  uni.$TUIKit.on(uni.$TUIKitEvent.NET_STATE_CHANGE, this.onNetStateChange);
		  uni.$TUIKit.on(uni.$TUIKitEvent.SDK_RELOAD, this.onSDKReload);
		  uni.$TUIKit.on(uni.$TUIKitEvent.SDK_READY, this.onSDKReady);
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
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
		},
		methods: {
            ...mapActions("user", ["login"]),
			getUnionid() {
				uni.login({
					provider: "weixin",
					success: async (result) => {
					await this.login(result.code);
					const userIdres = await chatSignature()
					console.log('userIdD', userIdres)
					const userID = userIdres.data.userId
					const userSig = userIdres.data.sign
					
					this.setData({
					  userID: userID,
					})
					uni.$TUIKit.login({
						userID: userID,
						userSig: userSig
					}).then(() => {}).catch(() => {});
					},
					fail: (error) => {
					console.log("登录失败", error);
					},
				});
			},
			// TODO:
			resetLoginData() {
			  this.globalData.expiresIn = '';
			  this.globalData.sessionID = '';
			  this.globalData.userInfo = {
			    userID: '',
			    userSig: '',
			    token: '',
			    phone: ''
			  };
			  this.globalData.userProfile = null;
			},
			onTIMError() {},
			onNetStateChange() {},
			onSDKReload() {},
			onSDKReady() {},
			onSdkNotReady() {},
			onKickedOut() {
			  uni.showToast({
				title: '您被踢下线',
				icon: 'error'
			  });
			  uni.navigateTo({
				url: './pages/TUI-Login/login'
			  });
			},
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
</style>
