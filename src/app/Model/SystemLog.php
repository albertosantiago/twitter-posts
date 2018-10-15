<?php
namespace App\Model;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class SystemLog extends Eloquent{
    protected $dates = ['created_at','updated_at','first_enter_at'];
    protected $fillable = ['level','message','extra','namespace','alive'];
}
