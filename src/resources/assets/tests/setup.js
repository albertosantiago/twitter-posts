import TwitterManagerStub from 'tests/lib/TwitterManagerStub';
import SessionManagerStub from 'tests/lib/SessionManagerStub';
import PostManagerStub    from 'tests/lib/PostManagerStub';
import ModalManagerStub    from 'tests/lib/ModalManagerStub';
import React from 'react';
import App from 'app/app';

//Configuración de Jquery.
var jQuery = undefined;
window.$ = window.jQuery = jQuery = require("jquery");
require("./lib/jquery.oauth.stub");
require('emojionearea');


//Cargamos los servicios aqui.
App.set('sessionManager', new SessionManagerStub());
App.set('postManager', new PostManagerStub());
App.set('twitterManager', new TwitterManagerStub());
App.set('modalManager', new ModalManagerStub());
