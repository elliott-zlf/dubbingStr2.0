<template>
	<view class="container">
		<u-navbar
			:is-back="true"
			:title="'小精灵' "
			title-size="36.232rpx"
			title-color="#000000"
			:border-bottom="false"
			:background="background"
			back-icon-color="#000000"
			@custom-back="handleGoBack"
		>
		<view slot="right">
            <view class="homeye" @click="handleGoBack">
				<image
					class="homeye_img"
					src="@/static/home/kefu.png"
					mode="scaleToFill"
				/>
			</view>
		</view>
		</u-navbar>
		<view class="notice">
            <u-notice-bar mode="vertical" :volume-icon="false" :autoplay="false" :duration="5000" bg-color="#FF445A" color="#FFFFFF" font-size="25.362rpx" :list="listtext"></u-notice-bar>
			<image
				class="closeicon"
				src="@/static/home/close.png"
				mode="scaleToFill"
				@click="handlecloseerPopShow"
			/>
		</view>
		<view class="content" @touchstart="hideDrawer">
			<view class="pys_popup" v-if="requestShow">
				<view class="popup_conent">
					<image
						class="closeicon"
						src="@/static/home/close.png"
						mode="scaleToFill"
						@click="handlecloseerPopShow"
					/>
					<view>
					<view style="height:17.971rpx"></view>	
					<view class="popup_title">
						<view class="title_left">请求对象</view>
						<view class="title_right">
							<image
							    class="headPortrait"
								src="https://pyj2021.oss-cn-shanghai.aliyuncs.com/project/voice/2021/08/27/913/QQ图片20210827222429.jpg"
								mode="scaleToFill"
							/>
							<text class="nick_name">小精灵</text>
						</view>
					</view>
					<view class="view_conten">
						<view class="textarea_box">
							 <textarea
								class="textareainput"
								v-model="form.requirements"
								:disable-default-padding="true"
								placeholder="请输入录制成品时的详细要求；按照试音的感觉录 或其他注意事项"
								maxlength="200"
								placeholder-class="textarea-placeholder"
							/>
						</view>
						<view class="manuscripts_box">
							 <textarea
								class="textareainput_text"
								v-model="form.text"
								:disable-default-padding="true"
								placeholder="请输入录制成品时的详细要求；按照试音的感觉录 或其他注意事项"
								maxlength="2000"
								placeholder-class="textarea-placeholder"
								@input="handleInputEvents"
							/>
							<view class="statistical_box">
							 <view class="textarea_num">
								<text>{{ textareanum }}</text>
								<text>/2000</text>
								</view>
								<view class="home_upload_box">
								<view v-if="fileShow" class="home_upload">上传</view>
								<view
									v-else
									class="upload_successful_box"
									@click="handleDeleteFile"
								>
									<image
									class="deletefile_img"
									src="@/static/home/deletefile.png"
									mode="scaleToFill"
									/>
									<image
									class="successful_img"
									src="@/static/home/wordicon.png"
									mode="scaleToFill"
									/>
								</view>
								</view>
							</view>
						</view>
					</view>
					<view class="submit_btn" @click="handlebidsubmission">
                       提交
					</view>
					<view class="prompt_box">
						<view class="prompt_text"><text class="round"></text>您提交后，配音师会在2h内做出报价</view>
						<view class="prompt_text"><text class="round"></text>您支付后，配音师会在规定时限内交付成品</view>
					</view>
					</view>
				</view>
		    </view>
			<scroll-view 
			  class="msg-list"
			  scroll-y="true"
			  :refresher-enabled="true"
			  :scroll-with-animation="scrollAnimation"
			  :scroll-top="scrollTop"
			  :scroll-into-view="scrollToView"
			  :refresher-triggered="triggered"
			  @refresherrefresh="loadHistory"
			  upper-threshold="50"
			>
				<!-- 加载历史数据waitingUI -->
				<!-- <view class="loading">
					<view class="spinner">
						<view class="rect1"></view>
						<view class="rect2"></view>
						<view class="rect3"></view>
						<view class="rect4"></view>
						<view class="rect5"></view>
					</view>
				</view> -->
				<view class="row" v-for="(row,index) in msgList" :key="index" :id="'msg'+row.msg.id">
					<!-- 系统消息 -->
					<block v-if="row.type=='system'" >
						<view class="system">
							<!-- 文字消息 -->
							<view v-if="row.msg.type=='text'" class="text">
								下午12:23
							</view>
							<!-- 领取红包消息 -->
							<view v-if="row.msg.type=='redEnvelope'" class="red-envelope">
								<image src="/static/img/red-envelope-chat.png"></image>
								{{row.msg.content.text}}
							</view>
						</view>
					</block>
					<!-- 用户消息 -->
					<block v-if="row.type=='user'">
						<!-- 自己发出的消息 -->
						<view class="my" v-if="row.msg.userinfo.uid==myuid">
							<!-- 左-消息 -->
							<view class="left">
								<!-- 文字消息 -->
								<view v-if="row.msg.type=='text'" class="bubble">
									<rich-text :nodes="row.msg.content.text"></rich-text>
								</view>
								<!-- 语言消息 -->
								<view v-if="row.msg.type=='voice'" class="bubble voice" @tap="playVoice(row.msg)" :class="playMsgid == row.msg.id?'play':''">
									<view class="length">{{row.msg.content.length}}</view>
									<view class="icon my-voice"></view>
								</view>
								<!-- 配音报价单 -->
								<view v-if="row.msg.type=='quotation_paid'" class="bubble quotation_paid" @tap="playVoice(row.msg)" :class="playMsgid == row.msg.id?'play':''">
									<view class="quotation_title">
										<view class="quotation_logo_box">
											<image
											    class="quotation_logo"
												src="@/static/messge_icon/dingdan.png"
												mode="scaleToFill"
											/>
										</view>
										<view class="title_box">
											<text class="text u-line-1">配音报价单</text>
										</view>
										<view class="btn_box">
											<view v-if="false" class="unpaid_btn">待支付</view>
											<view v-if="true" class="paid_btn">已支付</view>
										</view>
									</view>
									<view class="quotation_conten">
                                      <view class="order_title u-line-1">品牌广告-党政机关-医疗机构</view>
									  <view class="order_details">
										  <view class="order_left">
											  <text>订单金额：</text>
											  <text>￥2000</text>
										  </view>
										  <view class="order_right">
											  <text>交付时限：</text>
											  <text>2h</text>
										  </view>
									  </view>
									</view>
								</view>
								<!-- 发送文件 -->
								<view v-if="row.msg.type=='file'" class="bubble quotation_paid">
									<view class="quotation_title">
										<view class="quotation_logo_box">
											<image
											    class="quotation_logo"
												src="@/static/messge_icon/wenjian.png"
												mode="scaleToFill"
											/>
										</view>
										<view class="title_box">
											<text class="text u-line-1">文件</text>
										</view>
										<view class="btn_box" @click.stop="downloadcopy(row.msg.content.url,'下载链接已复制到剪贴板')">
											<image
											    class="download_logo"
												src="@/static/messge_icon/xiazhai.png"
												mode="scaleToFill"
											/>
										</view>
									</view>
									<view class="quotation_conten">
                                      <view class="order_title">科技感-软件科技有限公司.pdf</view>
									  <view class="order_details">
										  <view class="order_left">
											  <text>200k</text>
										  </view>
									  </view>
									</view>
								</view>
								<!-- 我的需求 -->
								<view v-if="row.msg.type=='demand'" class="bubble quotation_paid">
									<view class="quotation_title">
										<view class="quotation_logo_box">
											<image
											    class="quotation_logo"
												src="@/static/messge_icon/xuqiu.png"
												mode="scaleToFill"
											/>
										</view>
										<view class="title_box">
											<text class="text u-line-1">我的需求</text>
										</view>
									</view>
									<view class="quotation_conten">
									  <view class="demand_text_box">
										  <view class="demand_title">要求：</view>
										  <view class="demand_text u-line-1">宣传片-男生-沉稳大气</view>
									  </view>
									  <view class="demand_text_box">
										  <view class="demand_title">文本：</view>
										  <view class="demand_text u-line-2">在供给侧改革的稳步推进 中,在“新四化”的同步发 展中,在济正不断孕发展</view>
									  </view>
									  <view class="demand_text_box">
										  <view class="demand_title">备注：</view>
										  <view class="demand_text u-line-1">30-40岁男生</view>
									  </view>
									</view>
								</view>
								<!-- 请求报价 -->
								<view v-if="row.msg.type=='offer'" class="bubble quotation_paid">
									<view class="quotation_title">
										<view class="quotation_logo_box">
											<image
											    class="quotation_logo"
												src="@/static/messge_icon/baojia.png"
												mode="scaleToFill"
											/>
										</view>
										<view class="title_box">
											<text class="text u-line-1">请求报价</text>
										</view>
									</view>
									<view class="quotation_conten">
									  <view class="demand_text_box">
										  <view class="demand_title">要求：</view>
										  <view class="demand_text u-line-1">宣传片-男生-沉稳大气</view>
									  </view>
									  <view class="demand_text_box">
										  <view class="demand_title">文本：</view>
										  <view class="demand_text u-line-2">在供给侧改革的稳步推进 中,在“新四化”的同步发 展中,在济正不断孕发展</view>
									  </view>
									</view>
								</view>
								<!-- 发送作品 -->
								<view v-if="row.msg.type=='works'" class="bubble quotation_paid">
									<view class="quotation_title">
										<view class="quotation_logo_box">
											<image
											    class="quotation_logo"
												src="@/static/messge_icon/chengpin.png"
												mode="scaleToFill"
											/>
										</view>
										<view class="title_box">
											<text class="text u-line-1">作品</text>
										</view>
										<view class="btn_box">
											<image
											    @tap="playVoice(row.msg)"
											    class="play_logo"
												:src="playMsgid == row.msg.id ? playActive : play"
												mode="scaleToFill"
											/>
											<image
											    @click.stop="downloadcopy(row.msg.content.url,'下载链接已复制到剪贴板')"
											    class="download_logo"
												src="@/static/messge_icon/xiazhai.png"
												mode="scaleToFill"
											/>
											<!-- <view v-if="true" class="paid_btn">已交付</view> -->
										</view>
									</view>
									<view class="quotation_conten">
                                      <view class="order_title">温馨甜美-广播提醒-旅游提示 配音.mp</view>
									  <view class="order_details">
										  <view class="order_left">
											  <text>06:26</text>
										  </view>
									  </view>
									</view>
								</view>
								<!-- 发送成品 -->
								<view v-if="row.msg.type=='finished'" class="bubble quotation_paid">
									<view class="quotation_title">
										<view class="quotation_logo_box">
											<image
											    class="quotation_logo"
												src="@/static/messge_icon/chengpin.png"
												mode="scaleToFill"
											/>
										</view>
										<view class="title_box">
											<text class="text u-line-1">成品</text>
										</view>
										<view class="btn_box">
											<image
											    @tap="playVoice(row.msg)"
											    class="play_logo"
												:src="playMsgid == row.msg.id ? playActive : play"
												mode="scaleToFill"
											/>
											<image
											    @click.stop="downloadcopy(row.msg.content.url,'下载链接已复制到剪贴板')"
											    class="download_logo"
												src="@/static/messge_icon/xiazhai.png"
												mode="scaleToFill"
											/>
											<view v-if="true" class="paid_btn" style="margin-left: 43.478rpx;">已交付</view>
										</view>
									</view>
									<view class="quotation_conten">
                                      <view class="order_title">温馨甜美-广播提醒-旅游提示 配音.mp</view>
									  <view class="order_details">
										  <view class="order_left">
											  <text>06:26</text>
										  </view>
									  </view>
									</view>
								</view>	
							</view>
							<!-- 右-头像 -->
							<view class="right">
								<image :src="row.msg.userinfo.face"></image>
							</view>
						</view>
						<!-- 别人发出的消息 -->
						<view class="other" v-if="row.msg.userinfo.uid!=myuid">
							<!-- 左-头像 -->
							<view class="left">
								<image :src="row.msg.userinfo.face"></image>
							</view>
							<!-- 右-用户名称-时间-消息 -->
							<view class="right">
								<!-- 文字消息 -->
								<view v-if="row.msg.type=='text'" class="bubble">
									<rich-text :nodes="row.msg.content.text"></rich-text>
								</view>
								<!-- 语音消息 -->
								<view v-if="row.msg.type=='voice'" class="bubble voice" @tap="playVoice(row.msg)" :class="playMsgid == row.msg.id?'play':''">
									<view class="icon other-voice"></view>
									<view class="length">{{row.msg.content.length}}</view>
								</view>
								<!-- 配音报价单 -->
								<view v-if="row.msg.type=='quotation_unpaid'" class="bubble quotation_paid" @tap="playVoice(row.msg)" :class="playMsgid == row.msg.id?'play':''">
									<view class="quotation_title">
										<view class="quotation_logo_box">
											<image
											    class="quotation_logo"
												src="@/static/messge_icon/dingdan.png"
												mode="scaleToFill"
											/>
										</view>
										<view class="title_box">
											<text class="text u-line-1">配音报价单</text>
										</view>
										<view class="btn_box">
											<view v-if="true" class="unpaid_btn">待支付</view>
											<view v-if="false" class="paid_btn">已支付</view>
										</view>
									</view>
									<view class="quotation_conten">
                                      <view class="order_title u-line-1">品牌广告-党政机关-医疗机构</view>
									  <view class="order_details">
										  <view class="order_left">
											  <text>订单金额：</text>
											  <text>￥2000</text>
										  </view>
										  <view class="order_right">
											  <text>交付时限：</text>
											  <text>2h</text>
										  </view>
									  </view>
									</view>
								</view>
								<!-- 发送文件 -->
								<view v-if="row.msg.type=='file'" class="bubble quotation_paid">
									<view class="quotation_title">
										<view class="quotation_logo_box">
											<image
											    class="quotation_logo"
												src="@/static/messge_icon/wenjian.png"
												mode="scaleToFill"
											/>
										</view>
										<view class="title_box">
											<text class="text u-line-1">文件</text>
										</view>
										<view class="btn_box" @click.stop="downloadcopy(row.msg.content.url,'下载链接已复制到剪贴板')">
											<image
											    class="download_logo"
												src="@/static/messge_icon/xiazhai.png"
												mode="scaleToFill"
											/>
										</view>
									</view>
									<view class="quotation_conten">
                                      <view class="order_title">科技感-软件科技有限公司.pdf</view>
									  <view class="order_details">
										  <view class="order_left">
											  <text>200k</text>
										  </view>
									  </view>
									</view>
								</view>
								<!-- 我的需求 -->
								<view v-if="row.msg.type=='demand'" class="bubble quotation_paid">
									<view class="quotation_title">
										<view class="quotation_logo_box">
											<image
											    class="quotation_logo"
												src="@/static/messge_icon/xuqiu.png"
												mode="scaleToFill"
											/>
										</view>
										<view class="title_box">
											<text class="text u-line-1">我的需求</text>
										</view>
									</view>
									<view class="quotation_conten">
									  <view class="demand_text_box">
										  <view class="demand_title">要求：</view>
										  <view class="demand_text u-line-1">宣传片-男生-沉稳大气</view>
									  </view>
									  <view class="demand_text_box">
										  <view class="demand_title">文本：</view>
										  <view class="demand_text u-line-2">在供给侧改革的稳步推进 中,在“新四化”的同步发 展中,在济正不断孕发展</view>
									  </view>
									  <view class="demand_text_box">
										  <view class="demand_title">备注：</view>
										  <view class="demand_text u-line-1">30-40岁男生</view>
									  </view>
									</view>
								</view>
								<!-- 请求报价 -->
								<view v-if="row.msg.type=='offer'" class="bubble quotation_paid">
									<view class="quotation_title">
										<view class="quotation_logo_box">
											<image
											    class="quotation_logo"
												src="@/static/messge_icon/baojia.png"
												mode="scaleToFill"
											/>
										</view>
										<view class="title_box">
											<text class="text u-line-1">请求报价</text>
										</view>
									</view>
									<view class="quotation_conten">
									  <view class="demand_text_box">
										  <view class="demand_title">要求：</view>
										  <view class="demand_text u-line-1">宣传片-男生-沉稳大气</view>
									  </view>
									  <view class="demand_text_box">
										  <view class="demand_title">文本：</view>
										  <view class="demand_text u-line-2">在供给侧改革的稳步推进 中,在“新四化”的同步发 展中,在济正不断孕发展</view>
									  </view>
									</view>
								</view>
								<!-- 发送作品 -->
								<view v-if="row.msg.type=='works'" class="bubble quotation_paid">
									<view class="quotation_title">
										<view class="quotation_logo_box">
											<image
											    class="quotation_logo"
												src="@/static/messge_icon/chengpin.png"
												mode="scaleToFill"
											/>
										</view>
										<view class="title_box">
											<text class="text u-line-1">作品</text>
										</view>
										<view class="btn_box">
											<image
											    @tap="playVoice(row.msg)"
											    class="play_logo"
												:src="playMsgid == row.msg.id ? playActive : play"
												mode="scaleToFill"
											/>
											<image
											    @click.stop="downloadcopy(row.msg.content.url,'下载链接已复制到剪贴板')"
											    class="download_logo"
												src="@/static/messge_icon/xiazhai.png"
												mode="scaleToFill"
											/>
											<!-- <view v-if="true" class="paid_btn">已交付</view> -->
										</view>
									</view>
									<view class="quotation_conten">
                                      <view class="order_title">温馨甜美-广播提醒-旅游提示 配音.mp</view>
									  <view class="order_details">
										  <view class="order_left">
											  <text>06:26</text>
										  </view>
									  </view>
									</view>
								</view>
								<!-- 发送成品 -->
								<view v-if="row.msg.type=='finished'" class="bubble quotation_paid">
									<view class="quotation_title">
										<view class="quotation_logo_box">
											<image
											    class="quotation_logo"
												src="@/static/messge_icon/chengpin.png"
												mode="scaleToFill"
											/>
										</view>
										<view class="title_box">
											<text class="text u-line-1">成品</text>
										</view>
										<view class="btn_box">
											<image
											    @tap="playVoice(row.msg)"
											    class="play_logo"
												:src="playMsgid == row.msg.id ? playActive : play"
												mode="scaleToFill"
											/>
											<image
											    @click.stop="downloadcopy(row.msg.content.url,'下载链接已复制到剪贴板')"
											    class="download_logo"
												src="@/static/messge_icon/xiazhai.png"
												mode="scaleToFill"
											/>
											<view v-if="true" class="paid_btn" style="margin-left: 43.478rpx;">已交付</view>
										</view>
									</view>
									<view class="quotation_conten">
                                      <view class="order_title">温馨甜美-广播提醒-旅游提示 配音.mp</view>
									  <view class="order_details">
										  <view class="order_left">
											  <text>06:26</text>
										  </view>
									  </view>
									</view>
								</view>
							</view>
						</view>
					</block>
				</view>
			</scroll-view>
		</view>
		<!-- 底部输入栏 -->
		<view class="input-box" :class="popupLayerClass" @touchmove.stop.prevent="discard">
            <view class="send_button">
                <view class="request_quotation" @click="handleRequestQuotation">请求报价</view>
				<view class="request_flie" @tap="onUpload('new')">发文件</view>
			</view>
			<view class="input-top">
				<view class="textbox">
					<view class="text-mode"  :class="isVoice?'hidden':''">
						<view class="box">
							<textarea auto-height="true" placeholder="新消息..." v-model="textMsg"/>
						</view>
					</view>
				</view>
				<view class="send" :class="isVoice?'hidden':''" @tap="sendText">
					<view class="btn">发送</view>
				</view>
			</view>
		</view>
		<l-file ref="lFile" :logo="logo" @up-success="onSuccess"></l-file>
	</view>
