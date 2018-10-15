<html>
<head>
    <style>
    label,input,h1{
        margin-left:20px;
        margin-bottom:20px;
    }

    </style>
    <script
      src="https://code.jquery.com/jquery-3.2.1.min.js"
      integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
      crossorigin="anonymous"></script>
    <script type="text/javascript">

        function setHtmlCode(){
            var iframe = $("#tweet-processed iframe")[0];
            var dom = iframe.contentWindow.document;
            htmlCode = $(dom).find(".Tweet-text").html();
            $("#htmlCode").val(htmlCode);
        }
        function submitUpdate(){
            $("#update_form").submit();
        }
  </script>
  <script type="text/javascript">
      Element.prototype.attachShadow = undefined;
      Element.prototype.createShadowRoot = undefined;
  </script>
  @if($tweet!=null)
      <meta name="tweet_id" content="<?php echo $tweet->id_str?>" />
  @else
      <meta name="tweet_id" content="0" />
  @endif
</head>
<body style="padding:0px;margin:0px;min-height:0px;">
    <div id="tweet-processed" style="width:550px;max-width:100%;position:absolute;top:0px;left:0px;height:auto;min-height:0px;">
        @php
            if($tweet!=null){
                if($withMedia){
                    echo  $tweet->embed['html'];
                }else{
                    echo str_replace("<blockquote", "<blockquote data-cards='hidden' ", $tweet->embed['html']);
                }
            }else{
                die;
            }
        @endphp
    </div>
    <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
    <script type="text/javascript">
    window.setTimeout(function(){
        setHtmlCode();
        window.setTimeout(function(){
            submitUpdate();
        },1000);
    },2000);

    </script>
@php
if($debug){
    echo '<div style="margin-top:750px;font-family:Arial">';
} else{
    echo '<div style="width:0px;height:0px;overflow:hidden">';
}
@endphp
    <form name="update_form" id="update_form" action="/snp/updateHtml" method="post" enctype="multipart/form-data">
        <h1>Upload Form</h1>
        <input type="hidden" name="key" value="{{$key}}" />
        <input type="hidden" name="tweetId" value="{{$tweet->id_str}}" />
        <label for="htmlCode">Html Code:</label>
        <input type="text" name="htmlCode" id="htmlCode" />
        {{csrf_field()}}
        <input type="submit">
    </form>
</div>
</body>
</html>
