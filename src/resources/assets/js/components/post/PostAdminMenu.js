import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import App from 'app/app';

const I18n = require('react-i18nify').I18n;

$.fn.dropdown = require('semantic-ui-dropdown');
$.fn.transition = require('semantic-ui-transition');
$.fn.transition.settings.silent = true;

class PostAdminMenuComponent extends React.Component {

    constructor(props){
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.dom = undefined;
    }

    componentDidMount(){
        this.dom = $(ReactDOM.findDOMNode(this));
        this.dom.dropdown();
    }

    render() {
        return <div className="ui icon top right pointing dropdown button post-admin-menu">
                    <i className="wrench icon"></i>
                    <div className="menu">
                        <div className="header">{I18n.t('app.actions')}</div>
                        <div className="item edit">
                            <a href={I18n.t('url.edit_post',{id:this.props.postId})}>{I18n.t('editor.edit_post')}</a>
                        </div>
                        <div className="item delete" ref="delete" onClick={this.handleDelete}>{I18n.t('app.delete')}</div>
                    </div>
                </div>;
    }

    handleDelete(e){
        App.get('modalManager').create('ModalPostDelete', {
            postId:this.props.postId
        });
    }
};

PostAdminMenuComponent.defaultProps = {};

export default PostAdminMenuComponent ;
