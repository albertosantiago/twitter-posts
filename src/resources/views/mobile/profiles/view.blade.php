@extends('layout')
@section('content')
    <div class="ui grid" style="padding-top:50px;">
        <div class="ui top attached tabular menu">
            <a class="item" data-tab="first">@lang('layout.profile')</a>
            <a class="item active" data-tab="second">@lang('layout.posts')</a>
        </div>
        <div class="ui bottom attached tab segment" data-tab="first">
            @include('partials/profile_info')
        </div>
        <div class="ui bottom attached tab segment active" data-tab="second" style="padding:0px;">
            @if($posts->isNotEmpty())
                @foreach($posts as $post)
                    @component('partials/timeline-post', [
                        'fields' => 'eight',
                        'post'   => $post,
                    ])
                    @endcomponent
                @endforeach
            @else
                @if($currentUser->id==$owner->id)
                        <div class="post post-archive">
                            <h2>@lang('messages.not_publish_h2')</h2>
                            <p>@lang('messages.not_publish_p1')</p>
                            <a class="ui button" href="/my-posts/new">@lang('messages.not_publish_save_lucy')</a>
                            <div style="text-align:center">
                                <img src="/images/cat.jpg" style="margin:0 auto;border:5px solid #fafafa; border-radius:15px;margin-top:20px;width:70%;"/>
                            </div>
                        </div>
                @else
                    <div class="post post-archive">
                        <div class="ui message">
                            <h2>@lang('messages.not_publish_for_others')</h2>
                        </div>
                    </div>
                @endif
            @endif
            <div class="pagination-container">
                {{ $posts->appends(Input::get())->links() }}
            </div>
        </div>
    </div>
@endsection
@section('js')
<script type="text/javascript">
    $('.menu .item').tab();
</script>
@endsection
