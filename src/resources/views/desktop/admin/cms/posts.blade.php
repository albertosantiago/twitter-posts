@inject('helpers', 'App\Api\BladeHelpers')
@extends('layouts.app')
@section('content')
<style>
table.dataTable thead th {
    text-align:center;
}
table.dataTable thead .sorting {
    background-color:#f8f8f8;
}
table.dataTable thead .sorting_desc{
    background-color:#f8f8f8;
}
table.dataTable thead .sorting_asc{
    background-color:#f8f8f8;
}
.filters .form-group{
    padding:20px;
    padding-top:0px;
    margin-top:-30px;
}
.filters .form-group label{
    padding-right:10px;
}
</style>
<div class="container-fluid">
    <div class="row">
        <div class="col-md-10 col-md-offset-1">
            <h1>Posts</h1>
            <div class="filters">
                <form class="form-inline pull-right" method="GET" action="">
                    <div class="form-group">
                        <label>System Posts</label>
                        {{$helpers->formatFilterBooleanSelect('system_generated_post', false)}}
                    </div>
                    <div class="form-group">
                        <label>Adult</label>
                        {{$helpers->formatFilterBooleanSelect('system_adult_rev')}}
                    </div>
                    <div class="form-group">
                        <label>With Ads</label>
                        {{$helpers->formatFilterBooleanSelect('system_ads_approved')}}
                    </div>
                    <div class="form-group">
                        <label>Pending Review</label>
                        {{$helpers->formatFilterBooleanSelect('system_pending_rev')}}
                    </div>
                    <div class="form-group">
                        <input type="submit" value="Filtrar" class="btn btn-default" />
                    </div>
                </form>
            </div>
            <div>
               @if(sizeof($posts)<1)
                   <div class="well" style="margin-top:50px;">
                       <h3>No posts found.</h3>
                   </div>
               @else
                   <table class="table table-bordered" id="contact-messages-table">
                        <thead>
                            <tr>
                                @php
                                    $headers = [
                                        ['name' => 'id','text' => 'ID'],
                                        ['name' => 'title', 'text' => 'Title'],
                                        ['name' => 'created_at','text' => 'Created At'],
                                        ['name' => 'updated_at','text' => 'Updated At'],
                                        ['text' => 'Actions']
                                    ];
                                    echo $helpers->formatTableHeader($headers);
                                @endphp
                            </tr>
                        </thead>
                        <tbody>
                            @foreach($posts as $post)
                                <tr>
                                    <td><a href="/adx/cms/posts/view/{{$post->id}}">{{$post->id}}</a></td>
                                    <td>{!!$post->title!!}</td>
                                    <td>{{$post->created_at}}</td>
                                    <td>{{$post->updated_at}}</td>
                                    <td><a class="btn btn-default" target="_blank" href="/posts/view/{{$post->slug}}/{{$post->id}}">View</a></td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                    {{ $posts->appends(Input::get())->links('vendor.pagination.bootstrap-4') }}
                @endif
            </div>
            <br/><br/>
        </div>
    </div>
</div>
@endsection
@section('js')
<script type="text/javascript">

function selectAll(status){
    $("#contact-messages-table input:checkbox").prop("checked", status);
}

</script>
@endsection
