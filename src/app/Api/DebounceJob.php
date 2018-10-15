<?php
namespace App\Api;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use ReflectionClass;
use ReflectionProperty;
use Cache;


class DebounceJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    public $cache_key;

    public function __construct(){}

    protected function clearCache(){
        Cache::forget($this->cache_key);
    }

    public function handle()
    {
        $this->start();
        $this->clearCache();
    }
}
