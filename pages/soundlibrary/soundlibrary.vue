<template>
	<view class="container">
		<u-navbar
		:is-back="false"
		title="声音库"
		title-size="36.232rpx"
		title-color="#000000"
		:border-bottom="false"
		:background="background"
		back-icon-color="#000000"
	  ></u-navbar>
	  <view class="content">
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
				>
				</u-tabs>
			</view>
		</view>
		<view class="search_box">
			<view class="search_item">
				<image
				    class="search_img"
					src="@/static/img/search.png"
					mode="scaleToFill"
				/>
				<input
				    class="search_input"
					type="text"
					v-model="tagParameter.search"
					:placeholder="placeholderText"
					placeholder-class="input-placeholder"
					confirm-type="search"
					@confirm="handleSearch"
				/>
			</view>
		</view>
		<u-dropdown class="dropdown" ref="subuDropdown" active-color="#FF445A">
			<u-dropdown-item :title="subTitle" height="200">
				<view class="slot-content">
					<scroll-view scroll-y="true" style="height: 860rpx;">
					<view class="listItem" v-for="(item,index) in options1" :key="index" @click="handlecheckItem(item,index)">
						<view class="item_value u-line-1" :class="{ 'checkitem' : subvalue===index }">{{item.value}}</view>
						<view v-if="subvalue===index" class="checkbox_mark"><u-icon name="checkbox-mark"></u-icon></view>
					</view>
					</scroll-view>
				</view>
			</u-dropdown-item>
			<u-dropdown-item v-model="sexvalue" :title="sexTitle" height="200">
				<view class="slot-content">
					<view class="listItem" v-for="(item,index) in options2" :key="index" @click="handlesexcheckItem(item,index)">
						<view class="item_value u-line-1" :class="{ 'checkitem' : sexvalue===index }">{{item.value}}</view>
						<view v-if="sexvalue===index" class="checkbox_mark"><u-icon name="checkbox-mark"></u-icon></view>
					</view>  
				</view>
			</u-dropdown-item>
			<u-dropdown-item v-model="entvalue" :title="entTitle" height="200">
				<view class="slot-content">
					<view class="listItem" v-for="(item,index) in options3" :key="index" @click="handleentcheckItem(item,index)">
						<view class="item_value u-line-1" :class="{ 'checkitem' : entvalue===index }">{{item.value}}</view>
						<view v-if="entvalue===index" class="checkbox_mark"><u-icon name="checkbox-mark"></u-icon></view>
					</view> 
				</view>
			</u-dropdown-item>
		</u-dropdown>
		<scroll-view 
			class="voice_list" 
			scroll-y
			@refresherrefresh="handlerefre"
			:refresher-enabled="true" 
			:scroll-top="scrollInto"
			@scroll="tabScoll"
			@scrolltolower="reachBottom"
			:refresher-triggered="triggered"
			>
			<view v-if="currentStatus==0">
               <view  class="works_item" v-for="(item,index) in dataList" :key="index">
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
					<view class="btn_item">
						<!-- <view class="voice_btn" v-if="order_status==0" @click="handlefirstTimeUseOrder(item)">下单</view> -->
						<!-- <view class="voice_btn" @click="handleUseOrder(item)">下单</view> -->
						<view class="voice_btn" @click="downloadcopySampleVoices(item,'复制样音信息成功')">复制</view> 
						<view class="voice_img_box" @click="handleOperation(item)">
                          <image
						    class="voice_img"
							src="@/static/my/caozuo.png"
							mode="scaleToFill"
						  />
						</view>
					</view>
				</view>
			</view>
			<view v-if="currentStatus==1">
                <view class="voice_item" v-for="(item,index) in dataList" :key="index">
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
			<view v-if="currentStatus==2">
                <view class="video_item" v-for="(item,index) in dataList" :key="index" @click="handlecaseDetails(item)">
					<div class="video_box">
						<div class="video_label">{{item.tags[0].value}}</div>
						<image
						    class="video_cover"
							:src="item.head_img"
							mode="scaleToFill"
						/>
						<div class="video_palybox">
							<div class="video_paly">
								<image
								    class="video_icon"
									src="@/static/anli/anliplay.png"
									mode="scaleToFill"
								/>
								<span class="play_Num">{{item.play_num}}</span>
							</div>
							<div class="broadcasttime">{{item.works[0].time}}</div>
						</div>
					</div>
					<div class="video_desc">
						<div class="video_title u-line-1">{{item.works[0].title}}</div>
						<div class="video_style u-line-1">{{item.title}}</div>
						<div class="video_by" @click.stop="handleVisitorsJump(item)">
							<image
							    class="video_icon"
								:src="item.teacher.avatar"
								mode="scaleToFill"
							/>
							<span class="video_name u-line-1">配音：{{item.teacher.nickname}}</span>
						</div>
					</div>
				</view>
			</view>
			<view v-if="has_next===false" class="defaltext">暂无更多，可点【人工客服】进行匹配</view>
			<u-loadmore v-if="has_next===true" style="margin-top: 30px;" status="loading" bgColor="#f2f2f2"></u-loadmore>
			<view v-if="defaultshow" class="page_box">
				<view class="defaltPage">
					<image
						class="defaltPageimg"
						src="@/static/demand/defaulticon.png"
						mode="scaleToFill"
					/>
					<view class="defaltext">暂无数据，可点【人工客服】进行匹配</view>
				</view>
			</view>
			<view style="height:240px"></view>
		</scroll-view>
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
	  <u-popup v-model="submitShow" mode="bottom" height="1084.348rpx"  border-radius="24">
			<release 
			  ref="submitform"
			  :bottomTitle="true"
              :data="dataObj"
			  :subTitle="false"
			  :srstatus="true"
              :btnText="btnText"
			  @submitShow="getsubmitShow"
			  >
			</release>
	  </u-popup>
	  <u-popup v-model="collectShow" mode="bottom" border-radius="24">
		  <view class="collect_item" @click="handleUseOrder(operationItem)">
			  <image
			      class="collection"
				  src="@/static/teacherlist/copyicon.png"
				  mode="scaleToFill"
			  />
			  <view class="collect_text">按样下单</view>
		  </view>
		  <view class="collect_item" @click="handleCollectStatus">
			  <image
			      class="collection"
				  :src="operationItem.work_type===0 ? shouchang : yishouchang"
				  mode="scaleToFill"
			  />
			  <view :class="operationItem.work_type===0 ? 'collect_text' : 'redcollect_text'">{{operationItem.work_type===0 ? '收藏' : '已收藏'}}</view>
		  </view>
		  <view class="collect_item" @click="downloadcopy(operationItem.works.url,'下载链接已复制，请粘贴到浏览器打开')">
			  <image
			      class="collection"
				  src="@/static/teacherlist/download.png"
				  mode="scaleToFill"
			  />
			  <view class="collect_text">下载</view>
		  </view>
		   <view class="collect_item">
			  <image
			      class="collection"
				  :src="operationItem.share_type===0 ? shouchang : yishouchang"
				  mode="scaleToFill"
			  />
			  <view class="cloudsharebox">
				<view class="collect_text" @click="operationItem.share_type===0 ? handlejoincloudAdd(operationItem) :  handlejoincloud(operationItem)">{{operationItem.share_type===0 ? '加入云分享' : '移除云分享'}}</view>
                <view class="cloud_btn" @click="handleCloudShare(operationItem)">
					<span class="collect_text1">进入</span>
					<image
					    class="rightarr_icon"
						src="@/static/coupons/rightarr.png"
						mode="scaleToFill"
					/>
				</view>
			  </view>
		  </view>
		  <view class="collect_item_btn" @click="hanldeCancelcoll">取消</view>
	  </u-popup>
	  <dropball  title="极速试音">
	  </dropball>
	  <view v-if="orderPromptShow" class="masklayer">
		  <view class="coupons_box">
			<image
				class="shutdown_icon"
				src="../../static/coupons/shutdownC.png"
				mode="scaleToFill"
				@click="handlecloseCoupons"
			/>
			<image
				class="coupons_icon"
				src="@/static/img/orderpro.png"
				mode="scaleToFill"
			/>
			<view class="coupons_content">
				<view class="content_text">
					<view class="text">1、更快速：交付<text class="red_text">速度翻倍</text></view>
					<view class="text">2、更便捷：告别<text class="red_text">频繁沟通</text></view>
					<view class="text">3、更省钱：成本价上<text class="red_text">再9折</text></view>
					<view class="text">4、质量保障：<text class="red_text">所听即所得</text></view>
					<view class="text">5、售后无忧：<text class="red_text">一对一</text>修改补录</view>
				</view>
				<view class="know_btn" @click="handlejupumUseOrder">我知道了</view>
			</view>
		</view>
	  </view>	  
	</view>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { servicetag, servicsecList, collection } from "@/api/voice.js"
