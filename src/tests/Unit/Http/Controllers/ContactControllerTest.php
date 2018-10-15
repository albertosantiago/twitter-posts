<?php
namespace Tests\Api;

use Tests\TestCase;
use Illuminate\Http\Request;
use \Mockery as m;
use PHPHtmlParser\Dom;
use Carbon\Carbon;

use App\Http\Controllers\ContactController as ContactController;
use View;

class ContactControllerTest extends TestCase
{
    protected function setup()
    {
        parent::setup();
    }

    public function testShowContactForm()
    {
        //Setup
        $dom = new Dom();
        $errors = new \Illuminate\Support\ViewErrorBag();
        View::share('errors', $errors);
        $session = m::mock('Symfony\Component\HttpFoundation\Session\SessionInterface');
        $session->shouldReceive('get')->times(3)->andReturn(true);
        $session->shouldReceive('has')->with('message-success')->once()->andReturn(false);
        $session->shouldReceive('token')->times(2)->andReturn('ESTO_ES_UN_CSRF_TOKEN');
        $request = m::mock('Illuminate\Http\Request');
        $request->shouldReceive('old')->times(3)->andReturn(null);
        $request->shouldReceive('fullUrl')->times(1)->andReturn('https://twitter-posts.com/contact');
        $request->shouldReceive('ip')->times(1)->andReturn('88.12.12.122');
        $contactController = $this->prepareContact($session, $request);
        //Test
        $ret = $contactController->showContactForm($request)->render();
        $dom->load($ret);
        $title = $dom->find('h1.brand')[0]->text();
        $errorDiv = $dom->find('div.error ul.list')->count();
        $this->assertEquals($errorDiv, 0);
    }

    public function testShowSuccess()
    {
        //Setup
        $dom = new Dom();
        $errors = new \Illuminate\Support\ViewErrorBag();
        View::share('errors', $errors);
        $session = m::mock('Symfony\Component\HttpFoundation\Session\SessionInterface');
        $session->shouldReceive('get')->times(3)->andReturn(true);
        $session->shouldReceive('has')->with('message-success')->once()->andReturn(true);
        $session->shouldReceive('token')->times(1)->andReturn('ESTO_ES_UN_CSRF_TOKEN');
        $request = m::mock('Illuminate\Http\Request');
        $request->shouldReceive('fullUrl')->times(1)->andReturn('https://twitter-posts.com/contact');
        $request->shouldReceive('ip')->times(1)->andReturn('88.12.12.122');
        $contactController = $this->prepareContact($session, $request);
        //Test
        $ret = $contactController->showContactForm($request)->render();
        $dom->load($ret);
        $title = $dom->find('h1.brand')[0]->text();
        $errorDiv = $dom->find('div.error ul.list')->count();
        $this->assertEquals($errorDiv, 0);
        $successDiv = $dom->find('div.success')->count();
        $this->assertEquals($successDiv, 1);
    }

    public function testPreviousMessage()
    {
        //Setup
        $dom = new Dom();
        $errors = new \Illuminate\Support\ViewErrorBag();
        View::share('errors', $errors);
        $contactMessage = new \App\Model\ContactMessage();
        $contactMessage->name = 'Chucho Garcia';
        $contactMessage->mail       = 'chucho@wetdog.co';
        $contactMessage->message    = 'Eres un carapolla';
        $contactMessage->ip         = '88.12.12.122';
        $contactMessage->created_at = Carbon::now();
        $ret = $contactMessage->save();
        $session = m::mock('Symfony\Component\HttpFoundation\Session\SessionInterface');
        $session->shouldReceive('get')->times(3)->andReturn(true);
        $session->shouldReceive('has')->with('message-success')->once()->andReturn(false);
        $session->shouldReceive('token')->times(1)->andReturn('ESTO_ES_UN_CSRF_TOKEN');
        $request = m::mock('Illuminate\Http\Request');
        $request->shouldReceive('fullUrl')->times(1)->andReturn('https://twitter-posts.com/contact');
        $request->shouldReceive('ip')->times(1)->andReturn('88.12.12.122');
        $contactController = $this->prepareContact($session, $request);
        //Test
        $ret = $contactController->showContactForm($request)->render();
        $dom->load($ret);
        $title = $dom->find('h1.brand')[0]->text();
        $errorDiv = $dom->find('div.error ul.list')->count();
        $this->assertEquals($errorDiv, 0);
        $successDiv = $dom->find('div.success')->count();
        $this->assertEquals($successDiv, 1);
    }

