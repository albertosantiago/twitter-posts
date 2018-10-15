<?php
namespace App\Console\Commands\Twitter;

use App\Console\Commands\BaseCommand;
use App\Model\Notification;
use App\Model\Post;
use App\Model\User;
use Carbon\Carbon;

class SendMentions extends BaseCommand
{
    const MAX_POST_NOTIFICATIONS_ALLOWED = 12;
    const MAX_CHARS = 140;
    const LINK_TWITTER_SIZE = 23;
    //Esto es para evitar usar la bbdd en la restauración.
    public $systemLog = true;

    protected $signature   = 'twitter:send-mentions';
    protected $description = 'Notifica a los usuarios mencionados en twitter';

    public function __construct()
    {
        $appUser = User::where('system_user', true)->first();
        $requestToken = [
            'token'  => $appUser['access_token']['oauth_token'],
            'secret' => $appUser['access_token']['oauth_token_secret']
        ];
        app('twitter')->reconfig($requestToken);
        parent::__construct();
    }

    public function start()
    {
        $totalNotifications = 0;
        $posts = Post::where('status', Post::STATUS_PUBLISHED)
                                ->where('system_mentions_sended', '<', self::MAX_POST_NOTIFICATIONS_ALLOWED)
                                ->where('system_mentions_done', false)
                                ->where('mention_notifications_status', true)
                                ->get();

        foreach($posts as $post){
            $pendingNotifications = [];
            $mentions = $post->mentions;
            foreach($mentions as $mention){
                $mention = str_replace('@','',$mention);
                $notification = Notification::where('post_id', $post->id)
                                    ->where('type',Notification::TYPE_MENTION)
                                    ->where('user_screen_name', $mention)
                                    ->first();
                if(!$notification){
                    $pendingNotifications[] = $mention;
                }
            }
            if(!empty($pendingNotifications)){
                $postNotifications = $this->sendNotifications($pendingNotifications, $post);
                $this->comment("Notified $postNotifications users for post: $post->title");
                $totalNotifications += $postNotifications;
            }
            $post->system_mentions_done = true;
            $post->save();
            sleep(15);
        }
        $this->info("Notified $totalNotifications users.");
    }

    protected function sendNotifications($mentions, $post)
    {
        $text = "somebody is talking about you in Twitter-Posts. ";
        $link = $post->createURL();
        $mentionsString = "";
        $total = 0;

        $statusMentions = [];
        foreach($mentions as $mention){
            $tmpMentionsString = "@".$mention." ".$mentionsString;
            if((strlen($tmpMentionsString.$text)+self::LINK_TWITTER_SIZE)>135){
                $status = $mentionsString.$text.$link;
                $tweet = $this->sendAppTweet($status);
                $postTotalNotifications = $this->saveNotifications($post, $statusMentions, $tweet);
                if($postTotalNotifications > self::MAX_POST_NOTIFICATIONS_ALLOWED){
                    return;
                }
                $total += sizeOf($statusMentions);
                $statusMentions = [];
                $mentionsString = "@".$mention." ";
            }else{
                $mentionsString = $tmpMentionsString;
            }
            $statusMentions[] = $mention;
        }
        if(!empty($mentionsString)){
            $status = $mentionsString.$text.$link;
            $tweet = $this->sendAppTweet($status);
            $this->saveNotifications($post, $statusMentions, $tweet);
            $total += sizeOf($statusMentions);
        }
        return $total;
    }

    private function saveNotifications($post, $statusMentions, $tweet)
    {
        $cont = 0;
        foreach($statusMentions as $mention){
            $notification = new Notification();
            $notification->updated_at = Carbon::now();
            $notification->created_at = Carbon::now();
            $notification->type = Notification::TYPE_MENTION;
            $notification->post_id = $post->id;
            $notification->user_screen_name = $mention;
            $notification->text = $tweet->text;
            $notification->tweet_id = $tweet->id;
            $notification->save();
            $cont++;
        }
        $total = $cont + (integer)$post->system_mentions_send;
        $post->system_mentions_sended += $total;
        $post->save();
        return $total;
    }

    private function sendAppTweet($text)
    {
        $ret = app('twitter')->postTweet(['status' => $text, 'format' => 'json']);
        $headers = app('twitter')->getResponseHeaders();
        sleep(10);
        return json_decode($ret);
    }
}
?>
