<view class="container"><u-navbar vue-id="1583f8ce-1" is-back="{{true}}" title="{{nav_title}}" title-size="36.232rpx" title-color="#000000" border-bottom="{{true}}" custom-back="{{handleGoBack}}" bind:__l="__l"></u-navbar><view class="content"><view class="video_component"><view class="video_palybox"><video class="video_paly" id="myVideo" src="{{caseDetailData.works[0].url}}" autoplay="{{true}}" show-center-play-btn="{{false}}" show-loading="{{true}}" object-fit="fill" controls="{{true}}" data-event-opts="{{[['error',[['videoErrorCallback',['$event']]]]]}}" binderror="__e"></video></view><view class="video_title u-line-1">{{caseDetailData.works[0].title}}</view><view class="video_title_style"><label class="u-line-1 _span">{{caseDetailData.title}}</label><label class="_span">{{caseDetailData.created_at}}</label></view><view class="video_operation"><view class="video_paly_number _div"><image class="paly_icon" src="/static/img/video_play.png" mode="scaleToFill"></image><label class="nuber_text _span">{{caseDetailData.play_num}}</label></view><view data-event-opts="{{[['tap',[['handleCasecollection',['$0'],['caseDetailData']]]]]}}" class="video_paly_number _div" bindtap="__e"><image class="paly_icon shouchang" src="{{caseDetailData.case_collection===1?anlisc:anliwsc}}" mode="scaleToFill"></image><label class="nuber_text _span">{{caseDetailData.collection_num}}</label></view><view class="video_paly_number _div"><button class="sharebtn" open-type="share" hover-class="button-hover"><image class="paly_icon shouchang" src="/static/anli/anlishare.png" mode="scaleToFill"></image><label class="nuber_text _span">分享</label></button></view></view><view data-event-opts="{{[['tap',[['handleVisitorsJump',['$0'],['caseDetailData']]]]]}}" class="video_by_data" catchtap="__e"><view class="video_by"><image class="video_by_portrait" src="{{caseDetailData.teacher.avatar}}" mode="scaleToFill"></image><label class="video_by_name _span">{{"配音："+caseDetailData.teacher.nickname}}</label></view><view class="cooperation_btn">找他配音</view></view></view><view class="recommend_case"><view class="item_title">相似案例</view><view><block qq:for="{{recommendCaseData}}" qq:for-item="recitem" qq:for-index="index" qq:key="index"><view data-event-opts="{{[['tap',[['handlecaseDetails',['$0'],[[['recommendCaseData','',index]]]]]]]}}" class="{{['video_item',(recommendCaseData.length-1==index)?'dd':'']}}" bindtap="__e"><view class="video_box"><view class="video_label">{{recitem.tags[0].value}}</view><image class="video_cover" src="{{recitem.head_img}}" mode="scaleToFill"></image><view class="video_palybox"><view class="video_paly"><image class="video_icon" src="/static/anli/anliplay.png" mode="scaleToFill"></image><label class="play_Num _span">{{recitem.play_num}}</label></view><view class="broadcasttime">{{recitem.works[0].time}}</view></view></view><view class="video_desc"><view class="video_title u-line-1">{{recitem.works[0].title}}</view><view class="video_style u-line-1">{{recitem.title}}</view><view data-event-opts="{{[['tap',[['handleVisitorsJump',['$0'],[[['recommendCaseData','',index]]]]]]]}}" class="video_by" catchtap="__e"><image class="video_icon" src="{{recitem.teacher.avatar}}" mode="scaleToFill"></image><label class="video_name u-line-1 _span">{{"配音："+recitem.teacher.nickname}}</label></view></view></view></block></view></view><view style="height:398.551rpx;"></view></view></view>