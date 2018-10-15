@inject('helpers', 'App\Api\FrontalHelpers')
@extends('user-admin-layout')
@section('content')
    <div class="ui grid">
        <div class="sisteen wide column user-post-list">
            <div class="ui container">
                <div class="header">
                    <div class="filters">
                        <select class="ui dropdown" name="filters[status]">
                            <option value="">@lang('app.post_status')</option>
                            <option value="0">@lang('app.all')</option>
                            <option value="1">@lang('app.draft')</option>
                            <option value="2">@lang('app.published')</option>
                        </select>
                    </div>
                    <h1>@lang('app.my_posts')</h1>
                </div>
                <br/>
                <?php
                if($posts->isNotEmpty()){
                ?>
                    <table class="ui unstackable striped table">
                        <thead>
                            <tr>
                                <th style="max-width:28%;">@lang('app.title')</th>
                                <th style="max-width:20%;">@lang('app.status')</th>
                                <th style="max-width:20%;">@lang('app.updated_at')</th>
                                <th style="text-align:center;max-width:30%;">@lang('app.actions')</th>
                            </tr>
                        </thead>
                    <?php
                        foreach($posts as $post)
                        {
                            ?>
                            <tr>
                                <td>
                                    <a href='{{route("post.view",['slug'=> $post->slug, 'postId' => $post->_id])}}' class='mobile-title'>{{$post->title}}</a>
                                </td>
                                <td>@lang('app.post_status_'.$post->status_str)</td>
                                <td>{{$post->updated_at->toDateString()}}</td>
                                <td align="center" style="text-align:center">
                                    <div class="ui pointing dropdown link item">
                                        @lang('app.actions')
                                        <i class="dropdown icon"></i>
                                        <div class="menu">
                                            <a href="{{route("post.edit",['postId' => $post->_id])}}" class="ui tiny button">@lang('app.edit')</a>
                                            <a href="#" class="ui tiny negative button remove" data-id="{{$post->id}}"><i class="remove icon"></i>@lang('app.delete')</a>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <?php
                        }
                    ?>
                    </table>
                    <?php
                }else{
                ?>
                    <div class="post post-archive">
                        <div class="ui message">
                            <h2>@lang('app.no_results')</h2>
                        </div>
                    </div>
                <?php
                }
                ?>
                <div class="pagination-container">
                    {{ $posts->appends(Input::get())->links() }}
                </div>
                <br/>
                <div id="modal-container"></div>
                <br/>
            </div>
        </div>
    </div>
@endsection
@section('js')
<script type="text/javascript" src="{{$helpers->cdn("/js/post_list.js")}}"></script>
@endsection
