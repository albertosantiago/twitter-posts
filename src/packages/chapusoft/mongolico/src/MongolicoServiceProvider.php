<?php
namespace Chapusoft\Mongolico;

use Illuminate\Support\ServiceProvider;

class MongolicoServiceProvider extends ServiceProvider
{
    /**
     * Indicates if loading of the provider is deferred.
     *
     * @var bool
     */
    protected $defer = true;

    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton('mongolico', function ($app) {
            return new Database($app['config']['database.connections.mongodb']);
        });
    }

    /**
     * Get the services provided by the provider.
     *
     * @return array
     */
    public function provides()
    {
        return ['mongolico'];
    }
}
