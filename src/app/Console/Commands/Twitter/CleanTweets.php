<?php
namespace App\Console\Commands\Twitter;

use App\Console\Commands\BaseCommand;
use App\Model\Post;
use App\Model\Thread;
use App\Model\Tweet;
use App\Model\User;
use Carbon\Carbon;
use PHPHtmlParser\Dom;
use App\Model\Author;

class CleanTweets extends BaseCommand
{
    //Esto es para evitar usar la bbdd en la restauración.
    public $systemLog = true;

    protected $signature   = 'twitter:clean-tweets';
    protected $description = 'Coge los enlaces y el texto correctamente';

    public function __construct()
    {
        parent::__construct();
    }

    public function start()
    {
        /**
        * Esto lo hemos utilizado para ir arreglando cosas sobre la marcha, le ponemos un die por seguridad
        **/
        die;
        for($i=0; $i<10; $i++){
            $tweets = Tweet::where('status','<>', Tweet::STATUS_CLEANED)->take(100)->get();
            foreach($tweets as $tweet){
                $this->line("Updating tweet ".$tweet->id_str);
                $tweet->screen_name = $this->getScreenName($tweet->embed['author_url']);
                $tweet->author_name = $tweet->embed['author_name'];
                $author = $this->getAuthor($tweet->screen_name);
                if($author){
                    $this->comment("Author ".$tweet->screen_name." found....");
                    $tweet->author_id = $author->id;
                    $tweet->author_profile_image = $author->local_profile_image;
                }
                $tweet->status = Tweet::STATUS_CLEANED;
                $tweet->save();
            }
        }
    }

    protected function getAuthor($screenName)
    {
        $author = Author::where('screen_name', $screenName)->first();
        if(!$author){
            $author = new Author();
            $author->screen_name = $screenName;
        }else{
            $this->info("Autor encontrado, actualizado el ".$author->updated_at);
            $windowTime = $author->updated_at->addMinutes(30);
            if($windowTime->gt(Carbon::now())){
                $this->comment("Usuario actualizado hace menos de media hora");
                return $author;
            }
        }
        $url = '/users/show.json';
        $this->comment("Getting $url");
        try{
            $ret = app('twitter')->get($url,[
                                'screen_name' => $screenName
                            ]);
        }catch(\Exception $e){
            $author->save();
            return $author;
        }

        $this->info("Usuario $screenName encontrado: Actualizamos el usuario.");
        $author->id = $ret->id;
        $author->updated_at = Carbon::now();
        $author->id_str = $ret->id_str;
        $author->name = $ret->name;
        $author->screen_name = $ret->screen_name;
        $author->location = $ret->location;
        $author->profile_location = $ret->profile_location;
        $author->description =  $ret->description;
        $author->url = $ret->url;
        $author->followers_count = $ret->followers_count;
        $author->friends_count = $ret->friends_count;
        $author->listed_count = $ret->listed_count;
        $author->created_at = Carbon::parse($ret->created_at);
        $author->favourites_count = $ret->favourites_count;
        $author->utc_offset = $ret->utc_offset;
        $author->lang = $ret->lang;
        $author->profile_background_color = $ret->profile_background_color;
        $author->profile_background_image_url = $ret->profile_background_image_url;
        $author->profile_background_image_url_https = $ret->profile_background_image_url_https;
        $author->profile_background_tile = $ret->profile_background_tile;
        $author->profile_image_url = $ret->profile_image_url;
        $author->profile_image_url_https = $ret->profile_image_url_https;
        if(!empty($ret->profile_banner_url)){
            $author->profile_banner_url = $ret->profile_banner_url;
        }else{
            $author->profile_banner_url = "";
        }
        $author->profile_link_color = $ret->profile_link_color;
        $author->profile_sidebar_border_color = $ret->profile_sidebar_border_color;
        $author->profile_sidebar_fill_color = $ret->profile_sidebar_fill_color;
        $author->profile_text_color = $ret->profile_text_color;
        $author->profile_use_background_image = $ret->profile_use_background_image;

        $authorPath = storage_path('app/img/authors/'.$author->id_str);
        if(!file_exists($authorPath)){
            mkdir($authorPath);
        }
        if($author->profile_background_image_url){
            $ch = curl_init($author->profile_background_image_url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            $data = curl_exec($ch);
            $mimeType = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
            $chunks = explode("/",$mimeType);
            $ext = $chunks[1];
            file_put_contents($authorPath."/profile_background_image.$ext",$data);
            $author->local_background_image = "/img/authors/$author->id_str/profile_background_image.$ext";
        }
        if($author->profile_image_url){
            $ch = curl_init($author->profile_image_url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            $data = curl_exec($ch);
            $mimeType = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
            $chunks = explode("/",$mimeType);
            $ext = $chunks[1];
            file_put_contents($authorPath."/profile_image.$ext",$data);
            $author->local_profile_image = "/img/authors/$author->id_str/profile_image.$ext";
        }
        if(!empty($author->profile_banner_url)){
            if($author->profile_banner_url){
                $ch = curl_init($author->profile_banner_url);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                $data = curl_exec($ch);
                $mimeType = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
                $chunks = explode("/",$mimeType);
                $ext = $chunks[1];
                file_put_contents($authorPath."/profile_banner.$ext",$data);
                $author->local_profile_banner = "/img/authors/$author->id_str/profile_banner.$ext";
            }
        }
        $author->save();
        return $author;
    }

    protected function getScreenName($url){
        $chunks = explode("/",$url);
        return $chunks[3];
    }
}
?>
