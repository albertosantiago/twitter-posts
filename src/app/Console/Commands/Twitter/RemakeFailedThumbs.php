<?php
namespace App\Console\Commands\Twitter;

use App\Console\Commands\BaseCommand;
use App\Model\Upload;

class RemakeFailedThumbs extends BaseCommand
{
    //Esto es para evitar usar la bbdd en la restauración.
    public $systemLog = true;

    protected $signature   = 'twitter:remake-failed-thumbs';
    protected $description = 'Hace thumbs de imagenes subidas anteriormente y que por algún motivo fallo';

    public function __construct()
    {
        parent::__construct();
    }

    public function start()
    {
        $uploads = Upload::where('thumbSrc', null)->take(10)->get();
        foreach($uploads as $upload){
            app('jobManager')->dispatchThumbsJob($upload);
            sleep(2);
        }
    }


}
?>
