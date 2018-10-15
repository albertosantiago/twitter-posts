import React from 'react';
import ReactDOM from 'react-dom';
import App from 'app/app';
import ColorPicker from 'app/components/ColorPicker';

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
$.fn.accordion  = require('semantic-ui-form');


class ModalLink extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            href: "",
            title: "",
            text: "",
            color: "#4183c4"
        };
        if(props.tag!==undefined){
            var tag = props.tag;
            this.state = {
                id    : $(tag).attr("id"),
                href  : $(tag).attr("href"),
                title : $(tag).attr("title"),
                text  : $(tag).attr("data-text"),
                color : $(tag).attr("data-color")
            };
        }
        this.dom = undefined;
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSave   = this.handleSave.bind(this);
        this.handleChangeColor = this.handleChangeColor.bind(this);
    }

    handleInputChange(event) {
       const target = event.target;
       const value = target.type === 'checkbox' ? target.checked : target.value;
       const name = target.name;

       this.setState({
         [name]: value
       });
    }


    componentDidMount() {
        var self = this;
        this.dom = $(ReactDOM.findDOMNode(this));
        this.dom.modal({
            detachable: false,
            context: this.props.context,
            onHidden : function(){
                self.props.onUserCancel();
            }
        });
        this.dom.modal('show');
        var submitForm = this.handleSubmit;
        var settings = {
            inline : true,
            on     : 'blur',
            onSuccess: submitForm,
            fields : {
                 title: {
                    identifier: 'title',
                        rules: [{
                            type : 'empty',
                            prompt : 'Please enter a title'
                        }]
                 },
                 href: {
                      identifier: 'href',
                      rules: [{
                          type   : 'url',
                          prompt : 'Please enter a correct url'
                      }]
                 },
                 text: {
                    identifier: 'text',
                        rules: [{
                            type : 'empty',
                            prompt : 'Please enter a text for the link'
                        }]
                 }
            }
        };
        this.dom.find('.ui.link-panel.form').form(settings);
    }

    handleChangeColor(color){
        this.setState({
            color: color.hex
        });
    }

    render() {
        return <div className="ui insert-link small modal">
                    <div className="header">Insert Link <i className="linkify icon"></i></div>
                    <div className="content modal-content">
                        <div className="ui link-panel form">
                            <div className="ui grid">
                                <div className="inline field litle">
                                    <label>{I18n.t('app.url')}:</label>
                                </div>
                                <div className="field large">
                                    <input type="text" name="href" value={this.state.href} placeholder="http://google.whatever" onChange={this.handleInputChange}/>
                                </div>
                            </div>
                            <div className="ui grid">
                                <div className="inline field litle">
                                    <label>{I18n.t('app.title')}:</label>
                                </div>
                                <div className="field large">
                                    <input type="text" name="title" value={this.state.title} placeholder={I18n.t('app.modal_link.title_placeholder')} onChange={this.handleInputChange}/>
                                </div>
                            </div>
                            <div className="ui grid">
                                <div className="inline field litle">
                                    <label>{I18n.t('app.text')}:</label>
                                </div>
                                <div className="field medium">
                                    <input type="text" name="text" value={this.state.text} placeholder={I18n.t('app.modal_link.text_placeholder')} onChange={this.handleInputChange}/>
                                </div>
                            </div>
                            <div className="ui grid">
                                <div className="inline field litle">
                                    <label>{I18n.t('app.text_color')}:</label>
                                </div>
                                <div className="inline field tiny">
                                    <ColorPicker color={this.state.color} onChange={this.handleChangeColor}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="actions">
                        <div className="ui cancel button">{I18n.t('app.cancel')}</div>
                        <div className="ui primary button" onClick={this.handleSave}>{I18n.t('app.go')}</div>
                    </div>
                </div>;
    }

    handleSave(e){
        this.dom.find('.ui.link-panel.form').form('validate form');
    }

    handleSubmit(){
        if(this.props.editor!==undefined){
            this.insertLink();
        }
        if(this.props.callback!==undefined){
            this.props.callback(this.state);
        }
        this.dom.modal('hide');
    }

    insertLink(){
        var color = '';
        if(this.state.color!=='#4183c4'){
            color = "style='color:"+this.state.color+"'";
        }
        var id = this.generateLinkId();
        var attrs = " id='"+id+"' href='"+this.state.href+"' title='"+this.state.title+"' data-text='"+this.state.text+"' data-color='"+this.state.color+"'";
        var link  = "<a href='"+this.state.href+"' title='"+this.state.title+"' target='_blank' rel='nofollow'>"+this.state.text+"</a>";
        var imgCode = "&nbsp;<twp-post-link "+attrs+">"+link+"</twp-post-link>&nbsp;";
        this.props.editor.insertContent(imgCode);
        this.dom.modal('hide');
    }

    generateLinkId(){
        var randomId = new Date().getTime() + '-' + (Math.floor(Math.random() * 9999));
        return "twp-post-link-" + randomId;
    }
}

ModalLink.defaultProps = {};

export default ModalLink;
