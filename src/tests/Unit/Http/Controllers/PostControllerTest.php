<?php
namespace Tests\Api;

use App\Http\Controllers\PostController;
use Tests\TestCase;
use Illuminate\Http\Request;
use \Mockery as m;
use App\Model\Post;
use App\Model\User;
use PHPHtmlParser\Dom;
use View;

class PostControllerTest extends TestCase
{
    protected function setup()
    {
        $this->socialManager = m::mock("App\Api\SocialManager");
        $this->userMock =  m::mock('App\Model\User');
        $this->request  =  m::mock('Illuminate\Http\Request');
        $this->sessionManager = m::mock('App\Api\SessionManager');
        $this->userRepository = m::mock('App\Api\UserRepository');
        $this->socialManager = m::mock('App\Api\SocialManager');

        $this->postController = new PostController($this->sessionManager,
                                                  $this->userRepository,
                                                  $this->socialManager);
        parent::setup();
    }

    public function testView()
    {
        //Setup
        $this->loadFixture('posts','posts.json');
        $this->loadFixture('users','users.json');
        $user = User::where('screen_name','WetdogCompany')->first();
        $this->sessionManager->shouldReceive('getCurrentUser')->times(1)->andReturn($user);
        $this->userMock->shouldReceive('getAttribute')->times(2)->andReturn(1,'Chucho');
        $this->userMock->shouldReceive('setAttribute')->once()->andReturn(true);
        $this->userRepository->shouldReceive('getUser')->once()->andReturn($this->userMock);
        $post = Post::where('status',Post::STATUS_PUBLISHED)->first();
        //Test
        $ret = $this->postController->view($this->request, $post->slug, $post->id);
        $this->assertInstanceOf(\Illuminate\View\View::class, $ret);
        $data = $ret->getData();
        $this->assertEquals($data['post']->id, $post->id);
        $this->assertEquals($data['post']->user_screen_name, 'WetdogCompany');
    }

    public function testCreate()
    {
        $this->request->shouldReceive('input')->times(1)->andReturn(null);
        $ret = $this->postController->create($this->request);
        $this->assertInstanceOf(\Illuminate\View\View::class, $ret);
        $data = $ret->getData();
        $this->assertEquals($data['post']->content,'');
    }

    public function testEdit()
    {
        //Setup
        $this->loadFixture('posts','posts.json');
        $this->loadFixture('users','users.json');
        $user = User::where('screen_name','WetdogCompany')->first();
        $badUser = User::whereNot('screen_name','WetdogCompany')->first();
        $this->sessionManager->shouldReceive('getCurrentUser')->times(2)->andReturn($user, $badUser);
        $post = Post::first();
        //Test
        $ret = $this->postController->edit($post->id);
        $this->assertInstanceOf(\Illuminate\View\View::class, $ret);
        $data = $ret->getData();
        $this->assertEquals($data['post']->id, $post->id);
        //Now with a incorrect user.
        $ret = $this->postController->edit($post->id);
        $this->assertInstanceOf(\Illuminate\Http\RedirectResponse::class, $ret);
    }

    public function testStoreNew()
    {
        //Setup
        $this->loadFixture('users','users.json');
        $user = User::where('screen_name','WetdogCompany')->first();
        $this->sessionManager->shouldReceive('getCurrentUser')->once()->andReturn($user);
        $input = [
            'title' => $this->fillText(80,'This is a title '),
            'content' => $this->fillText(1500,'This is a sample of content '),
            'tags' => '#tag1 #tag2 #tag3',
            'in_reply_to' => 'http://pollas.com',
            'featured_img' => 'http://twitter-posts.com/img/featured_img.jpg'
        ];
        $this->request->shouldReceive('expectsJson')->never();
        $this->request->shouldReceive('input')->times(8)
                                    ->andReturn($input['title'],
                                                true,
                                                true,
                                                'http://pollas.com',
                                                $input['content'],
                                                'http://twitter-posts.com/img/featured_img.jpg',
                                                null,
                                                $input['tags']);

        $this->request->shouldReceive('all')->times(1)->andReturn($input);
        //Test
        $ret = $this->postController->store($this->request);
        $this->assertInstanceOf(\Illuminate\Http\JsonResponse::class, $ret);
        $ret = json_decode($ret->content());
        $this->assertEquals($ret->status, 200);
    }

