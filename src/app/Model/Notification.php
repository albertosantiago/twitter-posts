<?php
namespace App\Model;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Notification extends Eloquent{

    const TYPE_MENTION = 1;
    const TYPE_RECOMMENDATION = 2;

    protected $dates = ['created_at','updated_at'];
    protected $fillable = [
        'updated_at',
        'created_at',
        'type',
        'post_id',
        'user_screen_name'
    ];
}
