<template>
	<view class="container_res">
		<web-view :src="websrc"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			  websrc: '',
			  title: '配音街',
			  background: {
				backgroundColor: "#FFFFFF",
			  }
			};
		},
		onShareAppMessage(res) {
			if (res.from === "button") {
			// 来自页面内分享按钮
			console.log(res.target);
			}
			return {
			// title: '这是'+this.dataList.nickname + "的声音主页，点击在线试听样音",
			title: '',
			path: "",
			imageUrl: "",
			complete: function (res) {
				console.log("分享成功", res);
			},
			};
		},
		onLoad(options) {
			console.log('跳转的链接', options.src)
			this.websrc = options.src
			this.title = options.title
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
<style lang="scss">
.container_res {
	height: 100%;
	background: #FFFFFF;
	overflow-y: auto;
}
</style>
