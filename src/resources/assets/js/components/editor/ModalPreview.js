import React from 'react';
import $ from 'jquery';

const I18n = require('react-i18nify').I18n;

$.fn.modal = require('semantic-ui-modal');
$.fn.dimmer = require('semantic-ui-dimmer');
$.fn.transition = require('semantic-ui-transition');
$.fn.transition.settings.silent = true;

class ModalPreview extends React.PureComponent {

    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps,nexStates){
        return false;
    }

    componentDidMount() {
        var self = this;
        $('.ui.preview.modal').modal({
            context: this.props.context,
            onHidden : function(){
                self.props.onUserCancel();
            }
        });
        $('.ui.preview.modal').modal('show');
        window.setTimeout(function(){
            $('.ui.preview.modal').modal('refresh');
        },1000);
    }

    render() {
        return <div className="ui preview modal">
                <i className="close icon"></i>
                <div className="header" id="preview-title">{this.props.title}</div>
                <div className="content post single-post" id="preview-content">
                    <div dangerouslySetInnerHTML={this.createMarkup()} />
                </div>
                <div className="clearfix"></div>
                <div className="content" id="preview-tags">{this.props.tags}</div>
                <div className="actions">
                    <div className="ui black deny button" ref="cancel">
                        {I18n.t('app.close')}
                    </div>
                </div>
             </div>;
    }

    createMarkup(){
        return {__html: this.props.content};
    }
}

ModalPreview.defaultProps = {};

export default ModalPreview;
