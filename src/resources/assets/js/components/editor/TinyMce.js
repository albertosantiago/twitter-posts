import React from 'react';
import ReactDOM from 'react-dom';
import tinymce from 'tinymce/tinymce';
import 'tinymce/themes/modern/theme';
// Plugins
import 'tinymce/plugins/advlist/plugin';
import 'tinymce/plugins/autolink/plugin';
import 'tinymce/plugins/lists/plugin';
import 'tinymce/plugins/paste/plugin';
import 'tinymce/plugins/link/plugin';
import 'tinymce/plugins/charmap/plugin';
import 'tinymce/plugins/print/plugin';
import 'tinymce/plugins/preview/plugin';
import 'tinymce/plugins/anchor/plugin';
import 'tinymce/plugins/searchreplace/plugin';
import 'tinymce/plugins/visualblocks/plugin';
import 'tinymce/plugins/fullpage/plugin';
import 'tinymce/plugins/insertdatetime/plugin';
import 'tinymce/plugins/textcolor/plugin';
import 'tinymce/plugins/table/plugin';
import 'tinymce/plugins/contextmenu/plugin';
//Librerias propias
import App from 'app/app';
import {debounce} from 'app/lib/util';
import 'app/lib/tinymce/plugins/freedistraction/plugin';
import 'app/lib/tinymce/plugins/autoresize/plugin';

const I18n = require('react-i18nify').I18n;


