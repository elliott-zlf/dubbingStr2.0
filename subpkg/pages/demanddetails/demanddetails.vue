<template>
	<view class="container">
		 <u-navbar
			:is-back="true"
			:title="'需求详情' "
			title-size="36.232rpx"
			title-color="#000000"
			:border-bottom="false"
			:background="background"
			back-icon-color="#000000"
			@custom-back="handleGoBack"
		></u-navbar>
		<view class="content">
			<!-- 确认成品弹窗 -->
			<view class="pys_popup" v-if="InvitedPopShow">
			<view class="popup_conent">
				<image
					class="closeicon"
					src="@/static/home/close.png"
					mode="scaleToFill"
					@click="handlecloseerPopShow"
				/>
				<view>
				<view style="height:17.971rpx"></view>	
				<view class="check_WeChat_test">
					确认成品
				</view>
				<view class="check_WeChat_tips">是否已经收到成品，并且确认成品满意？</view>
				<view class="share_btn_box">
						<button
							class="cancelSharebtn"
							hover-class="button-hover"
							@click="handlecloseerPopShow"
						>
						取消	 
						</button>
						<button
							class="sharebtn"
							@click="handlechangehome"
						>
						确认
						</button>
				</view>
				</view>
			</view>
		    </view>
			<!-- 确认邀请弹框 -->
			<view class="pys_popup" v-if="confirmPopShow">
			<view class="popup_conent">
				<image
					class="closeicon"
					src="@/static/home/close.png"
					mode="scaleToFill"
					@click="handlecloseerPopShow"
				/>
				<view>
				<view style="height:17.971rpx"></view>	
				<view class="check_WeChat_test">
					确认邀请
				</view>
				<view class="check_WeChat_tips">每个需求可邀请3位试音 确认邀请后将不可重新邀请哦～</view>
				<view class="share_btn_box">
						<button
							class="cancelSharebtn"
							hover-class="button-hover"
							@click="handlecloseerPopShow"
						>
						取消	 
						</button>
						<button
							class="sharebtn"
							@click="handleConfirmInvite"
						>
						确认
						</button>
				</view>
				</view>
			</view>
		    </view>
			<view class="head_portrait_box">
			 <view class="portrait_img_box">
				 <image
			      class="head_portrait_img"
				  :src="demandProfile.user.avatar"
				  mode="scaleToFill"
			    />
			 </view>
			  <view class="nick_name_box">
				  <view class="nick_name u-line-1">{{demandProfile.user.nickname}}</view>
				  <view class="deta_box">
					  <text>{{demandProfile.user.created_at}}</text>
					  <text>发布的需求</text>
				  </view>
			  </view>
			</view>
			<view class="demand_profile">
              <view class="item_label">
				  <view class="label">要求</view>
				  <view class="label_value">
					  <view class="profile_tags" v-for="(item , index) in demandProfile.tags" :key="index">
					    {{item.value}}
					  </view>
				  </view>
			  </view>
			  <view class="item_label">
				  <view class="label_text">文本</view>
				  <view class="label_value">
					  <text :class="anShow ? 'label_value_text' : 'label_value_text_active'">
                        {{demandProfile.audition_text || '未输入试音文本'}}
					  </text>
					  <view class="label_anbox" @click="handleanorPack">
                        <image
					      class="label_an"
						  src="@/static/home/drop-down.png"
						  mode="scaleToFill"
					  	/>
					  </view>
				  </view>
			  </view>
			  <view class="item_label">
				  <view class="label_text">备注</view>
				  <view class="label_value">
					  <text :class="anShow ? 'label_value_text' : 'label_value_text_active'">
                        {{demandProfile.content || '未输入其他要求'}}
					  </text>
				  </view>
			  </view>
			  <view class="item_label last_item_label">
				  <view class="label_text"></view>
				  <view class="label_value">
					  <view class="download_voices" @click="downloadcopy(demandProfile.audition_url,'下载链接已复制到剪贴板')">
                        <image
						    class="download_icon"
							src="@/static/home/mp3icon.png"
							mode="scaleToFill"
						/>
						<text class="download_text">{{demandProfile.audition_url ? '下载参考样音' : '无参考样音'}}</text>
					  </view>
					  <view class="download_voices" @click="downloadcopy(demandProfile.audition_url,'下载链接已复制到剪贴板')">
                        <image
						    class="download_icon"
							src="@/static/home/wordicon.png"
							mode="scaleToFill"
						/>
						<text class="download_text">{{demandProfile.content_url ? '下载文本附件' : '无文本附件'}}</text>
					  </view>
				  </view>
			  </view>
			</view>
			<view class="invitation_vico">
              <view class="home_title_slogan_box">
			    <image
					class="slogan_icon"
					src="@/static/home/lefticon.png"
					mode="scaleToFill"
				/>
				<text class="title_slogan">已邀请<text class="red_num">{{beConfirmedData.length}}</text>位试音，还可以邀请<text class="red_num">{{3-beConfirmedData.length}}</text>位</text>
				<image
					class="slogan_icon"
					src="@/static/home/righticon.png"
					mode="scaleToFill"
				/>
			  </view>
			  <view class="invitation_card">
				  <view class="item_card" v-for="(beitem,index) in beConfirmedData" :key="index">
					  <view class="card_head_portrait" @click="playTheMusic(beitem)">
						  <image
						      class="card_head_img"
							  :src="beitem.teacher.avatar"
							  mode="scaleToFill"
						  />
						  <image
						      class="playActive"
							  :src="beitem.works[0].playStatus ? playActive : play"
							  mode="scaleToFill"
						  />
					  </view>
					  <view class="nick_name">{{beitem.teacher.nickname || ''}}</view>
					  <view class="price_num">{{beitem.start_price || ''}}元/百字</view>
					  <div class="carddelet_box" v-if="invitationStatus !== 0">
						<image
					      class="carddelet"
						  src="@/static/home/carddelet.png"
						  mode="scaleToFill"
						  @click="handleDemandDel(beitem)"
					    />
					  </div>
				  </view>
				  <view class="item_card" v-for="(weiitem,indexs) in 3- beConfirmedData.length" :key="indexs" @tap="handleInvite">
					  <view class="card_head_portrait">
						  <image
						      class="card_head_img"
							  src="https://pyj2021.oss-cn-shanghai.aliyuncs.com/project/voice/2021/06/16/60c9fce3c3080.png"
							  mode="scaleToFill"
						  />
					  </view>
					  <view class="invitation_btn">去邀请</view>
				  </view>
			  </view>
			  
			  <view v-if="beConfirmedData.length>0 && invitationStatus !==0" class="confirminvitation" @click="handleConfirmInviteshow">
				  确认邀请
			  </view>
			  <view v-if="beConfirmedData.length>0 && invitationStatus===0" class="confirminvitation" @click="handleviewInviteshow">
				  查看试音
			  </view>
			  <view v-if="beConfirmedData.length==0" class="confirminvitation_grey" @click="handleDidnInvite">
				  确认邀请
			  </view>
			  <view class="invitation_process">邀请试音  <u-icon name="arrow-right"></u-icon>  找相中的配音师报价付款  <u-icon name="arrow-right"></u-icon> 交付与验收</view>
			</view>
			<view class="sampleVoices">
				<view class="u-tabs-box">
					<u-tabs
						activeColor="#FF445A"
						bold
						ref="tabs"
						bg-color="#130836" 
						inactive-color="#FFFFFF" 
						:bar-style="barStyle" 
						name="title" 
						:is-scroll="false"
						:list="list" 
						:current="current" 
						@change="change" 
						font-size='28.362'
					></u-tabs>
				</view>
				<scroll-view class="itemList_scroll" scroll-x>
					<view v-if="listData.length > 0">
					  <view v-if="current===0" class="itemList_box">
                       <view class="item_list" v-for="(itemList,lsitindex) in listData" :key="lsitindex">
						   <view class="list_top">
                             <view class="avatar_bxo">
								 <image
								     class="avatar_img"
									 :src="itemList.teacher.avatar"
									 mode="scaleToFill"
								 />
							 </view>
							 <view class="nickname_box">
                               <view class="nicknamen u-line-1">
								   <view class="nickname_tetx">{{itemList.teacher.nickname}}</view>
								   <image
										v-if="itemList.teacher.sex===1"
										class="sex_img"
										src="@/static/teacherlist/manicon.png"
										mode="scaleToFill"
									/>
									<image
										v-if="itemList.teacher.sex===2"
										class="sex_img"
										src="@/static/teacherlist/woman.png"
										mode="scaleToFill"
									/>
							   </view>
							   <view class="price_box">
                                  专享价<text class="price_text">{{itemList.start_price}}元/百字</text>
							   </view>
							  </view>
							  <view class="invitation_box">
							    <view v-if="itemList.teacher_status === 0" class="invitation_btn" @click="handleInvitedAudition(itemList)">邀请试音</view>
							    <view v-if="itemList.teacher_status === 1" class="confirmed_btn" @click="handleInvitedAudition(itemList)">待确认</view>
							    <view v-if="itemList.teacher_status === 2" class="successful_btn" @click="handleInvitedAudition(itemList)">邀请成功</view>
							  </view>
						   </view>
						   <view class="list_bottom">
                             <view class="play_list" @click="playTheMusic(itemList)">
                               <view class="play_box">
                                 <image
									class="play"
									:src="itemList.works[0].playStatus ? playActive : play"
									mode="scaleToFill"
								 />
							   </view>
							   <view class="nameWork">{{itemList.works[0].title}}</view>
							 </view>
							   <view class="collection_box" @click.stop="demandFabulousadd(itemList,1)">
                                 <image
							       class="collection"
								   src="@/static/demand/collection.png"
								   mode="scaleToFill"
							     />
							   </view>
						   </view>
					   </view>
					   <view class="item_share_box">
						   <view class="item_share_btn">
							   <image
							       class="share_icon"
								   src="@/static/demand/share.png"
								   mode="scaleToFill"
							   />
							   <text class="share_text">分享样音</text>
						   </view>
						   <view class="tips_share">仅分享音频文件</view>
					   </view>
					  </view>
					<view v-if="current===1" class="itemList_box">
                       <view class="item_list" v-for="(itemList,lsitindex) in listData" :key="lsitindex">
						   <view class="list_top">
                             <view class="avatar_bxo">
								 <image
								     class="avatar_img"
									 :src="itemList.teacher.avatar"
									 mode="scaleToFill"
								 />
							 </view>
							 <view class="nickname_box">
                               <view class="nicknamen u-line-1">
								   <view class="nickname_tetx">{{itemList.teacher.nickname}}</view>
								   <image
								       class="sex_img"
									   src="@/static/teacherlist/manicon.png"
									   mode="scaleToFill"
								   />
							   </view>
							   <view class="price_box">
                                  专享价<text class="price_text">{{itemList.start_price}}元/百字</text>
							   </view>
							  </view>
							  <view class="invitation_box">
								<view v-if="itemList.status === 1" class="apush_btn" @click="handleRoute(itemList.teacher_id)">催一催</view>
							    <view v-if="itemList.status === 0" class="invitation_btn" @click="handleTaOrder(itemList.teacher_id)">找TA下单</view>
							  </view>
						   </view>
						   <view class="list_bottom">
							<view class="play_list" v-if="itemList.status === 1"  @click="playTheMusic(itemList)">
                               <view class="play_box">
								 <image
								     class="play"
									 src="@/static/demand/loading.png"
									 mode="scaleToFill"
								 />  
                                 <image
								   v-if="false"
							       class="play"
								   :src="play"
								   mode="scaleToFill"
							     />
							   </view>
							   <view class="nameWork">
								   正在为你试音中
								   <text v-if="itemList.time!==0">，上传倒计时</text>
                                   <u-count-down v-if="itemList.time!==0" class="countdown_num" :timestamp="itemList.time" font-size = '25.362' separator-size="25.362" :show-hours="false" bg-color="#F1F3F7" separator-color="#000000" color='#000000'></u-count-down>
							   </view>
							 </view>
							 <view class="play_list" v-if="itemList.status === 0"  @click="playTheMusic(itemList)">
                                   <view class="play_box"> 
										<image
											class="play"
											:src="itemList.works[0].playStatus ? playActive : play"
											mode="scaleToFill"
										/>
									</view>
									<view class="nameWork">{{itemList.works[0].title}}</view>
							 </view>
							 <view  v-if="itemList.status === 0" class="collection_box" @click="downloadcopy(itemList.works[0].url,'下载链接已复制到剪贴板')">
                                 <image
							       class="download"
								   src="@/static/teacherlist/download.png"
								   mode="scaleToFill"
							     />
							   </view>
						   </view>
					   </view>
					   <view class="item_share_box">
						   <view class="item_share_btn">
							   <image
							       class="share_icon"
								   src="@/static/demand/share.png"
								   mode="scaleToFill"
							   />
							   <text class="share_text">分享样音</text>
						   </view>
						   <view class="tips_share">仅分享音频文件</view>
					   </view>
					</view>
					<view v-if="current===2" class="itemList_box paiditem">
                       <view class="price_item">
						   <view class="list_left">
                             <image
							     class="timeLine_icon"
								 src="@/static/home/yijingxing.png"
								 mode="scaleToFill"
							 />
							 <view class="offerPrice">已报价</view>
							 <view class="progressLine">
                                 <view class="progressBar" style="height:50%"></view>
							 </view>
							 <image
							     class="timeLine_icon"
								 src="@/static/home/jingxingzhong.png"
								 mode="scaleToFill"
							 />
							 <view class="bepaid_text">待支付</view>
						   </view>
						   <view class="list_rigth">
                              <view class="list_top">
									<view class="avatar_bxo">
										<image
											class="avatar_img"
											src="https://thirdwx.qlogo.cn/mmopen/vi_32/sUak1ndq38T8ZaZNMyibhsPxPrucV1jSib3SqYQOqJbBLVuPFy8uWtiaiczDPzL9xibsthahPnbcVAO0aiboK3Vp6GwA/132"
											mode="scaleToFill"
										/>
									</view>
									<view class="nickname_box">
									<view class="nicknamen u-line-1">
										<view class="nickname_tetx">渐行渐远</view>
										<image
											class="sex_img"
											src="@/static/teacherlist/manicon.png"
											mode="scaleToFill"
										/>
									</view>
									</view>
									<view class="contact_Ta_box">
										<view class="contact_Ta">联系Ta</view>
									</view>
							  </view>
							  <view class="order_ontent">
								  <view class="order_amount_box">
									  <text class="order_amount_title">订单金额：</text>
									  <text class="order_amount">￥10000</text>
								  </view>
								  <view class="order_amount_box" style="margin-top: 3px;">
									  <text class="order_amount_title">交付时限：</text>
									  <text class="order_amount">2h</text>
								  </view>
							  </view>
							  <view class="list_top customer">
									<view class="avatar_bxo">
										<image
											class="avatar_img"
											src="https://thirdwx.qlogo.cn/mmopen/vi_32/sUak1ndq38T8ZaZNMyibhsPxPrucV1jSib3SqYQOqJbBLVuPFy8uWtiaiczDPzL9xibsthahPnbcVAO0aiboK3Vp6GwA/132"
											mode="scaleToFill"
										/>
									</view>
									<view class="nickname_box">
									<view class="nicknamen u-line-1">
										<view class="nickname_tetx">渐行渐远</view>
										<image
											class="sex_img"
											src="@/static/teacherlist/manicon.png"
											mode="scaleToFill"
										/>
									</view>
									</view>
									<view class="pay_Ta_box">
										<view class="pay_Ta">去支付</view>
									</view>
							  </view>
							  <view class="order_ontent">
								  <view class="order_amount_box">
									  <text class="order_amount_title">订单金额：</text>
									  <text class="order_amount">￥10000</text>
								  </view>
								  <view class="order_amount_box" style="margin-top: 3px;">
									  <text class="order_amount_title">付款倒计时：</text>
									  <u-count-down :timestamp="timestamp" font-size="25.362" separator-size="25.362" separator-color="#FF445A" color="#FF445A" bg-color="#F1F3F7" :show-days="false"></u-count-down>
								  </view>
							  </view>
						   </view>
					   </view>
					   <view class="price_item">
						   <view class="list_left">
                             <image
							     class="timeLine_icon"
								 src="@/static/home/yijingxing.png"
								 mode="scaleToFill"
							 />
							 <view class="offerPrice">已报价</view>
							 <view class="progressLine">
                                 <view class="progressBar" style="height:100%"></view>
							 </view>
							 <image
							     class="timeLine_icon"
								 src="@/static/home/yijingxing.png"
								 mode="scaleToFill"
							 />
							 <view class="offerPrice">已支付</view>
						   </view>
						   <view class="list_rigth">
                              <view class="list_top">
									<view class="avatar_bxo">
										<image
											class="avatar_img"
											src="https://thirdwx.qlogo.cn/mmopen/vi_32/sUak1ndq38T8ZaZNMyibhsPxPrucV1jSib3SqYQOqJbBLVuPFy8uWtiaiczDPzL9xibsthahPnbcVAO0aiboK3Vp6GwA/132"
											mode="scaleToFill"
										/>
									</view>
									<view class="nickname_box">
									<view class="nicknamen u-line-1">
										<view class="nickname_tetx">渐行渐远</view>
										<image
											class="sex_img"
											src="@/static/teacherlist/manicon.png"
											mode="scaleToFill"
										/>
									</view>
									</view>
									<view class="contact_Ta_box">
										<view class="contact_Ta">联系Ta</view>
									</view>
							  </view>
							  <view class="order_ontent">
								  <view class="order_amount_box">
									  <text class="order_amount_title">订单金额：</text>
									  <text class="order_amount">￥10000</text>
								  </view>
								  <view class="order_amount_box" style="margin-top: 3px;">
									  <text class="order_amount_title">交付时限：</text>
									  <text class="order_amount">2h</text>
								  </view>
							  </view>
							  <view class="list_top customer">
									<view class="avatar_bxo">
										<image
											class="avatar_img"
											src="https://thirdwx.qlogo.cn/mmopen/vi_32/sUak1ndq38T8ZaZNMyibhsPxPrucV1jSib3SqYQOqJbBLVuPFy8uWtiaiczDPzL9xibsthahPnbcVAO0aiboK3Vp6GwA/132"
											mode="scaleToFill"
										/>
									</view>
									<view class="nickname_box">
									<view class="nicknamen u-line-1">
										<view class="nickname_tetx">渐行渐远</view>
										<image
											class="sex_img"
											src="@/static/teacherlist/manicon.png"
											mode="scaleToFill"
										/>
									</view>
									</view>
									<view class="have_pay_Ta_box">
										<view class="have_pay_Ta">已支付</view>
									</view>
							  </view>
							  <view class="order_ontent">
								  <view class="order_amount_box">
									  <text class="order_amount_title">订单金额：</text>
									  <text class="order_amount">￥10000</text>
								  </view>
								  <view class="order_amount_box" style="margin-top: 3px;">
									  <text class="order_amount_title">付款倒计时：</text>
									  <text class="order_amount">--</text>
								  </view>
							  </view>
						   </view>
					   </view>
					</view>
					<view v-if="current===3" class="itemList_box paiditem">
						<view class="price_item">
						   <view class="list_left">
                             <image
							     class="timeLine_icon"
								 src="@/static/home/jingxingzhong.png"
								 mode="scaleToFill"
							 />
							 <view class="bepaid_text">待交付</view>
							 <view class="progressLine">
                                 <view class="progressBar" style="height:0%"></view>
							 </view>
							 <image
							     class="timeLine_icon"
								 src="@/static/home/jingxingzhong.png"
								 mode="scaleToFill"
							 />
							 <view class="bepaid_text">待验收</view>
						   </view>
						   <view class="list_rigth">
                              <view class="list_top">
									<view class="avatar_bxo">
										<image
											class="avatar_img"
											src="https://thirdwx.qlogo.cn/mmopen/vi_32/sUak1ndq38T8ZaZNMyibhsPxPrucV1jSib3SqYQOqJbBLVuPFy8uWtiaiczDPzL9xibsthahPnbcVAO0aiboK3Vp6GwA/132"
											mode="scaleToFill"
										/>
									</view>
									<view class="nickname_box">
									<view class="nicknamen u-line-1">
										<view class="nickname_tetx">渐行渐远</view>
										<image
											class="sex_img"
											src="@/static/teacherlist/manicon.png"
											mode="scaleToFill"
										/>
									</view>
									</view>
									<view class="contact_Ta_box">
										<view class="contact_Ta">联系Ta</view>
									</view>
							  </view>
							  <view class="order_ontent">
								  <view class="order_amount_box">
									  <text class="order_amount_title">正在为你录制中</text>
								  </view>
								  <view class="order_amount_box" style="margin-top: 3px;">
									  <text class="order_amount_title">交付倒计时：</text>
									  <u-count-down :timestamp="timestamp" font-size="25.362" separator-size="25.362" separator-color="#FF445A" color="#FF445A" bg-color="#F1F3F7" :show-days="false"></u-count-down>
								  </view>
							  </view>
							  <view class="list_top customer">
									<view class="avatar_bxo">
										<image
											class="avatar_img"
											src="https://thirdwx.qlogo.cn/mmopen/vi_32/sUak1ndq38T8ZaZNMyibhsPxPrucV1jSib3SqYQOqJbBLVuPFy8uWtiaiczDPzL9xibsthahPnbcVAO0aiboK3Vp6GwA/132"
											mode="scaleToFill"
										/>
									</view>
									<view class="nickname_box">
									<view class="nicknamen u-line-1">
										<view class="nickname_tetx">渐行渐远</view>
										<image
											class="sex_img"
											src="@/static/teacherlist/manicon.png"
											mode="scaleToFill"
										/>
									</view>
									</view>
									<view class="have_pay_Ta_box">
										<view class="have_pay_Ta">确认成品</view>
									</view>
							  </view>
						   </view>
					    </view>
						<!-- 待确认 -->
						<view class="price_item daiqunren">
						   <view class="list_left">
                             <image
							     class="timeLine_icon"
								 src="@/static/home/yijingxing.png"
								 mode="scaleToFill"
							 />
							 <view class="offerPrice">已交付</view>
							 <view class="progressLine" style="height: 196.594rpx;">
                                 <view class="progressBar" style="height:50%"></view>
							 </view>
							 <image
							     class="timeLine_icon"
								 src="@/static/home/jingxingzhong.png"
								 mode="scaleToFill"
							 />
							 <view class="bepaid_text">待验收</view>
						   </view>
						   <view class="list_rigth">
                              <view class="list_top">
									<view class="avatar_bxo">
										<image
											class="avatar_img"
											src="https://thirdwx.qlogo.cn/mmopen/vi_32/sUak1ndq38T8ZaZNMyibhsPxPrucV1jSib3SqYQOqJbBLVuPFy8uWtiaiczDPzL9xibsthahPnbcVAO0aiboK3Vp6GwA/132"
											mode="scaleToFill"
										/>
									</view>
									<view class="nickname_box">
									<view class="nicknamen u-line-1">
										<view class="nickname_tetx">渐行渐远</view>
										<image
											class="sex_img"
											src="@/static/teacherlist/manicon.png"
											mode="scaleToFill"
										/>
									</view>
									</view>
									<view class="contact_Ta_box">
										<view class="contact_Ta">联系Ta</view>
									</view>
							  </view>
							  <view class="list_bottom">
									<view class="play_box">
										<image
											class="play"
											src="@/static/demand/loading.png"
											mode="scaleToFill"
										/>  
										<image
										v-if="false"
										class="play"
										:src="play"
										mode="scaleToFill"
										/>
									</view>
									<view class="nameWork">品牌广告-党政机关-医疗机构</view>
									<view class="collection_box">
										<image
										class="download"
										src="@/static/teacherlist/download.png"
										mode="scaleToFill"
										/>
									</view>
							  </view>
							  <view class="list_top customer">
									<view class="avatar_bxo">
										<image
											class="avatar_img"
											src="https://thirdwx.qlogo.cn/mmopen/vi_32/sUak1ndq38T8ZaZNMyibhsPxPrucV1jSib3SqYQOqJbBLVuPFy8uWtiaiczDPzL9xibsthahPnbcVAO0aiboK3Vp6GwA/132"
											mode="scaleToFill"
										/>
									</view>
									<view class="nickname_box">
									<view class="nicknamen u-line-1">
										<view class="nickname_tetx">渐行渐远</view>
										<image
											class="sex_img"
											src="@/static/teacherlist/manicon.png"
											mode="scaleToFill"
										/>
									</view>
									</view>
									<view class="pay_Ta_box">
										<view class="pay_Ta" @click="handlechangehome">确认成品</view>
									</view>
							  </view>
							  <view class="list_bottom">
								  <view class="order_amount_box" style="margin-top: 3px;">
									  <text class="order_amount_title">确认倒计时：</text>
									  <u-count-down :timestamp="timestamp" font-size="25.362" separator-size="25.362" separator-color="#FF445A" color="#FF445A" bg-color="#F1F3F7" :show-days="false"></u-count-down>
								  </view>
							  </view>
						   </view>
					    </view>
						<view class="price_item wanchengdingdan">
						   <view class="list_left">
                             <image
							     class="timeLine_icon"
								 src="@/static/home/yijingxing.png"
								 mode="scaleToFill"
							 />
							 <view class="offerPrice">已交付</view>
							 <view class="progressLine" style="height: 196.594rpx;">
                                 <view class="progressBar" style="height:100%"></view>
							 </view>
							 <image
							     class="timeLine_icon"
								 src="@/static/home/yijingxing.png"
								 mode="scaleToFill"
							 />
							 <view class="offerPrice">已验收</view>
						   </view>
						   <view class="list_rigth">
                              <view class="list_top">
									<view class="avatar_bxo">
										<image
											class="avatar_img"
											src="https://thirdwx.qlogo.cn/mmopen/vi_32/sUak1ndq38T8ZaZNMyibhsPxPrucV1jSib3SqYQOqJbBLVuPFy8uWtiaiczDPzL9xibsthahPnbcVAO0aiboK3Vp6GwA/132"
											mode="scaleToFill"
										/>
									</view>
									<view class="nickname_box">
									<view class="nicknamen u-line-1">
										<view class="nickname_tetx">渐行渐远</view>
										<image
											class="sex_img"
											src="@/static/teacherlist/manicon.png"
											mode="scaleToFill"
										/>
									</view>
									</view>
									<view class="contact_Ta_box">
										<view class="contact_Ta">联系Ta</view>
									</view>
							  </view>
							  <view class="list_bottom">
									<view class="play_box">
										<image
											class="play"
											src="@/static/demand/loading.png"
											mode="scaleToFill"
										/>  
										<image
										v-if="false"
										class="play"
										:src="play"
										mode="scaleToFill"
										/>
									</view>
									<view class="nameWork">品牌广告-党政机关-医疗机构</view>
									<view class="collection_box">
										<image
										class="download"
										src="@/static/teacherlist/download.png"
										mode="scaleToFill"
										/>
									</view>
							  </view>
							  <view class="list_top customer">
									<view class="avatar_bxo">
										<image
											class="avatar_img"
											src="https://thirdwx.qlogo.cn/mmopen/vi_32/sUak1ndq38T8ZaZNMyibhsPxPrucV1jSib3SqYQOqJbBLVuPFy8uWtiaiczDPzL9xibsthahPnbcVAO0aiboK3Vp6GwA/132"
											mode="scaleToFill"
										/>
									</view>
									<view class="nickname_box">
									<view class="nicknamen u-line-1">
										<view class="nickname_tetx">渐行渐远</view>
										<image
											class="sex_img"
											src="@/static/teacherlist/manicon.png"
											mode="scaleToFill"
										/>
									</view>
									</view>
									<view class="have_pay_Ta_box">
										<view class="have_pay_Ta">已验收</view>
									</view>
							  </view>
							  <view class="list_bottom">
								  <view class="order_amount_box" style="margin-top: 3px;">
									  <text class="order_amount_title">配音需求已完成</text>
								  </view>
							  </view>
						   </view>
					    </view>
					</view>
					</view>
					<view v-if="listData.length === 0" class="temporarily_box">
                       <image
					      class="temporarily_icon"
						  src="@/static/demand/defaulticon.png"
						  mode="scaleToFill"
					  />
					  <view class="temporarily_text">暂无数据</view>
					</view>
					<view style="height:80px"></view>
				</scroll-view>
			</view>
		</view>
		<u-popup v-model="recommendedShow" mode="bottom" height="1188.406rpx" border-radius="20" :mask-close-able="false">
			<view class="popup_conten" v-if="!loadingmatchingShow">
				<view class="intelligent_title">
					<image
						class="title_img"
						src="@/static/home/title_img.png"
						mode="scaleToFill"
					/>
				  <view class="title_text">已邀请<text>{{invitationCount}}</text>位试音，还可以邀请<text>{{3-invitationCount}}</text>位</view>
				  <view class="confirm_btn" @tap="invitationConfirm">去确认</view>
				</view>
				<view class="price_screening_box">
					<view class="price_item" :class="activeIndex==index ? 'activeClass' : ''" v-for="(item,index) in priceList" :key="index" @click="handlePriceScreening(index)">
					{{item}}
					</view>
				</view>
				<view class="smart_item">
                  <view class="item_list" :class="{'broder_none' : recommendedData.length===index+1}" v-for="(recItem,index) in recommendedData" :key="index">
					<view class="list_top">
						<view class="avatar_bxo">
							<image
								class="avatar_img"
								:src="recItem.teacher.avatar"
								mode="scaleToFill"
							/>
						</view>
						<view class="nickname_box">
						<view class="nicknamen u-line-1">
							<view class="nickname_tetx">{{recItem.teacher.nickname}}</view>
							<image
							    v-if="recItem.teacher.sex===1"
								class="sex_img"
								src="@/static/teacherlist/manicon.png"
								mode="scaleToFill"
							/>
							<image
							     v-if="recItem.teacher.sex===2"
								class="sex_img"
								src="@/static/teacherlist/woman.png"
								mode="scaleToFill"
							/>
						</view>
						<view class="price_box">
							专享价<text class="price_text">{{recItem.start_price}}元/百字</text>
						</view>
						</view>
						<view class="invitation_box">
							<view v-if="recItem.status === 0" class="invitation_btn" @click="handleInvitedAudition(recItem)">邀请试音</view>
							<view v-if="recItem.status === 1" class="confirmed_btn" @click="handleInvitedAudition(recItem)">待确认</view>
							<view v-if="recItem.status === 2" class="successful_btn" @click="handleInvitedAudition(recItem)">邀请成功</view>
						</view>
					</view>
					<view class="list_bottom">
						<view class="play_list" @click="playTheMusic(recItem)">
							<view class="play_box">
							<image
							class="play"
							:src="recItem.works[0].playStatus ? playActive : play"
							mode="scaleToFill"
							/>
							</view>
							<view class="nameWork">{{recItem.works[0].title}}</view>
						</view>
						<view class="collection_box" @click.stop="demandFabulousadd(recItem,recItem.fabulous_status)">
							<image
							  class="collection"
							  :src="recItem.fabulous_status ? collection : weicollection"
							  mode="scaleToFill"
							/>
						</view>
					</view>
				  </view>
				</view>
				<view class="customer_service_box">
					<button  class="invitationBtn" open-type="contact" send-message-title="联系客服" :show-message-card="true">
						<view class="customer_content">
                            <text class="customer_title">没有匹配到？</text>
							<image
								class="kefu"
								src="@/static/home/kefu.png"
								mode="scaleToFill"
							/>
							<text class="customer_title_red">联系客服</text>
							<text class="customer_title">小姐姐来帮你；</text>
						</view>
					</button>
				</view>
				<view class="batch_box" @click="handleInbatch">
					<image
					    class="batch_img"
						src="@/static/demand/batch.png"
						mode="scaleToFill"
					/>
					<view class="batch_text">
						换一批（<text>{{recommended.page}}</text>/<text>{{totalNum}}</text>页）
					</view>
				</view>
			</view>
		    <view class="popup_conten" v-if="loadingmatchingShow">
				<view class="intelligent_title">
					<image
						class="title_img"
						src="@/static/home/title_img.png"
						mode="scaleToFill"
					/>
				  <view class="title_text">可同时邀请3位配音师免费试音</view>
				</view>
				<view class="smart_item">
					<view class="loading_view">
						<image
						    class="loading_view_img"
							src="@/static/home/loading.png"
							mode="scaleToFill"
						/>
					</view>
					<view class="loading_text_box">
						<view class="loading_text">
							正在从 <text>500+</text>配音师中为您<text>精准匹配</text> 优质&低价的好声音
						</view>
				    </view>
				</view>
			</view>
		</u-popup>
		<dropball></dropball>
		<view v-if="audioShow" class="home_musicSrc_box disappear">
        <musicAudio 
		  ref="musicAudio"
		  :url="dataPlay.works[0].url"
		  :autoplay="true"
		  :portrait="dataPlay.teacher.avatar"
		  :music_title="dataPlay.works[0].title"
		  @handleChangePlay="handleChangePlay"  
		  @musicClose="musicClose"
		  ></musicAudio>
	  </view>
	</view>
