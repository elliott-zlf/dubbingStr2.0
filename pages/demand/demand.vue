<template>
<view>
	<u-navbar :is-back="false" title="我的试音" title-size="36.232rpx" title-color="#000000" :border-bottom="false"></u-navbar>
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
			<scroll-view scroll-y style="height:100%; width: 100%;"
			   :refresher-enabled="true"
			   :refresher-triggered="triggered"
			   @refresherrefresh="handlerefre"
			   @scrolltolower="reachBottom"
			>
				<view class="page-box" v-if="defaultshow">
					<view class="teacherOrder" v-for="(orderItem, index) in dataList" :key="index">
						<view class="list_item_box" @click="handleJumpOrderDetails(orderItem.id,orderItem.status)">
							<view class="item_title_box">
								<view class="logo_icon_box">
									<image
									    class="logo_icon"
										:src="orderItem.user.avatar"
										mode="scaleToFill"
									/>
									<view class="title_text u-line-1">
										<view class="nickname">{{orderItem.user.nickname}}</view>
										<view class="nicktime">{{orderItem.created_at}}</view>
									</view>
								</view>
								<!-- <view class="apply_group_box">
									<view class="apply_group">
										<text>{{statusValue[orderItem.status]}}</text>
									</view>
								</view> -->
							</view>
							<view class="demand_content">
							  <view class="item_list">
                                  <view class="demand_title">
									  类型
								  </view>
								  <view class="demand_text u-line-1">
									<span>{{orderItem.tags[0].value === '不限' ? '题材' + orderItem.tags[0].value :  orderItem.tags[0].value}}</span> 
									<span style="margin-left: 10rpx;margin-right: 10rpx;">| </span>
									<span v-if="orderItem.tags[1].value">{{orderItem.tags[1].value==='不限' ? '性别' + orderItem.tags[1].value :  orderItem.tags[1].value }}</span> 
									<span v-if="orderItem.tags[1].value" style="margin-left: 10rpx;margin-right: 10rpx;">|</span> 
									<span v-if="orderItem.tags[2].value">{{orderItem.tags[2].value==='不限' ? '风格' + orderItem.tags[2].value :  orderItem.tags[2].value}}</span> 
									<span v-if="orderItem.tags[2].value" style="margin-left: 10rpx;margin-right: 10rpx;">|</span> 
									<span>{{orderItem.draft_word_count}}字</span> 
									<span v-if="orderItem.discuss || orderItem.budget != 0" style="margin-left: 10rpx;margin-right: 10rpx;">|</span>
									<text style="margin-left: 9rpx;" v-if="orderItem.discuss">价格商议</text>
									<text style="margin-left: 9rpx;" v-else>
										<text v-if="orderItem.budget!=0">{{orderItem.budget}}元</text>
									</text>
								  </view>
							  </view>
							  <view class="item_list">
                                  <view class="demand_title">
									  要求
								  </view>
								  <view class="demand_text u-line-1">
									  {{orderItem.content || '未输入其他要求'}} 
								  </view>
							  </view>
							  <view class="item_list">
                                  <view class="demand_title">
									  文本
								  </view>
								  <view class="demand_text u-line-1">
									  {{orderItem.audition_text || '未输入试音文本'}}
								  </view>
							  </view>
							</view>
							<view class="placeholder_line"></view>
							<view class="demand_box">
								<!-- <view class="time_box">
									<image
									    class="time_icon"
										src="@/static/demand/time.png"
										mode="scaleToFill"
									/>
									<text class="time_title">{{orderItem.created_at}}</text>
								</view> -->
								<!-- <view class="instructions_box" v-if="orderItem.status===0">
									<text class="instructions_title">邀请试音</text>
									<image
									    class="instructions_icon"
										src="@/static/demand/arrorRight.png"
										mode="scaleToFill"
									/>
								</view> -->
								<view class="instructions_box" v-if="orderItem.status===0">
									<view class="status_box" v-if="orderItem.status_time===0">
                                       <text class="instructions_title">上传倒计时:</text>
										<u-count-down class="countdown_num" :timestamp="orderItem.time" font-size = '28.986' separator-size="28.986" separator-color="#FF445A" :show-hours="false"  color='#FF445A'></u-count-down>
									</view>
									<view class="status_box" v-if="orderItem.status_time===1">
                                       <text class="instructions_title">已上传{{orderItem.demanddata}}</text>
									</view>
								</view>
								<view class="instructions_box" v-if="orderItem.status===1">
									<view class="status_box">
                                       <text class="instructions_title" style="color: #999999;">已关闭</text>
									</view>
								</view>
								<view class="instructions_box" v-if="orderItem.status===2">
									<text v-if="orderItem.time !=0" class="instructions_title">付款倒计时:</text>
									<u-count-down v-if="orderItem.time !=0" class="countdown_num" :timestamp="orderItem.time" font-size = '25.362' separator-size="25.362" separator-color="#FF445A" color='#FF445A'></u-count-down>
									<text v-if="orderItem.time ==0" class="instructions_title">付款倒计时:--</text>
									<image
										class="instructions_icon"
										src="@/static/demand/arrorRight.png"
										mode="scaleToFill"
									/>
								</view>
								<view class="instructions_box" v-if="orderItem.status===3">
									<view class="status_box" v-if="orderItem.order_status===0">
                                        <text class="instructions_title">交付倒计时:</text>
										<u-count-down class="countdown_num" :timestamp="orderItem.time" font-size = '25.362' separator-size="25.362" separator-color="#FF445A" color='#FF445A'></u-count-down>
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
									<view class="status_box" v-if="orderItem.order_status===2">
                                       <text class="instructions_title">已验收</text>
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
					<view v-if="has_next===false" class="defaltext">没有更多了</view>
				   <u-loadmore v-if="has_next===true" style="margin-top: 30px;" status="loading" bgColor="#f2f2f2"></u-loadmore>
				</view>
				<view v-if="!defaultshow" class="page-box">
					<view class="defaltPage">
						<image
							class="defaltPageimg"
							src="@/static/demand/defaulticon.png"
							mode="scaleToFill"
						/>
						<!-- <view class="defaltext">暂无匹配数据</view> -->
					</view>
				</view>
				<view style="height:170px">
				</view>
			</scroll-view>
		</view>
		<u-popup v-model="sharePopShow" :mask-close-able="false" border-radius="24" mode="center" width="579.71rpx" height="326.087rpx">
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
	<view v-if="false" class="securities">
	   <image
	       class="shutdown_icon"
		   src="../../static/coupons/shutdown.png"
		   mode="scaleToFill"
		   @click="handlecloseCollection"
	   />	
       <image
	       class="volume"
		   src="https://www.peiyinstreet.com/guidang/Volume.png"
		   mode="scaleToFill"
		   @click="handleCouponCollection"
	   />
	</view>
	<view v-if="couponsShow" class="masklayer" @tap.stop="handlecloseCoupons">
		<view class="coupons_box">
			<image
				class="shutdown_icon"
				src="../../static/coupons/shutdownC.png"
				mode="scaleToFill"
				@click="handlecloseCoupons"
			/>
			<image
			    class="coupons_icon"
				src="https://www.peiyinstreet.com/guidang/coupons.png"
				mode="scaleToFill"
				@tap="handlecloseCoupons"
			/>
			<view class="coupons_content">
				<view class="discount_box">
					<view class="discount">{{couponsData.price}}折</view>
					<view class="scope_discount">无门槛</view>
				</view>
				<view class="discounts_box">
					<view class="discounts_ins">{{couponsData.rule}}</view>
					<view class="discounts_validity">有效期5天</view>
				</view>
			</view>
		</view>
	</view>
