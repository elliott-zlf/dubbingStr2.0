<template>
  <view class="container">
    <u-navbar
      :is-back="true"
      title="我的配音师"
      title-size="36.232rpx"
      title-color="#000000"
      :border-bottom="true"
    ></u-navbar>
    <view class="jisuangaodu">
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
          font-size="28.362"
        ></u-tabs>
      </view>
      <scroll-view
        class="scroll_view"
        :scroll-top="scrollInto"
        @scroll="tabScoll"
        @scrolltolower="reachBottom"
        scroll-y
      >
      <view v-if="defaultshow">
        <view class="voice_item" v-for="(item, index) in readList" :key="index">
          <view class="head_portrait_box" @click="playTheMusic(item)">
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
          </view>
          <view class="voice_introduce"  @click="handleVisitorsJump(item)">
            <view class="voice_name">
              <view class="rank" v-if="index < 9">{{ "0" + (index + 1) }}</view>
              <view class="rank" v-else>{{ index + 1 }}</view>
              <view class="name u-line-1">{{
                item.teacher.nickname
              }}</view>
              <image
                v-if="item.teacher.sex === 1"
                class="sex"
                src="@/static/teacherlist/manicon.png"
                mode="scaleToFill"
              />
              <image
                v-else-if="item.teacher.sex === 2"
                class="sex"
                src="@/static/teacherlist/woman.png"
                mode="scaleToFill"
              />
              <image
                v-else-if="item.teacher.sex === 3"
                class="sex"
                src="@/static/teacherlist/qi.png"
                mode="scaleToFill"
              />
              <!-- <view
                class="focus_btn"
                >下单</view
              > -->
              <!-- <view
                v-if="item.type === 1"
                class="nofocus_btn"
                @click="handleFocus(item, 1)"
                >已关注</view
              > -->
            </view>
            <view>
              <view class="numberworks">
                <text class="workscount"
                  >作品数{{ item.teacher.work_count }}</text
                >
                <text class="playcount"
                  >播放量{{ item.teacher.browse_count }}</text
                >
              </view>
              <view class="jianjie u-line-1">
                {{ item.teacher.intro }}
              </view>
              <view class="tagNum">
                <view
                  v-for="(tagitem, tagindex) in item.teacher.tags"
                  :key="tagindex"
                >
                  <view v-if="tagitem.type_id === 5" class="tag">
                    {{ tagitem.value }}
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
        <view v-if="has_next===false" class="defaltext">没有更多了</view>
        <u-loadmore
          v-if="has_next === true"
          status="loading"
          bgColor="#FFFFFF"
        ></u-loadmore>
      </view>
      <view v-if="!defaultshow" class="page-box">
					<view class="defaltPage">
						<image
							class="defaltPageimg"
							src="@/static/demand/defaulticon.png"
							mode="scaleToFill"
						/>
						<!-- <view class="defaltext">你还没有订单</view> -->
					</view>
				</view>
        <view style="height: 90px"></view>
      </scroll-view>
    </view>
	<!-- <view class="findOut_box">
		<view class="findOut_btn" @click="handleDubbinglLibrary">去发现</view>
	</view> -->
	<view v-if="audioShow" class="home_musicSrc_box disappear">
        <musicAudio 
          ref="musicAudio"
          :url="dataPlay.works.url"
          :autoplay="true"
          :portrait="dataPlay.avatar"
          :music_title="dataPlay.works.title"
          @handleChangePlay="handleChangePlay"  
          @musicClose="musicClose"
		  ></musicAudio>
	  </view>
  </view>
</template>

<script>
import accesslist from "@/components/accesslist/accesslist.vue";
import { profileteacherlist } from "@/api/personal.js";
import musicAudio from '@/components/audio/audioplay.vue';
import playActive from '@/static/teacherlist/palyActive2.png'
import play from '@/static/teacherlist/paly2.png'
export default {
  components: { accesslist,musicAudio },
  data() {
    return {
      clickContent: "0",
      readList: [],
      attentionList: [],
      has_next: true,
	  play: play,
	  playActive: playActive,
      pageData: {
        status: 0,
        page: 1,
        size: 10,
      },
      list: [
        {
          name: "我关注的",
          id: 0,
        },
        {
          name: "下过单的",
          id: 1,
        },
      ],
	  dataPlay: {
		works: {url: ''}
	  },
      scrollInto: 0,
	  current: 0,
	  audioShow: false,
    defaultshow: true
    };
  },
  onLoad(options) {
    uni.hideShareMenu();
    this.handlegainCardData(this.pageData);
  },
  onHide() {
	this.musicClose()	
  },
  methods: {
	change(index) {
	  this.current = index
	  this.pageData = {
        status: this.current,
        page: 1,
        size: 10,
      },
	  this.handlegainCardData(this.pageData)
	},  
    async handlegainCardData(item) {
      var res = await profileteacherlist(item);
      console.log("我的关注数据", res);
      this.readList = res.data;
      if (this.readList.length < res.count) {
        this.has_next = true;
      } else {
        this.has_next = false;
      }
      if(this.readList.length===0){
					this.defaultshow = false
				}else {
					this.defaultshow = true	
			}
      this.scrollInto = this.scrollTop;
      setTimeout(() => {
        this.scrollInto = 0;
      }, 0);
    },
	// 跳转到配音师详情
	handleVisitorsJump(orderItem) {
		uni.navigateTo({ url: '/subpkg/pages/teacherlist/teacherlist?id='+orderItem.teacher_id })
	},
	// 跳转到配音师库
	handleDubbinglLibrary() {
		uni.switchTab({ url: '/pages/dubbinglibrary/dubbinglibrary' })
	},
    async reachBottom() {
      if (this.has_next) {
        var pages = this.pageData.page + 1;
        this.pageData = {
          page: pages,
          size: 10,
          status: this.current,
        };
        // const res = await getDemandList({
        // 	state: this.list[idx].id
        // })
        const res = await profileteacherlist(this.pageData);
        if (this.readList.length < res.count) {
          this.has_next = true;
        } else {
          this.has_next = false;
        }
        res.data.map((item) => {
          this.readList.push(item);
        });
      } else {
      }
    },
    tabScoll(e) {
      this.scrollTop = e.detail.scrollTop;
    },
	playTheMusic(orderItem) {
				console.log('传过来的数据', orderItem)
				this.audioShow = true
				if(this.dataPlay.works.url === orderItem.teacher.works.url) {
				   this.readList.map((item)=>{
					if(this.dataPlay===item){
						orderItem.teacher.works.playStatus = !orderItem.teacher.works.playStatus
					}else {
						item.playStatus = false
					}
				   })
				}else {
					this.readList.map((item)=>{
					item.teacher.works.playStatus = false
					})

					orderItem.teacher.works.playStatus = true
					this.dataPlay = orderItem.teacher
				}
				setTimeout(()=>{
					this.$refs.musicAudio.preStartPlay()
				},0)
			},
			handleChangePlay(status) {
				this.readList.map((item)=>{
					if(this.dataPlay===item){
						item.teacher.works.playStatus = status
					}else {
						item.teacher.works.playStatus = false
					}
				})

			},
			musicClose() {
				this.readList.map((item)=>{
					item.teacher.works.playStatus = false
				})
				this.audioShow = false	
				this.dataPlay =  {
						works: {
						url: ''
					 }
				}
			},
  },
};
</script>

