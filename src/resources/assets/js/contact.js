import $ from 'jquery';
import './setup.js';

$.fn.form = require('semantic-ui-form');
$.fn.transition = require('semantic-ui-transition');


$(function(){
    $('.ui.contact.form')
      .form({
        on: 'blur',
        fields: {
            title: {
                identifier: 'name',
                rules: [{
                    type : 'empty',
                    prompt : 'Please enter a name'
                }]
            },
            email: {
                identifier: 'email',
                rules: [{
                    type   : 'email',
                    prompt : 'Please enter a valid e-mail'
                }]
            },
            message: {
                identifier: 'message',
                rules: [{
                    type   : 'empty',
                    prompt : 'Please enter a message'
                },{
                    type   : 'minLength[10]',
                    prompt : 'Your message must be at least {ruleValue} characters'
                }]
            }
        }
    });
});
