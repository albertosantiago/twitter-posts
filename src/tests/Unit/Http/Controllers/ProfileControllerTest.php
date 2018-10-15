<?php

namespace Tests\Api;

use Tests\TestCase;
use Illuminate\Http\Request;
use \Mockery as m;
use PHPHtmlParser\Dom;
use View;
use App\Model\Post;
use App\Model\User;

use App\Http\Controllers\ProfileController as ProfileController;

class ProfileControllerTest extends TestCase
{
    protected function setup()
    {
        $this->socialManager = m::mock("App\Api\SocialManager");
        $this->userMock =  m::mock('App\Model\User');
        $this->request  =  m::mock('Illuminate\Http\Request');
        $this->sessionManager = m::mock('App\Api\SessionManager');
        $this->userRepository = m::mock('App\Api\UserRepository');
        $this->profileController = new ProfileController($this->sessionManager,
                                                  $this->userRepository);
        parent::setup();
    }

    public function testProfile()
    {
        //Setup
        $this->loadFixture('posts','posts.json');
        $this->loadFixture('users','users.json');
        $this->request->shouldReceive('input')->once()->andReturn(null);
        $user = User::where('screen_name','WetdogCompany')->first();
        $this->userRepository->shouldReceive('findOne')->once()->andReturn($user);
        //Test
        $ret = $this->profileController->profile($this->request, '@WetdogCompany');
        $this->assertInstanceOf(\Illuminate\View\View::class, $ret);
        $data = $ret->getData();
        //Should be 2 published posts.
        $this->assertEquals($data['posts']->count(), 2);
    }

    public function testBasic()
    {
        $this->loadFixture('users','users.json');
        //Setup
        $dom = new Dom();
        //Test
        $ret = $this->profileController->cssProfile('guest')->content();
        $this->assertContains('.header-background',$ret);
        $ret = $this->profileController->cssProfile('not_existing_user')->content();
        $this->assertContains('.header-background',$ret);
        $ret = $this->profileController->cssProfile('WetdogCompany')->content();
        $this->assertContains('PERSONALIZACIONES TWITTER USUARIO.', $ret);
    }
}
