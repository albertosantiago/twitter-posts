<?php
namespace Tests\Api;

use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use App\Api\DebounceJob as DebounceJob;
use Cache;
use Carbon\Carbon;

class MyJob extends DebounceJob{

    public $exec = false;

    public function __construct($id){
        $this->cache_key = "__my_job_$id";
    }

    public function start(){
        $this->exec = true;
    }
}

class DebounceJobTest extends TestCase
{

    public function testBasic()
    {
        $this->assertTrue(true);
        $myJob = new MyJob(89);
        //Preparamos como lo haria debounce_job helper.
        $expiresAt = Carbon::now()->addMinutes(10);
        Cache::put($myJob->cache_key, 'Exist', $expiresAt);
        $exists = Cache::has($myJob->cache_key);
        $this->assertTrue($exists);
        //Todo listo, chequeamos que funcione.
        $myJob = new MyJob(89);
        $myJob->handle();
        $this->assertTrue($myJob->exec);
        $exists = Cache::has($myJob->cache_key);
        $this->assertFalse($exists);
    }
}
