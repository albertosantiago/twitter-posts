'use strict';

import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import interact from 'interact.js';
import App from 'app/app';
import {isMsieBrowser} from 'app/lib/util';

$.fn.popup = require('semantic-ui-popup');
require('app/vendor/fotorama-4.6.4/fotorama.dev.js');


class TwpTweetThreadHTMLElement extends HTMLElement {

    constructor(){
        super();
        this.data = {
            id  : undefined,
            nav:  undefined,
            fullscreen: undefined
        };
        this.wrapper   = undefined;
        this.connectedCallback = this.connectedCallback.bind(this);
        this._setEdit = this._setEdit.bind(this);
        this._setProduction = this._setProduction.bind(this);
        this._renderTag  = this._renderTag.bind(this);
        this._autoRemove = this._autoRemove.bind(this);
        this._setData    = this._setData.bind(this);
        this.root = $(this);
        this.mode = 'original';
    }

    connectedCallback() {
        if(this.wrapper){
            return;
        }
        this._renderTag();
    }

    _renderTag(){
        this.data = {
            id      : $(this).attr("id"),
            nav     : $(this).attr("data-nav"),
            fullscreen : $(this).attr("data-fullscreen")
        };
        let self = this;

        if(this.mountPoint==undefined){
            var wrapper = document.createElement('div');
            wrapper.setAttribute('class', 'twp-tweet-thread-wrapper');
            wrapper.style.display ='block';
            $(wrapper).css('box-sizing','border-box');
            $(wrapper).css('text-align','center');
            this.appendChild(wrapper);
            this.wrapper = wrapper;
            var mountPoint = document.createElement('div');
            if(window.__editing){
                this.wrapper.attachShadow({mode: "open"}).appendChild(mountPoint);
            }else{
                this.wrapper.appendChild(mountPoint);
            }
            this.mountPoint = mountPoint;
        }

        if(window.__editing){
            this._setEdit();
        }else{
            this._setProduction();
        }
    }

    _setEdit(){
        var self = this;
        var removeFunction = function(event) {
            event.preventDefault();
            var key = event.keyCode || event.charCode;
            if( key == 8 || key == 46 ){
                self._autoRemove();
            }
        };
        this.mountPoint.innerHTML = '<img src="/images/wireframe.png" width="80px" />';
        this.root.find(".twp-tweet-thread-wrapper").on('mousedown', function(e){
            e.preventDefault();
        });
        this.root.find(".twp-tweet-thread-wrapper").click(function(){
            document.activeElement.blur();
            var wrapper = self.root.find(".twp-tweet-thread-wrapper").first().get(0);
            wrapper.style.border = '4px solid #ddd';
            wrapper.style.paddingTop = "20px";
            wrapper.style.paddingBottom = "20px";
            $("html").on('keydown', removeFunction);
        });
        this.root.find(".twp-tweet-thread-wrapper").dblclick(function(){
            window.modalManager.create('ModalThread',{
                tag: self,
                callback: function(data){
                    self._setData(data);
                }
            });
        });
        $("body").click(function(event){
            if($(event.target).parents('twp-tweet-thread').length===0){
                $("html").off('keydown', removeFunction);
                self.root.find(".twp-tweet-thread-wrapper").css('border','0px');
                self.root.find(".twp-tweet-thread-wrapper").css('padding-top','0px');
                self.root.find(".twp-tweet-thread-wrapper").css('padding-bottom','0px');
            }
        });
    }

    _setProduction(){
        var self = this;
        window.setTimeout(function(){
            $(self).find('.twitter-tweet').removeClass('twitter-tweet').addClass('twitter-tweet-aux');
            var firstTweet = '';
            var remainingTweets = '';
            $(self).find('twp-data twp-tweet').each(function(index, el){
                var cloned = $(el).clone();
                cloned.attr('data-mode', self.mode);
                $(cloned).find('.twitter-tweet-aux').removeClass('twitter-tweet-aux').addClass('twitter-tweet');
                if(index==0){
                    firstTweet = $(cloned).wrap('<div/>').parent().html();
                }else{
                    remainingTweets += $(cloned).wrap('<div/>').parent().html();
                }
                $(cloned).unwrap();
            });

            var tpl = `<div id="${self.data.id}-tweet-thread" class='thread-container'>
                            <div class='thread-header'>
                                <div class="ui actions buttons">
                                  <button class="ui original button">Original</button>
                                  <button class="ui images button">Images</button>
                                  <button class="ui moment button">Moment</button>
                                </div>
                                ${firstTweet}
                            </div>
                            <div class='thread-body'>
                                ${remainingTweets}
                            </div>
                            <div class="clearfix" ></div>
                        </div>`;
            self.mountPoint.innerHTML = tpl;
            $(self).find('.ui.original.button').click(function(){
                self.mode = 'original';
                self._renderTag();
            });
            $(self).find('.ui.images.button').click(function(){
                self.mode = 'images';
                self._renderTag();
            });
            $(self).find('.ui.moment.button').click(function(){
                self.mode = 'moment';
                self._renderTag();
            });
            window.twttr.widgets.load();
            twemoji.size = '72x72';
            twemoji.parse(document.body);
        },100);

    }

    _setData(data){
        var tweets = data;
        var dataItems = "";
        for(var i=0; i<tweets.length;i++){
            let tweet = tweets[i];
            let attr = '';
            attr += " id='"+tweet.id+"'";
            attr += " data-screen-name='"+tweet.screenName+"'";
            attr += " data-url='"+tweet.url+"'";
            dataItems += '<twp-tweet '+attr+'>'+tweet.body+'</twp-tweet>';
        }
        dataItems = "<twp-data>"+dataItems+"</twp-data>"
        $(this).html(dataItems);
        this._renderTag();
    }

    _autoRemove(){
        $(this).detach();
    }
}

if(window.customElements!==undefined){
    if(window.customElements.get('twp-tweet-thread')===undefined){
        window.customElements.define('twp-tweet-thread', TwpTweetThreadHTMLElement);
    }
}

export default TwpTweetThreadHTMLElement;
