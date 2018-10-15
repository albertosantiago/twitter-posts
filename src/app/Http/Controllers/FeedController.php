<?php namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use App\Model\Post;
use PicoFeed\Syndication\Rss20FeedBuilder;
use PicoFeed\Syndication\Rss20ItemBuilder;

class FeedController extends Controller
{
    public function __construct(){}

    public function view(Request $request)
    {
        $screenName = $request->screenName;
        $postUserScreenName = str_replace("@",'',$screenName);
        $posts = Post::where('user_screen_name', $postUserScreenName)
                    ->orderBy('updated_at','desc')
                    ->take(20)
                    ->get();

        $feedBuilder = Rss20FeedBuilder::create()
            ->withTitle($screenName." feed at Twitter Posts")
            ->withAuthor( $screenName )
            ->withFeedUrl('https://twitter-posts.com/feed/'.$screenName)
            ->withSiteUrl('https://twitter-posts.com/')
            ->withDate(Carbon::now());

        foreach($posts as $post){
            $item = Rss20ItemBuilder::create($feedBuilder)
                        ->withTitle($post->title)
                        ->withUrl('https://twitter-posts.com/posts/view/'.$post->slug.'/'.$post->id)
                        ->withAuthor($screenName)
                        ->withPublishedDate(Carbon::now())
                        ->withSummary($post->short_desc)
                        ->withContent($post->content);

            $feedBuilder->withItem($item);
        }
        echo $feedBuilder->build();
    }
}
