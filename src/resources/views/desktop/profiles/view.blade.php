@extends('layout')
@section('content')
    <div class="ui grid">
        <div class="four wide column">
            @include('partials/profile_info')
        </div>
        <div class="twelve wide column">
            <?php
            if($posts->isNotEmpty()){
                foreach($posts as $post)
                {
                    ?>
                    <div class="post post-archive">
                        @php
                            $withImageClass = '';
                            if(($post->featured_img)||
                                (($post->system_generated_post)&&(!empty($post->author_profile_image)))){
                                $withImageClass = 'with-image';
                        @endphp
                            <div class="post-featured-img">
                                @php
                                    if(!empty($post->featured_img)){
                                        echo '<img src="'.$post->featured_img.'" class="ui image rounded" />';
                                    }elseif(($post->system_generated_post)&&(!empty($post->author_profile_image))){
                                        echo '<img src="https://twitter-posts.com/'.$post->author_profile_image.'" class="ui image rounded" />';
                                    }
                                @endphp
                            </div>
                        @php
                            }
                        @endphp
                        <div class="post-short-desc {{$withImageClass}}">
                            @php
                                echo "<h2><a href='/posts/view/$post->slug/$post->_id'>$post->title</a></h2>";
                                echo $post->excerpt;
                                if(strlen($post->content)>300){
                                    echo "<div class='view-more'><a class='ui right' href='/posts/view/$post->slug/$post->_id'>".__('app.view_more')."</a></div>";
                                }
                            @endphp
                        </div>
                        <div class="clearfix"></div>
                    </div>
                    <?php
                }
            }else{
                if($currentUser->id==$owner->id){
                    ?>
                        <div class="post post-archive">
                            <h2>@lang('messages.not_publish_h2')</h2>
                            <p>@lang('messages.not_publish_p1')</p>
                            <a class="ui button" href="/my-posts/new">@lang('messages.not_publish_save_lucy')</a>
                            <div style="text-align:center">
                                <img src="/images/cat.jpg" style="margin:0 auto;border:5px solid #fafafa; border-radius:15px;margin-top:20px;width:70%;"/>
                            </div>
                        </div>
                    <?php
                }else{
                    ?>
                        <div class="post post-archive">
                            <div class="ui message">
                                <h2>@lang('messages.not_publish_for_others')</h2>
                            </div>
                        </div>
                    <?php
                }
            }
            ?>
            <div class="pagination-container">
                {{ $posts->appends(Input::get())->links() }}
            </div>
        </div>
    </div>
@endsection
@section('js')
@endsection
