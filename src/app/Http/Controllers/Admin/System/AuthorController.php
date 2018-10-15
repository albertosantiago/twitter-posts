<?php
namespace App\Http\Controllers\Admin\System;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Model\Author;
use DB;
use Session;
use Carbon\Carbon;

class AuthorController extends Controller
{
    const PUBLISHER_PAGE = 20;

    public function index(Request $request)
    {
        $query = Author::query();

        $filters = $request->input('filters');
        if(!empty($filters)){
            if(!empty($filters['screen_name'])){
                $query->where('screen_name','like', "%".$filters['screen_name']."%");
            }
        }
        if(!empty($request->sort)){
            $query->orderBy($request->sort, $request->dir);
        }else{
            $query->orderBy('updated_at','DESC');
        }

        $authors = $query->paginate(self::PUBLISHER_PAGE);

        return view('admin/system/authors', [
            'authors' => $authors,
            'filters' => $filters,
        ]);
    }

    public function store(Request $request)
    {
        $url = trim($request->url);
        $screenName = $this->getScreenName($url);
        $this->updateAuthorByScreenName($screenName);
        return redirect()->back();
    }

    public function updateAuthor(Request $request)
    {
        $screenName = $request->screenName;
        $this->updateAuthorByScreenName($screenName);
        return redirect()->back();
    }

    protected function updateAuthorByScreenName($screenName)
    {
        $author = Author::where('screen_name',$screenName)->first();
        if(empty($author)){
            $author = new Author();
            $author->screen_name = $screenName;
        }
        $url = '/users/show.json';
        try{
            $ret = app('twitter')->get($url,[
                                'screen_name' => $screenName
                            ]);
        }catch(\Exception $e){
            $author->save();
            return $author;
        }
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
