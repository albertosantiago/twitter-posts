'use strict';

import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import interact from 'interact.js';
import App from 'app/app';
import {isMsieBrowser} from 'app/lib/util';


class TwpPostLinkHTMLElement extends HTMLElement {

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
            text    : $(this).attr("data-text"),
            color   : $(this).attr("data-color"),
            href    : $(this).attr("href"),
            title   : $(this).attr("title")
        };
        this.innerHTML = "";
        var link    = document.createElement('a');
        if(this.data.color!==undefined){
            link.setAttribute('style','color:'+this.data.color);
        }
        link.setAttribute('href', this.data.href);
        link.setAttribute('title', this.data.title);
        link.innerText = this.data.text;
        var wrapper = document.createElement('span');
        wrapper.appendChild(link);
        wrapper.setAttribute('class', 'twp-post-link-wrapper');
        var oldWrapper = this.getElementsByClassName("twp-post-link-wrapper");
        if(oldWrapper.length>0){
            oldWrapper = oldWrapper[0];
            this.replaceChild(wrapper, oldWrapper);
        }else{
            this.appendChild(wrapper);
        }
        this.wrapper = wrapper;
        if(window.__editing){
            this._setEdit();
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
        this.root.find(".twp-post-link-wrapper").on('mousedown', function(e){
            e.preventDefault();
        });
        this.root.find(".twp-post-link-wrapper").click(function(){
            document.activeElement.blur();
            $("html").on('keydown', removeFunction);
            self.root.find(".twp-post-link-wrapper").css('border','4px solid #ddd');
            self.root.find(".twp-post-link-wrapper").css('padding','5px');
            self.root.find(".twp-post-link-wrapper").css('width','auto');
            self.root.find(".twp-post-link-wrapper").css('display','inline-block');
            var wrapper = self.root.find(".twp-post-link-wrapper").first().get(0);
        });
        this.root.find(".twp-post-link-wrapper").dblclick(function(){
            window.modalManager.create('ModalLink',{
                tag: self,
                callback: function(data){
                    self._setData(data);
                }
            });
        });
        $("body").click(function(event){
            if($(event.target).parents('twp-post-link').length===0){
                $("html").off('keydown', removeFunction);
                self.root.find(".twp-post-link-wrapper").css('border','0px');
                self.root.find(".twp-post-link-wrapper").css('padding','0px');
                self.root.find(".twp-post-link-wrapper").css('display','inline');
            }
        });
    }

    _setData(data){
        var attr = {
            'href'  : data.href,
            'title' : data.title,
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
    if(window.customElements.get('twp-post-link')===undefined){
        window.customElements.define('twp-post-link', TwpPostLinkHTMLElement);
    }
}

export default TwpPostLinkHTMLElement;
