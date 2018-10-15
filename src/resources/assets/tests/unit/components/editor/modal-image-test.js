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

import ModalImage from 'app/components/editor/ModalImage';

var editorInstanceMock  = require("tests/lib/editor_instance_mock");

describe('ModalImage', function (){

    beforeEach(function() {
        this.editorInstanceMock = editorInstanceMock;
        var self = this;
        this.refreshComponent = function(){
            self.component = TestUtils.renderIntoDocument(<ModalImage
                                                                onUserCancel={self.onUserCancel}
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
        expect($(dom).find('.header').first().html()).toEqual("Insert Image");
        expect($(dom).find('.button').length).toEqual(3);
        expect($(dom).find('div').length).toEqual(63);
    });

    //Esto no se si es posible testearlo.... no se pueden cargar imagenes desde
    //javascript al servidor sin el consentimiento del usuario.
    it("preload images like expected", function(){});


});
