<?php namespace Chapusoft\Ads;

use Chapusoft\Ads\Ads;
use Illuminate\Support\ServiceProvider;

class AdsServiceProvider extends ServiceProvider
{

    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        $this->handleConfig();
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        $this->mergeConfigFrom(
            __DIR__.'/config/ads.php',
            'ads'
        );
        $this->app->bind('ads', function () {
            return new Ads(app('config')->get('ads'));
        });
    }

    protected function handleConfig()
    {
        $configPath = __DIR__ . '/config/ads.php';
        $this->publishes([$configPath => $this->getConfigPath()], 'config');
    }

    /**
     * Get the config path
     *
     * @return string
     */
    protected function getConfigPath()
    {
        return config_path('ads.php');
    }

    /**
     * Publish the config file
     *
     * @param  string $configPath
     */
    protected function publishConfig($configPath)
    {
        $this->publishes([$configPath => config_path('ads.php')], 'config');
    }


    /**
     * Get the services provided by the provider.
     *
     * @return array
     */
    public function provides()
    {
        return [
            'ads',
        ];
    }
}
