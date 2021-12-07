<template>
<view>
	<u-navbar :is-back="false" title="我的需求" title-size="36.232rpx" title-color="#000000" :border-bottom="false"></u-navbar>
	<view class="teacherlist_box">
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
				  :is-scroll="true"
				  :list="list" 
				  :current="current" 
				  @change="change" 
				  font-size='28.362'
				></u-tabs>
			</view>
			<scroll-view scroll-y style="height:100%; width: 100%;" @scrolltolower="reachBottom" :refresher-triggered="triggered">
				<view class="page-box" v-if="defaultshow">
					<view class="teacherOrder" v-for="(orderItem, index) in dataList" :key="index">
						<view class="list_item_box" @click="handleJumpOrderDetails(orderItem.id,orderItem.status)">
							<view class="item_title_box">
								<view class="logo_icon_box">
									<image
									    class="logo_icon"
										src="@/static/demand/demand.png"
										mode="scaleToFill"
									/>
									<text class="title_text u-line-1">{{orderItem.audition_text}}</text>
								</view>
								<view class="apply_group_box">
									<view class="apply_group">
										<text>{{statusValue[orderItem.status]}}</text>
									</view>
								</view>
							</view>
							<view class="demand_box">
								<view class="time_box">
									<image
									    class="time_icon"
										src="@/static/demand/time.png"
										mode="scaleToFill"
									/>
									<text class="time_title">{{orderItem.created_at}}</text>
								</view>
								<view class="instructions_box" v-if="orderItem.status===0">
									<text class="instructions_title">邀请试音</text>
									<image
									    class="instructions_icon"
										src="@/static/demand/arrorRight.png"
										mode="scaleToFill"
									/>
								</view>
								<view class="instructions_box" v-if="orderItem.status===1">
									<view class="status_box" v-if="orderItem.status_time===0">
                                       <text class="instructions_title">上传倒计时:</text>
										<u-count-down class="countdown_num" :timestamp="orderItem.time" font-size = '25.362' separator-size="25.362" separator-color="#3387FB" :show-hours="false"  color='#3387FB'></u-count-down>
										<image
											class="instructions_icon"
											src="@/static/demand/arrorRight.png"
											mode="scaleToFill"
										/>
									</view>
									<view class="status_box" v-if="orderItem.status_time===1">
                                       <text class="instructions_title">已完成{{orderItem.demanddata}}</text>
									   <image
										  class="instructions_icon"
										  src="@/static/demand/arrorRight.png"
										  mode="scaleToFill"
										/>
									</view>
								</view>
								<view class="instructions_box" v-if="orderItem.status===2">
									<text class="instructions_title">付款倒计时:</text>
									<u-count-down class="countdown_num" :timestamp="orderItem.time" font-size = '25.362' separator-size="25.362" separator-color="#3387FB" separator="zh" color='#3387FB'></u-count-down>
									<image
										class="instructions_icon"
										src="@/static/demand/arrorRight.png"
										mode="scaleToFill"
									/>
								</view>
								<view class="instructions_box" v-if="orderItem.status===3">
									<view class="status_box" v-if="orderItem.order_status===0">
                                        <text class="instructions_title">交付倒计时:</text>
										<u-count-down class="countdown_num" :timestamp="orderData.end_time" font-size = '25.362' separator-size="25.362" separator-color="#3387FB" separator="zh" color='#3387FB'></u-count-down>
										<image
											class="instructions_icon"
											src="@/static/demand/arrorRight.png"
											mode="scaleToFill"
										/>
									</view>
									<view class="status_box" v-if="orderItem.order_status===1">
                                       <text class="instructions_title">去验收成品</text>
									   <image
											class="instructions_icon"
											src="@/static/demand/arrorRight.png"
											mode="scaleToFill"
										/>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view v-if="!defaultshow" class="page-box">
					<view class="defaltPage">
						<image
							class="defaltPageimg"
							src="@/static/demand/defaulticon.png"
							mode="scaleToFill"
						/>
						<view class="defaltext">暂无匹配数据</view>
					</view>
				</view>
				<view style="height:220px"></view>
			</scroll-view>
		</view>
		<u-popup v-model="sharePopShow" :mask-close-able="false" border-radius="10" mode="center" width="579.71rpx" height="326.087rpx">
			<view>
			  <view style="height:57.971rpx"></view>	
              <view class="check_WeChat_test">
					申请加入
				</view>
				<view class="check_WeChat_tips">分享小程序后,即可获取入群方式</view>
				<view class="share_btn_box">
					<button
						class="cancelSharebtn"
						hover-class="button-hover"
						@tap="handleCanceShare"
					>
					取消	 
					</button>
					<button
						class="sharebtn"
						open-type="share"
						hover-class="button-hover"
					>
					分享给朋友	 
					</button>
				</view>
			</view>
		</u-popup>
	</view>
</view>
</template>

