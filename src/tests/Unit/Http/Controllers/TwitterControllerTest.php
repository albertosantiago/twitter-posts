<?php
namespace Tests\Api;

use App\Http\Controllers\TwitterController;
use App\Model\Post;
use Tests\TestCase;
use Illuminate\Http\Request;
use \Mockery as m;
use PHPHtmlParser\Dom;
use View;

define('TWITTER_DEBUG', true);

class TwitterControllerTest extends TestCase
{
    protected function setup()
    {
        $this->sessionManager = m::mock('App\Api\SessionManager');
        $this->socialManager  = m::mock('App\Api\SocialManager');
        $this->userRepository = m::mock('App\Api\UserRepository');
        $this->twitterService = m::mock('App\Api\TwitterService');
        $this->request  = $request = m::mock('Illuminate\Http\Request');
        $this->twitterController = new TwitterController($this->socialManager,
                                                 $this->sessionManager,
                                                 $this->userRepository);
        parent::setup();
    }

    public function testReply()
    {
        //Setup.
        $this->loadFixture('posts','posts.json');
        $tweetMock = json_encode((object)[
            'id'     => 2000000000000,
            'status' => 'Soy un tweet'
        ]);
        $twitterService = &$this->twitterService;
        $twitterService->shouldReceive('postTweet')->once()->andReturn($tweetMock);
        $app = app();
        $app->singleton('twitter', function($app) use (&$twitterService){
            return $twitterService;
        });
        $app->singleton('jobManager', function($app){
            $jobManagerMock = m::mock('App\Api\JobManager');
            $jobManagerMock->shouldReceive('dispatchPostJobs')->once()->andReturn(true);
            return $jobManagerMock;
        });
        $user = m::mock('App\Model\User');
        $user->shouldReceive('getAttribute')->once()->andReturn('WetdogCompany');
        $this->sessionManager->shouldReceive('getCurrentUser')
                                ->once()->andReturn($user);
        $this->sessionManager->shouldReceive('isLogged')
                                ->once()->andReturn(true);
        $this->socialManager->shouldReceive('getCleanOembed')
                                ->once()->andReturn('<blockquote></blockquote>');
        $post = Post::where('status',Post::STATUS_PUBLISHED)->first();
        $this->request->post_id = (string)$post->_id;
        $this->request->in_reply_id = 787878787878;
        $this->request->status = 'Esto es una prueba';
        //Test
        $ret = $this->twitterController->reply($this->request);
        $this->assertInstanceOf(\Illuminate\Http\JsonResponse::class, $ret);
        $data = json_decode($ret->content());
        $this->assertEquals($data->type,'tweet');
        $this->assertEquals($data->data->id, 2000000000000);
    }

    public function testOembed()
    {
        $twitterService = &$this->twitterService;
        $app = app();
        $app->singleton('twitter', function($app) use (&$twitterService){
            return $twitterService;
        });
        $this->request->shouldReceive('input')->once()->andReturn('http://t.co/323232');
        $this->twitterService->shouldReceive('get')->once()->andReturn(['data'=>'ok']);
        $ret = $this->twitterController->oembed($this->request);
        $this->assertInstanceOf(\Illuminate\Http\JsonResponse::class, $ret);
    }

    public function testLike()
    {
        $twitterService = &$this->twitterService;
        $twitterService->shouldReceive('post')->once()->andReturn(true);
        app()->singleton('twitter', function($app) use (&$twitterService){
            return $twitterService;
        });
        $this->loadFixture('posts','posts.json');
        $user  = m::mock('App\Model\User');
        $likes = m::mock([]);
        $likes->shouldReceive('save')->once()->andReturn(true);
        $user->shouldReceive('likes')->once()->andReturn($likes);
        $user->shouldReceive('save')->once()->andReturn(true);
        $this->sessionManager->shouldReceive('getCurrentUser')
                                ->once()->andReturn($user);

        $post = Post::where('status',Post::STATUS_PUBLISHED)->first();
        $this->request->post_id = (string)$post->_id;
        $this->request->tweet_id = 787878787878;
        $this->request->like = 'true';
        $ret = $this->twitterController->like($this->request);
        $this->assertInstanceOf(\Illuminate\Http\JsonResponse::class, $ret);
    }

    public function testRetweet()
    {
        $this->loadFixture('posts','posts.json');
        $this->loadFixture('tweets','tweets.json');
        $post = Post::where('status',Post::STATUS_PUBLISHED)->first();
        $user  = m::mock('App\Model\User');
        $this->sessionManager->shouldReceive('getCurrentUser')
                                ->once()->andReturn($user);
        $this->sessionManager->shouldReceive('isLogged')
                                ->once()->andReturn(true);
        $input = [
            'post_id' => $post->id,
            'retweeted_id' => $post->tweet_id_str,
            'status' => 'Mirad que Carapolla!'
        ];
        $this->request->shouldReceive('input')->times(3)->andReturn(
                                                        $input['post_id'],
                                                        $input['retweeted_id'],
                                                        $input['status']);
        $app = app();
        $app->singleton('twitter', function($app){
            $twitterService = m::mock('App\Api\TwitterService');
            $tweetMock = json_encode((object)[
                'id'     => 2000000000000,
                'status' => 'Soy un tweet'
            ]);
            $twitterService->shouldReceive('postTweet')->once()->andReturn($tweetMock);
            return $twitterService;
        });
        //Test
        $ret = $this->twitterController->retweet($this->request);
        $this->assertInstanceOf(\Illuminate\Http\JsonResponse::class, $ret);
        $ret = json_decode($ret->content());
        $this->assertEquals($ret->status, 200);
    }
}
