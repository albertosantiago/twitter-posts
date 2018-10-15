<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use App\Jobs\RegenerateTwitterThread as RegenerateTwitterThread;
use App\Model\TweetThread;
use App\Model\Tweet;

class RegenerateTwitterThreadsTest extends TestCase
{
    public function testRegenerate()
    {
        //Preparamos...
        $this->loadFixture('tweet_threads','tweet_threads.json');
        $this->loadFixture('tweets','tweets.json');
        $tweetThreads = TweetThread::all();
        $postIds = [];
        foreach($tweetThreads as $tweetThread){
            $tweetThread->replies = null;
            $tweetThread->save();
            $postIds[] = $tweetThread->post_id;
        }
        //Actualizamos los tweets
        $total = Tweet::where('processed', false)->count();
        $this->assertEquals($total, 0);
        Tweet::where('processed', true)->where('post_root', false)->update(['processed'=>false]);
        $total = Tweet::where('processed', false)->count();
        $this->assertEquals($total, 13);
        $this->assertTrue(true);
        foreach($postIds as $postId){
            $job = new RegenerateTwitterThread($postId);
            $job->start();
        }
        $total = Tweet::where('processed', true)->where('post_root', false)->count();
        $this->assertEquals($total, 13);
        //La suma de todos los replies tiene que ser 13.
        $cont = 0;
        $tweetThreads = TweetThread::all();
        foreach($tweetThreads as $tweetThread){
            $cont += $this->checkThread($tweetThread);
        }
        $this->assertEquals(13, $cont);
    }

    /**
    * Check all replies and return the number of nested replies.
    **/
    public function checkThread($thread)
    {
        $cont = 0;
        if(!empty($thread->replies)){
            $cont += sizeOf($thread->replies);
            foreach($thread->replies as $thread){
                $cont += $this->checkThread($thread);
            }
        }
        return $cont;
    }
}
