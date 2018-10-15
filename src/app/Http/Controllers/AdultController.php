<?php namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use App\Api\SessionManager as SessionManager;
use Session;
use Log;
use Validator;
use Input;
use Mongolico;
use View;
use Twitter;
use Carbon\Carbon;


class AdultController extends Controller
{
    public function __construct(SessionManager $sessionManager)
    {
        $this->sessionManager = $sessionManager;
    }

    public function consent(Request $request)
    {
        $url = $request->input('url');
        if ($request->isMethod('post')) {
            $showAdultContent = $request->input('dont_show_me_again');
            if($showAdultContent){
                $this->sessionManager->setUserPreference('show_adult_content', true);
            }else{
                $this->sessionManager->setAdultConsent($url);
            }
            return redirect($url);
        }
        $this->configureMetas();
        return view('adult.consent',[
            'url' => $url
        ]);
    }

    protected function configureMetas()
    {
        $metaCreator = app('metaCreator');
        $metaCreator->set('title','Twitter-Posts - Adult Content Warning');
        $metaCreator->setMeta('description', 'Page for adult content viewing consent.');
    }
}
