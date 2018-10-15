@inject('helpers', 'App\Api\FrontalHelpers')
@extends('user-admin-layout')
@section('content')
<div id="editor-app">
    <div class="ui segment" style="min-height:600px;">
        <div class="ui active inverted dimmer">
            <p></p>
            <div class="ui loader"></div>
        </div>
    </div>
</div>
@endsection
@section('css')
    <link rel="stylesheet" href="/bower_components/emojionearea/dist/emojionearea.min.css">
@endsection
@section('js')
    <script type="text/javascript">
        var post = <?php echo json_encode($post) ?>;
        post.id  = '<?php echo $post->_id; ?>';
    </script>
    <script type="text/javascript" src="{{$helpers->cdn("/js/editor.js")}}" ></script>
@endsection
