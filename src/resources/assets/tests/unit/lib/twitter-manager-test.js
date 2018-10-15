var React     = require('react');
var TestUtils = require('react-dom/lib/ReactTestUtils'); //I like using the Test Utils, but you can just use the DOM API instead.
var expect    = require('expect');
var sinon     = require('sinon');

require("tests/setup");

import TwitterManager from 'app/lib/TwitterManager';

var postMock  = require("tests/lib/post_mock");
var tweetMock = require("tests/lib/tweet_mock");

var server;

describe('TwitterManager', function (){

    beforeEach(function() {
        this.twitterManager = new TwitterManager();
    });

    it('create without problems', function () {
        expect(this.twitterManager).toExist();
    });

    it('get Like info', function () {
        var tweet = tweetMock.text;
        expect(this.twitterManager.getExpectedTweetSize({content:tweet})).toEqual(44);
        expect(this.twitterManager.getRemainingCharsForTweet({content:tweet})).toEqual(96);
        tweet += " http://pollasenollas.com/esto_es_una_prueba_de_concepto?key=1212121212121212121";
        expect(this.twitterManager.getExpectedTweetSize({content:tweet})).toEqual(68);
        expect(this.twitterManager.getRemainingCharsForTweet({content:tweet})).toEqual(72);
    });

    it('recovery tweet data', function(done){
        $("body").first().append("<div id='tweet-post-mask'></div>")
        window.twttr = {
            widgets: {
                createTweet: function(id, element){
                    return new Promise(function(resolve){
                        var tweet = require('tests/lib/rendered_tweet.html');
                        var iframe = document.createElement('iframe');
                        iframe.id  = 'test-iframe';
                        iframe.src = 'data:text/html;charset=utf-8,';
                        document.getElementById('tweet-post-mask').appendChild(iframe);
                        var doc = document.getElementById('test-iframe').contentWindow.document;
                        doc.open();
                        doc.write(tweet);
                        doc.close();
                        resolve(iframe);
                    });
                }
            }
        };
        this.twitterManager.getTweetInfo({
            id:12,
            callback: function(data){
                expect(data.likes).toEqual(2);
                expect(data.retweets).toEqual(0);
                $("#tweet-post-mask").remove();
                done();
            }
        });
    });

    it('sends a like', function(){
        server = sinon.fakeServer.create();
        var params = {
            tweet_id: 122,
            post_id:  12,
            type: true,
            callback: sinon.spy()
        };
        this.twitterManager.sendLike(params);
        server.requests[0].respond(
            200,
            { "Content-Type": "application/json" },
            JSON.stringify([{
                type: 'tweet',
                data: {},
                status: 200
            }])
        );
        expect(params.callback.called).toEqual(true);
        server.restore();
    });

    it('sends a tweet', function(){
        server = sinon.fakeServer.create();
        var params = {
            in_reply_to: 122,
            post_id:  12,
            tweet: 'Eres un carapolla',
            success: sinon.spy(),
            error: sinon.spy()
        };
        this.twitterManager.sendTweet(params);
        server.requests[0].respond(
            200,
            { "Content-Type": "application/json" },
            JSON.stringify({
                type: 'tweet',
                data: {},
                status: 200
            })
        );
        expect(params.error.called).toNotEqual(true);
        expect(params.success.called).toEqual(true);
        server.restore();
    });

    it('get embed tweet', function(){
        server = sinon.fakeServer.create();
        var params = {
            url: 'https://twitter.com/Manolo/status/123',
            callback: sinon.spy()
        };
        this.twitterManager.getOembed(params);
        server.requests[0].respond(
            200,
            { "Content-Type": "application/json" },
            JSON.stringify({
                type: 'tweet',
                data: {},
                status: 200
            })
        );
        expect(params.callback.called).toEqual(true);
        server.restore();
    });

});
