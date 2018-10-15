'use strict';

import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import interact from 'interact.js';
import App from 'app/app';
import {isMsieBrowser} from 'app/lib/util';

$.fn.popup = require('semantic-ui-popup');
require('app/vendor/fotorama-4.6.4/fotorama.dev.js');


class TwpGalleryHTMLElement extends HTMLElement {

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
        var wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'twp-gallery-wrapper');
        wrapper.style.display ='block';
        $(wrapper).css('box-sizing','border-box');
        $(wrapper).css('text-align','center');

        var oldWrapper = this.getElementsByClassName("twp-gallery-wrapper");
        if(oldWrapper.length>0){
            oldWrapper = oldWrapper[0];
            this.replaceChild(wrapper, oldWrapper);
        }else{
            this.appendChild(wrapper);
        }
        this.wrapper = wrapper;
        var mountPoint = document.createElement('div');
        if(window.__editing){
            this.wrapper.attachShadow({mode: "open"}).appendChild(mountPoint);
        }else{
            this.wrapper.appendChild(mountPoint);
        }
        this.mountPoint = mountPoint;
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
        this.root.find(".twp-gallery-wrapper").on('mousedown', function(e){
            e.preventDefault();
        });
        this.root.find(".twp-gallery-wrapper").click(function(){
            document.activeElement.blur();
            var wrapper = self.root.find(".twp-gallery-wrapper").first().get(0);
            wrapper.style.border = '4px solid #ddd';
            wrapper.style.paddingTop = "20px";
            wrapper.style.paddingBottom = "20px";
            $("html").on('keydown', removeFunction);
        });
        this.root.find(".twp-gallery-wrapper").dblclick(function(){
            window.modalManager.create('ModalImageGallery',{
                tag: self,
                callback: function(data){
                    self._setData(data);
                }
            });
        });
        $("body").click(function(event){
            if($(event.target).parents('twp-gallery').length===0){
                $("html").off('keydown', removeFunction);
                self.root.find(".twp-gallery-wrapper").css('border','0px');
                self.root.find(".twp-gallery-wrapper").css('padding-top','0px');
                self.root.find(".twp-gallery-wrapper").css('padding-bottom','0px');
            }
        });
    }

    _setProduction(){
        var self = this;
        $(function(){
            var formatedImgs = '';
            var items = self.root.find('twp-data');
            var images = [];
            for(var i=0;i<items.length;i++){
                var srcTmp = $(items[i]).attr('data-src');
                if(srcTmp.indexOf("http")===-1){
                    var cdn = App.conf('system.cdn');
                    if(cdn!==false){
                        srcTmp = cdn+''+srcTmp;
                    }
                }
                var img = {
                    src : srcTmp,
                    thumb : $(items[i]).attr('data-thumb'),
                    caption : $(items[i]).attr('data-caption'),
                    rank : $(items[i]).attr('data-rank')
                };
                images.push(img);
            }
            images.sort(function(a,b){
                if(a.rank < b.rank){
                    return -1;
                }
                if(a.rank > b.rank){
                    return 1;
                }
                return 0;
            });

            for(i=0;i<images.length;i++){
                var img = images[i];
                var caption = (img.caption===undefined) ? '': img.caption;

                var nav="";
                if(self.data.nav!=='iphone'){
                    nav="data-nav='thumbs'";
                    formatedImgs += `
                        <a href="${img.src}" data-caption="${caption}" ><img src="${img.thumb}" /></a>
                    `;

                }else{
                    formatedImgs += `
                                <img alt="${img.alt}" src="${img.src}"
                                    data-image="${img.src}"
                                    data-caption="${caption}" />`;
                }
            }
            var fullscreen = (self.data.fullscreen==='true') ? 'true': 'false';

            var tpl = `<div id="${self.data.id}-fotorama" data-allowfullscreen="${fullscreen}" style="margin:0 auto"
                                data-loop="true"
                                data-hash="true"
                                ${nav}
                                data-width="100%"
                                data-maxheight="700px"
                                data-maxwidth="100%"
                                data-ratio="800/800"
                                class="fotorama">
                            ${formatedImgs}
                        </div>`;
            self.mountPoint.innerHTML = tpl;
            $('.fotorama').fotorama()
        });
    }

    _setData(data){
        var images = data.images;
        var dataItems = '';
        images.sort(function(a,b){
            if(a.rank < b.rank){
                return -1;
            }
            if(a.rank > b.rank){
                return 1;
            }
            return 0;
         });

        for(var i=0; i<images.length;i++){
            let image = images[i];
            let caption = (image.caption!==undefined) ? image.caption:'';
            let rank = (image.rank!==undefined) ? image.rank:'0';
            let thumb = (image.thumbSrc!==undefined) ? image.thumbSrc:'';
            let attr = '';
            attr += " id='"+image._id+"'";
            attr += " data-src='"+image.src+"'";
            attr += " data-caption='"+caption+"'";
            attr += " data-rank='"+rank+"'";
            attr += " data-thumb='"+thumb+"'";
            dataItems += '<twp-data '+attr+'></twp-data>';
        }
        $(this).html(dataItems);
        var attr = {
            'data-fullscreen' : data.fullscreen,
            'data-nav'  : data.nav
        };
        $(this).attr(attr);
        this._renderTag();
    }

    _autoRemove(){
        $(this).detach();
    }
}

if(window.customElements!==undefined){
    if(window.customElements.get('twp-gallery')===undefined){
        window.customElements.define('twp-gallery', TwpGalleryHTMLElement);
    }
}

export default TwpGalleryHTMLElement;
