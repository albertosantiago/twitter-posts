<?php

if (! function_exists('dispatch_debounce')) {

    function dispatch_debounce($job)
    {
        $value = app('cache')->get($job->cache_key);
        if(!$value){
            $expiresAt = $job->delay;
            app('cache')->put($job->cache_key, true, $expiresAt);
            return dispatch($job);
        }
    }
}
