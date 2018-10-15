<?php

namespace Tests\Api;

use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use App\Api\ThreadRenderHelper as ThreadRenderHelper;
use App\Model\TweetThread;
use PHPHtmlParser\Dom;

class ThreadRenderHelpersTest extends TestCase
{
    /**
    * Simple test unitario para verificar que devuelva YES or NO en caso de valores booleanos.
    **/
    public function testBasic()
    {
        //Cargamos la colección de TweetThread
        $this->loadFixture('tweet_threads','tweet_threads.json');
        $dom = new Dom();
        //Validamos que crea bien las estructuras html.
        //Este thread solamente tiene un tweet asociado.
        $tweetThread = TweetThread::find("58f48c21e07e985eab0b0136");
        $ret = $this->getRenderedThread($tweetThread,2,true);
        $dom->load($ret);
        $totalTweets = $dom->find('.twitter-tweet')->count();
        $this->assertEquals($totalTweets, 1);
        //Este tiene varios niveles y respuestas.
        $tweetThread = TweetThread::find("58ef315ae07e9803332f915a");
        //Renderizamos 4 niveles
        $ret = $this->getRenderedThread($tweetThread, 4,true);
        $dom->load($ret);
        $totalTweets = $dom->find('.twitter-tweet')->count();
        $this->assertEquals($totalTweets, 14);
        //Vemos si estan bien formados los niveles. Deben sumar 14....
        $res = $dom->find('.responses-container')->count();
        $this->assertEquals($res, 1);
        $res = $dom->find('.responses-container .responses-container')->count();
        $this->assertEquals($res, 7);
        $res = $dom->find('.responses-container .responses-container .responses-container')->count();
        $this->assertEquals($res, 3);
        $res = $dom->find('.responses-container .responses-container .responses-container .responses-container')->count();
        $this->assertEquals($res, 2);
        $res = $dom->find('.responses-container .responses-container .responses-container .responses-container .responses-container')->count();
        $this->assertEquals($res, 1);
        //Ahora solo 2
        $ret = $this->getRenderedThread($tweetThread, 2,true);
        $dom->load($ret);
        $totalTweets = $dom->find('.twitter-tweet')->count();
        $this->assertEquals($totalTweets, 11);
        //Vemos si estan bien formados los niveles. Deben sumar 11....
        $res = $dom->find('.responses-container')->count();
        $this->assertEquals($res, 1);
        $res = $dom->find('.responses-container .responses-container')->count();
        $this->assertEquals($res, 7);
        $res = $dom->find('.responses-container .responses-container .responses-container')->count();
        $this->assertEquals($res, 3);
        $res = $dom->find('.responses-container .responses-container .responses-container .responses-container')->count();
        $this->assertEquals($res, 0);
    }

    private function getRenderedThread($thread, $level, $first){
        $helper = new ThreadRenderHelper();
        ob_start();
            $helper->render($thread,$level,$first);
        $ret = ob_get_contents();
        ob_end_clean();
        return $ret;
    }
}
