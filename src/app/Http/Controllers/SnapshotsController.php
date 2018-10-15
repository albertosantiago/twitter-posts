<?php namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Model\User;
use App\Model\Tweet;
use App\Model\Thread;
use App\Model\Author;
use App\Api\SessionManager as SessionManager;
use App\Api\UserRepository as UserRepository;
use App\Api\SocialManager  as SocialManager;
use Carbon\Carbon;


class SnapshotsController extends Controller
{
    //Esta clave es para comunicarnos con phantomjs y tener acceso a la aplicación
    //No tengo ganas de hacer algo más sofisticado, esto funciona, asi que hardcode to the power.
    const SNAPSHOTS_KEY = "__local__";
    //const SNAPSHOTS_KEY = "__1fsdf3534rfsdfnnnt53453453sd3453534534534__";

    public function __construct(Request $request,
                                SocialManager $socialManager)
    {

        set_time_limit(0);

        if($request->key!==self::SNAPSHOTS_KEY){
            die;
        }
        $users = [
            'Burro_Benjamin_',
            'IlustresEspana',
            'WetdogCompany',
            'Tweet4Post'
        ];
        shuffle($users);
        $appUser = User::where('screen_name', $users[0])->first();
        $requestToken = [
            'token'  => $appUser['access_token']['oauth_token'],
            'secret' => $appUser['access_token']['oauth_token_secret']
        ];
        app('twitter')->reconfig($requestToken);
        $this->socialManager  = $socialManager;
    }

    public function getPending(Request $request)
    {
        if($request->skip){
            $skip = (int)$request->skip;
            $tweet = Tweet::where('status', Tweet::STATUS_PENDING)->where('type', Tweet::TYPE_CONTENT)->orderBy('id','ASC')->skip($skip)->first();
        }else{
            $tweet = Tweet::where('status', Tweet::STATUS_PENDING)->where('type', Tweet::TYPE_CONTENT)->orderBy('id','ASC')->first();
        }
        $tweet->status = Tweet::STATUS_IN_PROCESS;
        $tweet->save();
        $withMedia = $request->withMedia;
        return view('snapshots.pending',[
            'tweet' => $tweet,
            'key' => self::SNAPSHOTS_KEY,
            'withMedia' => $withMedia,
            'debug' => false
        ]);
    }

    public function getRenderedTweet(Request $request)
    {
        $tweet = Tweet::where('id_str', $request->id)->first();
        $withMedia = ($request->withMedia == 'false') ? false:true;
        $debug     = ($request->debug == 'true') ? true:false;

        return view('snapshots.pending',[
            'tweet' => $tweet,
            'key' => self::SNAPSHOTS_KEY,
            'withMedia' => $withMedia,
            'debug' => $debug
        ]);
    }

    public function updateTweet(Request $request)
    {
        $id = $request->tweetId;
        $tweet = Tweet::where('id_str', $id)->where('type', Tweet::TYPE_CONTENT)->first();
        $tweet->status = Tweet::STATUS_PROCESSED;
        $imgs  = [];
        $links = [];
        $tweet->video = '';
        $tweet->youtubeCode = '';

        $path    = substr($id,0,3);
        $subPath = substr($id,3,6);
        $tweetPath = storage_path("app/img/tweets/$path");
        if(!file_exists($tweetPath)){
            mkdir($tweetPath);
        }
        $tweetPath .= "/".$subPath;
        if(file_exists($tweetPath)){
            $this->deleteTweetDir($tweetPath);
        }
        mkdir($tweetPath);

        $publicPath = "/img/tweets/$path/$subPath/";
        if($_FILES['snapshot']['size']!==0){
            $name = $_FILES['snapshot']['name'];
            move_uploaded_file($_FILES['snapshot']['tmp_name'], "$tweetPath/$name");
            $tweet->snapshot = $publicPath.$name;
            $name = $_FILES['snapshot_mobile']['name'];
            move_uploaded_file($_FILES['snapshot_mobile']['tmp_name'], "$tweetPath/$name");
            $tweet->snapshot_mobile = $publicPath.$name;
            $name = $_FILES['snapshot_nomedia']['name'];
            move_uploaded_file($_FILES['snapshot_nomedia']['tmp_name'], "$tweetPath/$name");
            $tweet->snapshot_nomedia = $publicPath.$name;
            $name = $_FILES['snapshot_mobile_nomedia']['name'];
            move_uploaded_file($_FILES['snapshot_mobile_nomedia']['tmp_name'], "$tweetPath/$name");
            $tweet->snapshot_mobile_nomedia = $publicPath.$name;
        }

        if($_FILES['img_0']['size']!==0){
            $name = $_FILES['img_0']['name'];
            move_uploaded_file($_FILES['img_0']['tmp_name'], "$tweetPath/$name");
            $imgs[] = $publicPath.$name;
        }
        if($_FILES['img_1']['size']!==0){
            $name = $_FILES['img_1']['name'];
            move_uploaded_file($_FILES['img_1']['tmp_name'], "$tweetPath/$name");
            $imgs[] = $publicPath.$name;
        }
        if($_FILES['img_2']['size']!==0){
            $name = $_FILES['img_2']['name'];
            move_uploaded_file($_FILES['img_2']['tmp_name'], "$tweetPath/$name");
            $imgs[] = $publicPath.$name;
        }
        if($_FILES['img_3']['size']!==0){
            $name = $_FILES['img_3']['name'];
            move_uploaded_file($_FILES['img_3']['tmp_name'], "$tweetPath/$name");
            $imgs[] = $publicPath.$name;
        }
        $tweet->imgs = $imgs;

        if($_FILES['video']['size']!==0){
            $name = $_FILES['video']['name'];
            move_uploaded_file($_FILES['video']['tmp_name'], "$tweetPath/$name");
            $tweet->video = $publicPath.$name;
        }

        if($request->youtubeCode){
            $tweet->youtubeCode = $request->youtubeCode;
        }
        if($request->htmlCode){
            $tweet->htmlCode = $request->htmlCode;
        }
        if($request->link_0){
            $links[] = $request->link_0;
        }
        if($request->link_1){
            $links[] = $request->link_1;
        }
        $tweet->links = $links;

        $tweet->save();
        echo "OK";die;
    }

