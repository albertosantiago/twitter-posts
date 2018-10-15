@inject('helpers', 'App\Api\BladeHelpers')
@extends('layouts.app')
@section('content')
<style>
    ul.post-data{
        display:inline;
        float:left;
    }
    ul.post-data li{
        list-style-type: none;
        padding-top:10px;
    }
    div.post-info{
        display: block;
        clear:both;
        float:none;
        width:100%;
    }
</style>
<div class="container-fluid">
    <div class="row">
        <div class="col-md-6 col-md-offset-3">
            <br/>
            <h1>{{$post->title}}</h1>
            <br/>
            <div>
                {!!$post->excerpt!!}
            </div>
            <hr/>
            <br/>
            <div class="post-info">
                <ul class="post-data">
                    <li>System Post: {{$helpers->booleanTranslate($post->system_generated_post)}}</li>
                    <li>Author: {{$post->user_screen_name}}</li>
                    <li>In reply To: {{$helpers->nullFormat($post->in_reply_to)}}</li>
                    <li>Comments Enabled: {{$helpers->booleanTranslate($post->comments_status)}}</li>
                </ul>
                <ul class="post-data">
                    <li>Adult: {{$helpers->booleanTranslate($post->adult_status)}}</li>
                    <li>Created At: {{$post->updated_at}}</li>
                    <li>Updated At: {{$post->updated_at}}</li>
                </ul>
                <div class="clearfix"></div>
            </div>
            <hr/>
            <br/>
            <div class="well">
                <form style="width:100%;padding:20px;" class="form-inline" action="/adx/cms/posts/store" method="POST">
                    {{csrf_field()}}
                    <input type="hidden" name="post_id" value="{{$post->id}}"/>
                    <div class="form-group">
                        <div style="padding-right:10px;float:left;">
                            {{$helpers->formatCheckbox('system_adult_rev', $post->system_adult_rev)}}
                        </div>
                        <label>Mark like adult content</label>
                    </div>
                    <div class="form-group">
                        <div style="padding-left:20px;padding-right:10px;float:left;">
                            {{$helpers->formatCheckbox('system_ads_approved', $post->system_ads_approved)}}
                        </div>
                        <label>Enable Advertising</label>
                    </div>
                    <div class="form-group">
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="submit" class="btn btn-primary" value="Salvar" />
                    </div>
                </form>
            </div>
            @if($post->system_generated_post)
                <br/>
                <hr/>
                <br/>
                <h3>System Config</h3>
                <hr/>
                <br/>
                <div class="well col-md-7">
                    <div class="col-md-6">
                        <form style="width:100%;padding:20px;" class="form-horizontal" action="/adx/cms/posts/system_configure" method="POST">
                            {{csrf_field()}}
                            <input type="hidden" name="post_id" value="{{$post->id}}"/>
                            <div class="form-group">
                                <label class='control-label col-sm-4'>Priority:</label>
                                <div class="col-sm-8">
                                    <input type="text" name="system_priority" class='form-control' value="{{$post->system_priority}}"/>
                                </div>
                            </div>
                            <div class="form-group">
                                <input type="submit" class="btn btn-primary pull-right" value="Salvar" />
                            </div>
                        </form>
                    </div>
                    <br/>
                    <div class="clearfix"></div>
                </div>
            @endif
        </div>
    </div>
</div>
@endsection
@section('js')
<script type="text/javascript">
</script>
@endsection
