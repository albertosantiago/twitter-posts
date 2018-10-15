import React from 'react';
import $ from 'jquery';
import App from 'app/app';

const I18n = require('react-i18nify').I18n;

var ReactDOM    = require('react-dom');
var tweetParser = require('../../lib/app-parsers').tweetParser;

$.fn.modal = require('semantic-ui-modal');
$.fn.transition = require('semantic-ui-transition');
$.fn.transition.settings.silent = true;

$.fn.dimmer = require('semantic-ui-dimmer');

function isValidURL(url){
    var RegExp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

    if(RegExp.test(url)){
        return true;
    }else{
        return false;
    }
}

class ModalTweet extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            tweetCode: undefined
        };
        this.handleTweetChange = this.handleTweetChange.bind(this);
        this.insertTweet = this.insertTweet.bind(this);
    }

    shouldComponentUpdate(nextProps,nextStates){
        return false;
    }

    componentDidMount() {
        var self = this;
        this.dom = $(ReactDOM.findDOMNode(this));
        this.dom.modal({
            silent: App.conf('errors.silent'),
            debug: App.conf('errors.debug'),
            onHidden : function(){
                self.props.onUserCancel();
            }
        });
        this.dom.modal('show');
    }

    render() {
        return <div className="ui insert-tweet small modal">
            <div className="header">{I18n.t('app.modal_tweet.header')}</div>
            <div className="content">
                <div>
                    <div className="ui publish form">
                        <div className="ui error message transition hidden">
                            <i className="close icon"></i>
                            <div className="header">
                                {I18n.t('app.modal_tweet.error_header')}
                            </div>
                            <p>{I18n.t('app.modal_tweet.error_p1')}</p>
                        </div>
                        <textarea name="ed-insert-tweet" id="ed-insert-tweet" placeholder={I18n.t('app.modal_tweet.placeholder')} value={this.state.tweetCode} onChange={this.handleTweetChange} ref="editor"/>
                    </div>
                </div>
            </div>
            <div className="actions">
                <div className="ui cancel button" ref="cancel">{I18n.t('app.cancel')}</div>
                <div className="ui primary button" onClick={this.insertTweet} ref="insert">{I18n.t('app.go')}</div>
            </div>
        </div>;
    }

    handleTweetChange(event) {
        const target = event.target;
        const value = target.value;
        this.setState({
            tweetCode: value
        });
    }

    insertTweet(){
        var tweet = this.state.tweetCode;
        if(tweet===undefined){
            return this.setError();
        }
        if(tweet.search('blockquote')!==-1){
            tweet = this.getBlockquoteURL(tweet);
            tweet = tweet.trim();
        }

        if(!isValidURL(tweet)){
            var tweet = tweetParser(tweet);
            if(tweet===''){
                return this.setError();
            }
        }

        var tweetId    = this.getTweetId(tweet);
        var screenName = this.getTweetScreenName(tweet);

        this.props.editor.insertContent('<twp-tweet id="'+tweetId+'" data-screen-name="'+screenName+'" data-url="'+tweet+'"></twp-tweet>');
        this.dom.modal('hide');
    }

    setError(){
        this.dom.find('.ui.publish.form').first().addClass('error');
        return this.dom.find('.ui.error.message').first().removeClass('hidden');
    }

    requestOembed(url, replacementIndex){
        var self = this;
        var params = {
            url: url,
            callback: function(data){
                var element = self.props.editor.dom.select('#blockquote-replacement-'+replacementIndex);
                self.props.editor.dom.setHTML(element, data.html);
                self.props.editor.save();
            }
        };
        App.get('twitterManager').getOembed(params);
    }

    getTweetId(tweet){
        var chunks = tweet.split("/status/");
        var chunks = chunks[1].match(/\d*/i);
        return chunks[0];
    }

    getTweetScreenName(tweet){
        var chunks = tweet.split("twitter.com/");
        var chunks = chunks[1].split("/status/");
        return chunks[0];
    }

    getBlockquoteURL(tweet){
        var chunks = tweet.split('<a href="https://twitter.com/');
        var chunks = chunks[1].split('"');
        var url = "https://twitter.com/"+chunks[0];
        return url;
    }

}

ModalTweet.defaultProps = {};

export default ModalTweet;
