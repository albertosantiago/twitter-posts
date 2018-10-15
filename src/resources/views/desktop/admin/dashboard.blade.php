@extends('layouts.app')
@section('content')
<style type="text/css">
    .dashboard{
        padding-top:50px;
    }
    .dashboard .stat-container{
        width:90%;
    }
    .dashboard h3{
        padding-bottom:10px;
        margin-bottom:25px;
        border-bottom:1px solid #ccc;
        width:auto;
    }
    .dashboard ul{
        padding:0px;
    }
    .dashboard ul li{
        list-style-type:none;
        font-size:1.2em;
    }
    .dashboard ul li span{
        font-weight:600;
    }
    .dashboard ul li label{
        width:240px;
        font-weight:normal;
    }
</style>
<div class="container-fluid dashboard">
    <div class="row">
        <div class="col-md-6 col-md-offset-3">
            <div class="page-header">
                <h2>Admin Dashboard</h2>
            </div>
            <div class="page-content">
                <div class="row">
                    <div class="col-md-6">
                        <div class="stat-container well well-lg">
                            <h3>User stats</h3>
                            <ul>
                                <li><label>Users created this week:</label><span class="data">{{$userStats['week']}}</span></li>
                                <li><label>Users created today:</label><span class="data">{{$userStats['today']}}</span></li>
                                <li><label>Users created last 24 hours:</label><span class="data">{{$userStats['last24']}}</span></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="stat-container  well well-lg">
                            <h3>Posts stats</h3>
                            <ul>
                                <li><label>Posts created this week:</label><span class="data">{{$postStats['week']}}</span></li>
                                <li><label>Posts created today:</label><span class="data">{{$postStats['today']}}</span></li>
                                <li><label>Posts created last 24 hours:</label><span class="data">{{$postStats['last24']}}</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <!--
                <div class="row">
                    <div class="col-md-6">
                        <h3>Tweets stats</h3>
                        <ul>
                            <li><label>Tweets created this week:</label> 1287</li>
                            <li><label>Tweets created today:</label> 12</li>
                            <li><label>Tweets created last 24 hours:</label> 124</li>
                        </ul>
                    </div>
                </div>
                -->
            </div>
        </div>
    </div>
</div>
@endsection
@section('js')
@endsection
