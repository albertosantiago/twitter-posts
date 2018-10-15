<?php namespace App\Api;

use App\Api\Util as Util;
use Mongolico;
use Log;
use Session;
use Input;
use Illuminate\Http\Request;
use App\Api\SocialManager;
use App\Api\UserRepository;

/**
 * Session management for users from social networks.
 * @author Alberto Santiago <chucho@wetdog.co>
 */
class SessionManager{

    /** Internal user of the SessionManager (Singleton) */
    public $user = null;

    /**
    * Initializes SessionManager
    *
    * @param SocialManager $socialManager Instance of SocialManager. Example: TwitterManager
    * @param UserRepository $userRepository Instance of UserRepository
    */
    public function __construct(SocialManager $socialManager,
                                UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
        $this->socialManager  = $socialManager;
        $this->loadFromSession();
    }

    /** Load the User from session recovering it from the DB */
    public function loadFromSession()
    {
        $userId = app('session')->get('user_twitter_id');
        if($userId!=null){
            $this->setUser($userId);
        }else{
            $this->user = $this->getGuestUser();
        }
        return $this->user;
    }

    /** Check if the user is already logged. */
    public function isLogged()
    {
        $userId = app('session')->get('user_twitter_id');
        if($userId!=null){
            return true;
        }else{
            try{
                $credentials = $this->socialManager->checkCredentials();
            }catch(\Exception $e){
                return false;    
            }
            if($credentials){
                $this->setUser($credentials->id);
                app('session')->put('user_twitter_id', $credentials->id);
                return true;
            }
        }
        return false;
    }

    /** Check if the user is guest */
    public function isGuest()
    {
        return !$this->isLogged();
    }

    /** Return the current user ID */
    public function getCurrentUserId()
    {
        if($this->user){
            return $this->user->id;
        }
        return false;
    }

    /**
    * Return the current user
    * @param boolean $update
    */
    public function getCurrentUser($update=false)
    {
        if(!empty($this->user->id)){
            $this->user->isGuest = false;
            if($update){
                $this->user = $this->socialManager->updateUser($this->user);
            }
            return $this->user;
        }
        return $this->getGuestUser();
    }

    /** Return a instance of the guest user */
    public function getGuestUser()
    {
        return (object) [
            'id' => 0,
            'isGuest' => true,
            'screen_name' => 'guest',
            'profile_image_url' => '/images/guest.png',
            'profile_image_url_https' => '/images/guest.png'
        ];
    }

    /** Clean session data */
    public function logout()
    {
        app('session')->forget('user_twitter_id');
        app('session')->forget('access_token');
        app('session')->forget('oauth_request_token');
        app('session')->forget('oauth_request_token_secret');
        return true;
    }

    public function getUserPreference($preference)
    {
        $user = $this->getCurrentUser();
        if(!$user->isGuest){
            $preferences = $user->preferences;
            if(isset($preferences->$preference)){
                return $preferences->$preference;
            }
        }
        $preference = app('session')->get("user.preferences.$preference");
        if(!empty($preference)){
            return $preference;
        }
        return false;
    }

    public function setUserPreference($preference, $value)
    {
        $user = $this->getCurrentUser();
        if(!$user->isGuest){
            $preferences = $user->preferences;
            if(empty($preferences)){
                $preferences = $user->preferences()->create([]);
            }
            $preferences->$preference = $value;
            $preferences->save();
            $user->save();
        }
        $preferences = app('session')->get("user.preferences");
        if($preferences==null){
            app('session')->put("user.preferences", ['__internal_key__' => true ]);
        }
        app('session')->put("user.preferences.$preference", $value);
        return;
    }

    public function haveAdultConsent($url)
    {
        $adultConsents = app('session')->get('user.adult_consents');

        if(empty($adultConsents)){
            return false;
        }

        if(in_array($url,$adultConsents)){
            return true;
        }else{
            return false;
        }
    }

    public function setAdultConsent($url)
    {
        $adultConsents = app('session')->get('user.adult_consents');
        if(empty($adultConsents)){
            $adultConsents = [];
        }
        $adultConsents[] = $url;
        app('session')->put('user.adult_consents', $adultConsents);
    }

    /** Load user from repository */
    private function setUser($userId)
    {
        $this->user = $this->userRepository->getUser($userId, false);
        if(empty($this->user)){
            $this->user = $this->socialManager->getUser();
        }
    }
}
