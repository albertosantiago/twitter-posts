<?php
namespace App\Http\Controllers\Admin\System;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Model\Thread;
use App\Model\Tweet;
use App\Model\Post;
use Datatables;
use DB;
use Session;
use Carbon\Carbon;
use Artisan;
use Symfony\Component\Process\Process;

class ThreadController extends Controller
{
    const PAGE_SIZE = 20;

    public function index(Request $request)
    {
        $query = Thread::query();
        $filters = $request->input('filters');
        if(!empty($filters)){
            if(!empty($filters['screen_name'])){
                $query->where('screen_name','like', "%".$filters['screen_name']."%");
            }
            if($filters['status']!=-1){
                $query->where('status',(int)$filters['status']);
            }
            if(!empty($filters['min_tweets'])){
                $query->where('total_tweets', '>', (int)$filters['min_tweets']);
            }
            if(!empty($filters['max_tweets'])){
                $query->where('total_tweets', '<', (int)$filters['max_tweets']);
            }
        }
        if(!empty($request->sort)){
            $query->orderBy($request->sort, $request->dir);
        }else{
            $query->orderBy('status','DESC')->orderBy('updated_at','DESC');
        }
        $threads = $query->paginate(self::PAGE_SIZE);
        return view('admin/system/threads', [
            'threads' => $threads,
            'filters' => $filters
        ]);
    }

    public function view(Request $request, $threadId)
    {
        $tweets = [];
        $thread = Thread::find($threadId);
        if(!empty($thread->tweets)){
            foreach($thread->tweets as $tweet){
                $tweet = Tweet::where('id_str', (string) $tweet )->first();
                $tweets[] = $tweet;
            }
        }
        return view('admin/system/thread', [
            'thread' => $thread,
            'tweets' => $tweets
        ]);
    }

    public function store(Request $request)
    {
        $url = trim($request->url);
        if(!empty($request->id)){
            $id = $request->id;
            $thread = Thread::find($id);
        }else{
            $thread = Thread::where('url',$url)->first();
            if($thread==null){
                $thread = new Thread();
            }
        }
        if($request->extra_authors){
            $thread->extra_authors = $request->extra_authors;
        }else{
            $thread->extra_authors = '';
        }
        if($request->main_conversation_url){
            $thread->main_conversation_url = $request->main_conversation_url;
            $thread->main_conversation_id = $this->getTweetId($request->main_conversation_url);
            $thread->main_conversation_screen_name = $this->getScreenName($request->main_conversation_url);
        }
        $thread->url = $url;
        $thread->status = Thread::STATUS_PENDING;
        $thread->screen_name = $this->getScreenName($url);
        $thread->first_tweet_id = $this->getTweetId($url);
        $thread->created_at = Carbon::now();
        $thread->updated_at = Carbon::now();
        $thread->save();
        return redirect()->back();
    }

    public function delete(Request $request)
    {
        $threadId = $request->input('id');
        Thread::destroy($threadId);
        return redirect()->back();
    }

    public function deleteTweet(Request $request)
    {
        $tweetId  = $request->input('tweetId');
        $threadId = $request->input('threadId');
        $thread = Thread::find($threadId);
        $newTweets = [];
        $currentTweets = $thread->tweets;
        foreach($currentTweets as $tweet){
            if($tweet!=$tweetId){
                $newTweets[] = $tweet;
            }
        }
        $thread->tweets = $newTweets;
        $thread->save();
        return redirect()->back();
    }

    public function deletePost(Request $request)
    {
        $threadId = $request->input('threadId');
        $thread = Thread::find($threadId);
        $postId = $thread->post_id;
        Post::destroy($postId);
        $thread->status  = Thread::STATUS_DONE;
        $thread->post_id = null;
        $thread->save();
        return redirect()->back();
    }

    public function generatePost(Request $request)
    {
        $threadId = $request->input('threadId');
        $basePath = base_path();
        $command = "php $basePath/artisan twitter:gen-thread-post --thread=$threadId &";
        $process = new Process($command);
        $process->start();
        return redirect()->back();
    }

    public function changeStatus(Request $request)
    {
        $threadId = $request->input('id');
        $thread = Thread::where('_id', $threadId)->first();
        $thread->status = ($thread->status===Thread::STATUS_PENDING) ? Thread::STATUS_DONE: Thread::STATUS_PENDING;
        $thread->save();
        return redirect()->back();
    }

    public function getScreenName($url){
        $chunks = explode("/",$url);
        return $chunks[3];
    }

    public function getTweetId($url){
        $chunks = explode("/",$url);
        return $chunks[5];
    }

}
