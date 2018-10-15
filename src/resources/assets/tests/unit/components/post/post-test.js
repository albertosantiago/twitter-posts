import $ from 'jquery';

var React     = require('react');
var ReactDOM  = require('react-dom');
var TestUtils = require('react-dom/lib/ReactTestUtils'); //I like using the Test Utils, but you can just use the DOM API instead.
var expect    = require('expect');
var assert    = require('chai').assert;

require("tests/setup");

import Post from 'app/components/post/Post';
import PostGuestMenu from 'app/components/post/PostGuestMenu';
import PostAdminMenu from 'app/components/post/PostAdminMenu';

var postMock  = require("tests/lib/post_mock");
var ownerMock = require('tests/lib/owner_mock');

describe('Post', function (){

    beforeEach(function() {
        this.isGuest = true;
        this.isOwner = false;
        this.postMock  = postMock;
        this.ownerMock = ownerMock;
        var self = this;

        this.refreshComponent = function(){
            self.component = TestUtils.renderIntoDocument(<Post post={self.postMock}
                                                                isOwner={self.isOwner}
                                                                isGuest={self.isGuest}
                                                                owner={self.ownerMock} />);
        };
        this.renderedDOM = () => ReactDOM.findDOMNode(this.component);
        this.refreshComponent();
    });

    it('renders without problems', function () {
        expect(this.component).toExist();
    });

    it("renders a post like expected", function() {
        let dom = this.renderedDOM();
        expect($(dom).find('.content.post-content h1').text()).toEqual(postMock.title);
        expect($(dom).find('.content.post-content div.post-body').html()).toEqual(postMock.content);
        expect($(dom).find('.content.post-tags div a').length).toEqual(3);
        expect($(dom).find('.content.post-tags div a').first().text()).toEqual("#teta");
        expect($(dom).find('.content.post-tags div a').first().text()).toNotEqual("#caca");
    });

    it("render guest menu", function() {
        let guestMenu = TestUtils.findRenderedComponentWithType(this.component, PostGuestMenu);
        expect(guestMenu).toExist();
    });

    it("not render guest menu", function() {
        this.postMock.tweet_id_str = undefined;
        this.postMock.tweet_id     = undefined;
        this.refreshComponent();
        const fn = () => TestUtils.findRenderedComponentWithType(this.component, PostGuestMenu);
        assert.throws(fn);
    });

    it("render admin menu", function() {
        this.isGuest = false;
        this.isOwner = true;

        this.refreshComponent();

        let adminMenu = TestUtils.findRenderedComponentWithType(this.component, PostAdminMenu);
        expect(adminMenu).toExist();
    });
});
