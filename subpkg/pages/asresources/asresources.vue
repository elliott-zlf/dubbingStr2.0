<template>
<view class="container">
	<u-navbar :is-back="true" title="全国甲方资源群" title-size="36.232rpx" title-color="#000000"></u-navbar>
	<view class="pys_popup" v-if="erweimaShow">
		<view class="popup_conent">
			<image
				class="closeicon"
				src="@/static/home/close.png"
				mode="scaleToFill"
				@click="handleCanceShare"
			/>
			<view class="erweimabox">
			<view class="erweima_iconbox">
				<image
				class="erweima_icon"
				src="https://www.peiyinstreet.com/guidang/peiyinguwen.png"
				mode="scaleToFill"
				/>
			</view>	
			<view class="erweima_box">
			  截图加我微信，极速帮您试音
			</view>
			</view>
		</view>
	 </view>
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
				  :is-scroll="false"
				  :list="list" 
				  :current="current" 
				  @change="change" 
				  font-size='28.362'
				></u-tabs>
			</view>
			<view class="notice">
              <u-notice-bar mode="horizontal" bg-color="#FFE3E1" color="#EE3F34" :list="listtext"></u-notice-bar>
			</view>
				<scroll-view scroll-y style="height:100%; width: 100%;" @scrolltolower="reachBottom" :refresher-triggered="triggered">
					<view class="page-box" v-if="defaultshow">
						<view class="teacherOrder" v-for="(orderItem, index) in dataList" :key="index">
							<view class="list_item_box">
								<view class="item_logo_box">
									<image
									class="item_logo"
									:src="orderItem.head_img"
									mode="scaleToFill"
									/>
								</view>
								<view class="item_name">
									{{orderItem.title}}
								</view>
								<!-- <view class="item_btn">
									<view v-if="orderItem.type===0" class="apply_group" @click="handleApplyGroup(orderItem.id)">申请加入</view>
									<view v-else class="reg_group" @click="handleCheckWeb">加微拉群</view>
								</view> -->
							</view>
						</view>
					</view>
					<view v-if="!defaultshow" class="page-box">
						<view class="defaltPage">
							<!-- <image
								class="defaltPageimg"
								src="@/static/ui/defaultPage/d1.png"
								mode="scaleToFill"
							/> -->
							<view class="defaltext">暂无匹配数据</view>
						</view>
					</view>
					<view style="height:220px"></view>
				</scroll-view>
		</view>
	</view>	
	<cardball title="申请入群" @handleChange="handleCheckWeb"></cardball>
</view>
</template>

