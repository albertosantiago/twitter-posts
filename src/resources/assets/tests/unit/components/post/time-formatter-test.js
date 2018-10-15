import $ from 'jquery';

var React     = require('react');
var ReactDOM  = require('react-dom');
var TestUtils = require('react-dom/lib/ReactTestUtils'); //I like using the Test Utils, but you can just use the DOM API instead.
var expect    = require('expect');
var assert    = require('chai').assert;

require("tests/setup");

import TimeFormatter from 'app/components/post/TimeFormatter';

var postMock  = require("tests/lib/post_mock");
var ownerMock = require('tests/lib/owner_mock');

describe('TimeFormatter', function (){

    beforeEach(function() {
        this.date = "2017-04-28 15:50:25";
        var self = this;

        this.refreshComponent = function(){
            self.component = TestUtils.renderIntoDocument(<TimeFormatter date={self.date} />);
        };
        this.renderedDOM = () => ReactDOM.findDOMNode(this.component);
        this.refreshComponent();
    });

    it('renders without problems', function () {
        expect(this.component).toExist();
    });

    it("renders a date like expected", function() {
        let dom = this.renderedDOM();
        expect($(dom).find('.timestamp__date--published').first().text()).toEqual("Fri Apr 28 2017 17:50:00 GMT+0200 (CEST)");
    });
});
