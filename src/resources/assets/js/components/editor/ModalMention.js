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
$.fn.accordion  = require('semantic-ui-accordion');


class ModalMention extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            screen_name: "",
            text: "",
            color: "#4183c4"
        };
        if(props.tag!==undefined){
            var tag = props.tag;
            this.state = {
                id    : $(tag).attr("id"),
                text  : $(tag).attr("data-text"),
                color : $(tag).attr("data-color"),
                screen_name : $(tag).attr("data-screen-name"),
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
                 screen_name: {
                    identifier: 'screen_name',
                        rules: [{
                            type : 'empty',
                            prompt : 'Please enter a user screen name'
                        }]
                 }
            }
        };
        this.dom.find('.ui.mention-panel.form').form(settings);
    }

    handleChangeColor(color){
        this.setState({
            color: color.hex
        });
    }

    render() {
        return <div className="ui insert-mention small modal">
                    <div className="header">{I18n.t('app.modal_mention.title')} <i className="at icon"></i></div>
                    <div className="content modal-content">
                        <div className="ui mention-panel form">
                            <div className="ui grid">
                                <div className="inline field litle">
                                    <label>{I18n.t('app.screen_name')}:</label>
                                </div>
                                <div className="field large">
                                    <input type="text" name="screen_name" value={this.state.screen_name} placeholder="@DenzelWashington" onChange={this.handleInputChange}/>
                                </div>
                            </div>
                            <div className="ui grid">
                                <div className="inline field litle">
                                    <label>{I18n.t('app.text')}:</label>
                                </div>
                                <div className="field medium">
                                    <input type="text" name="text" value={this.state.text} placeholder="Denzel Washington (Optional)" onChange={this.handleInputChange}/>
                                </div>
                            </div>
                            <div className="ui grid">
                                <div className="inline field litle">
                                    <label>{I18n.t('app.modal_mentions.mention_color')}:</label>
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
        this.dom.find('.ui.mention-panel.form').form('validate form');
    }

    handleSubmit(){
        if(this.props.editor!==undefined){
            this.insertMention();
        }
        if(this.props.callback!==undefined){
            this.props.callback(this.state);
        }
        this.dom.modal('hide');
    }

    insertMention(){
        var color = '';
        if(this.state.color!=='#4183c4'){
            color = "style='color:"+this.state.color+"'";
        }
        var id = this.generateMentionId();
        var attrs = " id='"+id+"' data-screen-name='"+this.state.screen_name+"' data-text='"+this.state.text+"' data-color='"+this.state.color+"'";

        var imgCode = "&nbsp;<twp-post-mention "+attrs+"></twp-post-mention>&nbsp;";
        this.props.editor.insertContent(imgCode);
        this.dom.modal('hide');
    }

    generateMentionId(){
        var randomId = new Date().getTime() + '-' + (Math.floor(Math.random() * 9999));
        return "twp-post-mention-" + randomId;
    }
}

ModalMention.defaultProps = {};

export default ModalMention;
