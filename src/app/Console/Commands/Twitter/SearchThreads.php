<?php
namespace App\Console\Commands\Twitter;

use App\Console\Commands\BaseCommand;
use App\Model\Post;
use App\Model\User;
use App\Model\Tweet;
use Carbon\Carbon;
use App\Api\SocialManager  as SocialManager;

class SearchThreads extends BaseCommand
{
    //Esto es para evitar usar la bbdd en la restauración.
    public $systemLog = true;

    protected $signature   = 'twitter:search-threads';
    protected $description = 'Busqueda de hilos de un usuario en twitter';

    public function __construct(SocialManager  $socialManager)
    {
        parent::__construct();
        $this->socialManager = $socialManager;
    }

    public function start()
    {
        $userScreenName = $this->ask('Usuario de twitter (@etc) ');
        $user = User::where('screen_name', $userScreenName)->first();
        $this->setUserApi($user->id);

        $userScreenName = $this->ask('Usuario de twitter a escanear');

        $lastId = $this->ask('Last processed ID (Enter to start)');

        $params = [
            'screen_name' => $userScreenName,
            'count' => 200
        ];

        if(!empty($lastId)){
            $params['max_id'] = trim($lastId);
        }

        $cont = 0;
        while(true){
            if(!empty($tweets)){
                if(sizeof($tweets)>50){
                    $cont++;
                    $this->comment("Pagina $cont procesada, buscando más tweets....");
                    $params['max_id'] = $tweets[(sizeof($tweets)-1)]->id_str;
                }else{
                    break;
                }
            }
            $tweets = app('twitter')->get('statuses/user_timeline.json', $params);
            foreach($tweets as $tweet){
                foreach(['hilo','thread'] as $value){
                    if(strripos($tweet->text, $value)!==false){
                        $url = "https://twitter.com/$userScreenName/status/".$tweet->id_str;
                        $this->info("Match found:");
                        $this->line($tweet->text);
                        $this->line($url);
                    }
                }
            }
            sleep(5);
        }
        $this->comment("Last Processed ID: ".$tweet->id_str);
        $this->comment("Tweets procesados con exito.");
    }

    protected function setUserApi($userId)
    {
        $user = User::where('id', $userId)->first();
        $this->line("Configurando api de twitter para su uso como el usuario: ".$user->name);
        $requestToken = [
            'token'  => $user['access_token']['oauth_token'],
            'secret' => $user['access_token']['oauth_token_secret']
        ];
        app('twitter')->reconfig($requestToken);
        return true;
    }

}
?>
