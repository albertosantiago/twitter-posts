<?php
$joinDate = $owner->created_at->format("F Y");
$withUrl = true;
try{
    $expandedURL = $owner->entities->url->urls[0]->expanded_url;
    $displayURL  = $owner->entities->url->urls[0]->display_url;
}catch(Exception $e){
    $withUrl = false;
}
?>
<h2>{{ $owner->name }}</h2>
<p><a href="https://twitter.com/{{$owner->screen_name}}" target="_blank">{{ "@".$owner->screen_name }}</a></p>
<p>{{ $owner->description }}</p>
@if($withUrl)
    <p><i class="linkify icon"></i><a href="{{ $expandedURL }}" target="_blank" rel="nofollow">{{$displayURL}}</a></p>
@endif
<p><i class="calendar icon"></i>Joined {{ $joinDate }}</p>
