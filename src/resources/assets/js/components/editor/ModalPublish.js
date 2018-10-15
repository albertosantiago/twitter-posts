import React from 'react';
import App from 'app/app';
import {unique} from 'app/lib/util';

var ReactDOM = require('react-dom');

const I18n = require('react-i18nify').I18n;

Array.prototype.unique = unique;

$.fn.modal = require('semantic-ui-modal');
$.fn.dimmer = require('semantic-ui-dimmer');
$.fn.transition = require('semantic-ui-transition');
$.fn.transition.settings.silent = true;

class ModalPublish extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            slug: props.slug,
            content: props.content,
            title: props.title,
            tags: props.tags,
            user_screen_name: props.user_screen_name,
            tweet: undefined,
        };
        this.dom    = undefined;
        this.editor = undefined;
        this.previousPublish = this.previousPublish.bind(this);
        this.checkTweet      = this.checkTweet.bind(this);
        this.handleSubmit    = this.handleSubmit.bind(this);
        this.handleRetry     = this.handleRetry.bind(this);
        this.handleCancel    = this.handleCancel.bind(this);
    }

    shouldComponentUpdate(nextProps,nexStates){
        return false;
    }

    componentDidMount() {
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
        this.previousPublish();
    }

    previousPublish(){
        var self = this;
        var params = {
            id    : this.props.id,
            tags  : this.props.tags.split(" "),
            title : this.props.title,
            slug  : this.props.slug,
            content : this.props.content
        };
        var tweet = App.get('postManager').createTweetForPublish(params);
        var rest =  App.get('twitterManager').getRemainingCharsForTweet({
            content: tweet
        });
        this.setState({
            tweet: tweet
        });
        this.dom.find("#tweet-preview-characters").html(rest);
        this.dom.find("#tweet-publish").val(tweet);
        this.dom.find("#tweet-publish").bind('propertychange keyup keydown input click', self.checkTweet);
        this.editor = this.dom.find("#tweet-publish").emojioneArea({
             events: {
                 keypress: function (editor, event) {
                     self.checkTweet(this.getText());
                 },
                 change: function (editor, event) {
                     self.checkTweet(this.getText());
                 }
             }
        });
    }

    render() {
        return <div className="ui publish small modal">
            <div className="header">{I18n.t('app.modal_publish.header')}</div>
            <div className="content">
                <div id="publish-editor" className="publish-panel active">
                    <div className="ui publish form">
                        <textarea name="tweet-publish" id="tweet-publish"></textarea>
                    </div>
                </div>
                <div id="publish-error" className="publish-panel inactive">
                    <div className="ui negative message">
                        <div className="header">{I18n.t('app.modal_publish.error_p1')}</div>
                        <p></p>
                    </div>
                </div>
                <div id="publish-success" className="publish-panel inactive">
                    <div className="ui positive message">
                        <div className="header">{I18n.t('app.modal_publish.success_header')}</div>
                        <p>{I18n.t('app.modal_publish.success_p1')}</p>
                    </div>
                    <div className="tweet published-tweet">
                    </div>
                </div>
            </div>
            <div className="actions">
                <div className="ui label" id="tweet-preview-characters"></div>
                <div className="ui cancel button" onClick={this.handleCancel} ref="cancel">{I18n.t('app.cancel')}</div>
                <div className="ui primary publish button" onClick={this.handleSubmit} ref="pub">{I18n.t('app.publish')}</div>
                <div className="ui primary retry button" onClick={this.handleRetry} ref="retry">{I18n.t('app.retry')}</div>
            </div>
        </div>;
    }

    handleCancel(){
        this.dom.modal('hide');
    }

    handleSubmit(){
        var self = this;
        var tweet = this.dom.find("#tweet-publish").val();
        if(this.checkTweet(tweet)){
            var params = {
                'id' : this.props.id,
                'status' : tweet,
                'done': function(data){
                    self.renderSuccess(data);
                },
                fail: function(data){
                    if(data.type=='error'){
                        self.renderError(data.message);
                    }
                }
            };
            App.get('postManager').publish(params);
        }
    }

    renderSuccess(res){
        var self = this;
        this.dom.modal({
            context: this.props.context,
            onHidden : function(){
                self.props.onSuccess();
            }
        });
        self.dom.find('#publish-success div.tweet').first().html($.parseHTML(res.data.embed.html));
        this.dom.find(".publish-panel").css("display","none");
        this.dom.find("#publish-success").css("display","block");
        this.dom.find(".actions .publish.button").css("display","none");
        this.dom.find(".actions .ui.cancel.button").text("Close");
    }

    renderError(message){
        this.dom.find("#publish-error p").first().html(message);
        this.dom.find(".publish-panel").css("display","none");
        this.dom.find("#publish-error").css("display","block");
        this.dom.find(".actions .retry.button").css("display","inline");
        this.dom.find(".actions .publish.button").css("display","none");
    }

    handleRetry(){
        this.dom.find(".publish-panel").css("display","none");
        this.dom.find("#publish-editor").css("display","block");
        this.dom.find(".actions .retry.button").css("display","none");
        this.dom.find(".actions .publish.button").css("display","inline");
    }

    setText(text){
        this.editor[0].emojioneArea.setText(text);
        this.checkTweet(text);
    }

    checkTweet(content){
        var correct = App.get('postManager').checkTweetForPublish({
            content: content,
            postSlug: this.props.slug,
            postId: this.props.id
        });
        if(!correct){
            this.dom.find("#publish-error p").first().html("The tweet for publish is incorrect. Remember than you have to let the link of the post in the tweet.");
            this.dom.find("#publish-error").css("display","block");
            this.dom.modal('refresh');
        }
        var rest = App.get('twitterManager').getRemainingCharsForTweet({
            content: content
        });
        this.dom.find("#tweet-preview-characters").html(rest);
        if(!correct){
            this.dom.find("#tweet-preview-characters").addClass("red");
            return correct;
        }
        this.dom.find("#tweet-preview-characters").removeClass("red");
        return correct;
    }
}

ModalPublish.defaultProps = {};

export default ModalPublish;
