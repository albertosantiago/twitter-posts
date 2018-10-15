import App from 'app/app';

var React     = require('react');
var TestUtils = require('react-dom/lib/ReactTestUtils'); //I like using the Test Utils, but you can just use the DOM API instead.
var expect    = require('expect');
var ReactDOM  = require('react-dom');

require("tests/setup");

import PostGuestMenu from 'app/components/post/PostGuestMenu';
import LikeButton    from 'app/components/post/LikeButton';
import RetweetButton from 'app/components/post/RetweetButton';

var postMock  = require("tests/lib/post_mock");

describe('PostGuestMenu', function (){

    beforeEach(function() {

        this.isGuest = true;
        this.postMock  = postMock;
        var self = this;

        this.refreshComponent = function(){
            self.component = TestUtils.renderIntoDocument(<PostGuestMenu
                                                            post={self.postMock}
                                                            tweet_id_str={self.postMock.tweet_id_str}
                                                            post_id_str={self.postMock.id}
                                                            isGuest={self.isGuest} />);
        };
        this.renderedDOM = () => ReactDOM.findDOMNode(this.component);
        this.refreshComponent();
    });

    it('renders without problems', function () {
        expect(this.component).toExist();
    });

    it("render like button", function() {
        let likeButton = TestUtils.findRenderedComponentWithType(this.component, LikeButton);
        expect(likeButton).toExist();
    });

    it("render retweet buttton", function() {
        let retweetButton = TestUtils.findRenderedComponentWithType(this.component, RetweetButton);
        expect(retweetButton).toExist();
    });

    it("load tweet info", function() {
        expect(this.component.state.totalLikes).toEqual(0);
        expect(this.component.state.totalRetweets).toEqual(0);
        App.get('twitterManager').setStub('likes', 20);
        App.get('twitterManager').setStub('retweets', 10);
        this.refreshComponent();
        expect(this.component.state.totalLikes).toEqual(20);
        expect(this.component.state.totalRetweets).toEqual(10);
    });

});
