<?php

namespace Tests\Api;

use Tests\TestCase;
use Illuminate\Http\Request;
use \Mockery as m;
use PHPHtmlParser\Dom;
use App\Model\User;
use App\Model\Upload;
use App\Http\Controllers\UploadsController as UploadsController;

use View;

class UploadsControllerTest extends TestCase
{
    public function testIndex()
    {
        $this->loadFixture('users','users.json');
        $user = User::where('screen_name','WetdogCompany')->first();
        //Setup
        $dom = new Dom();
        $sessionManager = m::mock('App\Api\SessionManager');
        $sessionManager->shouldReceive('getCurrentUser')->times(3)->andReturn(false, $user, $user);
        $uploadsController = new UploadsController($sessionManager);
        //Test
        $ret = $uploadsController->index();
        $this->assertInstanceOf(\Illuminate\Http\JsonResponse::class, $ret);
        $this->assertEquals(403, $ret->status());
        $ret = $uploadsController->index();
        $this->assertInstanceOf(\Illuminate\Http\JsonResponse::class, $ret);
        $this->assertNotEquals(403, $ret->status());
        $data = json_decode($ret->content());
        $this->assertEquals($data->data, []);
        //Ahora con datos...
        for($i=1;$i<11;$i++){
            $upload = new Upload();
            $upload->type = 'img';
            $upload->mimeType = 'image/jpeg';
            $upload->user_id = $user->id;
            $upload->src  = "/img/users/$i.jpg";
            $upload->size = $i*1000;
            $upload->save();
        }
        $ret = $uploadsController->index();
        $this->assertInstanceOf(\Illuminate\Http\JsonResponse::class, $ret);
        $this->assertNotEquals(403, $ret->status());
        $data = json_decode($ret->content());
        $this->assertContains("/img/users/1.jpg", $data->data[0]->src);
        $this->assertContains("/img/users/5.jpg", $data->data[4]->src);
    }

    public function testUpload()
    {
        //Setup
        $this->loadFixture('users','users.json');
        $user = User::where('screen_name','WetdogCompany')->first();

        $file = m::mock('Illuminate\Http\UploadedFile');
        $file->shouldReceive('getMimeType')->once()->andReturn('image/jpeg');
        $file->shouldReceive('getClientSize')->once()->andReturn(1000000);
        $file->shouldReceive('getClientOriginalName')->once()->andReturn('mi_polla.jpg');
        $file->shouldReceive('move')->once()->andReturn(true);
        $request = m::mock('Illuminate\Http\Request');
        $request->shouldReceive('hasFile')->times(2)->andReturn(false, true);
        $request->shouldReceive('file')->once()->andReturn($file);
        $sessionManager = m::mock('App\Api\SessionManager');
        $sessionManager->shouldReceive('getCurrentUser')->times(2)->andReturn($user);
        $app = app();
        $app->singleton('jobManager', function($app){
            $jobManagerMock = m::mock('App\Api\JobManager');
            $jobManagerMock->shouldReceive('dispatchThumbsJob')->once()->andReturn(true);
            return $jobManagerMock;
        });

        $uploadsController = new UploadsController($sessionManager);
        //Tests
        $ret = $uploadsController->upload($request);
        $this->assertInstanceOf(\Illuminate\Http\JsonResponse::class, $ret);
        $this->assertEquals(406, $ret->status());
        //Ahora la buena.
        $ret = $uploadsController->upload($request);
        $this->assertInstanceOf(\Illuminate\Http\JsonResponse::class, $ret);
        $this->assertEquals(200, $ret->status());
        $data = json_decode($ret->content());
        $this->assertEquals($data->data->src, '/img/users/3979906515_ca79e5a4155bda8c86d31aad0a5e3774.jpg');
    }

    public function testRemove()
    {
        //Setup.
        $this->loadFixture('users','users.json');
        $user    = User::where('screen_name','WetdogCompany')->first();
        $badUser = User::where('screen_name','Tweet4Posts')->first();
        //Creamos algunos datillos pa proba
        $ids = [];
        for($i=1;$i<11;$i++){
            $upload = new Upload();
            $upload->type = 'img';
            $upload->mimeType = 'image/jpeg';
            $upload->user_id = $user->id;
            $upload->src  = "/img/users/$i.jpg";
            $upload->size = $i*1000;
            $upload->save();
            $ids[] = $upload->id;
        }
        $sessionManager = m::mock('App\Api\SessionManager');
        $sessionManager->shouldReceive('getCurrentUser')->times(5)->andReturn($user,$user,$badUser,$badUser,null);
        $uploadsController = new UploadsController($sessionManager);
        //Let's go
        $ret = $uploadsController->remove($ids[0]);
        $this->assertInstanceOf(\Illuminate\Http\JsonResponse::class, $ret);
        $this->assertEquals(200, $ret->status());
        $data = json_decode($ret->content());
        $this->assertEquals($data->type, 'message');
        $this->assertEquals($data->data, 'success');
        //Comprobamos que devuelve 9 resultados.
        $ret = $uploadsController->index();
        $data = json_decode($ret->content());
        $this->assertEquals(sizeof($data->data), 9);
        //Ahora con un usuario incorrecto.
        $ret = $uploadsController->remove($ids[3]);
        $this->assertEquals(406, $ret->status());
        //Ahora nos inventamos el ID
        $ret = $uploadsController->remove(10000000);
        $this->assertEquals(406, $ret->status());
        //Ahora sin usuario.
        $ret = $uploadsController->remove(10000000);
        $this->assertEquals(403, $ret->status());
    }
}
