<?php namespace App\Api;

use App\Api\Util as Util;
use Mongolico;
use Log;
use Session;
use Input;
use Illuminate\Http\Request;

/**
 * Twitter Rest/Api Manager
 * @author Alberto Santiago <chucho@wetdog.co>
 */
class TwitterManager implements SocialManager{

    /**
    * Internal var to indicate the load and update of the user's relations at the beginning.
    * @var $withRelations
    */
    protected $withRelations = false;

    /**
    * Initialize the manager.
    **/
    public function __construct(){}

    public function getLoginURL($callbackRouteName='twitter.callback')
    {
        $sign_in_twitter = true;
        $force_login = false;

        app('twitter')->reconfig(['token' => '', 'secret' => '']);
        $token = app('twitter')->getRequestToken(route($callbackRouteName));

        if (isset($token['oauth_token_secret']))
        {
            $url = app('twitter')->getAuthorizeURL($token, $sign_in_twitter, $force_login);
            Session::put('oauth_state', 'start');
            Session::put('oauth_request_token', $token['oauth_token']);
            Session::put('oauth_request_token_secret', $token['oauth_token_secret']);
            return $url;
        }
        return false;
    }

    public function checkCredentials()
    {
        if (Session::has('oauth_request_token')){
            $request_token = [
                'token'  => Session::get('oauth_request_token'),
                'secret' => Session::get('oauth_request_token_secret'),
            ];
            app('twitter')->reconfig($request_token);
            $oauth_verifier = false;

            if (Input::has('oauth_verifier')){
                $oauth_verifier = Input::get('oauth_verifier');
            }
            // getAccessToken() will reset the token for you
            $token = app('twitter')->getAccessToken($oauth_verifier);

            if (!isset($token['oauth_token_secret'])){
                return false;
            }
            $credentials = app('twitter')->getCredentials();
            if (is_object($credentials) && !isset($credentials->error)){
                Session::put('access_token', $token);
                return $credentials;
            }
            return false;
        }
        return false;
    }

    public function setWithRelations($withRelations)
    {
        $this->withRelations = $withRelations;
    }

    public function updateUser($prevUser)
    {
        $currentUser = $this->getUser();
        if($this->withRelations){
            $currentUser = $this->updateRelations($prevUser, $currentUser);
            $currentUser = $this->updateLists($prevUser, $currentUser);
        }
        return $currentUser;
    }

    public function getUser()
    {
        $user = app('twitter')->getCredentials();
        $user->access_token = Session::get('access_token');
        if($this->withRelations){
            $user = $this->loadRelationsInfo($user);
            $user = $this->loadLists($user);
        }
        return $user;
    }

    public function getCleanOembed($screenName, $id){
        $url = "https://twitter.com/$screenName/status/$id";
        $ret =  app('twitter')->get('statuses/oembed.json',[
            'url' => $url,
            'omit_script' => true,
            'align' => 'left',
            'hide_thread' => true
        ]);
        $ret->html = strip_tags($ret->html, '<p><a><blockquote>');
        return $ret;
    }

    public function lookupTweets($tweets){
        if(empty($tweets)){
            return [];
        }
        $params = ["id" => implode(",", $tweets)];
        $uri = 'statuses/lookup.json';
        $ret = app('twitter')->get($uri,$params);
        return $ret;
    }

    public function getTweetInfo($id){
        $uri = 'statuses/show/'.$id.'.json';
        $ret = app('twitter')->get($uri);
        return $ret;
    }

/*******************************************************************************************************************
* API PRIVADA.
********************************************************************************************************************/

    private function loadRelationsInfo($user)
    {
        $user = $this->loadFriends($user);
        $user = $this->loadFollowers($user);
        $user = $this->loadBlocks($user);
        $user = $this->loadMutes($user);

        $user->myfans_id          = array_values(array_diff($user->followers_id, $user->friends_id));
        $user->myfans_count       = sizeOf($user->myfans_id);
        $user->mutualFollow_id    = array_values(array_intersect($user->followers_id, $user->friends_id));
        $user->mutualFollow_count = sizeOf($user->mutualFollow_id);
        $user->fanOf_id           = array_values(array_diff($user->friends_id, $user->followers_id));
        $user->fanOf_count        = sizeOf($user->fanOf_id);

        if(!isset($user->former_friends)){
            $user->former_friends_id      = array();
            $user->former_friends_count   = 0;
            $user->former_followers_id    = array();
            $user->former_followers_count = 0;
        }
        return $user;
    }

