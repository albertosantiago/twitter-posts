<?php
namespace Tests\Api;

use App\Http\Controllers\LoginController;
use Tests\TestCase;
use Illuminate\Http\Request;
use \Mockery as m;
use PHPHtmlParser\Dom;
use View;

class LoginControllerTest extends TestCase
{
    protected function setup()
    {
        $this->sessionManager = m::mock('App\Api\SessionManager');
        $this->socialManager  = m::mock('App\Api\SocialManager');
        $this->userRepository = m::mock('App\Api\UserRepository');
        $this->loginController = new LoginController($this->socialManager,
                                                         $this->sessionManager,
                                                         $this->userRepository);
        parent::setup();
    }

    public function testLogin()
    {
        $this->socialManager->shouldReceive('getLoginURL')->once()->andReturn('https://twitter-posts.com/callback');
        $this->sessionManager->shouldReceive('logout')->once()->andReturn(true);
        $ret = $this->loginController->login();
        $this->assertInstanceOf(\Illuminate\Http\RedirectResponse::class, $ret);
    }

    public function testCallback()
    {
        //Setup
        $user = m::mock('App\Model\User');
        $this->sessionManager->shouldReceive('getCurrentUser')->once()->andReturn($user);
        $this->sessionManager->shouldReceive('isLogged')->times(2)->andReturn(false,true);
        $this->userRepository->shouldReceive('insertOrUpdateUser')->once()->andReturn(true);
        //Test
        $ret = $this->loginController->callback();
        $this->assertInstanceOf(\Illuminate\Http\RedirectResponse::class, $ret);
        $ret = $this->loginController->callback();
        $this->assertInstanceOf(\Illuminate\View\View::class, $ret);
    }

    public function testLogout()
    {
        $this->sessionManager->shouldReceive('logout')->once()->andReturn(true);
        $ret = $this->loginController->logout();
        $this->assertInstanceOf(\Illuminate\Http\RedirectResponse::class, $ret);
    }

    public function testError()
    {
        $ret = $this->loginController->error();
        $this->assertInstanceOf(\Illuminate\View\View::class, $ret);
    }

}
