<template>
<view>
<view class="teacherlist_box">
		<u-navbar :is-back="true" back-text="更多" title="影人工具大全" title-size="36.232rpx" title-color="#000000" :custom-back="handleGoBack"></u-navbar>
		<view class="wrap">
			<view class="u-tabs-box">
				<u-tabs
                  activeColor="#FF445A"
				  bold
				  ref="tabs"
				  bg-color="#FFFFFF" 
				  inactive-color="#666666"
				  :bar-style="barStyle" 
				  name="title" 
				  :list="list" 
				  :current="current" 
				  @change="change" 
				  :is-scroll="true" 
				  font-size='28.362'
				></u-tabs>
			</view>
				<scroll-view scroll-y style="height:100%; width: 100%;" @scroll="tabScoll" :scroll-top="scrollInto" @scrolltolower="reachBottom" :refresher-triggered="triggered">
					<view class="page-box" v-if="defaultshow">
						<view class="teacherOrder" :id="'wrap'+index" v-for="(orderItem, index) in dataList" :key="index">
							<view class="list_title_box">
								<image
									class="title_icon"
									src="@/static/home/found.png"
									mode="scaleToFill"
								/>
								<text class="title_text">{{orderItem.name}}</text>
							</view>
							<view class="list_item_box">
								<view class="list_item" v-for="item in orderItem.msg" :key="item.id">
									<view class="item_logo_box">
										<image
										class="item_logo"
										:src="item.head_img"
										mode="scaleToFill"
										/>
									</view>
									<view class="item_webName_box" @click="handleCheckWeb(item.url)">
										<view class="webName u-line-1">{{item.title}}</view>
										<view class="website_box">
											<text class="website u-line-1">
												{{item.content}}
											</text>
											<!-- <text class="web_linke">
											前往
											</text>
											<image
												class="golink"
												src="@/static/home/golink.png"
												mode="scaleToFill"
											/> -->
										</view>
									</view>
								</view>
							</view>
						</view>
						<!-- <u-loadmore :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore> -->
					</view>
					<view v-if="!defaultshow" class="page-box">
						<view class="defaltPage">
							<!-- <image
								class="defaltPageimg"
								src="@/static/ui/defaultPage/d1.png"
								mode="scaleToFill"
							/> -->
							<view class="defaltext">暂时没有匹配数据</view>
						</view>
					</view>
					<view style="height:90%"></view>
				</scroll-view>
		</view>
	</view>
</view>
</template>

