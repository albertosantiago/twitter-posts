<?php

$locale = LaravelLocalization::getCurrentLocale();

if(!empty($currentUser->id)){
   $profileSrcImage = str_replace("_normal", "", $currentUser->profile_image_url_https);
   $profileName  = $currentUser->name;
   $profileImage = "<img src='".$profileSrcImage."' alt='".$profileName." Image' class='ui avatar image' />";
   $homeURL = "/$locale/@".$currentUser->screen_name;
}else{
   $profileImage = "<i class='user icon'></i>";
   $profileName  = __('layout.guest_user');
   $homeURL = "/$locale";
}

?>
<div class="ui top fixed menu user-menu">
    <a class="item" href="/{{$locale}}">@lang('layout.home')</a>
    <a class="item" href="{{route("posts.index")}}">@lang('layout.posts')</a>
    <a class="item" href="/{{$locale}}/@Tweets4Threads">@lang('layout.threads')</a>
    <div class="ui pointing dropdown link item">
        @lang('layout.admin')
        <i class="dropdown icon"></i>
        <div class="menu">
            <a class="item" href="{{$homeURL}}">@lang('layout.my_home')</a>
            <a class="item" href="{{route("posts.list")}}">@lang('layout.my_posts')</a>
            <a class="item" href="{{route("posts.new")}}">@lang('layout.new_post')</a>
        </div>
    </div>
    <div class="right menu">
        <div class="ui pointing dropdown link item">
              {!!$profileImage!!}
              &nbsp;&nbsp;
              {{$profileName}}
              <i class="dropdown icon"></i>
              <div class="menu">
                  @if(!empty($currentUser->id))
                      <div class="item" id="user-menu-logout-button" style="text-align:center">
                          <i class="sign out icon"></i>&nbsp;@lang('layout.logout')
                      </div>
                  @else
                      <div class="item" id="user-menu-login-button" style="text-align:center">
                          <i class="sign in icon"></i>&nbsp;@lang('layout.login')
                      </div>
                  @endif
                  <div class="item" style="text-align:center;padding-top:10px;">
                      <a href="{{LaravelLocalization::getLocalizedURL("es")}}">Español</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="{{LaravelLocalization::getLocalizedURL("en")}}">English</a>
                  </div>
            </div>
        </div>
    </div>
</div>
