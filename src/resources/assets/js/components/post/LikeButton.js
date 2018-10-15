import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import App from 'app/app';

$.fn.modal = require('semantic-ui-modal');
$.fn.dimmer = require('semantic-ui-dimmer');
$.fn.transition = require('semantic-ui-transition');
$.fn.transition.settings.silent = true;

class LikeButtonComponent extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            showLogin: false,
            post_id_str: this.props.post_id_str,
            liked: false,
        };
        this.sessionManager = App.get('sessionManager');
        this.twitterManager = App.get('twitterManager');
        this.modalManager   = App.get('modalManager');
        this.handleClick = this.handleClick.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    componentDidMount(){}

    render() {
        var likeStatus = '';
        if(this.state.liked){
            likeStatus = 'red';
        }
        var totalLikes = '';
        if(this.props.totalLikes>0){
            totalLikes = <span className='tweet-stat'>{this.props.totalLikes}</span>;
        }
        return <div>
                <a className={likeStatus + " item"} onClick={() => this.handleClick()} ref="like">
                    <i className="heart icon"></i>{totalLikes}Like
                </a>
            </div>;
    }

    handleClick(){
        var self = this;
        if(this.sessionManager.isGuest()){
            return this.showLogin();
        }
        this.twitterManager.sendLike({
            postId: this.props.post_id_str,
            tweetId: this.props.tweet_id_str,
            type: this.state.liked,
            callback: function(data){
                self.setState({liked: !self.state.liked});
            }
        });

    }

    showLogin(e) {
        this.modalManager.create('ModalLogin', {
            callback:this.handleLogin
        });
    }

    handleLogin(e){
        this.handleClick();
    }

};

LikeButtonComponent.defaultProps = {};

export default LikeButtonComponent ;
