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

import ModalTweet from 'app/components/editor/ModalTweet';

var postMock  = require("tests/lib/post_mock");
var editorInstanceMock  = require("tests/lib/editor_instance_mock");

describe('ModalTweet', function (){

    beforeEach(function() {
        this.showInsertMedia    = true;
        this.editorInstanceMock = editorInstanceMock;
        this.onCancel   = () => {};
        this.onSuccess  = () => {};
        var self = this;

        this.refreshComponent = function(){
            self.component = TestUtils.renderIntoDocument(<ModalTweet onUserCancel={self.onCancel}
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
        expect($(dom).find('.header').first().text()).toEqual('Embed Tweet');
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

    it("show error on empty tweet", function(){
        var dom = this.renderedDOM();
        var insertButton   = this.component.refs.insert;
        var editorTextarea = this.component.refs.editor;
        expect($(dom).find('.ui.error.message.transition').hasClass('hidden')).toEqual(true);
        TestUtils.Simulate.change(editorTextarea);
        TestUtils.Simulate.click(insertButton);
        expect($(dom).find('.ui.error.message.transition').hasClass('hidden')).toEqual(false);
    });

    it("show error on not correct tweet", function(){
        var dom = this.renderedDOM();
        var insertButton   = this.component.refs.insert;
        var editorTextarea = this.component.refs.editor;
        var incorrectValue = "<pollas-en-ollas>Lalalalala esto es una prueba</pollas-en-ollas>";
        expect($(dom).find('.ui.error.message.transition').hasClass('hidden')).toEqual(true);
        $(dom).find("#ed-insert-tweet").val(incorrectValue);
        TestUtils.Simulate.change(editorTextarea);
        TestUtils.Simulate.click(insertButton);
        expect($(dom).find('.ui.error.message.transition').hasClass('hidden')).toEqual(false);
    });

    it("insert correctly embed tweet by blockquote", function(){
        this.editorInstanceMock.insertContent = (data) => {console.log('mock');console.log(data)};//sinon.spy();
        this.editorInstanceMock.insertContent = sinon.spy();
        this.refreshComponent();
        var dom = this.renderedDOM();
        var insertButton   = this.component.refs.insert;
        var editorTextarea = this.component.refs.editor;

        var expectedTweet = '<twp-tweet id="853557515589742592" data-screen-name="gurrupurru" data-url="https://twitter.com/gurrupurru/status/853557515589742592"></twp-tweet>';
        var embedTweet = '<blockquote class="twitter-tweet" data-lang="en"><p lang="es" dir="ltr">Una recopilación de dibujos propios de 2016: ' +
                         '<a href="https://t.co/LYKGaVXSD0">https://t.co/LYKGaVXSD0</a> <a href="https://t.co/ucPafnTjBl">pic.twitter.com/ucPafnTjBl</a>' +
                         '</p>&mdash; Gurrupurru (@gurrupurru) <a href="https://twitter.com/gurrupurru/status/853557515589742592">April 16, 2017</a></blockquote>';

        $(dom).find("#ed-insert-tweet").val(embedTweet);
        TestUtils.Simulate.change(editorTextarea);
        TestUtils.Simulate.click(insertButton);
        expect(this.editorInstanceMock.insertContent.getCall(0).args[0]).toEqual(expectedTweet);
    });

    it("insert correctly embed tweet by url", function(){
        this.editorInstanceMock.insertContent = (data) => {console.log('mock');console.log(data)};//sinon.spy();
        this.editorInstanceMock.insertContent = sinon.spy();
        this.refreshComponent();
        var dom = this.renderedDOM();
        var insertButton   = this.component.refs.insert;
        var editorTextarea = this.component.refs.editor;

        var embedTweet = 'https://twitter.com/gurrupurru/status/853557515589742592';
        var expectedTweet = '<twp-tweet id="853557515589742592" data-screen-name="gurrupurru" data-url="https://twitter.com/gurrupurru/status/853557515589742592"></twp-tweet>';

        $(dom).find("#ed-insert-tweet").val(embedTweet);
        TestUtils.Simulate.change(editorTextarea);
        TestUtils.Simulate.click(insertButton);
        expect(this.editorInstanceMock.insertContent.getCall(0).args[0]).toEqual(expectedTweet);
    });
});
