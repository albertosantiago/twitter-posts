<?php
namespace App\Api;

class TwitterStubService{

    public function __construct(){}

    public function postTweet($params){
        $tweet = $this->createTweet($params);
        return $tweet;
    }

    public function reconfig($params)
    {
        return true;
    }

    public function getRequestToken($params)
    {
        $token = [
            'oauth_token' => 'OAUTH_TOKEN',
            'oauth_token_secret' => 'OAUTH_TOKEN_SECRET'
        ];
        return $token;
    }

    public function getAuthorizeURL($token, $sign_in_twitter, $force_login)
    {
        return "/";
    }

    public function getCredentials()
    {
        return (object)[
            'id' => 1
        ];
    }

    public function getAccessToken(){
        return 'ACCESS_TOKEN';
    }


    //Funciones privadas.
    protected function createTweet($params)
    {
        $generatedID = (int) (microtime(true) * 9876543);

        $status = $params['status'];
        $in_reply_to_status_id = (isset($params['in_reply_to_status_id'])) ? $params['in_reply_to_status_id']: '0';

        $tweet = '{
            "created_at":"Wed Apr 05 11:30:48 +0000 2017",
            "id": '.$generatedID.',
            "id_str":"'.$generatedID.'",
            "text":"'.$status.'",
            "truncated":false,
            "entities":{
                "hashtags":[
                    {"text":"emprendedores","indices":[24,38]},
                    {"text":"negocios","indices":[39,48]}],
                "symbols":[],
                "user_mentions":[],
                "urls":[{
                    "url":"https:\/\/t.co\/PgmURg5zxS",
                    "expanded_url":"https:\/\/twitter-posts.com\/posts\/view\/undefined\/58e29b0de07e981c66586652",
                    "display_url":"twitter-posts.com\/posts\/view\/und\u2026","indices":[49,72]}]},
                    "source":"<a href=\"http:\/\/twitter-posts.com\" rel=\"nofollow\">Twitter4Post<\/a>",
                    "in_reply_to_status_id": '.$in_reply_to_status_id.',
                    "in_reply_to_status_id_str": "'.$in_reply_to_status_id.'",
                    "in_reply_to_user_id":null,
                    "in_reply_to_user_id_str":null,
                    "in_reply_to_screen_name":null,
                    "user":{
                        "id":3979906515,
                        "id_str":"3979906515",
                        "name":"Chucho",
                        "screen_name":"WetdogCompany",
                        "location":"",
                        "description":"Selfish and lumpen lover. We like porn, gambling, marihuana, cryptocurrencies and not work too much.",
                        "url":"http:\/\/t.co\/VGHBlsvOh9",
                        "entities":{
                            "url":{
                                "urls":[{
                                        "url":"http:\/\/t.co\/VGHBlsvOh9",
                                        "expanded_url":"http:\/\/wetdog.co",
                                        "display_url":"wetdog.co",
                                        "indices":[0,22]
                                }]
                            },
                            "description":{
                                "urls":[]
                            }
                        },
                        "protected":false,
                        "followers_count":1310,
                        "friends_count":347,
                        "listed_count":7,
                        "created_at":"Sat Oct 17 14:07:14 +0000 2015",
                        "favourites_count":489,
                        "utc_offset":-25200,
                        "time_zone":"Pacific Time (US & Canada)",
                        "geo_enabled":false,
                        "verified":false,
                        "statuses_count":264,
                        "lang":"en",
                        "contributors_enabled":false,
                        "is_translator":false,
                        "is_translation_enabled":false,
                        "profile_background_color":"000000",
                        "profile_background_image_url":"http:\/\/abs.twimg.com\/images\/themes\/theme1\/bg.png",
                        "profile_background_image_url_https":"https:\/\/abs.twimg.com\/images\/themes\/theme1\/bg.png",
                        "profile_background_tile":false,
                        "profile_image_url":"http:\/\/pbs.twimg.com\/profile_images\/655384839236001792\/WMyGNKtN_normal.jpg",
                        "profile_image_url_https":"https:\/\/pbs.twimg.com\/profile_images\/655384839236001792\/WMyGNKtN_normal.jpg",
                        "profile_link_color":"000000",
                        "profile_sidebar_border_color":"000000",
                        "profile_sidebar_fill_color":"000000",
                        "profile_text_color":"000000",
                        "profile_use_background_image":false,
                        "has_extended_profile":false,
                        "default_profile":false,
                        "default_profile_image":false,
                        "following":false,
                        "follow_request_sent":false,
                        "notifications":false,
                        "translator_type":"none"
                    },
                    "geo":null,
                    "coordinates":null,
                    "place":null,
                    "contributors":null,
                    "is_quote_status":false,
                    "retweet_count":0,
                    "favorite_count":0,
                    "favorited":false,
                    "retweeted":false,
                    "possibly_sensitive":false,
                    "lang":"es"
                }';
        return $tweet;
    }

    public function get($url){
        if($url=='statuses/oembed.json'){
            return $this->getOembed();
        }
        if($url=='favorites/create.json'){
            return $this->getCreatedLike();
        }
    }

    public function post($url, $param=null){
        return true;
    }

    protected function getCreatedLike()
    {
        return json_decode('{
            "created_at": "Mon Apr 10 18:35:58 +0000 2017",
            "id": 851504040391450625,
            "id_str": "851504040391450625",
            "text": "Foh que aburrimiento....",
            "truncated": false,
            "entities": {
                "hashtags": [],
                "symbols": [],
                "user_mentions": [],
                "urls": [],
            },
            "source": "http://twitter-posts.com",
            "in_reply_to_status_id": null,
            "in_reply_to_status_id_str": null,
            "in_reply_to_user_id": null,
            "in_reply_to_user_id_str": null,
            "in_reply_to_screen_name": null,
            "user": {
                "id": 3979906515,
                "id_str": "3979906515",
                "name": "Chucho",
                "screen_name": "WetdogCompany",
                "location": "",
                "description": "Selfish and lumpen lover. We like porn, gambling, marihuana, cryptocurrencies and not work too much.",
                "url": "http://t.co/VGHBlsvOh9",
                "entities": {
                  "url": {
                    "urls": [{
                        "url": "http://t.co/VGHBlsvOh9",
                        "expanded_url": "http://wetdog.co",
                        "display_url": "wetdog.co",
                        "indices":[0,22]
                      }]
                  }
                  "description": {
                    "urls": []
                  }
                }
                "protected": false,
                "followers_count": 1305,
                "friends_count": 346,
                "listed_count": 7,
                "created_at": "Sat Oct 17 14:07:14 +0000 2015",
                "favourites_count": 493,
                "utc_offset": -25200,
                "time_zone": "Pacific Time (US & Canada)",
                "geo_enabled": false,
                "verified": false,
                "statuses_count": 294,
                "lang": "en",
                "contributors_enabled": false,
                "is_translator": false,
                "is_translation_enabled": false,
                "profile_background_color": "000000",
                "profile_background_image_url": "http://abs.twimg.com/images/themes/theme1/bg.png",
                "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme1/bg.png",
                "profile_background_tile": false,
                "profile_image_url": "http://pbs.twimg.com/profile_images/655384839236001792/WMyGNKtN_normal.jpg",
                "profile_image_url_https": "https://pbs.twimg.com/profile_images/655384839236001792/WMyGNKtN_normal.jpg",
                "profile_link_color": "000000",
                "profile_sidebar_border_color": "000000",
                "profile_sidebar_fill_color": "000000",
                "profile_text_color": "000000",
                "profile_use_background_image": false,
                "has_extended_profile": false,
                "default_profile": false,
                "default_profile_image": false,
                "following": false,
                "follow_request_sent": false,
                "notifications": false,
                "translator_type": "none",
            }
            "geo": null,
            "coordinates": null,
            "place": null,
            "contributors": null,
            "is_quote_status": false,
            "retweet_count": 0,
            "favorite_count": 1,
            "favorited": true,
            "retweeted": false,
            "lang": "es",
        }');
    }

    protected function getOembed(){

        $html = '<blockquote class="twitter-tweet" data-lang="en">
                    <p lang="es" dir="ltr">
                        En 1953 toda la península de Corea era una barrizal. En el norte se instaló el comunismo.
                        Lo que pasó a continuación te sorprenderá.
                        <a href="https://t.co/oqZvNHjnyY">pic.twitter.com/oqZvNHjnyY</a>
                    </p>
                    &mdash;
                    Pablo (@vigilis)
                    <a href="https://twitter.com/vigilis/status/850726841149251584">April 8, 2017</a>
                </blockquote>';

        return (object)[
            'url' => 'https://twitter.com/vigilis/status/850726841149251584',
            'author_name' => 'Pablo',
            'author_url' => 'https://twitter.com/vigilis',
            'html' => $html,
            'width' => 550,
            'height' => 'null',
            'type' => 'rich',
            'cache_age' => "3153600000",
            'provider_name' => "Twitter",
            'provider_url' => "https://twitter.com",
            'version' => "1.0"
        ];
    }
}
