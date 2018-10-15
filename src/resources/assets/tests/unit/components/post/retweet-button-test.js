import App from 'app/app';

var React     = require('react');
var TestUtils = require('react-dom/lib/ReactTestUtils'); //I like using the Test Utils, but you can just use the DOM API instead.
var expect    = require('expect');
var ReactDOM  = require('react-dom');
var assert    = require('chai').assert;
var sinon     = require('sinon');

require("tests/setup");

import RetweetButton from 'app/components/post/RetweetButton';
import ModalLogin from 'app/components/ModalLogin';
import ModalRetweet from 'app/components/ModalRetweet';

var postMock  = require("tests/lib/post_mock");

describe('RetweetButton', function (){

    beforeEach(function() {
        this.totalRetweets = 0;
        this.postMock = postMock;

        var self = this;

        this.refreshComponent = function(){
            self.component = TestUtils.renderIntoDocument(<RetweetButton post_id_str={self.postMock.id}
                                                                tweet_id_str={self.postMock.tweet_id_str}
                                                                totalRetweets={self.totalRetweets} />);
        };
        this.renderedDOM = () => ReactDOM.findDOMNode(this.component);
        this.refreshComponent();
    });

    it('renders without problems', function () {
        expect(this.component).toExist();
    });

    it("show stats", function() {
        let dom = this.renderedDOM();
        expect($(dom).find('.tweet-stat').length).toEqual(0);
        this.totalRetweets = 10;
        this.refreshComponent();
        dom = this.renderedDOM();
        expect($(dom).find('.tweet-stat').length).toEqual(1);
        expect($(dom).find('.tweet-stat').first().text()).toEqual(10);
    });

    it("show login modal", function() {
        App.get('sessionManager').setStub('logged', false);
        App.get('modalManager').create = sinon.spy();
        var retweetButton = this.component.refs.retweet;
        TestUtils.Simulate.click(retweetButton);
        expect(App.get('modalManager').create.called).toEqual(true);
    });

    it("show retweet modal", function() {
        App.get('sessionManager').setStub('logged', true);
        App.get('modalManager').create = sinon.spy();
        var dom = this.renderedDOM();
        var retweetButton = this.component.refs.retweet;
        TestUtils.Simulate.click(retweetButton);
        expect(App.get('modalManager').create.called).toEqual(true);
    });

});
