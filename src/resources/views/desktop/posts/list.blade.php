@inject('helpers', 'App\Api\FrontalHelpers')
@extends('user-admin-layout')
@section('content')
    <div class="ui grid">
        <div class="sisteen wide column">
            <div class="ui message-container" style="margin-top:0px;padding:25px;background-color:#fff;padding-top:40px;border:1px solid #e6ecf0;border-radius:5px;">
                <div class="header">
                    <div class="filters" style="float:right">
                        <select class="ui dropdown" name="filters[status]">
                            <option value="">@lang('app.post_status')</option>
                            <option value="0">@lang('app.all')</option>
                            <option value="1">@lang('app.draft')</option>
                            <option value="2">@lang('app.published')</option>
                        </select>
                    </div>
                    <div style="display:block;">
                        <h1 style="float:left;margin-right:20px;">@lang('app.my_posts')</h1>
                        <a href="{{route("posts.new")}}" class="ui button">@lang('layout.new_post')</a>
                    </div>
                </div>
                <br/>
                <?php
                if($posts->isNotEmpty()){
                ?>
                    <table class="ui celled striped table">
                        <thead>
                            <tr>
                                <th>@lang('app.title')</th>
                                <th>@lang('app.status')</th>
                                <th>@lang('app.updated_at')</th>
                                <th style="text-align:center">@lang('app.actions')</th>
                            </tr>
                        </thead>
                    <?php
                        foreach($posts as $post)
                        {
                            ?>
                            <tr>
                                <td><a href='{{route("post.view",['slug'=> $post->slug, 'postId' => $post->_id])}}' style="font-size:1.1em;">{{$post->title}}</a></td>
                                <td>@lang('app.post_status_'.$post->status_str)</td>
                                <td>{{$post->modified_at}}</td>
                                <td align="center" style="text-align:center">
                                    <a href="{{route("post.edit",['postId' => $post->_id])}}" class="ui tiny button">@lang('app.edit')</a>
                                    <a href="#" class="ui tiny negative button remove" data-id="{{$post->id}}"><i class="remove icon"></i>@lang('app.delete')</a>
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
