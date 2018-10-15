<?php namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;
use App\Http\Controllers\Controller;
use App\Api\SocialManager;
use App\Api\SessionManager;
use App\Api\UserRepository;
use DB;
use Session;
use Mongolico;
use Redirect;
use Input;
use Validator;
use Carbon\Carbon;
use Log;
use Cache;
use Config;
use View;


class LoginController extends Controller
{
    public function __construct(SocialManager $socialManager,
                                SessionManager $sessionManager,
                                UserRepository $userRepository)
    {
        $this->socialManager  = $socialManager;
        $this->sessionManager = $sessionManager;
        $this->userRepository = $userRepository;
    }

    public function login()
    {
        $this->sessionManager->logout();
        if($url = $this->socialManager->getLoginURL()){
            return Redirect::to($url);
        }else{
            return Redirect::route('twitter.error');
        }
   }

   public function callback()
   {
       if(!$this->sessionManager->isLogged()){
           return Redirect::route('twitter.error')->with('flash_error', 'We could not log you in on Twitter.');
       }else{
           $currentUser = $this->sessionManager->getCurrentUser(true);
           $this->userRepository->insertOrUpdateUser($currentUser);
           return view('twitter.callback', [
               'user'=> $currentUser
           ]);
       }
   }

   public function error(){
       return view('twitter.error');
   }

   public function logout()
   {
        $this->sessionManager->logout();
        return Redirect::to('/')->with('flash_notice', 'You\'ve successfully logged out!');
   }

}
