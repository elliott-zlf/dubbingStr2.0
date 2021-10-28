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
						<view class="list_item_box">
							<view class="item_title_box">
								<view class="logo_icon_box">
									<image
									    class="logo_icon"
										src="@/static/demand/demand.png"
										mode="scaleToFill"
									/>
									<text class="title_text u-line-1">宣传片-男生-大气沉稳</text>
								</view>
								<view class="apply_group_box">
									<view class="apply_group" @click="handleApplyGroup(orderItem.id)">报价与付款</view>
								</view>
							</view>
							<view class="demand_box">
								<view class="time_box">
									<image
									    class="time_icon"
										src="@/static/demand/time.png"
										mode="scaleToFill"
									/>
									<text class="time_title">2021-07-12 12:24</text>
								</view>
								<view class="instructions_box">
									<text class="instructions_title">交付倒计时：04:12</text>
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
import { logingroup } from '@/api/message'
import { loginShare } from "@/api/index.js"
import play from '@/static/home/play.png'
import playActive from '@/static/home/palyActive.gif'
import submitForm from '@/components/submitform/submitform.vue'
import musicAudio from '@/components/audio/audioplay.vue'
import { mapState, mapActions } from "vuex";
export default {
	components: {
		submitForm,
		musicAudio
	},
	data() {
		return {
			orderList: [],
			listtext: [
					'影视人自己的社群',
					'互帮互助，互利互惠',
					'全实名制，拒绝广告(已有2500人申请加入~)'
				],
			dataList: [],
			play: play,
			sharePopShow: false,
			playActive: playActive,
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
			current: 0,
			swiperCurrent: 0,
			tabsHeight: 0,
			playStatus: false,
			dx: 0,
			groupId: '',
			barStyle: {
				backgroundColor: '#FF445A',
			},
			webSrc: 'https://wj.qq.com/s2/9032862/464d/',
			countdown:[],
			convertminutes: '',
            defaultshow: true,
			screeningShow: false,
			triggered: false,
			shareShow: true,
			dataPlay: {
			},
			loadStatus: ['loadmore','loadmore','loadmore','loadmore'],
		};
	},
	onLoad(options) {
		this.getUnionid()
		// this.getOrderList(0);
	},
	computed: {
      ...mapState("user", ["token", "userInfo"]),
    },
	onHide() {
	},
	onShareAppMessage(res) {
		if (res.from === 'button') {// 来自页面内分享按钮
		    console.log(res.target)
		}
		this.sharePopShow = false
		var str = {
			type: 2,
			group_id: this.groupId, 
		}
		loginShare(str).then((res)=>{
          console.log(res)
		  this.getOrderList(this.current)
		}).catch((err)=>{
          console.log(err)
		})
		return {
			title: '影视人自己的资源小站',
			desc: '影视人自己的资源小站',
			complete: function(res) {
				console.log('分享成功', res)
			},
		}
	},
	filters: {
      convertMinutes(time) {
			var time1 = Date.now();
			var date = new Date(time);
			var time2 = date.getTime();
			var resttime = 600-(time1-time2)/1000

			if (resttime) {
				this.countdown.push(resttime)
				return parseInt(resttime / 60)
			}else {
				this.countdown.push(0)
				return 0
			}

		},
	},
	methods: {
		...mapActions("user", ["login"]),
		getUnionid() {
			uni.login({
				provider: "weixin",
				success: async (result) => {
				  await this.login(result.code);
				  this.handleList()
				// this.getAllteacher()
				},
				fail: (error) => {
				console.log("登录失败", error);
				},
			});
		},
		async handleList() {
			this._freshing = false;
			setTimeout(() => {
				this.triggered = true;
			}, 1000)
		  this.getOrderList(0)
		},
		// 邀请配音
		handleApplyGroup(id) {
			this.groupId = id
			this.sharePopShow = true
			// this.$refs.submitform.hadleUpdate()
		},
		reachBottom() {
		},
		// 页面数据
		async getOrderList(idx) {
			// const res = await getDemandList({
			// 	state: this.list[idx].id
			// })
			const res = await logingroup({type:idx+1})
			this.triggered = false
			this.dataList = res.data.data
			if(this.dataList.length===0){
              this.defaultshow = false
			}else {
			  this.defaultshow = true	
			}
			this.$set(this.orderList, idx, this.dataList)
		},
		handleCanceShare() {
			this.sharePopShow = false
			uni.showShareMenu({
			  title: '配音师资源',
		  })
		},
		// 跳转到问卷调查
		handleCheckWeb() {
		//   uni.navigateTo({ url: '/pages/webview/webview?src='+ this.webSrc })
		},
		// 取消选择，收回弹窗
		handletagCancel(){
		  this.screeningShow = false
		},
		// tab栏切换
		change(index) {
			this.current = index;
			this.getOrderList(index);
		},
		transition({ detail: { dx } }) {
			this.$refs.tabs.setDx(dx);
		},
		animationfinish({ detail: { current } }) {
			this.$refs.tabs.setFinishCurrent(current);
			this.getOrderList(current);
			this.swiperCurrent = current;
			this.current = current;
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
				text-align: center;
				width: 144.928rpx;
				height: 39.855rpx;
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
		  width: 50%;
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
			width: 50%;
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
