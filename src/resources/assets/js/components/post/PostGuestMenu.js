import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
$.fn.modal      = require('semantic-ui-modal');
$.fn.dimmer     = require('semantic-ui-dimmer');
$.fn.transition = require('semantic-ui-transition');
$.fn.transition.settings.silent = true;

import App from 'app/app';
import LikeButton from './LikeButton';
import ShareButton from './ShareButton';
import RetweetButton from './RetweetButton';


class PostGuestMenuComponent extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            invalidPostTweet: false,
            totalLikes: undefined,
            totalRetweets: undefined
        }
        this.setTweetStates = this.setTweetStates.bind(this);
    }

    componentDidMount(){
        var self = this;
        App.get('twitterManager').getTweetInfo({
            id: this.props.tweet_id_str,
            callback: function(data){
                self.setTweetStates(data);
            },
            onNotExist: function(){
                self.setState({
                    invalidPostTweet: true
                });
            }
        });
    }

    render(){
        var retweetButton = '';
        var likeButton    = '';
        if(!this.state.invalidPostTweet){
            retweetButton = <RetweetButton post_id_str={this.props.post_id_str} tweet_id_str={this.props.tweet_id_str} totalRetweets={this.state.totalRetweets} />;
            likeButton    = <LikeButton post_id_str={this.props.post_id_str} tweet_id_str={this.props.tweet_id_str} totalLikes={this.state.totalLikes} />;
        }
        return <div className="ui bottom attached menu guest-menu">
                    <ShareButton post={this.props.post} />
                    {retweetButton}
                    {likeButton}
                    <a className="item" ref="retweet" target="_blank" href={"/my-posts/new?in_reply_to="+this.props.post_id_str}>
                        <i className="reply icon"></i>Post Reply
                    </a>
               </div>;
    }

    setTweetStates(data){
        this.setState({
            totalLikes: data.likes
        });
        this.setState({
            totalRetweets: data.retweets
        });
    }
};

PostGuestMenuComponent.defaultProps = {};

export default PostGuestMenuComponent ;
