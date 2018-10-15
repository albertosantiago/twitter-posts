import $ from 'jquery';
import App from 'app/app';

var React     = require('react');
var ReactDOM  = require('react-dom');
var TestUtils = require('react-dom/lib/ReactTestUtils'); //I like using the Test Utils, but you can just use the DOM API instead.
var expect    = require('expect');
var assert    = require('chai').assert;
var sinon     = require('sinon');
var then      = require('tests/lib/then');
var assert    = require('chai').assert;

require("tests/setup");

import Editor from 'app/components/editor/Editor';
import TagEditor from 'app/components/editor/TagEditor';
import ConfigPostEditor from 'app/components/editor/ConfigPostEditor';
import ModalPreview from 'app/components/editor/ModalPreview';
import ModalPublish from 'app/components/editor/ModalPublish';
import ModalUnpublish from 'app/components/editor/ModalUnpublish';

var postMock  = require("tests/lib/post_mock");

describe('Editor', function (){

    beforeEach(function() {
        this.postMock = postMock;
        this.withColumns = true;
        var self = this;
        this.refreshComponent = function(){
            self.component = TestUtils.renderIntoDocument(<Editor post={self.postMock} withColumns={self.withColumns}/>);
        };
        this.renderedDOM = () => ReactDOM.findDOMNode(this.component);
        this.refreshComponent();
    });

    it('renders without problems', function () {
        expect(this.component).toExist();
    });

    it("renders like expected (desktop)", function() {
        let dom = this.renderedDOM();
        expect($(dom).find('h2').first().html()).toMatch("Edit post");
        expect($(dom).find('input[name=slug]').first().val()).toEqual(this.postMock.slug);
        expect($(dom).find('input[name=_id]').first().val()).toEqual(this.postMock.id);
        expect($(dom).find('input[name=title]').first().val()).toEqual(this.postMock.title);
        expect($(dom).find('h4').first().html()).toEqual("Actions");
        expect($(dom).find('h4').last().html()).toEqual("Tags");
        expect($(dom).find('.button').length).toEqual(5);
        /**
        Esto es para comprobar que no existen.
        var fn = () => TestUtils.findRenderedComponentWithType(this.component, ModalPublish);
        assert.throws(fn);
        **/
        //Esto para comprobar que si.
        var tagEditor = TestUtils.findRenderedComponentWithType(this.component, TagEditor);
        expect(tagEditor).toExist();
        var configEditor = TestUtils.findRenderedComponentWithType(this.component, ConfigPostEditor);
        expect(configEditor).toExist();
    });

    it("renders like expected for mobile", function() {
        this.withColumns = false;
        this.refreshComponent();
        let dom = this.renderedDOM();
        expect($(dom).find('h4').first().html()).toEqual("Setup");
        expect($(dom).find('.sixteen').length).toEqual(5);
    });

    it("render editor for new post", function(){
        this.postMock = {};
        this.refreshComponent();
        let dom = this.renderedDOM();
        expect($(dom).find('h2').first().html()).toMatch("Add new post");
        expect($(dom).find('input[name=slug]').first().val()).toEqual('');
        expect($(dom).find('input[name=_id]').first().val()).toEqual('');
        expect($(dom).find('input[name=title]').first().val()).toEqual('');
        expect($(dom).find('h4').first().html()).toEqual("Actions");
        expect($(dom).find('h4').last().html()).toEqual("Tags");
        expect($(dom).find('.button').length).toEqual(4);
    });

    it("show errors", function(){
        this.postMock = {};
        this.refreshComponent();
        let dom = this.renderedDOM();
        var saveButton = this.component.refs.save;
        TestUtils.Simulate.click(saveButton);
        expect($(dom).find('.error').length).toEqual(5);
        expect($(dom).find('.ui.label.red').length).toEqual(3);
    });

    it("show preview", function() {
        window.twttr = {
            widgets: {
                load: sinon.spy()
            }
        };
        App.get('modalManager').create = sinon.spy();
        let dom = this.renderedDOM();
        var previewButton = this.component.refs.preview;
        TestUtils.Simulate.click(previewButton);
        expect(window.twttr.widgets.load.called).toEqual(true);
        expect(App.get('modalManager').create.called).toEqual(true);
    });

    it("show publish", function(){
        let dom = this.renderedDOM();
        App.get('modalManager').create = sinon.spy();
        var publishButton = this.component.refs.pub;
        TestUtils.Simulate.click(publishButton);
        expect(App.get('modalManager').create.called).toEqual(true);
    });

    it("show unpublish", function() {
        this.postMock.tweet_id = 12121212121212121;
        this.postMock.tweet_id_str = "12121212121212121";
        this.postMock.status_str = 'published';
        this.refreshComponent();
        let dom = this.renderedDOM();
        App.get('modalManager').create = sinon.spy();
        var unPublishButton = this.component.refs.unpub;
        TestUtils.Simulate.click(unPublishButton);
        expect(App.get('modalManager').create.called).toEqual(true);
    });

    it("create new post", function() {
        this.postMock.id       = undefined;
        this.postMock.tweet_id = undefined;
        this.postMock.tweet_id_str = undefined;
        this.postMock.status_str   = undefined;
        this.refreshComponent();
        let dom = this.renderedDOM();
        expect($(dom).find('h2').first().html()).toMatch("Add new post");
        this.postMock.id = 12212121212121;
        var saveButton = this.component.refs.save;
        TestUtils.Simulate.click(saveButton);
        expect($(dom).find('h2').first().html()).toMatch("Edit post");
        expect($(dom).find('.ui.success.message .header').first().html()).toEqual("Post Saved");
    });

    it("edit post", function() {
        let dom = this.renderedDOM();
        expect($(dom).find('h2').first().html()).toMatch("Edit post");
        var saveButton = this.component.refs.save;
        TestUtils.Simulate.click(saveButton);
        expect($(dom).find('h2').first().html()).toMatch("Edit post");
        expect($(dom).find('.ui.success.message .header').first().html()).toEqual("Post Saved");
    });

    it("fail saving post", function() {
        App.get('postManager').save = function(params){
            params.done({
                status: 406,
                message: 'Bad request',
                type: 'error'
            });
        };
        let dom = this.renderedDOM();
        var saveButton = this.component.refs.save;
        TestUtils.Simulate.click(saveButton);
        expect($(dom).find('.ui.error.message .header').first().html()).toEqual("Form Error");
    });

});
