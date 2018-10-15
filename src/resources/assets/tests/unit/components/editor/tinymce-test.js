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

import TinyMce from 'app/components/editor/TinyMce';
import ModalTweet   from 'app/components/editor/ModalTweet';
import ModalMedia   from 'app/components/editor/ModalMedia';
import ModalImage from 'app/components/editor/ModalImage';

var postMock  = require("tests/lib/post_mock");

/*
Aqui nos tenemos que conformar con testear todo menos TinyMCE, que no podemos cargarlo ya que los tests se hacen sobre elementos
que no estan renderizados en el DOM.
*/
describe('TinyMCE', function (){

    beforeEach(function() {
        this.postMock = postMock;
        this.onChangeContent = () => {};

        var self = this;
        this.refreshComponent = function(){
            self.component = TestUtils.renderIntoDocument(<TinyMce content={self.postMock.content} onChangeContent={self.onChangeContent} />);
        };
        this.renderedDOM = () => ReactDOM.findDOMNode(this.component);
        this.refreshComponent();
    });

    it('renders without problems', function () {
        expect(this.component).toExist();
    });

    it("renders like expected", function() {
        let dom = this.renderedDOM();
        expect($(dom).find('textarea').length).toEqual(1);
    });

    it("show insert media modal like expected", function() {
        App.get('modalManager').create = sinon.spy();
        this.component.showInsertMedia();
        expect(App.get('modalManager').create.called).toEqual(true);
    });

    it("show insert tweet modal like expected", function() {
        App.get('modalManager').create = sinon.spy();
        this.component.showInsertTweet();
        expect(App.get('modalManager').create.called).toEqual(true);
    });

    it("show image library like expected", function() {
        App.get('modalManager').create = sinon.spy();
        this.component.showImgLibrary();
        expect(App.get('modalManager').create.called).toEqual(true);
    });
});
