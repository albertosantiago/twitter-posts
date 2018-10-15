<?php namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use App\Api\SessionManager as SessionManager;
use App\Model\Post;
use Session;
use Log;
use Validator;
use Input;
use Mongolico;
use View;
use Twitter;
use Carbon\Carbon;


class AjaxController extends Controller
{
    public function __construct(SessionManager $sessionManager)
    {
        $this->sessionManager = $sessionManager;
    }

    public function sendSuggestion(Request $request){
        $postId = $request->post_id;
        $userScreenName = $request->user_screen_name;
        $post = Post::where('_id', $postId)->first();
        if($post){
            app('jobManager')->dispatchSuggestionJob($post, $userScreenName);
            return response()->json(['status' => 201]);
        }else{
            return $this->badRequest();
        }
    }
}
