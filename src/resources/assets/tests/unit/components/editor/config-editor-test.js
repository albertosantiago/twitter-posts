import $ from 'jquery';
import App from 'app/app';
$.fn.checkbox = require('semantic-ui-checkbox');

var React     = require('react');
var ReactDOM  = require('react-dom');
var TestUtils = require('react-dom/lib/ReactTestUtils'); //I like using the Test Utils, but you can just use the DOM API instead.
var expect    = require('expect');
var assert    = require('chai').assert;
var sinon     = require('sinon');
var then      = require('tests/lib/then');

require("tests/setup");

import ConfigPostEditor from 'app/components/editor/ConfigPostEditor';

var postMock  = require("tests/lib/post_mock");

describe('ConfigPostEditor', function (){

    beforeEach(function() {
        this.postMock = postMock;
        this.onChangeConfig = () => {};
        var self = this;

        this.refreshComponent = function(){
            self.component = TestUtils.renderIntoDocument(<ConfigPostEditor in_reply_to={self.postMock.in_reply_to}
                                                                comments_status={self.postMock.comments_status}
                                                                adult_content={self.postMock.adult_content}
                                                                onChangeConfig={self.onChangeConfig}/>);
        };

        this.renderedDOM = () => ReactDOM.findDOMNode(this.component);
        this.refreshComponent();
    });

    it('renders without problems', function () {
        expect(this.component).toExist();
    });

    it('renders like expected', function () {
        var dom = this.renderedDOM();
        expect($(dom).find("#editor_in_reply_to").val()).toEqual(this.postMock.in_reply_to);
        expect($(dom).find("input[name=adult_content]").first().is(':checked')).toEqual(this.postMock.adult_content);
        expect($(dom).find("input[name=comments_status]").first().is(':checked')).toEqual(this.postMock.comments_status);
    });

    it('change config like expected', function () {
        this.onChangeConfig = sinon.spy();
        this.refreshComponent();
        var dom = this.renderedDOM();
        $(dom).find('#editor_in_reply_to').change();
        expect(this.onChangeConfig.called).toBe(true);
    });

});
