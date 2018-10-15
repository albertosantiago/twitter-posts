import $ from 'jquery';
import App from 'app/app';

var React     = require('react');
var ReactDOM  = require('react-dom');
var TestUtils = require('react-dom/lib/ReactTestUtils'); //I like using the Test Utils, but you can just use the DOM API instead.
var expect    = require('expect');
var assert    = require('chai').assert;
var then      = require('tests/lib/then');
var sinon     = require('sinon');

require("tests/setup");

import TweetEditor from 'app/components/TweetEditor';
import ModalLogin from 'app/components/ModalLogin';

var postMock  = require("tests/lib/post_mock");
var tweetMock = require("tests/lib/tweet_mock");

var hideEditor = function(id){
    return;
};

describe('TweetEditor', function (){

    beforeEach(function() {
        this.id = 1212;
        this.postMock  = postMock;
        this.tweetMock = tweetMock;
        this.onCancel   = () => {};
        this.onSuccess  = () => {};
        var self = this;

        this.refreshComponent = function(){
            self.component = TestUtils.renderIntoDocument(<TweetEditor id={self.id}
                                                                    in_reply_to={self.tweetMock.id_str}
                                                                    post_id={self.postMock.id}
                                                                    in_reply_to_screename={self.tweetMock.user_screen_name}
                                                                    tweet={''}
                                                                    onCancel={self.onCancel}
                                                                    onSuccess={self.onSuccess} />);
        };
        this.renderedDOM = () => ReactDOM.findDOMNode(this.component);
        this.refreshComponent();
    });

    it('renders without problems', function () {
        expect(this.component).toExist();
    });

    it("renders like expected", function() {
        let dom = this.renderedDOM();
        expect($(dom).find('#tweet-publish-'+this.id).length).toEqual(1);
        expect($(dom).find('#tweet-preview-characters-'+this.id).length).toEqual(1);
        expect($(dom).find('#tweet-preview-characters-'+this.id).length).toEqual(1);
        //Testeamos que se renderize el boton de cancelar solo si esta cargado un callback
        expect(this.component.refs.cancel).toExist();
        this.onCancel = undefined;
        this.refreshComponent();
        expect(this.component.refs.cancel).toNotExist();
    });

    it("show login modal", function() {
        App.get('sessionManager').setStub('logged', false);
        App.get('modalManager').create = sinon.spy();
        var replyButton = this.component.refs.reply;
        TestUtils.Simulate.click(replyButton);
        expect(App.get('modalManager').create.called).toEqual(true);
    });

    it("check tweets correctly", function(){
        App.get('sessionManager').setStub('logged', true);
        var self = this;
        var mockedInstance = {
            setText: function(content){
                expect(content.search(self.tweetMock.user_screen_name)).toNotEqual(-1);
                expect(content.search("@"+self.tweetMock.user_screen_name)).toEqual(0);
            }
        };
        const generateTweet = (iterations, links) => {
            let textBlock = "This is a sample of 30 chars._ ";
            let linkBlock = " http://pollasenollas.com/esto_es_una_prueba/?pollas=ok&prev=true&kk=78 ";
            let tweet = '';
            for(let i=0;i<iterations;i++){
                tweet += textBlock;
            }
            for(let i=0;i<links;i++){
                tweet += linkBlock;
            }
            return tweet;
        };

        var tweet = generateTweet(5,0);
        expect(this.component.checkTweet(tweet, mockedInstance)).toEqual(false);
        expect(this.component.checkTweet(tweet, mockedInstance)).toNotEqual(true);

        let dom = this.renderedDOM();
        expect($(dom).find("#tweet-preview-characters-"+this.id).html()).toEqual(-15);
        expect($(dom).find("#tweet-preview-characters-"+this.id).hasClass("red")).toEqual(true);
        var tweet = generateTweet(3,0);
        expect(this.component.checkTweet(tweet, mockedInstance)).toEqual(true);
        expect($(dom).find("#tweet-preview-characters-"+this.id).hasClass("red")).toEqual(false);
        expect($(dom).find("#tweet-preview-characters-"+this.id).html()).toEqual(47);
        //Cada enlace vale por 23 caracteres, ya que se acorta con un http://t.co/23232323
        var tweet = generateTweet(2,2);
        expect(this.component.checkTweet(tweet, mockedInstance)).toEqual(true);
        expect($(dom).find("#tweet-preview-characters-"+this.id).html()).toEqual(28);
        expect($(dom).find("#tweet-preview-characters-"+this.id).hasClass("red")).toEqual(false);
    });


    it('sends a tweet like expected', function(done){
        var self = this;
        this.onSuccess = (data) => {
            expect(data.in_reply_to_status_id).toEqual(self.tweetMock.id_str);
            done();
        };
        App.get('sessionManager').setStub('logged', true);
        this.refreshComponent();
        this.component.setText("La vida es maravillosa");
        var replyButton = this.component.refs.reply;
        TestUtils.Simulate.click(replyButton);
        then(()=>{
            done();
        },1000);
    });

});
