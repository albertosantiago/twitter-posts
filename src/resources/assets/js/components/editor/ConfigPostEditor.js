import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

const Translate = require('react-i18nify').Translate;
const I18n = require('react-i18nify').I18n;

$.fn.checkbox = require('semantic-ui-checkbox');

class ConfigPostEditor extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            in_reply_to: this.props.in_reply_to,
            comments_status: this.props.comments_status,
            adult_content: this.props.adult_content,
            mention_notifications_status: this.props.mention_notifications_status
        };
        this.dom = undefined;
        this.handleChangeReply = this.handleChangeReply.bind(this);
        this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
    }

    shouldComponentUpdate(nextProps,nexStates){
        return true;
    }

    componentDidMount(){
        var self = this;
        this.dom = $(ReactDOM.findDOMNode(this));
        this.dom.find('.ui.checkbox').checkbox({
            onChange: function(){
                self.handleChangeCheckbox(this);
            }
        });
        this.dom.find('input[name=adult_content]').attr('checked',this.state.adult_content);
        this.dom.find('input[name=comments_status]').attr('checked',this.state.comments_status);
        this.dom.find('input[name=mention_notifications_status]').attr('checked',this.state.mention_notifications_status);
        this.dom.find('#editor_in_reply_to').change(function(){
            self.handleChangeReply(this);
        });
        this.dom.find('#editor_in_reply_to').val(this.state.in_reply_to);
    }

    render() {
        return <div id="config-editor">
                    <div className="inline field">
                       <div className="ui toggle checkbox">
                         <input type="checkbox" name="comments_status" className="hidden"/>
                         <label>{I18n.t('editor.enable_comments')}</label>
                       </div>
                    </div>
                    <div className="inline field">
                       <div className="ui toggle checkbox">
                         <input type="checkbox" name="adult_content" className="hidden" />
                         <label>{I18n.t('editor.adult_content')}</label>
                       </div>
                    </div>
                    <div className="inline field">
                       <div className="ui toggle checkbox">
                         <input type="checkbox" name="mention_notifications_status" className="hidden" />
                         <label>{I18n.t('editor.notify_mentions')}</label>
                       </div>
                    </div>
                    <br/>
                    <div className="field">
                        <label>{I18n.t('editor.in_reply_to')}</label>
                        <input type="text" name="in_reply_to" id="editor_in_reply_to" placeholder="Example: https://www.nytimes.com/..."/>
                    </div>
               </div>;
    }

    handleChangeReply(el) {
        const name = $(el).attr('name');
        const val  = $(el).val();
        this.setState({
            [name]: val
        });
        this.props.onChangeConfig(this.state);
    }

    handleChangeCheckbox(el){
        const name = $(el).attr('name');
        const val  = $(el).is(':checked');
        this.setState({
            [name]: val
        });
        this.props.onChangeConfig(this.state);
    }
}

ConfigPostEditor.defaultProps = {};

export default ConfigPostEditor;
