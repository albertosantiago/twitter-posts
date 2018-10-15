@extends('layouts.app')
@section('content')
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-6 col-md-offset-3">
                @if(empty($user))
                    <h1>App User <small>(Twitter Bot)</small></h1>
                    <hr/>
                    <div class="well">
                        <h3>No user was found.</h3>
                        <br/>
                        <a href="/adx/twitter-bot/login" class="btn btn-primary">Set App User</a>
                        <br/><br/>
                    </div>
                @else
                    <div class="well">
                        <h3>{{$user->name}}&nbsp;&nbsp;<small>{{"@".$user->screen_name}}</small></h3>
                        <br/>
                        <a href="/adx/twitter-bot/refresh" class="btn btn-primary">Refresh User</a>
                        <br/><br/>
                    </div>
                @endif
            </div>
        </div>
    </div>
@endsection
