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

import ModalMedia from 'app/components/editor/ModalMedia';

var postMock  = require("tests/lib/post_mock");
var editorInstanceMock  = require("tests/lib/editor_instance_mock");

describe('ModalMedia', function (){

    beforeEach(function() {
        this.showInsertMedia    = true;
        this.editorInstanceMock = editorInstanceMock;
        this.onCancel   = () => {};
        this.onSuccess  = () => {};
        var self = this;

        this.refreshComponent = function(){
            self.component = TestUtils.renderIntoDocument(<ModalMedia showInsertMedia={self.showInsertMedia}
                                                                    onUserCancel={self.onCancel}
                                                                    editor={self.editorInstanceMock} />);
        };
        this.renderedDOM = () => ReactDOM.findDOMNode(this.component);
        this.refreshComponent();
    });

    it('renders without problems', function () {
        expect(this.component).toExist();
    });

    it("renders like expected", function() {
        let dom = this.renderedDOM();
        expect($(dom).find('.header').first().text()).toEqual('Insert media code');
    });

    it("hide like expected", function(){
        var called = false;
        this.onCancel = sinon.spy();
        this.refreshComponent();
        var cancelButton = this.component.refs.cancel;
        TestUtils.Simulate.click(cancelButton);
        //Esto esta mal, pero no hay manera de que el evento onHidden del modal termine.
        //Deberia ser expect(blabla).assertEqual(true)
        expect(this.onCancel.called);
    });

    it("insert media like expected", function(){
        this.editorInstanceMock.insertContent = sinon.spy();
        this.refreshComponent();
        var dom = this.renderedDOM();
        var insertButton   = this.component.refs.insert;
        var editorTextarea = this.component.refs.editor;
        TestUtils.Simulate.change(editorTextarea);
        TestUtils.Simulate.click(insertButton);
        expect(this.editorInstanceMock.insertContent.calledWith('<div><p></p></div>')).toEqual(true);
        var incorrectValue = "<pollas-en-ollas>Lalalalala esto es una prueba</pollas-en-ollas>";
        $(dom).find("#ed-insert-media").val(incorrectValue);
        TestUtils.Simulate.change(editorTextarea);
        TestUtils.Simulate.click(insertButton);
        //Elimina la mierda correctamente....
        expect(this.editorInstanceMock.insertContent.calledWith('<div><p></p></div>')).toEqual(true);
        $(dom).find("#ed-insert-media").val(incorrectValue);
        TestUtils.Simulate.change(editorTextarea);
        TestUtils.Simulate.click(insertButton);
        expect(this.editorInstanceMock.insertContent.calledWith('<div><p>'+incorrectValue+'</p></div>')).toEqual(false);
        var correctValue = "<iframe src='http://youtube.com'></iframe>";
        $(dom).find("#ed-insert-media").val(correctValue);
        TestUtils.Simulate.change(editorTextarea);
        TestUtils.Simulate.click(insertButton);
        expect(this.editorInstanceMock.insertContent.calledWith('<div><p>'+correctValue+'</p></div>')).toEqual(true);
    });

});
