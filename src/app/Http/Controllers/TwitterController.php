<?php namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use App\Api\SessionManager as SessionManager;
use App\Api\UserRepository as UserRepository;
use App\Api\SocialManager  as SocialManager;
use Session;
use Log;
use Validator;
use Input;
use Mongolico;
use View;
use Twitter;
use Carbon\Carbon;
use App\Model\Post;
use App\Model\Like;
use App\Model\Tweet;
use PHPHtmlParser\Dom;

class TwitterController extends Controller
{
    const PAGE_SIZE = 50;

    public function __construct(SocialManager  $socialManager,
                                SessionManager $sessionManager,
                                UserRepository $userRep)
    {
        $this->socialManager  = $socialManager;
        $this->sessionManager = $sessionManager;
        $this->userRepository = $userRep;
    }

    public function reply(Request $request)
    {
        $currentUser = $this->sessionManager->getCurrentUser();
        if(!$this->sessionManager->isLogged()){
            return $this->forbidden();
        }
        $postId = $request->post_id;
        $post = Post::find($postId);
        if(empty($post)){
            return $this->badRequest();
        }

        $tweetReplyId = $request->in_reply_id;
        $status = $request->status;

        $params = [
            'status' => $status,
            'in_reply_to_status_id' => (int)$tweetReplyId,
            'format' => 'json'
        ];

        $ret = app('twitter')->postTweet($params);

        $ret = json_decode($ret);
        $ret->created_at = Carbon::now();
        $ret->updated_at = Carbon::now();

        $embed = $this->socialManager->getCleanOembed($currentUser->screen_name,
                                                      $ret->id);
        $ret->embed   = $embed;
        $tweet = Tweet::create((array)$ret);
        $tweet->post_id   = $postId;
        $tweet->post_root = false;
        $tweet->processed = false;
        $tweet->type = Tweet::TYPE_COMMENT;
        $tweet->save();
        app('jobManager')->dispatchPostJobs($postId);
        return response()->json(['type' => 'tweet', 'id'=> $tweet->id, 'status' => 200, 'data' => $tweet] , 200);
    }

    public function oembed(Request $request){
        try{
            $url = $request->input('url');
            $ret =  app('twitter')->get('statuses/oembed.json',['url' => $url, 'hide_thread'=>true, 'omit_script'=>true]);
            return response()->json($ret);
        }catch(\Exception $e){
            dd($e);
            return response()->json(['status'=>404]);
        }

    }

    /*
    ----------------------------- LIKES FUNCTIONS ----------------------
    */

    public function like(Request $request)
    {
        $user = $this->sessionManager->getCurrentUser();
        if(empty($user)){
            return $this->forbidden();
        }
        $postId  = $request->post_id;
        $tweetId = $request->tweet_id;
        $like    = ($request->like=='false') ? false: true;

        $post = Post::find($postId);
        if(empty($post)){
            return $this->badRequest();
        }
        if(empty($tweetId)){
            $tweetId = $post->tweet_id;
        }

        $params = [
            'id' => $tweetId
        ];

        if(!$like){
            return $this->sendUnLike($user, $params, $post);
        }
        return $this->sendLike($user, $params, $post);
    }

    protected function sendLike($user, $params, $post)
    {
        try{
            $ret = app('twitter')->post("favorites/create.json", $params);
        }catch(\Exception $e){
            $code = $e->getCode();
            if(($code!==TWITTER_ERRORS_ALREADY_LIKE) &&
            ($code!==TWITTER_ERRORS_ASYNC_PENDING))
            {
                return response()->json(['type'=> 'error', 'status' => $code], $code);
            }
            return response()->json(['type'=> 'error', 'status' => $code], $code);
        }
        if($ret){
            $like = new Like([
                'post_id' => $post->id,
                'created_at' => Carbon::now()
            ]);
            $user->likes()->save($like);
            $user->save();
        }
        return response()->json(['type' => 'tweet', 'data' => $ret, 'status' => 200] , 200);
    }

    protected function sendUnLike($user, $params, $post)
    {
        $ret = "";
        try{
            $ret = app('twitter')->post("favorites/destroy.json", $params);
        }catch(\Exception $e){
            $code = $e->getCode();
            if(($code!==TWITTER_ERRORS_ALREADY_UNLIKED) &&
            ($code!==TWITTER_ERRORS_ASYNC_PENDING))
            {
                return response()->json(['type'=> 'error', 'status' => $code], $code);
            }
            return response()->json(['type'=> 'error', 'status' => $code], $code);
        }
        if($ret){
            $likes = $user->likes()->where('post_id',$post->id)->get();
            foreach($likes as $like){
                $like->delete();
            }
            $user->save();
        }
        return response()->json(['type' => 'tweet', 'data' => $ret, 'status' => 200] , 200);
    }

    /*
    ----------------------------- FIN LIKES FUNCTIONS ----------------------
    */

    public function reTweet(Request $request)
    {
        $currentUser = $this->sessionManager->getCurrentUser();
        if(!$this->sessionManager->isLogged()){
            return $this->forbidden();
        }
        $postId = $request->input('post_id');
        $post = Post::find($postId);
        if(empty($post)){
            return $this->badRequest();
        }
        $retweetedId = $request->input('retweeted_id');
        $tweet = Tweet::where('id_str',$retweetedId)->first();
        if(empty($tweet)){
            return $this->badRequest();
        }
        $status = $request->input('status');
        try{
            if(!empty(trim($status))){
                $status = substr($status,0,116);
                $status .= " ".$tweet->embed['url'];
                $params = [
                    'status' => $status,
                    'format' => 'json'
                ];
                $ret = app('twitter')->postTweet($params);
                if($ret){
                    return response()->json(['type' => 'success', 'status' => 200] , 200);
                }
                return response()->json(['type' => 'error', 'status' => 500] , 500);
            }
            $ret = app('twitter')->post("statuses/retweet/$retweetedId.json");
            if($ret){
                return response()->json(['type' => 'success', 'status' => 200] , 200);
            }
        }catch(Exception $e){
            return response()->json(['type'=> 'error', 'status' => $code], 500);
        }
        return response()->json(['type' => 'error', 'status' => 500] , 500);
    }


    public function lookup(Request $request){
        $screenName = str_replace('@','',$request->screenName);
        $key = "_user_lookups_$screenName".microtime();
        $ret = app('cache')->get($key);
        if(!$ret){
            $params = [
                'screen_name' => $screenName,
                'include_entities' => false
            ];
            $ret = app('twitter')->get('users/lookup.json', $params);
            $expiresAt = Carbon::now()->addDays(2);
            app('cache')->put($key, $ret, $expiresAt);
        }
        return response()->json($ret);
    }

}
