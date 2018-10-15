import App from 'app/app';

var React     = require('react');
var TestUtils = require('react-dom/lib/ReactTestUtils'); //I like using the Test Utils, but you can just use the DOM API instead.
var expect    = require('expect');
var ReactDOM  = require('react-dom');
var assert    = require('chai').assert;
var then      = require('tests/lib/then');

require("tests/setup");

import ModalLogin from 'app/components/ModalLogin';

describe('ModalLogin', function (){

    beforeEach(function() {
        this.showModal = true;
        this.onUserCancel = () => {};
        this.onSuccess    = () => {};
        var self = this;
        this.refreshComponent = function(){
            self.component = TestUtils.renderIntoDocument(<ModalLogin showModal={self.showModal} onUserCancel={self.onUserCancel} callback={self.onSuccess} />);
        };
        this.renderedDOM = () => ReactDOM.findDOMNode(this.component);
        this.refreshComponent();
    });

    it('renders without problems', function () {
        expect(this.component).toExist();
    });

    it("render message like expected", function() {
        let dom = this.renderedDOM();
        expect($(dom).find('.header').first().text()).toNotEqual("Login with Tweeter");
        expect($(dom).find('.header').first().text()).toEqual("Login with Twitter");
        expect($(dom).find('h4').first().text()).toEqual("This action require you be logged with twitter");
    });

    it('cancel login like expected', function(){
        var exec = false;
        this.refreshComponent();
        var cancelButton = this.component.refs.cancel;
        TestUtils.Simulate.click(cancelButton);
        let dom = this.renderedDOM();
        expect($(dom).css('width'),'0px');
    });
});
