@inject('helpers', 'App\Api\BladeHelpers')
@extends('layouts.app')
@section('content')
<div class="container-fluid">
    <div class="row">
        <div class="col-md-10 col-md-offset-1">
            <h1>Tweet</h1>
            <div class="row">
                <div class="col-md-6">
                    <h3>Tweet Resources</h3>
                    <h4>Text</h4>
                    @php
                        echo $tweet->text;
                    @endphp
                    <h4>Html</h4>
                    @php
                        echo $tweet->htmlCode;
                    @endphp
                    <h4>Backups</h4>
                    @php
                    if(!empty($tweet->snapshot)){
                        echo "<img src='$tweet->snapshot' style='margin:10px;' />";
                        echo "<img src='$tweet->snapshot_mobile' style='margin:10px;' />";
                        echo "<img src='$tweet->snapshot_nomedia' style='margin:10px;' />";
                        echo "<img src='$tweet->snapshot_mobile_nomedia' style='margin:10px;' />";
                    }else{
                        echo "<p>Tweet without backups...</p>";
                    }
                    @endphp
                    <h4>Links</h4>
                    <div class="well">
                        @php
                        if(!empty($tweet->links)){
                            foreach($tweet->links as $link){
                                echo "<a href='$link' target='_blank'>$link</a>";
                            }
                        }else{
                            echo "<p>Tweet without links...</p>";
                        }
                        @endphp
                    </div>
                    <h4>Images</h4>
                    @php
                        if(!empty($tweet->imgs)){
                            foreach($tweet->imgs as $img){
                                echo "<img src='$img' style='margin:10px;max-width:60%;' />";
                            }
                        }else{
                            echo "<p>Tweet without images</p>";
                        }
                    @endphp
                    <h4>Video</h4>
                    @php
                    if(!empty($tweet->video)){
                        echo "<video width='320' height='240' controls>
                                <source src='$tweet->video' type='video/mp4'>
                                Your browser does not support the video tag.
                              </video>";
                    }else{
                        if(!empty($tweet->youtubeCode)){
                            echo $tweet->youtubeCode;
                        }else{
                            echo "<p>Tweet without video</p>";
                        }
                    }
                    @endphp
                </div>
                <div class="col-md-6">
                    <h3>Rendered Tweet</h3>
                    @php
                    echo  $tweet->embed['html'];
                    echo "<div class='clearfix'></div><hr/>";
                    echo str_replace("<blockquote", "<blockquote data-cards='hidden' ", $tweet->embed['html']);
                    @endphp
                </div>
            </div>
        </div>
    </div>
    <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
</div>
@endsection
