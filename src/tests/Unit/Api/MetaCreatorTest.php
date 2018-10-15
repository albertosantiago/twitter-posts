<?php

namespace Tests\Api;

use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use App\Api\MetaCreator as MetaCreator;
use PHPHtmlParser\Dom;
use Illuminate\Http\Request;
use \Mockery as m;
use Carbon\Carbon;

class MetaCreatorTest extends TestCase
{
    public function testDefault()
    {
        $url = "http://twitter-posts.com/post/view/mi_poll_en_tu_boca/1212121";
        $dom = new Dom();
        $ret = $this->getDefaultMetas($url);
        $dom->load($ret);
        //Canonical
        $canonical = $dom->find('link[rel=canonical]')[0]->getAttribute("href");
        $this->assertEquals($url, $canonical);
        //Title
        $title = $dom->find('title')[0]->text();
        $expectedTitle = 'Twitter Posts - Advanced tweet and posting for Twitter users';
        $this->assertEquals($title, $expectedTitle);
        //Expected Title
        $twitterTitle = $dom->find('meta[name=twitter:title]')[0]->getAttribute("value");
        $this->assertEquals($twitterTitle, $expectedTitle);
        //Description
        $expectedDesc = "Welcome to Twitter-Posts, the posting platform for twitter users";
        $twitterDesc = $dom->find('meta[name=twitter:description]')[0]->getAttribute("value");
        $this->assertEquals($twitterDesc, $expectedDesc);
        $ogType = $dom->find('meta[name=og:type]')[0]->getAttribute("value");
        $this->assertEquals($ogType, "website");
    }

    public function testPostView()
    {
        $url = "http://twitter-posts.com/post/view/mi_poll_en_tu_boca/1212121";
        $ret = $this->getMetasForPost($url, false);
        $dom = new Dom();
        $dom->load($ret);
        //Canonical
        $canonical = $dom->find('link[rel=canonical]')[0]->getAttribute("href");
        $this->assertEquals($url, $canonical);
        //Title
        $title = $dom->find('title')[0]->text();
        $expectedTitle = 'Esto es una prueba de concepto.';
        $this->assertEquals($title, $expectedTitle);
        //Expected Title
        $twitterTitle = $dom->find('meta[name=twitter:title]')[0]->getAttribute("value");
        $this->assertEquals($twitterTitle, $expectedTitle);
        //Description
        $expectedDesc = "Carapolla es una persona mu mal, siempre anda cabreado.";
        $twitterDesc = $dom->find('meta[name=twitter:description]')[0]->getAttribute("value");
        $this->assertEquals($twitterDesc, $expectedDesc);
        $ogType = $dom->find('meta[name=og:type]')[0]->getAttribute("value");
        $this->assertEquals($ogType, "article");
        $twitterCard = $dom->find('meta[name=twitter:card]')[0]->getAttribute("value");
        $this->assertEquals($twitterCard, 'summary');
        $ret = $this->getMetasForPost($url, true);
        $dom = new Dom();
        $dom->load($ret);
        $twitterCard = $dom->find('meta[name=twitter:card]')[0]->getAttribute("value");
        $this->assertEquals($twitterCard, 'summary_large_image');
    }

    public function getMetasForPost($url, $withImage=false)
    {
        $metaCreator = $this->createMetaCreator($url);
        $metaCreator->set('title', "Esto es una prueba de concepto.");
        $metaCreator->setMeta('author', "Carapolla Garcia");
        $metaCreator->setMeta('og:type', 'article');
        $metaCreator->setLink('author', 'https://twitter-posts.com/@carapolla');
        $pubTime = Carbon::now()->toAtomString();
        $metaCreator->setMeta('article:published_time', $pubTime);
        $metaCreator->setMeta('description', "Carapolla es una persona mu mal, siempre anda cabreado.");
        $tags = explode("#", "#caca #teta #culo");
        $tags = trim(implode(" ", $tags));
        $metaCreator->setMeta('article:tag', $tags);
        if(empty($withImage)){
            $metaCreator->setMeta('twitter:card', 'summary');
        }else{
            $image = "http://twitter-posts.com/img/carapolla.jpg";
            $metaCreator->setMeta('twitter:card', 'summary_large_image');
            $metaCreator->setMeta('twitter:image', $image);
        }
        return "<head>".$metaCreator->render()."</head>";
    }

    private function getDefaultMetas($url)
    {
        $metaCreator = $this->createMetaCreator($url);
        return "<head>".$metaCreator->render()."</head>";
    }

    private function createMetaCreator($url)
    {
        $request = m::mock('Illuminate\Http\Request');
        $request->shouldReceive('fullUrl')->andReturn($url);
        $request->shouldReceive('path')->andReturn("post/view/mi_poll_en_tu_boca/1212121");
        $request->shouldReceive('is')->andReturn(false);
        $metaCreator = new MetaCreator($request);
        return $metaCreator;
    }

}
