import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import App from 'app/app';

$.fn.modal = require('semantic-ui-modal');
$.fn.dimmer = require('semantic-ui-dimmer');
$.fn.transition = require('semantic-ui-transition');
$.fn.transition.settings.silent = true;

class RetweetButtonComponent extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            post_id_str: this.props.post_id_str,
            tweet_id_str: this.props.tweet_id_str,
            retweeted: false,
        };
        this.sessionManager = App.get('sessionManager');
        this.modalManager   = App.get('modalManager');
        this.handleClick = this.handleClick.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showModalRetweet = this.showModalRetweet.bind(this);
    }

    componentDidMount(){}

    render() {
        var retweetStatus = '';
        if(this.state.retweeted){
            retweetStatus = 'green';
        }
        var totalRetweets = '';
        if(this.props.totalRetweets>0){
            totalRetweets = <span className='tweet-stat'>{this.props.totalRetweets}</span>;
        }
        return <div>
                <a className={retweetStatus + " item"} onClick={() => this.handleClick()} ref="retweet">
                    <i className="retweet icon"></i>{totalRetweets}Retweet
                </a>
            </div>;
    }

    handleClick(){
        var self = this;
        if(this.sessionManager.isGuest()){
            return this.showLogin();
        }
        this.showModalRetweet();
    }

    handleSubmit(){
        $.post("/posts/retweet", {
            post_id: this.props.post_id_str,
            retweet: !this.state.retweeted
        }).done(function(data){
            self.setState({retweeted: !self.state.retweeted});
        });
    }

    showModalRetweet() {
        this.modalManager.create('ModalRetweet', {
            post_id_str: this.state.post_id_str,
            tweet_id_str: this.state.tweet_id_str,
            callback: this.handleSubmit
        });
    }

    showLogin(e) {
        this.modalManager.create('ModalLogin', {
            callback:this.handleLogin
        });
    }

    handleLogin(e){
        if(!this.sessionManager.isGuest()){
            return this.showModalRetweet();
        }
    }
};

RetweetButtonComponent.defaultProps = {};

export default RetweetButtonComponent ;
