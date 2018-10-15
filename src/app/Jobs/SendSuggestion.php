<?php
namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use App\Model\User;
use App\Model\Notification;
use App\Model\Post;
use Carbon\Carbon;
use App\Model\SystemLog;

class SendSuggestion implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $post;
    protected $userScreenName;
    protected $lastTweet;


    public function __construct(Post $post, $userScreenName)
    {
        $this->post = $post;
        $this->userScreenName = $userScreenName;
    }


    public function handle()
    {
        try{
            $userScreenName = str_replace('@','',$this->userScreenName);
            $notification = Notification::where('post_id', $this->post->id)
                                ->where('user_screen_name', $userScreenName)
                                ->first();
            if(!$notification){
                $ret = $this->sendSuggestion($userScreenName);
                $ret = json_decode($ret);
                if($ret){
                    $notification = new Notification();
                    $notification->type = Notification::TYPE_RECOMMENDATION;
                    $notification->updated_at = Carbon::now();
                    $notification->created_at = Carbon::now();
                    $notification->post_id = $this->post->id;
                    $notification->user_screen_name = $userScreenName;
                    $notification->text = $ret->text;
                    $notification->tweet_id = $ret->id;
                    $notification->save();
                }
                if(($ret->text==='')||($ret->text==='0')){
                    $systemLog = SystemLog::create([
                        'level' => 'error',
                        'namespace' => 'jobs:send-suggestion',
                        'message' => 'Empty created tweet',
                        'extra' => [
                            'send_tweet' => $this->lastTweet,
                            'response'   => $ret
                        ],
                        'alive'   => false
                    ]);
                    $systemLog->save();
                }
            }
        }catch(\Exception $e){
            $systemLog = SystemLog::create([
                'level' => 'error',
                'namespace' => 'jobs:send-suggestion',
                'message' => $e->getMessage(),
                'alive'   => false,
                'extra' => [
                    'file' => $e->getFile(),
                    'line' => $e->getLine(),
                    'code' => $e->getCode()
                ]
            ]);
            $systemLog->save();
        }
    }

    public function sendSuggestion($userScreenName)
    {
        $appUser = User::where('system_user', true)->first();
        $requestToken = [
            'token'  => $appUser['access_token']['oauth_token'],
            'secret' => $appUser['access_token']['oauth_token_secret']
        ];
        app('twitter')->reconfig($requestToken);

        $tweet = Tweet::where('id_str',$this->post->tweet_id_str)->first();

        if(empty($tweet)){
            return;
        }

        $status = "@$userScreenName somebody think this can be interesting to you.";
        $status = $status." ".$tweet->embed['url'];

        $this->lastTweet = $tweet;

        $ret = app('twitter')->postTweet(['status' => $tweet, 'format' => 'json']);
        return $ret;
    }
}
