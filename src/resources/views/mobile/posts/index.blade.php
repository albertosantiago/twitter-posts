@inject('ads', 'ads')
@inject('helpers', 'App\Api\FrontalHelpers')
@extends('simple-layout')
@section('content')
    <div class="ui grid">
            <h1 class="brand" style="margin-top:80px;">@lang('app.all_posts')</a></h1>
            @if($posts->isNotEmpty())
                @foreach($posts as $post)
                    @component('partials/vertical-post', [
                        'fields' => 'sixteen',
                        'post'   => $post,
                    ])
                    @endcomponent
                @endforeach
            @endif
            <div class="pagination-container" style="width:100%;float:none;clear:both:padding:10px;margin-top:20px;text-align:left">
                {{ $posts->appends(Input::get())->links() }}
            </div>
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
