<?php namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;
use App\Model\ContactMessage;
use App\Http\Controllers\Controller;
use App\Api\SessionManager as SessionManager;
use Session;
use Mongolico;
use Twitter;
use Redirect;
use Input;
use Validator;
use Carbon\Carbon;
use App\Model\Post;


class MainController extends Controller
{
    public function __construct(SessionManager $socialManager){
        $this->socialManager = $socialManager;
    }

    public function index(Request $request)
    {

        $posts = Post::where(function($q){
                            $q->where('system_generated_post',false)
                                ->orWhere('system_generated_post',null);
                            return $q;
                        })
                        ->where('status', Post::STATUS_PUBLISHED)
                        ->orderBy('created_at','DESC')
                        ->take(6)
                        ->get();

        $postThreads = Post::where('system_generated_post',true)
                        ->where('status', Post::STATUS_PUBLISHED)
                        ->orderBy('modified_at','DESC')
                        ->take(8)
                        ->get();

        return view('welcome',[
            'posts' => $posts,
            'postThreads' => $postThreads
        ]);
    }

    public function notFound()
    {
        return view('pages.404');
    }

    public function experiment(){
        //return redirect('/404');
        return view('experiment');
    }
}