    public function testRemove()
    {
        //Setup
        $this->loadFixture('posts','posts.json');
        $this->loadFixture('users','users.json');
        $this->loadFixture('tweets','tweets.json');
        $this->loadFixture('tweet_threads','tweet_threads.json');
        $user    = User::where('screen_name','WetdogCompany')->first();
        $badUser = User::where('screen_name','Tweet4Posts')->first();
        $this->sessionManager->shouldReceive('getCurrentUser')->times(2)->andReturn($badUser, $user);
        $post = Post::first();
        $this->request->shouldReceive('get')->times(2)->andReturn($post->id, $post->id);
        //Test
        //Primero el incorrecto.
        $ret = $this->postController->remove($this->request);
        $this->assertInstanceOf(\Illuminate\Http\RedirectResponse::class, $ret);
        $ret = $this->postController->remove($this->request);
        $this->assertInstanceOf(\Illuminate\Http\RedirectResponse::class, $ret);
        $this->assertContains('/posts',$ret->getTargetUrl());
    }

    public function testFailedPublish()
    {
        //Setup
        $this->loadFixture('posts','posts.json');
        $this->loadFixture('users','users.json');
        $user = User::where('screen_name','WetdogCompany')->first();
        $this->sessionManager->shouldReceive('getCurrentUser')->times(1)->andReturn($user);
        $post = Post::first();
        $this->request->shouldReceive('input')->andReturn(null);
        //Test
        //Primero falla
        $ret = $this->postController->publish($this->request, $this->socialManager);
        $this->assertInstanceOf(\Illuminate\Http\JsonResponse::class, $ret);
        $ret = json_decode($ret->content());
        $this->assertEquals($ret->status, 500);
    }

    public function testCorrectPublish()
    {
        //Setup
        $this->loadFixture('posts','posts.json');
        $this->loadFixture('users','users.json');
        $post = Post::first();
        $tweet = 'Esto es un tweet de prueba '.$post->createURL();
        $user = User::where('screen_name','WetdogCompany')->first();
        app()->singleton('twitter', function($app) use($tweet){
            $twitterMock = m::mock('App\Api\TwitterService');
            $twitterMock->shouldReceive('postTweet')->once()->andReturn(json_encode((object)[
                'id' => 11111111111111,
                'id_str' => "11111111111111",
                'status' => $tweet
            ]));
            return $twitterMock;
        });
        $this->socialManager->shouldReceive('getCleanOembed')
                                ->once()->andReturn('<blockquote></blockquote>');
        $this->sessionManager->shouldReceive('getCurrentUser')
                                ->times(1)->andReturn($user);
        $this->userRepository->shouldReceive('updateUser')
                                ->times(1)->andReturn(true);
        $this->request->shouldReceive('input')->with('id')
                                ->once()->andReturn($post->_id);
        $this->request->shouldReceive('input')->with('status')
                                ->once()->andReturn($tweet);
        //Test
        $ret = $this->postController->publish($this->request, $this->socialManager);
        $ret = json_decode($ret->content());
        $this->assertNotEquals($ret->status, 500);
    }

    public function testUnpublish()
    {
        $this->loadFixture('posts','posts.json');
        $this->loadFixture('users','users.json');
        $post = Post::where('status',Post::STATUS_PUBLISHED)->first();
        $user  = User::where('screen_name','WetdogCompany')->first();
        $tweet = '<blockquote>Esto es un tweet</blockquote>';
        $this->sessionManager->shouldReceive('getCurrentUser')->times(1)->andReturn($user);
        $this->request->shouldReceive('input')->once()
                                    ->andReturn($post->id);
        //Test
        $ret = $this->postController->unpublish($this->request);
        $this->assertInstanceOf(\Illuminate\Http\JsonResponse::class, $ret);
    }
}
