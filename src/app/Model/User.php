<?php
namespace App\Model;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class User extends Eloquent{
    protected $dates = ['created_at','updated_at','first_enter_at'];
    protected $fillable = [];

    public function likes()
    {
        return $this->embedsMany('App\Model\Like');
    }

    public function preferences()
    {
        return $this->embedsOne('App\Model\UserPreference');
    }
}
