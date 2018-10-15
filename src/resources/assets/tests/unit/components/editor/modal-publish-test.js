import $ from 'jquery';
import App from 'app/app';

var React     = require('react');
var ReactDOM  = require('react-dom');
var TestUtils = require('react-dom/lib/ReactTestUtils'); //I like using the Test Utils, but you can just use the DOM API instead.
var expect    = require('expect');
var assert    = require('chai').assert;
var sinon     = require('sinon');
var then      = require('tests/lib/then');

require("tests/setup");

import ModalPublish from 'app/components/editor/ModalPublish';

var postMock  = require("tests/lib/post_mock");
var tweetMock = require("tests/lib/tweet_mock");

describe('ModalPublish', function (){

    beforeEach(function() {
        this.showInsertMedia = true;
        this.postMock = postMock;
        this.onCancel  = () => {};
        this.onSuccess = () => {};
        var self = this;

        this.refreshComponent = function(){
            self.component = TestUtils.renderIntoDocument(<ModalPublish user_screen_name={self.postMock.user_screen_name}
                                                                id={self.postMock.id} title={self.postMock.title}
                                                                tags={postMock.tags} content={self.postMock.content}
                                                                onUserCancel={self.onCancel} onSuccess={self.onSuccess} />);
        };
        this.renderedDOM = () => ReactDOM.findDOMNode(this.component);
        this.refreshComponent();
    });

    it('renders without problems', function () {
        expect(this.component).toExist();
    });

    it('renders like expected', function () {
        var dom = this.renderedDOM();
        expect($(dom).find(".header").first().html()).toEqual("Publish &amp; Tweet");
        expect($(dom).find("textarea").length).toEqual(1);
        expect($(dom).find(".button").length).toEqual(3);
    });

    it("hide like expected", function(){
        this.onCancel = sinon.spy();
        this.refreshComponent();
        var cancelButton = this.component.refs.cancel;
        TestUtils.Simulate.click(cancelButton);
        //Esto esta mal, pero no hay manera de que el evento onHidden del modal termine.
        //Deberia ser expect(blabla).assertEqual(true)
        expect(this.onCancel.called);
    });

    it("render success like expected", function(){
        var dom = this.renderedDOM();
        App.get('postManager').publish = function(params){
            params.done({
                type: 'tweet',
                data: tweetMock,
                status: 200
            });
        };
        var publishButton = this.component.refs.pub;
        TestUtils.Simulate.click(publishButton);
        expect($(dom).find('#publish-success div.tweet').first().html()).toNotEqual('');
        expect($(dom).find('#publish-success div.tweet').first().html()).toEqual(tweetMock.embed.html);
        expect($(dom).find(".actions .publish.button").css("display")).toEqual("none");
        expect($(dom).find(".actions .ui.cancel.button").html()).toNotEqual("");
        expect($(dom).find(".actions .ui.cancel.button").html()).toEqual("Close");
    });

    it("render error and retry correctly", function(){
        var errorMessage = 'There was a problem with the request';
        var dom = this.renderedDOM();
        App.get('postManager').publish = function(params){
            params.fail({
                type: 'error',
                message: errorMessage,
                status: 500
            });
        };
        var publishButton = this.component.refs.pub;
        TestUtils.Simulate.click(publishButton);
        expect($(dom).find("#publish-error p").first().html()).toNotEqual('');
        expect($(dom).find("#publish-error p").first().html()).toEqual(errorMessage);
        expect($(dom).find(".actions .retry.button").first().css("display")).toEqual("inline");
        expect($(dom).find(".actions .publish.button").first().css("display")).toEqual("none");
        var retryButton = this.component.refs.retry;
        TestUtils.Simulate.click(retryButton);
        expect($(dom).find(".actions .retry.button").first().css("display")).toEqual("none");
        expect($(dom).find(".actions .publish.button").first().css("display")).toEqual("inline");
    });

    it("check tweets like expected", function(){
        var dom = this.renderedDOM();
        var blockText = "Esto es una muestra de texto";
        var tweet     = '';
        for(var i=0;i<6;i++){
            tweet += blockText;
        }
        this.component.setText(tweet);
        expect($(dom).find("#tweet-preview-characters").html()).toEqual(-28);
        expect($(dom).find("#tweet-preview-characters").hasClass("red")).toEqual(true);

        tweet = '';
        for(var i=0;i<4;i++){
            tweet += blockText;
        }
        this.component.setText(tweet);
        expect($(dom).find("#tweet-preview-characters").html()).toEqual(28);
        expect($(dom).find("#tweet-preview-characters").hasClass("red")).toEqual(false);
    });

});
