<?php
namespace App\Console\Commands\Twitter;

use App\Console\Commands\BaseCommand;
use App\Model\Thread;
use App\Model\Author;
use App\Model\User;
use Carbon\Carbon;

class UpdateThreadAuthors extends BaseCommand
{
    //Esto es para evitar usar la bbdd en la restauración.
    public $systemLog = true;

    protected $signature   = 'twitter:update-authors
                                    {--search}
                                    {--update}';
    protected $description = 'Descarga información sobre los autores de los hilos';

    public function __construct()
    {
        $appUser = User::where('system_user', true)->first();
        $requestToken = [
            'token'  => $appUser['access_token']['oauth_token'],
            'secret' => $appUser['access_token']['oauth_token_secret']
        ];
        app('twitter')->reconfig($requestToken);
        parent::__construct();
    }

    public function start()
    {
        $search = $this->option('search');
        if(!empty($search)){
            $this->info("Searching for new thread authors...");
            $this->updateThreadAuthors();
        }
        $update = (int) $this->option('update');
        if(!empty($update)){
            $this->info("Updating Authors....");
            $this->updateAllAuthors();
        }
    }

    public function updateAllAuthors()
    {
        $authors = Author::all();
        foreach($authors as $author){
            $this->updateAuthor($author);
            sleep(1);
        }
    }

    protected function updateThreadAuthors()
    {
        $authors = [];
        $results = Thread::raw(function($collection) {
            return $collection->aggregate([
                ['$group' => [
                    '_id' => [
                        'screen_name' => '$screen_name',
                    ],
                    'count' => [
                        '$sum' => 1
                    ]
                ]],[
                    '$match' => [
                        'count' => ['$gt' => 1 ]
                ]]
            ]);
        })->where('count','>', 0);
        foreach($results as $result){
            $authors[] = $result->id->screen_name;
        }
        foreach($authors as $screenName){
            $author = Author::where('screen_name',$screenName)->first();
            if(empty($author)){
                $this->comment("New author $screenName found, updating....");
                $author = new Author();
                $author->screen_name = $screenName;
                $this->updateAuthor($author);
            }
        }
    }

    protected function updateAuthor($author)
    {
        $screenName = $author->screen_name;
        $url = '/users/show.json';
        $this->comment("Getting $url for $author->screen_name");
        try{
            $ret = app('twitter')->get($url,[
                                'screen_name' => $author->screen_name
                            ]);
        }catch(\Exception $e){
            $this->line("Usuario eliminado...");
            $author->save();
            return $author;
        }
        if($ret==null){
            $this->line("Bad result found....");
            $author->save();
            return $author;
        }
        $this->info("Usuario $screenName encontrado: Actualizamos el usuario. (ID:$author->id_str)");
        $author->id = $ret->id;
        $author->id_str = $ret->id_str;
        $author->name = $ret->name;
        $author->updated_at = Carbon::now();
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
        if($author->profile_image_url){
            $bigImg = str_replace('_normal','',$author->profile_image_url);
            if($bigImg!=$author->profile_image_url){
                $ch = curl_init($bigImg);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                $data = curl_exec($ch);
                $mimeType = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
                $chunks = explode("/",$mimeType);
                $ext = $chunks[1];
                file_put_contents($authorPath."/profile_image_big.$ext",$data);
                $author->local_big_profile_image = "/img/authors/$author->id_str/profile_image_big.$ext";
            }else{
                $author->local_big_profile_image = $author->local_profile_image;
            }
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
}
?>
