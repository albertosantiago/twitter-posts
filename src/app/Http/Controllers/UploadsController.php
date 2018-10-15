<?php namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use App\Api\SessionManager as SessionManager;
use App\Model\Upload;
use Session;
use Log;
use Validator;
use Input;
use View;

class UploadsController extends Controller
{
    public function __construct(SessionManager $sessionManager){
        $this->sessionManager = $sessionManager;
    }

    public function upload(Request $request)
    {
        $user = $this->sessionManager->getCurrentUser();
        if(empty($user->id)){
            return $this->forbidden();
        }

        $path = storage_path("/app/img/users");

        if ($request->hasFile('img')) {
            $file     = $request->file('img');
            $mimeType = $file->getMimeType();
            $fileSize = $file->getClientSize();

            $fileName = explode('.',$file->getClientOriginalName());
            $fileName = md5($fileName[0]).".".$fileName[1];
            $fileName = $user->id."_".$fileName;
            $finalName = $path.$fileName;
            if(file_exists($finalName)){
                unlink($finalName);
            }
            $file->move($path, $fileName);
            //Para que se refresque la cache.
            $imgURL = "/img/users/$fileName";

            $upload = new Upload();
            $upload->type = 'img';
            $upload->mimeType = $mimeType;
            $upload->user_id = $user->id;
            $upload->src  = $imgURL;
            $upload->size = $fileSize;
            $ret = $upload->save();

            app('jobManager')->dispatchThumbsJob($upload);

            $img = $upload;
            $img['_id'] = (string)$upload->_id;
            return response()->json(['data'=> $img, 'status' => 200], 200);
        }
        return $this->badRequest();
    }

    public function index()
    {
        $user = $this->sessionManager->getCurrentUser();
        if(empty($user->id)){
            return $this->forbidden();
        }
        $cursor = Upload::where('user_id', $user->id)->get();
        $uploads = [];
        foreach ($cursor as $document) {
            $document['_id'] = (string) $document['_id'];
            $document['src'] = $document['src']."?cacheBreaker=".time();
            $uploads[] = $document;
        }
        return response()->json(['data'=> $uploads, 'status' => 200], 200);
    }

    public function remove($id)
    {
        $user = $this->sessionManager->getCurrentUser();
        if(empty($user->id)){
            return $this->forbidden();
        }
        $item = Upload::find($id);
        if($item == null){
            return $this->badRequest();
        }
        if($item->user_id != $user->id){
            return $this->badRequest();
        }
        $ret = $item->delete();
        return response()->json(['type'=>'message','data' => 'success', 'status' => 200], 200);
    }
}
