<template>
	<view>
		<web-view :src="websrc"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			  websrc: '',
			};
		},
		onLoad(options) {
			console.log('跳转的链接', options.src)
			this.websrc = options.src
		}
	}
</script>

<style lang="scss">

</style>
