<template>
	<view class="container">
	  <u-navbar
		:is-back="false"
		title="配音街-专业真人配音平台"
		title-size="36.232rpx"
		title-color="#000000"
		title-width="600rpx"
		:border-bottom="true"
		:background="background"
		back-icon-color="#000000"
	  ></u-navbar>
	  <guide v-if="guideShow"></guide>
	  <view class="release_demand_box">
        <view class="release_demand">
          <view class="release_item" @click="handleSoundlibrary(2)">
            <view class="release_text">
				人工极速试音
			</view>
			<view class="instructions">
				<view class="ins_text">
					<view class="ins_text ins_textS">7x24h及时响应</view>
					<view class="ins_text ins_textS">满意为止</view>
				</view>
				<view class="red_icon">
					<image
					  class="red_icon"
					  src="@/static/home/red_icon.png"
					  mode="scaleToFill"
					/>
				</view>
			</view>
			<image
			    class="resease_bc"
				style="width: 313.594rpx; height: 160.42rpx;"
				src="@/static/home/red_bc.png"
				mode="scaleToFill"
			/>
		  </view>
		  <view class="release_item" style="margin-left:21.739rpx;" @click="handleJumpPublishing">
              <view class="release_text hottext">
				自主按样下单
				<!-- <image
				    class="hoticon"
					src="@/static/img/hotfill.png"
					mode="scaleToFill"
				/> -->
				<!-- <view class="hotbtn">9折</view> -->
			  </view>
			<view class="instructions">
				<view class="ins_text">
					<view class="ins_textS">告别频繁沟通</view>
					<view class="ins_textS">所听即所得</view>
				</view>
				<view class="bule_icon">
					<image
					  class="bule_icon"
					  src="@/static/home/bule_icon.png"
					  mode="scaleToFill"
					/>
				</view>
			</view>
			<image
			    class="resease_bc"
				src="@/static/home/bule_bc1.png"
				mode="scaleToFill"
			/>
		  </view>
	  </view>
		<view class="hotlist_box">
			<view class="hotlist" v-for="(item,index) in hottopicsData" :key="index" @click="handleJumpmusic(item)">
				<image
				    class="hotitem_icon"
					:src="item.img_url"
					mode="aspectFit"
				/>
				<view class="name">{{item.name}}</view>
			</view>
		</view>
	  </view>
	  <view class="banner_box">
		  <!-- <image
		      class="banner_img"
			  :src="bannerimg"
			  mode="scaleToFill"
		  /> -->
		  <u-swiper :list="bannerimgData" height="181.159" :autoplay="true" name="img" @click="hanldeJumpEvents"></u-swiper>
	  </view>
	  <view class="hottopics_item">
        <view class="hottitle_box">
			<view class="hot_title">热门样音</view>
			<view class="hot_btn" @click="handleSoundlibrary(2)">更多</view>
		</view>
		<view class="work_conten">
            <view 
			  class="works_item" 
			  :class="{'works_itemborder' : hotworksData.length-1 == index}" 
			  v-for="(item,index) in hotworksData" 
			  :key="index"
			  >
					<view class="play_item" @click="playTheMusic(item)">
						<image
							class="head_portrait_img"
							:src="item.teacher.avatar"
							mode="aspectFill"
						/>
						<image
							class="home_play"
							:src="item.works.playStatus ? playActive : play"
							mode="scaleToFill"
						/>
						<view class="head_portrait_meng"></view>
						<!-- 在线状态  -->
					    <view class="online"></view>
					</view>
					<view class="works_name_item" @click="handleVisitorsJump(item)">
						<view class="works_name u-line-1">{{item.works.title}}</view>
						<view class="works_style u-line-1">
							<span v-if="item.teacher.grade_text!=='无'">{{item.teacher.grade_text}}</span>
							<span v-if="item.teacher.grade_text!=='无'" style="margin-left:10rpx;margin-right:10rpx">|</span>
							<span>{{item.tags[0].value}}</span>
							<span style="margin-left:10rpx;margin-right:10rpx">|</span>
							<span>{{ transformsex(item.teacher.sex)}}</span>
							<!-- <span v-if="item.admin_price" style="margin-left:10rpx;margin-right:10rpx">|</span>
							<span>{{item.admin_price}}</span><span v-if="item.admin_price">元</span> -->
						</view>
						<view class="price_item">
							<view class="price_text">{{item.price_text}}</view>
							<view class="price_box">
								<view v-if="item.admin_price" class="price_num">
                                    <span>￥</span>
								    <span>{{item.admin_price}}</span>
								</view>
								<view v-else class="price_num">见稿报价</view>
							</view>
							<view v-if="item.admin_price" class="price_line_box">
								￥{{item.discount_price}}
                                <view class="price_line"></view>
							</view>
						</view>
					</view>
					<!-- <view class="btn_item">
						<view class="voice_btn" @click="handleUseOrder(item)">试音</view>
						<image
						    class="voice_img"
							src="@/static/my/caozuo.png"
							mode="scaleToFill"
						/>
					</view> -->
			</view>
		</view>
	  </view>
	  <view class="hottopics_item">
        <view class="hottitle_box">
			<view class="hot_title">热门老师</view>
			<view class="hot_btn" @click="handleSoundlibrary(1)">更多</view>
		</view>
		<view class="teacher_conten">
			<view class="voice_item" 
			  v-for="(item,index) in hotteacherData"
			  :class="{'works_itemborder' : hotworksData.length-1 == index}"
			  :key="index"
			>
					<view class="head_portrait_box" @click="playTheMusic(item)">
						<div v-if="item.teacher.grade_text!=='无'" class="video_label">{{item.teacher.grade_text}}</div>
						<image
							class="head_portrait_img"
							:src="item.teacher.avatar"
							mode="aspectFill"
						/>
						<image
							class="home_play"
							:src="item.works.playStatus ? playActive : play"
							mode="scaleToFill"
						/>
						<view class="head_portrait_meng"></view>
						<!-- 在线状态  -->
					    <view class="online"></view>
					</view>
					<view class="voice_introduce">
						<view class="voice_name">
							<!-- <view class="rank" v-if="index < 9">{{'0' + (index+1)}}</view>
							<view class="rank" v-else>{{ index+1}}</view> -->
							<view class="name u-line-1"  @click="handleVisitorsJump(item)">{{item.teacher.nickname}}</view>
							<image
								v-if="item.teacher.sex===1"
								class="sex"
								src="@/static/teacherlist/manicon.png"
								mode="scaleToFill"
							/>
							<image
								v-else-if="item.teacher.sex===2"
								class="sex"
								src="@/static/teacherlist/woman.png"
								mode="scaleToFill"
							/>
							<image
									v-else-if="item.teacher.sex===3"
								class="sex"
								src="@/static/teacherlist/qi.png"
								mode="scaleToFill"
							/>
							<view v-if="item.type===0" class="focus_btn" @click="handleFocus(item,0)">关注</view>
							<view v-if="item.type===1" class="nofocus_btn" @click="handleFocus(item,1)">已关注</view>
						</view>
						<view @click="handleVisitorsJump(item)">
							<view class="numberworks">
								<text class="workscount">作品数{{item.teacher.work_count}}</text>
								<text class="playcount">播放量{{item.teacher.browse_count}}</text>
							</view>
							<view class="jianjie u-line-1">
								{{item.teacher.intro}}
							</view>
							<view class="tagNum">
								<view v-for="(tagitem,tagindex) in item.teacher.tags" :key="tagindex" >
								<view v-if="tagitem.type_id===5" class="tag">
									{{tagitem.value}}
								</view>
								</view>
							</view>
						</view>
					</view>
				</view>
		</view>
	  </view>
	   <view class="hottopics_item">
        <view class="hottitle_box">
			<view class="hot_title">平台案例</view>
			<view class="hot_btn" @click="handleSoundlibrary(3)">更多</view>
		</view>
		<view class="anli_conten">
			<div class="anliitem" v-for="(item,index) in hotcaseData" :key="index" @click="handleSoundlibrary(3, item)">
			  <image
			      class="anli_bc"
				  :src="item.img_url"
				  mode="scaleToFill"
			  />
			  <div class="anli_text">
                <p class="anli_type">{{item.name}}</p>
			    <p class="anli_fubiao">{{item.content}}</p>
			  </div>
			</div>
		</view>
	  </view>
	  <view class="logo_item">
		  <view class="logo_box">
			  <image
			      class="logo_icon"
				  src="@/static/img/logo.png"
				  mode="scaleToFill"
			  />
			  <view class="logo_name" @click="handleServiceChat">配音街</view>
		  </view>
		  <view class="logo_sogin">累计已为用户配音超过837280字</view>
	  </view>
	  <view v-if="audioShow" class="home_musicSrc_box disappear">
        <musicAudio 
		  ref="musicAudio"
		  :url="dataPlay.works.url"
		  :autoplay="true"
		  :portrait="dataPlay.teacher.avatar"
		  :music_title="dataPlay.works.title"
		  @handleChangePlay="handleChangePlay"  
		  @musicClose="musicClose"
		  ></musicAudio>
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
			<cover-image
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
	<dropball v-if="false" title="联系客服">
	</dropball>
	</view>
