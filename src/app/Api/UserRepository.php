<?php namespace App\Api;

use Mongolico;
use \MongoDB\BSON\ObjectId as ObjectId;
use App\Model\User;
use Carbon\Carbon;

class UserRepository{

    public function __construct(){}

    public function updateUser($userId, $values, $internalId = false)
    {
        $user = $this->getUser($userId, $internalId);
        if(empty($user)){
            throw new \Exception("The user was not found", 1);
        }
        $user = $this->fillUser($user, $values);
        return $user->save();
    }

    public function getUser($userId, $internalId = true)
    {
        if($internalId){
            return User::find($userId);
        }
        return User::where('id', $userId)->first();
    }

    public function findOne($q)
    {
        $query = User::query();
        foreach($q as $key => $value){
            $query->where($key,$value);
        }
        return $query->first();
    }

    public function insertOrUpdateUser($user)
    {
        if(!empty($user->_id)){
            $currentUser = User::find($user->_id);
        }
        if(!empty($user->id_str)){
            $currentUser = User::where('id_str', $user->id_str)->first();
        }
        if(empty($currentUser)){
            $currentUser = new User();
            $currentUser->first_enter_at = Carbon::now();
            $currentUser->isEditor = false;
        }
        $currentUser->updated_at = Carbon::now();
        $currentUser = $this->fillUser($currentUser, $user);
        $ret = $currentUser->save();
        if($ret){
            return $currentUser;
        }
        return false;
    }

    public function fillUser($user,$values)
    {
        if(is_object($values)){
            if(method_exists($values,'toArray')){
                $values = $values->toArray();
            }
        }
        foreach($values as $key => $value){
            if($key=='created_at'){
                $value = new Carbon($value);
            }
            if($key=='updated_at'){
                $value = new Carbon($value);
            }
            if($key=='first_enter_at'){
                $value = new Carbon($value);
            }
            if($key!='_id'){
                $user->$key = $value;
            }
        }
        return $user;
    }
}
