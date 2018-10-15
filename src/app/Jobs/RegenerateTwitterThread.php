<?php
namespace App\Jobs;

use App\Api\DebounceJob;
use App\Model\Tweet;
use App\Model\TweetThread;
use Illuminate\Contracts\Queue\ShouldQueue;
use Carbon\Carbon;
use Log;

class RegenerateTwitterThread extends DebounceJob implements ShouldQueue
{
    protected $postId;
    public $cache_key    = "";
    public $tweetsThread = null;

    /**
     * Create a new RegenerateTwitterThread instance.
     * @return void
     */
    public function __construct($postId)
    {
        $this->postId = $postId;
        $this->cache_key = "__regenerate_twitter_thread_$postId";
        parent::__construct();
    }

    public function start()
    {
        $this->tweetThread = TweetThread::where('post_id',$this->postId)->orderBy('created_at','desc')->first();
        $tweets = Tweet::where('processed', false)
                                ->where('type', Tweet::TYPE_COMMENT)
                                ->where('post_root', false)
                                ->where('post_id', $this->postId)
                                ->orderBy('created_at', 'asc')->get();

        foreach($tweets as $tweet){
            $this->insertReply($tweet);
        }
    }

    private function insertReply($tweet)
    {
        $in_reply_to = $tweet->in_reply_to_status_id_str;
        $thread = $this->getThread($this->tweetThread, $in_reply_to);
        if($thread){
            $tweetThread = new TweetThread();
            $tweetThread->created_at = Carbon::now();
            $tweetThread->updated_at = Carbon::now();
            $tweetThread->tweet()->associate($tweet);
            $tweetThread->tweet_id = $tweet->id;
            $tweetThread->tweet_id_str = $tweet->id_str;
            $tweetThread->post_id = $this->postId;
            $thread->replies()->associate($tweetThread);
            $thread->save();
            $tweet->processed = true;
            $tweet->save();
            return;
        }
        return;
    }

    private function getThread($thread, $id)
    {
        if($thread->tweet_id == $id){
            return $thread;
        }
        $replies = $thread->replies()->get();
        if($replies){
            foreach($replies as $reply){
                $thread = $this->getThread($reply, $id);
                if($thread){
                    return $thread;
                }
            }
        }
        return false;
    }
}
