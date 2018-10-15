import $ from 'jquery';
var React     = require('react');
var ReactDOM  = require('react-dom');
var TestUtils = require('react-dom/lib/ReactTestUtils'); //I like using the Test Utils, but you can just use the DOM API instead.
var expect    = require('expect');
var assert    = require('chai').assert;
var sinon     = require('sinon');

import App from 'app/app';
require("tests/setup");

import PostAdminMenu from 'app/components/post/PostAdminMenu';
import ModalPostDelete from 'app/components/post/ModalPostDelete';

var postMock  = require("tests/lib/post_mock");

describe('PostAdminMenu', function (){

    beforeEach(function() {
        this.isGuest = true;
        this.postMock  = postMock;
        var self = this;

        this.refreshComponent = function(){
            self.component = TestUtils.renderIntoDocument(<PostAdminMenu postId={self.postMock.id}/>);
        };
        this.renderedDOM = () => ReactDOM.findDOMNode(this.component);
        this.refreshComponent();
    });

    it('renders without problems', function () {
        expect(this.component).toExist();
    });

    it("renders admin menu like expected", function() {
        let dom = this.renderedDOM();
        expect($(dom).find('.item.edit a').first().attr('href')).toNotEqual('/posts/edit/');
        expect($(dom).find('.item.edit a').first().attr('href')).toEqual('/posts/edit/' + this.postMock.id);
        expect($(dom).find('.item.edit a').first().text()).toEqual('Edit Post');
        expect($(dom).find('.item.delete').first().text()).toEqual('Delete');
    });

    it("show modal on click delete", function(){
        App.get('modalManager').create = sinon.spy();
        var delButton = this.component.refs.delete;
        TestUtils.Simulate.click(delButton);
        expect(App.get('modalManager').create.called).toEqual(true);
    });
});
