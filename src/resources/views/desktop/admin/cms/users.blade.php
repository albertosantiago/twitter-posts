@extends('layouts.app')
@section('content')
@inject('helpers', 'App\Api\BladeHelpers');
<style type="text/css">
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
</style>
<div class="container-fluid">
    <div class="row">
        <div class="col-md-10 col-md-offset-1">
            <h1>Users</h1>
            <div>
               @if(sizeof($users)<1)
                   <div class="well">
                       <h3>No Users found.</h3>
                   </div>
               @else
                   <table class="table table-bordered" id="contact-messages-table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Screename</th>
                                <th>Editor</th>
                                <th>Created At</th>
                                <th>Updated At</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach($users as $user)
                                <tr>
                                    <td>{{$user->id}}</td>
                                    <td><a target="_blank" href="https://twitter.com/{{$user->screen_name}}">{{$user->screen_name}}</a></td>
                                    <td>
                                        <?php
                                            $helpers->booleanTranslate($user->isEditor);
                                        ?>
                                    </td>
                                    <td>{{$user->created_at}}</td>
                                    <td>{{$user->updated_at}}</td>
                                    <?php
                                        $userHome = "/@".$user->screen_name;
                                    ?>
                                    <td><a class="btn btn-default" target="_blank" href="{{$userHome}}/">Home</a></td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                    {{ $users->appends(Input::get())->links() }}
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
