import React from 'react';
import App from 'app/app';

var ReactDOM  = require('react-dom');
var util      = require('app/lib/util');

class TweetEditor extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            tweet: props.tweet,
            submitPending: false
        };
        this.dom    = undefined;
        this.editor = undefined;
        this.sessionManager = App.get('sessionManager');
        this.twitterManager = App.get('twitterManager');
        this.checkTweet     = this.checkTweet.bind(this);
        this.handleSubmit   = this.handleSubmit.bind(this);
        this.handleCancel   = this.handleCancel.bind(this);
        this.handleLoginCallback = this.handleLoginCallback.bind(this);
        this.addTweet            = this.addTweet.bind(this);
        this.setText             = this.setText.bind(this);
    }

    shouldComponentUpdate(nextProps,nexStates){
        return true;
    }

    componentDidMount(){
        this.dom = $(ReactDOM.findDOMNode(this));
        this.previousPublish();
    }

    previousPublish(){
        var self = this;
        var tweet = this.state.tweet;
        var rest = 140 - tweet.length;
        this.dom.find("#tweet-preview-characters-"+this.props.id).html(rest);
        if(this.props.in_reply_to_screename !== undefined){
            var tmpTweet = '@'+this.props.in_reply_to_screename;
            if(this.props.in_reply_to_reply_screename !== undefined){
                var auxScreenName = this.props.in_reply_to_reply_screename;
                if(auxScreenName.charAt(0)!=='@'){
                    auxScreenName = '@'+auxScreenName;
                }
                var tmpTweet = tmpTweet + ' ' + auxScreenName;
            }
            var tweet = tmpTweet + tweet;
        }
        this.dom.find("#tweet-publish-"+this.props.id).val(tweet);
        this.dom.find("#tweet-publish-"+this.props.id).bind('propertychange keyup keydown input click', self.checkTweet);
        this.editor = this.dom.find("#tweet-publish-"+this.props.id).emojioneArea({
             events: {
                 change: function (editor, event) {
                     self.checkTweet(this.getText());
                 }
             }
        });
    }

    render() {
        if(this.props.in_reply_to===null){
            return null;
        }
        var cancelButton = '';
        if(this.props.onCancel!==undefined){
            cancelButton = <div className="ui default button" onClick={this.handleCancel} ref="cancel">Cancel</div>;
        }
        return <div className="tweets-editor">
                    <div className="content">
                        <div>
                            <div className="ui form">
                                <textarea name="tweet-publish" className="tweet-publish" id={"tweet-publish-"+this.props.id} ref="content"></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="actions">
                        <div className="ui label" id={"tweet-preview-characters-"+this.props.id}></div>
                        {cancelButton}
                        <div className="ui primary button" onClick={this.handleSubmit} ref="reply" >Reply</div>
                    </div>
               </div>;
    }

    handleSubmit(){
        if(this.sessionManager.isGuest()){
            return this.showLogin();
        }
        var self = this;
        var tweet = this.dom.find("#tweet-publish-"+this.props.id).val();
        if(this.checkTweet(tweet)){
            this.twitterManager.sendTweet({
                tweet: tweet,
                in_reply_to: this.props.in_reply_to,
                post_id: this.props.post_id,
                success: function(data){
                    if(self.props.onSuccess!==undefined){
                        self.props.onSuccess(data);
                    }
                },
                error: function(){
                    if(self.props.onError!==undefined){
                        self.props.onError();
                    }
                }
            });
        }
    }

    handleCancel(){
        this.props.onCancel();
    }

    addTweet(data){
        this.dom.find("#tweet-replies-container").prepend(data.html);
    }

    checkTweet(content, emojioneAreaInstance){
        var content = content;
        if(this.props.in_reply_to_screename !== undefined){
            let screenName = '@'+this.props.in_reply_to_screename;
            let auxScreenName = '';

            if(this.props.in_reply_to_reply_screename !== undefined){
                auxScreenName = this.props.in_reply_to_reply_screename;
                if(auxScreenName.charAt(0)!=='@'){
                    auxScreenName = '@'+auxScreenName;
                }
            }
            let reservedLength = screenName.length + auxScreenName.length + 1;
            var auxContent = content;
            if(content.length < reservedLength){
                auxContent = screenName + ' ' + auxScreenName;
            }else{
                if(auxScreenName!==''){
                    if(content.search(auxScreenName)===-1){
                        auxContent = auxScreenName + ' ' + auxContent;
                    }
                }
                if(content.search(screenName)===-1){
                    auxContent = screenName + ' ' + auxContent;
                }
            }
            if(auxContent!==content){
                this.setText(auxContent);
            }
        }

        var links   = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig;
        var tweet   = content.replace(links, 'http://t.co/SSSSSSSSSSS');
        var rest = 140 - tweet.length;
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

    handleLoginCallback(){
        this.setState({showLogin:false});
        this.handleSubmit();
    }

    showLogin(e) {
        App.get('modalManager').create('ModalLogin', {
            showModal: this.state.showLogin,
            callback : this.handleLoginCallback
        });
    }
}

TweetEditor.defaultProps = {};

export default TweetEditor;
