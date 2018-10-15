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
            <h1>Notifications</h1>
            <div class="filters">
                <form class="form-inline pull-right" method="GET" action="">
                    <div class="form-group">
                        <input type="submit" value="Filtrar" class="btn btn-default" />
                    </div>
                </form>
            </div>
            <div>
               @if(sizeof($notifications)<1)
                   <div class="well" style="margin-top:50px;">
                       <h3>No notifications found.</h3>
                   </div>
               @else
                   <table class="table table-bordered" id="contact-messages-table">
                        <thead>
                            <tr>
                                <th>Post</th>
                                <th>Screen Name</th>
                                <th>Type</th>
                                <th>Date</th>
                                <th>Text</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach($notifications as $notification)
                                <tr>
                                    <td><a href="/adx/cms/posts/view/{{$notification->post_id}}">{{$notification->post_id}}</a></td>
                                    <td>{!!$notification->user_screen_name!!}</td>
                                    <td>
                                        @php
                                            echo ($notification->type == 1) ? 'MENTION' : 'SUGGEST';
                                        @endphp;
                                    </td>
                                    <td>{{$notification->created_at}}</td>
                                    <td>{{$notification->text}}</td>
                                    <td><a class="btn btn-default" target="_blank" href="/adx/system/notifications/del?id={{$notification->id}}">Delete</a></td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                    {{ $notifications->appends(Input::get())->links() }}
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
