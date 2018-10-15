import App from 'app/app';
import $ from 'jquery';

var React     = require('react');
var TestUtils = require('react-dom/lib/ReactTestUtils'); //I like using the Test Utils, but you can just use the DOM API instead.
var expect    = require('expect');
var ReactDOM  = require('react-dom');
var assert    = require('chai').assert;
var then      = require('tests/lib/then');

require("tests/setup");

import TwpPostImgHTMLElement from 'app/components/tags/twp-post-img';

describe('Tag <twp-post-img>:', function (){

    beforeEach(function(){
        var div = $("<div id='test-container'></div>");
        $("body").append(div);
        this.appendTag = function(tag){
            $("#test-container").html("");
            document.getElementById('test-container').appendChild(tag);
        }.bind(this);

        this.getTag = function(tag){
            return $("#test-container twp-post-img").get(0);
        }.bind(this);
    });

    afterEach(function(){
        $("#test-container").detach();
    });

    it('renders like expected', function () {
        var tag = $("<twp-post-img></twp-post-img>").get(0);
        this.appendTag(tag);
        expect($(tag).find("img").first().css('padding-top')).toEqual('0px');
        expect($(tag).find("img").first().attr('src')).toEqual(undefined);
        expect($(tag).find("img").first().css('border-radius')).toEqual('0px');

        tag = $("<twp-post-img src='mierda.jpg' width='400' height='120' data-type='rounded' data-align='center' data-padding-top='40'></twp-post-img>").get(0);
        this.appendTag(tag);
        expect(tag).toExist();
        expect($(tag).find("img").first().css('padding-top')).toEqual('40px');
        expect($(tag).find("img").first().attr('src')).toEqual('mierda.jpg');
        expect($(tag).find("img").first().css('border-radius')).toEqual('10px');

        tag = $("<twp-post-img src='mierda.jpg' width='400' height='120' data-type='circular' data-align='center' data-padding-top='20'></twp-post-img>").get(0);
        this.appendTag(tag);
        expect($(tag).find("img").first().css('padding-top')).toEqual('20px');
        expect($(tag).find("img").first().css('border-radius')).toEqual('8000px');
    });
});