</template>

<script>
import dropball from '@/components/dropball/dropball.vue'
import collection from '@/static/demand/collection.png'
import weicollection from '@/static/demand/weicollection.png'
// 引入需求详情api
import { 
	demandDetail,
    demandDemandteacher,
	demandFabulousadd,
	demandFabulousdel,
	demandAdd,
	demandDetailteacher,
	demandDel,
	demandConfirm,
	demandFabulouslist
	} from "@/api/myneeds.js"
// 复制
import uniCopy from '@/utils/uni-copy.js'
// 播放组件
import musicAudio from '@/components/audio/audioplay.vue'
	export default {
		components: {
			dropball,
			musicAudio
		},
		data() {
			return {
			   list: [
					{
					name: '收藏的样音',
					id: 1
					},
					{
					name: '邀请的试音',
					id: 2
					},
					{
					name: '报价与付款',
					id: 3
					},
					{
					name: '交付与验收',
					id: 4
					}
				],
				play: 'https://www.peiyinstreet.com/guidang/play.png',
				playActive: "https://www.peiyinstreet.com/guidang/palyActive.gif",
				collection: collection,
				weicollection: weicollection,
			    current: 0,
				loadingmatchingShow: true,
				background: {
				  backgroundColor: '#ffffff',
			    },
				timestamp: 86400,
				InvitedPopShow: false,
				confirmPopShow: false,
				barStyle: {
					// backgroundColor: "#ffffff",
				},
				priceList: [
					'不限',
					'中级≤20元',
					'高级30元-40元',
					'特级≥50元',
				],
				activeIndex: 0,
				recommendedShow: false,
				anShow: true,
				demand_id: '',
				needType: '',
				demandProfile: {},
				// 推荐弹窗参数
				recommended: {
					demand_id: this.demand_id,
					type: 1,
					page: 1,
					size: 3 
				},
				audioShow: false,
				has_next: '',
				dataPlay: {
					works: [{
					url: ''
					}	
					]
				},
				recommendedData: [],
				beConfirmedData: [],
				invitationCount: 0,
				// 邀请状态
				invitationStatus: 0,
				totalNum: 0,
				// 列表数据
				listData: [],
				listObj: {
				  demand_id: '',
				  status: 0
				}
			};
		},
		onLoad(options) {
			console.log('传过来的id', options)
			setTimeout(()=>{
              this.loadingmatchingShow = false
			},3000)
			this.demand_id = options.id
			this.recommended.demand_id = options.id
			this.listObj.demand_id = options.id
			this.needType = options.type
			this.getDemandDetail()
			// 推荐弹窗
			this.getDemandDemandteacher()
			this.getlsitData(this.listObj)
		},
		onUnload() {
			uni.$TUIKit.off(uni.$TUIKitEvent.SDK_READY, this.onConversationListUpdated);
		},
		methods: {
		  // 需求详情数据
		  getDemandDetail() {
			  demandDetail({demand_id: this.demand_id}).then((res)=>{
                console.log('需求详情的数据', res)
				this.demandProfile = res.data
				this.getDemandDetailteacher()
				if (res.status === 0) {
					this.recommendedShow = false
				} else {
					this.recommendedShow = true
				}
				this.invitationStatus = res.status
			  })
		  },
		  //  待邀请的配音师
		  getDemandDetailteacher () {
			demandDetailteacher({demand_id: this.demand_id}).then((res)=>{
			  this.beConfirmedData = res.data
			})
		  },
		  handleConfirmInviteshow() {
			  this.confirmPopShow = true
		  },
		  handleviewInviteshow() {
			this.current = 1
			this.listObj.status = 1
			this.getlsitData(this.listObj) 
		  },
		  // 确认邀请配音师提示
		  handleConfirmInvite() {
			demandConfirm({demand_id:this.demand_id}).then((res)=>{
              console.log('确认邀请配音师',res)
			  this.confirmPopShow = false
			  this.getDemandDetail()
			})
		  },  
		  //  没有待邀请的配音师提示
		  handleDidnInvite() {
             uni.showToast({
				title: '您还没有邀请的配音师哦',
				icon: "none",
				duration: 2000
			 })
		  },
		  // 智能推荐弹窗
		  getDemandDemandteacher() {
            demandDemandteacher(this.recommended).then((res)=>{
			  this.totalNum = Math.ceil(res.teacher_count/3)
			  this.recommendedData = res.data
			})
		  },
		  // 收藏和取消收藏配音师
		  demandFabulousadd(item,index) {
			if (index===0) {
				demandFabulousadd({demand_id: this.demand_id,teacher_id:item.teacher_id})
				.then((res)=>{
					uni.showToast({
						title: '已为您添加到【收藏的样音】里，可在需求详情页查看',
						icon: "none",
						duration: 2000
					})
					this.recommendedData.map((recitem)=>{
						if(item.teacher_id === recitem.teacher_id) {
							recitem.fabulous_status = 1
						}
					})
				})
			} else {
			   demandFabulousdel({demand_id: this.demand_id,teacher_id:item.teacher_id})
				.then((res)=>{
					uni.showToast({
						title: '取消收藏成功',
						icon: "none",
						duration: 2000
					})
					this.recommendedData.map((recitem)=>{
						if(item.teacher_id === recitem.teacher_id) {
							recitem.fabulous_status = 0
						}
					})
					this.getlsitData(this.listObj)
				})	
			}
		  },
		  //  换一批
		  handleInbatch() {
            // 换一批
			if (this.recommended.page>=Math.ceil(this.totalNum/5)　) {
				this.recommended.page = 1
			}else {
				this.recommended.page += 1
			}
			this.getDemandDemandteacher()
		  },
		  //  去确认
		  invitationConfirm() {
		    this.recommendedShow = false
			this.getlsitData(this.listObj)
		  },
		  //  去邀请
		  handleInvite() {
			if (this.invitationStatus) {
				this.recommendedShow = true
			} else {
				uni.showToast({
				title: '你已确认邀请',
				icon: "none",
				duration: 2000
			  })
			}  
		  },
		  // 邀请试音
		  handleInvitedAudition(item) {
            demandAdd({teacher_id: item.teacher_id, demand_id: this.demand_id})
			.then((res)=>{
			  uni.showToast({
				title: '谢谢邀请，确认后我会在10分钟内，快速出试音并上传哦',
				icon: "none",
				duration: 2000
			  })
			  this.getDemandDemandteacher()
			  this.getDemandDetailteacher()
			})
			.catch((err)=>{
               uni.showToast({
				title: '每个需求最多可邀请3位试音哦，快点击上方【去确认】吧',
				icon: "none",
				duration: 2000
			  })
			})
		  },
		  // 删除邀请配音师
		  handleDemandDel(item) {
			 demandDel({teacher_id:item.teacher_id,demand_id:this.demand_id}).then((res)=>{
                this.getDemandDemandteacher()
			    this.getDemandDetailteacher()
			 }).catch(err=>{
				 console.log(err)
			 })
		  },
          handleanorPack() {
			  this.anShow = !this.anShow
		  },
		   //  获取列表数据
		  getlsitData(obj) {
	        demandFabulouslist(obj).then((res)=>{
				console.log('获取列表数据',res)
				this.listData = res.data
			})
		     
		  },
		  change(index) {
            this.current = index
			this.listObj.status = index
			this.getlsitData(this.listObj)
		  },
		  handlecloseerPopShow() {
			  this.InvitedPopShow = false
			  this.confirmPopShow = false
		  },
		  handlechangehome() {
			 this.InvitedPopShow = true 
		  },
		  // 价格筛选
		  handlePriceScreening(index) {
			this.activeIndex = index  
			this.recommended.type = index + 1 
			this.getDemandDemandteacher()
		  },
		  //  IM催一催
		  handleRoute(ids) {
			    const id = "C2Cteacher_"+ids
				console.log(ids, id)
				const url = `/subpkg/pages/chatpage/chatpage?conversationID=${id}`;
				uni.navigateTo({
					url
				});
				},
				// 对话列表更新
				onConversationListUpdated(event) {
				this.setData({
					conversationList: event.data
				});
			}, 
		  // IM找TA下单
		  handleTaOrder(ids) {
			const id = "C2Cteacher_"+ids  
            const to = "teacher_"+ids 
            let tagstr = ''
			this.demandProfile.tags.map((item,index)=>{
				if (index===3) {
					tagstr += item.value
				} else {
					tagstr += item.value + '-'
				}
			})
			const message = uni.$TUIKit.createCustomMessage({
				to,
				conversationType: 'C2C',
				payload: {
				    data: 'demand',
					description: this.demandProfile.audition_text,
					// 获取骰子点数
					extension: JSON.stringify({
						audition_text: this.demandProfile.audition_text,
						content: this.demandProfile.content,
						tags: tagstr,
						demand_id: this.demand_id
					})
				}
			});
			this.$sendTIMMessage(message);
			const url = `/subpkg/pages/chatpage/chatpage?conversationID=${id}`;
				uni.navigateTo({
					url
				});
		  },
		  $sendTIMMessage(message) {
			this.$emit('sendMessage', {
				detail: {
				message
				}
			});
			uni.$TUIKit.sendMessage(message)
			this.setData({
				displayFlag: ''
			});
		  },
		  // 音乐播放按钮
		  playTheMusic(orderItem) {
			console.log("传过来的数据", orderItem, this.recommendedData);
			this.audioShow = true;
			if (this.dataPlay.works[0].url === orderItem.works[0].url) {
				this.recommendedData.map((item) => {
				if (this.dataPlay === item) {
					orderItem.works[0].playStatus = !orderItem.works[0].playStatus;
				} else {
					item.works[0].playStatus = false;
				}
				});
				this.beConfirmedData.map((item) => {
				if (this.dataPlay === item) {
					orderItem.works[0].playStatus = !orderItem.works[0].playStatus;
				} else {
					item.works[0].playStatus = false;
				}
				});
				this.listData.map((item) => {
				if (this.dataPlay === item) {
					orderItem.works[0].playStatus = !orderItem.works[0].playStatus;
				} else {
					item.works[0].playStatus = false;
				}
				});

			} else {
				this.recommendedData.map((item) => {
				item.works[0].playStatus = false;
				});
				this.beConfirmedData.map((item) => {
				item.works[0].playStatus = false;
				});
				this.listData.map((item) => {
				item.works[0].playStatus = false;
				});

				orderItem.works[0].playStatus = true;
				this.dataPlay = orderItem;
			}
			setTimeout(() => {
				this.$refs.musicAudio.preStartPlay();
			}, 0);
			},
			handleChangePlay(status) {
				this.recommendedData.map((item) => {
					if (this.dataPlay === item) {
					item.works[0].playStatus = status;
					} else {
					item.works.playStatus = false;
					}
				});
				this.beConfirmedData.map((item) => {
					if (this.dataPlay === item) {
					item.works[0].playStatus = status;
					} else {
					item.works.playStatus = false;
					}
				});
				this.listData.map((item) => {
					if (this.dataPlay === item) {
					item.works[0].playStatus = status;
					} else {
					item.works.playStatus = false;
					}
				});
			},
			musicClose() {
			this.recommendedData.map((item) => {
				item.works[0].playStatus = false;
			});
			this.beConfirmedData.map((item) => {
				item.works[0].playStatus = false;
			});
			this.listData.map((item) => {
				item.works[0].playStatus = false;
			});
			this.audioShow = false;
			this.dataPlay = {
				works: [{
				url: "",
				}],
			};
		  },
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
		}
		}
	}
