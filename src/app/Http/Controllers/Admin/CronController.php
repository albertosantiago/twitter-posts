<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Artisan;
use Session;
use App\Model\CronTask;

class CronController extends Controller
{
    public function index()
    {
        $cronTasks = CronTask::all();
        return view('admin.cron.index', ['cronTasks' => $cronTasks]);
    }

    public function create()
    {
        $commands = $this->getCommandsArray();
        return view('admin.cron.create', ['commands' => $commands]);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'command' => 'required|max:255',
            'cron.minute' => 'required|max:6',
            'cron.hour' => 'required|max:6',
            'cron.month_day' => 'required|max:6',
            'cron.month' => 'required|max:6',
            'cron.week_day' => 'required|max:6',
            'cron.year' => 'required|max:6'
        ]);
        $commands = $this->getCommandsArray();
        $cronTask = new CronTask;
        $cronTask->command = $commands[$request->command];
        $cronTask->cron    = implode(" ", $request->cron);
        $cronTask->params  = $request->params;
        $cronTask->save();

        Session::flash('flash_message', trans("Cronjob creado con exito"));
        return redirect()->back();
    }

    public function destroy(Request $request, $id)
    {
        $cronTask = CronTask::findOrFail($id);
        $cronTask->delete();
        Session::flash('flash_message', 'Cron Task successfully deleted!');
        return redirect()->route('admin.cron.index');
    }

    public function getCommandsArray(){
        $ret = [];
        $commands = Artisan::all();
        foreach ($commands as $command) {
            if (is_a($command, 'App\Console\Commands\BaseCommand')) {
                $ret[] = $command->getSignature();
            }
        }
        return $ret;
    }
}
