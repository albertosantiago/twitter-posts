<?php
namespace App\Http\Controllers;

use App\Model\SystemLog;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Request;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function forbidden()
    {
        return response()->json(['error'=> '403 Forbidden', 'status' => 403] , 403);
    }

    public function badRequest()
    {
        return response()->json(['error'=> '406 Bad Request', 'status' => 406] , 406);
    }

    protected function reportError($e, $namespace)
    {
        $ip = Request::ip();
        if(!$ip){
            $ip = "";
        }
        $systemLog = new SystemLog();
        $systemLog->level = 'error';
        $systemLog->namespace = $namespace;
        $systemLog->message = $e->getMessage();
        $systemLog->alive   = false;
        $systemLog->extra = [
            'file' => $e->getFile(),
            'line' => $e->getLine(),
            'code' => $e->getCode(),
            'ip'   => $ip,
        ];
        return $systemLog->save();
    }
}