</script>
<style lang="scss">
.invitationBtn {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	border-radius: 57.971rpx 0px 0px 57.971rpx;
	/* justify-content: space-between; */
	border: none;
	background-color: #FFFFFF;
	padding: 0 !important;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
}
.invitationBtn::after {
  border: none !important;
}
</style>
<style lang="scss">
page {
	height: 100%;
	// overflow: hidden;
	background: #130836;
}
.container {
	position: relative;
	.home_musicSrc_box {
		position: fixed;
		z-index: 999999;
		bottom: 120rpx;
	}
}
.content {
  .head_portrait_box {
  padding: 39.855rpx 27.174rpx 0 27.174rpx;	
  display: flex;	
  .portrait_img_box {
	width: 83.333rpx;  
    .head_portrait_img {
	  width: 83.333rpx;
	  height: 83.333rpx;
	  border-radius: 41.667rpx;
    }
  }
  .nick_name_box {
	 margin-left: 25.362rpx; 
	 width: 100%;
    .nick_name {
		max-width: 80%;
		margin-top: 5.435rpx;
		height: 22px;
		font-size: 16px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 22px;
	}
	.deta_box {
		max-width: 100%;
		margin-top: 5.058rpx;
		height: 17px;
		font-size: 12px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #ADB3D6;
		line-height: 17px;
	}
  }
   }
   .demand_profile {
  padding: 39.855rpx 36.232rpx;	
  margin-top: 34.42rpx;	
  margin-left: 27.174rpx;	
  width: 695.652rpx;
  min-height: 344.203rpx;
  background: #FFFFFF;
  border-radius: 25.362rpx;
  .item_label {
    width: 100%;
	display: flex;
	margin-bottom: 31.174rpx;
	.label {
	  display: flex;
	  align-items: center;	
	  height: 28px;
	  width: 76.087rpx;
	  font-size: 25.362rpx;
	  font-family: PingFangSC-Regular, PingFang SC;
	  font-weight: 400;
	  color: #999999;
	}
	.label_text {
	  width: 76.087rpx;
	  font-size: 25.362rpx;
	  font-family: PingFangSC-Regular, PingFang SC;
	  font-weight: 400;
	  color: #999999;
	}
	.label_value {
		position: relative;
		display: flex;
		width: 100%;
		.profile_tags {
		  display: flex;
		  align-items: center;
		  justify-content: center;
		  padding: 0 22.116rpx;
		  height: 50.725rpx;
		  margin-right: 14.493rpx;
		  background: #F2F2F2;
		  border-radius: 25.362rpx;
		  font-size: 25.362rpx;
		  font-family: PingFangSC-Regular, PingFang SC;
		  font-weight: 400;
		  color: #000000;
		}
		.label_value_text {
			display: inline-block;
			overflow: hidden;
			width: 465.58rpx;
			height: 35.855rpx;
			font-size: 25.362rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #000000;
		}
		.label_value_text_active {
			display: inline-block;
			overflow: hidden;
			width: 465.58rpx;
			// height: 22px;
			font-size: 25.362rpx;
			line-height: 36.232rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #000000;
		}
		.label_anbox {
		  position: absolute;
		  right: 0rpx;	
		  width: 40rpx;	
		  height: 100%;
          .label_an {
			width: 18.116rpx;
			height: 18.116rpx;
		  }
		}
		.download_voices {
			display: flex;
			align-items: center;
			width: 50%;
			.download_icon {
              width: 36.232rpx;
			  height: 36.232rpx;
			}
			.download_text {
				margin-left: 14.493rpx;
				height: 36.232rpx;
				font-size: 25.362rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #000000;
				line-height: 36.232rpx;
			}
		}
	}

  }
  .last_item_label {
	 margin-bottom: 0; 
  }
   }
   .invitation_vico {
	  margin-left: 27.174rpx; 
	  margin-top: 18.116rpx;
	  width: 695.652rpx;
	  height: 615.942rpx;
	  background: #FFFFFF;
	  border-radius: 25.362rpx;
	  .home_title_slogan_box {
		padding-top: 36.232rpx;
		text-align: center;
		.slogan_icon {
		width: 32.609rpx;
		height: 18.116rpx;
		}
		.title_slogan {
		margin: 0 21.739rpx;
		width: 293.478rpx;
		height: 45.29rpx;
		font-size: 32.609rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #000000;
		line-height: 45.29rpx;
		}
		.red_num {
			font-size: 32.609rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #FF445A;
		}
	  }
	  .invitation_card {
		  display: flex;
		  justify-content: space-between;
		  padding: 36.232rpx 36.232rpx 0 36.232rpx;
		  .item_card {
			position: relative;  
			text-align: center;  
            width: 195.652rpx;
			height: 257.246rpx;
			background: #F1F3F7;
			border-radius: 14.493rpx;
			.card_head_portrait {
				margin-left: 36.232rpx;
				margin-top: 21.739rpx;
				width: 123.188rpx;
				height: 123.188rpx;
				position: relative;
				.card_head_img {
				  width: 123.188rpx;
				  height: 123.188rpx;
				  border-radius: 61.594rpx;
				}
				.playActive {
				  position: absolute;
				  left: 38.043rpx;
				  width: 47.101rpx;
				  height: 47.101rpx;
				  bottom: -15rpx;
				}

			}
			.invitation_btn {
				margin-top: 23.551rpx;
				font-size: 25.362rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #FF445A;

			}
			.nick_name {
				width: 90%;
				margin-left: 5%;
				margin-top: 15.058rpx;
				text-align: center;
				height: 36.232rpx;
				font-size: 25.362rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #000000;
				line-height: 36.232rpx;
			}
			.price_num {
				width: 90%;
				margin-left: 5%;
				margin-top: 2.058rpx;
				text-align: center;
				height: 30.797rpx;
				font-size: 21.739rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #999999;
				line-height: 30.797rpx;
			}
			.carddelet_box {
			  position: absolute;
			  right: 0;
			  top: -13rpx;
			  text-align: right;	
			  width: 46.232rpx;	
			  height: 46.232rpx;
              .carddelet {
				width: 25.362rpx;
				height: 25.362rpx;
			  }
			}
		  }
	  }
	  .confirminvitation {
		  margin-top: 43.478rpx;
		  margin-left: 36.232rpx;
		  text-align: center;
		  width: 623.188rpx;
		  height: 90.58rpx;
		  line-height: 90.58rpx;
		  background: #FF445A;
		  border-radius: 45.29rpx;
		  font-size: 32.609rpx;
		  font-family: PingFangSC-Medium, PingFang SC;
		  font-weight: 500;
		  color: #FFFFFF;
	  }
	  .confirminvitation_grey {
		 margin-top: 43.478rpx;
		  margin-left: 36.232rpx;
		  text-align: center;
		  width: 623.188rpx;
		  height: 90.58rpx;
		  line-height: 90.58rpx;
		  background: #F3F4F9;
		  border-radius: 45.29rpx;
		  font-size: 32.609rpx;
		  font-family: PingFangSC-Medium, PingFang SC;
		  font-weight: 500;
		  color: #999999; 
	  }
	  .invitation_process {
		margin-top: 34.42rpx;  
        text-align: center;
		height: 17px;
		font-size: 21.739rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
		line-height: 17px;
	  }
   }
   .sampleVoices {
	   margin-top: 36.232rpx;
	   .itemList_scroll {
	    margin-top: 9.058rpx; 
		.itemList_box {
		    margin-left: 27.174rpx; 
			width: 695.652rpx;
			min-height: 480.072rpx;
			background: #FFFFFF;
			border-radius: 25.362rpx;
			.item_list {
			  padding-top: 36.232rpx;
			  border-bottom: 1px solid #F6F6F6;
			  border-top-left-radius: 25.362rpx;
			  border-top-right-radius: 25.362rpx;
			  // padding-bottom: 36.232rpx;
			  .list_top {
				 padding: 0 36.232rpx; 
				 display: flex;
				 .avatar_bxo {
					 width: 76.087rpx;
					 height: 76.087rpx;
					 .avatar_img {
						width: 76.087rpx;
					    height: 76.087rpx;
						border-radius: 38.043rpx;
					 }
				 }
				 .nickname_box {
				   padding-left: 18.116rpx;	 
					width: 387.681rpx; 
					.nicknamen  {
						display: flex;
						align-items: center;
						width: 362.319rpx;
						height: 39.855rpx;
						font-size: 28.986rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #000000;
						line-height: 39.855rpx;
						.sex_img {
							width: 25.362rpx;
							height: 25.362rpx;
						}
					}
					.price_box {
						margin-top: 5.435rpx;
						height: 30.797rpx;
						font-size: 21.739rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #999999;
						line-height: 30.797rpx;
						.price_text {
							color: #FF445A;
						} 
					}
				}
				.demandQuotation {
					display: flex;
					align-items: center;
				}
			    .invitation_box {
				  .invitation_btn {
					display: flex;  
					align-items: center;
					height: 65.217rpx;
					justify-content: center;  
					width: 159.42rpx;
					background: #FF445A;
					border-radius: 32.609rpx;
					font-size: 25.362rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
				  }
				  .confirmed_btn {
					display: flex;  
					align-items: center;
					height: 65.217rpx;
					justify-content: center;  
					width: 159.42rpx;
					background: #F3F4F9;
					border-radius: 32.609rpx;
					font-size: 25.362rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #000000;
					}
					.successful_btn {
						display: flex;  
						align-items: center;
						height: 65.217rpx;
						justify-content: center;  
						width: 159.42rpx;
						background: #F3F4F9;
						border-radius: 32.609rpx;
						font-size: 25.362rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #999999;
					}
					.apush_btn {
					    display: flex;  
						align-items: center;
						height: 65.217rpx;
						justify-content: center;  
						width: 159.42rpx;
						border: 1px solid #FF445A;
						border-radius: 32.609rpx;
						font-size: 25.362rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #FF445A;	
					}
				}
			  }
			  .list_bottom{
				margin: 30.797rpx 36.232rpx;  
				width: 623.188rpx;
				height: 101.449rpx;
				background: #F1F3F7;
				display: flex;
				align-items: center;
				border-radius: 10.87rpx;
				.play_list {
				  display: flex;
		          align-items: center;	
				  .play_box {
					width: 86.957rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					.play {
					  width: 47.101rpx;
					  height: 47.101rpx;
					}
			       }
			    } 
				.nameWork {
					width: 460.145rpx;
					font-size: 25.362rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #000000;
				}
				.collection_box {
				  display: flex;
				  align-items: center;
				  .collection {
					  width: 39.855rpx;
					  height: 39.855rpx;
				  }
				  .download {
					  width: 32.609rpx;
					  height: 28.986rpx;
				  }
				}
			  }
			}
			.price_item {
			    padding-top: 36.232rpx;
				padding-bottom: 36.232rpx;
				margin-bottom: 54.348rpx;
				background: #FFFFFF;
				border-radius: 25.362rpx;
				display: flex;
				.list_left {
					margin-top: 19.928rpx;
					width: 121.377rpx;
					display: flex;
					align-items: center;
					flex-direction: column;
					.timeLine_icon {
						width: 36.232rpx;
						height: 36.232rpx;
						font-size: 45.29rpx;
						color: #01CFD8;
					}
					.offerPrice {
						margin-top: 3.623rpx;
						width: 54.348rpx;
						height: 25.362rpx;
						font-size: 18.116rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #01CFD8;
						line-height: 25.362rpx;
					}
					.progressLine {
					  margin-top: 10.87rpx;
					  margin-bottom: 10.87rpx;	
					  width: 3.623rpx;
					  height: 233.696rpx;
					  background: #DCDCDC;
					  .progressBar {
						width: 3.623rpx;
						background: #01CFD8;
					  }
					}
					.bepaid_text {
						margin-top: 3.623rpx;
						height: 25.362rpx;
						font-size: 18.116rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #999999;
						line-height: 25.362rpx;
					}
				}
				.list_rigth {
				  .list_top {
					display: flex;
					.avatar_bxo {
						width: 76.087rpx;
						height: 76.087rpx;
						.avatar_img {
						  width: 76.087rpx;
						  height: 76.087rpx;
						  border-radius: 38.043rpx;
						}
					}
					.nickname_box {
					    padding-left: 18.116rpx;	
						display: flex;
						align-items: center; 
						width: 302.536rpx; 
						.nicknamen  {
							display: flex;
							align-items: center;
							width: 284.42rpx;
							height: 39.855rpx;
							font-size: 28.986rpx;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 500;
							color: #000000;
							line-height: 39.855rpx;
							.sex_img {
								width: 25.362rpx;
								height: 25.362rpx;
							}
						}
						.price_box {
							margin-top: 5.435rpx;
							height: 30.797rpx;
							font-size: 21.739rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #999999;
							line-height: 30.797rpx;
							.price_text {
								color: #FF445A;
							} 
						}
					}
					.demandQuotation {
						display: flex;
						align-items: center;
					}
					.contact_Ta_box {
						justify-content: center;
						display: flex;
						align-items: center;
					.contact_Ta {
						justify-content: center;
						display: flex;
						align-items: center;
						width: 159.42rpx;
						height: 65.217rpx;
						background: #FFFFFF;
						border-radius: 32.609rpx;
						border: 1px solid #FF445A;
						font-size: 25.362rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #FF445A;
					}
					}
					.pay_Ta_box {
					  display: flex;
					  align-items: center;
					  justify-content: center;	
					  .pay_Ta {
					  	justify-content: center;
						display: flex;
						align-items: center;
						width: 159.42rpx;
						height: 65.217rpx;
						background: #FF445A;
						border-radius: 32.609rpx;
						border: 1px solid #FF445A;
						font-size: 25.362rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #FFFFFF;
					  }
					}
					.have_pay_Ta_box {
						justify-content: center;
						display: flex;
						align-items: center;
						.have_pay_Ta{
                            justify-content: center;
							display: flex;
							align-items: center;
							width: 159.42rpx;
							height: 65.217rpx;
							background: #CCCCCC;
							border-radius: 32.609rpx;
							font-size: 25.362rpx;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 500;
							color: #FFFFFF;
						}
					}
				  }
				  .order_ontent {
					margin-top: 34.42rpx;  
					width: 538.043rpx;
					height: 137.681rpx;
					background: #F1F3F7;
					border-radius: 7.246rpx;
					padding: 27.174rpx 36.232rpx;
					.order_amount_box {
						.order_amount_title {
							height: 36.232rpx;
							font-size: 25.362rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #000000;
							line-height: 36.232rpx;
						}
						.order_amount {
							height: 36.232rpx;
							font-size: 25.362rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #FF445A;
							line-height: 36.232rpx;
						}
					}
				  }
				  .list_bottom{
					margin-top: 34.42rpx;    
					padding: 27.174rpx 36.232rpx;
					width: 538.043rpx;
					height: 101.449rpx;
					background: #F1F3F7;
					display: flex;
					align-items: center;
					border-radius: 10.87rpx;
					.play_box {
						width: 86.957rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						.play {
						width: 47.101rpx;
						height: 47.101rpx;
						}
					}
					.nameWork {
						width: 460.145rpx;
						font-size: 25.362rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #000000;
					}
					.collection_box {
					  display: flex;
					  align-items: center;	
					.collection {
						width: 39.855rpx;
						height: 39.855rpx;
					}
					.download {
						width: 32.609rpx;
						height: 28.986rpx;
					}
					}
				}
				  .customer {
					  margin-top: 72.464rpx;
				  }
				}
			}
			.item_share_box {
				margin-top: 9.058rpx;
				display: flex;
				align-items: center;
				flex-direction: column;
				justify-content: center;
				.item_share_btn {
					width: 326.087rpx;
					height: 90.58rpx;
					background: #FF445A;
					border-radius: 45.29rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					.share_icon {
						width: 34.42rpx;
						height: 34.42rpx;
					}
					.share_text {
						margin-left: 18.116rpx;
						font-size: 32.609rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #FFFFFF;
					}
				}
				.tips_share {
					margin: 25.362rpx 0;
					width: 177.536rpx;
					height: 36.232rpx;
					font-size: 25.362rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #999999;
					line-height: 36.232rpx;
				}
			}
		}
		.paiditem {
			background: none;
		}
		.temporarily_box {
		  position: relative;	
		  display: flex;
		  align-items: center;
		  justify-content: center; 
		  margin-left: 27.174rpx; 
		  width: 695.652rpx;
		  height: 480.072rpx;
		  background: #FFFFFF;
		  border-radius: 25.362rpx;
          .temporarily_icon {
			  width: 403.986rpx;
			  height: 331.522rpx;
		  }
		  .temporarily_text {
			  position: absolute;
			  width: 100%;
			  top: 342.319rpx;
			  text-align: center;
		  }
	    }
	   }
   }
}
.intelligent_title {
	   width: 750rpx;
	   height: 117.754rpx;
	   display: flex;
	   background: #F2F2F2;
	   align-items: center;
	   border-radius: 25px 25px 0px 0px;
	   padding: 0 36.232rpx;
		.title_img {
			width: 28.986rpx;
			height: 37.855rpx;
		}
	   .title_text {
		  margin-left: 14.493rpx; 
		  width: 481.014rpx;
		  font-size: 28.986rpx;
		  font-family: PingFangSC-Medium, PingFang SC;
		  font-weight: 500;
		  color: #000000;
	   }
	   .confirm_btn {
		   display: flex;
		   align-items: center;
		   justify-content: center;
		   width: 159.42rpx;
		   height: 65.217rpx;
		   border-radius: 32.609rpx;
		   border: 1.812rpx solid #FF445A;
		   font-size: 25.362rpx;
		   font-family: PingFangSC-Medium, PingFang SC;
		   font-weight: 500;
		   color: #FF445A;
		   line-height: 36.232rpx;
	   }
}
.price_screening_box {
  width: 100%;
  padding: 27.174rpx 37rpx;
  display: flex;
  justify-content: space-between;
  .price_item{
	padding: 0 23.551rpx;
	height: 50.725rpx;
	line-height: 50.725rpx;
	background: #F3F4F9;
	border-radius: 25.362rpx;
	font-size: 21.739rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #666666;
  }
  .activeClass {
	background: #FF445A ;
	color: #FFFFFF;
  }
}
.popup_conten {
  .smart_item{
	// margin-left: 36.232rpx;  
	.item_list {
		padding-top: 36.232rpx;
		border-bottom: 1px solid #F6F6F6;
		border-top-left-radius: 25.362rpx;
		border-top-right-radius: 25.362rpx;
	//   padding-bottom: 36.232rpx;
		.list_top {
			padding: 0 36.232rpx; 
			display: flex;
			.avatar_bxo {
				width: 76.087rpx;
				height: 76.087rpx;
				.avatar_img {
				width: 76.087rpx;
				height: 76.087rpx;
				border-radius: 38.043rpx;
				}
			}
			.nickname_box {
			padding-left: 18.116rpx;	 
			width: 442.029rpx;
			.nicknamen  {
				display: flex;
				align-items: center;
				width: 442.029rpx;
				height: 39.855rpx;
				font-size: 28.986rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #000000;
				line-height: 39.855rpx;
				.sex_img {
					width: 25.362rpx;
					height: 25.362rpx;
				}
			}
			.price_box {
				margin-top: 5.435rpx;
				height: 30.797rpx;
				font-size: 21.739rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #999999;
				line-height: 30.797rpx;
				.price_text {
					color: #FF445A;
				} 
			}
		}
		.demandQuotation {
			display: flex;
			align-items: center;
		}
		.invitation_box {
			.invitation_btn {
			display: flex;  
			align-items: center;
			height: 65.217rpx;
			justify-content: center;  
			width: 159.42rpx;
			background: #FF445A;
			border-radius: 32.609rpx;
			font-size: 25.362rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
			}
			.confirmed_btn {
			display: flex;  
			align-items: center;
			height: 65.217rpx;
			justify-content: center;  
			width: 159.42rpx;
			background: #F3F4F9;
			border-radius: 32.609rpx;
			font-size: 25.362rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #000000;
			}
			.successful_btn {
				display: flex;  
				align-items: center;
				height: 65.217rpx;
				justify-content: center;  
				width: 159.42rpx;
				background: #F3F4F9;
				border-radius: 32.609rpx;
				font-size: 25.362rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #999999;
			}
		}
		}
		.list_bottom{
		  margin: 25.362rpx 36.232rpx;  
		  width: 677.536rpx;
		  height: 90.58rpx;
		  background: #F1F3F7;
		  display: flex;
		  align-items: center;
		  border-radius: 10.87rpx;
          .play_list {
		    display: flex;
		    align-items: center;	
          .play_box {
			width: 86.957rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			.play {
				width: 47.101rpx;
				height: 47.101rpx;
			 }
		  }
		  .nameWork {
			width: 460.145rpx;
			font-size: 25.362rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #000000;
		  }
		}
		.collection_box {
			display: flex;
			align-items: center;
			width: 109rpx;
            justify-content: flex-end;
			.collection {
				width: 39.855rpx;
				height: 39.855rpx;
			}
			.download {
				width: 32.609rpx;
				height: 28.986rpx;
			}
		}
		}
	}
	.broder_none {
	  border-bottom: none;
	}
	.loading_view {
		margin-top: 177.536rpx;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		.loading_view_img {
          width: 231.884rpx;
		  height: 231.884rpx;
		}
	}
	.loading_text_box {
		margin-top: 57.971rpx;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		.loading_text {
			text-align: center;
			width: 400.362rpx;
			font-size: 26.362rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #000000;
			text {
				color: #FF445A;
			}
		}
	}
  }	
}
.customer_service_box {
  .customer_content {
	  width: 100%;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  .kefu {
		margin-left: 7.246rpx;  
		margin-right: 7.246rpx;
		width: 23.551rpx;
		height: 23.551rpx;
	  }
	  .customer_title_red {
		  height: 36.232rpx;
		  font-size: 25.362rpx;
		  font-family: PingFangSC-Regular, PingFang SC;
		  font-weight: 400;
		  line-height: 36.232rpx;
		  color: #FF445A;
	  }
	  .customer_title {
		height: 36.232rpx;
		font-size: 25.362rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #999999;
		line-height: 36.232rpx;
	  }

  }	
}
.batch_box {
	margin: 32.609rpx 32.609rpx;
    width: 677.536rpx;
	height: 86.957rpx;
	background: #FF445A;
	border-radius: 24px;
	display: flex;
	align-items: center;
	justify-content: center;
	.batch_img {
		width: 28.986rpx;
		height: 28.986rpx;
		margin-right: 7.246rpx;
	}
	.batch_text {
		font-size: 28.986rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
	}
}
</style>
