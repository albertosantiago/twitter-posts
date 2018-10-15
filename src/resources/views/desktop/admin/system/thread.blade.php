@inject('helpers', 'App\Api\BladeHelpers')
@extends('layouts.app')
@section('content')
<style type="text/css">
.tweet{
    margin:20px;
    border:1px solid #ddd;
    border-radius:20px;
    padding:20px;
}
.tweet a.btn{
    margin-left:20px;
}
.form-group{
    padding:20px;
}
</style>
<div class="container-fluid">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            @if(!empty($thread->post_id))
                <a href="/posts/view/_/{{$thread->post_id}}" target="_blank" class="btn btn-primary pull-right" style="margin-left:20px;" />View Post</a>
                <a href="/my-posts/edit/{{$thread->post_id}}" target="_blank" class="btn btn-primary pull-right" style="margin-left:20px;" />Edit Post Content</a>
                <a href="/adx/cms/posts/view/{{$thread->post_id}}" target="_blank" class="btn btn-primary pull-right" style="margin-left:20px;" />Edit Post</a>
                <a href="/adx/system/thread/delPost?threadId={{$thread->_id}}" class="btn btn-danger pull-right" />Delete Post</a>
            @else
                <a href="/adx/system/thread/generatePost?threadId={{$thread->_id}}" class="btn btn-primary pull-right" />Generate Post</a>
            @endif
            <h1>Thread</h1>
            <hr/>
            <div class="row">
                <div class="col-md-8">
                    <form name="thread-edit" action="/adx/system/threads/store" method="POST">
                        {{csrf_field()}}
                        <input type="hidden" name="id" value="{{$thread->id}}" />
                        <fieldset>
                            <div class="form-group">
                                <label class='col-lg-3 control-label'>Status:</label>
                                <div class="col-lg-9">
                                    <input type="text" class='form-control' value="@php
                                        if($thread->status==3){
                                            echo "PUBLISHED";
                                        }elseif($thread->status==2){
                                            echo "DONE";
                                        }else{
                                            echo "PENDING";
                                        }
                                    @endphp" readonly />
                                </div>
                            </div>
                            <div class="form-group">
                                <label class='col-lg-3 control-label'>URL:</label>
                                <div class="col-lg-9">
                                    <input type="text" name="url" class='form-control' value="{{$thread->url}}"/>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class='col-lg-3 control-label'>Extra Authors:</label>
                                <div class="col-lg-9">
                                    <input type="text" name="extra_authors" class='form-control' value="{{$thread->extra_authors}}" placeholder="pepito,benganito"/>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class='col-lg-3 control-label'>Main Conversation URL:</label>
                                <div class="col-lg-9">
                                    <input type="text" name="main_conversation_url" class='form-control' value="{{$thread->main_conversation_url}}" placeholder="https://twitter.com/other_screen_name/status/858678483333132288"/>
                                </div>
                            </div>
                            <div class="form-group">
                                <input type="submit" class="btn btn-default pull-right" value="Update" />
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
            <br/><br/>
            <hr/>
            <br/>
            <h3>Tweets</h3>
            <br/><br/>

            @foreach ($tweets as $tweet)
                <div class="tweet">
                    {!!$tweet->embed['html']!!}
                    <a href="/adx/system/tweet/{{$tweet->id_str}}" class="btn btn-default">View</a>
                    <a href="/adx/system/thread/delTweet?tweetId={{$tweet->id_str}}&threadId={{$thread->_id}}" class="btn btn-danger" />Delete</a>
                    <div class="clearfix" ></div>
                    <br/>
                </div>
            @endforeach
        </div>
        <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
    </div>
</div>
@endsection
