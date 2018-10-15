<?php namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use App\Api\SessionManager as SessionManager;
use App\Api\UserRepository as UserRepository;
use App\Api\SocialManager  as SocialManager;
use Session;
use Log;
use Validator;
use Input;
use Mongolico;
use View;
use Twitter;
use Carbon\Carbon;
use App\Model\Post;
use App\Model\PostSchema;
use App\Model\Like;
use App\Model\Tweet;
use App\Model\TweetThread;
use PHPHtmlParser\Dom;

define("PUBLISH_DEBUG", false);

class PostController extends Controller
{
    const PAGE_SIZE = 40;

    public function __construct(SessionManager $sessionManager,
                                UserRepository $userRep,
                                SocialManager $socialManager)
    {
        $this->sessionManager = $sessionManager;
        $this->socialManager  = $socialManager;
        $this->userRepository = $userRep;
    }

    public function index(Request $request)
    {
        $postQuery = Post::where(function($q){
                            $q->where('system_generated_post',false)
                                ->orWhere('system_generated_post',null);
                            return $q;
                        })
                        ->where('status', Post::STATUS_PUBLISHED);

        $filters = $request->input('filters');
        if(!empty($filters)){
            $status = (int) $filters['status'];
            if($status!=0){
                $postQuery->where('status', $status);
            }
        }

        $posts = $postQuery->orderBy('created_at','DESC')
                           ->paginate(9);

        return view('posts.index', [
            'posts' => $posts
        ]);
    }

    public function showUserPosts(Request $request)
    {
        $user = $this->sessionManager->getCurrentUser();
        if(empty($user)){
            return redirect()->back();
        }
        View::share('owner', $user);

        $postQuery = Post::where('user_id', $user->id);

        $filters = $request->input('filters');
        if(!empty($filters)){
            $status = (int) $filters['status'];
            if($status!=0){
                $postQuery->where('status', $status);
            }
        }

        $posts = $postQuery->paginate(self::PAGE_SIZE);
        return view('posts.list', [
            'posts' => $posts
        ]);
    }

    //Rendered views
    public function view(Request $request, $slug, $postId)
    {
        $currentUser = $this->sessionManager->getCurrentUser();
        $post = Post::find($postId);

        if(empty($post)){
            return redirect("/404");
        }
        if($currentUser->id != $post->user_id){
            if($post->system_adult_rev){
                if(!$this->sessionManager->getUserPreference('show_adult_content')){
                    $url = url()->current();
                    if(!$this->sessionManager->haveAdultConsent($url)){
                        $url = urlencode($url);
                        return redirect("/adult/consent?url=$url");
                    }
                }
            }
        }
        //Comprobamos que esta en estado publicado o que es el dueño.
        if($post->status!=Post::STATUS_PUBLISHED){
            if($post->user_id!=$currentUser->id){
                return redirect("/404");
            }
        }
        //Vemos si tiene publicidad.
        $haveAds = false;
        if($post->system_ads_approved){
            $haveAds = true;
        }
        //Habilitamos si lo estan los comentarios.
        $isOpenComments = false;
        if($post->comments_status){
            $isOpenComments = true;
        }

        $userColl = Mongolico::getCollection('users');
        $postUser = $this->userRepository->getUser($post->user_id, false);
        if(empty($postUser)){
            return redirect("/404");
        }
        $postUser->isGuest = false;
        View::share('owner', $postUser);
        $this->configurePostMetas($post, $postUser);

        $post->last_view = Carbon::now();
        $post->active = true;
        $post->save();

        $tweetThread = TweetThread::where('post_id', $post->id)->first();

        $url = '%'.env('APP_URL').'/posts/view/'.$post->slug."/".$post->id;
        $reactions = Post::where('in_reply_to', 'like', $url)
                        ->where('status',Post::STATUS_PUBLISHED)
                        ->take(5)->orderBy('updated_at','desc')->get();

        return view('posts.single',[
            'post'        => new PostSchema($post),
            'tweetThread' => $tweetThread,
            'reactions'   => $reactions,
            'haveAds'     => $haveAds,
            'isOpenComments' => $isOpenComments
        ]);
    }

