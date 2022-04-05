<template>
	<view class="container">
		<u-navbar
			:is-back="true"
			title="我的优惠券"
			title-size="36.232rpx"
			title-color="#000000"
			:border-bottom="true"
			:background="background"
			back-icon-color="#000000"
		></u-navbar>
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
            <scroll-view scroll-y style="height:100%; width: 100%;" @scrolltolower="reachBottom" :refresher-triggered="triggered">
				<view class="page-box" v-if="defaultshow">
					<view v-for="(item,index) in couponsData" :key="index">
                      <view v-if="current===0" class="coupons_item">
                        <view class="amount">
							<view class="amount_quota">{{item.price}}折</view>
							<view class="combination">无门槛</view>
							<image
							    class="amountbc"
								src="@/static/coupons/wsyyouhuijuan.png"
								mode="scaleToFill"
							/>
						</view>
						<view class="giving">
							<view class="giving_text u-line-1">{{item.rule}}</view>
							<view class="giving_title u-line-1">{{item.active_at}}-{{item.inactive_at}}</view>
						</view>
						<view class="coupons_state">
                            <view class="beUsed_btn">待使用</view>
						</view>
					  </view>
					  <view v-if="current===1" class="coupons_has_item">
							<view class="amount">
								<view class="amount_quota">{{item.price}}折</view>
								<view class="combination">无门槛</view>
								<image
									class="amountbc"
									src="@/static/coupons/ysyyouhuijuan.png"
									mode="scaleToFill"
								/>
							</view>
							<view class="giving">
								<view class="giving_text u-line-1">{{item.rule}}</view>
								<view class="giving_title u-line-1">{{item.active_at}}-{{item.inactive_at}}</view>
							</view>
							<view class="coupons_state">
								<image
									class="hasbeenused"
									src="@/static/coupons/ysyicon.png"
									mode="scaleToFill"
								/>
							</view>
					  </view>
					  <view v-if="current===2" class="coupons_has_item">
							<view class="amount">
								<view class="amount_quota">{{item.price}}折</view>
								<view class="combination">无门槛</view>
								<image
									class="amountbc"
									src="@/static/coupons/ysyyouhuijuan.png"
									mode="scaleToFill"
								/>
							</view>
							<view class="giving">
								<view class="giving_text u-line-1">{{item.rule}}</view>
								<view class="giving_title u-line-1">{{item.active_at}}-{{item.inactive_at}}</view>
							</view>
							<view class="coupons_state">
								<image
									class="hasbeenused"
									src="@/static/coupons/ygqicon.png"
									mode="scaleToFill"
								/>
							</view>
					  </view>
					</view>
					<view style="height:362.319rpx"></view>
				</view>
				<view v-if="!defaultshow" class="page-box">
					<view class="defaltPage">
						<image
							class="defaltPageimg"
							src="@/static/demand/defaulticon.png"
							mode="scaleToFill"
						/>
						<!-- <view class="defaltext">你还没有优惠卷</view> -->
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import { couponlist } from '@/api/personal.js'
	export default {
		data() {
			return {
			  background: '#FFF5E9',
			  barStyle: {
				backgroundColor: '#FF445A',
			},
			current: 0,
			defaultshow: true,
			list: [
				{
                  name: '待使用',
				  id: 0
				},
				{
				  name: '已使用',
				  id: 1
				},
				{
				  name: '已过期',
				  id: 2
				},
			],
			itemPage: {
			  status: '',
			},
			couponsData: [],
			status: 0
			}
		},
		onLoad(options) {
			this.getCouponlist()
		},
		methods: {
			getCouponlist() {
              couponlist({status:this.status}).then((res)=>{
                console.log('优惠卷数据',res)
				this.couponsData = res.data
				if (res.data.length === 0) {
					this.defaultshow = false
				} else {
					this.defaultshow = true
				}
			  })
			},
		    // tab栏切换
			change(index) {
				this.current = index;
				this.status = index
				this.getCouponlist();
			},
			reachBottom() {

			}
		}
	}
</script>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
  width: 100%;
}
.container {
	height: 100%;
	.wrap {
		height: 100%;
		background: #F2F2F2;
		.coupons_item {
	      margin-top: 27.174rpx;		
		  margin-left: 27.174rpx;	
          width: 695.652rpx;
		  height: 159.42rpx;
		  display: flex;
		  background: #FFFFFF;
		  border-radius: 14.493rpx;
		  .amount {
			position: relative;  
            width: 195.652rpx;
			height: 159.42rpx;
			.amountbc {
              position: absolute;
			  width: 100%;
			  height: 100%;
			  top: 0px;
			  left: 0px;
			  z-index: 1;
			}
			.amount_quota {
				position: relative;
				margin-top: 21.739rpx;
				text-align: center;
				font-size: 54.348rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				z-index: 99;
			}
			.combination {
				position: relative;
				margin-top: 9.058rpx;
				text-align: center;
				font-size: 12px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				z-index: 99;
			}
		  }
		  .giving {
			  width: 311.594rpx;
			  margin-left: 34.42rpx;
			  .giving_text {
				  margin-top: 39.855rpx;
				  font-size: 28.986rpx;
				  font-family: PingFangSC-Medium, PingFang SC;
				  font-weight: 500;
				  color: #000000;
			  }
			  .giving_title {
				margin-top: 21.739rpx;  
				font-size: 21.739rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #999999;
			  }
		  }
		  .coupons_state {
			 .beUsed_btn {
				margin-top: 30.797rpx; 
				display: flex;
				align-items: center;
				justify-content: center; 
				width: 123.188rpx;
				height: 57.971rpx;
				background: #FFFFFF;
				border-radius: 32.609rpx;
				border: 1.812rpx solid #FF4E65;
				font-size: 21.739rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #FF4E65;
			 }
		  }
		}
		.coupons_has_item {
	      margin-top: 27.174rpx;		
		  margin-left: 27.174rpx;	
          width: 695.652rpx;
		  height: 159.42rpx;
		  display: flex;
		  background: #FFFFFF;
		  border-radius: 14.493rpx;
		  .amount {
			position: relative;  
            width: 195.652rpx;
			height: 159.42rpx;
			.amountbc {
              position: absolute;
			  width: 100%;
			  height: 100%;
			  top: 0px;
			  left: 0px;
			  z-index: 1;
			}
			.amount_quota {
				position: relative;
				margin-top: 21.739rpx;
				text-align: center;
				font-size: 54.348rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				z-index: 99;
			}
			.combination {
				position: relative;
				margin-top: 9.058rpx;
				text-align: center;
				font-size: 12px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				z-index: 99;
			}
		  }
		  .giving {
			  width: 311.594rpx;
			  margin-left: 34.42rpx;
			  .giving_text {
				  margin-top: 39.855rpx;
				  font-size: 28.986rpx;
				  font-family: PingFangSC-Medium, PingFang SC;
				  font-weight: 500;
				  color: #000000;
			  }
			  .giving_title {
				margin-top: 21.739rpx;  
				font-size: 21.739rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #999999;
			  }
		  }
		  .coupons_state {
			 .beUsed_btn {
				margin-top: 30.797rpx; 
				display: flex;
				align-items: center;
				justify-content: center; 
				width: 123.188rpx;
				height: 57.971rpx;
				background: #FFFFFF;
				border-radius: 32.609rpx;
				border: 1.812rpx solid #FF4E65;
				font-size: 21.739rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #FF4E65;
			 }
			 .hasbeenused {
				 margin-top: 23.551rpx; 
				 width: 111.449rpx;
				 height: 111.449rpx;
			 }
		  }
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
}

</style>