<script>
// import { logingroup } from '@/api/message'
import { loginShare } from "@/api/index.js"
import { streetresourcegroup } from "@/api/personal.js"
import { mapState, mapActions } from "vuex";
import sharetubiao from '@/static/home/sharetubiao.png'
import cardball from '@/components/cardball/cardball'
export default {
	components: {
		cardball
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
			sharePopShow: false,
			list: [
				{
                  name: '按地区',
				  id: 1
				},
				{
				  name: '按职能',
				  id: 2
				}],
			current: 0,
			swiperCurrent: 0,
			tabsHeight: 0,
			playStatus: false,
			erweimaShow: false,
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
		return {
			title: '分享几个影视制作的甲方资源群，同行可申请加入。禁广告',
			path: "/subpkg/pages/asresourcesshare/asresourcesshare",
			desc: '分享几个影视制作的甲方资源群，同行可申请加入。禁广告',
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
			const res = await streetresourcegroup({type:idx+1})
			console.log('配音师列表数据', res.data.data)
			this.triggered = false
			this.dataList = res.data.data
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
		  uni.previewImage({
            urls: ['https://www.peiyinstreet.com/guidang/jinqun.png'],
            longPressActions: {
                itemList: ['发送给朋友', '保存图片', '收藏'],
                success: function(data) {
                    console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
                },
                fail: function(err) {
                    console.log(err.errMsg);
                }
            }
        });
		//   uni.navigateTo({ url: '/pages/webview/webview?src='+ this.webSrc })
		},
		handleCanceShare() {
			this.erweimaShow = false
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
.u-tab-item {
	width: 50%;
}
.u-mask {
	position: absolute !important;
}
.u-drawer {
	position: absolute !important;
}
</style>
<style lang="scss" scoped>
.container {
  position: relative;
  height: 100%;
  width: 100%;

}
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
	margin-top: 28.986rpx;  
	width: 695.652rpx;
	height: 159.42rpx;
	background: #FFFFFF;
	border-radius: 14.493rpx;
    display: flex;
	align-items: center;
	.item_logo_box {
		width: 90.58rpx;
		height: 90.58rpx;
		margin-left: 25.362rpx;
		margin-right: 25.362rpx;
		border-radius: 14.493rpx;
		.item_logo {
		  width: 90.58rpx;
		  height: 90.58rpx;
		}
	}
	.item_name {
		width: 407.609rpx;
		height: 79.71rpx;
		line-height: 79.71rpx;
		font-size: 25.362rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #000000;
	}
	.item_btn {
	   margin-right: 25.362rpx;	
      .apply_group {
		text-align: center;  
		width: 126.812rpx;
		height: 54.348rpx;
		background: #EE3F34;
		border-radius: 32.609rpx;
		font-size: 21.739rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 54.348rpx;
	  }
	  .reg_group {
		text-align: center;  
		width: 126.812rpx;
		height: 54.348rpx;
		background: #F3F4F9;
		border-radius: 32.609rpx;
		font-size: 21.739rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #000000;
		line-height: 54.348rpx;
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
.pys_popup {
  position: fixed;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999999;
  .popup_conent {
    position: absolute;
    padding: 36.232rpx;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 500.71rpx;
    min-height: 326.087rpx;
    background: #ffffff;
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
    background: #ffffff;
    border-radius: 39.855rpx;
    border: 1.812rpx solid #dedede;
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
    margin-left: 36.232rpx;
    background: #1274ff;
    border-radius: 39.855rpx;
    font-size: 28.986rpx;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
    line-height: 79.71rpx;
  }
  .sharebtn::after {
    border: none !important;
  }
}
.emptydata {
  text-align: center;
  position: relative;
  .emptydataimg {
    width: 431.159rpx;
    height: 387.681rpx;
  }
  .emptydatatext {
    top: 300rpx;
    width: 100%;
    text-align: center;
    position: absolute;
    text-align: center;
    font-size: 25.362rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
  }
}
.nick_nameT {
		max-width: 450rpx;
		display: inline-block;
}
.share_box {
  position: fixed;
  bottom: 443.478rpx;
  right: 0rpx;
  width: 90.58rpx;
  height: 90.58rpx;
  border-radius: 45.29rpx;
  .invitationBtn {
     width: 90.58rpx;
     height: 90.58rpx;
     padding: 0 !important;
     margin: 0 !important;
     border: none !important;
     background-color: RGBA(241, 243, 246, 0) !important;
     display: flex;
     align-items: center;
     justify-content: center;
     border-radius: 45.29rpx;
  }
  .invitationBtn::after {
      border: none !important;
  }
  .shareicon {
    position: absolute;
    top: 0;
    left: 0;
     width: 90.58rpx;
     height: 90.58rpx;
  }
}
.collect_item {
	height: 108.696rpx;
	border-bottom: 1px solid #F7F7F7;
	display: flex;
	align-items: center;
	.collection {
		margin-left: 43.478rpx;
		width: 39.855rpx;
		height: 39.855rpx;
	}
	.collect_text {
		margin-left: 14.493rpx;
		font-size: 16px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #000000;
	}
	.redcollect_text {
		margin-left: 14.493rpx;
		font-size: 16px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #000000;
	}
}
.collect_item_btn {
	height: 134.058rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 16px;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #999999;
}

</style>
