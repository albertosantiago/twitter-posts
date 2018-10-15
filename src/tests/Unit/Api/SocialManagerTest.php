<?php

namespace Tests\Api;

use Tests\TestCase;
use App\Api\SocialManager;

class Implemented implements SocialManager{}

class SocialManagerTest extends TestCase
{
    public function testItsImplemented()
    {
        $implemented = new Implemented();
        $ret = is_subclass_of($implemented, SocialManager::class);
        $this->assertTrue($ret);
        $ret = is_subclass_of($implemented, TestCase::class);
        $this->assertFalse($ret);
    }
}
