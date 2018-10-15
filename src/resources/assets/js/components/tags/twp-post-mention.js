'use strict';

import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import interact from 'interact.js';
import App from 'app/app';
import {isMsieBrowser} from 'app/lib/util';

$.fn.popup = require('semantic-ui-popup');

class TwpPostMentionHTMLElement extends HTMLElement {

    constructor(){
        super();
        this.data = {
            id  : undefined,
            text: undefined,
            color: undefined,
            screenName: undefined
        };
        this.wrapper   = undefined;
        this.connectedCallback = this.connectedCallback.bind(this);
        this._setEdit = this._setEdit.bind(this);
        this._setProduction = this._setProduction.bind(this);
        this._renderTag  = this._renderTag.bind(this);
        this._autoRemove = this._autoRemove.bind(this);
        this._setData    = this._setData.bind(this);
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
            text    : $(this).attr("data-text"),
            color   : $(this).attr("data-color"),
            screenName : $(this).attr("data-screen-name")
        };
        if(this.data.text==''){
            this.data.text = this.data.screenName;
            if(this.data.text.charAt(0)!=='@'){
                this.data.text = '@'+this.data.text;
            }
        }
        var link    = document.createElement('a');
        if(this.data.color!==undefined){
            link.setAttribute('style','color:'+this.data.color);
        }

        var processedScreenName = this.data.screenName;
        if(processedScreenName.charAt(0)==='@'){
            processedScreenName = processedScreenName.substring(1);;
        }

        link.setAttribute('href', "https://twitter.com/"+processedScreenName);
        link.setAttribute('title', this.data.screenName+' twitter account');
        link.innerText = this.data.text;
        var wrapper = document.createElement('span');
        wrapper.appendChild(link);
        wrapper.setAttribute('class', 'twp-post-mention-wrapper');
        wrapper.style.display ='inline-block';

        var oldWrapper = this.getElementsByClassName("twp-post-mention-wrapper");
        if(oldWrapper.length>0){
            oldWrapper = oldWrapper[0];
            this.replaceChild(wrapper, oldWrapper);
        }else{
            this.appendChild(wrapper);
        }
        this.wrapper = wrapper;
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
        this.root.find(".twp-post-mention-wrapper").on('mousedown', function(e){
            e.preventDefault();
        });
        this.root.find(".twp-post-mention-wrapper").click(function(e){
            e.preventDefault();
            document.activeElement.blur();
            $("html").on('keydown', removeFunction);
            self.root.find(".twp-post-mention-wrapper").css('border','4px solid #ddd');
            self.root.find(".twp-post-mention-wrapper").css('padding','5px');
            self.root.find(".twp-post-mention-wrapper").css('width','auto');
            self.root.find(".twp-post-mention-wrapper").css('display','inline-block');
        });
        this.root.find(".twp-post-mention-wrapper").dblclick(function(){
            window.modalManager.create('ModalMention',{
                tag: self,
                callback: function(data){
                    self._setData(data);
                }
            });
        });
        $("body").click(function(event){
            if($(event.target).parents('twp-post-mention').length===0){
                $("html").off('keydown', removeFunction);
                self.root.find(".twp-post-mention-wrapper").css('border','0px');
                self.root.find(".twp-post-mention-wrapper").css('padding','0px');
                self.root.find(".twp-post-mention-wrapper").css('display','inline-block');
            }
        });
    }

    _setProduction(){
        var self = this;
        var twitterManager = App.get('twitterManager');
        if(twitterManager===undefined){
            return;
        }
        twitterManager.lookup({
            screenName: self.data.screenName,
            callback: function(data){
                if((data)&&(data.length>0)){
                    var renderUser = function(user){
                        var template = `
                            <div class="twitter-user-popup">
                                <div class='ui grid'>
                                    <div class='ui row'>
                                        <img src="${user.profile_image_url_https}" />
                                        <div class="header">
                                            <a href='https://twitter.com/${user.screen_name}' target="_blank" class="ui button primary">
                                                <i class="twitter icon"></i>
                                            </a>
                                            <h3>${user.name}</h3>
                                            <small>@${user.screen_name}</small>
                                        </div>
                                    </div>
                                    <div class'ui row content'>
                                        <p>${user.description}</p>
                                    </div>
                                    <div class="clearfix"></div>
                                </div>
                            </div>
                        `;
                        return template;
                    }
                    var user = data[0];
                    var content = renderUser(user);
                    content = App.get('twemoji').parse(content);
                    self.root.find(".twp-post-mention-wrapper").popup({
                        html : content,
                        delay: {
                            show:0,
                            hide:1500
                        }
                    });
                }
            }
        })

    }

    _setData(data){
        if(data.text===''){
            data.text = data.screen_name;
            if(data.text.charAt(0)!=='@'){
                data.text = '@'+data.text;
            }
        }
        var attr = {
            'href'  : data.href,
            'data-screen-name' : data.screen_name,
            'data-text'  : data.text,
            'data-color' : data.color
        };
        $(this).attr(attr);
        this._renderTag();
    }

    _autoRemove(){
        $(this).detach();
    }
}

if(window.customElements!==undefined){
    if(window.customElements.get('twp-post-mention')===undefined){
        window.customElements.define('twp-post-mention', TwpPostMentionHTMLElement);
    }
}

export default TwpPostMentionHTMLElement;
