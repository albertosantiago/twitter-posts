var webpack = require('webpack');

let Mix = require('laravel-mix').config;
Mix.inTest = true;

var webpackConf = require('./webpack.config.js');


module.exports = function (config) {
  config.set({
    browsers: [ 'Chrome' ], //run in Chrome
    singleRun: true, //just run once by default
    frameworks: [ 'mocha' ], //use the mocha test framework
    autoWatch: true, // enable / disable watching files & then run tests
    logLevel: config.LOG_INFO,
    files: [
        // bower:js
        { pattern: './public/bower_components/webcomponentsjs/custom-elements-es5-adapter.js', watched:false, included:true},
        { pattern: './public/bower_components/webcomponentsjs/webcomponents-hi-sd-ce.js', watched:false, included:true},
        'resources/assets/tests/**/*.js'
     // 'tests.webpack.js' //just load this file
    ],
    preprocessors: {
        '**/*.js': [ 'webpack', 'sourcemap' ] //preprocess with webpack and our sourcemap loader
        //'tests.webpack.js': [ 'webpack', 'sourcemap' ] //preprocess with webpack and our sourcemap loader
    },
    reporters: [ 'dots' ], //report results in this format
    webpack: webpackConf,
    webpackServer: {
      noInfo: true //please don't spam the console when running in karma!
    }
  });
};
