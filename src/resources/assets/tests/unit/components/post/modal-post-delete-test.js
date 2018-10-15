var React     = require('react');
var ReactDOM  = require('react-dom');
var TestUtils = require('react-dom/lib/ReactTestUtils'); //I like using the Test Utils, but you can just use the DOM API instead.
var expect    = require('expect');

require("tests/setup");

import ModalPostDelete from 'app/components/post/ModalPostDelete';

var postMock  = require("tests/lib/post_mock");

describe('ModalPostDelete', function (){

    beforeEach(function() {
        this.postMock  = postMock;
        this.showModal = false;

        var self = this;

        this.refreshComponent = function(){
            self.component = TestUtils.renderIntoDocument(<ModalPostDelete postId={self.postMock.id} showModal={self.showModal} onUserCancel={()=>{return}} />);
        };
        this.renderedDOM = () => ReactDOM.findDOMNode(this.component);
        this.refreshComponent();
    });

    it('renders without problems', function () {
        expect(this.component).toExist();
    });

    it('renders like expected', function () {
        let dom = this.renderedDOM();
        expect($(dom).find('.header h2').first().text()).toEqual("You are going to remove a post");
        expect($(dom).find('input[name=post_id]').first().val()).toEqual(this.postMock.id);
        expect($(dom).css('width')).toEqual('0px');
    });
});
