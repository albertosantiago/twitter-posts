import React from 'react';
import ReactDOM from 'react-dom';
import App from 'app/app';
import ColorPicker from 'app/components/ColorPicker';
import DragSortableList from 'react-drag-sortable'

const I18n = require('react-i18nify').I18n;

import $ from 'jquery';
import {debounce} from 'app/lib/util';

$.fn.modal    = require('semantic-ui-modal');
$.fn.dropdown = require('semantic-ui-dropdown');
$.fn.tab      = require('semantic-ui-tab');
$.fn.dimmer   = require('semantic-ui-dimmer');
$.fn.transition = require('semantic-ui-transition');
$.fn.transition.settings.silent = true;
$.fn.popup      = require('semantic-ui-popup');
$.fn.accordion  = require('semantic-ui-accordion');

if (!Array.prototype.find) {
  Array.prototype.find = function(predicate) {
    'use strict';
    if (this == null) {
      throw new TypeError('Array.prototype.find called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return value;
      }
    }
    return undefined;
  };
}


class ModalImageGallery extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            images:     undefined,
            fullscreen: undefined,
            nav:        undefined
        };

        if(props.tag!==undefined){
            var tag = props.tag;
            var images = [];
            var data = $(tag).find('twp-data');
            for(var i=0;i<data.length;i++){
                var image = {};
                image.src = $(data[i]).attr('data-src');
                image.rank = $(data[i]).attr('data-rank');
                image.caption = $(data[i]).attr('data-caption');
                image.thumbSrc = $(data[i]).attr('data-thumb');
                image._id = $(data[i]).attr('id');
                images.push(image);
            }
            this.state.images = images;
            this.state.fullscreen = ($(tag).attr("data-fullscreen")==='true')?true:false;
            this.state.nav = $(tag).attr("data-nav");
        }

        this.dom = undefined;
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCaptionChange = this.handleCaptionChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderImages = this.renderImages.bind(this);
        this.renderGalleryItem  = this.renderGalleryItem.bind(this);
        this.showLibrary  = this.showLibrary.bind(this);
        this.setImages    = this.setImages.bind(this);
        this.removeGalleryItem  = this.removeGalleryItem.bind(this);
    }

    handleInputChange(event) {
       const target = event.target;
       const value = target.type === 'checkbox' ? target.checked : target.value;
       const name = target.name;

       this.setState({
         [name]: value
       });
    }

    handleCaptionChange(event) {
       const target = event.target;
       const value = target.value;

       var imgId = $(target).attr('data-item-id');
       var images = this.state.images;

       for(var i=0;i<images.length;i++){
           if(images[i]._id === imgId){
                images[i].caption = value;
           }
       }
       this.setState({
           images: images
       });
       this.forceUpdate();
    }

    handleChangeColor(color){
        this.setState({
            borderColor: color.hex
        });
    }

    componentDidMount() {
        var self = this;
        this.dom = $(ReactDOM.findDOMNode(this));
        this.dom.modal({
            allowMultiple: true,
            context: this.props.context,
            onHidden : function(){
                self.props.onUserCancel();
            }
        });
        this.dom.modal('show');
        this.dom.find('.ui.accordion').accordion({
            onChange: function(){
                self.dom.modal('refresh');
            }
        });
        this.dom.find('.ui.dropdown.nav').dropdown({
            onChange: function(value){
                self.setState({
                    nav: value
                })
            }
        });
    }

    render() {
        var title = I18n.t('app.modal_gallery.header_new');
        if(this.props.tag!==undefined){
            title = I18n.t('app.modal_gallery.header_edit');
        }
        var imageList = this.renderImages();
        return <div className="ui insert-gallery modal">
                    <div className="header">{title}</div>
                    <div className="content modal-content">
                        <div className="ui main-gallery-panel form">
                            <div className="ui styled accordion">
                                <div className="title">
                                    <i className="dropdown icon"></i>{I18n.t('app.config')}
                                </div>
                                <div className="content">
                                    <div className="ui grid">
                                        <div className="inline field litle">
                                            <label>{I18n.t('app.modal_gallery.allow_fullscreen')}:</label>
                                        </div>
                                        <div className="inline field large">
                                            <div className="ui checkbox">
                                                <input type="checkbox" name="fullscreen" value="true" onChange={this.handleInputChange}  checked={this.state.fullscreen} />
                                                <label>&nbsp;</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ui grid">
                                        <div className="inline field litle">
                                            <label>{I18n.t('app.modal_gallery.nav_type')}:</label>
                                        </div>
                                        <div className="inline field large">
                                            <div className="ui selection dropdown nav">
                                                <input type="hidden" name="nav" value={this.state.nav} onChange={this.handleInputChange} />
                                                <i className="dropdown icon"></i>
                                                <div className="default text">{I18n.t('app.default')}</div>
                                                <div className="menu">
                                                    <div className="item" data-value="iphone">{I18n.t('app.modal_gallery.nav_type_iphone')}</div>
                                                    <div className="item" data-value="thumbs">{I18n.t('app.modal_gallery.nav_type_thumbs')}</div>
                                                </div>
                                            </div>
                                            <br/><br/>
                                        </div>
                                    </div>
                                </div>
                                <div className="title active">
                                    <i className="dropdown icon"></i>{I18n.t('app.img')}
                                </div>
                                <div className="content active">
                                    <button className="ui button primary" onClick={this.showLibrary}>{I18n.t('app.modal_gallery.load_images')}</button>
                                    <div id="img-gallery-container" className="ui form">
                                        {imageList}
                                    </div>
                                    <div className="clearfix"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="actions">
                        <div className="ui cancel button">{I18n.t('app.cancel')}</div>
                        <div className="ui primary button" onClick={this.handleSubmit}>{I18n.t('app.go')}</div>
                    </div>
                </div>;
    }

    renderImages(){
        var self = this;
        var items = [];
        var images = this.state.images;
        if((images===undefined)||(images.length===0)){
            return '';
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
        for(var i=0; i<images.length;i++){
            let img = images[i];
            let item = this.renderGalleryItem(img);
            let rank = (img.rank===undefined)? 0: img.rank;
            items.push({content:item, id:img._id, rank: rank });
        }
        var onSort = function(orderedList){
            var images = self.state.images;
            for(var i=0;i<images.length;i++){
                let id = images[i]._id;
                for(var x=0;x<orderedList.length;x++){
                    if(orderedList[x].id===id){
                        images[i].rank = orderedList[x].rank;
                        continue;
                    }
                }
            }
            self.setState({images:images});
        };
        return <DragSortableList items={items} onSort={onSort} type="grid"/>;
    }

    renderGalleryItem(element){
        var self = this;
        var size = Math.round(element.size/1024);
        var extraInfo = size+'Kb';
        var description = (element.description!==undefined)?element.description:'';
        var caption = (element.caption!==undefined)?element.caption:'';

        var remove = function(){
            self.removeGalleryItem(element);
        };

        return <div className="ui img-container" data-id={element._id}>
                <div className="ui field img">
                    <div className="ui image" id={'tinymce-gallery-'+element._id}>
                        <a className="ui right corner label" onClick={remove}><i className="remove icon"></i></a>
                        <img data-title='Img Info' src={element.thumbSrc} data-content={extraInfo} />
                    </div>
                </div>
                <div className="field">
                    <label>Caption</label>
                    <input type="text" id={"caption-"+element._id} name={"caption["+element._id+"]"} data-item-id={element._id} value={caption} onChange={this.handleCaptionChange} />
                </div>
        </div>;
    }


    showLibrary(){
        var self = this;
        App.get('modalManager').create('ModalLibrary',{
            multiple: true,
            callback: function(data){
                self.setImages(data);
            }
        }, this.dom);
    }

    handleSubmit(){
        if(this.props.editor!==undefined){
            this.insertGallery();
        }
        if(this.props.callback!==undefined){
            var images = [];
            for(var i=0; i< this.state.images.length;i++){
                let img = this.state.images[i];
                img.description = $("#description-"+img._id).val();
                img.caption = $("#caption-"+img._id).val();
                images.push(img);
            }
            this.setState({images:images});
            this.props.callback(this.state);
        }
        this.dom.modal('hide');
    }

    setImages(data){
        this.setState({images:data});
    }

    removeGalleryItem(img){
        var imagesAux = this.state.images;
        var images = [];
        for(var i=0; i<imagesAux.length;i++){
            if(imagesAux[i]._id !== img._id){
                images.push(imagesAux[i]);
            }
        }
        this.setImages(images);
    }

    insertGallery(){
        var imgs = '';
        for(var i=0; i< this.state.images.length;i++){
            let img = this.state.images[i];
            let caption = $("#caption-"+img._id).val();
            imgs += '<twp-data data-type="image" id="'+img._id+'" data-rank="'+img.rank+'" data-src="'+img.src+'" data-caption="'+caption+'" data-thumb="'+img.thumbSrc+'" ></twp-data>';
        }
        var id = this.generateGalleryId();
        var galleryCode = "<twp-gallery id='"+id+"' data-nav='"+this.state.nav+"' data-fullscreen='"+this.state.fullscreen+"'>"+imgs+"</twp-gallery>";
        this.props.editor.insertContent(galleryCode);
        this.dom.modal('hide');
    }

    generateGalleryId(){
        var randomId = new Date().getTime() + '-' + (Math.floor(Math.random() * 9999));
        return "twp-gallery-" + randomId;
    }

}

ModalImageGallery.defaultProps = {};

export default ModalImageGallery;
