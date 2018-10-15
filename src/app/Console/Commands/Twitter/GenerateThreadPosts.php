<?php
namespace App\Console\Commands\Twitter;

use App\Console\Commands\BaseCommand;
use App\Model\Post;
use App\Model\Thread;
use App\Model\Tweet;
use App\Model\User;
use App\Model\Author;
use Carbon\Carbon;

class GenerateThreadPosts extends BaseCommand
{
    //Esto es para evitar usar la bbdd en la restauración.
    public $systemLog = true;

    protected $signature   = 'twitter:gen-thread-posts
                                {--thread=}
                                {--auto=}';
    protected $description = 'Genera Posts en base a hilos descargados';

    public function __construct()
    {
        parent::__construct();
    }

    public function start()
    {
        $threadId = $this->option('thread');
        if(!empty($threadId)){
            $thread = Thread::find($threadId);
            if(empty($thread->post_id)){
                $this->generatePostThread($thread);
            }
        }
        $total = (int) $this->option('auto');
        if(!empty($total)){
            $this->generatePosts($total);
        }
    }

    public function generatePosts($total)
    {
        for($i=0;$i<$total;$i++){
            $thread = Thread::where('status',Thread::STATUS_DONE)->orderBy('first_tweet_id')->first();
            if(empty($thread)){
                $this->info("There are no more pending threads.");
                return;
            }
            $this->generatePostThread($thread);
        }
    }

    protected function generatePostThread($thread)
    {
        $user = User::where('screen_name','Tweets4Threads')->first();
        $this->info("Generating post for Thread ".$thread->_id);
        $this->line("First tweet: ".$thread->first_tweet_id);
        $this->line("User Screen Name: ".$thread->screen_name);
        $content  = "<p>Tweet description...</p>";
        $content .= "<twp-tweet-thread><twp-data>";
        $tweets = $thread->tweets;
        $userName = '';
        foreach($tweets as $tweet){
            $this->comment("Recovering tweet $tweet");
            $tweet = Tweet::where('id_str', $tweet)->first();
            if(empty($tweet)){
                $this->comment("Tweet $tweet not found");
                die;
            }

            $imgs  = json_encode($tweet->imgs);
            $links = json_encode($tweet->links);
            $video   = $tweet->video;
            $youtube = $tweet->youtube;

            $authorName = htmlspecialchars($tweet->author_name);
            $content .= "<twp-tweet id='".$tweet->id_str."'
                            data-url='".$tweet->embed['url']."'
                            data-images='".$imgs."'
                            data-links='".$links."'
                            data-video='".$video."'
                            data-youtube='".$youtube."'
                            data-author-name=\"".$authorName."\"
                            data-author-screen-name='".$tweet->screen_name."'
                            data-author-image='".$tweet->author_profile_image."'
                            data-text='".$tweet->text."'>
                                <div class='tweet'>".$tweet->embed['html']."</div>
                                <div class='tweet-alt'>".$tweet->htmlCode."</div>
                        </twp-tweet>";

            if(empty($userName)){
                $userName = $tweet->embed['author_name'];
            }
        }
        $content .= "</twp-data></twp-tweet-thread>";
        $post = new Post();
        $post->content = $content;
        $post->title = "Hilo de $userName (@$thread->screen_name)";
        $post->user_id = $user->id;
        $post->user_name = $user->name;
        $post->user_screen_name = $user->screen_name;
        $post->user_profile_image_url = $user->profile_image_url;
        $post->user_profile_image_url_https = $user->profile_image_url_https;
        $post->slug = "_";
        $post->tags = "#$thread->screen_name";
        $post->adult_content = false;
        $post->comments_status = true;
        $post->in_reply_to = null;
        $post->excerpt = "";
        $post->short_desc = "";
        $post->last_view  = Carbon::now();
        $post->updated_at = Carbon::now();
        $post->created_at = Carbon::now();
        $post->modified_at  = Carbon::now();
        $post->published_at = Carbon::now();
        $post->status = Post::STATUS_DRAFT;
        $post->status_str = 'draft';
        $post->active = true;
        $post->threadId = $thread->_id;
        $post->system_adult_rev = false;
        $post->system_ads_approved = true;
        $post->system_pending_rev = true;
        $post->system_mentions_done = false;
        $post->system_last_syncro   = Carbon::now();
        $post->system_publish_processed = false;
        $post->system_generated_post    = true;
        $post->system_priority = 0;
        $post->author_profile_image = $this->getAuthorImage($thread->screen_name);
        $post->author_screen_name   = $thread->screen_name;
        $post->save();
        $thread->status = Thread::STATUS_PUBLISHED;
        $thread->post_id = $post->_id;
        $thread->save();
    }

    public function getAuthorImage($screenName)
    {
        $author = Author::where('screen_name',$screenName)->first();
        if(!empty($author)){
            if(!empty($author->local_big_profile_image)){
                return $author->local_big_profile_image;
            }
            if(!empty($author->local_profile_image)){
                return $author->local_profile_image;
            }
        }
        return '';
    }
}
?>
