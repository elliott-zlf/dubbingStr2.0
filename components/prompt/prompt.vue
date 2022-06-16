<template>
	<view class="container_res">
		<view class="content">
            <view class="home_title_slogan_box">
				<image
					class="slogan_icon"
					src="@/static/home/lefticon.png"
					mode="scaleToFill"
				/>
				<text class="title_slogan">温馨提示</text>
				<image
					class="slogan_icon"
					src="@/static/home/righticon.png"
					mode="scaleToFill"
				/>
			</view>
		  <view class="release_form">
            <view class="prompt_text">
				<view class="text">1、交付时间：工作时段下单（周一至周五9:00~18:00）一般<text class="red_text">30min~2h</text>为您上传成品，非工作时段则会在<text class="red_text">24h</text>内上传。遇节假日或周末会有所延迟，具体时间，下单后可咨询客服或等待短信通知</view>

				<view class="text">２、交付效果：成品将按照参考样音效果进行录制，有语气、语速要求请备注。<text class="red_text">多音字、特殊发音字、生僻字</text>，请在文本中标注</view>

				<view class="text">３、售后保障：成品经平台二次校验后交付，若仍有错配、漏配可联系客服<text class="red_text">免费修改</text></view>

				<view class="text">４、其他说明：<text class="red_text">特急订单</text>或<text class="red_text">对口型</text>等特定需求，请先咨询客服再下单，以免给您造成不便</view>
			</view>
		  </view>
		</view>
		<view class="release_btnbox">
			 <view class="release_btn" @click="handleCloseSubmitShow">
			   我知道了
			 </view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			subTitle: {
				type: Boolean,
				defaul: true  
			}
		},
		data() {
			return {
			  background: '#FFF5E9',
			  // 防止提交多次
			  submittime: true
			};
		},
		watch:{
			data: {
				handler(val) {
			     this.handleAssignment()
				},
				deep: true,
			}
		},
		created() {
		},
		beforeMount() {
	    },
		computed: {
		},
		methods: {
			handleCloseSubmitShow() {
				this.$emit('handleCloseSubmitShow')
			},
		}
	}
</script>
<style>
page {
  height: 100%;
  overflow: hidden;
  width: 100%;
}
.u-checkbox__label {
	margin-right: 0px !important;
}
.textarea-placeholder {
    font-size: 28.986rpx !important;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400 !important;
	color: #999999 !important;
}
</style>
<style lang="scss" scoped>
.container_res {
	height: 100%;
	background: #FFFFFF;
	border-top-right-radius: 24.493rpx;
    border-top-left-radius: 24.493rpx;
	.content {
		.home_title_slogan_box {
			height: 117.754rpx;
			display: flex;
			align-items: center;
			justify-content: center;
            border-bottom: 1px solid #F4F4F4;
			.slogan_icon {
			  width: 32.609rpx;
			  height: 18.116rpx;
			}
			.title_slogan {
				margin: 0 21.739rpx;
				height: 45.29rpx;
				font-size: 32.609rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #000000;
				line-height: 45.29rpx;
			}
		}
		.release_form {
		  background: #FFFFFF;	
		  .prompt_text {
			padding: 47.101rpx 81.522rpx;  
			font-size: 28.986rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #666666;
			line-height: 43.478rpx;
			word-wrap: break-word;
			.text {
				margin-top: 21.739rpx
			}
			.red_text {
				color: #FF445A;
			}
		  }
		}
	}
	.release_btnbox {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		margin-top: 70.739rpx;
		.release_btn {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 579.71rpx;
			height: 90.58rpx;
			background: #FF445A;
			border-radius: 50.725rpx;
            font-size: 32.609rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
		}
	}
}
</style>
