<view class="data-v-6bc8736e"><view class="teacherlist_box data-v-6bc8736e"><u-navbar vue-id="6bc89ada-1" is-back="{{true}}" title="影人工具大全" title-size="36.232rpx" title-color="#000000" class="data-v-6bc8736e" bind:__l="__l"></u-navbar><view class="wrap data-v-6bc8736e"><view class="u-tabs-box data-v-6bc8736e"><u-tabs vue-id="6bc89ada-2" activeColor="#FF445A" bold="{{true}}" bg-color="#FFFFFF" inactive-color="#666666" bar-style="{{barStyle}}" name="title" list="{{list}}" current="{{current}}" is-scroll="{{true}}" font-size="28.362" data-ref="tabs" data-event-opts="{{[['^change',[['change']]]]}}" bind:change="__e" class="data-v-6bc8736e vue-ref" bind:__l="__l"></u-tabs></view><scroll-view style="height:100%;width:100%;" scroll-y="{{true}}" scroll-top="{{scrollInto}}" refresher-triggered="{{triggered}}" data-event-opts="{{[['scroll',[['tabScoll',['$event']]]],['scrolltolower',[['reachBottom',['$event']]]]]}}" bindscroll="__e" bindscrolltolower="__e" class="data-v-6bc8736e"><block qq:if="{{defaultshow}}"><view class="page-box data-v-6bc8736e"><block qq:for="{{dataList}}" qq:for-item="orderItem" qq:for-index="index" qq:key="index"><view class="teacherOrder data-v-6bc8736e" id="{{'wrap'+index}}"><view class="list_title_box data-v-6bc8736e"><image class="title_icon data-v-6bc8736e" src="/static/home/found.png" mode="scaleToFill"></image><text class="title_text data-v-6bc8736e">{{orderItem.name}}</text></view><view class="list_item_box data-v-6bc8736e"><block qq:for="{{orderItem.msg}}" qq:for-item="item" qq:for-index="__i0__" qq:key="id"><view class="list_item data-v-6bc8736e"><view class="item_logo_box data-v-6bc8736e"><image class="item_logo data-v-6bc8736e" src="{{item.head_img}}" mode="scaleToFill"></image></view><view data-event-opts="{{[['tap',[['handleCheckWeb',['$0'],[[['dataList','',index],['msg','id',item.id,'url']]]]]]]}}" class="item_webName_box data-v-6bc8736e" bindtap="__e"><view class="webName u-line-1 data-v-6bc8736e">{{item.title}}</view><view class="website_box data-v-6bc8736e"><text class="website u-line-1 data-v-6bc8736e">{{''+item.content+''}}</text></view></view></view></block></view></view></block></view></block><block qq:if="{{!defaultshow}}"><view class="page-box data-v-6bc8736e"><view class="defaltPage data-v-6bc8736e"><view class="defaltext data-v-6bc8736e">暂时没有匹配数据</view></view></view></block><view style="height:90%;" class="data-v-6bc8736e"></view></scroll-view></view></view></view>