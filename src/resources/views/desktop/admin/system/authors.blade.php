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
                  New Author
                </button>
            </div>
        </div>
        <div class="col-md-10 col-md-offset-1">
            <h1>Authors</h1>
            <hr/>
            <br/>
            <div class="filters">
                <form class="form-inline pull-right" method="GET" action="">
                    <div class="form-group">
                        <label for="text-filter">Screen Name:</label>
                        <input type="text" class="form-control" name="filters[screen_name]" placeholder="Screen Name" value="<?php echo (!empty($filters['screen_name'])) ? $filters['screen_name']:''; ?>" />
                        <input type="submit" value="Filtrar" class="btn btn-default" />
                    </div>
                </form>
            </div>
            <div>
               @if(sizeof($authors)<1)
                   <div class="well" style="margin-top:50px;">
                       <h3>No Authors Found.</h3>
                   </div>
               @else
                   <table class="table table-bordered" id="contact-messages-table">
                        <thead>

                            @php
                                $headers = [
                                    ['name' => 'id','text' => 'ID'],
                                    ['name' => 'screen_name','text' => 'Screen Name'],
                                    ['name' => 'name','text' => 'Author Name'],
                                    ['name' => 'image','text' => 'Image'],
                                    ['name' => 'created_at','text' => 'Created At'],
                                    ['name' => 'updated_at','text' => 'Updated At'],
                                    ['text' => 'Actions']
                                ];
                                echo $helpers->formatTableHeader($headers);
                            @endphp
                        </thead>
                        <tbody>
                            @foreach($authors as $author)
                                <tr>
                                    <td>{{$author->id}}</td>
                                    <td><a target="_blank" href="https://twitter.com/{{$author->screen_name}}">{{$author->screen_name}}</a></td>
                                    <td>{{$author->name}}</td>
                                    <td><img src='https://twitter-posts.com/{{$author->local_profile_image}}'/></td>
                                    <td>{{$author->created_at}}</td>
                                    <td>{{$author->updated_at}}</td>
                                    <td><a href="/adx/system/authors/update?screenName={{$author->screen_name}}" class="btn btn-default">Update</a></td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                    {{ $authors->appends(Input::get())->links('vendor.pagination.bootstrap-4') }}
                @endif
            </div>
            <br/><br/>
        </div>
    </div>
</div>
<div class="modal fade" id="create-tweet" tabindex="-1">
  <div class="modal-dialog" role="document">
    <form method="POST" action="/adx/system/authors/store">
        {{csrf_field()}}
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="myModalLabel">New Author</h4>
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
