<?php
namespace App\Console\Commands\Twitter;

use App\Console\Commands\BaseCommand;
use App\Model\Notification;
use App\Model\Post;
use App\Model\User;
use Carbon\Carbon;

class RetweetPublications extends BaseCommand
{
    const MAX_CHARS = 140;
    //Esto es para evitar usar la bbdd en la restauración.
    public $systemLog = true;

    protected $signature   = 'twitter:publish-process';
    protected $description = 'Twittea los nuevos contenidos y Retwitea los enviados';

    public function __construct()
    {
        parent::__construct();
    }

    public function start()
    {
        $cont = 0;
        $posts = Post::where('status', Post::STATUS_PUBLISHED)
                                ->where('system_publish_processed', '<>', true)
                                ->get();

        foreach($posts as $post){
            $this->processPost($post);
            $post->system_publish_processed = true;
            $post->save();
            $cont++;
        }
        $this->info("Processed $cont posts");
    }

    protected function processPost($post)
    {
        $this->retweetPublication($post);
    }

    private function retweetPublication($post)
    {
        try{
            $appUser = User::where('screen_name','Tweet4Posts')->first();
            $requestToken = [
                'token'  => $appUser['access_token']['oauth_token'],
                'secret' => $appUser['access_token']['oauth_token_secret']
            ];
            app('twitter')->reconfig($requestToken);
            $ret = app('twitter')->post('statuses/retweet/'.$post->tweet_id_str.'.json');
            return $ret;
        }catch(\Exception $e){
            return false;
        }
    }
}
?>