    public function testShowContactErrors()
    {
        //Setup
        $dom = new Dom();
        $errors = new \Illuminate\Support\ViewErrorBag();
        $bag = $errors->getBag('default');
        $bag->add('carapolla-error-found','No puedes enviar mensajes porque eres un carapolla');
        $errors->put('default',$bag);
        View::share('errors', $errors);
        $session = m::mock('Symfony\Component\HttpFoundation\Session\SessionInterface');
        $session->shouldReceive('get')->times(3)->andReturn(true);
        $session->shouldReceive('has')->with('message-success')->once()->andReturn(false);
        $session->shouldReceive('token')->times(2)->andReturn('ESTO_ES_UN_CSRF_TOKEN');
        $request = m::mock('Illuminate\Http\Request');
        $request->shouldReceive('old')->times(3)->andReturn(null);
        $request->shouldReceive('fullUrl')->times(1)->andReturn('https://twitter-posts.com/contact');
        $request->shouldReceive('ip')->times(1)->andReturn('88.12.12.122');
        $contactController = $this->prepareContact($session, $request);
        //Test
        $ret = $contactController->showContactForm($request)->render();
        $dom->load($ret);
        $title = $dom->find('h1.brand')[0]->text();
        $errorDiv = $dom->find('div.error ul.list')->count();
        $this->assertEquals($errorDiv, 1);
    }

    public function testHandleContactForm()
    {
        //Setup
        $dom = new Dom();
        $session = m::mock('Symfony\Component\HttpFoundation\Session\SessionInterface');
        $session->shouldReceive('previousUrl')->times(1)->andReturn('http://twitter-posts.com/contact/');
        $request = m::mock('Illuminate\Http\Request');
        $request->shouldReceive('all')->times(1)->andReturn([]);
        $request->shouldReceive('expectsJson')->times(1)->andReturn(false);
        $request->shouldReceive('input')->times(1)->andReturn([]);
        $currentUser = m::mock('App\Model\User');
        $owner = m::mock('App\Model\User');

        $contactController = $this->prepareContact($session, $request, $currentUser, $owner);
        //Test
        $validationFail = false;
        try{
            $ret = $contactController->handleContactForm($request);
        }catch(\Exception $e){
            $validationFail = true;
        }
        $this->assertTrue($validationFail);
    }

    public function testHandleContactFormAllErrors()
    {
        //Setup
        $dom = new Dom();
        $session = m::mock('Symfony\Component\HttpFoundation\Session\SessionInterface');
        $session->shouldReceive('previousUrl')->times(1)->andReturn('http://twitter-posts.com/contact/');
        $request = m::mock('Illuminate\Http\Request');
        $request->shouldReceive('expectsJson')->times(1)->andReturn(false);
        $name = $this->fillText(251, 'Pepito');
        $message = $this->fillText(501, 'Eres un carapolla y te odio');
        $input = [
            'name' => $name,
            'message' => $message,
            'email' => 'manolo@carapolla.com'
        ];
        $request->shouldReceive('all')->times(1)->andReturn($input);
        $request->shouldReceive('input')->times(1)->andReturn($input);
        $currentUser = m::mock('App\Model\User');
        $owner = m::mock('App\Model\User');
        $contactController = $this->prepareContact($session, $request, $currentUser, $owner);
        //Test
        $validationFail = false;
        try{
            $ret = $contactController->handleContactForm($request);
        }catch(\Exception $e){
            $validationFail = true;
        }
        $this->assertTrue($validationFail);
    }

    public function testHandleContactFormSuccess()
    {
        //Setup
        $dom = new Dom();
        $session = m::mock('Symfony\Component\HttpFoundation\Session\SessionInterface');
        $session->shouldReceive('flash')->once()->andReturn(true);
        $session->shouldReceive('previousUrl')->times(1)->andReturn('http://twitter-posts.com/contact/');
        $request = m::mock('Illuminate\Http\Request');
        $request->shouldReceive('all')->times(1)->andReturn([
            'name' => 'Pepito',
            'message' => 'Eres un carapolla y te odio',
            'email' => 'manolo@carapolla.com'
        ]);
        $request->shouldReceive('input')->times(3)->andReturn('Pepito','manolo@carapolla.com','Eres un carapolla y te odio');
        $request->shouldReceive('ip')->once()->andReturn('87.12.12.122');
        $request->shouldReceive('session')->once()->andReturn($session);
        $currentUser = m::mock('App\Model\User');
        $owner = m::mock('App\Model\User');
        $contactController = $this->prepareContact($session, $request, $currentUser, $owner);
        //Test
        $validationFail = false;
        $ret = $contactController->handleContactForm($request);
        $this->assertInstanceOf(\Illuminate\Http\RedirectResponse::class, $ret);
    }


    //Api privada.
    private function prepareContact($session, $request, $currentUser=null, $owner=null)
    {
        if(is_null($currentUser)){
            $currentUser = m::mock('App\Model\User');
            $currentUser->shouldReceive('getAttribute')->times(7)->andReturn('XXX');
        }
        View::share('currentUser', $currentUser);
        if(is_null($owner)){
            $owner = m::mock('App\Model\User');
            $owner->shouldReceive('getAttribute')->once(1)->andReturn('YYY');
        }
        View::share('owner', $owner);
        $sessionManager = m::mock('App\Api\SessionManager');
        $app = app();
        $app->singleton('request', function ($app) use($request){
            return $request;
        });
        $app->singleton('session', function ($app) use($session){
            return $session;
        });
        $contactController = new ContactController($sessionManager);
        return $contactController;
    }

}