import { teacherdetail, shareAdd,shareDel } from "@/api/index.js";
import play from '@/static/teacherlist/paly2.png'
import dropball from '@/components/dropball/dropball.vue'
import musicAudio from '@/components/audio/audioplay.vue'
import playActive from '@/static/teacherlist/palyActive2.png'
import shouchang from '@/static/img/shouchang.png'
import yishouchang from '@/static/img/yishouchang.png'
// 复制
import uniCopy from '@/utils/uni-copy.js'
// 埋点统计
import { buriedSomeStatistical,statisticalnum } from '@/utils/encapsulation.js'
	export default {
		components: {
			dropball,
			musicAudio
		},
		data() {
			return {
			 background: {
					backgroundColor: "#FFFFFF",
			 },
			 barStyle: {
				backgroundColor: '#FF445A',
			 },
			 orderPromptShow: false,
			  current: 0,
			  play: play,
			  playActive: playActive,
			  list: [
				{
                  name: '找样音',
				  id: 0
				},
				{
				  name: '找配音师',
				  id: 2
				},
				{
				  name: '找案例',
				  id: 3
				}
			  ],
			  tagParameter: {
				  page: 1,
				  size: 10,
				  tag_data: {
					  2: []
				  },
				  status: 0,
				  price: 0,
				  sex: 0,
				  cate: 0,
				  search: '',
				  search_type: 0,
				  grade: 9999
			  },
			  objData: {},
			  subTitle: '题材',
			  sexTitle: '性别',
			  entTitle: '价格',
			  play: play,
			  playActive: playActive,
			  shouchang:shouchang,
			  yishouchang:yishouchang,
			  worksplay: 'https://www.peiyinstreet.com/guidang/play.png',
			  worksplayActive: "https://www.peiyinstreet.com/guidang/palyActive.png",
			  options1: [],
			  options2: [],
			  options3: [],
			  scrollInto: 0,
			  scrollTop: 0,
			  // 分类类型
			  cate: 1,
			  dataList: [],
			  dataPlay: {
				works: {url: ''}
			  },
			  submitShow: false,
			  // 收藏的作品  
			  collectShow: false,
			  // 操作item
			  currentStatus: 0,
			  operationItem: {},
			  audioShow: false,
			  has_next:'',
			  dataObj: {
				teacher_id: '',
				service_id: '',
				status: 1,
				filename: '',
				content_url_escape: '',
				work_id: '',
				avatar: '',
				nickname: '',
				offer_price: '',
				subjecttype: ''
			  },
			  firstItem: {},
			  triggered: false,
			  _freshing: false,
			  btnText: '按样音效果试音',
			  placeholderText: '搜索样音关键词',
			  defaultshow: false
			}
		},
		onShareAppMessage(res) {
			if (res.from === 'button') {// 来自页面内分享按钮
				console.log(res.target)
			}
			return {
				title: '5000+样音在线试听，报价比市场价低一半。点击收藏',
				desc: '',
				complete: function(res) {
					console.log('分享成功', res)
				},
			}
		},
		onShareTimeline(res) {
			return {
				title: '5000+样音在线试听，报价比市场价低一半',
				desc: '',
				complete: function(res) {
					console.log('分享成功', res)
				},
			}
		},
		computed: {
		  ...mapState("user", ["token", "userInfo","workStatus","order_status"]),
		},
		onLoad(options) {
			this.current = 0
			this.getUnionid()
		},
		onShow() {
		  if (uni.getStorageSync('worksType')==1) {
			this.current = parseInt(uni.getStorageSync('worksType'))
			this.getUnionid()
		  }
		  if (uni.getStorageSync('worksType')==3) {
			this.current = 2
			this.getUnionid()
		  }
		  else if(uni.getStorageSync('worksType')==2){  
            this.current = 0
			this.getUnionid()
		  } else {
			 this.current = this.current 
			 this.getUnionid()
		  }
		  if (JSON.stringify(this.workStatus) !=='{}') {
			  this.tagParameter.tag_data[2] = this.workStatus.tag_id
			  if (this.workStatus.name == '影视动画配音') {
				  this.subTitle = '动漫配音'
			  } else {
				this.subTitle = this.workStatus.name 
			  }
			  this.getUnionid()
			//   this.$store.commit('user/setworkStatus', {}) 
		  }else {
			//   this.subTitle = "题材"
			//   this.tagParameter.tag_data[2] = ''
		  }
		},
		onHide() {
		 this.musicClose()
		 uni.setStorageSync('worksType', '')
		},
		methods: {
		  ...mapActions("user", ["login", "getIphoneStatus"]),
		  getUnionid() {
			uni.login({
				provider: "weixin",
				success: async (result) => {
				await this.login(result.code);
				await this.getIphoneStatus();
				this.handleServicetag()
				this.tagParameter.status = this.current
				this.getVoicelist()
				},
				fail: (error) => {
					console.log("登录失败", error);
					this.handleServicetag()
					this.tagParameter.status = this.current
					this.getVoicelist()
				},
			});
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
		  // 触发下拉刷新
		  handlerefre() {
			this.triggered = true;
			this._freshing = true;
			this.getVoicelist()
		  },
		  change(tabs) {
			this.current = tabs
			this.tagParameter = {
				  page: 1,
				  size: 10,
				  tag_data: {
					  2: []
				  },
				  status: 0,
				  price: 0,
				  sex: 0,
				  cate: 0,
				  search: '',
				  search_type: 1,
				  grade: 9999
			  },
			this.subTitle = "题材"
			this.sexTitle = "性别"
			this.tagParameter.tag_data[2] = ''
			this.tagParameter.status = this.current
			this.getVoicelist()
			this.handleServicetag()
		  },
		  handleServicetag() {
				servicetag({cate:this.cate}).then((res)=>{
				  this.options1 = res.data.tag_data
                  this.options2 = res.data.sex
				  console.log('等级数据', res)
				  if (this.current == 2) {
					  this.entTitle = '个企'
					  this.options3 = res.data.cate
				  } else if(this.current == 1) {
                      this.entTitle = '等级'
					  this.options3 = res.data.grade
				  } else {
					  this.entTitle = '价格'
					  this.options3 = res.data.price
				  }
				  this.userStatus = res.data.status
				  this.navTitle = res.data.catename
				})
		  },
		  // 请求列表数据
		  async getVoicelist() {
				this.tagParameter.page = 1
				if (this.current===0) {
					this.placeholderText = "搜索样音关键词"
				} else if(this.current===1) {
					this.placeholderText = "搜索配音师昵称"
				}else {
					this.placeholderText = "搜索案例关键词"
				}
				const res = await servicsecList(this.tagParameter)
				this.$store.commit('user/setworkStatus', {}) 
				console.log('res新数据',res)
				this.triggered = false;
				this._freshing = false;
				this.dataList = res.data
				this.scrollInto = this.scrollTop
				this.currentStatus = this.current
				if (this.dataList.length===0) {
					this.has_next = ''
					this.defaultshow = true
				} else {
					this.has_next = res.has_next
					this.defaultshow = false
				}
				setTimeout(()=>{
					this.scrollInto = 0
				},0)
		   },
		   // 进入云分享页面  
		   handleCloudShare(item) {
             console.log('进入云分享',item)
			  uni.navigateTo({
				url:
				"/subpkg/pages/voicesshare/voicesshare"
			  });
			  this.collectShow = false
		   },
		   // 加入云分享
		   handlejoincloudAdd(item) {
			 console.log('加入云分享',item)
			 shareAdd({work_id: item.works.id}).then((res)=>{
				console.log()
				if (this.operationItem.share_type ===1) {
					this.operationItem.share_type = 0
					uni.showToast({
						title: '移除成功',
						icon: 'none'
				    })
				} else {
					this.operationItem.share_type = 1
				}
			 })
		   },
		    // 移除云分享
		   handlejoincloud(item) {
			 console.log('移除云分享',item)
			 let _this = this
			 shareDel({work_id: item.works.id}).then((res)=>{
				console.log()
				if (this.operationItem.share_type ===1) {
					this.operationItem.share_type = 0
					uni.showToast({
						title: '移除成功',
						icon: 'none'
				    })
				} else {
					this.operationItem.share_type = 1
				}
			 })
		   },
		   //  提示弹窗打开
		   handlefirstTimeUseOrder(item) {
              this.firstItem = item
			  this.orderPromptShow = true
			  // 下单button埋点统计  
			  buriedSomeStatistical(3)
			  // 弹窗展示埋点统计次数
			  buriedSomeStatistical(4)
		   },
		   handlejupumUseOrder() {
			//    this.handleUseOrder(this.firstItem)
			   let item = this.firstItem
			   console.log('下单的数据',item)
			   if (item.admin_price) {
				this.dataObj.service_id = item.service_id
				this.dataObj.teacher_id = item.teacher_id
				this.dataObj.filename = item.works.title
				this.dataObj.content_url_escape = item.url
				this.dataObj.work_id = item.works.id
				this.dataObj.avatar = item.teacher.avatar
				this.dataObj.nickname = item.teacher.nickname
				this.dataObj.offer_price = item.offer_price
				this.dataObj.subjecttype = item.tags[0].value
				// this.submitShow = true
				this.btnText="按样音效果试音"
				uni.setStorageSync('dataObj',this.dataObj)
				uni.navigateTo({ url: '/subpkg/pages/voicesrelease/voicesrelease' })
				// this.$nextTick(() => { 
				// 	this.$refs.submitform.handlertextarea()
				// });
			} else {
				uni.showToast({
					title: '该服务暂不支持在线试音，请联系客服',
					icon: 'none'
				})
			}
			this.orderPromptShow = false
				// 点击我知道了埋点统计
				buriedSomeStatistical(5)
		   },
		    // 提示弹窗关闭
			handlecloseCoupons() {
			   this.orderPromptShow = false
		   },
		   // 使用样音下单
		   handleUseOrder(item) {
			console.log('使用样音下单,用户下单状态',item,this.order_status)
			// 统计在线下单埋点信息
			buriedSomeStatistical(3)
			if (item.admin_price) {
				this.dataObj.service_id = item.service_id
				this.dataObj.teacher_id = item.teacher_id
				this.dataObj.filename = item.works.title
				this.dataObj.content_url_escape = item.url
				this.dataObj.work_id = item.works.id
				this.dataObj.avatar = item.teacher.avatar
				this.dataObj.nickname = item.teacher.nickname
				this.dataObj.offer_price = item.offer_price
				this.dataObj.subjecttype = item.tags[0].value
				// this.submitShow = true
				this.btnText="按样音效果试音"
				uni.setStorageSync('dataObj',this.dataObj)
				uni.navigateTo({ url: '/subpkg/pages/voicesrelease/voicesrelease' })
				// this.$nextTick(() => { 
				// 	this.$refs.submitform.handlertextarea()
				// });
			} else {
				uni.showToast({
					title: '该服务暂不支持在线试音，请联系客服',
					icon: 'none'
				})
			}
		  },
		  // 跳转案例详情
		  handlecaseDetails(item) {
            uni.navigateTo({ url: '/subpkg/pages/caseDetails/caseDetails?id='+item.id})
		  },
		  // 操作事件
		  handleOperation(item) {
			this.operationItem = item
            this.collectShow = true
		  },  
		  //  取消操作事件
		  hanldeCancelcoll() {
			this.collectShow = false
		  },
		  // 收藏   
		  handleCollectStatus() {
			var coData = {
				work_id: this.operationItem.works.id,
				type:this.operationItem.work_type
			}  
            collection(coData).then((res)=>{
              console.log(res)
			  if (this.operationItem.work_type ===1) {
				  this.operationItem.work_type = 0
			  } else {
				  this.operationItem.work_type = 1
			  }
			}).catch((err)=>{
			})
		  },
		  // 关闭需求弹窗
		  getsubmitShow() {
			this.submitShow = false
		  },
		  async reachBottom() {
				if (this.has_next) {
					this.tagParameter.page = this.tagParameter.page+1
					const res = await servicsecList(this.tagParameter)
					console.log('res新数据',res)
					this.triggered = false
					this.has_next = res.has_next
					res.data.map((item)=>{
						this.dataList.push(item)
					})
					if (this.dataList.length===0) {
						this.defaultshow = true
						this.has_next = ''
					} else {
						this.defaultshow = false
					}
				}else {
				}
			}, 
		  tabScoll(e) {
			  this.scrollTop = e.detail.scrollTop;
		  },
          //  筛选
		  handlecheckItem(item,index) {
			//    this.current = index
			   this.subvalue = index
			   this.subTitle = item.value
			   this.tagParameter.tag_data[2] = item.id
			   this.getVoicelist()
			   this.$refs.subuDropdown.close();
		  },
		  //  筛选
		  handlesexcheckItem(item,index) {
			  console.log('性别数据',item,index)
			  this.sexvalue = index
              this.sexTitle = item.value
			  this.tagParameter.sex = item.id
			  this.getVoicelist()
			  this.$refs.subuDropdown.close();
		  },
		  //  筛选
		  handleentcheckItem(item,index) {
              console.log('价格数据',item,index)
			  this.entvalue = index
              this.entTitle = item.value
			  if (this.current==2) {
				this.tagParameter.cate = item.id 
			  } else if(this.current==1) {
				  this.tagParameter.grade = item.id
			  }else { 
				this.tagParameter.price = item.id
			  }
			  this.getVoicelist()
			  this.$refs.subuDropdown.close();
		  },
		  // 跳转配音师名片
		  handleVisitorsJump(orderItem) {
			uni.setStorageSync("current", orderItem.tags[0].value);
			uni.navigateTo({
				url: "/subpkg/pages/teacherlist/teacherlist?id=" + orderItem.teacher_id,
			});
		  },
		  handleSearch(event){
			 console.log('dengyuduoshao',event) 
			 this.getVoicelist()
            //  this.inputValue = event.target.value
		  },
		  replaceInput: function(event) {
				var value = event.target.value;
				if (value === '11') {
					this.changeValue = '2';
				}
			},
			hideKeyboard: function(event) {
				if (event.target.value === '123') {
					uni.hideKeyboard();
			}
		  },
		  playTheMusic(orderItem) {
				console.log('传过来的数据', orderItem)
				this.audioShow = true
				if(this.dataPlay.works.url === orderItem.works.url) {
				this.dataList.map((item)=>{
					if(this.dataPlay===item){
						orderItem.works.playStatus = !orderItem.works.playStatus
					}else {
						item.playStatus = false
					}
					})
				}else {
					this.dataList.map((item)=>{
					item.works.playStatus = false
					})

					orderItem.works.playStatus = true
					this.dataPlay = orderItem
					buriedSomeStatistical(1)
				}
				setTimeout(()=>{
					this.$refs.musicAudio.preStartPlay()
				},0)
		  },
		  handleChangePlay(status) {
				this.dataList.map((item)=>{
					if(this.dataPlay===item){
						item.works.playStatus = status
					}else {
						item.works.playStatus = false
					}
				})

		  },
		  musicClose() {
				this.dataList.map((item)=>{
					item.works.playStatus = false
				})
				this.audioShow = false	
				this.dataPlay =  {
						works: {
						url: ''
					 }
				}
		  },
		  // 复制作品链接
		  downloadcopy(groupNum,title) {
			uniCopy({
				content:groupNum,
				success:(res)=>{
					uni.showToast({
						title: title,
						icon: 'none'
					})
				},
				error:(e)=>{
				}
			})
			buriedSomeStatistical(1)
		   },
		  // 复制样音信息链接
		  async downloadcopySampleVoices(item,title) {
            let res =  await teacherdetail({teacher_id: item.teacher_id})
			console.log('配音师主页链接',res)
			let groupNum = '样音信息：'+ item.teacher.nickname + '('+ item.teacher.grade_text+')'+
			 '+' + item.title+ 
			 '+' + item.offer_price+
			 '+下载链接 ' + item.works.url
			console.log(item,groupNum)
			uniCopy({
				content:groupNum,
				success:(res)=>{
					uni.showToast({
						title: title,
						icon: 'none'
					})
				},
				error:(e)=>{
				}
			})
		   },
		}
	}
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
	border-radius: 57.971rpx 0px 0px 57.971rpx;
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
  background: #F2F2F2;
}
.dropdown {
	background: #FFFFFF;
}
.u-dropdown {
  background: #FFFFFF;
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
.container {
	position: relative;
	.home_musicSrc_box {
		position: fixed;
		bottom: 20rpx;
		z-index: 9999;
	}
}
.content {
	height: 100%;
	display: flex;
	flex-direction: column;
	.u-tabs-box {
		border-top-width: 1px;
		border-top-style: solid;
		border-top-color: #F7F7F7;
	}
	.search_box {
	  padding-top: 18.551rpx;	
	  width: 100%;	
	  background: #FFFFFF;
	  .search_item {
		display: flex;  
		align-items: center;
		margin-left: 36.232rpx;
        width: 677.536rpx;
		height: 68.841rpx;
		background: #F2F2F2;
		border-radius: 39.855rpx;
		.search_img {
			width: 32.609rpx;
			height: 32.609rpx;
			margin-left: 32.609rpx;
			margin-right: 18.116rpx;
		}
		.search_input {
		  width: 580rpx;	
		  height: 68.841rpx;
		}
	  }
	}
    .voice_list {
		height: 100%;
		.works_item {
		   display: flex;
		   align-items: center;
		   width: 695.652rpx;
		   height: 181.159rpx;
		   background: #FFFFFF;
		   border-radius: 14.493rpx;
		   margin-top: 25.362rpx;
		   margin-left: 27.174rpx;
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
			 .home_play {
				position: absolute;
				top: 50%;
				left: 55%;
				transform: translate(-50%,-50%);
				width: 29.529rpx;
				height:28.986rpx;
				z-index: 9;
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
			   margin-top: 70rpx;
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
			   .voice_img_box{
				  width: 66.232rpx;
				  height: 100%;
				  display: flex;
				  justify-content: center;
				  align-items: center;
                 .voice_img {
				   margin-left: 9.058rpx;
				   width: 7.246rpx;
				   height: 32.609rpx;
			     }
			   }
		   }
		   .works_name_item {
			   margin-left: 16.246rpx;
			   width: 331.957rpx;
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
		.voice_item {
			display: flex;
			width: 695.652rpx;
			height: 231.884rpx;
			background: #FFFFFF;
			border-radius: 14.493rpx;
			margin-top: 25.362rpx;
			margin-left: 27.174rpx;
			.head_portrait_box {
				position: relative;
				border-radius: 14.493rpx;
				width: 177.536rpx;
				height: 231.884rpx;
				background: rgba(0, 0, 0, 0.2);
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
				    border-radius: 14.493rpx;
					width: 177.536rpx;
					height: 231.884rpx;
				}
				.home_play {
					position: absolute;
					top: 101.449rpx;
					left: 76.992rpx;
					width: 23.551rpx;
					height:28.986rpx;
					z-index: 9;
				}
				.online {
					position: absolute;
					bottom: 0px;
					right: 0rpx; 
					width: 21.739rpx;
					height: 21.739rpx;
					border-radius: 10.87rpx;
					z-index: 9;
					background: #26DA52;
					border: 1px solid #FFFFFF;
				}
				.head_portrait_meng {
					position: absolute;
					left: 0px;
					top: 0;
					border-radius: 14.493rpx;
					width: 177.536rpx;
					height: 231.884rpx;
					background: rgba(0, 0, 0, 0.1);	
				}
			}
			.voice_introduce {
				margin-left: 16.246rpx;
				padding-top: 25.362rpx;
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
					.grade_btn {
						text-align: center;
						position: absolute;
						right: 10rpx;
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
		.defaltPage {
			text-align: center;
			.defaltPageimg {
				margin-top: 110.507rpx;
				width: 403.986rpx;
				height: 331.522rpx;
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
		}
	}
}
.slot-content {
	background: #FFFFFF;
	max-height: 860rpx;
    background: #FFFFFF;
    overflow-y: auto;
	.listItem {
		height: 90.58rpx;
		border-top: 1.812rpx solid #F1F3F6;
		align-items: center;
		display: flex;
		.item_value {
			padding-left: 36.232rpx;
			width: 80%;
			font-size: 27.174rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #636468;
		}
		.checkitem {
			padding-left: 36.232rpx;
			width: 80%;
			font-size: 27.174rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #1274FF;
		}
		.checkbox_mark {
          width: 20%;
		  text-align: right;
		  padding-right: 36.232rpx;
		  color: #1274FF;
		}
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
	.cloudsharebox {
		display: flex;
		align-items: center;
		width: 650rpx;
		justify-content: space-between;
        .collect_text {
            margin-left: 14.493rpx;
			font-size: 16px;
			width: 50%;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #000000;
		}
		.cloud_btn {
			display: flex;
			justify-content: flex-end;
		    align-items: center;
			width: 50%;
			.collect_text1 {
				margin-left: 14.493rpx;
				font-size: 16px;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #000000;
			}
			.rightarr_icon {
				width: 19.928rpx;
				height: 21.739rpx;
				margin: 0 13.551rpx;
		  }
		}
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
// 案例item
.video_item {
    display: flex;
	width: 695.652rpx;
	height: 195.652rpx;
	background: #FFFFFF;
	border-radius: 14.493rpx;
	margin-top: 25.362rpx;
	margin-left: 27.174rpx;
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
				font-size: 13px;
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
	  width: 375rpx;
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
		//   margin-top: 30.42rpx;
		  display: flex;
		  align-items: center;
		  position: absolute;
          bottom: 18.116rpx;
		  .video_icon {
			  width: 36.232rpx;
			  height: 36.232rpx;
			  border-radius: 18.116rpx;
		  }
		  .video_name {
			margin-left: 9.058rpx; 
			width: 269rpx;
			font-size: 23.551rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #666666;
		  }
	  }
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
    position: relative;
    margin-top: 50%;
    margin-left: 67.029rpx;
    position: relative;
    transform: calc(0%, -50%);
    width: 597.826rpx;
    height: 760.87rpx;
    .shutdown_icon {
      position: absolute;
      right: 0;
      top: -65.899rpx;
      width: 38.043rpx;
      height: 38.043rpx;
    }
    .coupons_icon {
      width: 597.826rpx;
      height: 760.87rpx;
    }
    .coupons_content {
      position: absolute;
      top: 180rpx;
      width: 100%;
      left: 0px;
      .content_text {
		  padding: 0px 101.449rpx;
		  font-size: 28.986rpx;
		  font-family: PingFangSC-Regular, PingFang SC;
		  font-weight: 400;
		  color: #666666;
		  .text {
			  margin-top: 36.232rpx;
		  }
		  .red_text {
			  color: #FF445A;
			  font-weight: 500;
		  }
	  }
	  .know_btn {
		  display: inline-block;
		  text-align: center;
		  margin-top: 59.783rpx;
		  margin-left: 148.551rpx;
		  width: 300.725rpx;
		  height: 86.957rpx;
		  line-height: 86.957rpx;
		  font-size: 28.986rpx;
	      font-family: PingFangSC-Medium, PingFang SC;
		  font-weight: 500;
		  color: #FFFFFF;
		  background: #FF445A;
		  border-radius: 43.478rpx;
	  }
    }
  }
}
</style>
