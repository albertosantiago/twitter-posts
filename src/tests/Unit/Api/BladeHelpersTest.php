<?php

namespace Tests\Api;

use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use App\Api\BladeHelpers as BladeHelpers;

class BladeHelpersTest extends TestCase
{
    /**
    * Simple test unitario para verificar que devuelva YES or NO en caso de valores booleanos.
    **/
    public function testBasic()
    {
        $ret = $this->getRenderedFor(true);
        $this->assertEquals($ret,'YES');
        $ret = $this->getRenderedFor(1);
        $this->assertEquals($ret,'YES');
        $ret = $this->getRenderedFor("STRING");
        $this->assertEquals($ret,'YES');
        $ret = $this->getRenderedFor(false);
        $this->assertEquals($ret,'NO');
        $ret = $this->getRenderedFor(null);
        $this->assertEquals($ret,'NO');
        $ret = $this->getRenderedFor(0);
        $this->assertEquals($ret,'NO');
    }

    private function getRenderedFor($booleanVal)
    {
        $bladeHelper = new BladeHelpers();
        ob_start();
            $bladeHelper->booleanTranslate($booleanVal);
        $ret = ob_get_contents();
        ob_end_clean();
        return $ret;
    }
}
