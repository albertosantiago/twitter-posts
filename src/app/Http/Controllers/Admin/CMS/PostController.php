<?php
namespace App\Http\Controllers\Admin\CMS;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Model\Post;
use Datatables;
use DB;
use Session;

class PostController extends Controller
{
    const PUBLISHER_PAGE = 20;

    public function index(Request $request)
    {
        $query = Post::query();

        $filters = $request->input('filters');
        if(!empty($filters)){
            if($filters['system_pending_rev']==1){
                $query->where('system_pending_rev', true);
            }
            if($filters['system_pending_rev']==0){
                $query->where('system_pending_rev', false);
            }
            if($filters['system_ads_approved']==1){
                $query->where('system_ads_approved', true);
            }
            if($filters['system_ads_approved']==0){
                $query->where('system_ads_approved', false);
            }
            if($filters['system_adult_rev']==1){
                $query->where('system_adult_rev', true);
            }
            if($filters['system_adult_rev']==0){
                $query->where(function($q){
                    $q->where('system_adult_rev', false);
                    $q->orWhere('system_adult_rev', null);
                });
            }
            if($filters['system_generated_post']==1){
                $query->where('system_generated_post', true);
            }
            if($filters['system_generated_post']==0){
                $query->where('system_generated_post','<>',true);
            }
        }
        if(empty($filters)){
            $query->where('system_generated_post','<>', true);
        }
        if(!empty($request->sort)){
            $query->orderBy($request->sort, $request->dir);
        }else{
            $query->orderBy('updated_at','DESC');
        }
        $posts = $query->paginate(self::PUBLISHER_PAGE);

        return view('admin/cms/posts', [
            'posts' => $posts,
        ]);
    }

    public function view($postId)
    {
        $post = Post::find($postId);
        return view('admin/cms/post', [
            'post' => $post,
        ]);
    }

    public function store(Request $request)
    {
        $postId = $request->post_id;
        $post   = Post::find($postId);
        $post->system_adult_rev    = (boolean) $request->input('system_adult_rev');
        $post->system_ads_approved = (boolean) $request->input('system_ads_approved');
        $post->system_pending_rev = false;
        $post->save();
        return redirect()->back();
    }

    public function systemConfigure(Request $request)
    {
        $postId = $request->post_id;
        $post   = Post::find($postId);
        $post->system_priority = (integer)$request->input('system_priority');
        $post->save();
        return redirect()->back();
    }

}
