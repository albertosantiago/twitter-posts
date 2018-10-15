<?php namespace App\Api;

class ThreadRenderHelper{

    public function render($thread, $level=2, $first=false)
    {
        if(($level==0)||(empty($thread))){
            return;
        }
        if($first){
            echo "<div class='tweet-box'>\n";
            $this->renderTweet($thread->tweet, $level);
            echo "<div id='responses-for-".$thread->tweet->id."' class='responses-container'>\n";
        }
            $tweets = $thread->replies()->get();
            if($tweets->isNotEmpty()){
                foreach($tweets as $tweetThread)
                {
                    echo "<div class='tweet-box'>\n";
                    $tweet = $tweetThread->tweet;
                    $this->renderTweet($tweet, $level);
                    echo "<div id='responses-for-".$tweet->id."' class='responses-container'>\n";
                        $auxLevel = $level-1;
                        $this->render($tweetThread, $auxLevel);
                    echo "</div>\n";
                    echo "</div>\n";
                }
            }
        if($first){
            echo "</div>\n";
            echo "</div>\n";
        }
    }

    protected function renderTweet($tweet, $level){
        echo "<div id='tweet-container-".$tweet->id."' class='tweet-container'>";
        echo $tweet->embed['html'];
        echo "</div>";
        $url = $tweet->embed['url'];
        echo "<div id='editor-for-".$tweet->id."' data-level='".$level."' data-url='".$url."' class='editor-container'></div>\n";
        echo "<div class='clearfix'></div>\n";
    }
}
