<?php

Route::group([
        'prefix' => LaravelLocalization::setLocale(),
        'middleware' => [ 'localeSessionRedirect', 'localizationRedirect', 'localeViewPath' ]
    ], function()
{
    //Para experimentos....
    Route::get('experiment', 'MainController@experiment');
    //Ruta de bienvenida
    Route::get('/', 'MainController@index');
    Route::get('/404', 'MainController@notFound');
    //Rutas acciones ajax
    Route::get('/ajax/suggest', 'AjaxController@sendSuggestion');
    //Formulario de contacto.
    Route::get('contact', 'ContactController@showContactForm');
    Route::post('contact', 'ContactController@handleContactForm');
    //Ruta feed.
    Route::get('feed/{screenName}', 'FeedController@view');
    //Rutas para robots.
    Route::get('sitemap.xml', 'RobotsController@sitemap');
    Route::get('robots.txt', 'RobotsController@robotsTxt');
    //Páginas de consentimiento de contenido para adultos.
    Route::get('adult/consent', 'AdultController@consent');
    Route::post('adult/consent', 'AdultController@consent');
    //Páginas
    Route::get('pages/{templateName}', 'PagesController@view');
    //Rutas necesarias para el login de usuarios.
    Route::get('twitter/login', ['as' => 'twitter.login', 'uses' => 'LoginController@login']);
    Route::get('twitter/callback', ['as' => 'twitter.callback','uses' => 'LoginController@callback' ]);
    Route::get('twitter/error', ['as' => 'twitter.error', 'uses' => 'LoginController@error']);
    Route::get('twitter/logout', ['as' => 'twitter.logout', 'uses' => 'LoginController@logout']);
    //Uploads
    Route::get('uploads/',  'UploadsController@index');
    Route::get('uploads/remove/{id}', 'UploadsController@remove');
    //Rutas de blog
    Route::get(LaravelLocalization::transRoute('routes.posts'), ['as' => 'posts.index', 'uses' => 'PostController@index']);
    Route::get(LaravelLocalization::transRoute('routes.my_posts'), ['as' => 'posts.list', 'uses' => 'PostController@showUserPosts']);
    Route::get(LaravelLocalization::transRoute('routes.my_posts_new'), ['as' => 'posts.new', 'uses' => 'PostController@create']);
    Route::get(LaravelLocalization::transRoute('routes.post_edit'), ['as' => 'post.edit', 'uses' => 'PostController@edit']);
    Route::get(LaravelLocalization::transRoute('routes.post_view'), ['as' => 'post.view', 'uses' => 'PostController@view']);
    //Profile
    Route::get('/{userScreenName}', ['as' => 'profile.view', 'uses' => 'ProfileController@profile']);
    Route::get('profile/css/{screenName}', 'ProfileController@cssProfile');
    Route::get('current-user/menu', 'ProfileController@getCurrentUserMenu');
});

Route::post('uploads/add', 'UploadsController@upload');
Route::post('posts/store', ['as' => 'posts.store', 'uses' => 'PostController@store']);
Route::post('posts/publish', 'PostController@publish');
Route::post('posts/unpublish', 'PostController@unPublish');
Route::post('posts/remove', 'PostController@remove');
//Rutas para manejo de tweets.
Route::post('tweets/reply', 'TwitterController@reply');
Route::post('tweets/like', 'TwitterController@like');
Route::post('tweets/retweet', 'TwitterController@retweet');
Route::post('tweets/thread', 'TwitterController@getThread');
Route::get('tweets/oembed', ['as' => 'tweets.oembed', 'uses' => 'TwitterController@oembed']);
Route::get('twitter/lookup/user', 'TwitterController@lookup');

//Snapshots Maker
Route::get('snp/pending', 'SnapshotsController@getPending');
Route::get('snp/rendered_tweet', 'SnapshotsController@getRenderedTweet');
Route::get('snp/pending_thread', 'SnapshotsController@getPendingThread');
Route::post('snp/update', 'SnapshotsController@updateTweet');
Route::get('snp/update_thread', 'SnapshotsController@updateThread');
Route::get('snp/pendingHtml', 'SnapshotsController@getPendingHtml');
Route::post('snp/updateHtml', 'SnapshotsController@updateTweetHtml');
