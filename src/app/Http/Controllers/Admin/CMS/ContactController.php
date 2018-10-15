<?php
namespace App\Http\Controllers\Admin\CMS;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Model\ContactMessage;
use Datatables;
use DB;
use Session;

class ContactController extends Controller
{
    const PUBLISHER_PAGE = 10;

    public function index()
    {
        $query = ContactMessage::query();
        $messages = $query->orderBy('name')->paginate(self::PUBLISHER_PAGE);

        return view('admin/cms/contact', [
            'messages' => $messages,
        ]);
    }

    public function delete(Request $request)
    {
        $deletedInputs = $request->get('delete');
        $deletedIds = [];
        if(!empty($deletedInputs)){
            foreach($deletedInputs as $id => $value) {
                $deletedIds[] = $id;
            }
            ContactMessage::destroy($deletedIds);
            Session::flash('flash_message', "Mensajes eliminados con exito");
        }
        return redirect()->back();
    }
}
