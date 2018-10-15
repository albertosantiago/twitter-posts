<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

declare(ticks = 1);

$execProcess = [];

if(function_exists('pcntl_signal')){
    pcntl_signal(SIGINT, function() {
        exit;
    });
}


class BaseCommand extends Command
{
    use SystemLogTrait;

    private $lockedInstance = false;
    private $processLock = '';

    public function __construct()
    {
        parent::__construct();
    }

    public function __destruct() {
        if($this->lockedInstance){
            $this->removeLock();
        }
    }

    protected function setLock(){
        $pid = getmypid();
        file_put_contents($this->getProcessLock(), $pid);
        $this->lockedInstance = true;
    }

    protected function removeLock()
    {
        $filename = $this->getProcessLock();
        if(is_file($filename)){
            unlink($filename);
        }
    }

    private function getLockPath()
    {
        return storage_path("commands/locks/");
    }

    private function getProcessLock()
    {
        if(empty($this->processLock)){
            $classSign = $this->getClassSign();
            $numberInstances = $this->getCurrentInstances();
            $lockName = $classSign.":".$numberInstances;
            $this->processLock = $this->getLockPath().$lockName;
        }
        return $this->processLock;
    }

    protected function getCurrentInstances()
    {
        $dh  = opendir($this->getLockPath());
        $numberInstances = 0;
        $classSign = $this->getClassSign();
        while (false !== ($fileName = readdir($dh))) {
            $filePath = $this->getLockPath().$fileName;
            if(is_file($filePath)){
                if($fileName!='.gitignore'){
                    list($sign, $id) = explode(':',$fileName);
                    if($sign == $classSign){
                        $pid = file_get_contents($filePath);
                        exec("ps -p $pid", $output);
                        if (count($output) > 1) {
                            $numberInstances++;
                        }else{
                            unlink($filePath);
                        }
                    }
                }
            }
        }
        return $numberInstances;
    }

    protected function getClassSign(){
        $class     = get_class($this);
        $classSign = md5($class);
        return $classSign;
    }

    //Sobreescribimos los metodos de log error e info para añadir las trazas al sistema
    public function error($string, $verbosity = null)
    {
        parent::error($string, $verbosity);
        $this->log('error', $string);
    }

    public function info($string, $verbosity = null)
    {
        parent::info($string, $verbosity);
        $this->log('info', $string);
    }

    public function handle()
    {
        $this->setLock();
        $this->log('info', 'started');
        try {
            $this->start();
        } catch (\Exception $e) {
            $this->error($e->getMessage());
        } catch (\ErrorException $e) {
            $this->error($e->getMessage());
        } catch (\FatalErrorException $e) {
            $this->error($e->getMessage());
        }
        $this->log('info', 'finished');
        $this->removeLock();
    }

    public function getSignature()
    {
        $sign = explode(' ', $this->signature);
        return $sign[0];
    }

    public function getLastExecution()
    {
        $logs = $this->getLastExecLog(10);
        $buffer = '';
        foreach ($logs as $log) {
            if ($log->level === 'error') {
                $buffer .= "<span class='alert-danger' style='font-weight:bold'>";
            }
            $buffer .= $log->level.' - '.$log->created_at.' - '.$log->message."\n";
            if ($log->level === 'error') {
                $buffer .= '</span>';
            }
        }
        if (empty($buffer)) {
            $buffer .= "---\n";
        }
        return $buffer;
    }

    public function getStatus()
    {
        $logs = $this->getLastExecLog(1);
        $log = $logs->first();
        if(!$log){
            return 0;
        }
        $pid = $log->extra['pid'];
        if (file_exists( "/proc/$pid" )){
            return 1;
        }
        return 0;
    }
}
