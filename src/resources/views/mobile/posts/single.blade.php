@inject('ads', 'ads')
@inject('helpers', 'App\Api\FrontalHelpers')
@inject('threadRender', 'App\Api\ThreadRenderHelper')
@extends('layout')
@section('ads_head')
    @if($haveAds)
        @php
            echo $ads->getSlot('full_page_mobile');
        @endphp
    @endif
@endsection
@section('content')
<div class="ui grid">
    <div class="row">
        <div class="sixteen wide column">
            <div class="single-post" id="post">
                <div class="ui top attached segment" >
                    <div class="content post-content post">
                        <?php
                        echo "<h1>$post->title</h1>";
                        echo $post->content;
                        ?>
                    </div>
                    <div class="content post-tags">
                        <?php
                            $tags = explode(" ", $post->tags);
                            foreach($tags as $tag){
                                echo "<a href='/$owner->screen_name/?hashtag=$tag'>$tag</a> ";
                            }
                        ?>
                    </div>
                </div>
            </div>
            <div id="tweet-reply" class="tweet-reply"></div>
            <div class="clearfix" style="border-bottom:1px solid #eee;height:1px;margin-bottom:20px"></div>
            <div id="tweet-replies-container">
                @php
                    $threadRender->render($tweetThread, 2);
                @endphp
            </div>
        </div>
        <div id="tweet-post-mask" style="visibility:hidden;display:none" ></div>
        @if($haveAds)
        <div class="ads-footer">
            @php
                echo $ads->getSlot('post.bottom.desktop');
                echo $ads->getDependencies();
            @endphp
        </div>
        @endif
    </div>
</div>
@endsection
@section('css')
    <link rel="stylesheet" href="{{$helpers->cdn("/bower_components/emojionearea/dist/emojionearea.min.css")}}">
@endsection
@section('js')
    <script type="text/javascript">

        twttr.ready(function (twttr) {
            twttr.events.bind('rendered', function (event) {
                $(event.target).css('width','100%');
                $(event.target).css('max-width','100%');
                $(event.target).css('margin-top','0px');
                $(event.target).css('margin-bottom','5px');
                var iframe = document.getElementById(event.target.id);
                var script = iframe.contentWindow.document.createElement("script");
                script.type = "text/javascript";
                script.src = "/tweets-js/tweet.js";
                iframe.contentWindow.document.body.appendChild(script);
            });
            twttr.events.bind('loaded', function (event) {});
        });

        @php
            $isOwner = "false";
            if(!empty($currentUser->id)){
                if($owner->id == $currentUser->id){
                    $isOwner = "true";
                }
            }
            $ownerInfo = [
                'screen_name' => $owner->screen_name
            ];
        @endphp
        var isOwner = {{$isOwner}};
        var owner  = <?php echo json_encode($ownerInfo); ?>;
        var post = <?php echo json_encode($post); ?>;
        post.id  = '<?php echo $post->_id; ?>';
    </script>
    <script type="text/javascript" src="{{$helpers->cdn("/js/post.js")}}"></script>
@endsection
