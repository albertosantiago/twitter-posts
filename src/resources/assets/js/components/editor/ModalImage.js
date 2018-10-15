import React from 'react';
import ReactDOM from 'react-dom';
import App from 'app/app';
import ColorPicker from 'app/components/ColorPicker';

import $ from 'jquery';
import {debounce} from 'app/lib/util';

const I18n = require('react-i18nify').I18n;

$.fn.modal    = require('semantic-ui-modal');
$.fn.dropdown = require('semantic-ui-dropdown');
$.fn.tab      = require('semantic-ui-tab');
$.fn.dimmer   = require('semantic-ui-dimmer');
$.fn.transition = require('semantic-ui-transition');
$.fn.transition.settings.silent = true;
$.fn.popup      = require('semantic-ui-popup');
$.fn.accordion  = require('semantic-ui-accordion');


class ModalImage extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            src: '',
            type: 'normal',
            alt: '',
            align: '',
            caption: '',
            width: '',
            height: '',
            constraint: true,
            currentImg: false,
            borderWidth: '',
            borderColor: "#fcb900",
            paddingTop:    '',
            paddingBottom: '',
            paddingRight:  '',
            paddingLeft:   '',
            marginTop:     '',
            marginBottom:  '',
            marginRight:   '',
            marginLeft:    '',
            tag: props.tag
        };

        if(props.tag!==undefined){
            var tag = props.tag;
            this.state = {
                constraint: true,
                src   : $(tag).attr("src"),
                alt      : $(tag).attr("alt"),
                align    : $(tag).attr("align"),
                width    : $(tag).attr("width"),
                height   : $(tag).attr("height"),
                caption  : $(tag).attr("data-caption"),
                type     : $(tag).attr("data-type"),
                marginTop    : $(tag).attr("data-margin-top"),
                marginBottom : $(tag).attr("data-margin-bottom"),
                marginLeft   : $(tag).attr("data-margin-left"),
                marginRight  : $(tag).attr("data-margin-right"),
                paddingTop    : $(tag).attr("data-padding-top"),
                paddingBottom : $(tag).attr("data-padding-bottom"),
                paddingLeft   : $(tag).attr("data-padding-left"),
                paddingRight  : $(tag).attr("data-padding-right"),
                borderWidth  : $(tag).attr("data-border-width"),
                borderColor  : $(tag).attr("data-border-color")
            };
            const img = new Image();
            img.src = this.state.src;
            this.state.currentImg = img;
        }

        this.dom = undefined;
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleResize      = this.handleResize.bind(this);
        this.insertImage  = this.insertImage.bind(this);
        this.showLibrary  = this.showLibrary.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeColor = this.handleChangeColor.bind(this);
    }

    handleResize(event){
        const target = event.target;
        const value  = target.type === 'checkbox' ? target.checked : target.value;
        const name   = target.name;

        var tmp = {
            width  : this.state.width,
            height : this.state.height,
            constraint : this.state.constraint
        };
        tmp[name] = value;

        var relation = undefined;
        if(tmp.width>700){
            tmp.width = 700;
        }
        if(((name=='constraint')&(value==true))
            ||(this.state.constraint)){
           if(this.state.currentImg){
               relation = this.state.currentImg.naturalWidth/this.state.currentImg.naturalHeight;
           }
        }
        if(relation!==undefined){
            tmp.height = tmp.width/relation;
        }
        this.setState({
            width: tmp.width,
            height: tmp.height,
            constraint: tmp.constraint
        });
    }

    handleInputChange(event) {
       const target = event.target;
       const value = target.type === 'checkbox' ? target.checked : target.value;
       const name = target.name;

       this.setState({
         [name]: value
       });
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
            detachable: false,
            context: this.props.context,
            onHidden : function(){
                self.props.onUserCancel();
            }
        });
        this.dom.modal('show');
        this.dom.find('.ui.accordion').accordion();
        this.dom.find('.ui.dropdown.align').dropdown({
            onChange: function(value){
                self.setState({
                    align: value
                })
            }
        });
        this.dom.find('.ui.dropdown.type').dropdown({
            onChange: function(value){
                self.setState({
                    type: value
                })
            }
        });
    }

    render() {
        return <div className="ui insert-image modal">
                    <div className="header">{I18n.t('app.modal_image.title')}</div>
                    <div className="content modal-content">
                        <div className="ui main-library-panel form">
                            <div className="ui styled accordion">
                                <div className="title active">
                                    <i className="dropdown icon"></i>{I18n.t('app.img')}
                                </div>
                                <div className="content active">
                                    <div className="ui grid">
                                        <div className="inline field litle">
                                            <label>Src:</label>
                                        </div>
                                        <div className="inline field large">
                                            <div className="ui action input">
                                                <input type="text" name="src" value={this.state.src} placeholder="http://whatever.com/whatever.png" onChange={this.handleInputChange}/>
                                                <button className="ui right labeled icon button" onClick={this.showLibrary}>
                                                   <i className="archive icon"></i>
                                                   {I18n.t('app.library')}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ui grid">
                                        <div className="inline field litle">
                                            <label>{I18n.t('app.description')}:</label>
                                        </div>
                                        <div className="inline field large">
                                            <input type="text" name="alt" value={this.state.alt} placeholder={I18n.t('app.modal_image.desc_placeholder')} onChange={this.handleInputChange}/>
                                        </div>
                                    </div>
                                    <div className="ui grid">
                                        <div className="inline field litle">
                                            <label>{I18n.t('app.caption')}:</label>
                                        </div>
                                        <div className="inline field large">
                                            <input type="text" name="caption" value={this.state.caption} placeholder={I18n.t('app.modal_image.caption_placeholder')} onChange={this.handleInputChange}/>
                                        </div>
                                    </div>
                                    <div className="ui grid">
                                        <div className="inline field litle">
                                            <label>{I18n.t('app.type')}:</label>
                                        </div>
                                        <div className="inline field large">
                                            <div className="ui selection dropdown type">
                                                <input type="hidden" name="type" value={this.state.type} onChange={this.handleInputChange} />
                                                <i className="dropdown icon"></i>
                                                <div className="default text">Normal</div>
                                                <div className="menu">
                                                    <div className="item" data-value="normal">Normal</div>
                                                    <div className="item" data-value="rounded">{I18n.t('app.rounded')}</div>
                                                    <div className="item" data-value="circular">{I18n.t('app.circular')}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ui grid">
                                        <div className="inline field litle">
                                            <label>{I18n.t('app.align')}:</label>
                                        </div>
                                        <div className="inline field large">
                                            <div className="ui selection dropdown align">
                                                <input type="hidden" name="align" value={this.state.align} onChange={this.handleInputChange} />
                                                <i className="dropdown icon"></i>
                                                <div className="default text">{I18n.t('app.align')}</div>
                                                <div className="menu">
                                                    <div className="item" data-value="center">{I18n.t('app.center')}</div>
                                                    <div className="item" data-value="left">{I18n.t('app.left')}</div>
                                                    <div className="item" data-value="right">{I18n.t('app.right')}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ui grid">
                                        <div className="inline field litle">
                                            <label>{I18n.t('app.modal_image.proportions')}:</label>
                                        </div>
                                        <div className="inline field tiny">
                                            <input type="text" name="width" value={this.state.width} placeholder={I18n.t('app.width')} onChange={this.handleResize}/>
                                        </div>
                                        <div className="inline field tiny">
                                            <input type="text" name="height" value={this.state.height} placeholder={I18n.t('app.height')} onChange={this.handleResize} />
                                        </div>
                                        <div className="inline field constrait-checkbox">
                                            <input type="checkbox" value="1" checked={this.state.constraint} name="constraint" onChange={this.handleResize}/>
                                            <p>{I18n.t('app.modal_image.constraint_proportions')}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="title">
                                    <i className="dropdown icon"></i>{I18n.t('app.spaces')}
                                </div>
                                <div className="content">
                                    <br/>
                                    <div className="ui grid">
                                        <div className="inline field litle">
                                            <label>{I18n.t('app.border')}:</label>
                                        </div>
                                        <div className="inline field tiny">
                                            <input type="text" name="borderWidth" value={this.state.borderWidth} placeholder={I18n.t('app.width')} onChange={this.handleInputChange}/>
                                        </div>
                                        <div className="inline field tiny">
                                            <ColorPicker color={this.state.borderColor} onChange={this.handleChangeColor}/>
                                        </div>
                                    </div>
                                    <div className="ui grid">
                                        <div className="inline field litle">
                                            <label>{I18n.t('app.margin')}:</label>
                                        </div>
                                        <div className="inline field tiny">
                                            <input type="text" name="marginTop" value={this.state.marginTop} placeholder={I18n.t('app.top')} onChange={this.handleInputChange}/>
                                        </div>
                                        <div className="inline field tiny">
                                            <input type="text" name="marginBottom" value={this.state.marginBottom} placeholder={I18n.t('app.bottom')} onChange={this.handleInputChange} />
                                        </div>
                                        <div className="inline field tiny">
                                            <input type="text" name="marginLeft" value={this.state.marginLeft} placeholder={I18n.t('app.left')} onChange={this.handleInputChange} />
                                        </div>
                                        <div className="inline field tiny">
                                            <input type="text" name="marginRight" value={this.state.marginRight} placeholder={I18n.t('app.right')} onChange={this.handleInputChange} />
                                        </div>
                                    </div>
                                    <div className="ui grid">
                                        <div className="inline field litle">
                                            <label>{I18n.t('app.padding')}:</label>
                                        </div>
                                        <div className="inline field tiny">
                                            <input type="text" name="paddingTop" value={this.state.paddingTop} placeholder={I18n.t('app.top')}  onChange={this.handleInputChange} />
                                        </div>
                                        <div className="inline field tiny">
                                            <input type="text" name="paddingBottom" value={this.state.paddingBottom} placeholder={I18n.t('app.bottom')} onChange={this.handleInputChange}  />
                                        </div>
                                        <div className="inline field tiny">
                                            <input type="text" name="paddingLeft" value={this.state.paddingLeft} placeholder={I18n.t('app.left')}  onChange={this.handleInputChange}  />
                                        </div>
                                        <div className="inline field tiny">
                                            <input type="text" name="paddingRight" value={this.state.paddingRight} placeholder={I18n.t('app.right')}  onChange={this.handleInputChange}  />
                                        </div>
                                    </div>
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

    handleSubmit(){
        if(this.props.editor!==undefined){
            this.insertImage();
        }
        if(this.props.callback!==undefined){
            this.props.callback(this.state);
        }
        this.dom.modal('hide');
    }

    insertImage(){
        var attr = '';
        attr += "src='"+this.state.src+"'";
        attr += " width='"+this.state.width+"'";
        attr += " height='"+this.state.height+"'";
        attr += " alt='"+this.state.alt+"'";
        attr += " data-type='"+this.state.type+"'";
        attr += " data-caption='"+this.state.caption+"'";
        attr += " data-border-width='"+this.state.borderWidth+"'";
        attr += " data-border-color='"+this.state.borderColor+"'";
        attr += " data-padding-top='"+this.state.paddingTop+"'" ;
        attr += " data-padding-bottom='"+this.state.paddingBottom+"'" ;
        attr += " data-padding-left='"+this.state.paddingLeft+"'" ;
        attr += " data-padding-right='"+this.state.paddingRight+"'" ;
        attr += " data-margin-top='"+this.state.marginTop+"'" ;
        attr += " data-margin-bottom='"+this.state.marginBottom+"'" ;
        attr += " data-margin-left='"+this.state.marginLeft+"'" ;
        attr += " data-margin-right='"+this.state.marginRight+"'" ;
        attr += " align='"+this.state.align+"'";
        attr += " id='"+this.generateImageId()+"'";

        var imgCode = "<twp-post-img "+attr+"></twp-post-img>";
        this.props.editor.insertContent(imgCode);
        this.dom.modal('hide');
    }

    setImage(img){
        var relation = img.naturalWidth/img.naturalHeight;
        var width  = img.naturalWidth;
        var height = img.naturalHeight;

        if(width>700){
            width = 700;
            height = width/relation;
        }

        this.setState({currentImg: img});
        this.setState({width: width});
        this.setState({height: height});
        this.setState({src:img.src});
        this.dom.find('.menu .item').tab('change tab', 'first');
    }

    showLibrary(){
        var self = this;
        App.get('modalManager').create('ModalLibrary',{
            callback: function(data){
                self.setImage(data);
            }
        }, this.dom);
    }

    generateImageId(){
        var randomId = new Date().getTime() + '-' + (Math.floor(Math.random() * 9999));
        return "twp-post-img-" + randomId;
    }
}

ModalImage.defaultProps = {};

export default ModalImage;
