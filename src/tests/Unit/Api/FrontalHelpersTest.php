<?php

namespace Tests\Api;

use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use App\Api\FrontalHelpers as FrontalHelpers;
use App\Model\TweetThread;
use PHPHtmlParser\Dom;

class FrontalHelpersTest extends TestCase
{
    /**
    * Simple test unitario para verificar que
    * configura correctamente las rutas con el CDN.
    **/
    public function testCDN()
    {
        $helper = new FrontalHelpers();
        $url = "/scripts/test.js";
        $cdnURL = $helper->cdn($url);
        $CDN = env('CDN_URL');
        $version = env('APP_VERSION');
        $this->assertEquals($cdnURL, $CDN.$url."?v=".$version);
    }
}
