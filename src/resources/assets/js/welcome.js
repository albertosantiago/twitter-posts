import $ from 'jquery';
import './setup.js';
require("./lib/jquery.oauth");

$(function(){
    $("#login-button").click(function(){
        $.oauthpopup({
            path: "/twitter/login",
            callback: function(){
                window.location = "/my-posts/new";
            }
        });
    });
});
