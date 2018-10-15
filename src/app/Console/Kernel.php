<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use App\Model\CronTask;

class Kernel extends ConsoleKernel
{
    protected $commands = [
        Commands\Twitter\SearchReplies::class,
        Commands\Twitter\SendMentions::class,
        Commands\Twitter\SearchThreads::class,
        Commands\Twitter\GenerateThreadPosts::class,
        Commands\Twitter\UpdateThreadAuthors::class,
        Commands\Twitter\CleanTweets::class,
        Commands\Twitter\RetweetPublications::class,
        Commands\Twitter\PublishSystemPosts::class,
        Commands\Twitter\RemakeFailedThumbs::class,
    ];

    protected function schedule(Schedule $schedule)
    {
        if(app()->environment()!='testing'){
            $cronTasks = CronTask::all();
            foreach($cronTasks as $cronTask){
                if($cronTask->params!==null){
                    $schedule->command($cronTask->command, [$cronTask->params])
                              ->cron($cronTask->cron)
                              ->withoutOverlapping();
                }else{
                    $schedule->command($cronTask->command)
                              ->cron($cronTask->cron)
                              ->withoutOverlapping();
                }
            }
        };
    }

    /**
     * Esto mola, es para crear comandos con un closure.
     */
    protected function commands()
    {
        require base_path('routes/console.php');
    }
}
