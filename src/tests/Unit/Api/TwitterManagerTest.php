<?php

namespace Tests\Api;

use Tests\TestCase;
use App\Api\TwitterManager;
use \Mockery as m;

class TwitterManagerTest extends TestCase
{
    public function testGetLoginURL()
    {
        $twitterManager = new TwitterManager();
        $app = app();
        $expectedUrl = 'https://twitter.com/login?callback=384';
        $app->singleton('twitter', function($app) use ($expectedUrl){
            $twitter = m::mock();
            $twitter->shouldReceive('reconfig')->once()->andReturn(null);
            $twitter->shouldReceive('getRequestToken')->once()->andReturn([
                'oauth_token_secret' => 'MY_OAUTH_TOKEN_SECRET',
                'oauth_token'   => 'MY_OAUTH_TOKEN'
            ]);
            $twitter->shouldReceive('getAuthorizeURL')->once()->andReturn($expectedUrl);
            return $twitter;
        });
        $this->assertNotNull($twitterManager);
        $url = $twitterManager->getLoginURL();
        $this->assertEquals($url, $expectedUrl);
    }

    public function testCheckCredentials()
    {
        //Preparativos.
        $twitterManager = new TwitterManager();
        $app = app();
        $app->singleton('twitter', function($app){
            $twitter = m::mock();
            $twitter->shouldReceive('reconfig')->once()->andReturn(null);
            $twitter->shouldReceive('getAccessToken')->once()->andReturn([
                'oauth_token_secret' => 'MY_OAUTH_ACCESS_TOKEN_SECRET',
                'oauth_token'   => 'MY_OAUTH_ACCESS_TOKEN'
            ]);
            $twitter->shouldReceive('getCredentials')->once()->andReturn((object)[
                'type' => 'credentials'
            ]);
            return $twitter;
        });
        $app->singleton('session', function ($app){
            $session = m::mock();
            $session->shouldReceive('has')->with('oauth_request_token')->times(2)->andReturn(false, true);
            $session->shouldReceive('get')->times(2)->andReturn('MY_OAUTH_REQUEST_TOKEN','MY_OAUTH_REQUEST_TOKEN_SECRET');
            $session->shouldReceive('put')->with('access_token', \Mockery::any())->once()->andReturn(true);
            return $session;
        });

        //Primero para usuarios invitados, sin session cargada.
        $this->assertNotNull($twitterManager);
        $ret = $twitterManager->checkCredentials();
        $this->assertFalse($ret);
        //Ahora comprobamos que haya algun usuario en session.
        $ret = $twitterManager->checkCredentials();
        $this->assertEquals($ret->type,'credentials');
    }

    public function testGetUser()
    {
        //Preparativos.
        $twitterManager = new TwitterManager();
        $app = app();
        $app->singleton('twitter', function($app){
            $twitter = m::mock();
            $twitter->shouldReceive('getCredentials')->times(2)->andReturn((object)[
                'id'   => 54,
                'type' => 'credentials'
            ]);
            return $twitter;
        });
        $app->singleton('session', function ($app){
            $session = m::mock();
            $session->shouldReceive('get')->times(2)->andReturn('MY_OAUTH_ACCESS_TOKEN');
            return $session;
        });
        //Primero para usuarios invitados, sin session cargada.
        $this->assertNotNull($twitterManager);
        $user = $twitterManager->getUser();
        $this->assertNotNull($user);
        $this->assertEquals($user->type,'credentials');
        $this->assertEquals($user->id, 54);
        $user = $twitterManager->updateUser($user);
        $this->assertNotNull($user);
        $this->assertEquals($user->type,'credentials');
        $this->assertEquals($user->id, 54);
    }

    public function testGetCleanOembed()
    {
        //Preparativos.
        $twitterManager = new TwitterManager();
        $app = app();
        $app->singleton('twitter', function($app){
            $twitter = m::mock();
            $twitter->shouldReceive('get')->once()->andReturn((object)[
                'tweet_id' => 121212121,
                'tweet_id_str' => "121212121",
                'html' => '<blockquote></blockquote>'
            ]);
            return $twitter;
        });
        //Primero para usuarios invitados, sin session cargada.
        $this->assertNotNull($twitterManager);
        $tweet = $twitterManager->getCleanOembed('WetdogCompany', 1492);
        $this->assertNotNull($tweet);
        $this->assertEquals($tweet->html, '<blockquote></blockquote>');
    }
}
