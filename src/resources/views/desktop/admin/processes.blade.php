@extends('layouts.app')
@section('content')
<div class="container-fluid">
    <div class="row">
        <div class="col-md-10 col-md-offset-1">
            <h1>Application Processes</h1>
            <br/>
            <div>
                <table class="table table-bordered">
                    <tr>
                        <th>Process</th>
                        <th>Last Execution</th>
                        <th>Status</th>
                        <th>Log</th>
                        <th>Actions</th>
                    </tr>
                    @foreach ($processes as $process)
                    <tr>
                        <td style="font-size:1em">{{ $process->getSignature() }}</td>
                        <td><pre style="width:100%;max-width:1000px;overflow:scroll;margin:0 auto;">{!! $process->getLastExecution() !!}</pre></td>
                        <td>
                            @if ($process->getStatus()==0)
                                <span class="alert-danger" style="font-weight:bold;padding:20px;">
                                    STOPPED&nbsp;&nbsp;
                                    <span aria-hidden="true" class="glyphicon glyphicon-stop"></span>
                                </span>
                            @else
                                <span class="alert-success" style="font-weight:bold;padding:20px;">
                                    RUNNING&nbsp;&nbsp;
                                    <span aria-hidden="true" class="glyphicon glyphicon-play"></span>
                                </span>
                            @endif
                        </td>
                        <td>
                            <a href="{{ url('/adx/log/?namespace='.$process->getSignature()) }}" class="btn btn-primary" >View</a>
                        </td>
                        <td>
                            <a href="{{ url('/adx/processes/exec', [$process->getSignature()] ) }}" class="btn btn-primary" >Exec</a>
                        </td>
                    </tr>
                    @endforeach
                </table>
            </div>
        </div>
    </div>
</div>
@endsection
