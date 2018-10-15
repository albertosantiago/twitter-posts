const { mix } = require('laravel-mix');
let path      = require('path');

var inTest = mix.config.inTest;

if(!inTest){
    mix.react('resources/assets/js/editor.js',  'public/js').extract([
        'jquery',
        'app/vendor/fotorama-4.6.4/fotorama.dev.js',
        'react',
        'react-dom',
        'semantic-ui-transition',
        'semantic-ui-dropdown',
        'semantic-ui-modal',
        'semantic-ui-dimmer',
        'core-js/fn/object/assign',
        'app/lang',
        'app/setup'
    ], 'js/vendor.js');
}else{
    mix.react('resources/assets/js/editor.js',  'public/js');
}
mix.react('resources/assets/js/welcome.js', 'public/js');
mix.react('resources/assets/js/contact.js', 'public/js');
mix.react('resources/assets/js/layout.js',  'public/js');
mix.react('resources/assets/js/post.js',    'public/js');
mix.react('resources/assets/js/post_list.js', 'public/js');
mix.react('resources/assets/js/tinymce.js',   'public/js');

mix.less('resources/assets/less/app.less',  'public/css');
mix.less('resources/assets/less/tweets.less',  'public/css');
