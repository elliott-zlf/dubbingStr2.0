<template>
	<view class="container">
		<!-- <u-navbar
			:is-back="true"
			title="我的积分"
			title-size="36.232rpx"
			title-color="#000000"
			:border-bottom="true"
			:background="background"
			back-icon-color="#000000"
		></u-navbar> -->
		<view class="integral">
		   <!-- <view class="integral_use" @click="hanldeIntegral">
			   <image
			       class="integral_img"
				   src="@/static/my/wenti.png"
				   mode="scaleToFill"
			   />
			   <view class="integral_text">使用说明</view>
		   </view>	 -->
           <view class="availableIntegral" @click="hanldeIntegral">
			   <view class="score">{{count}}</view>
			   <view class="score_text">
			   可用积分
			    <image
			       class="integral_img"
				   src="@/static/my/wenti.png"
				   mode="scaleToFill"
			    />
			  </view>
		   </view>
		</view>
		<view class="detail_box">
          <view class="detail_title">积分明细</view>
		  <view class="item_box">
            <view class="item" v-for="(item,index) in integralData" :key="index">
			  <view class="describe_text">
				  <view class="sign u-line-1">{{item.type}}</view>
				  <view class="time">{{item.created_at}}</view>
			  </view>
              <view class="detail_score">{{item.status == 0 ? '+':'-'}}{{item.score}}</view>
		    </view>
			<!-- <view v-if="integralData.length == 0" style="text-align: center; margin-top: 30rpx;">暂无积分明细</view> -->
			<view v-if="integralData.length == 0" class="page-box">
				<view class="defaltPage">
					<image
						class="defaltPageimg"
						src="@/static/demand/defaulticon.png"
						mode="scaleToFill"
					/>
					<!-- <view class="defaltext">你还没有订单</view> -->
				</view>
			</view>
			<view style="height: 600.087rpx;"></view>
		  </view>
		</view>
	</view>
</template>

<script>
import { scorelist } from '@/api/personal.js'
	export default {
		data() {
			return {
			  background: '#FFF5E9',
			  itemPage: {
				page: 1,
				size: 10
			  },
			  integralData: [],
			  count: ''
			}
		},
		onLoad(options) {
          this.getScoreList()
		},
		methods: {
		  getScoreList(){
            scorelist(this.itemPage).then((res)=>{
              console.log('积分明细',res)
			  this.count = res.count
			  this.integralData =  res.data
			})
		 },
		 hanldeIntegral() {
			 uni.showToast({
				title: "支付1元积1分；100积分可抵扣1元",
				icon: 'none',
				mask: true,
				duration: 2000
			});
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

  .integral {
	position: relative;  
    width: 750rpx;
	height: 326.087rpx;
	background: linear-gradient(153deg, #FD6784 0%, #FE445A 100%);
    display: flex;
	justify-content: center;
	align-items: center;
	.integral_use {
		position: absolute;
		right: 25.362rpx;
		top: 18.116rpx;
		display: flex;
		align-items: center;
       .integral_img {
		   width: 27.174rpx;
		   height: 27.174rpx;
		   margin-right: 9.058rpx;
	   }
	   .integral_text {
			font-size: 14px;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
	   }
	}
	.availableIntegral {
      .score {
		display: flex; 
		align-items: center;
		justify-content: center;
		height: 172.101rpx;
		font-size: 123.188rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 172.101rpx;
	  }
	  .score_text {
		height: 36.232rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 25.362rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 36.232rpx;
		.integral_img {
		   width: 27.174rpx;
		   height: 27.174rpx;
		   margin-left: 9.058rpx;
	   }
	  }
	}
  }
  .detail_box {
	margin-left: 36.232rpx;  
	width: 677.536rpx;
	height: 100%;
    background: #FFFFFF;
	.detail_title {
		margin-top: 38.043rpx;
		font-size: 16px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #000000;
	}
	.item_box {
	  overflow-y: auto;
	  height: 100%;
	  .item {
		  display: flex;
		  height: 144.928rpx;
		  align-items: center;
		  border-bottom: 1.812rpx solid #F7F7F7;
		  .describe_text {
			  width: 653.986rpx;
			  .sign {
				  font-size: 29rpx;
				  font-family: PingFangSC-Regular, PingFang SC;
				  font-weight: 400;
				  color: #000000;
			  }
			  .time {
				  margin-top: 7.246rpx;
				  font-size: 21.739rpx;
				  font-family: PingFangSC-Regular, PingFang SC;
				  font-weight: 400;
				  color: #999999;
			  }
		  }
		  .detail_score {
			font-size: 34.609rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #FE445A;
		  }
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
</style>
