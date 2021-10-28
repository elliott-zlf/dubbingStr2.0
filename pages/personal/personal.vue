<template>
  <view class="personal_box">
    <u-navbar
      :is-back="false"
      title="个人中心"
      title-size="36.232rpx"
      title-color="#000000"
      :border-bottom="false"
    ></u-navbar>
    <view class="teacherlist_box">
	 <scroll-view class="scroll_box" scroll-y="true">
		  <view class="head_card_box">
        <view class="my_avatar" @click="handleClicklogin">
          <image
            class="avatar_icon"
            :src="userInfo.avatarUrl ? userInfo.avatarUrl : defaultAvatar"
            mode="scaleToFill"
          />
          <view class="nick_name"> {{userInfo.nickName ? userInfo.nickName : '未登录'}} </view>
        </view>
        <image
          class="background_icon"
          src="@/static/my/backgroundicon.png"
          mode="scaleToFill"
        />
      </view>
      <view class="my_list_cell_box">
       <view class="list_cell">
		    <button  class="invitationBtn" open-type="contact" send-message-title="联系客服" :show-message-card="true">
				 <view class="cell_logo_box">
					<image
						class="cell_logo"
						src="@/static/my/cService.png"
						mode="scaleToFill"
					/>
					<text class="cell_text">联系客服</text>
				</view>	  
			</button>
		   <view class="travel_to_iconbox">
			  <image
				class="travel_to_icon"
				src="@/static/my/traveltoicon.png"
				mode="scaleToFill"
			  />
		   </view>
	   </view>
	    <view class="list_cell">
		   <view class="cell_logo_box">
             <image
			     class="cell_logo"
				 src="@/static/my/aboutus.png"
				 mode="scaleToFill"
			 />
			 <text class="cell_text">关于我们</text>
		   </view>
		   <view class="travel_to_iconbox">
			  <image
				class="travel_to_icon"
				src="@/static/my/traveltoicon.png"
				mode="scaleToFill"
			  />
		   </view>
	   </view>
	   <view class="list_cell">
		   <view class="cell_logo_box">
             <image
			     class="cell_logo"
				 src="@/static/my/qa.png"
				 mode="scaleToFill"
			 />
			 <text class="cell_text">常见问题</text>
		   </view>
		   <view class="travel_to_iconbox">
			  <image
				class="travel_to_icon"
				src="@/static/my/traveltoicon.png"
				mode="scaleToFill"
			  />
		   </view>
	   </view>
	   <view class="list_cell">
		   <view class="cell_logo_box">
             <image
			     class="cell_logo"
				 src="@/static/my/in.png"
				 mode="scaleToFill"
			 />
			 <text class="cell_text">配音师入驻</text>
		   </view>
		   <view class="travel_to_iconbox">
			  <image
				class="travel_to_icon"
				src="@/static/my/traveltoicon.png"
				mode="scaleToFill"
			  />
		   </view>
	   </view>
	  </view>
      <view class="weChat_card">
		  <view class="title_group_box">
            <image
			      class="group_icon"
				  src="@/static/my/qunicon.png"
				  mode="scaleToFill"
			  />
			  <text class="group_text">全国广告宣传片甲方资源置换微信群</text>
		  </view>
		  <view class="group_content" @click="handleCheckWeb">
			  <view class="group_content_box">
                <image
			        class="group_icon"
					src="@/static/my/placeholder.png"
					mode="scaleToFill"
				/>
				<view class="text_yanzheng">该群已开启进群验证</view>
				<view class="text_in">只可通过邀请进群</view>
				<view class="in_btn">点击加入</view>
			  </view>
		  </view>
	  </view>
	 </scroll-view>	
    </view>
	<u-popup v-model="erweimaShow" :mask-close-able="true" border-radius="10" mode="center" width="557.971rpx" height="625rpx">
		<view class="erweimabox">
			<view class="erweima_iconbox" @click="handlecloseerweima">
			<view class="close_iconbox">
				<image
					class="close_icon"
					src="@/static/my/close.png"
					mode="scaleToFill"
					/>
			</view>
			<view style="height:41.667rpx"></view>   
			<image
				class="erweima_icon"
				src="@/static/my/erweimaqun.jpeg"
				mode="scaleToFill"
				/>
			</view>	
			<view class="erweima_box">
				添加工作人员微信，资料认证后拉你进群
			</view>
		</view>
	</u-popup>
  </view>
</template>