class TinyMCEComponent extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            content: props.content,
            editorInstance: null,
            editorDom: null,
        };
        this.dom = undefined;
        this.handleInputChange = this.handleInputChange.bind(this);
        this.init              = this.init.bind(this);
    }

    componentDidMount(){
        this.dom = $(ReactDOM.findDOMNode(this));
        this.dom.find("#post-content").val(this.state.content);
        this.init();
    }

    handleInputChange(event) {
        var content = this.state.editorInstance.getContent({format : 'raw'});
        this.props.onChangeContent(content);
        this.state.editorInstance.save();
    }

    render() {
        return <div className="tinymce-component">
                <textarea name="content" id="post-content" placeholder="Write anything!"></textarea>
            </div>;
    }

    init(){
        var self   = this;
        var target = this.dom.find('#post-content').get(0);
        var extendedElements = "@[class,data-caption|data-padding-top|data-padding-bottom|data-padding-right|data-padding-left]"
        extendedElements += ",@[data-margin-top|data-margin-bottom|data-margin-left|data-margin-right]"
        extendedElements += ",@[data-border-width|data-border-color|data-type]";
        extendedElements += ",twp-post-img[src|alt|width|height|align|id|name]";
        extendedElements += ",twp-gallery[src|alt|width|height|align|id|name]";
        extendedElements += ",twp-post-link[href|title|id|name|data-text|data-color]";
        extendedElements += ",twp-post-mention[id|name|data-text|data-color|data-screen-name]";
        extendedElements += ",twp-data[*]";
        extendedElements += ",twp-tweet[id|data-screen-name,data-url]";
        extendedElements += ",twp-tweet-thread[id]";
        extendedElements += ",iframe[class|src|frameborder=0|alt|title|width|height|align|name]";

        tinymce.init({
            language: App.getCurrentLanguage(),
            entity_encoding : "raw",
            selector: '#post-content',
            content_css : '/css/app.css',
            body_class: 'single-post loading',
            extended_valid_elements: extendedElements,
            custom_elements: "twp-post-img,twp-post-link,twp-post-mention,twp-gallery,twp-data,twp-tweet,twp-tweet-thread",
            valid_children : '+p[twp-post-link|twp-post-mention|strong|a|#text],twp-gallery[twp-data],twp-tweet-thread[twp-tweet],twp-data[*]',
            autoresize_min_height: 550,
            max_width: 700,
            menubar: false,
            object_resizing : false,
            paste_data_images: true,
            remove_script_host : false,
            convert_urls : false,
            element_format: 'xhtml',
            schema: 'html5',
            skin_url: '/css/tinymce/skins/custom',
            plugins: [
                'advlist autolink lists charmap print preview anchor textcolor',
                'searchreplace visualblocks freedistraction autoresize',
                'table paste'
            ],
            toolbar1: 'insertButton | styleselect | bullist numlist outdent indent | image | forecolor backcolor | undo redo | removeformat | freedistraction showCodeButton',
            setup: function(ed){
                self.setState({editorInstance: ed});
                /*
                 * NOTA: Poner showCodeButton en el toolbar si queremos ver el código
                 */
                ed.addButton('showCodeButton', {
                    type: 'button',
                    text: '',
                    icon: ' code icon',
                    onclick: function(){
                        self.showCode();
                    }
                });
                ed.addButton('insertButton', {
                    type: 'splitbutton',
                    text: 'Insert',
                    icon: false,
                    onclick: function() {},
                    menu: [{
                        text: I18n.t('app.mention'),
                        icon: ' at icon',
                        onclick: function(){
                            self.showInsertMention();
                        }
                    },{
                        text: 'Link',
                        icon: ' linkify icon',
                        onclick: function(){
                            self.showInsertLink();
                        }
                    },{
                        text: 'Image',
                        icon: 'image',
                        onclick: function() {
                            if(App.get('sessionManager').isLogged()){
                                self.showImgLibrary();
                            }else{
                                self.showLogin();
                            }
                        }
                    },{
                        text: I18n.t('app.gallery'),
                        icon: ' icomoon icon-images',
                        onclick: function() {
                            if(App.get('sessionManager').isLogged()){
                                self.showInsertGallery();
                            }else{
                                self.showLogin();
                            }
                        }
                    }, {
                        text: 'Tweet',
                        icon: ' twitter icon',
                        onclick: function(){
                            self.showInsertTweet();
                        }
                    },/**{
                        text: 'Tweet Thread',
                        icon: ' twitter square icon',
                        onclick: function(){
                            self.showInsertTweetThread();
                        }
                    },**/{
                        text: I18n.t('app.media_code'),
                        icon: ' youtube play icon',
                        onclick: function(){
                            self.showInsertMedia();
                        }
                    }]
                });
                ed.on('init', function (args) {
                    var iframe = self.dom.find("#" + args.target.id + "_ifr");
                    var iframeWindow = iframe[0].contentWindow;
                    var iframeDom          = iframeWindow.document;
                    self.setState({editorDom: iframeDom});
                    var head = iframeDom.getElementsByTagName('head')[0];
                    var adapterScript = iframeDom.createElement('script');
                    adapterScript.setAttribute('type','text/javascript');
                    adapterScript.setAttribute('src','/bower_components/webcomponentsjs/custom-elements-es5-adapter.js');
                    var webcomponentsJS = iframeDom.createElement('script');
                    webcomponentsJS.setAttribute('type','text/javascript');
                    webcomponentsJS.setAttribute('src','/bower_components/webcomponentsjs/webcomponents-hi-sd-ce.js');
                    var manifestScript = iframeDom.createElement('script');
                    manifestScript.setAttribute('type','text/javascript');
                    manifestScript.setAttribute('src','/js/manifest.js');
                    var vendorScript = iframeDom.createElement('script');
                    vendorScript.setAttribute('type','text/javascript');
                    vendorScript.setAttribute('src','/js/vendor.js');
                    var tinyMceScript = iframeDom.createElement('script');
                    tinyMceScript.setAttribute('type','text/javascript');
                    tinyMceScript.setAttribute('src','/js/tinymce.js');
                    //Cargamos por orden adecuado....
                    adapterScript.addEventListener("load", function(event) {
                        head.appendChild(webcomponentsJS);
                    });
                    webcomponentsJS.addEventListener("load", function(event) {
                        head.appendChild(manifestScript);
                    });
                    manifestScript.addEventListener("load", function(event) {
                        head.appendChild(vendorScript);
                    });
                    vendorScript.addEventListener("load", function(event) {
                        head.appendChild(tinyMceScript);
                        iframeWindow.modalManager = App.get('modalManager');
                    });
                    head.appendChild(adapterScript);
                    //Empezamos.
                });
            },
        });
        //Mascara para subida de archivos.
        this.dom.find("#tinymce-upload-button").click(function(){
            self.clickFileUploader();
        });
        //Esto lo ponemos para autoguardar cada segundo localmente.
        window.setInterval(function(){
            self.handleInputChange();
        },1000);
    }

    showLogin(){
        App.get('modalManager').create('ModalLogin', {
            showModal: this.state.showLogin,
            callback: this.handleLogin
        });
    }

    showInsertLink(){
        App.get('modalManager').create('ModalLink', {
            editor : this.state.editorInstance
        });
    }

    showInsertMention(){
        App.get('modalManager').create('ModalMention', {
            editor : this.state.editorInstance
        });
    }

    showCode(){
        App.get('modalManager').create('ModalEditorCode', {
            editor : this.state.editorInstance,
            editorDom: this.state.editorDom
        });
    }

    showImgLibrary(){
        App.get('modalManager').create('ModalImage', {
            editor : this.state.editorInstance
        });
    }

    showInsertTweet(e) {
        App.get('modalManager').create('ModalTweet',{
            editor: this.state.editorInstance
        });
    }

    showInsertTweetThread(e) {
        App.get('modalManager').create('ModalThread',{
            editor: this.state.editorInstance
        });
    }

    showInsertMedia(e) {
        App.get('modalManager').create('ModalMedia', {
            editor :this.state.editorInstance
        });
    }

    showInsertGallery(e) {
        App.get('modalManager').create('ModalImageGallery', {
            editor :this.state.editorInstance
        });
    }
};

TinyMCEComponent.defaultProps = {};
export default TinyMCEComponent ;
