<div class="post post-timeline">
    @php
        $postURL = route('post.view', ['slug' => $post->slug, 'postId' => $post->id]);
        $profileURL = route('profile.view', ['userScreenName' => $post->user_screen_name]);

        $withImageClass = '';
        if(!empty($post->featured_img)){
                $withImageClass = 'with-image';
        }elseif(($post->system_generated_post) &&
        (!empty($post->author_profile_image)))
        {
            $withImageClass = 'post-short-desc with-image';
        }else{

        }
    @endphp
    @if(!empty($post->featured_img))
        <div class="img-container" style="position:relative;width:100%;padding-bottom: 56.25%;overflow:hidden">
            <div style="position: absolute;top: 0; bottom: 0; left: 0; right: 0;color: white;font-size: 24px;text-align: center;">
                <img src="{{$post->featured_img}}" class="ui image rounded" style="position:abolute;top:0px;left:0px;width:100%;" />';
            </div>
        </div>
    @elseif(($post->system_generated_post)&&(!empty($post->author_profile_image)))
        <div class="post-featured-img">
            <img src="https://twitter-posts.com/{{$post->author_profile_image}}" class="ui image rounded" />
        </div>
    @endif
    <div style="padding:20px;" class="{{$withImageClass}}">
        <h4>
            <a href="{{$postURL}}">{{$post->title}}</a>
        </h4>
        {!!$post->excerpt!!}
        @if(strlen($post->content)>300)
            <div class='view-more'><a class='ui right' href="{{$postURL}}">@lang('app.view_more')</a></div>
        @endif
    </div>
    <div class="clearfix"></div>
</div>
