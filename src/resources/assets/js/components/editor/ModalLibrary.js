import React from 'react';
import ReactDOM from 'react-dom';
import App from 'app/app';
import $ from 'jquery';
import {debounce} from 'app/lib/util';

const I18n = require('react-i18nify').I18n;

$.fn.modal = require('semantic-ui-modal');
$.fn.tab = require('semantic-ui-tab');
$.fn.dimmer = require('semantic-ui-dimmer');
$.fn.transition = require('semantic-ui-transition');
$.fn.transition.settings.silent = true;
$.fn.popup = require('semantic-ui-popup');
$.fn.checkbox = require('semantic-ui-checkbox');


class ModalLibrary extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            multiple: props.multiple,
            images: undefined
        };
        this.dom = undefined;
        this.clickFileUploader = this.clickFileUploader.bind(this);
        this.removeLibraryItem = this.removeLibraryItem.bind(this);
        this.render = this.render.bind(this);
        this.setSelectedImages = this.setSelectedImages.bind(this);
        this.loadLibrary = this.loadLibrary.bind(this);
    }

    componentDidMount() {
        var self = this;
        this.dom = $(ReactDOM.findDOMNode(this));
        this.loadLibrary();
        this.dom.modal({
            closable  : true,
            detachable: false,
            context: this.props.context,
            onHidden : function(){
                self.props.onUserCancel();
            }
        });
        this.dom.modal('show');
        this.dom.find('.menu .item').tab({
            onLoad: function(){
                self.dom.modal('refresh');
            }
        });
        this.dom.find("#tinymce-fileupload").change(function(){
            var files = self.dom.find('#tinymce-fileupload').get(0).files;
            self.dom.find("#uploaded-images").html("");
            for(var i=0;i<files.length;i++){
                self.showFile(files[i], i);
            }
        });
    }

    render() {
        var goButton = '';
        if(this.props.multiple){
            goButton = <div className="ui primary button" onClick={this.setSelectedImages}>{I18n.t('app.go')}</div>;
        }
        return <div className="ui library modal">
                    <div className="header">{I18n.t('app.modal_library.header')}</div>
                    <div className="content modal-content">
                        <div className="ui top attached tabular menu">
                            <a className="item active" data-tab="first">
                                {I18n.t('app.modal_library.select_from_lib')}
                                <div className="ui olive circular label" id="tinymce-library-total">0</div>
                            </a>
                            <a className="item" data-tab="second">{I18n.t('app.modal_library.upload_img')}</a>
                        </div>
                        <div className="ui bottom attached tab segment active" data-tab="first">
                            <p id="tinymce-empty-library">{I18n.t('app.modal_library.no_pictures')}</p>
                            <div id="tinymce-library-images" className="ui images"></div>
                            <div id="tinymce-library-confirmation-delete" className="ui content">
                                <div className="header">
                                    <h2>{I18n.t('app.modal_library.remove_warning_header')}</h2>
                                </div>
                                <div className="content">
                                    <img src="" />
                                    <p>{I18n.t('app.modal_library.remove_warning_p1')}</p>
                                </div>
                                <div className="actions">
                                    <button className="ui red button">{I18n.t('app.modal_library.not_at_all')}</button>
                                    <button className="ui green button">{I18n.t('app.modal_library.its_ok')}</button>
                                </div>
                            </div>
                        </div>
                        <div className="ui bottom attached tab segment" data-tab="second">
                            <button className="ui active button" id="tinymce-upload-button" onClick={this.clickFileUploader}>
                                <i className="upload icon"></i>
                                {I18n.t('app.modal_library.upload_file')}
                            </button>
                            <input id="tinymce-fileupload" type="file" name="files[]" multiple/>
                            <br/>
                            <div id="uploaded-images" className="ui images"></div>
                        </div>
                    </div>
                    <div className="actions">
                        <div className="ui cancel button">{I18n.t('app.cancel')}</div>
                        {goButton}
                    </div>
                </div>;
    }

    loadLibrary(){
        var self = this;
        var params = {
            callback: function(ret){
                if(ret.status!==200){
                    return;
                }
                var data = ret.data;
                var totalElements = data.length;
                if(totalElements<1){
                    self.dom.find("#tinymce-library-total").html(totalElements);
                    self.dom.find("#tinymce-empty-library").css('display','block');
                    return;
                }
                self.setState({images : data});
                self.dom.find("#tinymce-library-total").html(totalElements);
                self.dom.find("#tinymce-empty-library").css('display','none');
                self.dom.find("#tinymce-library-images").html("");
                for(var i=0;i<data.length;i++){
                    var element = data[i];
                    var div = self.createLibraryItem(element);
                    self.dom.find("#tinymce-library-images").append(div);
                }
                if(self.props.multiple){
                    $('.checkbox').checkbox();
                }
            }
        };
        App.get('sessionManager').getUserLibrary(params);
    }

    createLibraryItem(element){
        var self = this;
        var size = Math.round(element.size/1024);
        var extraInfo = size+'Kb';

        var div   = document.createElement('div');
        div.setAttribute('class','ui image form');
        div.setAttribute('id','tinymce-lib-img-'+element._id);
        var img = $("<img style='height:120px;padding:10px;display:inline:clear:both;' data-title='Img Info' src='"+element.thumbSrc+"' data-content='"+extraInfo+"'/>");
        $(img).popup();
        if(this.props.multiple){
            var select = $('<span class="ui right corner label"><div class="ui checkbox"><input type="checkbox" name="selection[]" value="'+element._id+'" /></div></span>');
            $(div).append(select);
        }else{
            var close = $('<a class="ui right corner label"><i class="remove icon"></i></a>');
            close.click(function(){
                self.removeLibraryItem(element);
            });
            $(div).append(close);
            $(img).click(function(){
                var img = new Image();
                img.src = element.src;
                img.onload = function(){
                    self.setImage(this);
                };
            });
        }
        $(div).append(img);
        return div;
    }

    removeLibraryItem(data){
        var self = this;
        this.dom.find("#tinymce-library-images").css('display','none');
        this.dom.find('#tinymce-library-confirmation-delete img').attr('src', data.src);
        this.dom.find('#tinymce-library-confirmation-delete').css('display','block');
        this.dom.find('#tinymce-library-confirmation-delete .ui.red.button').click(function(){
            self.dom.find("#tinymce-library-images").css('display','block');
            self.dom.find('#tinymce-library-confirmation-delete').css('display','none');
        });
        this.dom.find('#tinymce-library-confirmation-delete .ui.green.button').click(function(){
            var params = {
                id: data._id,
                success: function(){
                    self.dom.find("#tinymce-lib-img-"+data._id).remove();
                    self.dom.find("#tinymce-library-images").css('display','block');
                    self.dom.find('#tinymce-library-confirmation-delete').css('display','none');
                    debounce(function(){
                        self.loadLibrary();
                    }, 1000, 'update-library' )();
                }
            };
            App.get('sessionManager').removeLibraryItem(params);
        });
    }

    showFile(file, index){
        var self = this;
        if(file.type.indexOf('image')===-1){
            return;
        }
        var size = Math.round(file.size/1024);
        var extraInfo = file.name + ' - '+size+'Kb';
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(e) {
           var blob = e.target.result;

           var div   = document.createElement('div');
           div.setAttribute('class','ui image form');
           div.setAttribute('id','tinymce-img-'+index);
           var close = '';
           var upload = '';
           if(size>App.conf('tinymce.max_image_size')){
               var error = App.conf('tinymce.max_image_size_error');
               upload = $('<div class="ui red label image-library-error">'+error+'</div>');
               close = $('<a class="ui right red corner label"><i class="remove icon"></i></a>');
           }else{
               close = $('<a class="ui right corner label"><i class="remove icon"></i></a>');
               upload = $('<a class="ui bottom attached small button"><i class="upload icon"></i>Upload</a>');
               upload.click(function(){
                   self.uploadImg(index, file);
               });
           }
           close.click(function(){
               self.removePendingImg(index);
           });

           var img = $("<img style='height:120px;padding:10px;display:inline:clear:both;' data-title='Img Info' src='"+blob+"' data-content='"+extraInfo+"'/>");
           $(img).popup();
           $(div).append(close);
           $(div).append(img);
           $(div).append('<br/>');
           $(div).append(upload);
           self.dom.find("#uploaded-images").append(div);
        };
    }

    clickFileUploader(){
        this.dom.find("#tinymce-fileupload").click();
    }

    removePendingImg(index){
        this.dom.find("#tinymce-img-"+index).remove();
    }

    uploadImg(index, file){
        var self = this;
        this.dom.find("#tinymce-img-"+index).addClass("loading");
        var data  = new FormData();
        data.append('img', file, file.name);
        var params = {
            data: data,
            success: function (data) {
                debounce(function(){
                    self.loadLibrary();
                }, 2000, 'update-library' )();
                self.dom.find("#tinymce-img-"+index).remove();
            }
        };
        App.get('sessionManager').uploadLibraryItem(params);
    }

    setImage(img){
        this.props.callback(img);
        this.dom.modal('hide');
    }


    setSelectedImages(){
        var ids = [];
        var ret = [];
        this.dom.find('input[type=checkbox]:checked').each(function(i){
            var id = $(this).val();
            ids.push(id);
        });
        for(var i=0;i<ids.length;i++){
            var id = ids[i];
            for(var x=0;x<this.state.images.length;x++){
                let img = this.state.images[x];
                if(id===img._id){
                    ret.push(img);
                }
            }
        }
        this.props.callback(ret);
        this.dom.modal('hide');
    }
}

ModalLibrary.defaultProps = {};

export default ModalLibrary;
