import $ from 'jquery';

/**
* Aqui tenemos nuestro IOC container.
**/

var services = {};
var conf = {

    defaultEnv: 'prod',
    currentEnv: undefined,

    local:{
        system: {
            cdn: false
        },
        post:{
            publish_debug: false
        },
        errors: {
            silent: true,
            debug: false
        },
        tinymce: {
            max_image_size: 2048,
            max_image_size_error: "Max 2M exceeded"
        }
    },
    prod:{
        system: {
            cdn: 'https://d3lfd75ag0kklu.cloudfront.net'
        },
        post:{
            publish_debug: false
        },
        errors: {
            silent: true,
            debug: false
        },
        tinymce: {
            max_image_size: 2048,
            max_image_size_error: "Max 2M exceeded"
        }
    }
};

var App = {
    get: function(service){
        return services[service];
    },
    set: function(key, service){
        services[key] = service;
        return;
    },
    conf: function(key){
        var currentConf = this.getCurrentConf();
        key = key.split(".");
        var tmpCnf = currentConf[key[0]];
        if(key.length>1){
            tmpCnf = tmpCnf[key[1]];
        }
        if(key.length>2){
            tmpCnf = tmpCnf[key[2]];
        }
        return tmpCnf;
    },
    getBaseURL: function(){
        var pathArray = window.location.href.split( '/' );
        var protocol = pathArray[0];
        var host = pathArray[2];
        var url = protocol + '//' + host;
        return url;
    },
    getCurrentConf(){
        if(conf.currentEnv!==undefined){
            return conf[conf.currentEnv];
        }else{
            return conf[conf.defaultEnv];
        }
    },
    setEnv: function(env){
        conf.currentEnv = env;
    },
    getCurrentLanguage: function(){
        return $("html").first().attr("lang");
    }
};

export default App;
