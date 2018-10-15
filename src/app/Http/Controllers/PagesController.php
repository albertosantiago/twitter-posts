<?php namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use App\Api\SocialManager as SocialManager;
use Session;
use Log;
use Validator;
use Input;
use Mongolico;
use View;
use Twitter;
use Carbon\Carbon;


class PagesController extends Controller
{
    public function view($templateName)
    {
        if(!file_exists(resource_path("views/desktop/pages/$templateName.blade.php"))){
            return redirect('pages/404');
        }
        $this->configureMetas($templateName);
        return view('pages.'.$templateName);
    }

    protected function configureMetas($page)
    {
        $metaCreator = app('metaCreator');
        if($page=='terms'){
            $metaCreator->set('title','Twitter-Posts Terms of Service – Twitter-Posts Policy');
            $metaCreator->setMeta('description','Service Terms of Twitter Posts site');
        }else{
            $metaCreator->set('title','Twitter-Posts Privacy policy  – Twitter-Posts Policy');
            $metaCreator->setMeta('description','Privacy policy of Twitter Posts site');
        }
    }
}
