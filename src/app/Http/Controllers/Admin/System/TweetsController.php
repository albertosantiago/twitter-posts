<?php
namespace App\Http\Controllers\Admin\System;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Model\Tweet;
use Datatables;
use DB;
use Session;
use Carbon\Carbon;
use App\Api\SocialManager  as SocialManager;

class TweetsController extends Controller
{
    const PAGE_SIZE = 20;

    public function index(Request $request)
    {
        $query = Tweet::query();
        $filters = $request->input('filters');
        if(!empty($filters)){
            if(!empty($filters['screen_name'])){
                $query->where('embed.screen_name','like', "%".$filters['screen_name']."%");
            }
            if($filters['status']!=-1){
                $query->where('status', (int)$filters['status']);
            }
            if(!empty($filters['url'])){
                $url = $filters['url'];
                $query->where('embed.url', 'like', "%$url%");
            }
        }
        $tweets = $query->orderBy('status','DESC')->orderBy('updated_at','DESC')->paginate(self::PAGE_SIZE);
        return view('admin/system/tweets', [
            'tweets'  => $tweets,
            'filters' => $filters
        ]);
    }

    public function deleteTweet(Request $request, $tweetId)
    {
        $tweet = Tweet::destroy($tweetId);
        return redirect()->back();
    }

    public function showDuplicates()
    {
        $results = Tweet::raw(function($collection) {
            return $collection->aggregate([
                ['$group' => [
                    '_id' => [
                        'id_str' => '$id_str',
                    ],
                    'count' => [
                        '$sum' => 1
                    ]
                ]],[
                    '$match' => [
                        'count' => ['$gt' => 1 ]
                ]]
            ]);
        })->where('count','>', 1);
        echo "<div>";
        foreach ($results as $result) {
            echo '<a href="/adx/system/tweets?filters[status]=-1&filters[url]='.$result->_id->id_str.'" target="_blank">'.$result->_id->id_str."</a><br/><br/>";
        }
        echo "</div>";
        die;
    }

    public function store(Request $request, socialManager $socialManager )
    {
        $url = trim($request->url);
        $tweetId    = $this->getTweetId($url);
        $screenName = $this->getScreenName($url);

        $ret = Tweet::where('id_str', $tweetId)->count();
        if($ret!==0){
            return redirect()->back();
            die;
        }
        
        $tweet = $socialManager->getTweetInfo($tweetId);
        $embed = $socialManager->getCleanOembed($screenName,
                                                $tweetId);

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
        return redirect()->back();
    }

    public function resetPending()
    {
        Tweet::where('status',Tweet::STATUS_IN_PROCESS)->update(['status'=>Tweet::STATUS_PENDING]);
        return redirect()->back();
    }

    public function resetTweet(Request $request)
    {
        $id = $request->id;
        $path    = substr($id,0,3);
        $subPath = substr($id,3,6);
        $tweetPath = storage_path("app/img/tweets/$path/$subPath");
        if(file_exists($tweetPath)){
            $this->deleteTweetDir($tweetPath);
        }
        Tweet::where('id_str', $id )->update(['status'=>Tweet::STATUS_PENDING]);
        return redirect()->back();
    }

    public function view(Request $request, $tweetId)
    {
        $tweet = Tweet::where('id_str', $tweetId )->first();
        return view('admin/system/tweet', [
            'tweet'  => $tweet
        ]);
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

    protected function getScreenName($url)
    {
        $chunks = explode("/",$url);
        return $chunks[3];
    }

    protected function getTweetId($url)
    {
        $chunks = explode("/",$url);
        return $chunks[5];
    }
}
