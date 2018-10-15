<?php
namespace App\Model;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Like extends Eloquent{
    protected $dates = ['created_at'];
    protected $fillable = ['created_at','post_id'];
}
