<view class="container data-v-04d07f86"><u-navbar vue-id="04d06bd0-1" is-back="{{false}}" title="配音师库" title-size="36.232rpx" border-bottom="{{false}}" title-color="#000000" class="data-v-04d07f86" bind:__l="__l"></u-navbar><view class="content data-v-04d07f86"><block qq:if="{{rukuShow}}"><view class="pys_popup data-v-04d07f86"><view class="popup_conent data-v-04d07f86"><image class="closeicon data-v-04d07f86" src="/static/home/close.png" mode="scaleToFill" data-event-opts="{{[['tap',[['handlecloseerweima',['$event']]]]]}}" bindtap="__e"></image><view class="erweimabox data-v-04d07f86"><view class="erweima_iconbox data-v-04d07f86"><image class="erweima_icon data-v-04d07f86" src="https://www.peiyinstreet.com/guidang/peiyinguwen.png" mode="scaleToFill"></image></view><view class="erweima_box data-v-04d07f86">截图加我微信，极速帮您试音</view></view></view></view></block><block qq:if="{{notputShow}}"><view class="pys_popup data-v-04d07f86"><view class="popup_conent data-v-04d07f86"><image class="closeicon data-v-04d07f86" src="/static/home/close.png" mode="scaleToFill" data-event-opts="{{[['tap',[['handlecloseerweima',['$event']]]]]}}" bindtap="__e"></image><view class="data-v-04d07f86"><view style="height:17.971rpx;" class="data-v-04d07f86"></view><view class="check_WeChat_test data-v-04d07f86">申请入库</view><view class="check_WeChat_tips data-v-04d07f86">创建名片后即可免费加入中国配音师库</view><view class="share_btn_box data-v-04d07f86"><button class="cancelSharebtn data-v-04d07f86" hover-class="button-hover" data-event-opts="{{[['tap',[['handlecloseerweima',['$event']]]]]}}" bindtap="__e">我再想想</button><button data-event-opts="{{[['tap',[['handlechangehome',['$event']]]]]}}" class="sharebtn data-v-04d07f86" bindtap="__e">立即创建</button></view></view></view></view></block><view data-event-opts="{{[['tap',[['handleCheckWeb',['$event']]]]]}}" class="count_box data-v-04d07f86" bindtap="__e"><image class="count_box_img data-v-04d07f86" src="https://www.peiyinstreet.com/guidang/peiyinshiku.png" mode="scaleToFill"></image></view><block qq:for="{{dataList}}" qq:for-item="typeItem" qq:for-index="index" qq:key="index"><view class="home_swiper_list data-v-04d07f86"><view data-event-opts="{{[['tap',[['handleVoicelist',['$0','$1'],[[['dataList','',index]],[['dataList','',index,'list.title']]]]]]]}}" class="type_name data-v-04d07f86" bindtap="__e"><view class="type_title data-v-04d07f86"><text class="data-v-04d07f86">{{typeItem.list.title}}</text><text class="data-v-04d07f86">{{"("+typeItem.list.count+"人)"}}</text></view><view class="look_all data-v-04d07f86"><view class="all_text data-v-04d07f86">全部</view><image class="arrorRight data-v-04d07f86" src="/static/home/arrorRight2.png" mode="scaleToFill"></image></view></view><swiper class="swiper_item_box data-v-04d07f86" style="height:268.116rpx;" display-multiple-items="{{typeItem.data.length>=2?3:1}}" acceleration="{{true}}" previous-margin="27.174rpx" next-margin="15.174rpx"><block qq:for="{{typeItem.data}}" qq:for-item="lsitItem" qq:for-index="indexs" qq:key="indexs"><swiper-item class="swiper_item data-v-04d07f86"><view class="swiper_item_list data-v-04d07f86"><view data-event-opts="{{[['tap',[['playTheMusic',['$0','$1'],[[['dataList','',index],['data','',indexs]],[['dataList','',index,'data']]]]]]]}}" class="card_content data-v-04d07f86" bindtap="__e"><image class="portrait_img data-v-04d07f86" src="{{lsitItem.teacher.avatar}}" mode="scaleToFill"></image><image class="home_play data-v-04d07f86" src="{{lsitItem.works.playStatus?playActive:play}}" mode="scaleToFill"></image><view class="head_portrait_meng data-v-04d07f86"></view></view><view data-event-opts="{{[['tap',[['handleVisitorsJump',['$0'],[[['dataList','',index],['data','',indexs]]]]]]]}}" class="card_dibu data-v-04d07f86" bindtap="__e"><view class="nick_name data-v-04d07f86"><text class="nick_name_text u-line-1 data-v-04d07f86">{{lsitItem.teacher.nickname}}</text><block qq:if="{{lsitItem.teacher.sex===1}}"><image class="sex data-v-04d07f86" src="/static/teacherlist/manicon.png" mode="scaleToFill"></image></block><block qq:else><block qq:if="{{lsitItem.teacher.sex===2}}"><image class="sex data-v-04d07f86" src="/static/teacherlist/woman.png" mode="scaleToFill"></image></block><block qq:else><block qq:if="{{lsitItem.teacher.sex===3}}"><image class="sex data-v-04d07f86" src="/static/teacherlist/qi.png" mode="scaleToFill"></image></block></block></block></view><view class="home_portrait data-v-04d07f86"><text class="zuopin data-v-04d07f86">{{"作品 "+lsitItem.teacher.work_count}}</text><text class="bofang data-v-04d07f86">{{"播放 "+lsitItem.teacher.browse_count}}</text></view></view></view></swiper-item></block></swiper></view></block><view style="height:80px;" class="data-v-04d07f86"></view></view><view class="footer_prompt data-v-04d07f86"><button class="invitationBtn data-v-04d07f86" id="shou" open-type="share"><view class="footer_dianzhan_icon data-v-04d07f86"><image class="give_like_icon data-v-04d07f86" src="/static/home/dianzhanActive.png" mode="scaleToFill"></image><text class="give_like_text data-v-04d07f86">推荐库给好友</text></view><view class="travel_to_box data-v-04d07f86"><text class="travel_to_text data-v-04d07f86">致力打造：中国权威专业的声音库大全</text><image class="travel_to_img data-v-04d07f86" src="/static/home/arrorRight.png" mode="scaleToFill"></image></view></button></view><view data-event-opts="{{[['tap',[['handleruku',['$event']]]]]}}" class="lianxikefu data-v-04d07f86" bindtap="__e"><view class="service_box data-v-04d07f86"><image class="service_icon data-v-04d07f86" src="/static/home/kefu.png" mode="scaleToFill"></image><text class="lianxikefu_text data-v-04d07f86">配音顾问</text></view></view><block qq:if="{{audioShow}}"><view class="home_musicSrc_box disappear data-v-04d07f86"><music-audio vue-id="04d06bd0-2" url="{{dataPlay.works.url}}" autoplay="{{true}}" portrait="{{dataPlay.teacher.avatar}}" music_title="{{dataPlay.works.title}}" data-ref="musicAudio" data-event-opts="{{[['^handleChangePlay',[['handleChangePlay']]],['^musicClose',[['musicClose']]]]}}" bind:handleChangePlay="__e" bind:musicClose="__e" class="data-v-04d07f86 vue-ref" bind:__l="__l"></music-audio></view></block><block qq:if="{{securitiesShow}}"><view class="securities data-v-04d07f86"><image class="shutdown_icon data-v-04d07f86" src="../../static/coupons/shutdown.png" mode="scaleToFill" data-event-opts="{{[['tap',[['handlecloseCollection',['$event']]]]]}}" bindtap="__e"></image><image class="volume data-v-04d07f86" src="https://www.peiyinstreet.com/guidang/Volume.png" mode="scaleToFill" data-event-opts="{{[['tap',[['handleCouponCollection',['$event']]]]]}}" bindtap="__e"></image></view></block><block qq:if="{{couponsShow}}"><view data-event-opts="{{[['tap',[['handlecloseCoupons',['$event']]]]]}}" class="masklayer data-v-04d07f86" catchtap="__e"><view class="coupons_box data-v-04d07f86"><image class="shutdown_icon data-v-04d07f86" src="../../static/coupons/shutdownC.png" mode="scaleToFill" data-event-opts="{{[['tap',[['handlecloseCoupons',['$event']]]]]}}" bindtap="__e"></image><image class="coupons_icon data-v-04d07f86" src="https://www.peiyinstreet.com/guidang/coupons.png" mode="scaleToFill" data-event-opts="{{[['tap',[['handlecloseCoupons',['$event']]]]]}}" bindtap="__e"></image><view class="coupons_content data-v-04d07f86"><view class="discount_box data-v-04d07f86"><view class="discount data-v-04d07f86">{{couponsData.price+"折"}}</view><view class="scope_discount data-v-04d07f86">无门槛</view></view><view class="discounts_box data-v-04d07f86"><view class="discounts_ins data-v-04d07f86">{{couponsData.rule}}</view><view class="discounts_validity data-v-04d07f86">有效期5天</view></view></view></view></view></block></view>