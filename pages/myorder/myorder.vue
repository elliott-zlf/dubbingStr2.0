<template>
	<view class="container">
		<u-navbar
			:is-back="false"
			title="我的订单"
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
				  <view v-for="(item,index) in dataList" :key="index" class="item_list" @click="handleJumporderdetails(item.status,item.order_id)">
					  <view class="item_info">
						  <view class="portrait_box">
							  <image
							      class="portrait_avtive"
								  :src="item.teacher.avatar"
								  mode="scaleToFill"
							  />
						  </view>
						  <view class="nick_name_box">
							  <view class="nick_name">{{item.teacher.nickname}}</view>
							  <view class="nick_time">{{item.created_at}}</view>
						  </view>
						  <view class="amount_box">
							 <view class="amount">￥{{item.pay_price}}</view>
						  </view>
					  </view>
					  <view class="item_stattus">
						  <view class="countdown">
							  <text v-if="item.status===1">付款倒计时</text>
							  <u-count-down v-if="item.status===1 && item.time!==0" class="countdown_num" :timestamp="item.time" font-size = '25.362' separator-size="25.362" bg-color="#FFFFFF" separator-color="#FF445A" color='#FF445A'></u-count-down>
						  </view>
						  <view v-if="item.status===1" class="countdown_status">待付款</view>
						  <view v-if="item.status===2" class="countdown_status">待交付</view>
						  <view v-if="item.status===3" class="countdown_status">已完成</view>
						  <view v-if="item.status===4" class="countdown_status">已关闭</view>
					  </view>
				  </view>
				  <!-- <view class="item_list" @click="handleJumporderdetails('2')">
					  <view class="item_info">
						  <view class="portrait_box">
							  <image
							      class="portrait_avtive"
								  src="https://thirdwx.qlogo.cn/mmopen/vi_32/U4wyWicyCaOCHuyVbJmBwSXhR9Eg9AzibKuiasMxUmCE9jjI0B4dgv3cpedRSzlib1iaOIB1vbOdtnRTgWiaUVDJGkbw/132"
								  mode="scaleToFill"
							  />
						  </view>
						  <view class="nick_name_box">
							  <view class="nick_name">找配音师顾问下单</view>
							  <view class="nick_time">01-01 14:45</view>
						  </view>
						  <view class="amount_box">
							 <view class="amount">¥200.00</view>
						  </view>
					  </view>
					  <view class="item_stattus">
						  <view class="countdown"></view>
						  <view class="countdown_status">已付款</view>
					  </view>
				  </view>
				  <view class="item_list" @click="handleJumporderdetails('3')">
					  <view class="item_info">
						  <view class="portrait_box">
							  <image
							      class="portrait_avtive"
								  src="https://thirdwx.qlogo.cn/mmopen/vi_32/U4wyWicyCaOCHuyVbJmBwSXhR9Eg9AzibKuiasMxUmCE9jjI0B4dgv3cpedRSzlib1iaOIB1vbOdtnRTgWiaUVDJGkbw/132"
								  mode="scaleToFill"
							  />
						  </view>
						  <view class="nick_name_box">
							  <view class="nick_name">找配音师顾问下单</view>
							  <view class="nick_time">01-01 14:45</view>
						  </view>
						  <view class="amount_box">
							 <view class="amount">¥200.00</view>
						  </view>
					  </view>
					  <view class="item_stattus">
						  <view class="countdown"></view>
						  <view class="countdown_status">已付款</view>
					  </view>
				  </view> -->
				</view>
				<view v-if="!defaultshow" class="page-box">
					<view class="defaltPage">
						<image
							class="defaltPageimg"
							src="@/static/demand/defaulticon.png"
							mode="scaleToFill"
						/>
						<view class="defaltext">你还没有订单</view>
					</view>
				</view>
				<view style="height:170px">
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import { orderList } from '@/api/personal.js'
	export default {
		data() {
			return {
			  background: '#FFF5E9',
			  barStyle: {
				backgroundColor: '#FF445A',
			  },
			  current: 0,
			  defaultshow: true,
			  dataList: [],
			  list: [
				{
                  name: '全部',
				  id: 0
				},
				{
				  name: '待付款',
				  id: 2
				},
				{
				  name: '待交付',
				  id: 3
				},
				{
				  name: '已完成',
				  id: 3
				},
			  ],
			  demObj: {
				status: 0,  
				page: 1,
				size: 100
			  },
			}
		},
		onLoad(options) {
		 this.current = options.type
		},
		onShow() {	
		  this.demObj.status = this.current
		  this.getOrderList()
		},
		methods: {
            getOrderList() {
			   orderList(this.demObj).then((res)=>{
				console.log('我的订单数据',res)
				this.dataList = res.data
				if(this.dataList.length===0){
					this.defaultshow = false
				}else {
					this.defaultshow = true	
				}
			})	
			},
		    // tab栏切换
			change(index) {
				this.current = index;
				this.demObj.status = this.current
				this.getOrderList();
			},
			reachBottom() {

			},
			handleJumporderdetails(index,id) {
			  uni.navigateTo({ url: '/subpkg/pages/orderdetails/orderdetails?id='+id+'&&type=index' })
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
	    .item_list {
			margin-left: 27.174rpx;
			margin-top: 21.739rpx;
			width: 695.652rpx;
			height: 226.449rpx;
			background: #FFFFFF;
			border-radius: 14.493rpx;
			.item_info {
				display: flex;
				align-items: center;
				height: 144.928rpx;
				border: 1px solid #F7F7F7;
				.portrait_box {
					width: 106.884rpx;
					display: flex;
					align-items: center;
					justify-content: flex-end;
                   .portrait_avtive {
					   width: 72.464rpx;
					   height: 72.464rpx;
					   border-radius: 36.232rpx;
				   }
				}
				.nick_name_box {
					margin-left: 19.928rpx;
					width: 378.623rpx;
					.nick_name {
						
						font-size: 14px;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #000000;
					}
					.nick_time {
						margin-top: 7.246rpx;
						font-size: 14px;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #999999;
					}
				}
				.amount_box {
					display: flex;
					width: 200rpx;
					justify-content: flex-end;
					margin-right: 34.42rpx;
					.amount {
						font-size: 22px;
						font-family: PingFangSC-Semibold, PingFang SC;
						font-weight: 600;
						color: #000000;
					}
				}
			}
			.item_stattus {
			  display: flex;
			  align-items: center;
			  justify-content: space-between;
			  height: 79.71rpx;
			  .countdown {
				margin-left: 34.42rpx;
				font-size: 14px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #FE445A;
			  }
			  .countdown_status {
				margin-right: 34.42rpx;  
				font-size: 14px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #FE445A;
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
