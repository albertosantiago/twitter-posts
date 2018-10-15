@extends('layouts.app')
@section('content')
<style>
table.dataTable thead .sorting {
    background-color:#f8f8f8;
}
table.dataTable thead .sorting_desc{
    background-color:#f8f8f8;
}
table.dataTable thead .sorting_asc{
    background-color:#f8f8f8;
}
</style>
<div class="container-fluid">
    <div class="row">
        <div class="col-md-10 col-md-offset-1">
            <h1>System Log</h1>
            <br/>
            <div>
                @if(sizeof($logs)<1)
                    <div class="well">
                        <h3>No logs were found.</h3>
                    </div>
                @else
                    {!! Form::open([
                       'method' => 'DELETE',
                       'route' => ['admin.log.clear']
                   ]) !!}
                       <table class="table table-bordered" id="dataTable">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Level</th>
                                    <th>Namespace</th>
                                    <th>Message</th>
                                    <th>Date</th>
                                    <th>Extra</th>
                                    <th>
                                        <input checked='false' type="checkbox" onclick='selectAll(this.checked);' />
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach($logs as $log)
                                    <tr>
                                        <td>{{$log->id}}</td>
                                        <td>{{$log->level}}</td>
                                        <td>{{$log->namespace}}</td>
                                        <td style="max-width:500px;">{{$log->message}}</td>
                                        <td>{{$log->created_at}}</td>
                                        <td><?php echo json_encode($log->extra); ?></td>
                                        <td><input type="checkbox" name="delete[{{$log->id}}]"/></td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                        {{ $logs->appends(Input::get())->links() }}
                        <div class="row" id="selectionActions" style="padding-bottom:20px;">
                            <div class="col-sm-6 pull-right">
                                <button type="submit" class="pull-right btn btn-danger" name="clear-all" value="1">Clear All</button>
                                <button type="submit" class="pull-right btn btn-primary" style="margin-right:10px;" name="clear-selected" value="1">Clear Selected</button>
                            </div>
                        </div>
                    {!! Form::close() !!}
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
        $("#dataTable input:checkbox").prop("checked", status);
    }
</script>
@endsection
