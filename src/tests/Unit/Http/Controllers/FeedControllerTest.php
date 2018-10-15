<?php

namespace Tests\Api;

use Tests\TestCase;
use Illuminate\Http\Request;
use \Mockery as m;
use PHPHtmlParser\Dom;

use App\Http\Controllers\FeedController as FeedController;

class FeedControllerTest extends TestCase
{
    public function testBasic()
    {
        $this->loadFixture('posts','posts.json');
        $dom = new Dom();

        $request = m::mock('Illuminate\Http\Request');
        $request->screenName = "@WetdogCompany";
        $feedController = new FeedController();
        ob_start();
            $feedController->view($request);
        $ret = ob_get_contents();
        ob_end_clean();

        $dom->load($ret);
        $totalItems = $dom->find('item')->count();
        $this->assertEquals($totalItems, 4);
    }
}
