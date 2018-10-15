var React     = require('react');
var TestUtils = require('react-dom/lib/ReactTestUtils'); //I like using the Test Utils, but you can just use the DOM API instead.
var expect    = require('expect');
var sinon     = require('sinon');

require("tests/setup");

import SessionManager from 'app/lib/SessionManager';

describe('SessionManager', function () {

    beforeEach(function() {
        this.sessionManager = new SessionManager();
    });

    it('create without problems', function () {
        expect(this.sessionManager).toExist();
    });

    it('manage logged state', function () {
        expect(this.sessionManager.isLogged()).toEqual(false);
        expect(this.sessionManager.isGuest()).toEqual(true);
        this.sessionManager.setLogged(true);
        expect(this.sessionManager.isLogged()).toEqual(true);
        expect(this.sessionManager.isGuest()).toEqual(false);
        var spy = sinon.spy();
        this.sessionManager.setLogged(false);
        this.sessionManager.onLogin(spy);
        this.sessionManager.setLogged(true);
        expect(spy.called).toEqual(true);
    });

});
