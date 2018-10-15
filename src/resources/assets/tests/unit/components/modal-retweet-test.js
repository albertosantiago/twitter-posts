var React     = require('react');
var TestUtils = require('react-dom/lib/ReactTestUtils'); //I like using the Test Utils, but you can just use the DOM API instead.
var expect    = require('expect');

require("tests/setup");

import ModalRetweet from 'app/components/ModalRetweet';

describe('ModalRetweet', function (){

    beforeEach(function() {
        this.showModal = true;
        this.onUserCancel = () => {};
        this.onSuccess    = () => {};
        var self = this;
        this.refreshComponent = function(){
            self.component = TestUtils.renderIntoDocument(<ModalRetweet showModal={self.showModal} onUserCancel={self.onUserCancel} callback={self.onSuccess} />);
        };
        this.renderedDOM = () => ReactDOM.findDOMNode(this.component);
        this.refreshComponent();
    });

    it('renders without problems', function () {
        expect(this.component).toExist();
    });

});
