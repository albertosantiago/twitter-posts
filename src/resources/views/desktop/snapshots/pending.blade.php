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
        var videoURL = undefined;
        var images   = [];
        var youtube  = undefined;
        var htmlCode = undefined;

        function getHtmlCode(){
            return htmlCode;
        }
        function getHeight(){
            return $("#tweet-processed").innerHeight();
        }
        function getWidth(){
            return $("#tweet-processed").innerWidth();
        }
        function getVideo(){
            return videoURL;
        }
        function getImages(){
            return images;
        }
        function getYoutubeIframe(){
            return youtube;
        }
        function setHtmlCode(){
            var iframe = $("#tweet-processed iframe")[0];
            var dom = iframe.contentWindow.document;
            htmlCode = $(dom).find(".Tweet-text").html();
        }
        function setVideo(){
            var iframe = $("#tweet-processed iframe")[0];
            var dom = iframe.contentWindow.document;
            $(dom).find("article img").click();

            window.setTimeout(function(){
                $(dom).find("article button.Interstitial-cookieConsentButton").click();
                window.setTimeout(function(){
                    var videoIframe = $(dom).find("iframe")[0];
                    if(videoIframe!==undefined){
                        var videoDom = videoIframe.contentWindow.document;
                        var videoElm = $(videoDom).find("video")[0];
                        videoURL = $(videoElm).attr('src');
                        if(videoURL===undefined){
                            var config = $(videoDom).find("#playerContainer").attr('data-config');
                            videoURL = JSON.parse(config).video_url;
                        }else{
                            if(videoURL.match('blob')!==-1){
                                var config = $(videoDom).find("#playerContainer").attr('data-config');
                                videoURL = JSON.parse(config).video_url;
                            }
                        }
                    }
                }, 1000);
            }, 1000);
        }
        function setImages(){
            var iframe = $("#tweet-processed iframe")[0];
            var dom = iframe.contentWindow.document;
            $(dom).find("article .ImageGrid img").each(function(){
                images.push($(this).attr("src"));
            });
            $(dom).find("article img.NaturalImage-image").each(function(){
                images.push($(this).attr("src"));
            });
        }
        function setYoutubeIframe(){
            var iframe = $("#tweet-processed iframe")[0];
            var dom = iframe.contentWindow.document;
            $(dom).find("article iframe").each(function(){
                var url = $(this).attr("src");
                if(url.indexOf("youtube")!==-1){
                    youtube = $('<div>').append($(this).clone()).html();
                }
            });
        }
        //Funciones para envio de datos.
        function setFormValues(youtubeCode, htmlCode){
            $("#youtubeCode").val(youtubeCode);
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
        setVideo();
        setImages();
        setHtmlCode();
        window.setTimeout(function(){
            setYoutubeIframe();
        },2000);
    },2000);

    </script>
@php
if($debug){
    echo '<div style="margin-top:750px;font-family:Arial">';
} else{
    echo '<div style="width:0px;height:0px;overflow:hidden">';
}
@endphp
    <form name="update_form" id="update_form" action="/snp/update" method="post" enctype="multipart/form-data">
        <h1>Upload Form</h1>
        <input type="hidden" name="key" value="{{$key}}" />
        <input type="hidden" name="tweetId" value="{{$tweet->id_str}}" />
        <label for="snapshot">Snapshot:</label>
        <input type="file" name="snapshot" />
        <br/>
        <label for="snapshot_mobile">Snapshot Mobile:</label>
        <input type="file" name="snapshot_mobile" />
        <br/>
        <label for="snapshot_nomedia">Snapshot NoMedia:</label>
        <input type="file" name="snapshot_nomedia" />
        <br/>
        <label for="snapshot_mobile_nomedia">Snapshot Mobile NoMedia:</label>
        <input type="file" name="snapshot_mobile_nomedia" />
        <br/>
        <label for="img_0">Img 0:</label>
        <input type="file" name="img_0" />
        <br/>
        <label for="img_1">Img 1:</label>
        <input type="file" name="img_1" />
        <br/>
        <label for="img_2">Img 2:</label>
        <input type="file" name="img_2" />
        <br/>
        <label for="img_3">Img 3:</label>
        <input type="file" name="img_3" />
        <br/>
        <label for="video">Video:</label>
        <input type="file" name="video" />
        <br/>
        <label for="youtubeCode">Youtube Code:</label>
        <input type="text" name="youtubeCode" id="youtubeCode" />
        <br/>
        <label for="link_0">Link 0:</label>
        <input type="text" name="link_0" />
        <br/>
        <label for="link_1">Link 1:</label>
        <input type="text" name="link_1" />
        <br/>
        <label for="youtubeCode">Youtube Code:</label>
        <input type="text" name="htmlCode" id="htmlCode" />
        {{csrf_field()}}
        <input type="submit">
    </form>
</div>
</body>
</html>
