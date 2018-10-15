import $ from 'jquery';
import {debounce} from 'app/lib/util';

const I18n = require('react-i18nify').I18n;

var services = {};


class TwitterManager{

    constructor(){}

    getExpectedTweetSize(params){
        var content = params.content;
        var links   = /\bhttp.*\b/i;
        var tweet   = content.replace(links, 'http://t.co/SSSSSSSSSSS');
        return tweet.length;
    }

    getRemainingCharsForTweet(params){
        var size = this.getExpectedTweetSize(params);
        return (140 - size);
    }

    getTweetInfo(params){
        window.twttr.widgets.createTweet(
            params.id,
            document.getElementById('tweet-post-mask')
        ).then(function(el){
            if(el===undefined){
                if(params.onNotExist!==undefined){
                    return params.onNotExist();
                }
                return;
            }

            var retweets = $(el.contentWindow.document)
                                .find('.TweetAction--retweetEdge')
                                .first()
                                .find(".TweetAction-stat").text();

            var likes = $(el.contentWindow.document)
                                .find('.TweetAction--heartEdge')
                                .first()
                                .find(".TweetAction-stat").text();
            params.callback({
                likes: likes,
                retweets: retweets
            });
        });
    }

    renderTweet(params){
        var options = {
            conversation:'none'
        };
        window.twttr.widgets.createTweet(
            params.id,
            params.container,
            options
        ).then(function(el){
            params.done(el);
        });
    }

    sendLike(params){
        $.post("/tweets/like", {
            post_id: params.postId,
            tweet_id: params.tweet_id,
            type: params.type
        }).done(function(data){
            if(params.callback!==undefined){
                params.callback(data);
            }
        });
    }

    sendTweet(params){
        var self = this;
        var data = {
            'in_reply_id' : params.in_reply_to,
            'post_id': params.post_id,
            'status' : params.tweet
        };
        $.post("/tweets/reply", data ).done(function(res){
            if(res.type==='tweet'){
                params.success(res.data);
            }
        }).fail(function(e){
            params.error(e);
        });
    }

    sendRetweet(params){
        var self = this;
        var data = {
            'retweeted_id' : params.retweeted_id,
            'post_id': params.post_id,
            'status' : params.status
        };
        $.post("/tweets/retweet", data ).done(function(res){
            if(res.type==='success'){
                params.success(res.data);
            }else{
                params.error(res);
            }
        }).fail(function(e){
            params.error(e);
        });
    }

    getOembed(params){
        $.getJSON("/tweets/oembed?url="+params.url, function(data){
            params.callback(data);
        });
    }

    lookup(params){
        $.getJSON("/twitter/lookup/user?screenName="+params.screenName, function(data){
            params.callback(data);
        });
    }
}

export default TwitterManager;
