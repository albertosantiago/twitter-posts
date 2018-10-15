@inject('ads', 'ads')
@inject('helpers', 'App\Api\FrontalHelpers')
@extends('simple-layout')
@section('content')
    <div class="ui grid" style="margin-top:80px;">
        <div class="sixteen wide column">
            <h1 class="brand" style="margin-bottom:20px;">@lang('app.all_posts')</a></h1>
        </div>
            @if($posts->isNotEmpty())
                @foreach($posts as $post)
                    @component('partials/vertical-post', [
                        'fields' => 'five',
                        'post'   => $post,
                    ])
                    @endcomponent
                @endforeach
            @endif
            <div class="pagination-container" style="width:100%;float:none;clear:both:padding:10px;margin-top:20px;text-align:left">
                {{ $posts->appends(Input::get())->links() }}
            </div>
    </div>
    <div class="ads-fixed-left" style="position:fixed;left:20px;top:120px;width:200px;">
        @php
            //echo $ads->getSlot('home.lateral.fixed.left');
        @endphp
    </div>
    <div class="ads-footer" style="margin-top:40px;">
        @php
            echo $ads->getSlot('post.bottom.desktop');
            echo $ads->getDependencies();
        @endphp
    </div>
@endsection
@section('js')
<script type="text/javascript" src="{{$helpers->cdn("/js/post_list.js")}}"></script>
@endsection
