<?php

namespace Tests\Api;

use Tests\TestCase;
use Illuminate\Http\Request;
use \Mockery as m;
use PHPHtmlParser\Dom;
use View;

use App\Http\Controllers\RobotsController as RobotsController;

class RobotsControllerTest extends TestCase
{
    public function testBasic()
    {
        $this->loadFixture('users','users.json');
        $this->loadFixture('posts','posts.json');
        //Setup
        $dom = new Dom();
        $robotsController = new RobotsController();
        //Test
        $ret = $robotsController->robotsTxt()->content();
        $this->assertContains('User-agent: *',$ret);
        $ret = $robotsController->sitemap()->content();
        $this->assertContains('/@WetdogCompany<',$ret);
    }
}
