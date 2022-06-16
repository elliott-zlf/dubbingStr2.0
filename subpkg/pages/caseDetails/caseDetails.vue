<template>
  <view class="container">
    <u-navbar
      :is-back="true"
      :title="nav_title"
      title-size="36.232rpx"
      title-color="#000000"
      :border-bottom="true"
	  :custom-back="handleGoBack"
    ></u-navbar>
    <view class="content">
      <view class="video_component">
        <view class="video_palybox">
          <video
		    class="video_paly"
            id="myVideo"
            :src="caseDetailData.works[0].url"
			:autoplay="true"
			:show-center-play-btn='false'
			show-loading
			object-fit="fill"
            @error="videoErrorCallback"
            controls
          ></video>
        </view>
		<view class="video_title u-line-1">{{caseDetailData.works[0].title}}</view>
		<view class="video_title_style">
			<span class="u-line-1 decstitle">{{caseDetailData.title}}</span><span>{{caseDetailData.created_at}}</span>
		</view>
		<view class="video_operation">
			<div class="video_paly_number">
				<image
				    class="paly_icon"
					src="@/static/img/video_play.png"
					mode="scaleToFill"
				/>
				<span class="nuber_text">{{caseDetailData.play_num}}</span>
			</div>
			<div class="video_paly_number" @click="handleCasecollection(caseDetailData)">
				<image
				    class="paly_icon shouchang"
					:src="caseDetailData.case_collection===1 ? anlisc : anliwsc"
					mode="scaleToFill"
				/>
				<span class="nuber_text">{{caseDetailData.collection_num}}</span>
			</div>
			<div class="video_paly_number">
				<button
						class="sharebtn"
						open-type="share"
						hover-class="button-hover"
					>
				<image
				    class="paly_icon shouchang"
					src="@/static/anli/anlishare.png"
					mode="scaleToFill"
				/>
				<span class="nuber_text">分享</span>
				</button>
			</div>
		</view>
		<view class="video_by_data"  @click.stop="handleVisitorsJump(caseDetailData)">
			<view class="video_by">
				<image
				   class="video_by_portrait"
					:src="caseDetailData.teacher.avatar"
					mode="scaleToFill"
				/>
				<span class="video_by_name">配音：{{caseDetailData.teacher.nickname}}</span>
			</view>
			<view class="cooperation_btn">
				<!-- <button  class="invitationBtn"  open-type="contact" :show-message-card="true">
				</button>	 -->
				  找他配音
			</view>
		</view>
      </view>
      <view class="recommend_case">
		  <view class="item_title">相似案例</view>
		  <view>
			  <view class="video_item" :class="{'dd': recommendCaseData.length-1 ==index }" v-for="(recitem,index) in recommendCaseData" :key="index" @click="handlecaseDetails(recitem)">
					<view class="video_box">
						<view class="video_label">{{recitem.tags[0].value}}</view>
						<image
						    class="video_cover"
							:src="recitem.head_img"
							mode="scaleToFill"
						/>
						<view class="video_palybox">
							<view class="video_paly">
								<image
								    class="video_icon"
									src="@/static/anli/anliplay.png"
									mode="scaleToFill"
								/>
								<span class="play_Num">{{recitem.play_num}}</span>
							</view>
							<view class="broadcasttime">{{recitem.works[0].time}}</view>
						</view>
					</view>
					<view class="video_desc">
						<view class="video_title u-line-1">{{recitem.works[0].title}}</view>
						<view class="video_style u-line-1">{{recitem.title}}</view>
						<view class="video_by" @click.stop="handleVisitorsJump(recitem)">
							<image
							    class="video_icon"
								:src="recitem.teacher.avatar"
								mode="scaleToFill"
							/>
							<span class="video_name u-line-1">配音：{{recitem.teacher.nickname}}</span>
						</view>
					</view>
			  </view>
		  </view>
	  </view>
	  <view style="height: 398.551rpx"></view>
    </view>
  </view>
</template>

