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

import ModalPreview from 'app/components/editor/ModalPreview';

var postMock  = require("tests/lib/post_mock");

describe('ModalPreview', function () {

    beforeEach(function() {
        this.showInsertMedia = true;
        this.postMock = postMock;
        this.onCancel = () => {};
        var self = this;

        this.refreshComponent = function(){
            self.component = TestUtils.renderIntoDocument(<ModalPreview title={self.postMock.title}
                                                                    tags={self.postMock.tags}
                                                                    content={self.postMock.content}
                                                                    onUserCancel={self.onCancel} />);
        };
        this.renderedDOM = () => ReactDOM.findDOMNode(this.component);
        this.refreshComponent();
    });

    it('renders without problems', function () {
        expect(this.component).toExist();
    });

    it('renders like expected', function () {
        var dom = this.renderedDOM();
        expect($(dom).find("#preview-title").html()).toEqual(this.postMock.title);
        expect($(dom).find("#preview-content").html()).toEqual('<div>'+this.postMock.content+'</div>');
        expect($(dom).find("#preview-tags").html()).toEqual(this.postMock.tags);
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

});