<script>
import { mapState, mapActions } from "vuex";
import defaultAvatar from '@/static/my/defaultAvatar.png'
export default {
  data() {
    return {
		erweimaShow: false,
	};
  },
  computed: {
    ...mapState("user", ["token", "userInfo"]),
  },
  onLoad() {
	console.log('存储的个人资料', this.userInfo)
  },
  methods: {
	 ...mapActions("user", ["login","saveUserInfo"]),  
    handleClicklogin() {
	  if (this.userInfo.nickName) {
	  } else {
		this.getUserInfo()
	  }	
	},
	// 跳转到问卷调查
	handleCheckWeb() {
		this.erweimaShow = true
	//   uni.navigateTo({ url: '/pages/webview/webview?src='+ this.webSrc })
	},
	handlecloseerweima() {
		this.erweimaShow = false
	},
    getUserInfo() {
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
		  await this.saveUserInfo(obj);
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
  }
};
</script>
<style lang="scss">
page {
  min-height: 100%;
  width: 100%;
  background: #f2f2f2;

}
.personal_box {
	width: 100%;
	height: 100%;
}
</style>
<style lang="scss">
.invitationBtn {
	width: 100%;
	height: 113.678rpx;
	display: flex;
	justify-content: space-between;
	border-radius: 8rpx;
	border: none;
	padding: 0 !important;
	background: #FFFFFF;
	font-size: 26rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
}
.invitationBtn::after {
  border: none !important;
}
.teacherlist_box {
  height: 100%;
  overflow-y: auto;
  position: relative;
  .scroll_box {
	  height: 100%;
  }
  .head_card_box {
    position: relative;
    margin-top: 27.174rpx;
    margin-left: 27.174rpx;
    width: 695.652rpx;
    height: 344.203rpx;
    .background_icon {
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0;
    }
    .my_avatar {
      text-align: center;
      z-index: 99;
      .avatar_icon {
        margin-top: 38.043rpx;
        width: 177.536rpx;
        height: 177.536rpx;
		border-radius: 88.768rpx;
      }
      .nick_name {
        text-align: center;
        margin-top: 18.116rpx;
        height: 43.478rpx;
        font-size: 32.609rpx;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
        line-height: 43.478rpx;
      }
    }
  }
  .my_list_cell_box {
	margin-top: 21.739rpx;
    margin-left: 27.174rpx;  
    width: 695.652rpx;
	height: 454.71rpx;
	background: #FFFFFF;
	border-radius: 14.493rpx;
	.list_cell {
		height: 113.678rpx;
		display: flex;
		justify-content: space-between;
		.cell_logo_box {
			display: flex;
			align-items: center;
			.cell_logo {
				margin-left: 30.797rpx;
				width: 47.101rpx;
				height: 47.101rpx;
			}
			.cell_text {
				margin-left: 19.928rpx;
				height: 45.29rpx;
				font-size: 32.609rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #000000;
				line-height: 45.29rpx;
			}
		}
		.travel_to_iconbox {
			line-height: 113.678rpx;
			text-align: right;
            .travel_to_icon {
				width: 14.87rpx;
				height: 19.928rpx;
				margin-right: 27.174rpx;
			}
		}
	}
  }
  .weChat_card {
	padding: 38.043rpx 0px 0px 30.797rpx;  
	margin-bottom: 18.116rpx;
	margin-top: 21.739rpx;
    margin-left: 27.174rpx;    
	width: 695.652rpx;
	height: 492.754rpx;
	background: #FFFFFF;
	text-align: center;
	border-radius: 14.493rpx;
	.title_group_box {
		display: flex;
		text-align: center;
		align-items: center;
		.group_icon {
			width: 47.101rpx;
			height: 47.101rpx;
		}
		.group_text {
			margin-left: 19.928rpx;
			width: 521.739rpx;
			height: 45.29rpx;
			font-size: 32.609rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #000000;
			line-height: 45.29rpx;
		}
	}
	.group_content {
		display: inline-block;
		margin-top: 19.928rpx;
        width: 362.319rpx;
		height: 362.319rpx;
		position: relative;
		.group_icon {
		  position: absolute;
		  top: 0;
		  left: 0;	
          width: 362.319rpx;
		  height: 362.319rpx;
		}
		.text_yanzheng {
			margin-top: 97.826rpx;
			font-size: 28.986rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #666666;
			line-height: 45.29rpx;
		}
		.text_in {
			font-size: 28.986rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #666666;
			line-height: 45.29rpx;
		}
		.in_btn {
			margin-top: 16.304rpx;
			font-size: 32.609rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #FF445A;
			line-height: 45.29rpx;
		}
	}
  }
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
</style>
