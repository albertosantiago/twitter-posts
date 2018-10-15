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

import TagEditor from 'app/components/editor/TagEditor';

var postMock  = require("tests/lib/post_mock");

describe('TagEditor', function (){

    beforeEach(function() {
        this.postMock = postMock;
        this.onChangeTags = () => {};
        var self = this;

        this.refreshComponent = function(){
            self.component = TestUtils.renderIntoDocument(<TagEditor tags={self.postMock.tags}
                                                                onChangeTags={self.onChangeTags}/>);
        };

        this.renderedDOM = () => ReactDOM.findDOMNode(this.component);
        this.refreshComponent();
    });

    it('renders without problems', function () {
        expect(this.component).toExist();
    });

    it("renders like expected", function() {
        let dom = this.renderedDOM();
        expect($(dom).find('#tags').length).toEqual(1);
    });

    it("process tags like expected", function() {
        var dom = this.renderedDOM();
        var blockText = "POLLAS EN OLLAS";
        $(dom).find('#tags').val(blockText);
        var tagEditor = this.component.refs.tags;
        TestUtils.Simulate.change(tagEditor);
        expect($(dom).find('#tags').val()).toEqual("#POLLAS #EN #OLLAS");
        expect($(dom).find('#tags').val()).toNotEqual("POLLAS EN OLLAS");
        //Aqui intentamos meter más de 120 characteres en Tags.
        var text = '';
        for(var i=0; i<10; i++){
            text += blockText;
        }
        $(dom).find('#tags').val(text);
        TestUtils.Simulate.change(tagEditor);
        expect($(dom).find('#tags').val().length).toEqual(120);
    });
});
