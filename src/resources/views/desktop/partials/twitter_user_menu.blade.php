@if(!$owner->isGuest)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<a class="item active" href="/@<?php echo $owner->screen_name;?>">
    @lang('app.all_posts')
</a>
@endif