</template>
<script>
import uniCopy from "@/utils/uni-copy.js";
import play from '@/static/home/play.png'
import playActive from '@/static/home/palyActive.gif'
	export default {
		data() {
			return {
				// 播放图片
				playActive: playActive,
				play: play,
				//文字消息
				textMsg:'',
				//消息列表
				isHistoryLoading:false,
				scrollAnimation:false,
				scrollTop:0,
				scrollToView:'',
				msgList:[],
				msgImgList:[],
				myuid:0,
				// 新增参数
				form: {
					requirements: '',
					text: ''
				},
				listtext: [
					'请勿交换个人联系方式或私下联系！否则将会',
				],
				textareanum: 0,
				fileShow: true,
				worksItem: {
					works: []
				},
				//录音相关参数
				triggered: false,
				//播放语音相关参数
				AUDIO:uni.createInnerAudioContext(),
				playMsgid:null,
				VoiceTimer:null,
				// 抽屉参数
				popupLayerClass:'',
				// more参数
				hideMore:true,
				//表情定义
				hideEmoji:true,
				//表情图片图床名称 ，由于我上传的第三方图床名称会有改变，所以有此数据来做对应，您实际应用中应该不需要
				onlineEmoji:{"100.gif":"AbNQgA.gif","101.gif":"AbN3ut.gif","102.gif":"AbNM3d.gif","103.gif":"AbN8DP.gif","104.gif":"AbNljI.gif","105.gif":"AbNtUS.gif","106.gif":"AbNGHf.gif","107.gif":"AbNYE8.gif","108.gif":"AbNaCQ.gif","109.gif":"AbNN4g.gif","110.gif":"AbN0vn.gif","111.gif":"AbNd3j.gif","112.gif":"AbNsbV.gif","113.gif":"AbNwgs.gif","114.gif":"AbNrD0.gif","115.gif":"AbNDuq.gif","116.gif":"AbNg5F.gif","117.gif":"AbN6ET.gif","118.gif":"AbNcUU.gif","119.gif":"AbNRC4.gif","120.gif":"AbNhvR.gif","121.gif":"AbNf29.gif","122.gif":"AbNW8J.gif","123.gif":"AbNob6.gif","124.gif":"AbN5K1.gif","125.gif":"AbNHUO.gif","126.gif":"AbNIDx.gif","127.gif":"AbN7VK.gif","128.gif":"AbNb5D.gif","129.gif":"AbNX2d.gif","130.gif":"AbNLPe.gif","131.gif":"AbNjxA.gif","132.gif":"AbNO8H.gif","133.gif":"AbNxKI.gif","134.gif":"AbNzrt.gif","135.gif":"AbU9Vf.gif","136.gif":"AbUSqP.gif","137.gif":"AbUCa8.gif","138.gif":"AbUkGQ.gif","139.gif":"AbUFPg.gif","140.gif":"AbUPIS.gif","141.gif":"AbUZMn.gif","142.gif":"AbUExs.gif","143.gif":"AbUA2j.gif","144.gif":"AbUMIU.gif","145.gif":"AbUerq.gif","146.gif":"AbUKaT.gif","147.gif":"AbUmq0.gif","148.gif":"AbUuZV.gif","149.gif":"AbUliF.gif","150.gif":"AbU1G4.gif","151.gif":"AbU8z9.gif","152.gif":"AbU3RJ.gif","153.gif":"AbUYs1.gif","154.gif":"AbUJMR.gif","155.gif":"AbUadK.gif","156.gif":"AbUtqx.gif","157.gif":"AbUUZ6.gif","158.gif":"AbUBJe.gif","159.gif":"AbUdIO.gif","160.gif":"AbU0iD.gif","161.gif":"AbUrzd.gif","162.gif":"AbUDRH.gif","163.gif":"AbUyQA.gif","164.gif":"AbUWo8.gif","165.gif":"AbU6sI.gif","166.gif":"AbU2eP.gif","167.gif":"AbUcLt.gif","168.gif":"AbU4Jg.gif","169.gif":"AbURdf.gif","170.gif":"AbUhFS.gif","171.gif":"AbU5WQ.gif","172.gif":"AbULwV.gif","173.gif":"AbUIzj.gif","174.gif":"AbUTQs.gif","175.gif":"AbU7yn.gif","176.gif":"AbUqe0.gif","177.gif":"AbUHLq.gif","178.gif":"AbUOoT.gif","179.gif":"AbUvYF.gif","180.gif":"AbUjFU.gif","181.gif":"AbaSSJ.gif","182.gif":"AbUxW4.gif","183.gif":"AbaCO1.gif","184.gif":"Abapl9.gif","185.gif":"Aba9yR.gif","186.gif":"AbaFw6.gif","187.gif":"Abaiex.gif","188.gif":"AbakTK.gif","189.gif":"AbaZfe.png","190.gif":"AbaEFO.gif","191.gif":"AbaVYD.gif","192.gif":"AbamSH.gif","193.gif":"AbaKOI.gif","194.gif":"Abanld.gif","195.gif":"Abau6A.gif","196.gif":"AbaQmt.gif","197.gif":"Abal0P.gif","198.gif":"AbatpQ.gif","199.gif":"Aba1Tf.gif","200.png":"Aba8k8.png","201.png":"AbaGtS.png","202.png":"AbaJfg.png","203.png":"AbaNlj.png","204.png":"Abawmq.png","205.png":"AbaU6s.png","206.png":"AbaaXn.png","207.png":"Aba000.png","208.png":"AbarkT.png","209.png":"AbastU.png","210.png":"AbaB7V.png","211.png":"Abafn1.png","212.png":"Abacp4.png","213.png":"AbayhF.png","214.png":"Abag1J.png","215.png":"Aba2c9.png","216.png":"AbaRXR.png","217.png":"Aba476.png","218.png":"Abah0x.png","219.png":"Abdg58.png"},
				//红包相关参数
				windowsState:'',
				background: {
				  backgroundColor: '#ffffff',
			    },
				requestShow: false,
				redenvelopeData:{
					rid:null,	//红包ID
					from:null,
					face:null,
					blessing:null,
					money:null
				}
			};
		},
		onLoad(option) {
			this.getMsgList();
			//语音自然播放结束
			this.AUDIO.onEnded((res)=>{
				this.playMsgid=null;
			});
		},
		onShow(){
			this.scrollTop = 9999999;
			
			//模板借由本地缓存实现发红包效果，实际应用中请不要使用此方法。
			//
			uni.getStorage({
				key: 'redEnvelopeData',
				success:  (res)=>{
					console.log(res.data);
					let nowDate = new Date();
					let lastid = this.msgList[this.msgList.length-1].msg.id;
					lastid++;
					let row = {type:"user",msg:{id:lastid,type:"redEnvelope",time:nowDate.getHours()+":"+nowDate.getMinutes(),userinfo:{uid:0,username:"大黑哥",face:"/static/img/face.jpg"},content:{blessing:res.data.blessing,rid:Math.floor(Math.random()*1000+1),isReceived:false}}};
					this.screenMsg(row);
					uni.removeStorage({key: 'redEnvelopeData'});
				}
			});
		},
		methods:{
			// 请求弹窗
			handleRequestQuotation() {
              this.requestShow = true
			},
			// 关闭请求报价弹窗
			handlecloseerPopShow() {
			  this.requestShow = false
		    },
			// 请求报价提交
			handlebidsubmission() {
			  this.requestShow = false
			  this.screenMsg({type:"user",msg:{id:12,type:"offer",time:"13:05",userinfo:{uid:1,username:"客服",face:"/static/img/im/face/face_2.jpg"},content:{title:"科技感-软件科技有限公司.pdf", size: '500k', url:"/static/voice/2.mp3"}}})
			},
			 // 计算输入框的字数
			handleInputEvents() {
			this.textareanum = this.form.text.length;
			},
			// 接受消息(筛选处理)
			screenMsg(msg){
				//从长连接处转发给这个方法，进行筛选处理
				console.log('第二次的消息', msg)
				if(msg.type=='system'){
					// 系统消息
					switch (msg.msg.type){
						case 'text':
							this.addSystemTextMsg(msg);
							break;
						case 'redEnvelope':
							this.addSystemRedEnvelopeMsg(msg);
							break;
					}
				}else if(msg.type=='user'){
					// 用户消息
					switch (msg.msg.type){
						case 'text':
							this.addTextMsg(msg);
							break;
						case 'voice':
							this.addVoiceMsg(msg);
							break;
						case 'img':
							this.addImgMsg(msg);
							break;
						case 'redEnvelope':
							this.addRedEnvelopeMsg(msg);
							break;
						case 'offer':
							this.handleRequestquotation(msg);
							break;
						case 'file':
							this.addfile(msg)
					}
					console.log('用户消息');
					//非自己的消息震动
					if(msg.msg.userinfo.uid!=this.myuid){
						console.log('振动');
						uni.vibrateLong();
					}
				}
				this.$nextTick(function() {
					// 滚动到底
					this.scrollToView = 'msg'+msg.msg.id
					console.log('第二次的消息', msg.msg.id)
				});
			},
			
			//触发滑动到顶部(加载历史信息记录)
			loadHistory(e){
				if(this.isHistoryLoading){
					return ;
				}
				this.triggered = true
				this._freshing = true
				this.isHistoryLoading = true;//参数作为进入请求标识，防止重复请求
				this.scrollAnimation = false;//关闭滑动动画
				let Viewid = this.msgList[0].msg.id;//记住第一个信息ID
				//本地模拟请求历史记录效果
				setTimeout(()=>{
					// 消息列表
					let list = [
						{type:"system",msg:{id:0,type:"text",content:{text:"下午12:23"}}},
						{type:"user",msg:{id:1,type:"text",time:"12:56",userinfo:{uid:0,username:"小精灵",face:"https://pyj2021.oss-cn-shanghai.aliyuncs.com/project/voice/2021/08/27/913/QQ图片20210827222429.jpg"},content:{text:"您看这样行吗？我先发给你一份。"}}},
						{type:"user",msg:{id:2,type:"text",time:"12:57",userinfo:{uid:1,username:"客服",face:"https://pyj2021.oss-cn-shanghai.aliyuncs.com/project/voice/2021/08/27/372/QQ图片20210827213306.jpg"},content:{text:"好的，没问题"}}},
						{type:"user",msg:{id:3,type:"quotation_unpaid",time:"13:05",userinfo:{uid:1,username:"客服",face:"https://pyj2021.oss-cn-shanghai.aliyuncs.com/project/voice/2021/08/27/372/QQ图片20210827213306.jpg"},content:{title:"品牌广告-党政机关-医疗机构", orderAmount: '1500', url:"/static/voice/2.mp3", deliveryTime: '2h', length:"00:06"}}},
					]
					// 获取消息中的图片,并处理显示尺寸
					for(let i=0;i<list.length;i++){
						if(list[i].type=='user'&&list[i].msg.type=="img"){
							list[i].msg.content = this.setPicSize(list[i].msg.content);
							this.msgImgList.unshift(list[i].msg.content.url);
						}
						list[i].msg.id = Math.floor(Math.random()*1000+1);
						this.msgList.unshift(list[i]);
					}
					
					//这段代码很重要，不然每次加载历史数据都会跳到顶部
					this.$nextTick(function() {
						this.scrollToView = 'msg'+Viewid;//跳转上次的第一行信息位置
						this.$nextTick(function() {
							this.scrollAnimation = true;//恢复滚动动画
						});
						
					});
					this.isHistoryLoading = false;
					this._freshing = false
				    this.triggered = false
				},2000)
			},
			// 加载初始页面消息
			getMsgList(){
				// 消息列表
				let list = [
					{type:"system",msg:{id:0,type:"text",content:{text:"下午12:23"}}},
					{type:"user",msg:{id:1,type:"text",time:"12:56",userinfo:{uid:0,username:"小精灵",face:"https://pyj2021.oss-cn-shanghai.aliyuncs.com/project/voice/2021/08/27/913/QQ图片20210827222429.jpg"},content:{text:"您看这样行吗？我先发给你一份。"}}},
					{type:"user",msg:{id:2,type:"text",time:"12:57",userinfo:{uid:1,username:"客服",face:"https://pyj2021.oss-cn-shanghai.aliyuncs.com/project/voice/2021/08/27/372/QQ图片20210827213306.jpg"},content:{text:"好的，没问题"}}},
					{type:"user",msg:{id:3,type:"quotation_unpaid",time:"13:05",userinfo:{uid:1,username:"客服",face:"https://pyj2021.oss-cn-shanghai.aliyuncs.com/project/voice/2021/08/27/372/QQ图片20210827213306.jpg"},content:{title:"品牌广告-党政机关-医疗机构", orderAmount: '1500', url:"/static/voice/2.mp3", deliveryTime: '2h', length:"00:06"}}},
					{type:"user",msg:{id:4,type:"quotation_paid",time:"13:05",userinfo:{uid:0,username:"小精灵",face:"https://pyj2021.oss-cn-shanghai.aliyuncs.com/project/voice/2021/08/27/913/QQ图片20210827222429.jpg"},content:{title:"品牌广告-党政机关-医疗机构", orderAmount: '1500', url:"/static/voice/2.mp3", deliveryTime: '2h', length:"00:06"}}},
					{type:"user",msg:{id:5,type:"file",time:"13:05",userinfo:{uid:0,username:"小精灵",face:"https://pyj2021.oss-cn-shanghai.aliyuncs.com/project/voice/2021/08/27/913/QQ图片20210827222429.jpg"},content:{title:"科技感-软件科技有限公司.pdf", size: '500k', url:"/static/voice/2.mp3"}}},
					{type:"system",msg:{id:6,type:"text",content:{text:"下午12:23"}}},
					{type:"user",msg:{id:7,type:"text",time:"12:57",userinfo:{uid:1,username:"客服",face:"https://pyj2021.oss-cn-shanghai.aliyuncs.com/project/voice/2021/08/27/372/QQ图片20210827213306.jpg"},content:{text:"已支付订单"}}},
					{type:"user",msg:{id:8,type:"text",time:"12:56",userinfo:{uid:0,username:"小精灵",face:"https://pyj2021.oss-cn-shanghai.aliyuncs.com/project/voice/2021/08/27/913/QQ图片20210827222429.jpg"},content:{text:"OK"}}},
					{type:"user",msg:{id:9,type:"finished",time:"13:05",userinfo:{uid:1,username:"客服",face:"https://pyj2021.oss-cn-shanghai.aliyuncs.com/project/voice/2021/08/27/372/QQ图片20210827213306.jpg"},content:{title:"温馨甜美-广播提醒-旅游提示 配音.mp", orderAmount: '1500', url:"https://pyj2021.oss-cn-shanghai.aliyuncs.com/project/voice/2021/06/17/60cb0274e2843.mp3", length:"00:06"}}},
					{type:"user",msg:{id:10,type:"works",time:"13:05",userinfo:{uid:1,username:"客服",face:"https://pyj2021.oss-cn-shanghai.aliyuncs.com/project/voice/2021/08/27/372/QQ图片20210827213306.jpg"},content:{title:"温馨甜美-广播提醒-旅游提示 配音.mp", orderAmount: '1500', url:"https://pyj2021.oss-cn-shanghai.aliyuncs.com/project/voice/2021/06/17/60cb0274e2843.mp3", length:"00:06"}}},
					{type:"user",msg:{id:11,type:"demand",time:"13:05",userinfo:{uid:1,username:"客服",face:"https://pyj2021.oss-cn-shanghai.aliyuncs.com/project/voice/2021/08/27/372/QQ图片20210827213306.jpg"},content:{title:"科技感-软件科技有限公司.pdf", size: '500k', url:"/static/voice/2.mp3"}}},
					{type:"user",msg:{id:12,type:"offer",time:"13:05",userinfo:{uid:1,username:"客服",face:"https://pyj2021.oss-cn-shanghai.aliyuncs.com/project/voice/2021/08/27/372/QQ图片20210827213306.jpg"},content:{title:"科技感-软件科技有限公司.pdf", size: '500k', url:"/static/voice/2.mp3"}}},
				]
				// 获取消息中的图片,并处理显示尺寸
				for(let i=0;i<list.length;i++){
					if(list[i].type=='user'&&list[i].msg.type=="img"){
						list[i].msg.content = this.setPicSize(list[i].msg.content);
						this.msgImgList.push(list[i].msg.content.url);
					}
				}
				this.msgList = list;
				// 滚动到底部
				this.$nextTick(function() {
					//进入页面滚动到底部
					this.scrollTop = 9999;
					this.$nextTick(function() {
						this.scrollAnimation = true;
					});
					
				});
			},
			//处理图片尺寸，如果不处理宽高，新进入页面加载图片时候会闪
			setPicSize(content){
				// 让图片最长边等于设置的最大长度，短边等比例缩小，图片控件真实改变，区别于aspectFit方式。
				let maxW = uni.upx2px(350);//350是定义消息图片最大宽度
				let maxH = uni.upx2px(350);//350是定义消息图片最大高度
				if(content.w>maxW||content.h>maxH){
					let scale = content.w/content.h;
					content.w = scale>1?maxW:maxH*scale;
					content.h = scale>1?maxW/scale:maxH;
				}
				return content;
			},
			// 隐藏抽屉
			hideDrawer(){
				this.popupLayerClass = '';
			},
			// 发送文字消息
			sendText(){
				if(!this.textMsg){
					return;
				}
				let content = this.replaceEmoji(this.textMsg);
				let msg = {text:content}
				this.sendMsg(msg,'text');
				this.textMsg = '';//清空输入框
			},
			// 发送报价

			// 发送消息
			sendMsg(content,type){
				//实际应用中，此处应该提交长连接，模板仅做本地处理。
				var nowDate = new Date();
				let lastid = this.msgList[this.msgList.length-1].msg.id;
				lastid++;
				let msg = {type:'user',msg:{id:lastid,time:nowDate.getHours()+":"+nowDate.getMinutes(),type:type,userinfo:{uid:0,username:"小精灵",face:"/static/img/face.jpg"},content:content}}
				// 发送消息
				this.screenMsg(msg);
				// 定时器模拟对方回复,三秒
				setTimeout(()=>{
					lastid = this.msgList[this.msgList.length-1].msg.id;
					lastid++;
					msg = {type:'user',msg:{id:lastid,time:nowDate.getHours()+":"+nowDate.getMinutes(),type:type,userinfo:{uid:1,username:"售后客服008",face:"/static/img/im/face/face_2.jpg"},content:content}}
					// 本地模拟发送消息
					this.screenMsg(msg);
				},3000)
			},
			
			// 添加文字消息到列表
			addTextMsg(msg){
				this.msgList.push(msg);
			},
			// 添加语音消息到列表
			addVoiceMsg(msg){
				this.msgList.push(msg);
			},
			// 添加图片消息到列表
			addImgMsg(msg){
				msg.msg.content = this.setPicSize(msg.msg.content);
				this.msgImgList.push(msg.msg.content.url);
				this.msgList.push(msg);
			},
			addRedEnvelopeMsg(msg){
				this.msgList.push(msg);
			},
			// 添加系统文字消息到列表
			addSystemTextMsg(msg){
				this.msgList.push(msg);
			},
			// 添加请求报价消息
			handleRequestquotation(msg) {
               this.msgList.push(msg);
			},
			// 发送文件
			addfile(msg) {
			  this.msgList.push(msg);	
			},
			// 添加系统红包消息到列表
			addSystemRedEnvelopeMsg(msg){
				this.msgList.push(msg);
			},
			sendSystemMsg(content,type){
				let lastid = this.msgList[this.msgList.length-1].msg.id;
				lastid++;
				let row = {type:"system",msg:{id:lastid,type:type,content:content}};
				this.screenMsg(row)
			},
			// 播放语音
			playVoice(msg){
				console.log(msg)
				if (this.playMsgid==msg.id) {
				  // 
				  this.$nextTick(function() {
					this.AUDIO.stop();
					this.playMsgid = null
				  })
				} else {
				  this.playMsgid=msg.id;
				  this.AUDIO.src = msg.content.url;	
				  this.$nextTick(function() {
					this.AUDIO.play();
				  })
				}
				
			},
			// 复制
			downloadcopy(groupNum, title) {
				uniCopy({
					content: groupNum,
					success: (res) => {
					uni.showToast({
						title: title,
						icon: "none",
						duration: 2000
					});
					},
					error: (e) => {},
				});
			},
			discard(){
				return;
			},
			//替换表情符号为图片
			replaceEmoji(str){
				return '<div style="display: flex;align-items: center;word-wrap:break-word;">'+str+'</div>';
			},
			/* 上传 */
			onUpload(item) { 
				/**
				 * currentWebview: 当前webview
				 * url：上传接口地址
				 * name：附件key,服务端根据key值获取文件流，默认file,上传文件的key
				 * header: 上传接口请求头
				 */
                //  if(this.worksItem.tag_data['2']===''){
                //      uni.showToast({
				// 		title: '请先选择题材',
				// 		icon: 'none',
				// 		duration: 2000
				// 	 });  
				// 	 return;
				//  }
				let platform =  uni.getSystemInfoSync().platform
                if (platform == 'android' || platform == 'ios' || platform == 'devtools') {
					this.forUploading = item
					this.$refs.lFile.upload({
						// #ifdef APP-PLUS
						// nvue页面使用时请查阅nvue获取当前webview的api，当前示例为vue窗口
						currentWebview: this.$mp.page.$getAppWebview(),
						// #endif
						url: "https://www.peiyinstreet.com/business/chat/batch-upload", //替换为你的
						name: 'file',
						header: {  //根据你接口需求自定义
						userToken: this.token || ''	
						},
						formData: {
						fileName: '',
						},
						// body参数直接写key,value,如：
						// formData: 'value1',
						// key2: 'value2',
					});
				}else {
					uni.showToast({
						title: "微信小程序仅支持从手机端上传",
						icon: 'none',
						mask: true,
						duration: 3000
					});
				}	
			},
			onSuccess(res) {
				// if (this.forUploading==='new') {
				// 	this.worksItem.works.push({title:res.fileName, id: res.data.data})
				// } else {
				//     this.worksItem.works.push({title:res.fileName, id: res.data.data})
				// }
                console.log('上传成功回调',JSON.stringify(res));
				this.screenMsg({type:"user",msg:{id: 99,type:"file",time:"13:05",userinfo:{uid:0,username:"小精灵",face:"/static/img/face.jpg"},content:{title:res.fileName, size: '500k', url:"/static/voice/2.mp3"}}},)
				uni.showToast({
					title: '文件上传成功',
					icon: 'none'
				})
			},
		}
	}
