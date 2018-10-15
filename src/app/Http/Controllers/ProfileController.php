<?php namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use App\Api\SessionManager as SessionManager;
use App\Api\UserRepository as UserRepository;
use App\Api\SocialManager  as SocialManager;use Session;
use Log;
use Validator;
use Input;
use Mongolico;
use View;
use Twitter;
use Carbon\Carbon;
use App\Model\Post;
use App\Model\PostSchema;
use App\Model\Like;
use App\Model\Tweet;
use App\Model\TweetThread;


class ProfileController extends Controller
{
    const PAGE_SIZE = 10;

    public function __construct(SessionManager $sessionManager,
                                UserRepository $userRep)
    {
        $this->sessionManager = $sessionManager;
        $this->userRepository = $userRep;
    }


    public function profile(Request $request, $userScreenName)
    {
        $userScreenName = str_replace("@", "",$userScreenName);

        $blogOwner = $this->userRepository->findOne([
                            'screen_name' => $userScreenName
                        ]);

        if(empty($blogOwner)){
            return redirect("/");
        }
        View::share('owner', $blogOwner);

        $this->configureProfileMetas($blogOwner);

        $postQuery = Post::where('user_id',$blogOwner->id)->where('status', Post::STATUS_PUBLISHED);
        $hashTag = $request->input("hashtag");
        
        if(!empty($hashTag)){
            $postQuery->where('tags', new \MongoDB\BSON\Regex($hashTag, 'i'));
        }
        $posts = $postQuery->orderBy('modified_at','DESC')->paginate(self::PAGE_SIZE);

        return view('profiles.view', [
            'posts' => $posts
        ]);
    }

    public function cssProfile($userScreenName)
    {
        $userScreenName = str_replace("@", "",$userScreenName);

        if($userScreenName=='guest'){
            return $this->cssGuest();
        }

        $userColl = Mongolico::getCollection('users');
        $user = $userColl->findOne(['screen_name' => $userScreenName]);

        if(empty($user)){
            return $this->cssGuest();
        }

        return response()->view('profiles/css', [
                                    'user'  => $user
                                ])
                                ->header('content-type','text/css');
    }

    public function cssGuest()
    {
        return response()->view('profiles/default_css')
                                ->header('content-type','text/css');
    }

    public function getCurrentUserMenu()
    {
        return response()->view('partials/user_menu');
    }



    //META CONFIGURATIONS
    protected function configureProfileMetas($owner)
    {
        $metaCreator = app('metaCreator');
        $metaCreator->set('title', $owner->name.' Aka '.$owner->screen_name.' - Twitter Posts');
        $metaCreator->setMeta('twitter:img:src', $owner->profile_image_url_https);
        $metaCreator->setMeta('description', 'Read writings from '.$owner->name.' on Twitter Posts.');
        $metaCreator->setLink('alternate', [
            'id'    => "feedlink",
            'type'  => 'application/rss+xml',
            'title' => 'RSS',
            'href'  => 'https://twitter-posts.com/feed/@'.$owner->screen_name
        ]);
        $metaCreator->setMeta('og:type', 'profile');
        $metaCreator->setMeta('twitter:card', 'summary');
        $metaCreator->setMeta('profile:username', $owner->screen_name);
    }

}