</template>

<script>
import musicAudio from "@/components/audio/audioplay.vue";
import { couponadd, servicehot,bannerIndex } from "@/api/index.js"
import submitForm from '@/components/submitform/submitform.vue'
import { mapState, mapActions } from "vuex";
import dropball from '@/components/dropball/dropball.vue'
import play from '@/static/home/homeplay.png'
import playActive from '@/static/home/homeplayActive.png'
import guide from '@/components/guide/guide.vue'
// 埋点统计
import { buriedSomeStatistical } from '@/utils/encapsulation.js'
	export default {
		components: {
		  musicAudio,
		  submitForm,
		  dropball,
		  guide
		},
		data() {
			return {
				background: {
					backgroundColor: "#FFFFFF",
				},
				swiperList: [],
				colorClass: ["https://www.peiyinstreet.com/guidang/colorRed.png","https://www.peiyinstreet.com/guidang/colorBlue.png","https://www.peiyinstreet.com/guidang/colorYellow.png"],
				play: play,
				playActive: playActive,
				swiperId: '',
				musicSrc: '',
				guideShow: true,
				dataPlay: {
				works: {url: ''}
			    },
				getListArg: {
				  tag_data: [],
				  page: 1,
				  size: 10,
				  type: 1
				},
				// 热门数据
				hottopicsData: [],
                hotworksData:[],
				hotteacherData: [],
				hotcaseData: [],
				audioShow: false,
			    innerAudio: '',
				innerAudioUrl: '',
				// 优惠卷显示
				securitiesShow: true,
				couponsShow: false,
				// 优惠卷数据
				couponsData: {

				},
				bannerimgData: [],
			}
		},
		computed: {
		  ...mapState("user", ["token", "userId"]),
		},
		onLoad() {
		  this.logins()
		  this.getHotData()
		},
		onShow() {
			// 微信退出后台，播放按钮不更新
			// this.swiperList.map((itemlist)=>{
            //     itemlist.playStatus = false
			// })
			let platform =  uni.getSystemInfoSync().platform
			if (platform == 'android' || platform == 'ios' || platform == 'devtools') {
               if (uni.getStorageSync('SHOW_TOP') === false) {
				this.guideShow = uni.getStorageSync('SHOW_TOP')
				} else {
				this.guideShow = true
				}
			}else {
				// 电脑端
				this.guideShow = false
			}
		},
		onHide() {
		 this.musicClose()	
		},
		onShareAppMessage(res) {
			if (res.from === 'button') {// 来自页面内分享按钮
				console.log(res.target)
			}
			return {
				title: '推荐一个专业真人配音平台，配音只需成本价。点击收藏',
				desc: '',
				complete: function(res) {
					console.log('分享成功', res)
				},
			}
		},
		onShareTimeline(res) {
			return {
				title: '直接找配音师下单，配音只需成本价',
				desc: '',
				complete: function(res) {
					console.log('分享成功', res)
				},
			}
		},
		methods: {
			 ...mapActions("user", ["login",'getIphoneStatus']),
			 logins() {
                uni.login({
				provider: "",
				success: async (result) => {
					    console.log('走没走登录设置',result) 
						await this.login(result.code);
                        await this.getIphoneStatus();
						this.getHotData()
					},
					fail: (error) => {
					console.log("登录失败", error);
					},
				})
			 },
			handleServiceChat() {
				wx.openCustomerServiceChat({
					extInfo: {url: 'https://work.weixin.qq.com/kfid/kfcade993b61c3ff656'},
					corpId: 'ww901fbb3c6ecf9871',
					success(res) {
					  console.log('接入小程序客服成功')
					},
				    fail(err) {
                      console.log('接小程序客服失败',err)
					  uni.showToast({
							icon: 'none',
							title: '仅支持在手机微信中使用该功能哦'
					  });
					}
				})
			},
			handleSoundlibrary(index,item) {	
			  uni.setStorageSync('worksType', index)
			  if (item) {
				this.$store.commit('user/setworkStatus', item) 
			  }
			  uni.switchTab({ url: '/pages/soundlibrary/soundlibrary' })
			},
			// 首页查看更多跳转
			handleViewMore() {
				uni.switchTab({ url: '/pages/dubbinglibrary/dubbinglibrary' })
			},
			// 请求热门数据
			getHotData() {
				bannerIndex().then((res)=>{
                  console.log('配音师数据',res)
				  this.bannerimgData = res.data
				})
				servicehot(this.getListArg).then((res)=>{
					console.log('配音师数据', res)
					this.hottopicsData = res.data[0]
					this.hotworksData = res.data[1]
					this.hotteacherData = res.data[2]
					this.hotcaseData = res.data[3]
					console.log('案例数据', this.hotcaseData)
				}).catch(err=>{

				})
			},
			transformsex(item) {
				if(item===1) {
					return '男声'
				}else if(item===2) {
					return '女声'
				}else {
					return '企业'
				}	
			},
			hanldeJumpEvents(index) {
				console.log(index)
				uni.navigateTo({
				  url: "/subpkg/pages/webview/webview?src="+this.bannerimgData[index].url+'&&title=新片场创作者助力计划',
				});
			},
			// 点击领取优惠卷
			handleCouponCollection() {
               this.couponsShow = true
			   couponadd().then((res)=>{
				 this.couponsData = res.data
                 console.log('优惠卷数据', res)
			   }).catch((res)=>{
                 console.log('优惠卷错误信息',res)
			   })
			},
			// 关闭优惠卷
			handlecloseCollection() {
              this.securitiesShow = false
			},
			// 优惠卷弹窗
			handlecloseCoupons() {
			   this.couponsShow = false
			},
			// 跳转到发布
			handleJumpPublishing() {
			  uni.navigateTo({
					url: "/subpkg/pages/samplevoices/samplevoices",
			  });
			},
			 // 跳转配音师详情
			handleVisitorsJump(orderItem) {
				uni.setStorageSync("current", orderItem.tags[0].value);
				uni.navigateTo({
					url: "/subpkg/pages/teacherlist/teacherlist?id=" + orderItem.teacher_id,
				});
			},
			// 跳转到音乐音效
			handleJumpmusic(item) {
			   console.log('最近合作',item)
			   if (item.name === '最近合作') {
				  uni.navigateTo({
					url: "/subpkg/pages/myfocus/myfocus",
			      });
			   } else if(item.name === '积分'){
				   uni.navigateTo({
					url: "/subpkg/pages/integral/integral",
			       }); 
			   }else if(item.name === '优惠券'){
                     uni.navigateTo({
						url: "/subpkg/pages/coupons/coupons",
					 }); 
			   }else if(item.name === '找音效'){
                  uni.navigateTo({
					url: "/subpkg/pages/music/music?type=0",
			       });
			   }else if(item.name === '找音乐'){
                  uni.navigateTo({
					url: "/subpkg/pages/music/music?type=1",
			       });
			   }
			},
			playTheMusic(orderItem) {
				console.log('传过来的数据', orderItem)
				this.audioShow = true
				if(this.dataPlay.works.url === orderItem.works.url) {
					console.log('每次都会走这里',orderItem, orderItem.works.playStatus)
					this.hotteacherData.map((item)=>{
						if(this.dataPlay===item){
							orderItem.works.playStatus = !orderItem.works.playStatus
						}else {
							item.playStatus = false
						}
						})
					this.hotworksData.map((item)=>{
						if(this.dataPlay===item){
							orderItem.works.playStatus = !orderItem.works.playStatus
						}else {
							item.playStatus = false
						}
					})
				}else {
					this.hotteacherData.map((item)=>{
					item.works.playStatus = false
					})
					this.hotworksData.map((item)=>{
					item.works.playStatus = false
					})

					orderItem.works.playStatus = true
					this.dataPlay = orderItem
					buriedSomeStatistical(0)
				}
				setTimeout(()=>{
					this.$refs.musicAudio.preStartPlay()
				},0)
			},
			handleChangePlay(status) {
					this.hotteacherData.map((item)=>{
						if(this.dataPlay===item){
							item.works.playStatus = status
						}else {
							item.works.playStatus = false
						}
					})
					this.hotworksData.map((item)=>{
						if(this.dataPlay===item){
							item.works.playStatus = status
						}else {
							item.works.playStatus = false
						}
					})

			},
			musicClose() {
					this.hotteacherData.map((item)=>{
						item.works.playStatus = false
					})
					this.hotworksData.map((item)=>{
						item.works.playStatus = false
					})
					this.audioShow = false	
					this.dataPlay =  {
							works: {
							url: ''
						}
					}
			}
		}
	}
