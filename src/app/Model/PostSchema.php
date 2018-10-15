<?php
namespace App\Model;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class PostSchema{

    public function __construct($post){
        $this->_id = $post->_id;
        $this->id = $post->id;
        $this->featured_img = $post->featured_img;
        $this->slug = $post->slug;
        $this->title = $post->title;
        $this->content = $post->content;
        $this->tags  = $post->tags;
        $this->status  = $post->status;
        $this->status_str  = $post->status_str;
        $this->excerpt     = $post->excerpt;
        $this->updated_at = $post->updated_at;
        $this->modified_at = $post->modified_at;
        $this->created_at = $post->created_at;
        $this->published_at = $post->published_at;
        $this->tweet = $post->tweet;
        $this->tweet_id = $post->tweet_id;
        $this->tweet_id_str = $post->tweet_id_str;
        $this->short_desc = $post->short_desc;
        $this->adult_content = $post->adult_content;
        $this->comments_status = $post->comments_status;
        $this->mention_notifications_status = $post->mention_notifications_status;
        $this->in_reply_to = $post->in_reply_to;
        $this->user_name = $post->user_name;
        $this->user_screen_name = $post->user_screen_name;
        $this->user_profile_image_url = $post->user_profile_image_url;
        $this->user_profile_image_url_https = $post->user_profile_image_url_https;
    }
}
