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

import FeaturedImagePicker from 'app/components/editor/FeaturedImagePicker';


describe('Featured Image Picker', function (){

    beforeEach(function() {
        this.imgSrc = "";
        var self = this;
        this.refreshComponent = function(){
            self.component = TestUtils.renderIntoDocument(<FeaturedImagePicker
                                                                onChange={self.onChange}
                                                                img={self.imgSrc} />);
        };
        this.renderedDOM = () => ReactDOM.findDOMNode(this.component);
        this.refreshComponent();
    });

    it('renders without problems', function () {
        expect(this.component).toExist();
    });

    it("renders like expected", function() {
        //Primero sin imagen cargada.
        let dom = this.renderedDOM();
        expect($(dom).find('.button').length).toEqual(1);
        expect($(dom).find('div.featured-image-container').length).toEqual(1);
        expect($(dom).find('img').length).toEqual(0);
        //Ahora con imagen cargada
        this.imgSrc = "http://twitter-posts.com/img/mierda.jpg";
        this.refreshComponent();
        dom = this.renderedDOM();
        expect($(dom).find('img').length).toEqual(1);
    });

    it("launch modal library like expected", function(){
        var modalManager = {};
        modalManager.create = sinon.spy();
        App.set('modalManager', modalManager);
        this.refreshComponent();
        var pickerButton = this.component.refs.pick;
        TestUtils.Simulate.click(pickerButton);
        expect(App.get('modalManager').create.called).toEqual(true);
    });

    it("change image like expected", function(){
        let testImgSrc = 'https://twitter-posts-com/img/mierda.jpg';
        let testImg = new Image();
        testImg.src = testImgSrc;
        let modalManagerStub = {};
        modalManagerStub.create = function(name, params){
            params.callback(testImg);
        };
        var sessionManagerStub = {};
        sessionManagerStub.isGuest = function(){
            return false;
        }
        App.set('sessionManager', sessionManagerStub);
        App.set('modalManager', modalManagerStub);
        this.onCreate = sinon.spy();
        this.onChange = sinon.spy();
        this.refreshComponent();
        let dom = this.renderedDOM();
        //Primero sin darle al boton
        expect($(dom).find('img').length).toEqual(0);
        let pickerButton = this.component.refs.pick;
        TestUtils.Simulate.click(pickerButton);
        //Comprobamos que fue cargada correctamente.
        expect($(dom).find('img').attr('src')).toEqual(testImgSrc);
        expect(this.onCreate.called).toEqual(false);
        expect(this.onChange.called).toEqual(true);
    });
    
});
