<template>
	   <!-- 未创建 -->
	<view class="pys_popup">
		<view class="popup_conent">
			<image
				class="closeicon"
				src="@/static/home/close.png"
				mode="scaleToFill"
				@click="handleclose"
			/>
			<view>
			<view style="height:17.971rpx"></view>	
			<view class="check_WeChat_test">
				关闭订单
			</view>
			<view class="check_WeChat_tips">订单关闭后将不可恢复，确定关闭订单吗</view>
			<view class="share_btn_box">
					<button
						class="cancelSharebtn"
						hover-class="button-hover"
						@click="handleclose"
					>
					我再想想	 
					</button>
					<button
						class="sharebtn"
						@click="handleConfirm"
					>
					立即关闭
					</button>
			</view>
			</view>
		</view>
	</view>	
</template>

<script>
	export default {
		name:"pyspopup",
		 props: {
			notputShow: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
			};
		},
		methods: {
          handleclose() {
            this.$emit('handleclose')
		  },
		  handleConfirm() {
            this.$emit('handleConfirm')
		  }
		}
	}
</script>

<style lang="scss">
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
		height: 36.232rpx;
		text-align: center;
		font-size: 25.362rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #000000;
		line-height: 36.232rpx;
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
