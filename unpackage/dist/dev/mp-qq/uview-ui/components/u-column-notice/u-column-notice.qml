<view class="{{['u-notice-bar','data-v-475fdbf0',type?'u-type-'+type+'-light-bg':'']}}" style="{{'background:'+(computeBgColor)+';'+('padding:'+(padding)+';')}}"><view class="u-icon-wrap data-v-475fdbf0"><block qq:if="{{volumeIcon}}"><u-icon class="u-left-icon data-v-475fdbf0" vue-id="475fc83a-1" name="volume-fill" size="{{volumeSize}}" color="{{computeColor}}" bind:__l="__l"></u-icon></block></view><swiper class="u-swiper data-v-475fdbf0" disable-touch="{{disableTouch}}" autoplay="{{autoplay&&playState=='play'}}" vertical="{{vertical}}" circular="{{true}}" interval="{{duration}}" data-event-opts="{{[['change',[['change',['$event']]]]]}}" bindchange="__e"><block qq:for="{{list}}" qq:for-item="item" qq:for-index="index" qq:key="index"><swiper-item class="u-swiper-item data-v-475fdbf0"><view data-event-opts="{{[['tap',[['click',[index]]]]]}}" class="{{['u-news-item','u-line-1','data-v-475fdbf0','u-type-'+type]}}" style="{{$root.s0}}" bindtap="__e">{{''+item+''}}</view></swiper-item></block></swiper><view class="u-icon-wrap data-v-475fdbf0"><block qq:if="{{moreIcon}}"><u-icon class="u-right-icon data-v-475fdbf0" vue-id="475fc83a-2" name="arrow-right" size="{{26}}" color="{{computeColor}}" data-event-opts="{{[['^click',[['getMore']]]]}}" bind:click="__e" bind:__l="__l"></u-icon></block><block qq:if="{{closeIcon}}"><u-icon class="u-right-icon data-v-475fdbf0" vue-id="475fc83a-3" name="close" size="{{24}}" color="{{computeColor}}" data-event-opts="{{[['^click',[['close']]]]}}" bind:click="__e" bind:__l="__l"></u-icon></block></view></view>