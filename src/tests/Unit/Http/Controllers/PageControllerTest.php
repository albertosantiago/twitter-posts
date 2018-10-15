<?php

namespace Tests\Api;

use Tests\TestCase;
use Illuminate\Http\Request;
use \Mockery as m;
use PHPHtmlParser\Dom;
use View;

use App\Http\Controllers\PagesController as PagesController;

class PageControllerTest extends TestCase
{
    public function testBasic()
    {
        //Setup
        $currentUser = m::mock('App\Model\User');
        $currentUser->shouldReceive('getAttribute')->times(7)->andReturn('XXX');
        $owner = m::mock('App\Model\User');
        $owner->shouldReceive('getAttribute')->once(1)->andReturn('YYY');
        View::share('currentUser', $currentUser);
        View::share('owner',       $owner);
        $dom = new Dom();
        $pageController = new PagesController();
        //Test
        $ret = $pageController->view('terms')->render();
        $dom->load($ret);
        $title = $dom->find('title')->text();
        $expectedTitle = 'Twitter-Posts Terms of Service – Twitter-Posts Policy';
        $this->assertEquals($title, $expectedTitle);
    }
}