    public function create(Request $request)
    {
        $inReplyTo = $request->input('in_reply_to');
        if(!empty($inReplyTo)){
            $post = Post::find($inReplyTo);
            if(!empty($post)){
                $inReplyTo = $post->createURL();
            }
        }
        $post = (object) [
            'title'   => '',
            'content' => '',
            'tags'    => '',
            '_id'     => '',
            'slug'    => '',
            'adult_content'   => false,
            'comments_status' => true,
            'in_reply_to'     => $inReplyTo
        ];
        return $this->showForm($post);
    }

    public function edit($postId)
    {
        $user = $this->sessionManager->getCurrentUser();
        if(empty($user)){
            return redirect()->back();
        }
        $post = Post::find($postId);
        if($post->user_id != $user->id){
            return $this->forbidden();
        }
        return $this->showForm(new PostSchema($post));
    }

    //Data functions.
    public function remove(Request $request)
    {
        $user   = $this->sessionManager->getCurrentUser();
        $postId = $request->get('post_id');

        if(empty($postId)){
            return redirect()->back();
        }

        $post = Post::find($postId);
        if($post == null){
            return redirect()->back();
        }
        if($post->user_id != $user->id){
            return redirect()->back();
        }

        Tweet::where('post_id', $post->id)->delete();
        TweetThread::where('post_id', $post->id)->delete();
        $ret = $post->delete();

        return redirect()->route('posts.list');
    }

    public function store(Request $request)
    {
        $user = $this->sessionManager->getCurrentUser();
        if(empty($user)){
            return redirect()->back();
        }
        $this->validate($request, [
            'title' => 'required|max:100',
            'tags'  => 'required|max:200',
            'content' => 'required:max:2500',
            'in_reply_to' => 'nullable|present|url',
            'featured_img' => 'nullable|url'
        ]);

        $title = strip_tags($request->input('title'));
        $slug = $this->createSlug($title);
        $mention_notifications_status = ($request->input('mention_notifications_status') == 'false') ? false:true;
        $comments_status = ($request->input('comments_status') == 'false') ? false:true;
        $adultContent    = ($request->input('adult_content') == 'false') ? false:true;
        $in_reply_to     = $request->input('in_reply_to');
        $content  = $this->processContent($request->input('content'));
        $excerpt  = $this->createExcerpt($content);
        $shortDesc   = $this->createShortDesc($content);
        $featuredImg = $request->input('featured_img');
        $mentions    = $this->extractMentions($title." ".$content);
        $this->saveTweets($content);

        $postId  = $request->input('id');
        $postData = [
            'user_id'   => $user->id,
            'user_name' => $user->name,
            'user_screen_name' => $user->screen_name,
            'user_profile_image_url'     => $user->profile_image_url,
            'user_profile_image_url_https' => $user->profile_image_url_https,
            'slug'    => $slug,
            'title'   => $title,
            'content' => $content,
            'tags'    => $request->input('tags'),
            'adult_content'   => $adultContent,
            'comments_status' => $comments_status,
            'mention_notifications_status' => $mention_notifications_status,
            'in_reply_to'     => $in_reply_to,
            'excerpt' => $excerpt,
            'mentions' => $mentions,
            'featured_img' => $featuredImg,
            'short_desc' => $shortDesc,
            'updated_at' => Carbon::now(),
            'modified_at' => Carbon::now(),
            'featured_img' => $featuredImg,
            'system_pending_rev' => true,
            'system_mentions_done' => false,
            'system_publish_processed' => false,
            'system_last_syncro'   => Carbon::now()
        ];
        if($adultContent){
            $postData['system_adult_rev'] = true;
            $postData['system_ads_approved'] = false;
        }
        if(!empty($postId)){
            $post = Post::find($postId);
            if($post->user_id !== $user->id){
                return $this->forbidden();
            }
            $post->fill($postData);
            $post->save();
        }else{
            $postData['created_at'] = Carbon::now();
            $postData['status']     = Post::STATUS_DRAFT;
            $postData['status_str'] = 'draft';
            $postData['published_at'] = null;
            $postData['tweet']        = null;
            $postData['tweet_id']     = null;
            $postData['system_rate']  = null;
            $postData['system_adult_rev']    = false;
            $postData['system_ads_approved'] = false;
            $postData['system_mentions_sended'] = 0;
            $post = Post::create($postData);
            $post->save();
        }
        $user->isEditor = true;
        $user->save();
        return response()->json(['type' => 'post', 'id'=> $post->id, 'status' => 200, 'data' => new PostSchema($post)] , 200);
    }

