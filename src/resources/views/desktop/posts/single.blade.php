@inject('ads', 'ads')
@inject('helpers', 'App\Api\FrontalHelpers')
@inject('threadRender', 'App\Api\ThreadRenderHelper')
@extends('layout')
@section('content')
<div class="ui grid">
    <div class="four wide column">
        @include('partials/profile_info')
        @if($haveAds)
        <div class="ads-footer">
            @php
                echo $ads->getSlot('post.lateral.responsive');
            @endphp
        </div>
        @endif
    </div>
    <div class="twelve wide column">
        <div class="single-post" id="post">
            <div class="ui top attached segment" >
                <div class="content post-content post">
                    <div class="toolbox-container"></div>
                    <div class="post-header">
                    <?php

                    if($post->status_str=='draft'){
                        echo "<h1>$post->title<small style='display:inline'>- (Private Draft)</small></h1>";
                    }else{
                        echo "<h1>$post->title</h1>";
                    }

                    echo $helpers->formatDateForPost($post->modified_at);

                    if($post->in_reply_to){
                        echo "<div class='ui message in_reaction_to'>
                                    <label style='float:left'>In reaction To:&nbsp;&nbsp;&nbsp;&nbsp;</label>&nbsp;&nbsp;<a href='".$post->in_reply_to."' rel='nofollow' target='_blank'>
                                    ".$post->in_reply_to."</a></div>";
                    }
                    ?>
                    </div>
                    <div class="post-body">
                        {!!$post->content !!}
                    </div>
                </div>
                <div class="clearfix"></div>
                <div class="content post-tags">
                    <?php
                        $tags = explode(" ", $post->tags);
                        foreach($tags as $tag){
                            $cleanTag = str_replace("#","", $tag);
                            echo "<a href='/$owner->screen_name/?hashtag=$cleanTag'>$tag</a> ";
                        }
                    ?>
                </div>
            </div>
            <div class="guest-menu-container"></div>
        </div>
        @if($reactions->isNotEmpty())
            <div class="ui post-reactions message">
                <h4>Post Reactions</h4>
                @foreach($reactions as $reaction)
                    <div class="post-reaction-item">
                        <a href="/posts/view/{{$reaction->slug}}/{{$reaction->id}}">{{$reaction->title}}</a>
                        &nbsp;&nbsp;By&nbsp;&nbsp;&nbsp;&nbsp;
                        <img src="{{$reaction->user_profile_image_url_https}}" style="width:36px;border-radius:4px;margin-bottom:-14px;"/>&nbsp;&nbsp;
                        <strong>{{$reaction->user_name}}</strong>&nbsp;-&nbsp;
                        <a href="/{{"@".$reaction->user_screen_name}}">{{"@".$reaction->user_screen_name}}</a>
                    </div>
                    <div class="clearfix"></div>
                @endforeach
            </div>
        @endif
        @if($isOpenComments)
            <div id="tweet-reply" class="tweet-reply"></div>
            <div class="clearfix" style="height:1px;margin-bottom:20px"></div>
            <div id="tweet-replies-container">
                @php
                    $threadRender->render($tweetThread, 2);
                @endphp
            </div>
        @endif
        @if($haveAds)
        <div class="ads-footer">
            @php
                echo $ads->getSlot('post.bottom.desktop');
                echo $ads->getDependencies();
            @endphp
        </div>
        @endif
    </div>
    <div id="tweet-post-mask" style="visibility:hidden;display:none" ></div>
    <div id="modals-container"></div>
</div>
@endsection
@section('css')
    <link rel="stylesheet" href="{{$helpers->cdn("/bower_components/emojionearea/dist/emojionearea.min.css")}}">
@endsection
@section('js')
    <script type="text/javascript">
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
        var maxLevel = 2;
        post.id  = '<?php echo $post->_id; ?>';
    </script>
    <script type="text/javascript" src="{{$helpers->cdn("/js/post.js")}}"></script>
@endsection
