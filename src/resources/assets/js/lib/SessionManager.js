import $ from 'jquery';
import {debounce} from 'app/lib/util';

var services = {};


class SessionManager{

    constructor(){
        this.callbacks = {
            'onlogin':[]
        };
        this.logged = false;
    }

    isLogged(){
        return this.logged;
    }

    isGuest(){
        return !this.logged;
    }

    setLogged(logged){
        this.logged = logged;
        if(this.logged){
            for(let i=0; i<this.callbacks.onlogin.length;i++){
                this.callbacks.onlogin[i]();
            }
        }
    }

    onLogin(callback){
        this.callbacks.onlogin.push(callback);
    }

    uploadLibraryItem(params){
        $.ajax({
            url: '/uploads/add',
            data: params.data,
            processData: false,
            type: 'POST',
            contentType: false,
            success: function (data) {
                params.success(data);
            }
        });
    }

    removeLibraryItem(params){
        $.getJSON('/uploads/remove/'+params.id, function(){
            params.success();
        });
    }

    getUserLibrary(params){
        $.getJSON("/uploads/", function(data){
            params.callback(data);
        });
    }
};

export default SessionManager;
