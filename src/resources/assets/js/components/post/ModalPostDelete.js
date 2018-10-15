import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

const I18n = require('react-i18nify').I18n;

$.fn.modal = require('semantic-ui-modal');
$.fn.dimmer = require('semantic-ui-dimmer');
$.fn.transition = require('semantic-ui-transition');
$.fn.transition.settings.silent = true;

class ModalPostDelete extends React.PureComponent {

    constructor(props) {
        super(props);
        this.dom = undefined;
    }

    shouldComponentUpdate(nextProps,nexStates){
        return false;
    }

    componentDidMount(){
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
    }

    componentDidUpdate() {}

    render() {
        return <div className="ui post-delete small modal">
                    <div className="header">
                        <h2>{I18n.t('app.modal_post_delete.header')}</h2>
                    </div>
                    <div className="content">
                    <form action="/posts/remove" method="post" id="delete-post-form">
                        <input type="hidden" name="_token" value={this.getToken()} />
                        <input type="hidden" name="post_id" value={this.props.postId} />
                        <p>{I18n.t('app.modal_post_delete.p1')}</p>
                    </form>
                    </div>
                    <div className="actions">
                        <button className="ui cancel red button">{I18n.t('app.modal_post_delete.not_sure')}</button>
                        <input type="submit" className="ui submit green button" value={I18n.t('app.modal_post_delete.its_ok')} form="delete-post-form" onClick={this.submitForm} />
                    </div>
                </div>;
    }

    submitForm(){
        this.dom.find("#delete-post-form").submit();
    }

    getToken(){
        return $('meta[name="csrf-token"]').attr('content');
    }
}

ModalPostDelete.defaultProps = {};

export default ModalPostDelete;
