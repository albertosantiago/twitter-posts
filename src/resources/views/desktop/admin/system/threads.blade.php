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
    <div class="row" style="padding-top:20px;">
        <div class="col-md-10 col-md-offset-1">
            <button type="button" class="btn btn-primary pull-right" data-toggle="modal" data-target="#create-thread">
              New Thread
            </button>
        </div>
    </div>
    <div class="row">
        <div class="col-md-10 col-md-offset-1">
            <h1>Threads</h1>
            <div class="filters">
                <form class="form-inline pull-right" method="GET" action="">
                    {{csrf_field()}}
                    <div class="form-group">
                        <label for="min_tweets">More than:</label>
                        <input type="text" name="filters[min_tweets]" style="width:40px" placeholder="10" value="<?php echo (!empty($filters['min_tweets'])) ? $filters['min_tweets']:''; ?>"/>
                        &nbsp;&nbsp;&nbsp;
                        <label for="max_tweets">And Less Than</label>
                        <input type="text" name="filters[max_tweets]"  style="width:40px" placeholder="100" value="<?php echo (!empty($filters['max_tweets'])) ? $filters['max_tweets']:''; ?>" />
                        &nbsp;<strong>Tweets</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;
                        <label for="text-filter">Status:</label>
                        <select class="form-control" name="filters[status]">
                            <option value="-1" <?php echo ((empty($filters['status'])) || ($filters['status']==-1)) ? 'selected="selected"' : ''; ?>>All</option>
                            <option value="1"  <?php echo ($filters['status']==1) ? 'selected="selected"' : ''; ?>>Pending</option>
                            <option value="2"  <?php echo ($filters['status']==2) ? 'selected="selected"' : ''; ?>>Done</option>
                            <option value="3"  <?php echo ($filters['status']==3) ? 'selected="selected"' : ''; ?>>Published</option>
                        </select>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <label for="text-filter">Screen Name:</label>
                        <input type="text" class="form-control" name="filters[screen_name]" placeholder="Screen Name" value="<?php echo (!empty($filters['screen_name'])) ? $filters['screen_name']:''; ?>" />
                        <input type="submit" value="Filtrar" class="btn btn-default" />
                    </div>
                </form>
            </div>
            <div>
               @if(sizeof($threads)<1)
                   <div class="well" style="margin-top:50px;">
                       <h3>No threads found.</h3>
                   </div>
               @else
                   <table class="table table-bordered" id="contact-messages-table">
                        <thead>
                            @php
                                $headers = [
                                    ['name' => 'url','text' => 'URL'],
                                    ['name' => 'screen_name','text' => 'Screen Name'],
                                    ['name' => 'status','text' => 'Status'],
                                    ['name' => 'total_tweets','text' => 'Total Tweets'],
                                    ['name' => 'created_at','text' => 'Created At'],
                                    ['name' => 'updated_at','text' => 'Updated At'],
                                    ['text' => 'Actions']
                                ];
                                echo $helpers->formatTableHeader($headers);
                            @endphp
                        </thead>
                        <tbody>
                            @foreach($threads as $thread)
                                <tr>
                                    <td><a href="{{$thread->url}}" target="_blank">{{$thread->url}}</a></td>
                                    <td>{!!$thread->screen_name!!}</td>
                                    <td>
                                        @php
                                            if($thread->status==1){
                                                echo 'PENDING';
                                            }elseif($thread->status==2){
                                                echo 'DONE';
                                            }else{
                                                echo 'PUBLISHED';
                                            }
                                        @endphp
                                    </td>
                                    <td>{{$thread->total_tweets}}</td>
                                    <td>{{$thread->created_at}}</td>
                                    <td>{{$thread->updated_at}}</td>
                                    <td>
                                        <a class="btn btn-default" target="_blank" href="/adx/system/threads/del?id={{$thread->id}}">Delete</a>
                                        <a class="btn btn-default" target="_blank" href="/adx/system/threads/toogle_status?id={{$thread->id}}">Toogle</a>
                                        <a class="btn btn-default" href="/adx/system/thread/{{$thread->id}}">View</a>
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                    {{ $threads->appends(Input::get())->links('vendor.pagination.bootstrap-4') }}
                @endif
            </div>
            <br/><br/>
        </div>
    </div>
</div>
<div class="modal fade" id="create-thread" tabindex="-1">
  <div class="modal-dialog" role="document">
    <form method="POST" action="/adx/system/threads/store">
        {{csrf_field()}}
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="myModalLabel">New Thread</h4>
          </div>
          <div class="modal-body">
              <input type="text" class="form-control" name="url" placeholder="Tweet URL" />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <input type="submit" class="btn btn-primary" value="Save changes" />
          </div>
        </div>
    </form>
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
