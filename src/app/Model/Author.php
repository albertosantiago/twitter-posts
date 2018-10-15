<?php
namespace App\Model;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Author extends Eloquent {
    protected $dates = ['created_at','updated_at'];
}
