<view class="u-countdown data-v-7ebf7480"><block qq:if="{{showDays&&(hideZeroDay||!hideZeroDay&&d!='00')}}"><view class="u-countdown-item data-v-7ebf7480" style="{{$root.s0}}"><view class="u-countdown-time data-v-7ebf7480" style="{{$root.s1}}">{{''+d+''}}</view></view></block><block qq:if="{{showDays&&(hideZeroDay||!hideZeroDay&&d!='00')}}"><view class="u-countdown-colon data-v-7ebf7480" style="{{'font-size:'+(separatorSize+'rpx')+';'+('color:'+(separatorColor)+';')+('padding-bottom:'+(separator=='colon'?'4rpx':0)+';')}}">{{''+(separator=='colon'?':':'天')+''}}</view></block><block qq:if="{{showHours}}"><view class="u-countdown-item data-v-7ebf7480" style="{{$root.s2}}"><view class="u-countdown-time data-v-7ebf7480" style="{{'font-size:'+(fontSize+'rpx')+';'+('color:'+(color)+';')}}">{{''+h+''}}</view></view></block><block qq:if="{{showHours}}"><view class="u-countdown-colon data-v-7ebf7480" style="{{'font-size:'+(separatorSize+'rpx')+';'+('color:'+(separatorColor)+';')+('padding-bottom:'+(separator=='colon'?'4rpx':0)+';')}}">{{''+(separator=='colon'?':':'时')+''}}</view></block><block qq:if="{{showMinutes}}"><view class="u-countdown-item data-v-7ebf7480" style="{{$root.s3}}"><view class="u-countdown-time data-v-7ebf7480" style="{{'font-size:'+(fontSize+'rpx')+';'+('color:'+(color)+';')}}">{{''+i+''}}</view></view></block><block qq:if="{{showMinutes}}"><view class="u-countdown-colon data-v-7ebf7480" style="{{'font-size:'+(separatorSize+'rpx')+';'+('color:'+(separatorColor)+';')+('padding-bottom:'+(separator=='colon'?'4rpx':0)+';')}}">{{''+(separator=='colon'?':':'分')+''}}</view></block><block qq:if="{{showSeconds}}"><view class="u-countdown-item data-v-7ebf7480" style="{{$root.s4}}"><view class="u-countdown-time data-v-7ebf7480" style="{{'font-size:'+(fontSize+'rpx')+';'+('color:'+(color)+';')}}">{{''+s+''}}</view></view></block><block qq:if="{{showSeconds&&separator=='zh'}}"><view class="u-countdown-colon data-v-7ebf7480" style="{{'font-size:'+(separatorSize+'rpx')+';'+('color:'+(separatorColor)+';')+('padding-bottom:'+(separator=='colon'?'4rpx':0)+';')}}">秒</view></block></view>