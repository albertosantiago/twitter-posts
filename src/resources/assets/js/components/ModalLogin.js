import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import App from 'app/app';

$.fn.modal = require('semantic-ui-modal');
$.fn.dimmer = require('semantic-ui-dimmer');
$.fn.transition = require('semantic-ui-transition');
$.fn.transition.settings.silent = true;

class ModalLogin extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            showIframe: false
        }
        this.dom = undefined;
        this.sessionManager = App.get('sessionManager');
        this.handleLogin    = this.handleLogin.bind(this);
        this.handleCallback = this.handleCallback.bind(this);
        this.handleCancel   = this.handleCancel.bind(this);
    }

    shouldComponentUpdate(nextProps,nexStates){
        return false;
    }

    componentDidMount() {
        var self = this;
        this.dom = $(ReactDOM.findDOMNode(this));
        this.dom.modal({
            detachable: false,
            onHidden : function(){
                self.props.onUserCancel();
            }
        }).modal('show');
    }

    render() {
        return <div className="ui login small modal">
                <i className="close icon"></i>
                <div className="header">Login with Twitter</div>
                <div className="content">
                    <h4>This action require you be logged with twitter</h4>
                    <div>
                        <p>Please, go to twitter and you will be able to complete the action as soon as you comeback</p>
                        <p className='twitter-icon-container'><i className="twitter icon big blue">&nbsp;</i></p>
                    </div>
                </div>
                <div className="actions">
                    <div className="ui black deny button" ref="cancel" onClick={this.handleCancel}>
                        Close
                    </div>
                    <div className="ui blue twitter-login button" ref="login" onClick={this.handleLogin}>Login&nbsp;&nbsp;<i className="twitter icon"></i></div>
                </div>
             </div>;
    }

    handleLogin(){
        var self = this;
        $.oauthpopup({
            path: "/twitter/login",
            callback: self.handleCallback
        });
    }

    handleCallback(){
        this.sessionManager.setLogged(true);
        this.props.callback();
        this.dom.modal('hide');
    }

    handleCancel(){
        this.dom.modal('hide');
    }
}

ModalLogin.defaultProps = {};

export default ModalLogin;
