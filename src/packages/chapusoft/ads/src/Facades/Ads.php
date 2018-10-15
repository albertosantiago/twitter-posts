<?php namespace Chapusoft\Ads\Facades;

use Illuminate\Support\Facades\Facade;

class Ad extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'ads';
    }
}
