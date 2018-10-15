<?php
namespace App\Console\Commands\Twitter;

use App\Console\Commands\BaseCommand;
use App\Model\Post;
use App\Model\User;
use App\Model\Tweet;
use Carbon\Carbon;
use App\Api\SocialManager  as SocialManager;

class SearchReplies extends BaseCommand
{
    //Esto es para evitar usar la bbdd en la restauración.
    public $systemLog = true;

    protected $signature   = 'twitter:search-replies';
    protected $description = 'Busqueda de respuestas desde twitter';

    public function __construct(SocialManager  $socialManager)
    {
        parent::__construct();
        $this->socialManager = $socialManager;
    }

    public function start()
    {
        while(true){
            $toSkip   = Carbon::now()->subMinute(1);
            $toUpdate = Carbon::now()->subMonth(1);
            $posts = Post::where('status', Post::STATUS_PUBLISHED)
                            ->where('updated_at','>', $toUpdate)
                            ->where('system_last_syncro','<', $toSkip)
                            ->orderBy('system_last_syncro','DESC')
                            ->take(5)
                            ->get();

            if($posts->count()==0){
                $this->info("Syncronización completada.");
                return;
            }
            foreach($posts as $post){
                $this->line("Procesando post:".$post->title);
                $total = $this->syncronizeTweets($post);
                $this->info("Registered $total new Tweets for the post.");
                $post->system_last_syncro = Carbon::now();
                $post->save();
                app('jobManager')->dispatchPostJobs($post->id);
                sleep(10);
            }
        }
    }

    protected function syncronizeTweets($post)
    {
        try{
            $count = 0;
            $tweets = $this->getRelatedTweets($post);
            foreach($tweets as $tweet)
            {
                $exist = Tweet::where('id',$tweet->id)->count();
                if(!$exist){
                    $this->line("Adding new reply to the post...");
                    $tweet->created_at = Carbon::now();
                    $tweet->updated_at = Carbon::now();
                    $embed = $this->socialManager->getCleanOembed($post->user_screen_name,
                                                                  $tweet->id);
                    $tweet->embed = $embed;
                    $tweet = Tweet::create((array)$tweet);
                    $tweet->post_id   = $post->id;
                    $tweet->post_root = false;
                    $tweet->processed = false;
                    $tweet->save();
                    $count++;
                }
            }
            return $count;
        }catch(\Exception $e){
            return 0;
        }
    }

    protected function getRelatedTweets($post){
        $tweets  = [];
        $tweetId = $post->tweet_id;
        $this->setUserApi($post->user_id);
        $userScreenName = $post->user_screen_name;
        $params = [
            'q' => "to:$userScreenName",
            'count' => 100
        ];
        $mentions = app('twitter')->get('/search/tweets.json', $params);
        $mentions = $mentions->statuses;
        foreach($mentions as $tweet){
            if($tweet->in_reply_to_status_id==$tweetId){
                $tweets[] = $tweet;
            }
        }
        return $tweets;
    }

    protected function setUserApi($userId)
    {
        $user = User::where('id', $userId)->first();
        $this->line("Configurando api de twitter para su uso como el usuario: ".$user->name);
        $requestToken = [
            'token'  => $user['access_token']['oauth_token'],
            'secret' => $user['access_token']['oauth_token_secret']
        ];
        app('twitter')->reconfig($requestToken);
        return true;
    }

}
?>