    public function getPendingThread(Request $request)
    {
        $thread = Thread::where('status', Thread::STATUS_PENDING)->orderBy('first_tweet_id','ASC')->first();
        return response()->json([
            'thread' => $thread
        ]);
    }

    public function updateThread(Request $request)
    {
        $thread = Thread::where('_id', $request->id)->first();
        $tweets = explode(",", $request->tweets);
        $pendingTweets = [];

        if(sizeof($tweets)>0){
            foreach($tweets as $tweetId){
                $ret = Tweet::where('id_str', $tweetId)->count();
                if($ret==0){
                    $pendingTweets[]= $tweetId;
                }
            }

            if(sizeof($pendingTweets)>100){
                $aux  = $this->socialManager->lookupTweets(array_slice($pendingTweets, 0, 99));
                $aux2 = $this->socialManager->lookupTweets(array_slice($pendingTweets, 99, sizeof($pendingTweets)));
                $pendingTweets = array_merge($aux, $aux2);
            }else{
                $pendingTweets = $this->socialManager->lookupTweets($pendingTweets);
            }
            foreach($pendingTweets as $tweet){
                $embed = $this->socialManager->getCleanOembed($thread->screen_name,
                                                              $tweet->id);

                $screenName = $this->getScreenName($embed->author_url);
                $author     = $this->getAuthor($thread->screen_name);

                $tweet->screen_name = $screenName;
                $tweet->author_name = $embed->author_name;
                $tweet->author_id = $author->id;
                if(!empty($author->local_profile_image)){
                    $tweet->author_profile_image = $author->local_profile_image;
                }

                $tweet->embed = $embed;
                $tweet->created_at = Carbon::parse($tweet->created_at);
                $tweet = Tweet::create((array)$tweet);
                $tweet->type = Tweet::TYPE_CONTENT;
                $tweet->id_str = $tweet->id;
                $tweet->id     = $tweet->id_str;
                $tweet->post_root = false;
                $tweet->status = Tweet::STATUS_PENDING;
                $tweet->with_backup = true;
                $tweet->img_backup  = '';
                $tweet->save();
                sleep(4);
            }
        }

        $thread->tweets = $tweets;
        $thread->total_tweets = sizeof($tweets);
        $thread->status = Thread::STATUS_DONE;
        $thread->save();
        echo "OK";die;
    }

    protected function deleteTweetDir($dir) {
        if(is_dir($dir)){
            $objects = scandir($dir);
            foreach ($objects as $object) {
                if ($object != "." && $object != "..") {
                    unlink($dir."/".$object);
                }
            }
            reset($objects);
            rmdir($dir);
        }
    }


