<view class="container"><u-navbar vue-id="7f295a2e-1" is-back="{{true}}" title="需求详情" title-size="36.232rpx" title-color="#000000" border-bottom="{{false}}" background="{{background}}" back-icon-color="#000000" custom-back="{{handleGoBack}}" bind:__l="__l"></u-navbar><view class="content"><block qq:if="{{InvitedPopShow}}"><view class="pys_popup"><view class="popup_conent"><image class="closeicon" src="/static/home/close.png" mode="scaleToFill" data-event-opts="{{[['tap',[['handlecloseerPopShow',['$event']]]]]}}" bindtap="__e"></image><view><view style="height:17.971rpx;"></view><view class="check_WeChat_test">确认成品</view><view class="check_WeChat_tips">是否已经收到成品，并且确认成品满意？</view><view class="share_btn_box"><button class="cancelSharebtn" hover-class="button-hover" data-event-opts="{{[['tap',[['handlecloseerPopShow',['$event']]]]]}}" bindtap="__e">取消</button><button data-event-opts="{{[['tap',[['handlefinishedMsg',['$event']]]]]}}" class="sharebtn" bindtap="__e">确认</button></view></view></view></view></block><block qq:if="{{enddemandShow}}"><view class="pys_popup"><view class="popup_conent"><image class="closeicon" src="/static/home/close.png" mode="scaleToFill" data-event-opts="{{[['tap',[['handlecloseerPopShow',['$event']]]]]}}" bindtap="__e"></image><view><view style="height:17.971rpx;"></view><view class="check_WeChat_test">关闭需求</view><view class="check_WeChat_tips">是否关闭需求，关闭后无法再收到试音</view><view class="share_btn_box"><button class="cancelSharebtn" hover-class="button-hover" data-event-opts="{{[['tap',[['handlecloseerPopShow',['$event']]]]]}}" bindtap="__e">取消</button><button data-event-opts="{{[['tap',[['handleenddomanreq',['$event']]]]]}}" class="sharebtn" bindtap="__e">确认</button></view></view></view></view></block><view class="demand_profile"><view class="head_portrait_box"><image class="head_portrait_img" src="{{demandProfile.user.avatar}}" mode="scaleToFill"></image><view class="nick_name u-line-1">{{demandProfile.user.nickname}}</view><text class="deta_title">{{demandProfile.created_at}}</text></view><view class="item_label"><view class="label">类型</view><view class="label_value"><view class="profile_tag"><label class="_span">{{demandProfile.tags[0].value==="不限"?"题材"+demandProfile.tags[0].value:demandProfile.tags[0].value}}</label><label style="margin-left:10rpx;margin-right:10rpx;" class="_span">|</label><block qq:if="{{demandProfile.tags[1].value}}"><label class="_span">{{demandProfile.tags[1].value==="不限"?"性别"+demandProfile.tags[1].value:demandProfile.tags[1].value}}</label></block><block qq:if="{{demandProfile.tags[1].value}}"><label style="margin-left:10rpx;margin-right:10rpx;" class="_span">|</label></block><block qq:if="{{demandProfile.tags[2].value}}"><label class="_span">{{demandProfile.tags[2].value==="不限"?"风格"+demandProfile.tags[2].value:demandProfile.tags[2].value}}</label></block><block qq:if="{{demandProfile.tags[2].value}}"><label style="margin-left:10rpx;margin-right:10rpx;" class="_span">|</label></block><label class="_span">{{demandProfile.draft_word_count+"字"}}</label><block qq:if="{{demandProfile.discuss||demandProfile.budget!=0}}"><label style="margin-left:10rpx;margin-right:10rpx;" class="_span">|</label></block><block qq:if="{{demandProfile.discuss}}"><text style="margin-left:9rpx;">价格商议</text></block><block qq:else><text style="margin-left:9rpx;"><block qq:if="{{demandProfile.budget!=0}}"><text>{{demandProfile.budget+"元"}}</text></block></text></block></view></view></view><view class="item_label"><view class="label_text">要求</view><view class="label_value"><text class="label_value_text_active">{{''+(demandProfile.content||"未输入其他要求")+''}}</text></view></view><view class="item_label" style="margin-top:18.116rpx;"><view class="label_text">文本</view><view class="label_value"><text class="{{[anShow?'label_value_text':'label_value_text_active']}}">{{''+(demandProfile.audition_text||"未输入试音文本")+''}}</text><block qq:if="{{demandProfile.audition_text.length>30}}"><view data-event-opts="{{[['tap',[['handleanorPack',['$event']]]]]}}" class="label_anbox" bindtap="__e"><image class="label_an" src="/static/home/drop-down.png" mode="scaleToFill"></image></view></block></view></view><view class="placeholder_line"></view><view class="item_label last_item_label" style="margin-top:39.855rpx;"><view class="label_text"></view><view class="label_value"><view data-event-opts="{{[['tap',[['downloadcopy',['$0','下载链接已复制，请粘贴到浏览器打开'],['demandProfile.content_url']]]]]}}" class="download_voices" bindtap="__e"><image class="download_icon" src="/static/home/mp3icon.png" mode="scaleToFill"></image><text class="download_text">{{demandProfile.content_url?"下载参考样音":"无参考样音"}}</text></view><view data-event-opts="{{[['tap',[['downloadcopy',['$0','下载链接已复制，请粘贴到浏览器打开'],['demandProfile.audition_url']]]]]}}" class="download_voices" bindtap="__e"><image class="download_icon" src="/static/home/wordicon.png" mode="scaleToFill"></image><text class="download_text">{{demandProfile.audition_url?"下载文本附件":"无文本附件"}}</text></view></view></view><view class="release_btnbox"><block qq:if="{{demandProfile.status===0}}"><view data-event-opts="{{[['tap',[['handleEndDemand',['$event']]]]]}}" class="release_btn" bindtap="__e">关闭需求</view></block><block qq:if="{{demandProfile.status===2}}"><view class="hasended_btn">试音已完成</view></block><block qq:if="{{demandProfile.status===1}}"><view class="hasended_btn">需求已关闭</view></block></view></view><view class="sampleVoices"><view class="divider"><view class="line"></view><view class="text">{{teacher_count+"已上传"}}</view><view class="line"></view></view><scroll-view class="itemList_scroll" scroll-y="{{true}}"><block qq:if="{{listData.length>0}}"><view><block qq:if="{{current==0}}"><view class="itemList_boxnew"><block qq:for="{{listData}}" qq:for-item="itemList" qq:for-index="lsitindex" qq:key="lsitindex"><view class="item_list"><view class="list_top"><view data-event-opts="{{[['tap',[['handleVisitorsJump',['$0'],[[['listData','',lsitindex,'teacher_id']]]]]]]}}" class="avatar_bxo" bindtap="__e"><image class="avatar_img" src="{{itemList.teacher.avatar}}" mode="scaleToFill"></image></view><block qq:if="{{itemList.url==null}}"><view class="nickname_box"><view class="nicknamen u-line-1"><view class="nickname_tetx u-line-1">{{itemList.teacher.nickname}}</view></view></view></block><block qq:if="{{itemList.url!==null}}"><view data-event-opts="{{[['tap',[['handleVisitorsJump',['$0'],[[['listData','',lsitindex,'teacher_id']]]]]]]}}" class="nickname_box" bindtap="__e"><view class="nicknamen u-line-1"><view class="nickname_tetx">{{itemList.teacher.nickname+''}}<label style="margin-left:10rpx;" class="_span">{{itemList.created_at}}</label></view><block qq:if="{{itemList.teacher.sex===1}}"><image class="sex_img" src="/static/teacherlist/manicon.png" mode="scaleToFill"></image></block><block qq:if="{{itemList.teacher.sex===2}}"><image class="sex_img" src="/static/teacherlist/woman.png" mode="scaleToFill"></image></block><block qq:if="{{itemList.teacher.sex===3}}"><image class="sex_img" src="/static/teacherlist/qi.png" mode="scaleToFill"></image></block></view></view></block><view class="red_offer_box"><block qq:if="{{itemList.status===0}}"><view class="red_offer">{{'￥'+itemList.total+''}}</view></block></view></view><view class="list_bottom"><block qq:if="{{itemList.url===null}}"><view class="play_list"><view class="nameWorks" style="margin-left:20rpx;">正在为你试音中<block qq:if="{{itemList.time!==0}}"><text>，上传倒计时</text></block><block qq:if="{{itemList.time!==0}}"><u-count-down class="countdown_num" vue-id="{{'7f295a2e-2-'+lsitindex}}" timestamp="{{itemList.time}}" font-size="25.362" separator-size="25.362" show-hours="{{false}}" bg-color="#F1F3F7" separator-color="#000000" color="#000000" bind:__l="__l"></u-count-down></block></view></view></block><block qq:if="{{itemList.url!==null}}"><view data-event-opts="{{[['tap',[['playTheMusic',['$0'],[[['listData','',lsitindex]]]]]]]}}" class="play_list" bindtap="__e"><view class="play_box"><image class="play" src="{{itemList.playStatus?playActive:play}}" mode="scaleToFill"></image></view><view class="nameWork u-line-1">{{itemList.title}}</view></view></block><block qq:if="{{itemList.status===0}}"><view class="btn_item"><view data-event-opts="{{[['tap',[['handlePlaceOrder',['$0'],[[['listData','',lsitindex]]]]]]]}}" class="voice_btn" bindtap="__e">下单</view><view data-event-opts="{{[['tap',[['handleOperation',['$0'],[[['listData','',lsitindex]]]]]]]}}" class="voice_img_box" bindtap="__e"><image class="voice_img" src="/static/my/caozuo.png" mode="scaleToFill"></image></view></view></block></view></view></block></view></block></view></block><block qq:if="{{countSta==0}}"><view class="auditionTips">若试音都不合适，请联系客服匹配</view></block><block qq:if="{{listData.length===0}}"><view class="temporarily_box"><image class="temporarily_icon" src="/static/demand/defaulticon.png" mode="scaleToFill"></image><view class="temporarily_text">暂无数据</view></view></block><view style="height:80px;"></view></scroll-view></view></view><block qq:if="{{audioShow}}"><view class="home_musicSrc_box disappear"><music-audio class="vue-ref" vue-id="7f295a2e-3" url="{{dataPlay.url}}" autoplay="{{true}}" portrait="{{dataPlay.teacher.avatar}}" music_title="{{dataPlay.title}}" data-ref="musicAudio" data-event-opts="{{[['^handleChangePlay',[['handleChangePlay']]],['^musicClose',[['musicClose']]]]}}" bind:handleChangePlay="__e" bind:musicClose="__e" bind:__l="__l"></music-audio></view></block><u-popup bind:input="__e" vue-id="7f295a2e-4" mode="bottom" height="984.348rpx" border-radius="14" value="{{submitShow}}" data-event-opts="{{[['^input',[['__set_model',['','submitShow','$event',[]]]]]]}}" bind:__l="__l" vue-slots="{{['default']}}"><release class="vue-ref" vue-id="{{('7f295a2e-5')+','+('7f295a2e-4')}}" bottomTitle="{{true}}" data="{{demandProfile}}" subTitle="{{false}}" btnText="确认需求，按试音录制" resBtn="确认" data-ref="submitform" data-event-opts="{{[['^submitShow',[['getsubmitShow']]]]}}" bind:submitShow="__e" bind:__l="__l"></release></u-popup><dropball vue-id="7f295a2e-6" title="联系客服" bind:__l="__l"></dropball><u-popup bind:input="__e" vue-id="7f295a2e-7" mode="bottom" border-radius="24" value="{{collectShow}}" data-event-opts="{{[['^input',[['__set_model',['','collectShow','$event',[]]]]]]}}" bind:__l="__l" vue-slots="{{['default']}}"><view data-event-opts="{{[['tap',[['downloadcopy',['$0','下载链接已复制，请粘贴到浏览器打开'],['operationItem.url']]]]]}}" class="collect_item" bindtap="__e"><image class="collection" src="/static/teacherlist/download.png" mode="scaleToFill"></image><view class="collect_text">下载</view></view><view data-event-opts="{{[['tap',[['hanldeCancelcoll',['$event']]]]]}}" class="collect_item_btn" bindtap="__e">取消</view></u-popup></view>