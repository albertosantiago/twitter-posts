<?php
namespace App\Console\Commands;

use App\Model\SystemLog;
use DB;

trait SystemLogTrait
{
    public $systemLog = true;

    public function log($level, $message, $extra = null)
    {
        if(!$this->systemLog){
            return;
        }
        if($extra==null){
            $extra = [];
        }
        $extra['pid'] = getmypid();

        $log = new SystemLog();
        $log->message = $message;
        $log->level  = $level;
        $log->namespace = $this->getSignature();
        $log->extra = $extra;
        $log->alive = false;
        $log->save();
    }

    public function getLogs($message){
        return SystemLog::where('message', $message)
                        ->where("namespace", $this->getSignature())
                        ->orderBy('id', 'desc')
                        ->get();
    }

    public function getLastExecLog($limit){
        return SystemLog::where("namespace", $this->getSignature())
                        ->orderBy('id', 'desc')
                        ->take($limit)
                        ->get();
    }
}
