@inject('ads', 'ads')
@inject('metaCreator', 'metaCreator')
@inject('helpers', 'App\Api\FrontalHelpers')
<!DOCTYPE html>
<html lang="{{ config('app.locale') }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <link href="https://fonts.googleapis.com/css?family=Arimo|Open+Sans" rel="stylesheet">
        <link rel="stylesheet" type="text/css" href="{{$helpers->cdn("/semantic/dist/semantic.min.css")}}" />
        <link rel="stylesheet" type="text/css" href="{{$helpers->cdn("/css/app.css")}}">
        <script src="{{$helpers->cdn("/js/manifest.js")}}"></script>
        <script src="{{$helpers->cdn("/js/vendor.js")}}"></script>
        <script src="{{$helpers->cdn("/js/layout.js")}}"></script>
        {!! $metaCreator->render() !!}
        @yield('css')
    </head>
    <body  class="twitter-posts-body">
        @include('partials/user_menu')
        <div class="welcome">
            <div class="ui container">
                <div class="ui grid">
                  <div class="sixteen wide column">
                      <div class="message-container">
                          <h1  style="font-size:45px;margin-bottom:0px;">@lang('app.brand')</h1>
                          <h3 class="brand" style="color:#444;margin-top:5px;">@lang('app.brand_subtitle')</h3>
                      </div>
                    </small>
                  </div>
                  <div class="ui top attached tabular menu">
                      <a class="item active" data-tab="first">@lang('app.last_posts')</a>
                      <a class="item" data-tab="second">@lang('app.last_threads')</a>
                  </div>
                  <div class="ui bottom attached tab segment active" data-tab="first">
                      <div class="ui grid">
                          @if($posts->isNotEmpty())
                              @foreach($posts as $post)
                                  @component('partials/vertical-post', [
                                      'fields' => 'sixteen',
                                      'post'   => $post,
                                  ])
                                  @endcomponent
                              @endforeach
                          @endif
                      </div>
                      <a href="/posts" class="ui button" style="margin-top:20px;float:right;">@lang('app.view_all')</a>
                  </div>
                  <div class="ui bottom attached tab segment" data-tab="second" style="padding:0px;">
                      @if($postThreads->isNotEmpty())
                          @foreach($postThreads as $post)
                              @component('partials/timeline-post', [
                                  'post'   => $post,
                              ])
                              @endcomponent
                          @endforeach
                      @endif
                      <a href="/@Tweets4Threads" class="ui button" style="font-size:1em;float:right;margin-top:20px;margin-bottom:20px">@lang('app.view_all')</a>
                  </div>
              </div>
              <div class="ads-footer" style="margin-top:40px;">
                  @php
                      echo $ads->getSlot('post.bottom.desktop');
                      echo $ads->getDependencies();
                  @endphp
              </div>
          </div>
        </div>
        <div class="ui vertical footer segment">
            <div class="ui center aligned container">
                @include('partials/site_info_menu')
            </div>
        </div>
        <script>
            window.twttr = (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0],
                    t = window.twttr || {};
                if (d.getElementById(id)) return t;
                js = d.createElement(s);
                js.id = id;
                js.src = "https://platform.twitter.com/widgets.js";
                fjs.parentNode.insertBefore(js, fjs);

                t._e = [];
                t.ready = function(f) {
                    t._e.push(f);
                };
                return t;
            }
            (document, "script", "twitter-wjs"));
            //Tabs
            $('.menu .item').tab();

        </script>
        <!-- GOOGLE ANALITYCS -->
        @include('partials/google_analitycs');
        <!-- /GOOGLE ANALITYCS -->
        <script src="{{$helpers->cdn("/js/welcome.js")}}"></script>
        @yield('js')
    </body>
</html>
