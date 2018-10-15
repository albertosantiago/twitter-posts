@extends('layouts.app')
@section('content')
<div class="container">
    <div class="row">
        <br/><br/>
        <div class="col-md-8 col-md-offset-2">
            @if (count($errors) > 0)
                <div class="alert alert-danger">
                    <ul>
                        @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif
            <div class="well bs-component" class="col-md-8 ol-md-offset-2" >
                {!! Form::open([
                    'route' => 'admin.cron.store',
                    'class' => 'form-horizontal'
                ]) !!}
                    <fieldset>
                        <legend>Cron Job</legend>
                        {!! Form::token(); !!}
                        <div class="form-group">
                            {!! Form::label('command', 'Command:', ['class' => 'col-lg-2 control-label']) !!}
                            <div class="col-lg-10">
                                {!! Form::select('command', $commands); !!}
                            </div>
                        </div>
                        <div class="form-group">
                            {!! Form::label('params', 'Params:', ['class' => 'col-lg-2 control-label']) !!}
                            <div class="col-lg-10">
                                {{ Form::text('params','',['class' => 'form-control']) }}
                            </div>
                        </div>
                        <div class="form-group">
                            {!! Form::label('periocity', 'Periocity:', ['class' => 'col-lg-2 control-label']) !!}
                            <div class="col-lg-10">
                                {{ Form::cron('cron') }}
                            </div>
                        </div>
                        <div class="form-group" style="text-align:right;padding:20px;padding-bottom:0px;">
                            <a href="{{url('adx/cron')}}" class="btn btn-danger">Volver</a>
                            {!! Form::submit('Create', ['class' => 'btn btn-primary']) !!}
                        </div>
                    </fieldset>
                {!! Form::close() !!}
            </div>
        </div>
    </div>
</div>
@endsection
