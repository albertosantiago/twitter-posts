<?php namespace App\Api;

class Util{

    public static function implodeList($list, $splitSize){
        $ret = array();
        $string = "";
        $size = sizeOf($list);
        for($i=0; $i<$size; $i++){
            $string .= $list[$i].",";
            if(($i%$splitSize)==0){
                $ret[] = $string;
                $string = "";
            }
        }
        $ret[] = $string;
        return $ret;
    }
}