<script>
import {resourceLable, resourceWebsite} from '@/api/personal.js'
import uniCopy from '@/utils/uni-copy.js'
import sharetubiao from '@/static/home/sharetubiao.png'
export default {
	components: {
	},
	data() {
		return {
			orderList: [],
			dataList: [
			],
			sharePopShow: false,
			webSrc: 'https://mp.weixin.qq.com/',
			list: [
				{
                  name: '全部',
				  id: 1
				},
				{
				  name: '找灵感',
				  id: 2
				},
				{
				  name: '找文案',
				  id: 3
				},
				{
				  name: '找视频素材',
				  id: 4
				},
				{
				  name: '找音效素材',
				  id: 5
				},
				{
				  name: '找单子',
				  id: 6
				},
				{
				  name: '找动漫',
				  id: 7
				},
				{
				  name: '找资源',
				  id: 8
				}],
			current: 0,
			tabsHeight: 0,
			playStatus: false,
			dx: 0,
			barStyle: {
				backgroundColor: '#FF445A',
			},
			scrollInto: 0,
			warpTop: [],
			scrollWarp: [],
			countdown:[],
			convertminutes: '',
            defaultshow: true,
			screeningShow: false,
			triggered: false,
			submitShow: false,
			audioShow: false,
			dataPlay: {
			},
			loadStatus: ['loadmore','loadmore','loadmore','loadmore'],
		};
	},
	onLoad(options) {
		this.handleList()
		// this._freshing = false;
		// setTimeout(() => {
		// 	this.triggered = true;
		// }, 1000)
		// this.getOrderList(0);
	},
	onHide() {
	},
	onShareAppMessage(res) {
		if (res.from === 'button') {// 来自页面内分享按钮
		    console.log(res.target)
		}
		return {
			title: '拍片找单子？找灵感？找素材？点我啥都有',
			path: "/subpkg/pages/utilityshaer/utilityshaer",
			desc: '拍片找单子？找灵感？找素材？点我啥都有',
			complete: function(res) {
				console.log('分享成功', res)
			},
		}
	},
	methods: {
		async handleList() {
		  const res =await resourceLable()
		  console.log('resdata没做好',res.data.data)
		  this.list = res.data.data
		  this.getOrderList(0)
		},
		reachBottom() {
		},
		handleGoBack() {
		// this.$store.commit('user/setworkStatus', {}) 
		// console.log('返回上一页传空值')
		  uni.switchTab({ url: '/pages/index/index' })
		},
		handleCheckWeb(webSrc) {
		console.log('小程序', webSrc)
		if (webSrc.slice(0,1)==="#") {
			console.log('小程序',webSrc)
			/* #ifdef MP-WEIXIN */
			 wx.navigateToMiniProgram({
				appId: '',
				path: '',
				extraData: {
					foo: 'bar'
				},
				shortLink: webSrc,
				envVersion: 'release',
				success(res) {
					// 打开成功
					console.log(res)
			   }
		    })
		  /* #endif */
		} else {
			// uni.navigateTo({ url: '/pages/webview/webview?src='+ webSrc })
			uniCopy({
				content:webSrc,
				success:(res)=>{
					uni.showToast({
						title: '小程序内无法直接跳转，已为您复制链接',
						icon: 'none'
					})
				},
				error:(e)=>{
				}
			})
		}	
		},
		// 页面数据
		async getOrderList(idx) {
			// const res = await getDemandList({
			// 	state: this.list[idx].id
			// })
			const res = await resourceWebsite({type:idx})
			console.log('配音师列表数据', res.data.data)
			this.triggered = false
			this.dataList = res.data.data
			setTimeout(()=>{
				this.barInit();
			},0)
			this.$set(this.orderList, idx, this.dataList)
		},
		// 
		// tab栏切换
		change(index) {
			console.log(this.current,index)
			this.current = index
			// this.activeTab = index;
			// this._getTabRect(this.activeTab);
			this.scrollInto =this.warpTop[index]+5;
			console.log(this.scrollInto)
		},
		tabScoll(e) {
		  let scrollTop = e.detail.scrollTop;
		  this.warpTop.map((item,index)=>{
			  if (scrollTop>this.warpTop[index]) {
				  this.current = index
			  } else {
				  
			  }
		  })
		},
		//获取节点信息
		GetRect(selector){
			return new Promise((resolve,reject)=>{
				let view =  uni.createSelectorQuery().in(this)
				view.select(selector).boundingClientRect(rect=>{
					resolve(rect)
				}).exec();
			})
		},
		//获取节点距离顶部距离
		barInit:async function (index){
			let navTargetTop = [];
			let navTargetTop1 = [];			
			for(let  i = 0 ; i < this.dataList.length ; i++){
				this.GetRect("#wrap"+i).then(res=>{
					navTargetTop.push(parseInt(res.top)-74)
					navTargetTop1.push(parseInt(res.top)-74)
				})
			}
			this.warpTop = navTargetTop;
			this.scrollWarp = navTargetTop1;
		},
	}
};
</script>
<style>
page{
	width: 100%;
	min-height: 100%;
	overflow: hidden;
}
/* #ifdef MP-WEIXIN */
scroll-view ::v-deep ::-webkit-scrollbar {
   width: 0;
   height: 0;
   color: transparent
}
/* #endif */
.u-mask {
	position: absolute !important;
}
.u-drawer {
	position: absolute !important;
}
</style>
<style lang="scss" scoped>
.teacherlist_box {
	position: relative;
	.home_musicSrc_box {
		position: absolute;
		bottom: 90.58rpx;
	}
}
.u-tabs-box {
	position: relative;
}
.wrap {
	display: flex;
	flex-direction: column;
	height: calc(100vh - var(--window-top));
	width: 100%;
	background: #F2F2F2;
}
.swiper-box {
	flex: 1;
}
.swiper-item {
	height: 100%;
}
.teacherOrder {
  width: 695.652rpx;
  margin-left: 27.174rpx;
  .list_title_box {
	 margin-top: 47.101rpx; 
	 margin-bottom: 19.928rpx;
    .title_icon {
      width: 28.986rpx;
	  height: 28.986rpx;
	  margin-bottom: -3.623rpx;
	}
	.title_text {
		margin-left: 9.058rpx;
		width: 86.957rpx;
		height: 39.855rpx;
		font-size: 28.986rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #000000;
		line-height: 22px;
	}
  }
  .list_item_box {
	width: 384px;
	background: #FFFFFF;
	border-radius: 8px;
    .list_item {
		width: 100%;
		height: 159.42rpx;
		display: flex;
		align-items: center;
		border-bottom: 1.812rpx solid #F6F6F6;
		.item_logo_box {
			width: 101.449rpx;
			height: 101.449rpx;
			margin-left: 28.986rpx;
			background: #FFFFFF;
			box-shadow: 0px 0px 18.116rpx 0px rgba(29, 175, 251, 0.15);
			border-radius: 28.986rpx;
          .item_logo {
            width: 101.449rpx;
			height: 101.449rpx;
	      }
		}
		.item_webName_box {
			margin-left: 30.797rpx;
			width: 509.058rpx;
			.webName {
				height: 22px;
				font-size: 16px;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #000000;
				line-height: 22px;
			}
		}
		.website_box {
			display: flex;
			align-items: center;
			margin-top: 10.87rpx;
			.website {
				display: inline-block;
				width: 425.725rpx;
				height: 36.232rpx;
				font-size: 25.362rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #666666;
				line-height: 36.232rpx;
			}
			.web_linke {
				width: 50.725rpx;
				height: 36.232rpx;
				font-size: 25.362rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #EE3F34;
				line-height: 36.232rpx;
			}
			.golink {
			  width: 28.986rpx;
			  height: 28.986rpx;
			}
		}
	}
  }
}


</style>
