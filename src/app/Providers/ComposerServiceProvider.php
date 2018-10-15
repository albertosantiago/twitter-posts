<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Api\SocialManager;
use App\Api\TwitterManager;
use Illuminate\Http\Request;
use Session;
use Jenssegers\Agent\Agent;
use View;

class ComposerServiceProvider extends ServiceProvider
{

    public function boot()
    {
    }

    public function register()
    {
        //Sometimes we overwrite templates for better responsive.
        $agent = new Agent();
        if(empty($agent->isDesktop())){
            View::addLocation(base_path().'/resources/views/mobile/');
        }
        View::addLocation(base_path().'/resources/views/desktop/');
    }
}
