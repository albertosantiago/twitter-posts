<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Mongolico;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;

    protected function loadFixture($collection, $file){
        $file = base_path('tests/fixtures/'.$file);
        $mongoImport = env('MONGO_BASE')."/mongoimport";
        $database    = config('database.connections.'.config('database.default').'.database');
        $command = "$mongoImport --db $database --collection $collection --file $file";
        return exec($command);
    }

    protected function tearDown(){
        \Mockery::close();
        Mongolico::dropDatabase();
    }

    protected function fillText($size, $pattern="PATTERN_"){
        $sample = '';
        while(true){
            $sample .= $pattern;
            if(strlen($sample)>$size){
                return substr($sample,0, $size);
            }
        }
    }
}
