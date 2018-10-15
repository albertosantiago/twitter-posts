<?php namespace Chapusoft\Mongolico\Facades;

use Illuminate\Support\Facades\Facade;

class Mongolico extends Facade
{
    /**
     * Get the registered name of the component.
     *
     * @return string
     */
    protected static function getFacadeAccessor()
    {
        return 'mongolico';
    }
}
