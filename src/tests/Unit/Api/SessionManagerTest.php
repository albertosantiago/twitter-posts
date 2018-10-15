<?php

namespace Tests\Api;

use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use App\Api\SessionManager as SessionManager;
use \Mockery as m;

use App\Api\SocialManager;
use App\Api\UserRepository;

define('TWITTER_DEBUG', true);

class SessionManagerTest extends TestCase
{
    public function testCorrectCreation()
    {
        $this->loadFixture('users','users.json');
        $socialManager  = m::mock('App\Api\SocialManager');
        $userRepository = new UserRepository();

        $app = app();
        $app->singleton('session', function ($app){
            $session = m::mock();
            $session->shouldReceive('get')->with('user_twitter_id')->once()->andReturn(null);
            return $session;
        });
        $sessionManager = new SessionManager($socialManager, $userRepository);
        $this->assertInstanceOf(SessionManager::class, $sessionManager);
        $user = $sessionManager->getCurrentUser();
        $this->assertEquals($user->screen_name,'guest');
        $this->assertEquals($sessionManager->getCurrentUserId(), false);
    }

    public function testCorrectUserLoad()
    {
        $this->loadFixture('users','users.json');
        $socialManager  = m::mock('App\Api\SocialManager');
        $userRepository = new UserRepository();

        $app = app();
        $app->singleton('session', function ($app){
            $session = m::mock();
            $session->shouldReceive('get')->with('user_twitter_id')->once()->andReturn(3979906515);
            $session->shouldReceive('forget')->with('user_twitter_id')->once()->andReturn(true);
            $session->shouldReceive('forget')->with('access_token')->once()->andReturn(true);
            $session->shouldReceive('forget')->with('oauth_request_token')->once()->andReturn(true);
            $session->shouldReceive('forget')->with('oauth_request_token_secret')->once()->andReturn(true);
            return $session;
        });
        $sessionManager = new SessionManager($socialManager, $userRepository);
        $this->assertInstanceOf(SessionManager::class, $sessionManager);
        $user = $sessionManager->getCurrentUser();
        $this->assertEquals($user->screen_name,'WetdogCompany');
        $this->assertEquals($sessionManager->getCurrentUserId(), 3979906515);
        //Ahora verificamos que elimine correctamente los datos de session
        $sessionManager->logout();
    }

    public function testSetAndGetPreferences()
    {
        $this->loadFixture('users','users.json');
        $socialManager  = m::mock('App\Api\SocialManager');
        $userRepository = new UserRepository();

        $otherConf = ['caca' => 'vaca'];
        $app = app();
        $app->singleton('session', function ($app) use($otherConf){
            $session = m::mock();
            $session->shouldReceive('get')->with('user_twitter_id')->once()->andReturn(3979906515);
            $session->shouldReceive('get')->with('user.preferences')->times(2)->andReturn([
                'show_adult_content' => true,
                'other_conf' => $otherConf
            ]);
            $session->shouldReceive('put')->times(2)->andReturn(true);
            return $session;
        });
        $sessionManager = new SessionManager($socialManager, $userRepository);
        $sessionManager->setUserPreference('show_adult_content', true);
        $this->assertEquals($sessionManager->getUserPreference('show_adult_content'), true);
        $sessionManager->setUserPreference('other_conf', $otherConf);
        $this->assertEquals($sessionManager->getUserPreference('other_conf'), $otherConf);
    }


    public function testSetAndGetPreferencesForGuest()
    {
        $this->loadFixture('users','users.json');
        $socialManager  = m::mock('App\Api\SocialManager');
        $userRepository = new UserRepository();

        $otherConf = ['caca' => 'vaca'];

        $app = app();
        $app->singleton('session', function ($app) use($otherConf){
            $session = m::mock();
            $session->shouldReceive('get')->with('user_twitter_id')->once()->andReturn(null);
            $session->shouldReceive('put')->times(2)->andReturn(true);
            $session->shouldReceive('get')->with('user.preferences')->times(2)->andReturn(['show_adult_content'=>true]);
            $session->shouldReceive('get')->with('user.preferences.show_adult_content')->once()->andReturn(true);
            $session->shouldReceive('get')->with('user.preferences.other_conf')->once()->andReturn($otherConf);
            return $session;
        });
        $sessionManager = new SessionManager($socialManager, $userRepository);
        $sessionManager->setUserPreference('show_adult_content', true);
        $this->assertEquals($sessionManager->getUserPreference('show_adult_content'), true);
        $sessionManager->setUserPreference('other_conf', $otherConf);
        $this->assertEquals($sessionManager->getUserPreference('other_conf'), $otherConf);
    }

}
