<?php
namespace App\Model;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Thread extends Eloquent {

    const STATUS_PENDING = 1;
    const STATUS_DONE    = 2;
    const STATUS_PUBLISHED = 3;

    protected $dates = ['created_at','updated_at'];
    protected $fillable = [
        'created_at','updated_at',
        'url','screen_name', 'status'
    ];
}
