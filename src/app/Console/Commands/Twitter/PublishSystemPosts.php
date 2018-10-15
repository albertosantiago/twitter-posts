<?php
namespace App\Console\Commands\Twitter;

use App\Console\Commands\BaseCommand;
use App\Model\Notification;
use App\Model\Post;
use App\Model\User;
use App\Model\Tweet;
use App\Model\TweetThread;

use Carbon\Carbon;

class PublishSystemPosts extends BaseCommand
{
    const MAX_CHARS = 140;
    //Esto es para evitar usar la bbdd en la restauración.
    public $systemLog = true;

    protected $signature   = 'twitter:publish-system-posts';
    protected $description = 'Publica automáticamente los posts creados por el sistema';

    public function __construct(\App\Api\SocialManager $socialManager)
    {
        $this->socialManager = $socialManager;

        $appUser = User::where('screen_name', 'Tweets4Threads')->first();
        $requestToken = [
            'token'  => $appUser['access_token']['oauth_token'],
            'secret' => $appUser['access_token']['oauth_token_secret']
        ];
        app('twitter')->reconfig($requestToken);
        parent::__construct();
    }

    public function start()
    {
        $user = User::where('screen_name', 'Tweets4Threads')->first();

        $lastPublishPosts = Post::where('status', Post::STATUS_PUBLISHED)->orderBy('published_at','DESC')->take(12)->get();
        $skipScreenNames  = [];
        foreach($lastPublishPosts as $post){
            if(!empty($post->author_screen_name)){
                $skipScreenNames[] = $post->author_screen_name;
            }
        }
        $post  = Post::where('status', Post::STATUS_DRAFT)
                                ->where('user_screen_name','Tweets4Threads')
                                ->whereNotIn('author_screen_name', $skipScreenNames)
                                ->orderBy('priority','DESC')
                                ->orderBy('updated_at', 'ASC')
                                ->first();

        if(empty($post)){
            $this->comment("No Posts to publish.");
            return;
        }
        $status = $this->createTweetForPublish($post);

        $ret = app('twitter')->postTweet(['status' => $status, 'format' => 'json']);

        $ret = json_decode($ret);
        $ret->created_at = Carbon::now();
        $ret->updated_at = Carbon::now();
        $embed = $this->socialManager->getCleanOembed($user->screen_name,
                                                $ret->id);
        $ret->embed   = $embed;
        $tweet = Tweet::create((array)$ret);
        $tweet->post_id   = $post->id;
        $tweet->processed = true;
        $tweet->post_root = true;
        $tweet->save();

        $post->status     = Post::STATUS_PUBLISHED;
        $post->status_str = 'published';
        $post->tweet_id     = $tweet->id;
        $post->tweet_id_str = (string)$tweet->id;
        $post->tweet()->associate($tweet);
        $post->published_at = Carbon::now();
        //Esto es el hilo de comentarios.
        $tweetThread = new TweetThread();
        $tweetThread->tweet_id = $tweet->id;
        $tweetThread->post_id  = $post->id;
        $tweetThread->user_id  = $user->id;
        $tweetThread->created_at = Carbon::now();
        $tweetThread->updated_at = Carbon::now();
        $tweetThread->save();
        $tweetThread->tweet()->associate($tweet);
        $tweetThread->save();
        //Salvamos y palante.
        $ret = $post->save();
        $this->info("Post publicado correctamente");
    }

    protected function createTweetForPublish($post)
    {
        $tweet = $post->title;
        $tags = explode(' ',$post->tags);
        for($i=0; $i< sizeof($tags);$i++){
            $aux = $tweet;
            $aux = $aux.' '.$tags[$i];
            //116 es el espacio sobrante despues de meter el link.
            if(strlen($aux) < 115){
                $tweet = $aux;
            }
        }
        $baseURL = " https://twitter-posts.com";
        $tweet .= $baseURL.'/es/articulos/ver/'.$post->slug.'/'.$post->id;
        return $tweet;
    }

}
?>