</script>
<style lang="scss">
page {
	background-color: #F2F2F2;
	height: 100%;
	overflow: hidden;
}
.container {
	height: 100%;
	display: flex;
	flex-direction: column;
}
.uni-textarea {
  width: 557.971rpx !important;
  height: 190.072px !important;
}
.uni-textarea-textarea {
  width: 557.971rpx !important;
  height: 190.072px !important;
}
.textarea-placeholder {
  font-size: 25.362rpx !important;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999 !important;
  line-height: 36.232rpx;
}
.textareainput {
  .u-input__textarea {
    // padding: 0px !important;
    height: 190.072rpx !important;
  }
  height: 129.072rpx !important;
  width: 557.971rpx !important;
  font-size: 25.362rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  background: #F1F3F7;
  font-weight: 400;
  line-height: 36.232rpx;
  color: #000000;
}
.textareainput_text {
  .u-input__textarea {
    // padding: 0px !important;
    height: 190.072rpx !important;
  }
  height: 189.072rpx !important;
  width: 557.971rpx !important;
  font-size: 25.362rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  background: #F1F3F7;
  font-weight: 400;
  line-height: 36.232rpx;
  color: #000000;
}
.textarea_box {
	margin-top: 43.478rpx;
	padding: 27.174rpx;
	width: 623.188rpx;
	height: 184.783rpx;
	background: #F1F3F7;
	border-radius: 10.87rpx;
}
.manuscripts_box {
	margin-top: 18.116rpx;
	padding: 27.174rpx;
	width: 623.188rpx;
	height: 277.174rpx;
	background: #F1F3F7;
	border-radius: 10.87rpx;
	.statistical_box {
		margin-top: 10rpx;
		display: flex;
		justify-content: space-between;
		.textarea_num {
		width: 63.406rpx;
		height: 30.797rpx;
		font-size: 21.739rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #999999;
		line-height: 30.797rpx;
		}
		.home_upload_box {
		width: 76.087rpx;
		text-align: right;
		margin-right: 18.116rpx;
		.home_upload {
			text-align: center;
			font-size: 21.739rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #999999;
			width: 76.087rpx;
			height: 36.232rpx;
			border-radius: 19.928rpx;
			border: 1.812rpx solid #c8c8c8;
		}
		.upload_successful_box {
			position: relative;
			display: inline-block;
			width: 36.232rpx;
			height: 36.232rpx;
			.successful_img {
			width: 36.232rpx;
			height: 36.232rpx;
			}
			.deletefile_img {
			position: absolute;
			top: -7rpx;
			right: -7rpx;
			width: 18.116rpx;
			height: 18.116rpx;
			}
		}
		}
	}
}
</style>
<style lang="scss">
	@import "@/static/css/style.scss"; 
	.homeye {
		display: flex;
		width: 57.971rpx;
		height: 57.971rpx;
		border-radius: 32.609rpx;
		justify-content: center;
		align-items: center;
		background: white;
	}
	.homeye_img {
		width: 28.986rpx;
		height: 28.986rpx;
	}
	.nick_nameT {
		max-width: 450rpx;
		display: inline-block;
	}
	.notice {
		position: relative;
		z-index: 999999;
		height: 35px;
		.closeicon {
			position: absolute;
			top: 50%;
			right: 36.232rpx;
			width: 28.986rpx;
			height: 28.986rpx;
			transform: translate(0%,-50%);
		}
	}
	.popup_title {
		display: flex;
		align-items: center;
		.title_left {
			width: 50%;
			height: 39.855rpx;
			font-size: 28.986rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #000000;
			line-height: 39.855rpx;
		}
		.title_right {
			width: 50%;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			.headPortrait {
				width: 76.087rpx;
				height: 76.087rpx;
				margin-right: 18.116rpx;
				border-radius: 38.043rpx;
			}
			.nick_name {
				height: 39.855rpx;
				font-size: 28.986rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #000000;
				line-height: 39.855rpx;
			}
		}
	}
	.submit_btn {
		margin-top: 34.42rpx;
		width: 623.188rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 86.957rpx;
		background: #FF445A;
		border-radius: 43.478rpx;
		font-size: 28.986rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
	}
	.prompt_box {
	  margin-top: 28.986rpx;
	  width: 623.188rpx;
	  .prompt_text {
		display: flex;
	    align-items: center;  
		height: 39.855rpx;
		font-size: 21.739rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #999999;
		line-height: 39.855rpx;
		.round {
			margin-right: 9.058rpx;
			display: inline-block;
			width: 9.058rpx;
			height: 9.058rpx;
			border-radius: 4.529rpx;
			background: #D8D8D8;
		}
	  }

	}
</style>