</script>

<style lang="scss">
page {
  height: 100%;
}
.u-title {
	text-align: right;
	// margin-left: 10rpx;
    margin-right: 32rpx;
}
</style>
<style lang="scss" scoped>
.container {
	width: 100%;
	min-height: 100%;
	background: #F2F2F2;
	position: relative;
	.home_musicSrc_box {
		position: fixed;
		bottom: 2.58rpx;
	}
	.banner_box {
		margin-top: 21.739rpx;
		margin-left: 27.174rpx;
		width: 695.652rpx;
		height: 181.159rpx;
		.banner_img {
		  width: 695.652rpx;
		  height: 181.159rpx;	
		}
	}
}
.release_demand_box {
	margin-top: 30.797rpx;
	width: 695.652rpx;
	margin-left: 27.174rpx;
	height: 389.493rpx;
	background: #FFFFFF;
	box-shadow: 0px 0px 36.232rpx 0px rgba(236, 236, 236, 0.5);
	border-radius: 14.493rpx;
	.hotlist_box {
	 margin: 38.043rpx 25.362rpx;
     display: flex;
	 justify-content: space-between;
	 align-items: center; 
    .hotlist {
	//   display: flex;
	//   justify-content: center;
	//   align-items: center; 
	   text-align: center;
	  .hotitem_icon {
		//   margin-bottom: 15.551rpx;
		  width: 86.957rpx;
		  height: 86.957rpx;
	  }
	  .name {
		font-size: 23.551rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
		margin-top: 5rpx;
	  }
	}
  }
}
.release_demand {
  display: flex;
  margin-left: 25.362rpx;
  padding-top: 27.174rpx;
  align-items: center;
  .release_item {
	  width: 311.594rpx;
      height: 159.42rpx;
	  position: relative;
	  padding: 25.174rpx;
	  .release_text {
		  position: relative;
		  font-size: 32.609rpx;
		  font-family: PingFangSC-Semibold, PingFang SC;
		  font-weight: 600;
		  color: #FFFFFF;
		  z-index: 120;
	  }
	  .hottext {
		  display: flex;
		  align-items: center;
		  .hoticon {
			  width: 43.478rpx;
			  height: 43.478rpx;
		  }
		  .hotbtn {
			  
			  font-size: 18.116rpx;
			  font-family: PingFangSC-Semibold, PingFang SC;
			  color: #FFF400;
			  border: 1px solid #FFF400;
			  margin-left: 10.87rpx;
			  border-radius: 6rpx;
			  padding: 0rpx 6.058rpx;
		  }
	  }
	  .instructions {
		  z-index: 120;
		  position: relative;
		  display: flex;
		  justify-content: space-between;
		  .red_icon {
			  width: 56.159rpx;
			  height: 68.841rpx;
		  }
		  .bule_icon {
			  width: 59.783rpx;
			  height: 59.783rpx;
		  }
		  .ins_text {
			width: 200.333rpx;
			margin-top: 4.435rpx;
			font-size: 21.739rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
		  }
		  .ins_textS {
			  margin-top: 5.346rpx;
		  }
	  }
	  .resease_bc {
		  position: absolute;
		  top: 0;
		  left: 0;
		  width: 311.594rpx;
          height: 159.42rpx;
	  }
  }
}
.hottopics_item {
  margin-top: 21.739rpx;	
  margin-left: 27rpx;	
  width: 695.652rpx;
  padding: 23.551rpx;
  background: #FFFFFF;
  border-radius: 14.493rpx;
  .hottitle_box {
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
	  .hot_title {
         font-size: 32.609rpx;
		 font-family: PingFangSC-Medium, PingFang SC;
		 font-weight: 500;
		 color: #000000;
	  }
	  .hot_btn {
		display: flex;
		align-items: center;
		justify-content: center;  
		width: 101.449rpx;
		height: 47.101rpx;
		background: #FFFFFF;
		border-radius: 7.246rpx;
		border: 1.812rpx solid #DCDBDB;
		font-size: 21.739rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #666666;
	  }
  }
  .hotlist_box {
	 margin-top: 10.928rpx;
     display: flex;
	 justify-content: space-between;
	 align-items: center; 
    .hotlist {
	//   display: flex;
	//   justify-content: center;
	//   align-items: center; 
	   text-align: center;
	  .hotitem_icon {
		//   margin-bottom: 15.551rpx;
		  width: 72.464rpx;
		  height: 72.464rpx;
	  }
	  .name {
		font-size: 23.551rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
	  }
	}
  }
  .work_conten {
    // margin-top: 16.304rpx; 
	.works_item {
		   display: flex;
		   align-items: center;
		   width: 695.652rpx;
		   height: 181.159rpx;
		   margin-left: -23.551rpx;
		   background: #FFFFFF;
		   border-bottom: 1px solid #F7F7F7;
		   .play_item {
			 position: relative;  
             width: 123.188rpx;
			 height: 123.188rpx;
			 margin-left: 23.551rpx;
			 .head_portrait_img {
				width: 123.188rpx;
				height: 123.188rpx;
				border-radius: 14.493rpx;
			 }
			 .online {
				position: absolute;
				bottom: 0px;
				right: 0rpx; 
				width: 21.739rpx;
				height: 21.739rpx;
				border-radius: 10.87rpx;
				background: #26DA52;
				z-index: 9;
				border: 1px solid #FFFFFF;
			}
			 .home_play {
				position: absolute;
				top: 50%;
				left: 55%;
                transform: translate(-50%, -50%);
				width: 29.529rpx;
				height:28.986rpx;
				z-index: 9;
			 }
			.head_portrait_meng {
				position: absolute;
				left: 0px;
				top: 0;
				width: 123.188rpx;
				height: 123.188rpx;
				border-radius: 14.493rpx;
				background: rgba(0, 0, 0, 0.2);	
			}
		   }
		   .btn_item {
			   display: flex;
			   align-items: center;
			   .voice_btn {
				  display: flex;
				  align-items: center;
				  justify-content: center; 
                  width: 108.696rpx;
				  height: 50.725rpx;
				  background: #FFFFFF;
				  border-radius: 25.362rpx;
				  border: 1.812rpx solid #FF4F64;
				  font-size: 21.739rpx;
				  font-family: PingFangSC-Medium, PingFang SC;
				  font-weight: 500;
				  color: #FF445A;
			   }
			   .voice_img {
				   margin-left: 9.058rpx;
				   width: 7.246rpx;
				   height: 32.609rpx;
			   }
		   }
		   .works_name_item {
			   margin-left: 16.246rpx;
			   width: 411.957rpx;
			   margin-right: 20rpx;
			   .works_name {
				   font-size: 28.986rpx;
				   font-family: PingFangSC-Medium, PingFang SC;
				   font-weight: 500;
				   color: #000000;
			   }
			   .works_style {
				  margin-top: 8rpx;
				  font-size: 23.551rpx;
				  font-family: PingFangSC-Regular, PingFang SC;
				  font-weight: 400;
				  color: #666666;
			   }
			   .price_item {
				   display: flex;
				   align-items: center;
				   margin-top: 12rpx;
				   .price_text {
					   display: flex;
					   align-items: center;
					   justify-content: center;
					   width: 80.464rpx;
					   height: 32.609rpx;
					   border-radius: 4.623rpx;
					   border: 1.812rpx solid #FF445A;
					   font-size: 21.739rpx;
					   font-family: PingFangSC-Medium, PingFang SC;
					   font-weight: 500;
					   color: #FF445A;
				   }
				   .price_box {
					   display: flex;
					   margin-left: 16.304rpx;
					   font-size: 23.551rpx;
					   font-family: PingFangSC-Medium, PingFang SC;
					   font-weight: 500;
					   color: #FF445A;
				   }
				   .price_line_box {
					   position: relative;
					   margin-left: 16.304rpx;
					   display: flex;
					   align-items: center;
					   justify-content: center;
					   font-size: 23.551rpx;
					   font-family: PingFangSC-Regular, PingFang SC;
					   font-weight: 400;
					   color: #999999;
                       .price_line {
						   position: absolute;
						   left: 0px;
						   width: 100%;
						   height: 1.812rpx;
						   background: #999999;
					   }
				   }
			   }
		   }
	}
	.works_itemborder {
		border-bottom: none;
	}
  }
  .teacher_conten {
	//  margin-top: 16.304rpx; 
	 .voice_item {
			display: flex;
			width: 695.652rpx;
			height: 259.058rpx;
			background: #FFFFFF;
			border-radius: 14.493rpx;
			align-items: center;
			margin-left: -23.551rpx;
			border-bottom: 1px solid #F7F7F7;
			.head_portrait_box {
				position: relative;
				margin-left: 23.551rpx;
				width: 155.797rpx;
				height: 195.652rpx;
				background: rgba(0, 0, 0, 0.2);
				border-radius: 14.493rpx;
				.video_label {
					position: absolute;	
					top: 10.87rpx;
					left: 10.87rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					padding: 0 9.058rpx;
					height: 36.232rpx;
					background: #FF445A;
					border-radius: 7.246rpx;
					opacity: 0.9;
					font-size: 19.928rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
				    z-index: 999;
					color: #FFFFFF;
				}
				.head_portrait_img {
					width: 155.797rpx;
					height: 195.652rpx;
					border-radius: 14.493rpx;
				}
				.online {
					position: absolute;
					bottom: 0px;
					right: 0rpx; 
					width: 21.739rpx;
					height: 21.739rpx;
					border-radius: 10.87rpx;
					background: #26DA52;
					border: 1px solid #FFFFFF;
					z-index: 9;
				}
				.home_play {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%,-50%);
					width: 23.551rpx;
					height:28.986rpx;
					z-index: 9;
				}
				.head_portrait_meng {
					position: absolute;
					left: 0px;
					top: 0;
				    width: 155.797rpx;
					height: 195.652rpx;
					background: rgba(0, 0, 0, 0.2);
					border-radius: 14.493rpx;
					background: rgba(0, 0, 0, 0.1);	
				}
			}
			.voice_introduce {
				margin-left: 16.246rpx;
				// padding-top: 25.362rpx;
				width: 472rpx;
				.voice_name {
					display: flex;
					align-items: center;
					position: relative;
					.rank {
						height: 39.855rpx;
						font-size: 28.986rpx;
						font-family: PingFangSC-Semibold, PingFang SC;
						font-weight: 600;
						color: #000000;
						line-height: 39.855rpx;
					}
					.name {
						// margin-left: 16.304rpx;
						max-width: 250rpx;
						height: 39.855rpx;
						font-size: 28.986rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #000000;
						line-height: 39.855rpx;
					}
					.sex {
						margin-left: 3.623rpx;
						width: 25.362rpx;
						height: 25.362rpx;
					}
					.focus_btn {
						text-align: center;
						position: absolute;
						right: 10rpx;
						width: 101.449rpx;
						height: 45.29rpx;
						background: #FFFFFF;
						border-radius: 32.609rpx;
						border: 1px solid #FF445A;
						font-size: 21.739rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #FF445A;
						line-height: 43.478rpx;
					}
					.nofocus_btn {
					    text-align: center;
						position: absolute;
						right: 10rpx;
						width: 101.449rpx;
						height: 45.29rpx;
						background: #FFFFFF;
						border-radius: 32.609rpx;
						border: 1px solid #CECECE;
						font-size: 21.739rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #999999;
						line-height: 43.478rpx;
					}
				}
				.numberworks {
					height: 32.609rpx;
					margin: 14.493rpx 0;
					font-size: 23.551rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #666666;
					line-height: 32.609rpx;
					.workscount {
						margin-right: 30.797rpx;
					}
				}
				.tagNum {
					display: flex;
					margin-top: 14.493rpx;
					.tag {
                        min-width: 108.696rpx;
						padding: 0 9.058rpx;
						height: 39.855rpx;
						background: rgba(255, 165, 61, 0.12);
						border-radius: 4.623rpx;
						font-size: 21.739rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #FF9C29;
						line-height: 39.855rpx;
						margin-right: 10.87rpx;
					}
				}
				.jianjie {
					margin-top: 14.493rpx;
					width: 461.957rpx;
					height: 32.609rpx;
					font-size: 23.551rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #666666;
					line-height: 32.609rpx;
				}
			}
	 }
	 .works_itemborder {
		border-bottom: none;
	 }
  }
  .anli_conten {
	 margin-top: 10.87rpx;
	 display: flex;
	 justify-content: space-between;
	 flex-wrap: wrap;
    .anliitem {
	  position: relative;	
	  margin-top: 18.116rpx;
      width: 315.217rpx;
	  height: 159.42rpx;
	  .anli_bc {
		position: absolute;
		top: 0;
		left: 0;
        width: 315.217rpx;
	    height: 159.42rpx;
	  }
	  .anli_text {
		  position: relative;
		  width: 183.043rpx;
		  margin-left: 25.362rpx;
		  margin-top: 28.986rpx;
		  .anli_type {
			font-size: 28.986rpx;
			 width: 183.043rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #2B3E5B;
		  }
		  .anli_fubiao {
			  margin-top: 5.435rpx;
			  height: 32.609rpx;
			  width: 183.043rpx;
			  font-size: 23.551rpx;
			  font-family: PingFangSC-Regular, PingFang SC;
			  font-weight: 400;
			  color: #838EA1;
			  line-height: 32.609rpx;
		  }
	  }
    }
  }
}
.logo_item {
	padding: 32.609rpx;
	.logo_box {
		display: flex;
		justify-content: center;
		.logo_icon {
			width: 36.232rpx;
			height: 36.232rpx;
		}
		.logo_name {
			margin-left: 5.623rpx;
			font-size: 28.986rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #000000;
		}
	}
	.logo_sogin {
		width: 100%;
		margin-top: 3.623rpx;
		height: 43.478rpx;
		text-align: center;
		font-size: 25.362rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #999999;
		line-height: 43.478rpx;
	}
}
.soundWaves {
	margin-top: 41.667rpx;
	margin-bottom: 31.667rpx;
	height: 28.986rpx;
	width: 695.652rpx;
	padding: 0rpx 27.174rpx;
}
.home_demand_box {
  margin-top: 30.797rpx;
}
.margintop10 {
	margin-top: 18.116rpx;
}
.bottomOf {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20rpx;
  .bottomOf_text {
	font-size: 25.362rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #746F87;
  }

}
</style>
