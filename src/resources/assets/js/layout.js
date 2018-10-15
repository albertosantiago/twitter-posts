import $ from 'jquery';

$.fn.dropdown   = require('semantic-ui-dropdown');
$.fn.transition = require('semantic-ui-transition');
$.fn.sidebar = require('semantic-ui-sidebar');


window.refreshUserMenu = function(){
    $.get("/current-user/menu").done(function(data){
        $(".ui.top.fixed.menu.user-menu").replaceWith(data);
    });
};

$(function(){
    $("#user-menu-login-button").click(function(){
        $.oauthpopup({
            path: "/twitter/login",
            callback: function(){
                window.location = "/my-posts/new";
            }
        });
    });
    $("#user-menu-logout-button").click(function(){
        window.location = "/twitter/logout";
    });
    $('.ui.item.dropdown').dropdown();
    //Menu mobile.
    $('.ui.sidebar')
      .sidebar()
      .sidebar('attach events', '.user-menu .item');
});
