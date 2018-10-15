<?php

Route::get('/', 'LoginController@getLogin');
//Esta ruta esta para instalar el administrador en la instalación.
Route::get('setup', 'AdminController@setup');
//Rutas de autentificación.
Route::group(['namespace' => 'Auth'], function () {
    Route::get('login', ['as' => 'login', 'uses' => 'LoginController@getLogin']);
    Route::post('login', 'LoginController@login');
    Route::get('logout', 'LoginController@getLogout');
});
Route::group(['middleware' => ['auth:admin']], function () {
    //Rutas de usuario.
    Route::group(['namespace' => 'Auth'], function () {
        Route::get('change-password', 'ResetPasswordController@showChangePasswordForm');
        Route::post('change-password', 'ResetPasswordController@changePassword');
    });
    //Rutas normales.
    Route::get('/', 'AdminController@dashboard');
    Route::group(['prefix' => 'cron'], function () {
        Route::get('/', 'CronController@index')->name('admin.cron.index');
        Route::get('/create', 'CronController@create');
        Route::delete('remove/{id}', 'CronController@destroy')->name('admin.cron.destroy');
        Route::post('store/', 'CronController@store')->name('admin.cron.store');
    });
    Route::group(['prefix' => 'server'], function () {
        Route::get('/', 'ServerController@info');
        Route::get('info', 'ServerController@info');
    });
    Route::group(['prefix' => 'twitter-bot'], function () {
        Route::get('/', 'TwitterBotController@showUserApp');
        Route::get('/login', 'TwitterBotController@login')->name('admin.twitter_bot.login');
        Route::get('/callback', 'TwitterBotController@callback')->name('admin.twitter_bot.callback');
        Route::get('/refresh', 'TwitterBotController@refresh')->name('admin.twitter_bot.refresh');
    });
    Route::group(['prefix' => 'log'], function () {
        Route::get('/', 'LogController@index');
        Route::get('json', 'LogController@json');
        Route::delete('clear', ['as' => 'admin.log.clear', 'uses' => 'LogController@delete']);
    });
    Route::group(['prefix' => 'processes'], function () {
        Route::get('/', 'ProcessController@index');
        Route::get('/exec/{name}', 'ProcessController@exec');
    });
    Route::group(['prefix' => 'viewer'], function () {
        Route::get('/', 'ViewerController@index');
        Route::post('/del', 'ViewerController@del');
    });
    Route::group(['namespace' => 'System'], function () {
        Route::group(['prefix' => 'system'], function () {
            Route::get('/notifications/', 'NotificationController@index');
            Route::get('/notifications/del', 'NotificationController@delete');
            Route::get('/thread/delTweet', 'ThreadController@deleteTweet');
            Route::get('/thread/delPost', 'ThreadController@deletePost');
            Route::get('/thread/generatePost', 'ThreadController@generatePost');
            Route::get('/threads/', 'ThreadController@index');
            Route::get('/thread/{threadId}', 'ThreadController@view');
            Route::get('/threads/del', 'ThreadController@delete');
            Route::post('/threads/store', 'ThreadController@store');
            Route::get('/threads/toogle_status', 'ThreadController@changeStatus');
            Route::get('/tweets/', 'TweetsController@index');
            Route::get('/tweet/{tweetId}', 'TweetsController@view');
            Route::get('/tweet/del/{tweetId}', 'TweetsController@deleteTweet');
            Route::get('/tweets/reset_pending', 'TweetsController@resetPending');
            Route::get('/tweets/reset_tweet', 'TweetsController@resetTweet');
            Route::get('/tweets/show_duplicates', 'TweetsController@showDuplicates');
            Route::post('/tweets/store', 'TweetsController@store');
            Route::get('/authors/', 'AuthorController@index');
            Route::post('/authors/store', 'AuthorController@store');
            Route::get('/authors/update', 'AuthorController@updateAuthor');
        });
    });
    Route::group(['namespace' => 'CMS'], function () {
        Route::group(['prefix' => 'cms'], function () {
            //User routes
            Route::get('/user/{userId}', 'UserController@view');
            Route::get('/users', 'UserController@index');
            Route::get('/users/loginAs/{userId}', 'UserController@loginAs');
            Route::post('/user/admin-group/add', ['as' => 'admin.cms.user.administers.add', 'uses' => 'UserController@addToAdminGroup']);
            Route::get('/users/admin-group/', ['as' => 'admin.cms.user.administers', 'uses' => 'UserController@viewAdminGroup']);
            Route::get('/users/json', 'UserController@json');
            //Content Routes
            //Feedbacks
            Route::get('/contact', 'ContactController@index');
            Route::delete('clear', ['as' => 'admin.cms.contact.clear', 'uses' => 'ContactController@delete']);
            //Posts
            Route::get('/posts', 'PostController@index');
            Route::get('/posts/view/{postId}', 'PostController@view');
            Route::post('/posts/store', 'PostController@store');
            Route::post('/posts/system_configure', 'PostController@systemConfigure');
        });
    });
});
