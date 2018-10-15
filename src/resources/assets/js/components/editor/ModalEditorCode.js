import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

const I18n = require('react-i18nify').I18n;

$.fn.modal = require('semantic-ui-modal');
$.fn.dimmer = require('semantic-ui-dimmer');
$.fn.transition = require('semantic-ui-transition');
$.fn.transition.settings.silent = true;

var striptags = require('striptags');

class ModalEditorCode extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            sourceCode: ''
        };
        this.dom = undefined;
        this.handleChange = this.handleChange.bind(this);
        this.updateCode   = this.updateCode.bind(this);
    }

    componentDidMount() {
        var self = this;
        this.dom = $(ReactDOM.findDOMNode(this));
        this.dom.modal({
            onHidden : function(){
                self.props.onUserCancel();
            }
        });
        this.dom.modal('show');
        var sourceCode = this.props.editor.getContent({format : 'raw'});
        var div = document.createElement('div');
        $(div).html(sourceCode);
        $(div).find("#rufous-sandbox").detach();
        var html = $(div).html();
        this.setState({sourceCode:html});
    }

    render() {
        return <div className="ui show-code small modal">
            <div className="header">{I18n.t('app.html_code')}</div>
            <div className="content">
                <div>
                    <div className="ui code-editor form">
                        <textarea name="sourceCode" ref="sourceCode" value={this.state.sourceCode} onChange={this.handleChange}></textarea>
                    </div>
                </div>
            </div>
            <div className="actions">
                <div className="ui cancel button" ref="cancel">{I18n.t('app.cancel')}</div>
                <div className="ui primary button" onClick={this.updateCode} ref="update">{I18n.t('app.save_changes')}</div>
            </div>
        </div>;
    }

    handleChange(event) {
        const target = event.target;
        const value  = target.value;
        this.setState({
            sourceCode: value
        });
    }

    updateCode(){
        var editor = this.props.editor;
        var sourceCode = this.state.sourceCode;
        var div = document.createElement('div');
        div.innerHTML = sourceCode;
        var dom = this.props.editorDom;
        dom.getElementsByTagName('body')[0].innerHTML = div.innerHTML;
        this.dom.modal('hide');
    }
}

ModalEditorCode.defaultProps = {};

export default ModalEditorCode;
