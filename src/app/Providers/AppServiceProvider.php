<?php
namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Http\Request;
use Laravel\Dusk\DuskServiceProvider;
//My services.
use App\Api\SocialManager;
use App\Api\TwitterManager;
use App\Api\SessionManager;
use App\Api\JobManager;
use App\Api\UserRepository;
use App\Api\MetaCreator;
use App\Api\BladeHelpers;
use App\Api\FrontalHelpers;
use App\Api\ThreadRenderHelper;
use App\Api\TwitterStubService;
use App\Api\TwitterService;
use App\Api\HtmlPurifierService;

use Session;
use Form;

if(!defined('TWITTER_DEBUG')){
    define('TWITTER_DEBUG', env('TWITTER_DEBUG', false));
}

require_once app_path("Support/helpers.php");

class AppServiceProvider extends ServiceProvider
{
    public function boot()
    {
        Form::component('cron', 'components.form.cron', ['name', 'value' => null, 'attributes' => []]);
    }

    public function register()
    {
        $this->registerServicesForWeb();
        $this->registerServicesForAdmin();
        if($this->app->environment('local', 'testing')){
            $this->registerServicesForTesting();
        }
    }

    public function registerServicesForWeb()
    {
        $app = $this->app;
        $this->app->singleton('htmlPurifier', function ($app){
            return new HtmlPurifierService($app['config']['htmlpurifier']);
        });
        $this->app->singleton('App\Api\UserRepository', function ($app){
            return new UserRepository();
        });
        $this->app->singleton('App\Api\SocialManager', function ($app){
            return new TwitterManager();
        });
        $this->app->singleton('jobManager', function ($app){
            return new JobManager();
        });
        $this->app->singleton('App\Api\SessionManager', function ($app){
            return new SessionManager($app['App\Api\SocialManager'],$app['App\Api\UserRepository']);
        });
        //Metemos Tweeter aqui para mockearlo en desarrollo.
        if((defined('TWITTER_DEBUG')&(TWITTER_DEBUG))&&(env('APP_ENV')=='local')){
            $this->app->singleton('twitter', function () {
                return new TwitterStubService();
            });
        }else{
            $this->app->singleton('twitter', function () use ($app) {
                return new TwitterService($app['config'], $app['session.store']);
            });
        }
        //Metacreator -> Servicio para renderizar las metaetiquetas sociales.
        $this->app->singleton('metaCreator', function ($app){
            return new MetaCreator(app('request'));
        });
        $this->app->singleton('App\Api\FrontalHelpers', function ($app){
            return new FrontalHelpers();
        });
        $this->app->singleton('App\Api\ThreadRenderHelper', function ($app){
            return new ThreadRenderHelper();
        });
    }

    public function registerServicesForAdmin()
    {
        $this->app->singleton('App\Api\BladeHelpers', function ($app){
            return new BladeHelpers();
        });
    }

    public function registerServicesForTesting()
    {
        $this->app->register(DuskServiceProvider::class);
    }
}
