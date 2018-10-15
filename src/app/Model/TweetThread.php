<?php
namespace App\Model;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class TweetThread extends Eloquent {

    protected $dates = ['created_at','updated_at'];
    protected $fillable = [
        'created_at','updated_at',
        'post_id', 'user_id', 'tweet'
    ];

    public function replies()
    {
       return $this->embedsMany('App\Model\TweetThread');
    }

    public function tweet()
    {
       return $this->embedsOne('App\Model\Tweet');
    }
}