    public function getPendingHtml(Request $request){
        if($request->skip){
            $skip = (int)$request->skip;
            $tweet = Tweet::where('status','<>', Tweet::STATUS_CLEANED)->where('type', Tweet::TYPE_CONTENT)->orderBy('id','ASC')->skip($skip)->first();
        }else{
            $tweet = Tweet::where('status', '<>', Tweet::STATUS_CLEANED)->where('type', Tweet::TYPE_CONTENT)->orderBy('id','ASC')->first();
        }
        $tweet->status = Tweet::STATUS_IN_PROCESS;
        $tweet->save();
        $withMedia = $request->withMedia;
        return view('snapshots.html_process',[
            'tweet' => $tweet,
            'key' => self::SNAPSHOTS_KEY,
            'withMedia' => $withMedia,
            'debug' => false
        ]);
    }

    public function updateTweetHTML(Request $request){
        $id = $request->tweetId;
        $tweet = Tweet::where('id_str', $id)->where('type', Tweet::TYPE_CONTENT)->first();
        $tweet->status = Tweet::STATUS_CLEANED;
        if($request->htmlCode){
            $tweet->htmlCode = $request->htmlCode;
        }
        $tweet->save();
        return redirect()->back();
    }

    protected function getAuthor($screenName)
    {
        $author = Author::where('screen_name',$screenName)->first();
        if(empty($author)){
            $author = new Author();
            $author->screen_name = $screenName;
        }
        $url = '/users/show.json';
        try{
            $ret = app('twitter')->get($url,[
                                'screen_name' => $screenName
                            ]);
        }catch(\Exception $e){
            $author->save();
            return $author;
        }
        $author->id = $ret->id;
        $author->id_str = $ret->id_str;
        $author->name = $ret->name;
        $author->updated_at = Carbon::now();
        $author->screen_name = $ret->screen_name;
        $author->location = $ret->location;
        $author->profile_location = $ret->profile_location;
        $author->description =  $ret->description;
        $author->url = $ret->url;
        $author->followers_count = $ret->followers_count;
        $author->friends_count = $ret->friends_count;
        $author->listed_count = $ret->listed_count;
        $author->created_at = Carbon::parse($ret->created_at);
        $author->favourites_count = $ret->favourites_count;
        $author->utc_offset = $ret->utc_offset;
        $author->lang = $ret->lang;
        $author->profile_background_color = $ret->profile_background_color;
        $author->profile_background_image_url = $ret->profile_background_image_url;
        $author->profile_background_image_url_https = $ret->profile_background_image_url_https;
        $author->profile_background_tile = $ret->profile_background_tile;
        $author->profile_image_url = $ret->profile_image_url;
        $author->profile_image_url_https = $ret->profile_image_url_https;
        if(!empty($ret->profile_banner_url)){
            $author->profile_banner_url = $ret->profile_banner_url;
        }else{
            $author->profile_banner_url = "";
        }
        $author->profile_link_color = $ret->profile_link_color;
        $author->profile_sidebar_border_color = $ret->profile_sidebar_border_color;
        $author->profile_sidebar_fill_color = $ret->profile_sidebar_fill_color;
        $author->profile_text_color = $ret->profile_text_color;
        $author->profile_use_background_image = $ret->profile_use_background_image;

        $authorPath = storage_path('app/img/authors/'.$author->id_str);
        if(!file_exists($authorPath)){
            mkdir($authorPath);
        }
        if($author->profile_background_image_url){
            $ch = curl_init($author->profile_background_image_url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            $data = curl_exec($ch);
            $mimeType = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
            $chunks = explode("/",$mimeType);
            $ext = $chunks[1];
            file_put_contents($authorPath."/profile_background_image.$ext",$data);
            $author->local_background_image = "/img/authors/$author->id_str/profile_background_image.$ext";
        }
        if($author->profile_image_url){
            $ch = curl_init($author->profile_image_url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            $data = curl_exec($ch);
            $mimeType = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
            $chunks = explode("/",$mimeType);
            $ext = $chunks[1];
            file_put_contents($authorPath."/profile_image.$ext",$data);
            $author->local_profile_image = "/img/authors/$author->id_str/profile_image.$ext";
        }
        if(!empty($author->profile_banner_url)){
            if($author->profile_banner_url){
                $ch = curl_init($author->profile_banner_url);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                $data = curl_exec($ch);
                $mimeType = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
                $chunks = explode("/",$mimeType);
                $ext = $chunks[1];
                file_put_contents($authorPath."/profile_banner.$ext",$data);
                $author->local_profile_banner = "/img/authors/$author->id_str/profile_banner.$ext";
            }
        }
        $author->save();
        return $author;
    }

    protected function getScreenName($url){
        $chunks = explode("/",$url);
        return $chunks[3];
    }
}
