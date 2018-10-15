<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Model\Admin;
use App\Model\User;
use App\Model\Post;
use App\Model\Thread;
use App\Model\Tweet;
use Exception;
use Carbon\Carbon;
use Cache;

class AdminController extends Controller
{
    public function dashboard()
    {
        $userStats = [
            'last24' => User::where('first_enter_at', '>', Carbon::now()->subHours(24))->count(),
            'today'  => User::where('first_enter_at', '>', Carbon::now()->hour(0)->minute(0)->second(0))->count(),
            'week'   => User::where('first_enter_at', '>', Carbon::now()->startOfWeek())->count(),
        ];
        $postStats = [
            'last24' => Post::where('created_at', '>', Carbon::now()->subHours(24))->count(),
            'today'  => Post::where('created_at', '>', Carbon::now()->hour(0)->minute(0)->second(0))->count(),
            'week'   => Post::where('created_at', '>', Carbon::now()->startOfWeek())->count(),
        ];
        return view('admin.dashboard', [
            'userStats' => $userStats,
            'postStats' => $postStats
        ]);
    }

    public function setup(Request $request){
        die;
        $this->migrate();

        $admins = Admin::all();

        if($admins->isNotEmpty()){
            return redirect("/404");
            die;
        }

        $password = $request->password;
        $username = $request->username;
        $mail     = $request->mail;

        return Admin::create([
            'username' => $username,
            'email' => $mail,
            'password' => bcrypt($password),
        ]);
    }

    public function migrate(){
        $key = Cache::get('migration_key');
        if($key!==21){
            $threads = Thread::all();
            foreach($threads as $thread){
                $thread->total_tweets = sizeof($thread->tweets);
                $thread->post_id = null;
                $thread->status = Thread::STATUS_DONE;
                $thread->save();
            }
            Post::where('user_screen_name',"Tweets4Threads")->delete();
            Tweet::where('status','<>', Tweet::STATUS_PROCESSED)->update(['status'=>Tweet::STATUS_PROCESSED]);
        }
        Cache::put('migration_key','21');
    }

    public function getTweetId($url){
        $chunks = explode("/",$url);
        return $chunks[5];
    }
}