    public function publish(Request $request)
    {
        try{
            $user = $this->sessionManager->getCurrentUser();
            if(empty($user)){
                return $this->forbidden();
            }

            if($user->protected){
                throw new \Exception("You have a twitter protected account. You have to unprotect your tweets and login again in twitter-posts in order to publish.", 1001);
            }

            $status = $request->input('status');
            $postId = $request->input('id');
            $post   = Post::find($postId);

            if($post->user_id !== $user->id){
                return $this->forbidden();
            }

            if(!$this->checkPublishTweet($status, $post)){
                return $this->badRequest();
            }
            $ret = app('twitter')->postTweet(['status' => $status, 'format' => 'json']);
            $ret = json_decode($ret);
            $ret->created_at = Carbon::now();
            $ret->updated_at = Carbon::now();
            $embed = $this->socialManager->getCleanOembed($user->screen_name,
                                                    $ret->id);
            $ret->embed   = $embed;
            $tweet = Tweet::create((array)$ret);
            $tweet->post_id   = $postId;
            $tweet->processed = true;
            $tweet->post_root = true;
            $tweet->save();

            $post->status     = Post::STATUS_PUBLISHED;
            $post->status_str = 'published';
            $post->tweet_id     = $tweet->id;
            $post->tweet_id_str = (string)$tweet->id;
            $post->tweet()->associate($tweet);
            $post->published_at = Carbon::now();
            //Esto es el hilo de comentarios.
            $tweetThread = new TweetThread();
            $tweetThread->tweet_id = $tweet->id;
            $tweetThread->post_id  = $post->id;
            $tweetThread->user_id  = $user->id;
            $tweetThread->created_at = Carbon::now();
            $tweetThread->updated_at = Carbon::now();
            $tweetThread->save();
            $tweetThread->tweet()->associate($tweet);
            $tweetThread->save();
            //Ponemos al usuario como editor.
            $this->userRepository->updateUser($user->id, [
                'editor' => true
            ]);
            //Salvamos y palante.
            $ret = $post->save();
            return response()->json(['type' => 'tweet', 'id'=> $tweet->id, 'status' => 200, 'data' => $tweet] , 200);
        }catch(\Exception $e){
            $this->reportError($e, 'web:post:publish');
            return response()->json(['type' => 'error', 'message'=> $e->getMessage(), 'status' => 500] , 500);
        }
    }

    public function unPublish(Request $request)
    {
        $user = $this->sessionManager->getCurrentUser();
        if(empty($user)){
            return $this->forbidden();
        }
        $postId = $request->input('id');
        $post   = Post::find($postId);

        if($post->user_id !== $user->id){
            return $this->forbidden();
        }
        $post->status   = Post::STATUS_DRAFT;
        $post->status_str = 'draft';
        $post->tweet = null;
        $post->tweet_id = null;
        $post->tweet_id_str = null;
        $post->save();

        Tweet::where('post_id', $post->id)->delete();
        TweetThread::where('post_id', $post->id)->delete();

        return response()->json([
                'type' => 'success',
                'message'=> 'The post was unpublished',
                'status' => 200
            ] , 200);
    }

