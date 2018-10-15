<div class="{{$fields}} wide column" style="padding:5px">
    <div class="post post-vertical-archive" style="margin:0%;">
        @php
            $withImageClass = '';
            if(($post->featured_img)||
                (($post->system_generated_post)&&(!empty($post->author_profile_image)))){
                $withImageClass = 'with-image';
        @endphp
            <div class="img-container" style="position:relative;width:100%;padding-bottom: 56.25%;overflow:hidden">
                <div style="position: absolute;top: 0; bottom: 0; left: 0; right: 0;color: white;font-size: 24px;text-align: center;">
                @php
                    if(!empty($post->featured_img)){
                        echo '<img src="'.$post->featured_img.'" class="ui image rounded" style="position:abolute;top:0px;left:0px;width:100%;" />';
                    }
                @endphp
                </div>
            </div>
        @php
            }
        @endphp
        <div style="padding:20px;" class="{{$withImageClass}}">
            @php
                $postURL = route('post.view', ['slug' => $post->slug, 'postId' => $post->id]);
                $profileURL = route('profile.view', ['userScreenName' => $post->user_screen_name]);
                echo "<h2 style='font-size:1.2em'><a style='color:#1f1f1f' href='".$postURL."'>$post->title</a></h2>";
                echo "<p><a style='font-family:Arial;text-transform: uppercase;font-size:0.9em;font-weight:bold;' href='".$profileURL."'>@$post->user_screen_name</a></p>";
                echo $post->excerpt;
                if(strlen($post->content)>300){
                    echo "<div class='view-more'><a class='ui right' href='".$postURL."'>".__('app.view_more')."</a></div>";
                }
            @endphp
        </div>
        <div class="clearfix"></div>
    </div>
</div>
