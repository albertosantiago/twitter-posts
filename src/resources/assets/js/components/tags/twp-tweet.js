'use strict';

import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import interact from 'interact.js';
import App from 'app/app';
import {isMsieBrowser} from 'app/lib/util';
var tweetParser = require('../../lib/app-parsers').tweetParser;


class TwpTweetHTMLElement extends HTMLElement {

    constructor(){
        super();
        this.data = {
            id  : undefined
        };
        this.wrapper   = undefined;
        this.connectedCallback = this.connectedCallback.bind(this);
        this._renderTag  = this._renderTag.bind(this);
        this._setData    = this._setData.bind(this);
        this._setEdit    = this._setEdit.bind(this);
        this._setProduction = this._setProduction.bind(this);
        this._autoRemove = this._autoRemove.bind(this);
        this.root = $(this);
    }

    connectedCallback() {
        if(this.wrapper){
            return;
        }
        this._renderTag();
    }

    _renderTag(){
        let self = this;
        this.data = {
            id      : $(this).attr("id"),
            url     : $(this).attr("data-url"),
            authorName  : $(this).attr("data-author-name"),
            authorScreenName  : $(this).attr("data-author-screen-name"),
            authorImage  : $(this).attr("data-author-image"),
            text  : $(this).attr("data-text"),
            imgs  : JSON.parse($(this).attr("data-images")),
            video: $(this).attr("data-video"),
            youtube: $(this).attr("data-youtube"),
            links: $(this).attr("data-links"),
            mode: $(this).attr("data-mode")
        };
        if(this.data.mode==='moment'){
            var html = "<div class='thread-tweet-alt'>";
            var profileImg = "<img src='https://twitter-posts.com/"+this.data.authorImage+"' style='border-radius:40px;float:left;'/>";
            if(this.data.authorImage===''){
                profileImg = '<i class="user icon" style="border-radius:40px;float:left;"></i>';
            }
            html += `
                <div style="width:100%;clear:both;display:block;" class="row">
                    ${profileImg}
                    <div>
                        <p style="color:#000;#font-size:1.4em;margin-left:60px;width:100%;margin-bottom:0px;">${this.data.authorName}</p>
                        <p style="color:#999;#font-size:1.2em;margin-left:60px;width:100%;margin-top:0px;">@${this.data.authorScreenName}</p>
                    </div>
                </div>
            `;
            if(this.data.imgs.length!==0){
                if(this.data.video!==''){
                    html += "<video src='https://twitter-posts.com/"+this.data.video+"' loop controls autoplay preload/>";
                }else{
                    if(this.data.imgs.length>1){
                        var imgs = '';
                        for(var i=0;i<this.data.imgs.length;i++){
                            var img = this.data.imgs[i];
                            var imgId = 'tweet-'+this.data.id+'-img-'+i;
                            imgs += '<twp-data data-type="image" id="'+imgId+'" data-rank="'+i+'" data-src="https://twitter-posts.com'+img+'"  data-thumb="https://twitter-posts.com'+img+'" ></twp-data>';
                        }
                        var galleryId = 'twp-'+this.data.id+'-gallery';
                        html += "<twp-gallery id='"+galleryId+"' data-nav='iphone' data-fullscreen='true'>"+imgs+"</twp-gallery>";
                    }else{
                        html += "<img src='https://twitter-posts.com/"+this.data.imgs[0]+"' style='max-width:100%' />";
                    }
                }
            }
            var text = this.root.find('.tweet-alt').html();
            if(text===''){
                text = this.data.text;
            }
            html += "<div class='tweet-text'>"+text+"</div>";
            html += "</div>";
            this.root.find(".tweet").html(html);

        }else if(this.data.mode==='images'){
            var id = this.data.id;
            var pathA = id.substr(0,3);
            var pathB = id.substr(3,6);
            var src = '/img/tweets/'+pathA+'/'+pathB+'/snapshot_'+id+'.png';
            var html = '<img src="http://twitter-posts.com'+src+'" />';
            this.root.find(".tweet").html(html);
        }else{
            if(this.data.text===undefined){
                var params = {
                    url: this.data.url,
                    callback: function(data){
                        if(data.status!==404){
                            self.innerHTML = data.html;
                            var text = $.parseHTML(data.html);
                            text = $(text[0]).text();
                            self.data.text = text;
                            $(self).attr("data-text", text);
                        }
                    }
                };
                App.get('twitterManager').getOembed(params);
            }
        }

        if(window.__editing){
            this._setEdit();
        }else{
            this._setProduction();
        }
    }

    isDebug(){
        var urlString = window.location;
        var url = new URL(urlString);
        var debug = url.searchParams.get("debug");
        return (debug=='true')?true:false;
    }
    _setEdit(){}
    _setProduction(){}

    _setData(data){
        var attr = {
            'id'  : data.id,
            'data-url' : data.url,
            'data-text'  : data.text,
            'data-screen-name' : data.screenName
        };
        $(this).attr(attr);
        this._renderTag();
    }

    _autoRemove(){
        $(this).detach();
    }
}

if(window.customElements!==undefined){
    if(window.customElements.get('twp-tweet')===undefined){
        window.customElements.define('twp-tweet', TwpTweetHTMLElement);
    }
}

export default TwpTweetHTMLElement;
