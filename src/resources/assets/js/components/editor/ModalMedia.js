import React from 'react';
import $ from 'jquery';

const I18n = require('react-i18nify').I18n;

$.fn.modal = require('semantic-ui-modal');
$.fn.dimmer = require('semantic-ui-dimmer');
$.fn.transition = require('semantic-ui-transition');

var striptags = require('striptags');

class ModalMedia extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            mediaCode: ''
        };
        this.handleMediaChange = this.handleMediaChange.bind(this);
        this.insertMedia = this.insertMedia.bind(this);
    }

    componentDidMount() {
        var self = this;
        $('.ui.insert-media.modal').modal({
            onHidden : function(){
                self.props.onUserCancel();
            }
        });
        $('.ui.insert-media.modal').modal('show');
    }

    render() {
        return <div className="ui insert-media small modal">
            <div className="header">{I18n.t('app.modal_media.header')}</div>
            <div className="content">
                <div>
                    <div className="ui publish form">
                        <textarea name="ed-insert-media" id="ed-insert-media" placeholder={I18n.t('app.modal_media.placeholder')} value={this.state.mediaCode} onChange={this.handleMediaChange} ref="editor" />
                    </div>
                </div>
            </div>
            <div className="actions">
                <div className="ui cancel button" ref="cancel">{I18n.t('app.cancel')}</div>
                <div className="ui primary button" onClick={this.insertMedia} ref="insert">{I18n.t('app.go')}</div>
            </div>
        </div>;
    }

    handleMediaChange(event) {
        const target = event.target;
        const value  = target.value;
        this.setState({
            mediaCode: value
        });
    }

    insertMedia(){
        var media = striptags(this.state.mediaCode, '<iframe>');
        this.props.editor.insertContent("<div><p>"+media+"</p></div>");
        $('.ui.insert-media.modal').modal('hide');
    }
}

ModalMedia.defaultProps = {};

export default ModalMedia;
