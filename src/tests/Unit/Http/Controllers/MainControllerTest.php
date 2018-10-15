<?php
namespace Tests\Api;

use Tests\TestCase;
use Illuminate\Http\Request;
use \Mockery as m;
use PHPHtmlParser\Dom;
use Carbon\Carbon;

use App\Http\Controllers\MainController as MainController;
use View;

class MainControllerTest extends TestCase
{
    protected function setup()
    {
        parent::setup();
    }

    public function testWelcome()
    {
        $dom = new Dom();
        $sessionManager = m::mock('App\Api\SessionManager');
        $request = m::mock('Illuminate\Http\Request');

        $mainController = new MainController($sessionManager);
        $ret = (string) $mainController->index($request)->render();
        $dom->load($ret);
        $title = $dom->find('h1.brand')[0]->text();
        $this->assertEquals($title, 'Welcome to Twitter Posts!');
    }

    public function testNotFound()
    {
        $currentUser = m::mock('App\Model\User');
        $currentUser->shouldReceive('getAttribute')->times(7)->andReturn('XXX');
        $owner = m::mock('App\Model\User');
        $owner->shouldReceive('getAttribute')->once(1)->andReturn('YYY');

        View::share('currentUser', $currentUser);
        View::share('owner',       $owner);

        $dom = new Dom();
        $sessionManager = m::mock('App\Api\SessionManager');
        $request = m::mock('Illuminate\Http\Request');

        $mainController = new MainController($sessionManager);
        $ret = (string) $mainController->notFound($request);
        $dom->load($ret);
        $title = $dom->find('h1.brand')[0]->text();
        $this->assertEquals($title, 'Twitter Posts');
        $subTitle = $dom->find('h2')[0]->text();
        $this->assertEquals($subTitle, 'Error 404');
    }
}
