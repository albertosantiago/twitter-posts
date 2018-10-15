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
        <link rel="stylesheet" type="text/css" href="{{$helpers->cdn("/vendor/icomoon/style.css")}}" />
        <link rel="stylesheet" type="text/css" href="{{$helpers->cdn("/vendor/fotorama-4.6.4/fotorama.css")}}" />
        <link rel="stylesheet" type="text/css" href="{{$helpers->cdn("/semantic/dist/semantic.min.css")}}" />
        <link rel="stylesheet" type="text/css" href="{{$helpers->cdn("/css/app.css")}}">
        <script src="/bower_components/webcomponentsjs/custom-elements-es5-adapter.js"></script>
        <script src="/bower_components/webcomponentsjs/webcomponents-hi-ce.js"></script>
        <script src="//twemoji.maxcdn.com/2/twemoji.min.js?2.2.3"></script>
        {!! $metaCreator->render() !!}
        <script src="{{$helpers->cdn("/js/manifest.js")}}"></script>
        <script src="{{$helpers->cdn("/js/vendor.js")}}"></script>
        <script src="{{$helpers->cdn("/js/layout.js")}}"></script>
        <link rel="stylesheet" type="text/css" href="/profile/css/@<?php echo $owner->screen_name ?>"/>
        @yield('css')
        @yield('ads_head')
    </head>
    <body class="twitter-posts-body">
        <div id="app-modal-container"></div>
        @include('partials/user_menu')
        <div class="ui main container header">
            <div class="header-background">
                <div class="ui menu">
                    @include('partials/twitter_user_image')
                </div>
            </div>
        </div>
        <div class="ui container main-container">
            @yield('content')
        </div>
        @yield('ads_footer')
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
        @yield('js')
    </body>
</html>
