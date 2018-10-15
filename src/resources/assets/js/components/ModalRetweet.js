import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import App from 'app/app';

var striptags = require('striptags');

$.fn.modal = require('semantic-ui-modal');
$.fn.transition = require('semantic-ui-transition');
$.fn.transition.settings.silent = true;

$.fn.dimmer = require('semantic-ui-dimmer');

class ModalRetweet extends React.PureComponent {

    constructor(props) {
        super(props);
        this.dom = undefined;
        this.twitterManager = App.get('twitterManager');
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setText = this.setText.bind(this);
        this.checkTweet = this.checkTweet.bind(this);
        this.renderError = this.renderError.bind(this);
    }

    shouldComponentUpdate(nextProps, nextStates){
        return false;
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
        var params = {
            id: this.props.tweet_id_str,
            container: this.dom.find('.tweet-for-retweet').get(0),
            done: function(){
                self.dom.modal('refresh');
            }
        };
        App.get('twitterManager').renderTweet(params);

        //Configuramos el editor....
        var rest = 116;
        this.dom.find("#tweet-preview-characters-"+this.props.id).html(rest);
        this.dom.find("#ed-retweet").bind('propertychange keyup keydown input click', self.checkTweet);
        this.editor = this.dom.find("#ed-retweet").emojioneArea({
             events: {
                 change: function (editor, event) {
                     self.checkTweet(this.getText());
                 }
             }
        });
    }

    componentDidUpdate() {}

    render() {
        return <div className="ui retweet small modal">
            <div className="header">Retweet this to your followers?</div>
            <div className="content">
                <div id="retweet-editor" className="retweet-panel active">
                    <div className="ui retweet form">
                        <textarea name="ed-retweet" id="ed-retweet" placeholder="Add a coment..." />
                    </div>
                    <div className="tweet-for-retweet"></div>
                </div>
                <div id="retweet-error" className="retweet-panel inactive">
                    <div className="ui negative message">
                        <div className="header">Sorry, there was an error.</div>
                        <p></p>
                    </div>
                </div>
                <div id="retweet-success" className="retweet-panel inactive">
                    <div className="ui success message">
                        <div className="header">Your retweet was send successfully!</div>
                    </div>
                </div>
            </div>
            <div className="actions">
                <div className="ui label" id={"tweet-preview-characters-"+this.props.id}></div>
                <div className="ui cancel button">Cancel</div>
                <div className="ui primary retweet button" onClick={this.handleSubmit}>Go!</div>
                <div className="ui primary retry button" onClick={this.handleRetry} ref="retry">Retry!</div>
            </div>
        </div>;
    }

    renderError(data){
        var message = data;
        this.dom.find("#retweet-error p").first().html(message);
        this.dom.find(".retweet-panel").css("display","none");
        this.dom.find("#retweet-error").css("display","block");
        this.dom.find(".actions .retry.button").css("display","inline");
        this.dom.find(".actions .retweet.button").css("display","none");
    }

    renderSuccess(){
        this.dom.find(".retweet-panel").css("display","none");
        this.dom.find("#retweet-success").css("display","block");
        this.dom.find(".actions .retry.button").css("display","none");
        this.dom.find(".actions .retweet.button").css("display","none");
        this.dom.find(".actions .cancel.button").html("Close");
    }

    handleRetry(){
        this.dom.find(".retweet-panel").css("display","none");
        this.dom.find("#retweet-editor").css("display","block");
        this.dom.find(".actions .retry.button").css("display","none");
        this.dom.find(".actions .retweet.button").css("display","inline");
    }

    handleSubmit(){
        var self = this;
        var tweet = this.dom.find("#ed-retweet").val();
        if(this.checkTweet(tweet)){
            this.twitterManager.sendRetweet({
                status: tweet,
                retweeted_id: this.props.tweet_id_str,
                post_id: this.props.post_id_str,
                success: function(data){
                    self.renderSuccess();
                },
                error: function(e){
                    self.renderError(e);
                }
            });
        }
    }

    checkTweet(content, emojioneAreaInstance){
        var content = content;
        var links   = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig;
        var tweet   = content.replace(links, 'http://t.co/SSSSSSSSSSS');
        var rest = 116 - tweet.length;
        this.dom.find("#tweet-preview-characters-"+this.props.id).html(rest);
        if(rest<0){
            this.dom.find("#tweet-preview-characters-"+this.props.id).addClass("red");
            return false;
        }
        this.dom.find("#tweet-preview-characters-"+this.props.id).removeClass("red");
        return true;
    }

    setText(text){
        this.editor[0].emojioneArea.setText(text);
    }
}

ModalRetweet.defaultProps = {};

export default ModalRetweet;