</view>
</template>

<script>
import { demandSquare } from '@/api/myneeds.js'
import musicAudio from '@/components/audio/audioplay.vue'
import { profileUpdate, loginStatus,couponadd,couponstatus } from '@/api/index.js'
import { mapState, mapActions } from "vuex";
export default {
	components: {
		musicAudio,
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
                  name: '发布需求',
				  id: 1
				},
				{
				  name: '按样试音',
				  id: 2
				}
			],
			has_next:'',
			statusValue: ['新建','邀请的试音','报价与付款','交付与验收'],
			// 优惠卷显示
			securitiesShow: false,
			couponsShow: false,
			triggered: false,
			_freshing: false,
			// 优惠卷数据
			couponsData: {

			}
		};
	},
	computed: {
		...mapState("user", ["demandcate"]),
	},
	onLoad() {
	},
	onShow() {
	  console.log('需求详情页0',this.demandcate,this.current)	
	  this.current = this.current
	  if ( this.demandcate === 0 ) {
		console.log('需求详情页1',this.demandcate,this.current)	
		this.current= 0
		this.demObj.status = 0
		this.getOrderList(this.demObj)
	    this.getCouponstatusStatus()
	  }else if(this.demandcate === 2){
		 console.log('需求详情页2',this.demandcate,this.current)	  
		this.current= 1
		this.demObj.status = 1
		this.getOrderList(this.demObj)
	    this.getCouponstatusStatus()
	  }
	  this.current = this.current
	},
	onHide() {
		console.log('页面手动滑出会走这里吗')
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
			let types = type - 1
			if (types == -1) {
				types = 0
			}
			console.log('', id)
			uni.navigateTo({ url: '/subpkg/pages/demanddetails/demanddetails?id='+id+'&status='+types })
		},
		// 触发下拉刷新
		handlerefre() {
			this.triggered = true;
			this._freshing = true;
			console.log('测试下来刷新复位问题', this.triggered,this._freshing)  
			this.getOrderList(this.demObj)
		},
		// 触发上拉加载
		async reachBottom() {
		  if (this.has_next) {
			this.demObj.page = this.demObj.page+1
			const res = await demandSquare(this.demObj)
			this.triggered = false
			this.has_next = res.has_next
			res.data.map((item)=>{
				this.dataList.push(item)
			})
			console.log('的巨大师傅大萨达', this.dataList)
			if (this.dataList.length===0) {
				this.defaultshow = false
				this.has_next = ''
			} else {
			   this.defaultshow = true
			}
		  }else {

		 }
	   },
		// 页面数据
	   getOrderList(demObj) {
		    demObj.page = 1
			demandSquare(demObj).then((res)=>{
			   console.log('我的需求数据',res)
			   this.triggered = false;
			   this._freshing = false;
			   this.$store.commit('user/setDemandcate', '') 
               this.dataList = res.data
			   if(this.dataList.length===0){
				this.has_next = ''
				this.defaultshow = false
				}else {
				this.has_next = res.has_next	
				this.defaultshow = true	
			   }
			})
		},
		getCouponstatusStatus() {
			couponstatus({status:0}).then((res)=>{
				console.log('获取优惠卷的状态',res)
				if(res.data.coupon_status) {
				this.securitiesShow= false
				}else {
				this.securitiesShow= true	
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
			this.demObj.status = this.current
			this.getOrderList(this.demObj);
		},
		onTabItemTap() {
		loginStatus().then((res)=>{
           if(res.data.nickname == 0) {
              this.getUserInfo()
            } else {
              this.getOrderList(this.demObj)
			}
         }).catch((err)=>{
           console.log('返回错误信息', err)
         })  
	    },
		getUserInfo() {
			 // 获取用户资料
			uni.showLoading({
				title: "加载中",
				});
			uni.getUserProfile({
				desc: "登录后可发布需求",
				success: async (obj) => {
				uni.showToast({
					title: "授权成功",
					icon: "default",
					mask: true,
				});
				const userobj = {
					nickname: obj.userInfo.nickName,
					userId: this.userId,
					avatar: obj.userInfo.avatarUrl,
					phone: ''
				}
				await profileUpdate(userobj);
				 this.getOrderList(this.demObj)
				},
				fail: () => {
					uni.showToast({
						title: "授权已取消",
						icon: "default",
						mask: true,
					});
				},
				complete: () => {
				// 隐藏loading
				uni.hideLoading();
				},
			}); 	
		},
		// 点击领取优惠卷
		handleCouponCollection() {
			couponadd().then((res)=>{
				if (res.data.type === 0) {
					this.couponsShow = true;
					this.couponsData = res.data;
				} else {
				   uni.showToast({
						title: '今天的券已经领取过啦',
						icon: "none",
						duration: 2000
					})
				}
			}).catch((res)=>{
				console.log('优惠卷错误信息',res)
			})
		},
		// 关闭优惠卷
		handlecloseCollection() {
			this.securitiesShow = false;
			couponstatus({status:1}).then((res)=>{
				console.log('获取优惠卷的状态',res)
			})
		},
		// 优惠卷弹窗
		handlecloseCoupons() {
			this.couponsShow = false
		},
		// 跳转到发布
		handleJumpPublishing() {
		  console.log('跳转到发布')
		  uni.navigateTo({ url: '/subpkg/pages/release/release'})
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
.defaltext {
	margin-top: 30rpx;
	text-align: center;
	font-size: 24rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #717171;
	line-height: 16px;
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
	height: 345.072rpx;
	padding: 0rpx 36.232rpx;
	background: #FFFFFF;
	border-radius: 14.493rpx;
	.item_title_box {
         display: flex;
		 padding-top: 36.232rpx;
		 padding-bottom: 5.739rpx;
        //  height: 91.957rpx;
		.logo_icon_box {
			display: flex;
            align-items: center;
          .logo_icon {
		    width: 39.855rpx;
		    height: 39.855rpx;
			border-radius: 19.928rpx;
		  }
		  .title_text {
			width: 419.899rpx;
			height: 39.855rpx;
			margin-left: 14.493rpx;
			display: flex;
			font-size: 21.739rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #666666;
			.nickname {
              display: flex;
			  align-items: center;
			}
			.nicktime {
			  margin-left: 9.058rpx;	
			  display: flex;
			  align-items: center;
			}
		  }
		}
		.apply_group_box {
			display: flex;
            align-items: center;
			.apply_group {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 144.928rpx;
				height: 47.101rpx;
				background: #FFFFFF;
				border-radius: 7.246rpx;
				color: #FF445A;
				border: 1.812rpx solid #FF445A;
				font-size: 21.739rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
			}
		}	
	}
	.demand_content {
		  .item_list {
			display: flex;
			margin-top: 14.493rpx;
			align-items: center;
			.demand_title {
				width: 76.087rpx;
				height: 36.232rpx;
				font-size: 28.986rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #999999;
				line-height: 36.232rpx;
			}
			.demand_text {
				width: 520.319rpx;
				height: 36.232rpx;
				font-size: 28.986rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #000000;
				line-height: 36.232rpx;
			}
		  }

	}
	.placeholder_line {
		position: relative;
		margin-top: 25.362rpx;
		margin-left: -36.232rpx;
		width: 695.652rpx;
		height: 1.812rpx;
		background: #F6F7FA;
	}
	.demand_box {
		display: flex;
        height: 80.957rpx;
		 align-items: center;
		// .time_box {
		//   display: flex;	
		//   align-items: center;
		//   width: 40%;
        //   .time_icon {
		// 	  width: 21.739rpx;
		// 	  height: 21.739rpx;
		//   }
		//   .time_title {
		// 	margin-left: 14.493rpx;  
		// 	width: 211.957rpx;
		// 	height: 36.232rpx;
		// 	font-size: 25.362rpx;
		// 	font-family: PingFangSC-Regular, PingFang SC;
		// 	font-weight: 400;
		// 	color: #999999;
		// 	line-height: 36.232rpx;
		//   }
		// }
		.instructions_box {
			width: 100%;
			text-align: right;
			.status_box {
				// width: 60%;
			    text-align: right;
				.instructions_title {
					margin-right: 3.623rpx;
					width: 215.58rpx;
					height: 36.232rpx;
					font-size: 28.986rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #FF445A;
					line-height: 36.232rpx;
				}
				.instructions_icon {
					margin-left: 9.058rpx;
					width: 21.739rpx;
					height: 21.739rpx;
					margin-bottom: -3.623rpx;
				}
			}
			.instructions_title {
				margin-right: 3.623rpx;
				width: 215.58rpx;
				height: 36.232rpx;
				font-size: 28.986rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #FF445A;
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
.masklayer {
	position: fixed;
	top: 0px;
	left: 0px;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.6);
	z-index: 9999;
	.coupons_box {
		margin-top: 50%;
		margin-left: 67.029rpx;
		position: absolute;
		transform: calc(0%,-50%);
		width: 615.942rpx;
		height: 615.942rpx;
		.shutdown_icon {
			position: absolute;
			right: 0;
			top: -65.899rpx;
			width: 38.043rpx;
			height: 38.043rpx;
		}
		.coupons_icon {
		  width: 615.942rpx;
		  height: 615.942rpx;	
		}
		.coupons_content {
			position: absolute;
			top: 240rpx;
			width: 100%;
			left: 0px;
			display: flex;
			.discount_box {
			    margin-left: 106.884rpx;
                margin-top: 16.304rpx;
				.discount {
					font-size: 54.348rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #FE445A;
				}
				.scope_discount {
					font-size: 28.362rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #FE445A;
				}
			}
			.discounts_box {
				margin-left: 120rpx;
                margin-top: 11px;
				.discounts_ins {
                  font-size: 36rpx;
				  font-family: PingFangSC-Medium, PingFang SC;
				  font-weight: 500;
				  color: #000000;
				}
				.discounts_validity {
					font-size: 26.739rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #999999;
					margin-top: 20rpx;
				}
			}
		}
	}
}
</style>
