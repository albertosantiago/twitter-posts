var expect    = require('expect');

require("tests/setup");

import {tweetParser, mediaParser} from 'app/lib/app-parsers';

describe('App Parsers', function () {
    it('renders a correct tweet', function () {
        var tweet = '<blockquote class="twitter-tweet" data-lang="en"><p lang="es" dir="ltr">Tiembla Airbnb. Ana Botín entra en el negocio del alquiler' +
                    'de alojamientos particulares con la compra de Beroomers<a href="https://t.co/1Z7o9BENE9">https://t.co/1Z7o9BENE9</a></p>&mdash; El Confidencial' +
                    '(@elconfidencial) <a href="https://twitter.com/elconfidencial/status/853559595914088449">April 16, 2017</a></blockquote>';

        expect(tweetParser(tweet)).toEqual(tweet);
        //Aqui tiene que eliminar el script pero poner el resto.
        var auxTweet = tweet + "<script async src='//platform.twitter.com/widgets.js' charset='utf-8'></script>";
        expect(tweetParser(auxTweet)).toEqual(tweet);
    });

    it('not render a incorrect tweet', function () {
        var tweet = '<pollas-en-ollas><p>Hola caraculo!</p></pollas-en-ollas>';
        expect(tweetParser(tweet)).toEqual('');
        tweet = "<mierda><blockquote>Lalallal</blockquote></mierda>";
        expect(tweetParser(tweet)).toEqual('');
    });

    it('renders a correct media object', function () {
        var mediaCode = '<iframe width="560" height="315" src="https://www.youtube.com/embed/DhyVoX1GPHM" frameborder="0" allowfullscreen></iframe>';
        var processedMediaCode = '<iframe width="560" height="315" src="https://www.youtube.com/embed/DhyVoX1GPHM" frameborder="0" allowfullscreen=""></iframe>';
        expect(mediaParser(mediaCode)).toEqual(processedMediaCode);
        //Aqui tiene que eliminar el script pero poner el resto.
        var auxMediaCode = mediaCode + "<script async src='//platform.twitter.com/widgets.js' charset='utf-8'></script>";
        expect(mediaParser(auxMediaCode)).toEqual(processedMediaCode);
    });

    it('not render a incorrect media object', function () {
        var mediaCode = '<pollas-en-ollas><p>Hola caraculo!</p></pollas-en-ollas>';
        expect(mediaParser(mediaCode)).toEqual('');
        mediaCode  = "<mierda><blockquote>Lalallal</blockquote></mierda>";
        expect(mediaParser(mediaCode)).toEqual('');
    });
});