<style lang="scss">
page {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
<style lang="scss" scoped>
.container {
  background: #F2F2F2;
  display: flex;
  height: 100%;
  flex-direction: column;
  .home_musicSrc_box {
	position: fixed;
	bottom: 100rpx;
	z-index: 9999;
  }
  .findOut_box {
	  position: fixed;
	  width: 100%;
	  bottom: 60rpx;
	  z-index: 999;
	  display: flex;
	  justify-content: center;
	  .findOut_btn {
		  display: flex;
	      justify-content: center;
		  align-items: center;
		  width: 579.71rpx;
		  height: 90.58rpx;
		  background: #FF445A;
		  border-radius: 50.725rpx;
		  font-size: 18px;
		  font-family: PingFangSC-Medium, PingFang SC;
		  font-weight: 500;
		  color: #FFFFFF;
	  }
  }
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
.visit_box {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.dataCard_box {
  background: #ffffff;
  z-index: 99;
  padding: 41.667rpx 27.174rpx 27.174rpx 27.174rpx;
}
.jisuangaodu {
  flex: 1;
  height: 100%;
  overflow-y: hidden;
  .scroll_view {
    height: 100%;
    .voice_item {
      display: flex;
      width: 695.652rpx;
      height: 231.884rpx;
      background: #ffffff;
      border-radius: 14.493rpx;
      margin-top: 25.362rpx;
      margin-left: 27.174rpx;
      .head_portrait_box {
        position: relative;
        border-radius: 14.493rpx;
        width: 177.536rpx;
        height: 231.884rpx;
        background: rgba(0, 0, 0, 0.2);
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
          height: 28.986rpx;
          z-index: 9;
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
            margin-left: 16.304rpx;
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
            background: #ffffff;
            border-radius: 32.609rpx;
            border: 1px solid #ff445a;
            font-size: 21.739rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #ff445a;
            line-height: 43.478rpx;
          }
          .nofocus_btn {
            text-align: center;
            position: absolute;
            right: 10rpx;
            width: 101.449rpx;
            height: 45.29rpx;
            background: #ffffff;
            border-radius: 32.609rpx;
            border: 1px solid #cecece;
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
            color: #ff9c29;
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
  }
}
.business_data {
  .business_data_title {
    display: flex;
    justify-content: space-between;
    .title_data {
      width: 173.913rpx;
      height: 39.855rpx;
      font-size: 28.986rpx;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #000000;
      line-height: 39.855rpx;
    }
  }
  .data_content {
    margin-top: 18.116rpx;
    width: 695.652rpx;
    height: 173.913rpx;
    background: #ffffff;
    box-shadow: 0px 3.623rpx 36.232rpx 0px rgba(0, 0, 0, 0.07);
    border-radius: 21.739rpx;
    display: flex;
    .seen_my {
      width: 33.333%;
      position: relative;
      text-align: center;
      .blue_line {
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 24px;
        height: 6px;
        background: #1274ff;
        border-radius: 3px;
        transform: translate(-50%, -50%);
      }
      .seen_num {
        position: relative;
        margin-top: 41.667rpx;
        height: 54.348rpx;
        font-size: 39.855rpx;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        line-height: 54.348rpx;
        color: #1274ff;
        .seen_badge {
          display: inline-block;
          position: relative;
          top: -20px;
          width: 36.232rpx;
          height: 36.232rpx;
          text-align: center;
          line-height: 36.232rpx;
          border-radius: 18.116rpx;
          font-size: 21.739rpx;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #ffffff;
          background: #ff445a;
        }
      }

      .seen_my_tile_box {
        display: flex;
        margin-top: 9.058rpx;
        align-items: center;
        justify-content: center;
        .seen_icon {
          width: 23.551rpx;
          height: 19.928rpx;
        }
        .seen_text {
          margin-left: 5.623rpx;
          height: 30.797rpx;
          font-size: 21.739rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
          line-height: 30.797rpx;
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