    private function loadFriends($user)
    {
        $friends = array();
        $cursor  = -1;
        $go      = true;

        while($go){
            $ret = app('twitter')->get('friends/ids.json',['cursor' => $cursor]);
            $friends = $friends + $ret->ids;
            $cursor  = $ret->next_cursor;
            if($cursor==0){
                $go = false;
            }
        }
        $user->friends_id = $friends;
        return $user;
    }

    private function loadFollowers($user)
    {
        $followers = array();
        $cursor = -1;
        $go     = true;

        while($go){
            $ret = app('twitter')->get('followers/ids.json',['cursor' => $cursor]);
            $followers = $followers + $ret->ids;
            $cursor  = $ret->next_cursor;
            if($cursor==0){
                $go = false;
            }
        }
        $user->followers_id = $followers;
        return $user;
    }

    private function loadBlocks($user)
    {
        $blocks = array();
        $cursor = -1;
        $go     = true;

        while($go){
            $ret = app('twitter')->get('blocks/ids.json',['cursor' => $cursor]);
            $blocks  = $blocks + $ret->ids;
            $cursor  = $ret->next_cursor;
            if($cursor==0){
                $go = false;
            }
        }
        $user->blocks_id = $blocks;
        $user->blocks_count = sizeOf($blocks);
        return $user;
    }

    private function loadMutes($user)
    {
        $mutes = array();
        $cursor = -1;
        $go     = true;

        while($go){
            $ret = app('twitter')->get('mutes/users/ids.json',['cursor' => $cursor]);
            $mutes  = $mutes + $ret->ids;
            $cursor  = $ret->next_cursor;
            if($cursor==0){
                $go = false;
            }
        }
        $user->mutes_id = $mutes;
        $user->mutes_count = sizeOf($mutes);
        return $user;
    }

    private function loadLists($user)
    {
        $ret = app('twitter')->get('lists/ownerships.json',['count'=>1000]);
        $user->lists = $ret->lists;
        foreach($user->lists as  &$list){
            $list->members_id               = array();
            $list->subscribers_id           = array();
            $list->pendingUpdateMembers     = true;
            $list->pendingUpdateSubscribers = true;
        }
        return $user;
    }

/**************************************************************
* UPDATES OF USER DATA.
***************************************************************/

    private function updateRelations($prevUser, $currentUser)
    {
        if(($prevUser->friends_count != $currentUser->friends_count) ||
           ($prevUser->followers_count!= $currentUser->followers_count)){

            $newFormerFriends = array_diff($this->prevUser->friends_id, $currentUser->friends_id);
            $currentUser->former_friends_id    = array_merge($newFormerFriends, $this->prevUser->former_friends_id);
            $currentUser->former_friends_count = sizeOf($currentUser->former_friends_id);

            $newFormerFollowers = array_diff($this->prevUser->followers_id, $currentUser->followers_id);
            $currentUser->former_followers_id    = array_merge($newFormerFollowers, $this->prevUser->former_followers_id);
            $currentUser->former_followers_count = sizeOf($currentUser->former_followers_id);
            return $currentUser;
        }
        $currentUser->former_friends_id    = $prevUser->former_friends_id;
        $currentUser->former_friends_count = $prevUser->former_friends_count;
        $currentUser->former_followers_id    = $prevUser->former_followers_id;
        $currentUser->former_followers_count = $prevUser->former_followers_count;
        return $currentUser;
    }

    private function updateLists($prevUser, $currentUser)
    {
        foreach($currentUser->lists as &$list){
            foreach ($prevUser->lists as $prevList) {
                if($list->id == $prevList->id){
                    if($list->member_count != $prevList->member_count){
                        $list->pendingUpdateMembers = true;
                    }
                    $list->members_id = $prevList->members_id;

                    if($list->subscriber_count != $prevList->subscriber_count){
                        $list->pendingUpdateSubscribers = true;
                    }
                    $list->subscribers_id = $prevList->subscribers_id;
                    break;
                }
            }
        }
        return $currentUser;
    }
}
