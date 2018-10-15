<?php
namespace App\Model;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class ContactMessage extends Eloquent{
    protected $collection = 'contact_messages';
    protected $dates = ['created_at'];
}
