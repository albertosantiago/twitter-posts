<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Api\SocialManager;
use App\Api\SessionManager;
use App\Api\UserRepository;
use App\Model\Admin;
use App\Model\User;
use App\Model\Post;
use Exception;
use Carbon\Carbon;
use Cache;

class TwitterBotController extends Controller
{
    public function __construct(SocialManager $socialManager,
                                SessionManager $sessionManager,
                                UserRepository $userRepository)
    {
        $this->socialManager  = $socialManager;
        $this->sessionManager = $sessionManager;
        $this->userRepository = $userRepository;
    }


    public function showUserApp()
    {
        $appUser = User::where('system_user', true)->first();
        return view('admin/twitter_bot/app_user', ['user' => $appUser]);
    }

    public function login()
    {
        if($url = $this->socialManager->getLoginURL('admin.twitter_bot.callback')){
            return redirect($url);
        }else{
            return redirect()->back();
        }
   }

   public function callback()
   {
       if(!$this->sessionManager->isLogged()){
           return redirect('/adx/twitter/')->with('flash_error', 'We could not log you in on Twitter.');
       }else{
           $currentUser = $this->sessionManager->getCurrentUser(true);
           $currentUser->system_user = true;
           $this->userRepository->insertOrUpdateUser($currentUser);
           return redirect('/adx/twitter-bot/');
       }
   }

   public function refresh()
   {
       User::where('system_user', true)->update(['system_user' => false]);
       return redirect("/adx/twitter-bot/login");
   }

}
