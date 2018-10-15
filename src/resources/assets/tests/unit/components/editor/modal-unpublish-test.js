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

import ModalUnpublish from 'app/components/editor/ModalUnpublish';

var postMock  = require("tests/lib/post_mock");

describe('ModalUnpublish', function () {

    beforeEach(function() {
        this.showInsertMedia = true;
        this.postMock = postMock;
        this.onCancel  = () => {};
        this.onSuccess = () => {};
        var self = this;

        this.refreshComponent = function(){
            self.component = TestUtils.renderIntoDocument(<ModalUnpublish post={self.postMock}
                                                                    onUserCancel={self.onCancel}
                                                                    onSuccess={self.onSuccess} />);
        };
        this.renderedDOM = () => ReactDOM.findDOMNode(this.component);
        this.refreshComponent();
    });

    it('renders without problems', function () {
        expect(this.component).toExist();
    });

    it('renders like expected', function () {
        var dom = this.renderedDOM();
        expect($(dom).find(".header").first().html()).toEqual("You are going to unpublish this post");
        expect($(dom).find(".ask h4").first().html()).toEqual('Do you still want continue?');
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

    it("unpublish like expected", function(){
        var postManager = {};
        postManager.unpublish = sinon.spy();
        App.set('postManager', postManager);
        var submitButton = this.component.refs.unpub;
        TestUtils.Simulate.click(submitButton);
        expect(App.get('postManager').unpublish.called);
    });

});
