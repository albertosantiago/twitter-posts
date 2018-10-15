<?php
namespace App\Model;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Upload extends Eloquent{
    protected $dates = ['created_at'];
    protected $fillable = ['created_at','user_id'];
}