    //PROTECTED FUNCTIONS.
    protected function showForm($post)
    {
        $this->configureEditorMetas();
        return view('posts.form', [
            'post'=>$post
        ]);
    }
    //META CONFIGURATIONS
    protected function configurePostMetas($post, $owner)
    {
        $metaCreator = app('metaCreator');
        $metaCreator->set('title', $post->title);
        $metaCreator->setMeta('author', $owner->name);
        $metaCreator->setMeta('og:type', 'article');
        $metaCreator->setLink('author', 'https://twitter-posts.com/@'.$owner->screen_name);
        $metaCreator->setMeta('article:published_time', $post->updated_at->toAtomString());
        $metaCreator->setMeta('description', $post->short_desc);
        $tags = explode("#", $post->tags);
        $tags = trim(implode(" ", $tags));
        $metaCreator->setMeta('article:tag', $tags);
        $dummyParam = "?flash=".time();
        if(empty($post->featured_img)){
            $metaCreator->setMeta('twitter:card', 'summary');
            if(!empty($post->author_profile_image)){
                $metaCreator->setMeta('twitter:image', 'https://twitter-posts.com/'.$post->author_profile_image.$dummyParam);
            }
        }else{
            $metaCreator->setMeta('twitter:card', 'summary_large_image');
            $metaCreator->setMeta('twitter:image', $post->featured_img.$dummyParam);
        }
    }

    protected function configureEditorMetas()
    {
        $metaCreator = app('metaCreator');
        $metaCreator->set('title', "Twitter Posts - Editor - Create Rich Posts integrated with Twitter");
        $metaCreator->setMeta('author', 'Twitter Posts');
        $metaCreator->setMeta('og:type', 'website');
        $metaCreator->setLink('author', null );
        $metaCreator->setMeta('article:published_time', null);
        $metaCreator->setMeta('description', 'Rich text editor to create wonderful posts integrated with Twitter.');
        $metaCreator->setMeta('twitter:card', 'summary');
        $metaCreator->setMeta('article:tag', null);
    }

    protected function processContent($content)
    {
        $content = app('htmlPurifier')->purify($content);
        $tidy = new \tidy();
        $tidy->parseString($content ,[
            'show-body-only' => true,
            'new-blocklevel-tags' => 'twp-post-img,twp-gallery,twp-data,twp-tweet,twp-tweet-thread',
            'new-inline-tags' => 'twp-post-mention,twp-post-link'
        ],
        'utf8');
        $tidy->cleanRepair();
        return $tidy->value;
    }

    protected function extractMentions($text)
    {
        //Las pueden poner como texto
        /**
        $matches = [];
        preg_match_all("/(@[A-Za-z0-9_]*)/", $text, $matches);
        $mentions = array_unique($matches[0]);
        **/
        $mentions = [];
        $dom = new Dom();
        $dom->load($text);
        $mentionTags = $dom->find("twp-post-mention");
        foreach($mentionTags as $mentionTag){
            $mentionStr = $mentionTag->getAttribute('data-screen-name');
            if($mentionStr[0]!=='@'){
                $mentionStr = "@".$mentionStr;
            }
            $mentions[] = $mentionStr;
        }
        return array_unique($mentions);
    }

    protected function saveTweets($text)
    {
        $tweets = [];
        $dom = new Dom();
        $dom->load($text);
        $tweetTags = $dom->find("twp-tweet");
        foreach($tweetTags as $tweetTag){
            $tweetId = $tweetTag->getAttribute('id');
            $tweetScreenName = $tweetTag->getAttribute('data-screen-name');
            $tweets[] = [
                'id'=> $tweetId,
                'user_screen_name'=> $tweetScreenName,
            ];
        }
        if(sizeof($tweets)>0){
            foreach($tweets as $tweet){
                $ret = Tweet::where('id_str', $tweet['id'])->count();
                if($ret==0){
                    $ret   = $this->socialManager->getTweetInfo($tweet['id']);
                    $embed = $this->socialManager->getCleanOembed($tweet['user_screen_name'],
                                                                  $tweet['id']);
                    $ret->embed = $embed;
                    $ret->created_at = Carbon::parse($ret->created_at);
                    $tweet = Tweet::create((array)$ret);
                    $tweet->type = Tweet::TYPE_CONTENT;
                    $tweet->post_root = false;
                    $tweet->status = Tweet::STATUS_PENDING;
                    $tweet->with_backup = true;
                    $tweet->img_backup  = '';
                    $tweet->save();
                }
            }
        }
    }

