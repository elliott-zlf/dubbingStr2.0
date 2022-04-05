<template>
	<view class="content">
		<view v-if="dataList.length!==0">
			<view class="accesslist" v-for="(item,index) in dataList" :key="index">
				<image
					class="accesslist_portrait"
					:src="item.teacher.avatar"
					mode="scaleToFill"
                    @click="handleTravelTo(item)"
				/>
				<view class="personal_Profile" @click="handleTravelTo(item)">
					<view class="name_box">
						<text class="nick_name u-line-1">{{item.teacher.nickname}}</text>
						<image
							v-if="item.teacher.sex===1"
							class="gender"
							src="@/static/teacherlist/manicon.png"
							mode="scaleToFill"
						/>
						<image
							v-else-if="item.teacher.sex===2"
							class="gender"
							src="@/static/teacherlist/woman.png"
							mode="scaleToFill"
						/>
						<image
							v-else-if="item.teacher.sex===3"
							class="gender"
							src="@/static/teacherlist/qi.png"
							mode="scaleToFill"
						/>
					</view>
					<view class="deta_text u-line-1">{{item.created_at}}</view>
				</view>
				<view v-if="item.follow === 0" class="focus_btn" @click="handleFocus(item,0)">关注</view>
				<view v-else class="not_concern" @click="handleFocus(item,1)">已关注</view>
			</view>
		</view>
		<view v-if="dataList.length===0" class="emptydata">
			<image
			    class="emptydataimg"
				src="@/static/carddetails/emptydata.png"
				mode="scaleToFill"
			/>
			<view class="emptydatatext">暂无数据</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"accesslist",
		props: {
           dataList: {
			   type: Array,
			   default: () => {
					return []
				}
		   }
		},
		data() {
			return {
				concern: true,
			}
		},
		methods: {
			handleTravelTo(item) {
			  console.log('跳转到配音师名片页面',item)
			   uni.setStorageSync('current', '')
			  // uni.navigateTo({ url: '/subpkg/pages/teacherlist/teacherlist' })
				uni.navigateTo({ url: '/subpkg/pages/teacherlist/teacherlist?id='+item.teacher_id })
			},
			handleFocus(item,index) {
               this.$emit("handleFocus",{item,index})
			}
		}
	}
</script>

<style lang="scss">
.content {
	padding: 0 27.174rpx;
	.accesslist {
		display: flex;
		height: 144.928rpx;
		margin-top: 9.058rpx;
		align-items: center;
		.accesslist_portrait {
			width: 108.696rpx;
			height: 108.696rpx;
			border-radius: 54.348rpx;
		}
		.personal_Profile {
			margin-left: 32.609rpx;
		    width: 395rpx;
			.name_box {
				display: flex;
				align-items: center;
				.nick_name {
					display: inline-block;
					max-width: 300rpx;
					font-size: 28.986rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #171F24;
				}
				.gender {
					margin-left: 7.246rpx;
					width: 28.986rpx;
					height: 28.986rpx;
				}
			}
			.deta_text {
				margin-top: 9.058rpx;
				max-width: 390rpx;
				font-size: 23.551rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #B9BABC;
			}
		}
		.focus_btn {
            width: 159.42rpx;
			height: 65.217rpx;
			text-align: center;
			line-height: 65.217rpx;
			border: #F52C5A 1px solid;
			// box-shadow: 0rpx 7.246rpx 10.87rpx 0rpx rgba(18, 70, 255, 0.18);
			border-radius: 32.609rpx;
			font-size: 25.362rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #F52C5A;
		}
		.not_concern{
			text-align: center;
            width: 159.42rpx;
			height: 65.217rpx;
			line-height: 65.217rpx;
			box-shadow: 0rpx 14.493rpx 28.986rpx 0rpx rgba(236, 235, 235, 0.27);
			border-radius: 50.725rpx;
			border: 1.812rpx solid #CECECE;
			font-size: 25.362rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #999999;
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
}
</style>
