import App from 'app/app';

var React     = require('react');
var TestUtils = require('react-dom/lib/ReactTestUtils'); //I like using the Test Utils, but you can just use the DOM API instead.
var expect    = require('expect');
var ReactDOM  = require('react-dom');
var assert    = require('chai').assert;
var sinon     = require('sinon');

require("tests/setup");

import LikeButton from 'app/components/post/LikeButton';
import ModalLogin from 'app/components/ModalLogin';

var postMock = require("tests/lib/post_mock");

describe('LikeButton', function (){

    beforeEach(function() {

        this.totalLikes = 0;
        this.postMock   = postMock;

        var self = this;

        this.refreshComponent = function(){
            self.component = TestUtils.renderIntoDocument(<LikeButton post_id_str={self.postMock.id}
                                                                    tweet_id_str={self.postMock.tweet_id_str}
                                                                    totalLikes={self.totalLikes} />);
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
        this.totalLikes = 10;
        this.refreshComponent();
        dom = this.renderedDOM();
        expect($(dom).find('.tweet-stat').length).toEqual(1);
        expect($(dom).find('.tweet-stat').first().text()).toEqual(10);
    });

    it("show login modal", function() {
        App.get('sessionManager').setStub('logged', false);
        App.get('modalManager').create = sinon.spy();

        var likeButton = this.component.refs.like;
        TestUtils.Simulate.click(likeButton);

        expect(App.get('modalManager').create.called).toEqual(true);
    });

    it("send successfully like", function() {
        App.get('sessionManager').setStub('logged', true);
        var dom = this.renderedDOM();
        var likeButton = this.component.refs.like;

        expect($(dom).find('.red.item').length).toEqual(0);
        TestUtils.Simulate.click(likeButton);
        expect($(dom).find('.red.item').length).toEqual(1);
    });
});
