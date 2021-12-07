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
	 <view class="pys_popup" v-if="erweimaShow">
		<view class="popup_conent">
			<image
				class="closeicon"
				src="@/static/home/close.png"
				mode="scaleToFill"
				@click="handlecloseerweima"
			/>
			<view class="erweimabox">
			<view class="erweima_iconbox">
				<image
				class="erweima_icon"
				src="@/static/my/erweimaqun.jpeg"
				mode="scaleToFill"
				/>
			</view>	
			<view class="erweima_box">
			  截图保存图片，添加客服微信
			</view>
			</view>
		</view>
	 </view>	
	 <scroll-view class="scroll_box" scroll-y="true">
		  <view class="head_card_box">
        <view class="my_avatar">
          <image
		    v-if="!loginStatusShow"
            class="avatar_icon"
            src="https://www.peiyinstreet.com/guidang/defaultAvatar.png"
            mode="scaleToFill"
			@click="handleClicklogin"
          />
		  <image
		    v-if="loginStatusShow"
            class="avatar_icon"
            :src="userInfo.avatar"
            mode="scaleToFill"
          />
          <view class="nick_name"> {{loginStatusShow ? userInfo.nickname : '未登录'}} </view>
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
  </view>
</template>

<script>
import { loginStatus,profileIndex } from '@/api/index.js'
export default {
  data() {
    return {
		erweimaShow: false,
		loginStatusShow: false,
		userInfo: {

		}
	};
  },
  computed: {
  },
  onLoad() {
  },
  onShow() {
    this.getloginStatus()
  },
  methods: {
	getloginStatus() {
	   loginStatus().then((res)=>{
		   if(res.data.nickname===0) {
             this.loginStatusShow = false
           }else {
			 profileIndex().then((res)=>{
			   this.userInfo = res.data
			   this.loginStatusShow = true  
			 }) 
		   }
	   })	
	},
    handleClicklogin() {
	  this.getUserInfo()
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
		  const userobj = {
            nickname: obj.userInfo.nickName,
            userId: this.userId,
            avatar: obj.userInfo.avatarUrl,
            phone: ''
          }
          await profileUpdate(userobj);
		  this.getloginStatus()
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
.pys_popup {
    position: fixed;
    height: 100%;
    width: 100%;
    background:rgba(0,0,0,0.5);
    z-index: 999999;
	.popup_conent {
		position: absolute;
		padding: 36.232rpx;
		top: 40%;
		left: 50%;
		transform: translate(-50%,-50%);
		min-width: 500.71rpx;
		min-height: 326.087rpx;
		background: #FFFFFF;
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
.applystorage {
	position: fixed;
	bottom: 70.391rpx;
	width: 100%;
	text-align: center;
	.rankbtn {
        display: inline-block;
		width: 579.71rpx;
		height: 94.203rpx;
		line-height: 94.203rpx;
		text-align: center;
		background: #1274FF;
		box-shadow: 0px 8px 10px 0px rgba(18, 70, 255, 0.18);
		border-radius: 30px;
		font-size: 32.609rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
	}
	.applystorage_btn {
		display: inline-block;
		width: 579.71rpx;
		height: 94.203rpx;
		text-align: center;
		background: #1274FF;
		box-shadow: 0px 8px 10px 0px rgba(18, 70, 255, 0.18);
		border-radius: 30px;
        .shenqing{
			margin-top: 10rpx;
           font-size: 32.609rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
		}
		.gengduo{
			font-size: 18.116rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
		}

	}

}
.rankingbox {
	.rankingtop_text_box{
		display: flex;
		justify-content: center;
		.rankingtext{
			width: 271.739rpx;
			.mingci {
                text-align: center;
				height: 50.725rpx;
				font-size: 36.232rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #000000;
				line-height: 50.725rpx;
				.mingci_num {
					color: #1274FF;
				}
			}
			.tipstitle {
				text-align: center;
				height: 36.232rpx;
				font-size: 25.362rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #000000;
				line-height: 36.232rpx;
			}

		}
		.scoretest {
			width: 271.739rpx;
			.jifne {
			    text-align: center;
				height: 50.725rpx;
				font-size: 36.232rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #000000;
				line-height: 50.725rpx;	
			}
			.tipstitle {
				text-align: center;
				height: 36.232rpx;
				font-size: 25.362rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #000000;
				line-height: 36.232rpx;
			}
		}
	}
	.prompt_box {
	  margin-top: 38.043rpx;
	  width: 543.478rpx;
	  height: 271.739rpx;
	  background: #F4F4F4;
	  border-radius: 14.493rpx;
	  text-align: center;
	  .defen {
		text-align: center;
		height: 30.797rpx;
		font-size: 21.739rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
		line-height: 30.797rpx;
	  }
	  .defen2 {
		text-align: center;
		height: 30.797rpx;
		font-size: 21.739rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
		line-height: 30.797rpx;
	  }
	  .know_btn {
		display: inline-block;
		width: 304.348rpx;
		height: 79.71rpx;
		line-height: 79.71rpx;
		background: #1274FF;
		box-shadow: 0px 14.493rpx 18.116rpx 0px rgba(18, 70, 255, 0.18);
		border-radius: 39.855rpx;
		font-size: 28.986rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
	  }
	}
}

</style>
