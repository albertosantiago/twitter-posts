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
                          <h1 class="brand">@lang('app.brand')<small class="brand">@lang('app.brand_subtitle')</small></h1>
                      </div>
                    </small>
                  </div>
                  <div class="ten wide column">
                      <h1 class="ui top attached header" style="margin-bottom:20px;">@lang('app.last_posts')<a href="/posts" style="font-size:0.6em;float:right;">@lang('app.view_all')</a></h1>
                      <div class="ui grid">
                          @if($posts->isNotEmpty())
                              @foreach($posts as $post)
                                  @component('partials/vertical-post', [
                                      'fields' => 'eight',
                                      'post'   => $post,
                                  ])
                                  @endcomponent
                              @endforeach
                          @endif
                      </div>
                      <a href="/posts" class="ui button" style="margin-top:20px;float:right;">@lang('app.view_all')</a>
                  </div>
                  <div class="six wide column">
                      <h3 class="ui top attached header">@lang('app.last_threads')<a href="/@Tweets4Threads" style="font-size:0.8em;float:right;">@lang('app.view_all')</a></h3>
                      @if($postThreads->isNotEmpty())
                          @foreach($postThreads as $post)
                              @component('partials/timeline-post', [
                                  'post'   => $post,
                              ])
                              @endcomponent
                          @endforeach
                      @endif
                      <a href="/@Tweets4Threads" class="ui button" style="font-size:1em;float:right;margin-top:20px;">@lang('app.view_all')</a>
                  </div>
              </div>
              <div class="ads-fixed-left" style="position:fixed;left:20px;top:120px;width:200px;">
                  @php
                      //echo $ads->getSlot('home.lateral.fixed.left');
                  @endphp
              </div>
              <div class="ads-fixed-right" style="position:fixed;right:20px;top:120px;width:200px;">
                  @php
                      //echo $ads->getSlot('home.lateral.fixed.right');
                  @endphp
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
        </script>
        <!-- GOOGLE ANALITYCS -->
        @include('partials/google_analitycs');
        <!-- /GOOGLE ANALITYCS -->
        <script src="{{$helpers->cdn("/js/welcome.js")}}"></script>
        @yield('js')
    </body>
</html>