<script>
import { demandSquare } from '@/api/myneeds.js'
import musicAudio from '@/components/audio/audioplay.vue'
export default {
	components: {
		musicAudio
	},
	data() {
		return {
			dataList: [],
			sharePopShow: false,
			play: 'https://www.peiyinstreet.com/guidang/play.png',
			playActive: "https://www.peiyinstreet.com/guidang/playActive.png",
			current: 0,
			tabsHeight: 0,
			groupId: '',
			defaultshow: true,
			triggered: false,
			demObj: {
			  page: 1,
			  size: 10,
			  status: 0
			},
			barStyle: {
				backgroundColor: '#FF445A',
			},
			list: [
				{
                  name: '全部',
				  id: 1
				},
				{
				  name: '新建',
				  id: 2
				},
				{
				  name: '邀请的试音',
				  id: 2
				},
				{
				  name: '报价与付款',
				  id: 2
				},
				{
				  name: '交付与验收',
				  id: 2
				}
			],
			statusValue: ['新建','邀请的试音','报价与付款','交付与验收']
		};
	},
	onLoad() {
	  
	},
	onShow() {
      this.getOrderList(this.demObj);
	},
	onHide() {
	},
	onShareAppMessage(res) {
		if (res.from === 'button') {// 来自页面内分享按钮
		    console.log(res.target)
		}
		return {
			title: '',
			desc: '',
			complete: function(res) {
				console.log('分享成功', res)
			},
		}
	},
	methods: {
		// 跳转详情
		handleJumpOrderDetails(id,type) {
			uni.navigateTo({ url: '/subpkg/pages/demanddetails/demanddetails?id='+id+'&status='+type })
		},
		reachBottom() {
		},
		// 页面数据
	   getOrderList(demObj) {
			demandSquare(demObj).then((res)=>{
				console.log('我的需求数据',res)
               this.dataList = res.data
			   if(this.dataList.length===0){
				this.defaultshow = false
				}else {
				this.defaultshow = true	
			   }
			})
		},
		handleCanceShare() {
			this.sharePopShow = false
			uni.showShareMenu({
			  title: '配音师资源',
		  })
		},
		// tab栏切换
		change(index) {
			this.current = index;
			this.demObj.status=index
			this.getOrderList(this.demObj);
		}
	}
};
</script>
<style>
page {
	min-height: 100%;
	width: 100%;
	overflow: hidden;
}
.u-mask {
	position: absolute !important;
}
.u-drawer {
	position: absolute !important;
}
</style>
<style lang="scss" scoped>
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
		margin-left: 34.478rpx;
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
		margin-left: 43.478rpx;

	}
}
.notice {
   width: 750rpx;
   height: 72.464rpx;
}
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
  .list_item_box {
	margin-top: 21.739rpx;  
	width: 695.652rpx;
	height: 173.913rpx;
	padding: 0rpx 27.174rpx;
	background: #FFFFFF;
	border-radius: 14.493rpx;
	.item_title_box {
         display: flex;
         height: 91.957rpx;
		.logo_icon_box {
			display: flex;
            align-items: center;
          .logo_icon {
		    width: 26.087rpx;
		    height: 32.609rpx;
		  }
		  .title_text {
			width: 452.899rpx;
			height: 39.855rpx;
			margin-left: 19.928rpx;
			font-size: 28.986rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #000000;
			line-height: 39.855rpx;
		  }
		}
		.apply_group_box {
			display: flex;
            align-items: center;
			.apply_group {
				display: flex;
				align-items: center;
				justify-content: center;
				height: 39.855rpx;
				width: 144.928rpx;
				background: #FF445A;
				border-radius: 12px;
				border: 1px solid #FF445A;
				font-size: 21.739rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
			}
		}	
	}
	.demand_box {
		display: flex;
        height: 70.957rpx;
		 align-items: center;
		.time_box {
		  display: flex;	
		  align-items: center;
		  width: 40%;
          .time_icon {
			  width: 21.739rpx;
			  height: 21.739rpx;
		  }
		  .time_title {
			margin-left: 14.493rpx;  
			width: 211.957rpx;
			height: 36.232rpx;
			font-size: 25.362rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #999999;
			line-height: 36.232rpx;
		  }
		}
		.instructions_box {
			width: 60%;
			text-align: right;
			.status_box {
				// width: 60%;
			    text-align: right;
				.instructions_title {
					margin-right: 3.623rpx;
					width: 215.58rpx;
					height: 36.232rpx;
					font-size: 25.362rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #3387FB;
					line-height: 36.232rpx;
				}
				.instructions_icon {
					width: 21.739rpx;
					height: 21.739rpx;
					margin-bottom: -3.623rpx;
				}
			}
			.instructions_title {
				margin-right: 3.623rpx;
				width: 215.58rpx;
				height: 36.232rpx;
				font-size: 25.362rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #3387FB;
				line-height: 36.232rpx;
			}
			.instructions_icon {
				width: 21.739rpx;
				height: 21.739rpx;
				margin-bottom: -3.623rpx;
			}
		}
	}
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
		width: 213.768rpx;
		height: 79.71rpx;
		background:#EE3F34;
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
.defaltPage {
	text-align: center;
	.defaltPageimg {
		margin-top: 110.507rpx;
		width: 403.986rpx;
		height: 331.522rpx;
	}
	.defaltext {
		margin-top: -72.464rpx;
        text-align: center;
		font-size: 25.362rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #000000;
	}
}
</style>
