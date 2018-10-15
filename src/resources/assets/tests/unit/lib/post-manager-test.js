var React     = require('react');
var TestUtils = require('react-dom/lib/ReactTestUtils'); //I like using the Test Utils, but you can just use the DOM API instead.
var expect    = require('expect');
var sinon     = require('sinon');

require("tests/setup");

import PostManager from 'app/lib/PostManager';

var postMock  = require("tests/lib/post_mock");
var tweetMock = require("tests/lib/tweet_mock");

var server;

describe('PostManager', function (){

    beforeEach(function() {
        server = sinon.fakeServer.create();
        this.postManager = new PostManager();
    });

    afterEach(function(){
        server.restore();
    })

    it('create without problems', function () {
        expect(this.postManager).toExist();
    });

    it('unpublish', function (){
        var params = {
            postId: 12,
            done: sinon.spy()
        };
        this.postManager.unpublish(params);
        server.requests[0].respond(
            200,
            { "Content-Type": "application/json" },
            JSON.stringify({
                type: 'tweet',
                data: {},
                status: 200
            })
        );
        expect(params.done.called).toEqual(true);
    });

    it('publish', function(){
        var params = {
            id: 12,
            status: 'Eres un carapolla',
            done: sinon.spy()
        };
        this.postManager.unpublish(params);
        server.requests[0].respond(
            200,
            { "Content-Type": "application/json" },
            JSON.stringify({
                type: 'tweet',
                data: {},
                status: 200
            })
        );
        expect(params.done.called).toEqual(true);
    });

    it('save', function(){
        var params = {
            data: {
                id: 122,
                title: 'Esto es el titulo',
                content: 'Esto es el contenido',
                tags: '#Esto #son #las #tags'
            },
            done: sinon.spy()
        };
        this.postManager.unpublish(params);
        server.requests[0].respond(
            200,
            { "Content-Type": "application/json" },
            JSON.stringify({
                type: 'post',
                data: {},
                status: 200
            })
        );
        expect(params.done.called).toEqual(true);
    });

    it('create tweet for publish', function(){
        var params = {
            'title': 'Historia del @carapolla',
            'content': '@mierda @pollas',
            'tags': ['#caca','#culo','#teta'],
            'id': 122,
            'slug': 'historia_del_carapolla'
        };
        var tweet = this.postManager.createTweetForPublish(params);
        expect(tweet).toContain('Historia del @carapolla @mierda @pollas #caca #culo #teta');
        expect(tweet).toContain('/posts/view/historia_del_carapolla/122');
        expect(tweet).toNotContain('others_things');
    });

    it('check tweet for publish', function(){
        var params = {
            'title': 'Historia del @carapolla',
            'content': '@mierda @pollas',
            'tags': ['#caca','#culo','#teta'],
            'id': 122,
            'slug': 'historia_del_carapolla'
        };
        var tweet = this.postManager.createTweetForPublish(params);
        params = {
            postId: 122,
            postSlug: 'historia_del_carapolla',
            content: tweet
        };
        expect(this.postManager.checkTweetForPublish(params)).toEqual(true);
    });

});
