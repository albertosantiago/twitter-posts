@extends('layouts.app')
@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-10 col-md-offset-1">
            <a  style="margin-top:20px"  href="{{ url('/adx/cron/create')}}" class="pull-right btn btn-primary">Add</a>
            <h1 style="width:200px;float:left;">
                Crontab
            <br/>
            </h1>
            <div>
                <table class="table table-bordered">
                    <tr>
                        <th>Process</th>
                        <th>Params</th>
                        <th>Cron</th>
                        <th>Log</th>
                        <th>Actions</th>
                    </tr>
                    @foreach ($cronTasks as $cronTask)
                    <tr>
                        <td style="font-size:1em;">{{ $cronTask->command }}</td>
                        <td style="font-size:1em;">{{ $cronTask->params }}</td>
                        <td><pre style="text-align:center;font-size:1.2em;">{{ $cronTask->cron }}</pre></td>
                        <td>
                            <a href="{{url('adx/log/?namespace='.$cronTask->command)}}" class="btn btn-primary" >View</a>
                        </td>
                        <td>
                            {!! Form::open([
                               'method' => 'DELETE',
                               'route' => ['admin.cron.destroy', $cronTask->id]
                           ]) !!}
                               {!! Form::submit('Delete', ['class' => 'btn btn-danger']) !!}
                           {!! Form::close() !!}
                        </td>
                    </tr>
                    @endforeach
                </table>
            </div>
        </div>
    </div>
</div>
@endsection
