import 'core-js/fn/object/assign';
import $ from 'jquery';
import './setup.js';
import React from 'react';
import ReactDOM from 'react-dom';
import ModalPostDelete from './components/post/ModalPostDelete';
import App from './app';

$.fn.dropdown = require('semantic-ui-dropdown');
$.fn.transition = require('semantic-ui-transition');

$(function(){
    $('.filters .ui.dropdown').dropdown({
        onChange: function(value, text, $choice){
            window.location = "/posts/?filters[status]="+value;
        }
    });
    $('.ui.negative.button.remove').click(function(e){
        e.preventDefault();
        var postId = $(this).attr('data-id');
        ReactDOM.render(<ModalPostDelete postId={postId} onUserCancel={()=>{}} />, document.getElementById('modal-container'));
    });
});
