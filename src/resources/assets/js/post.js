import 'core-js/fn/object/assign';
import $ from 'jquery';
import './setup.js';
import React from 'react';
import ReactDOM from 'react-dom';
import TweetEditor from './components/TweetEditor';
import App from './app';
import {bindEvent} from 'app/lib/util';

import PostAdminMenu from './components/post/PostAdminMenu';
import PostGuestMenu from './components/post/PostGuestMenu';
import TimeFormatter from './components/post/TimeFormatter';

var windowWidth = $(window).width();

function hideEditor(id){
    $("#editor-for-"+id).html("");
}

var setTweet = function(data, inReplyId){
    var level = parseInt($('#editor-for-' + inReplyId).attr('data-level'))-1;
    var newTweet =  "<div class='tweet-box'>";
    newTweet += "<div id='tweet-container-" + data.id_str + "'>";
    newTweet += data.embed.html;
    newTweet += "</div>";
    newTweet += "<div id='responses-for-" + data.id_str + "' class='responses-container'></div>";
    newTweet += "<div id='editor-for-"+ data.id_str + "' data-level='"+level+"' data-url='"+data.embed.url+"' class='editor-container'></div>";
    newTweet += "<div class='clearfix'></div>";
    newTweet += "</div>";
    if(inReplyId!=='root'){
        $("#responses-for-"+inReplyId).append(newTweet);
    }else{
        $("#tweet-replies-container").prepend(newTweet);
    }
    window.twttr.widgets.load();
};

var refreshTweet = function(id){
    var container = document.getElementById('tweet-container-'+id);
    $(container).html('');
    var params = {
        id: id,
        container: container,
        done: function(){}
    };
    App.get('twitterManager').renderTweet(params);
};

/*
* Aqui vamos a hacer un wrapper sobre el HTML con las funcionalidades que deseamos añadir.
*/

function isDebug(){
    var urlString = window.location;
    var url = new URL(urlString);
    var debug = url.searchParams.get("debug");
    return (debug=='true')?true:false;
}

function renderTags(){
    var renderedTags = '';
    var tags = this.props.post.tags.split(" ");
    var screenName = this.props.owner.screen_name;

    for(var i=0;i<tags.length;i++){
        let tag = tags[i].substring(1);
        renderedTags += "<a href='/"+screenName+"?hashtag="+tag+"'>"+tags[i]+"</a>  ";
    }
    return renderedTags;
}

function renderPost(){
    if(isOwner){
        ReactDOM.render(
            <PostAdminMenu postId={post.id}/>,
            document.getElementsByClassName('toolbox-container')[0]
        );
    }
    if(post.tweet_id_str){
        ReactDOM.render(
            <PostGuestMenu post={post} tweet_id_str={post.tweet_id_str} post_id_str={post._id}  isGuest={true} />,
            document.getElementsByClassName('guest-menu-container')[0]);
    }
}


if(!isDebug()){
    $(function(){
        window.twttr = (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0],
                t = window.twttr || {};
            if (d.getElementById(id)) return t;
            js = d.createElement(s);
            js.id = id;
            js.src = "https://platform.twitter.com/widgets.js";
            fjs.parentNode.insertBefore(js, fjs);

            t._e = [];
            t.ready = function(f) {
                t._e.push(f);
            };
            return t;
        }
        (document, "script", "twitter-wjs"));

        window.twttr.ready(function(twttr){
            twttr.events.bind('rendered', function (event){
                var elId = $(event.target).attr('id');
                if($(event.target).parents('.post-content').length!==0){
                    if($(event.target).hasClass("twitter-tweet-error")){
                        var id = $(event.target).parents('twp-tweet').first().attr('id');
                        var img = new Image();
                        if(windowWidth<500){
                            img.src = "/img/tweets/"+id+"_mobile.png";
                        }else{
                            img.src = "/img/tweets/"+id+".png";
                        }
                        img.style.maxWidth = "100%";
                        img.onload = function(){
                            $(event.target).parent().replaceWith(img);
                        };
                    }
                    var iframe = document.getElementById(event.target.id);
                    if(iframe!==null){
                        var script = iframe.contentWindow.document.createElement("script");
                        script.type = "text/javascript";
                        script.src = "/tweets-js/tweet-emoji.js";
                        iframe.contentWindow.document.body.appendChild(script);
                    }
                    return;
                }
                $(event.target).css('margin-top','0px');
                $(event.target).css('margin-bottom','5px');
                var iframe = document.getElementById(event.target.id);
                if(iframe!==null){
                    var script = iframe.contentWindow.document.createElement("script");
                    script.type = "text/javascript";
                    script.src = "/tweets-js/tweet.js";
                    iframe.contentWindow.document.body.appendChild(script);
                }
            });
            twttr.events.bind('loaded', function (event) {});
            //Configuramos las comunicaciones.
            bindEvent(window, 'message', function (e) {
                var msg = e.data;
                var params = msg.split(":");
                var action = params[0];
                var id = params[1];

                if(action=='reply'){
                    var userScreenName = params[2];
                    var level = $('#editor-for-' + id ).attr('data-level');
                    if((level===undefined)||(level===0)){
                        var url = $('#editor-for-' + id ).attr('data-url');
                        window.open(url);
                    }else{
                        ReactDOM.render(<TweetEditor id={id} in_reply_to={id} post_id={post.id} in_reply_to_screename={post.user_screen_name} in_reply_to_reply_screename={userScreenName} tweet={''} onCancel={()=>{ hideEditor(id) }} onSuccess={(data)=>{ setTweet(data, id); hideEditor(id) }} />, document.getElementById('editor-for-' + id ));
                    }
                }
                if(action=='retweet'){
                    App.get('modalManager').create('ModalRetweet', {
                        tweet_id_str: id,
                        post_id_str : post.id,
                        callback: ()=>{}
                    });
                }
                if(action=='like'){
                    App.get('twitterManager').sendLike({
                        postId: post.id,
                        tweet_id: id,
                        type: true,
                        callback: function(data){
                            refreshTweet(id);
                        }
                    });
                }
            });
            App.get('twitterManager').getTweetInfo({
                id: post.tweet_id_str,
                callback: function(){
                    ReactDOM.render(<TweetEditor id={post.id} post_id={post.id} in_reply_to={post.tweet_id_str} in_reply_to_screename={owner.screen_name} tweet={''} onSuccess={(data)=>{ setTweet(data, 'root'); }} />, document.getElementById('tweet-reply'));
                }
            });
            renderPost();
            twemoji.size = '72x72';
            window.setTimeout(function(){
                twemoji.parse(document.body);
            },1200);
        });
    });
}
