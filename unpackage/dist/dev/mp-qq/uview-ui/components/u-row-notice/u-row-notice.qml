<block qq:if="{{show}}"><view class="{{['u-notice-bar','data-v-d36ba0c0',type?'u-type-'+type+'-light-bg':'']}}" style="{{'background:'+(computeBgColor)+';'+('padding:'+(padding)+';')}}"><view class="u-direction-row data-v-d36ba0c0"><view class="u-icon-wrap data-v-d36ba0c0"><block qq:if="{{volumeIcon}}"><u-icon class="u-left-icon data-v-d36ba0c0" vue-id="d36bc82c-1" name="volume-fill" size="{{volumeSize}}" color="{{computeColor}}" bind:__l="__l"></u-icon></block></view><view class="u-notice-box data-v-d36ba0c0" id="u-notice-box"><view class="u-notice-content data-v-d36ba0c0" style="{{'animation-duration:'+(animationDuration)+';'+('animation-play-state:'+(animationPlayState)+';')}}" id="u-notice-content"><text data-event-opts="{{[['tap',[['click',['$event']]]]]}}" class="{{['u-notice-text','data-v-d36ba0c0','u-type-'+type]}}" style="{{$root.s0}}" bindtap="__e">{{showText}}</text></view></view><view class="u-icon-wrap data-v-d36ba0c0"><block qq:if="{{moreIcon}}"><u-icon class="u-right-icon data-v-d36ba0c0" vue-id="d36bc82c-2" name="arrow-right" size="{{26}}" color="{{computeColor}}" data-event-opts="{{[['^click',[['getMore']]]]}}" bind:click="__e" bind:__l="__l"></u-icon></block><block qq:if="{{closeIcon}}"><u-icon class="u-right-icon data-v-d36ba0c0" vue-id="d36bc82c-3" name="close" size="{{24}}" color="{{computeColor}}" data-event-opts="{{[['^click',[['close']]]]}}" bind:click="__e" bind:__l="__l"></u-icon></block></view></view></view></block>