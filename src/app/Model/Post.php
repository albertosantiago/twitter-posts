<?php
namespace App\Model;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Post extends Eloquent{

    const STATUS_PUBLISHED =  2;
    const STATUS_DRAFT     =  1;

    protected $dates = [
        'created_at',
        'updated_at',
        'modified_at',
        'published_at',
        'system_last_syncro'
    ];

    protected $fillable = [
        'user_id', 'user_screen_name','slug',
        'title','content','tags','excerpt',
        'updated_at','created_at','published_at','modified_at',
        'tweet','tweet_id','short_desc','adult_content',
        'comments_status', 'in_reply_to', 'adult_content_rev',
        'user_profile_image_url','user_profile_image_url_https',
        'user_name','system_adult_rev','system_pending_rev',
        'status','status_str','featured_img', 'mentions',
        'system_mentions_done','system_mentions_sended','system_last_syncro',
        'mention_notifications_status'
    ];

    public function tweet()
    {
       return $this->embedsOne('App\Model\Tweet');
    }

    public function createURL()
    {
        return env('APP_URL')."/es/articulos/ver/".$this->slug."/".$this->id;
    }

    public function __toString(){}
}
