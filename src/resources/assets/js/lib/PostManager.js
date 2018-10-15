import $ from 'jquery';
import {debounce} from 'app/lib/util';
import App from 'app/app';

const I18n = require('react-i18nify').I18n;

class PostManager{

    unpublish(params){
        $.post("/posts/unpublish", {
            id: params.postId
        })
        .done(function(data){
            params.done(data);
        });
    }

    publish(params){
        var requestParams = {
            'id' : params.id,
            'status' : params.status
        };
        $.post("/posts/publish", requestParams).fail(function(jqXhr){
            var data = jqXhr.responseJSON;
            params.fail(data);
        }).done(function(data){
            params.done(data);
        });
    }

    save(params){
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/posts/store',
            data: params.data
        }).done(function(data){
            params.done(data);
        });
    }

    createTweetForPublish(params){
        var tweet = params.title;
        var titleMentions  = [];
        var match    = undefined;
        var mentions = /(?:^|\W)@(\w+)(?!\w)/g;

        while (match = mentions.exec(params.title)) {
           titleMentions.push(match[1]);
        }
        var contentMentions = []
        while (match = mentions.exec(params.content)){
            if(titleMentions.indexOf(match[1])===-1){
                contentMentions.push(match[1]);
            }
        }
        contentMentions = contentMentions.unique();
        var aux = '';
        for(var i=0; i <contentMentions.length;i++){
            aux = tweet;
            aux = aux + ' @' + contentMentions[i];
            //116 es el espacio sobrante despues de meter el link.
            if(aux.length < 116){
                tweet = aux;
            }
        }
        for(var i=0; i< params.tags.length;i++){
            aux = tweet;
            aux = aux + ' ' + params.tags[i];
            //116 es el espacio sobrante despues de meter el link.
            if(aux.length < 115){
                tweet = aux;
            }
        }
        let baseURL = App.getBaseURL();
        var postURI = I18n.t('url.view_post',{slug:params.slug, id:params.id});
        tweet += baseURL+postURI;
        return tweet;
    }

    checkTweetForPublish(params){
        let debug = App.conf('post.publish_debug');

        let baseURL = App.getBaseURL();
        var postURI = I18n.t('url.view_post',{slug:params.postSlug, id:params.postId});

        var expectedLink = baseURL+postURI;
        var content = params.content;

        if(!debug){
            if(content.search(expectedLink)===-1){
                return false;
            }
        }

        var links   = /\bhttp.*\b/i;
        var tweet   = content.replace(links, 'http://t.co/SSSSSSSSSSS');
        var rest = 140 - tweet.length;
        if(rest<0){
            return false;
        }
        return true;
    }
}

export default PostManager;
