<?php

namespace Tests\Api;

use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use App\Api\Util as Util;

class UtilTest extends TestCase
{
    public function testBasicTest()
    {
        $util = new Util();
        $ret = $util->implodeList([
            'caca','culo','teta','mierda'
        ],15);
        $this->assertEquals(sizeOf($ret), 2);
    }
}
