<view class="container data-v-d8cf398c"><u-navbar vue-id="d8cf60f8-1" is-back="{{true}}" title="{{dataList.nickname?dataList.nickname+'的主页':'主页'}}" title-size="36.232rpx" title-color="#FFFFFF" border-bottom="{{false}}" background="{{background}}" back-icon-color="#FFFFFF" custom-back="{{handleGoBack}}" class="data-v-d8cf398c" bind:__l="__l"></u-navbar><view class="container_box data-v-d8cf398c"><block qq:if="{{sharePopShow}}"><view class="pys_popup data-v-d8cf398c"><view class="popup_conent data-v-d8cf398c"><image class="closeicon data-v-d8cf398c" src="/static/home/close.png" mode="scaleToFill" data-event-opts="{{[['tap',[['handleCanceShare',['$event']]]]]}}" bindtap="__e"></image><view class="data-v-d8cf398c"><view style="height:17.971rpx;" class="data-v-d8cf398c"></view><view class="check_WeChat_test data-v-d8cf398c">申请加入</view><view class="check_WeChat_tips data-v-d8cf398c">分享小程序后，即可查看配音师微信</view><view class="share_btn_box data-v-d8cf398c"><button class="cancelSharebtn data-v-d8cf398c" hover-class="button-hover" open-type="share">分享好友</button><button class="sharebtn data-v-d8cf398c" open-type="share" hover-class="button-hover">分享到群</button></view></view></view></view></block><block qq:if="{{erweimaShow}}"><view class="pys_popup data-v-d8cf398c"><view class="popup_conent data-v-d8cf398c"><image class="closeicon data-v-d8cf398c" src="/static/home/close.png" mode="scaleToFill" data-event-opts="{{[['tap',[['handleCanceShare',['$event']]]]]}}" bindtap="__e"></image><view class="erweimabox data-v-d8cf398c"><view class="erweima_iconbox data-v-d8cf398c"><image class="erweima_icon data-v-d8cf398c" src="https://www.peiyinstreet.com/guidang/peiyinguwen.png" mode="scaleToFill"></image></view><view class="erweima_box data-v-d8cf398c">截图加我微信，极速帮您试音</view></view></view></view></block><view class="banner data-v-d8cf398c"></view><view class="content data-v-d8cf398c"><view class="business_card data-v-d8cf398c"><view class="head_portrait data-v-d8cf398c"><view class="head_portraitimg_box data-v-d8cf398c"><image class="head_portraitimg data-v-d8cf398c" src="{{dataList.avatar}}" mode="scaleToFill"></image><block qq:if="{{dataList.sex===1}}"><image class="sex_icon data-v-d8cf398c" src="/static/teacherlist/manicon.png" mode="scaleToFill"></image></block><block qq:else><block qq:if="{{dataList.sex===2}}"><image class="sex_icon data-v-d8cf398c" src="/static/teacherlist/woman.png" mode="scaleToFill"></image></block><block qq:else><image class="sex_icon data-v-d8cf398c" src="/static/teacherlist/qi.png" mode="scaleToFill"></image></block></block></view></view><view class="nick_namebox data-v-d8cf398c"><view class="nick_name u-line-1 data-v-d8cf398c">{{''+(dataList.nickname||'')+''}}</view><block qq:if="{{dataList.follow===0}}"><view data-event-opts="{{[['tap',[['handleFocus',['$0',0],['dataList.id']]]]]}}" class="focus data-v-d8cf398c" bindtap="__e"><text class="data-v-d8cf398c">关注</text></view></block><block qq:if="{{dataList.follow===1}}"><view data-event-opts="{{[['tap',[['handleFocus',['$0',1],['dataList.id']]]]]}}" class="beenFocused data-v-d8cf398c" bindtap="__e">已关注</view></block></view><view class="personalFile data-v-d8cf398c"><view class="personal_list data-v-d8cf398c"><view class="personal_title data-v-d8cf398c">擅长</view><view class="personal_content data-v-d8cf398c"><block qq:for="{{dataList.theme}}" qq:for-item="item" qq:for-index="index" qq:key="index"><view class="data-v-d8cf398c"><block qq:if="{{item.type_id==2}}"><text class="data-v-d8cf398c">{{item.value}}</text></block><block qq:if="{{dataList.theme.length-1!==index}}"><view class="divider_line data-v-d8cf398c"></view></block></view></block></view></view><view class="personal_list data-v-d8cf398c"><view class="personal_title data-v-d8cf398c">风格</view><view class="personal_content data-v-d8cf398c"><block qq:for="{{dataList.style}}" qq:for-item="item" qq:for-index="index" qq:key="index"><view class="data-v-d8cf398c"><text class="data-v-d8cf398c">{{item.value}}</text><block qq:if="{{dataList.style.length-1!==index}}"><view class="divider_line data-v-d8cf398c"></view></block></view></block></view></view><view class="personal_list data-v-d8cf398c"><view class="personal_title data-v-d8cf398c">地区</view><view class="personal_content data-v-d8cf398c"><text class="data-v-d8cf398c">{{dataList.district||""}}</text></view></view></view></view><view class="business_data data-v-d8cf398c"><view class="business_data_title data-v-d8cf398c"><view class="title_data data-v-d8cf398c">简介信息</view></view><view class="data_content_introduction data-v-d8cf398c"><view class="introduction_text data-v-d8cf398c"><view class="{{['introduction_text_an','data-v-d8cf398c',moreShow?'u-line-1':'']}}">{{dataList.intro}}</view><view data-event-opts="{{[['tap',[['handleTakeBack',['$event']]]]]}}" class="handlean_box data-v-d8cf398c" bindtap="__e"><image class="handlean data-v-d8cf398c" src="/static/carddetails/an.png" mode="scaleToFill"></image></view></view><view class="tages_list_box data-v-d8cf398c"><block qq:for="{{itemList}}" qq:for-item="item" qq:for-index="index" qq:key="index"><view data-event-opts="{{[['tap',[['handleClick',[index,'$0'],[[['itemList','',index]]]]]]]}}" class="tages_list data-v-d8cf398c" bindtap="__e"><block qq:if="{{giveIndex===index}}"><view class="animate-wrap data-v-d8cf398c"><block qq:for="{{viewList}}" qq:for-item="item" qq:for-index="index" qq:key="index"><view class="{{['aa','data-v-d8cf398c',(item.index)?'bb':'']}}"><image style="width:30rpx;height:30rpx;" mode="widthFix" src="{{item.src}}" animation="{{item.animationData}}" class="data-v-d8cf398c"></image></view></block></view></block><image class="tages_list_img data-v-d8cf398c" src="/static/home/dianzhanActive.png" mode="scaleToFill"></image><text class="tages_list_conten data-v-d8cf398c">{{item.name}}</text><text class="tages_list_num data-v-d8cf398c">{{item.count}}</text></view></block></view></view></view><view class="business_data data-v-d8cf398c"><view class="business_data_title data-v-d8cf398c"><view class="title_data data-v-d8cf398c">我的服务<block qq:if="{{dataList.price_text==1}}"><text class="price_text data-v-d8cf398c">（限时价优惠中）</text></block></view></view><view class="data_content data-v-d8cf398c"><block qq:if="{{!addbtnShow}}"><view class="list_worksbox data-v-d8cf398c"><view class="u-tabs-box data-v-d8cf398c"><my-tabs vue-id="d8cf60f8-2" activeColor="#000000" bold="{{true}}" bg-color="#FFFFFF" inactive-color="#999999" bar-style="{{barStyle}}" name="title" is-scroll="{{true}}" list="{{tabsItem}}" current="{{current}}" font-size="28.362" data-ref="tabs" data-event-opts="{{[['^change',[['change']]]]}}" bind:change="__e" class="data-v-d8cf398c vue-ref" bind:__l="__l"></my-tabs></view><scroll-view style="height:100%;width:100%;" scroll-y="{{true}}" refresher-triggered="{{triggered}}" class="data-v-d8cf398c"><block qq:if="{{defaultshow}}"><view class="works_item_list_box data-v-d8cf398c"><block qq:for="{{tabsList[current].works}}" qq:for-item="item" qq:for-index="index" qq:key="index"><view class="works_item_list data-v-d8cf398c"><view data-event-opts="{{[['tap',[['playTheMusic',['$0'],[[['tabsList.'+current+'.works','',index]]]]]]]}}" class="list_item_paly data-v-d8cf398c" bindtap="__e"><image class="paly_icon data-v-d8cf398c" src="{{item.playStatus?playActive:play}}" mode="scaleToFill"></image><text class="works_title u-line-1 data-v-d8cf398c">{{item.title}}</text></view><view class="btn_item data-v-d8cf398c"><block qq:if="{{order_status==0}}"><view data-event-opts="{{[['tap',[['handlefirstTimeUseOrder',['$0'],[[['tabsList.'+current+'.works','',index]]]]]]]}}" class="voice_btn data-v-d8cf398c" bindtap="__e">下单</view></block><block qq:else><view data-event-opts="{{[['tap',[['handleUseOrder',['$0'],[[['tabsList.'+current+'.works','',index]]]]]]]}}" class="voice_btn data-v-d8cf398c" bindtap="__e">下单</view></block><view data-event-opts="{{[['tap',[['handleOperation',['$0'],[[['tabsList.'+current+'.works','',index]]]]]]]}}" class="voice_img_box data-v-d8cf398c" bindtap="__e"><image class="voice_img data-v-d8cf398c" src="/static/my/caozuo.png" mode="scaleToFill"></image></view></view></view></block></view></block><block qq:if="{{!defaultshow}}"><view class="page-box data-v-d8cf398c"><view class="defaltPage data-v-d8cf398c"><view class="defaltext data-v-d8cf398c">暂无匹配数据</view></view></view></block></scroll-view></view></block><block qq:if="{{addbtnShow}}"><view class="emptydata data-v-d8cf398c"><image class="emptydataimg data-v-d8cf398c" src="/static/carddetails/emptydata.png" mode="scaleToFill"></image><view class="emptydatatext data-v-d8cf398c">暂无数据</view></view></block></view></view><block qq:if="{{caseData.length!==0}}"><view class="business_data data-v-d8cf398c"><view class="business_data_title data-v-d8cf398c"><view class="title_data data-v-d8cf398c">成品案例</view></view><view class="data_content data-v-d8cf398c" style="padding:0px;"><block qq:if="{{!addbtnShow}}"><view class="list_worksbox data-v-d8cf398c"><scroll-view style="height:100%;width:100%;" scroll-y="{{true}}" refresher-triggered="{{triggered}}" class="data-v-d8cf398c"><block qq:for="{{caseData}}" qq:for-item="item" qq:for-index="index" qq:key="index"><view data-event-opts="{{[['tap',[['handlecaseDetails',['$0'],[[['caseData','',index]]]]]]]}}" class="{{['video_item','data-v-d8cf398c',(caseData.length-1==index)?'dd':'']}}" bindtap="__e"><view class="video_box data-v-d8cf398c"><view class="video_label data-v-d8cf398c">{{item.tags[0].value}}</view><image class="video_cover data-v-d8cf398c" src="{{item.head_img}}" mode="scaleToFill"></image><view class="video_palybox data-v-d8cf398c"><view class="video_paly data-v-d8cf398c"><image class="video_icon data-v-d8cf398c" src="/static/anli/anliplay.png" mode="scaleToFill"></image><label class="play_Num _span data-v-d8cf398c">{{item.play_num}}</label></view><view class="broadcasttime data-v-d8cf398c">{{item.works[0].time}}</view></view></view><view class="video_desc data-v-d8cf398c"><view class="video_title u-line-1 data-v-d8cf398c">{{item.works[0].title}}</view><view class="video_style u-line-1 data-v-d8cf398c">{{item.title}}</view><view class="video_by data-v-d8cf398c"><label class="video_name u-line-1 _span data-v-d8cf398c">{{item.created_at}}</label></view></view></view></block><block qq:if="{{!defaultshow}}"><view class="page-box data-v-d8cf398c"><view class="defaltPage data-v-d8cf398c"><view class="defaltext data-v-d8cf398c">暂无匹配数据</view></view></view></block></scroll-view></view></block><block qq:if="{{addbtnShow}}"><view class="emptydata data-v-d8cf398c"><image class="emptydataimg data-v-d8cf398c" src="/static/carddetails/emptydata.png" mode="scaleToFill"></image><view class="emptydatatext data-v-d8cf398c">暂无数据</view></view></block></view></view></block></view><view style="height:90px;" class="data-v-d8cf398c"></view><block qq:if="{{audioShow}}"><view class="home_musicSrc_box disappear data-v-d8cf398c"><music-audio vue-id="d8cf60f8-3" url="{{dataPlay.url}}" autoplay="{{true}}" portrait="{{dataList.avatar}}" music_title="{{dataPlay.title}}" data-ref="musicAudio" data-event-opts="{{[['^handleChangePlay',[['handleChangePlay']]],['^musicClose',[['musicClose']]]]}}" bind:handleChangePlay="__e" bind:musicClose="__e" class="data-v-d8cf398c vue-ref" bind:__l="__l"></music-audio></view></block></view><u-popup bind:input="__e" vue-id="d8cf60f8-4" mode="bottom" height="1084.348rpx" border-radius="24" value="{{submitShow}}" data-event-opts="{{[['^input',[['__set_model',['','submitShow','$event',[]]]]]]}}" class="data-v-d8cf398c" bind:__l="__l" vue-slots="{{['default']}}"><release vue-id="{{('d8cf60f8-5')+','+('d8cf60f8-4')}}" bottomTitle="{{true}}" data="{{dataObj}}" subTitle="{{false}}" srstatus="{{true}}" btnText="{{btnText}}" data-ref="submitform" data-event-opts="{{[['^submitShow',[['getsubmitShow']]]]}}" bind:submitShow="__e" class="data-v-d8cf398c vue-ref" bind:__l="__l"></release></u-popup><u-popup bind:input="__e" vue-id="d8cf60f8-6" mode="bottom" border-radius="24" value="{{collectShow}}" data-event-opts="{{[['^input',[['__set_model',['','collectShow','$event',[]]]]]]}}" class="data-v-d8cf398c" bind:__l="__l" vue-slots="{{['default']}}"><view data-event-opts="{{[['tap',[['handleCollectStatus',['$event']]]]]}}" class="collect_item data-v-d8cf398c" bindtap="__e"><image class="collection data-v-d8cf398c" src="{{operationItem.work_type===0?shouchang:yishouchang}}" mode="scaleToFill"></image><view class="{{['data-v-d8cf398c',operationItem.work_type===0?'collect_text':'redcollect_text']}}">{{operationItem.work_type===0?'收藏':'已收藏'}}</view></view><view data-event-opts="{{[['tap',[['downloadcopy',['$0','下载链接已复制，请粘贴到浏览器打开'],['operationItem.url']]]]]}}" class="collect_item data-v-d8cf398c" bindtap="__e"><image class="collection data-v-d8cf398c" src="/static/teacherlist/download.png" mode="scaleToFill"></image><view class="collect_text data-v-d8cf398c">下载</view></view><view data-event-opts="{{[['tap',[['hanldeCancelcoll',['$event']]]]]}}" class="collect_item_btn data-v-d8cf398c" bindtap="__e">取消</view></u-popup><dropball vue-id="d8cf60f8-7" title="找我试音" class="data-v-d8cf398c" bind:__l="__l"></dropball><block qq:if="{{orderPromptShow}}"><view class="masklayer data-v-d8cf398c"><view class="coupons_box data-v-d8cf398c"><image class="shutdown_icon data-v-d8cf398c" src="/static/coupons/shutdownC.png" mode="scaleToFill" data-event-opts="{{[['tap',[['handlecloseCoupons',['$event']]]]]}}" bindtap="__e"></image><image class="coupons_icon data-v-d8cf398c" src="/static/img/orderpro.png" mode="scaleToFill"></image><view class="coupons_content data-v-d8cf398c"><view class="content_text data-v-d8cf398c"><view class="text data-v-d8cf398c">1、更快速：交付速度翻倍</view><view class="text data-v-d8cf398c">2、更便捷：告别频繁沟通</view><view class="text data-v-d8cf398c">3、更省钱：成本价上再9折</view><view class="text data-v-d8cf398c">4、质量保障：所听即所得</view><view class="text data-v-d8cf398c">5、售后无忧：一对一修改补录</view></view><view data-event-opts="{{[['tap',[['handlejupumUseOrder',['$event']]]]]}}" class="know_btn data-v-d8cf398c" bindtap="__e">我知道了</view></view></view></view></block></view>