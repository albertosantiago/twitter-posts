import TwitterManager from './lib/TwitterManager';
import SessionManager from './lib/SessionManager';
import PostManager from './lib/PostManager';
import ModalManager from './lib/ModalManager';

require("app/components/tags/twp-post-img");
require("app/components/tags/twp-example");
require("app/components/tags/twp-post-link");
require("app/components/tags/twp-post-mention");
require("app/components/tags/twp-gallery");
require("app/components/tags/twp-tweet");
require("app/components/tags/twp-tweet-thread");

import React from 'react';
import App from 'app/app';
import $ from 'jquery';
import './lang.js';
const I18n = require('react-i18nify').I18n;

var lang = App.getCurrentLanguage();
I18n.setLocale(lang);

//Configuración de Jquery.
var jQuery = undefined;
window.$ = window.jQuery = jQuery = require("jquery");

require('emojionearea');
require("./lib/jquery.oauth");

var meta = $('meta[name="env"]');
if(meta!==undefined){
    var env = meta.attr('content');
    if(env!==undefined){
        App.setEnv(env);
    }
}

$(document)
  .ready(function(){
    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });
});

//Cargamos los servicios aqui.
App.set('postManager', new PostManager());
App.set('twitterManager', new TwitterManager());
App.set('modalManager', new ModalManager());
App.set('twemoji', window.twemoji);


var sessionManager = new SessionManager();
var isGuest = ($('meta[name="app:guest"]').attr('value')==='true')?true:false;

sessionManager.setLogged(!isGuest);
sessionManager.onLogin(function(){
    refreshUserMenu();
});
App.set('sessionManager', sessionManager);
