import React from 'react';
import $ from 'jquery';
import 'emojionearea';
import {unique} from 'app/lib/util';
import App from 'app/app';

Array.prototype.unique = unique;

const I18n = require('react-i18nify').I18n;

$.fn.modal = require('semantic-ui-modal');
$.fn.dimmer = require('semantic-ui-dimmer');
$.fn.transition = require('semantic-ui-transition');
$.fn.transition.settings.silent = true;

/**
<p>Instead of publish you can also change mode:</p>
<div className="ui field">
    <p><input type="checkbox" checked='checked' />&nbsp;&nbsp;I want change this post to normal blog mode.</p>
    <p><input type="checkbox" checked='checked' />&nbsp;&nbsp;I want preserve current replies like comments.</p>
</div>
**/

class ModalUnpublish extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            post: props.post,
        };
        this.handleSubmit    = this.handleSubmit.bind(this);
    }

    shouldComponentUpdate(nextProps,nexStates){
        return false;
    }

    componentDidMount() {
        var self = this;
        $('.ui.unpublish.modal').modal({
            context: this.props.context,
            detachable: false,
            onHidden : function(){
                self.props.onUserCancel();
            }
        });
        $('.ui.unpublish.modal').modal('show');
    }

    render() {
        return <div className="ui unpublish small modal">
            <div className="header">{I18n.t('app.modal_unpublish.header')}</div>
            <div className="content">
                <p>{I18n.t('app.modal_unpublish.p1')}</p>
                <ul>
                    <li>{I18n.t('app.modal_unpublish.li1')}</li>
                    <li>{I18n.t('app.modal_unpublish.li2')}</li>
                    <li>{I18n.t('app.modal_unpublish.li3')}</li>
                </ul>
                <br/>
                <div className="ui field ask">
                    <h4>{I18n.t('app.modal_unpublish.h4')}</h4>
                </div>
            </div>
            <div className="actions">
                <div className="ui cancel button" ref="cancel">{I18n.t('app.cancel')}</div>
                <div className="ui red button" onClick={this.handleSubmit} ref="unpub">{I18n.t('app.unpublish')}</div>
            </div>
        </div>;
    }

    handleSubmit(){
        var self = this;
        App.get('postManager').unpublish({
            postId:  this.props.post.id,
            done: function(data){
                self.props.onSuccess();
            }
        });
    }
}

ModalUnpublish.defaultProps = {};

export default ModalUnpublish;
