import 'core-js/fn/object/assign';
import $ from 'jquery';
import 'app/setup';
import React from 'react';
import ReactDOM from 'react-dom';
import Editor from './components/editor/Editor';

var MobileDetect = require('mobile-detect');

var md = new MobileDetect(window.navigator.userAgent);


// Render the main component into the dom
var width = $(window).width();
var withColumns = false;
if(width>800){
    withColumns = true;
}
ReactDOM.render(<Editor post={post} withColumns={withColumns} />, document.getElementById('editor-app'));
