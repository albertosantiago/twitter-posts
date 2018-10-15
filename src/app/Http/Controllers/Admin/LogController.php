<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Model\SystemLog;
use Datatables;
use DB;
use Session;

class LogController extends Controller
{
    const PAGINATION_SIZE = 100;

    public function index(Request $request)
    {
        $query = SystemLog::query();
        //Filtramos por namespace
        if ($namespace = $request->get('namespace')) {
            $query = $query->where('namespace', 'like', "%$namespace%");
        }
        if(($level = $request->get('level')) && ($level!='all')) {
            $query = $query->where('level', 'like', "%$level%");
        }
        $logs = $query->orderBy('updated_at')->paginate(self::PAGINATION_SIZE);
        return view('admin/logs', ['logs' => $logs]);
    }

    public function delete(Request $request){
        if($request->get('clear-selected')!==null){
            $deletedInputs = $request->get('delete');
            $deletedIds = [];
            if(!empty($deletedInputs)){
                foreach($deletedInputs as $id => $value) {
                    $deletedIds[] = $id;
                }
                $query = SystemLog::query();
                $query->whereIn('_id', $deletedIds);
                $query->where('alive', false);
                $query->delete();
                Session::flash('flash_message', "Trazas eliminadas con exito");
            }
        }

        if($request->get('clear-all')!==null){
            $query = SystemLog::query();
            //Filtramos por namespace
            if ($namespace = $request->get('namespace')) {
                $query = $query->where('namespace', 'like', "%$namespace%");
            }
            if ($search = $request->get('search')) {
                $query = $query->where(function($q){
                    $q->where('namespace', 'like', "%$search%")
                        ->orWhere('message', 'like', "%$search%")
                        ->orWhere('extra', 'like', "%$search%")
                        ->orWhere('created_at', 'like', "%$search%");
                });
            }
            if(($level = $request->get('level')) && ($level!='all')) {
                $query = $query->where('level', 'like', "%$level%");
            }
            $query->where('alive', false);
            $query->delete();
            Session::flash('flash_message', "Trazas eliminadas con exito");
        }
        return redirect()->back();
    }
}
