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
        <div class="row" style="padding-top:20px;">
            <div class="col-md-10 col-md-offset-1">
                <button type="button" class="btn btn-primary pull-right" data-toggle="modal" data-target="#create-tweet">
                  New Tweet
                </button>
            </div>
        </div>
        <div class="col-md-10 col-md-offset-1">
            <h1>Tweets</h1>
            <hr/>
            <a href="/adx/system/tweets/show_duplicates" target="_blank" class="btn btn-default">Show Duplicates</a>
            <a href="/adx/system/tweets/reset_pending" class="btn btn-default">Reset Pending</a>
            <div class="filters">
                <form class="form-inline pull-right" method="GET" action="">
                    <div class="form-group">
                        <label for="text-filter">Status:</label>
                        <select class="form-control" name="filters[status]">
                            <option value="-1" <?php echo ((empty($filters['status'])) || ($filters['status']==-1)) ? 'selected="selected"' : ''; ?>>All</option>
                            <option value="1"  <?php echo ($filters['status']==1) ? 'selected="selected"' : ''; ?>>Pending</option>
                            <option value="2"  <?php echo ($filters['status']==2) ? 'selected="selected"' : ''; ?>>Done</option>
                            <option value="3"  <?php echo ($filters['status']==3) ? 'selected="selected"' : ''; ?>>In Process</option>
                        </select>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <label for="text-filter">URL:</label>
                        <input type="text" class="form-control" name="filters[url]" placeholder="URL" value="<?php echo (!empty($filters['url'])) ? $filters['url']:''; ?>" />
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <label for="text-filter">Screen Name:</label>
                        <input type="text" class="form-control" name="filters[screen_name]" placeholder="Screen Name" value="<?php echo (!empty($filters['screen_name'])) ? $filters['screen_name']:''; ?>" />
                        <input type="submit" value="Filtrar" class="btn btn-default" />
                    </div>
                </form>
            </div>
            <div>
               @if(sizeof($tweets)<1)
                   <div class="well" style="margin-top:50px;">
                       <h3>No tweets found.</h3>
                   </div>
               @else
                   <table class="table table-bordered" id="contact-messages-table">
                        <thead>
                            <tr>
                                <th>URL</th>
                                <th>Screen Name</th>
                                <th>status</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach($tweets as $tweet)
                                <tr>
                                    <td><a href="{{$tweet->embed['url']}}" target="_blank">{{$tweet->embed['url']}}</a></td>
                                    <td>{!!$tweet->embed['author_name'] !!}</td>
                                    <td>
                                        @php
                                            echo ($tweet->status == 2) ? 'DONE' : (($tweet->status == 1) ? 'PENDING' : 'IN PROCESS');
                                        @endphp
                                    </td>
                                    <td>{{$tweet->created_at}}</td>
                                    <td>
                                        <a class="btn btn-default" href="/adx/system/tweets/reset_tweet?id={{$tweet->id_str}}">Reset</a>
                                        <a class="btn btn-default" href="/adx/system/tweet/{{$tweet->id_str}}">View</a>
                                        <a class="btn btn-default" href="/adx/system/tweet/del/{{$tweet->_id}}">Delete</a>
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                    {{ $tweets->appends(Input::get())->links('vendor.pagination.bootstrap-4') }}
                @endif
            </div>
            <br/><br/>
        </div>
    </div>
</div>
<div class="modal fade" id="create-tweet" tabindex="-1">
  <div class="modal-dialog" role="document">
    <form method="POST" action="/adx/system/tweets/store">
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
