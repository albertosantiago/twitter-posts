<?php namespace App\Api;

use App\Jobs\RegenerateTwitterThread;
use App\Jobs\GenerateThumb;
use App\Jobs\SendSuggestion;
use Carbon\Carbon;

/**
 * Job Management
 * @author Alberto Santiago <chucho@wetdog.co>
 */
class JobManager{

    public function dispatchPostJobs($postId)
    {
        $job = new RegenerateTwitterThread($postId);
        $job = $job->delay(Carbon::now()->addSeconds(5));
        return dispatch_debounce($job);
    }

    public function dispatchThumbsJob($upload){
        $job = new GenerateThumb($upload);
        return dispatch($job);
    }

    public function dispatchSuggestionJob($post, $userScreenName){
        $job = new SendSuggestion($post, $userScreenName);
        return dispatch($job);
    }
}