<script>
import { casedataDetail, recommendcase,casecollection } from '@/api/casedetails.js'
import { mapState, mapActions } from "vuex";
import anlisc from '@/static/anli/anlisc.png'
import anliwsc from '@/static/anli/anliwsc.png'
export default {
  data() {
    return {
      src: "",
	  bg: '#FFFFFF',
	  anlisc: anlisc,
	  anliwsc: anliwsc,
	  caseDetailData: {},
	  recommendCaseData: [],
	  case_id: '',
	  nav_title: '案例详情',
	  avatarimageUrl: '',
	  urlpath: ''
    };
  },
  onReady: function (res) {
    // #ifndef MP-ALIPAY
    this.videoContext = uni.createVideoContext("myVideo");
    // #endif
  },
  computed: {
	...mapState("user", ["token", "userInfo","workStatus"]),
  },
  onLoad(options) {
	console.log('案例详情数据', options)  
    this.case_id = options.id
	this.urlpath = options.url
	this.getUnionid()
  },
//   onShareAppMessage(res) {
// 		if (res.from === 'button') {// 来自页面内分享按钮
// 		    console.log(res.target)
// 		}
// 		return {
// 			title: nav_title,
// 			path: "/subpkg/pages/caseDetailsshare/caseDetailsshare?id="+this.case_id,
// 			complete: function(res) {
// 				console.log('分享成功', res)
// 			},
// 		}
//   },
  onShareAppMessage(res) {
    if (res.from === "button") {
      // 来自页面内分享按钮
      console.log(res.target);
    }
    return {
      title: '帮忙看下这个视频的出片效果，你是甲方给几分？',
      path: "/subpkg/pages/caseDetailsshare/caseDetailsshare?id="+this.case_id+"&&url=index",
      imageUrl: "",
      complete: function (res) {
        console.log("分享成功", res);
      },
    };
  },
  onShareTimeline(res) {
     console.log('走这里了吗',this.case_id)
	 return {
		title: '看下这个视频的配音效果，你是甲方给几分？',
        imageUrl: this.avatarimageUrl,
        query: "id="+this.case_id+"&&url=index",
		complete: function(res) {
			console.log('分享成功', res)
		},
	  }
  },
  methods: {
	...mapActions("user", ["login"]),
	// 登录数据
	getUnionid() {
	uni.login({
		provider: "weixin",
		success: async (result) => {
		console.log('this.currue的值4',this.current)
		await this.login(result.code);
		this.getcaseData()
		this.getRecommenDcase()
		},
		fail: (error) => {
		console.log("登录失败", error);
			this.getcaseData()
			this.getRecommenDcase()
		},
	});
	}, 
	// 案例详情数据
	getcaseData() {
	  casedataDetail({case_id: this.case_id}).then((res)=>{
        console.log('案例详情数据', res)
		// this.nav_title = res.data.works[0].title
		this.caseDetailData = res.data
		this.avatarimageUrl = this.caseDetailData.head_img
	  })
	},
	// 案例推荐
	getRecommenDcase() {
      recommendcase({case_id: this.case_id}).then((res)=>{
        console.log('案例推荐数据', res)
		this.recommendCaseData = res.data
	  })
	},
	// 跳转到配音师详情
	handleVisitorsJump(orderItem) {
		uni.setStorageSync("current", '');
		uni.navigateTo({
			url: "/subpkg/pages/teacherlist/teacherlist?id=" + orderItem.teacher_id,
		});
	},
	// 跳转案例详情页
	handlecaseDetails(item) {
	  console.log('跳转到案例详情页面', item)  
	  uni.redirectTo({ url: '/subpkg/pages/caseDetails/caseDetails?id='+item.id})
	},
	// 收藏案例
	handleCasecollection(item) {
      casecollection({case_id: item.id}).then((res)=>{
		  console.log('收藏成功', res)
		  if(this.caseDetailData.case_collection == 1) {
			 this.caseDetailData.case_collection = 0
		  }else {
			 this.caseDetailData.case_collection = 1  
		  }
	  })
	},
	handleGoBack() {
    if (this.urlpath == 'index') {
          uni.switchTab({ url: '/pages/index/index' })
        } else {
          uni.navigateBack({
            delta: 1
          })
        }
    },
	// 视频播放报错
    videoErrorCallback: function (e) {
      uni.showModal({
        content: e.target.errMsg,
        showCancel: false,
      });
    },
  },
};
</script>
<style>
page {
  height: 100%;
  overflow: hidden;
}
.invitationBtn {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  border-radius: 57.971rpx 0rpx 0rpx 57.971rpx;
  /* justify-content: space-between; */
  border: none;
  padding: 0 !important;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
}
.invitationBtn::after {
  border: none !important;
}
.container {
  height: 100%;
  overflow-y: hidden;
  background: #f2f2f2;
}
.dropdown {
  background: #ffffff;
}
.u-dropdown {
  background: #ffffff;
}
.defaltext {
  margin-top: 30rpx;
  text-align: center;
  font-size: 24rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #717171;
  line-height: 28.986rpx;
}
.invitationBtn {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	border-radius: 57.971rpx 0rpx 0rpx 57.971rpx;
	/* justify-content: space-between; */
	border: none;
	padding: 0 !important;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
}
.sharebtn {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
}
.sharebtn::after {
  border: none !important;
}
.invitationBtn::after {
  border: none !important;
}
</style>
<style lang="scss">
.content {
	height: 100%;
	overflow-y: auto;
  .video_component {
    margin-left: 27.174rpx;
    width: 695.652rpx;
    // height: 797.101rpx;
    background: #ffffff;
    border-radius: 14.493rpx;
    .video_palybox {
	  position: relative;	
	  margin-top: 25.362rpx;	
      width: 695.652rpx;
      height: 434.783rpx;
	  border-top-left-radius: 14.493rpx;  
	  border-top-right-radius: 14.493rpx;
	  overflow: hidden;
      background: rgba(0, 0, 0, 0.2);
	  .video_paly {
		 position: absolute;
		 top: 0; 
		 left: 0;
		 border-top-left-radius: 14.493rpx;  
		 border-top-right-radius: 14.493rpx;
		 width: 695.652rpx;
         height: 434.783rpx;  
	  }
    }
	.video_title {
		margin-top: 39.855rpx; 
		margin-left: 27.174rpx;
		width: 641.304rpx;
		height: 36.232rpx;
		font-size: 28.986rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #000000;
		line-height: 36.232rpx;
	}
	.video_title_style {
		margin-left: 27.174rpx;
		margin-top: 18.116rpx;  
		display: flex;
		justify-content: space-between; 
        width: 641.304rpx;
		height: 32.609rpx;
		font-size: 23.551rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
		line-height: 32.609rpx;
		.decstitle {
			width: 450rpx;
		}
	}
	.video_operation {
		margin-top: 39.855rpx; 
		margin-left: 27.174rpx;
		width: 641.304rpx;
		display: flex;
		justify-content: space-between;
		.video_paly_number {
			display: flex;
			align-items: center;
			.paly_icon {
				width: 25.362rpx;
				height: 28.986rpx;
			}
			.shouchang {
				width: 30.797rpx;
				height: 27.174rpx;
			}
			.nuber_text {
				margin-left: 9.623rpx;
				font-size: 25.362rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #000000;
			}
		}
	} 
	.video_by_data {
		border-top: 1.812rpx solid #F7F7F7;
		margin-top: 36.232rpx;
		padding: 0 27.174rpx;
		width: 695.652rpx;
		height: 123.188rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.video_by {
		display: flex;
		align-items: center;
		.video_by_portrait {
			width: 47.101rpx;
			height: 47.101rpx;
			border-radius: 23.551rpx;
		}
		.video_by_name {
			margin-left: 9.058rpx;
			font-size: 25.362rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #000000;
		}
	}
	.cooperation_btn {
		width: 195.652rpx;
		height: 72.464rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #FF445A;
		// border-radius: 47.101rpx;
		border: 1.812rpx solid #FF445A;
		font-size: 25.362rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		border-radius: 7.246rpx;
		.invitationBtn {
		  width: 195.652rpx;
			height: 72.464rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			background: #FF445A;
			box-shadow: 0rpx 14.493rpx 18.116rpx 0rpx rgba(255, 68, 90, 0.11);
			// border-radius: 47.101rpx;
			border: 1.812rpx solid #FF445A;
			font-size: 25.362rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #FFFFFF;	
		}
	}
  }
  .recommend_case {
	margin-top: 21.739rpx;
	margin-left: 27.174rpx;  
	width: 695.652rpx;
	background: #FFFFFF;
	box-shadow: 0rpx 3.623rpx 36.232rpx 0rpx rgba(0, 0, 0, 0.07);
	border-radius: 14.493rpx;
    .item_title {
		padding-top: 28.986rpx;
		margin-left: 23.551rpx;
		font-size: 32.609rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #000000;
	}
	.dd {
	  border-bottom-left-radius: 14.493rpx;
	  border-bottom-right-radius: 14.493rpx;
	  border-bottom: none !important;
	}
	// 案例item
	.video_item {
		display: flex;
		align-items: center;
		width: 695.652rpx;
		height: 250rpx;
		background: #FFFFFF;
		border-bottom: solid 1.812rpx #F7F7F7;
		padding-left: 27.174rpx;
	.video_box {
		position: relative;  
		width: 320.652rpx;
		height: 195.652rpx;
		border-radius: 14.493rpx;
		.video_label {
		position: absolute;	
		top: 10.87rpx;
		left: 10.87rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		min-width: 97.71rpx;
		padding: 0 9.058rpx;
		height: 36.232rpx;
		background: #FF445A;
		border-radius: 7.246rpx;
		opacity: 0.9;
		font-size: 19.928rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		}
		.video_cover {
		width: 320.652rpx;
		height: 195.652rpx;
		border-radius: 14.493rpx;
		}
		.video_palybox {
			position: absolute;
			display: flex;
			justify-content: space-between;
			margin: 0 18.116rpx;
			left: 0;
			width: 284.42rpx;
			bottom: 18.116rpx;
			.video_paly {
			display: flex;
			align-items: center;
			.video_icon {
				width: 19.928rpx;
				height: 21.739rpx;
			}
			.play_Num {
				margin-left: 5.435rpx;
					font-size: 23.551rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
			}
			}
			.broadcasttime {
				font-size: 23.551rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
			}
		}
	}
	.video_desc {
		position: relative;
		width: 350rpx;
		height: 195.652rpx;
		padding: 23.551rpx 30.797rpx;
		.video_title {
			font-size: 28.986rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #000000;
		}
		.video_style {
			margin-top: 18.116rpx;
			font-size: 23.551rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #666666;
		}
		.video_by {
			// margin-top: 34.174rpx;
			display: flex;
			align-items: center;
			position: absolute;
			bottom: 17.116rpx;
			.video_icon {
				width: 36.232rpx;
				height: 36.232rpx;
				border-radius: 18.116rpx;
			}
			.video_name {
				margin-left: 9.058rpx; 
				font-size: 23.551rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				width: 259rpx;
				color: #666666;
			}
		}
	}
	}
  }
}
</style>
