<?php
namespace App\Model;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Tweet extends Eloquent{

    const STATUS_PENDING = 1;
    const STATUS_PROCESSED = 2;
    const STATUS_IN_PROCESS = 3;
    const STATUS_CLEANED = 4;

    const TYPE_COMMENT = 0;
    const TYPE_CONTENT = 1;

    protected $dates = ['created_at','updated_at'];
    protected $fillable = [
        'created_at','updated_at',
        'post_id', 'user_id', 'embed',
        'id', 'id_str', 'entities',
        'text', 'truncated', 'source',
        'in_reply_to_status_id', 'in_reply_to_status_id_str',
        'in_reply_to_user_id', 'in_reply_to_user_id_str',
        'in_reply_to_screen_name', 'geo', 'coordinates',
        'place', 'contributors', 'is_quote_status',
        'retweet_count', 'favorite_count', 'favorited',
        'retweeted','lang'
    ];
}
