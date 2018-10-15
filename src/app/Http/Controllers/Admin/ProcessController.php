<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Artisan;
use Symfony\Component\Process\Process;

class ProcessController extends Controller
{
    public function index()
    {
        $processes = $this->getProcesses();
        return view('admin/processes', ['processes' => $processes ]);
    }

    public function exec($name)
    {
        $process = $this->getProcess($name);
        $basePath = base_path();
        $command = 'php '.$basePath.'/artisan '. $process->getSignature(). " &";
        $process = new Process($command);
        $process->start();
        return redirect("/adx/processes");
    }

    public function getProcesses()
    {
        $processes = [];
        $commands = Artisan::all();
        foreach ($commands as $command) {
            if (is_a($command, 'App\Console\Commands\BaseCommand')) {
                $processes[] = $command;
            }
        }
        return $processes;
    }

    public function getProcess($name)
    {
        $processes = $this->getProcesses();
        foreach ($processes as $process) {
            if ($process->getSignature()==$name) {
                return $process;
            }
        }
        return false;
    }
}
