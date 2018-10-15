<?php namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use App\Api\SessionManager as SessionManager;
use App\Model\User;
use Session;
use Log;
use Validator;
use Input;
use Mongolico;
use View;
use Twitter;
use Carbon\Carbon;
use App;
use URL;
use LaravelLocalization;


class RobotsController extends Controller
{
    public function sitemap()
    {
        $sitemap = App::make("sitemap");
        //$sitemap->setCache('twitter-posts.sitemap', 0);
        $postsColl = Mongolico::getCollection('posts');

        $posts = $postsColl->find(
            [
                'status' => 2,
            ],
            [
                'projection' => [
                    'user_id' => 1,
                    'user_screen_name' => 1,
                    'slug' => 1,
                    'id'   => 1,
                    'updated_at' => 1,
                    'created_at' => 1,
                    'published_at' => 1,
                ],
                'limit' => 1200,
            ]
        );

        foreach($posts as $post){
            $url = route('post.view', ['slug' => $post->slug, 'postId'=> $post->_id]);
            $translates = [
                [
                    'language' => 'en',
                    'url'      => LaravelLocalization::getLocalizedURL('en', $url)
                ]
            ];
            $date = $post->created_at->toDateTime()->format('Y-m-d\TH:i:s.u');
            $sitemap->add($url,$date, 1.0, 'monthly',[], null, $translates);
        }

        $users = User::where('editor' , true)
                        ->take(1200)
                        ->orderBy('updated_at','DESC')
                        ->get();

        foreach($users as $user){
            $url = route('profile.view', ['userScreenName' => $user->screen_name]);
            $date = $user->updated_at->format('Y-m-d\TH:i:s.u');
            $translates = [
                [
                    'language' => 'en',
                    'url'      => LaravelLocalization::getLocalizedURL('en', $url)
                ]
            ];
            $sitemap->add($url,$date, 1.0, 'weekly',[], null, $translates);
        }

        return $sitemap->render('xml');
    }

    public function robotsTxt()
    {
        $robotTxt = <<<EOD
            Sitemap: http://twitter-posts.com/sitemap.xml
            User-agent: *
            Allow: /
EOD;

        return response($robotTxt)
            ->header('Content-Type', 'Text/Plain');
    }
}
