<?php
namespace App\Http\Controllers\Admin\System;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Model\Notification;
use Datatables;
use DB;
use Session;


class NotificationController extends Controller
{
    const PAGE_SIZE = 100;

    public function index(Request $request)
    {
        $query = Notification::query();
        $filters = $request->input('filters');
        if(!empty($filters)){
            if($filters['post_id']==1){
                $query->where('post_id', $filters['post_id']);
            }
        }
        $notifications = $query->orderBy('updated_at','DESC')->paginate(self::PAGE_SIZE);
        return view('admin/system/notifications', [
            'notifications' => $notifications,
        ]);
    }

    public function delete(Request $request)
    {
        $notId = $request->input('id');
        Notification::destroy($notId);
        return redirect()->back();
    }
}