    protected function createSlug($base)
    {
        $base = preg_replace("/[^A-Za-z0-9 ]/", '', strtolower(trim($base)));
        $base = str_replace(" ", "_", $base);
        $originales = 'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûýýþÿ';
        $modificadas = 'aaaaaaaceeeeiiiidnoooooouuuuybsaaaaaaaceeeeiiiidnoooooouuuyyby';
        $base  = utf8_decode($base);
        $base  = strtr($base, utf8_decode($originales), $modificadas);
        if(strlen($base)>60){
            $base = mb_substr($base,0,60,'UTF-8');
        }
        return urlencode(utf8_encode($base));
    }

    protected function createExcerpt($content)
    {
        if(strlen($content) < 403){
            return $content;
        }
        $tmpExcerpt = $this->cleanMedia($content);
        $tmpExcerpt = $this->cleanBreaks($tmpExcerpt);

        $dom = new Dom();
        $dom->load($tmpExcerpt);
        $paragraphs = $dom->find("p");
        $cont = 0;
        $excerpt = '';
        foreach($paragraphs as $p){
            $excerpt .= $p;
            $cont++;
            if($cont > 2){
                break;
            }
        }
        if(strlen($excerpt)>400){
            $excerpt = mb_substr($excerpt,0,400,'UTF-8');
            $excerpt .= "...";
        }

        $tidy = new \tidy();
        $tidy->parseString($excerpt ,[
                'show-body-only' => true
            ],
        'utf8');

        $tidy->cleanRepair();
        $intro = $tidy->value;
        return $intro;
    }

    protected function createShortDesc($content)
    {
        $content = $this->cleanMedia($content);
        if(strlen($content) < 160){
            return strip_tags($content);
        }
        $shortDesc = strip_tags($content);
        $shortDesc = mb_substr($shortDesc,0, 157,'UTF-8');
        $shortDesc .= "...";
        return trim($shortDesc);
    }

    protected function cleanMedia($content)
    {
        $dom = new Dom();
        $dom->load($content);
        $divs = $dom->find("div");
        foreach($divs as $div){
            if($div->getAttribute('class')=='tweet'){
                $div->delete();
            }
        }
        $iframes = $dom->find("iframe");
        foreach($iframes as $iframe){
            $iframe->delete();
        }
        $twpImgs = $dom->find("twp-post-img");
        foreach($twpImgs as $twpImg){
            $twpImg->delete();
        }
        $imgs = $dom->find("img");
        foreach($imgs as $img){
            $img->delete();
        }
        $wrappers = $dom->find("div.twp-post-img-wrapper");
        foreach($wrappers as $wrapper){
            $wrapper->delete();
        }
        $content = (string) $dom;
        return $content;
    }

    protected function cleanBreaks($content)
    {
        $dom = new Dom();
        $dom->load($content);
        $breaks = $dom->find("br");
        foreach($breaks as $br){
            $br->delete();
        }
        $paragraphs = $dom->find("p");
        foreach($paragraphs as $p){
            if(empty(trim($p->text))){
                $p->delete();
            }
            if(trim($p->text)=='&nbsp;'){
                $p->delete();
            }
            if(trim($p->text)=='&#160;'){
                $p->delete();
            }
        }
        $content = (string) $dom;
        return $content;
    }

    protected function checkPublishTweet($status, $post)
    {
        if(PUBLISH_DEBUG){
            return true;
        }
        $postUrl = $post->createURL();
        if(strpos($status, $postUrl)===false){
            return false;
        }
        return true;
    }
}
