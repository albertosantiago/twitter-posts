import React from 'react';
import $ from 'jquery';
import App from 'app/app';

var ReactDOM    = require('react-dom');
var tweetParser = require('../../lib/app-parsers').tweetParser;

$.fn.modal = require('semantic-ui-modal');
$.fn.transition = require('semantic-ui-transition');
$.fn.transition.settings.silent = true;

$.fn.dimmer = require('semantic-ui-dimmer');

class ModalThread extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            tweets: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.insertThread = this.insertThread.bind(this);
        this.addInput     = this.addInput.bind(this);
        this.renderInputs = this.renderInputs.bind(this);

        if(this.props.tag!==undefined){
            var tag = this.props.tag;
            var tweets    = [];
            var tweetTags = $(tag).find('twp-data twp-tweet');
            for(var i=0;i<tweetTags.length;i++){
                var tweet = {};
                tweet.id  = $(tweetTags[i]).attr('id');
                tweet.url = $(tweetTags[i]).attr('data-url');
                tweet.screenName = $(tweetTags[i]).attr('data-screen-name');
                tweet.body = $(tweetTags[i]).html();
                tweets.push(tweet);
            }
            this.state.tweets = tweets;
        }
    }

    shouldComponentUpdate(nextProps,nextStates){
        return false;
    }

    componentDidMount() {
        var self = this;
        this.dom = $(ReactDOM.findDOMNode(this));
        this.dom.modal({
            detachable: false,
            context: this.props.context,
            silent: App.conf('errors.silent'),
            debug: App.conf('errors.debug'),
            onHidden : function(){
                self.props.onUserCancel();
            }
        });
        this.dom.modal('show');
        if(this.props.tag!==undefined){
            this.renderInputs();
        }
    }

    render() {
        return <div className="ui insert-thread small modal">
            <div className="header">Tweet Thread</div>
            <div className="content">
                <div className="ui publish form">
                    <div className="inputs-tweet">
                    </div>
                    <div>
                        <br/>
                        <button className="ui default button right" onClick={this.addInput}> + Another Tweet</button>
                    </div>
                    <br/>
                    <div className="clearfix"></div>
                </div>
            </div>
            <div className="actions">
                <div className="ui cancel button" ref="cancel">Cancel</div>
                <div className="ui primary button" onClick={this.handleSubmit} ref="insert">Go!</div>
            </div>
        </div>;
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        this.setState({
            tweetCode: value
        });
    }

    handleSubmit(){
        var self = this;
        if(this.props.editor!==undefined){
            this.insertThread();
        }
        if(this.props.callback!==undefined){
            var tweets = [];
            this.dom.find(".inputs-tweet input").each(function(index, element){
                var tweet = {};
                tweet.url = $(element).val();
                tweet.id = self.getTweetId(tweet.url);
                tweet.screenName = self.getTweetScreenName(tweet.url);
                tweets.push(tweet);
            });
            this.props.callback(tweets);
        }
        this.dom.modal('hide');
    }

    insertThread(){
        var self = this;
        var threadId = this.generateThreadId();
        var tweetThread = "<twp-tweet-thread id='"+threadId+"'><twp-data>";
        this.dom.find(".inputs-tweet input").each(function(index, element){
            var tweet = $(element).val();
            tweetThread += self.getTweetCode(tweet, index);
        });
        tweetThread += "</twp-data></twp-tweet-thread>";
        this.props.editor.insertContent(tweetThread);
        this.dom.modal('hide');
    }

    getTweetCode(tweet, index){
        var url = tweet;
        this.requestOembed(tweet, index);
        tweet = "<div id='blockquote-replacement-"+index+"'>"+tweet+"</div>";
        tweet = tweetParser(tweet);
        var tweetId    = this.getTweetId(tweet);
        var screenName = this.getTweetScreenName(tweet);
        return '<twp-tweet id="'+tweetId+'" data-screen-name="'+screenName+'" data-url="'+url+'" ><div class="tweet">'+tweet+'</div></twp-tweet>';
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

    renderInputs(){
        var self = this;
        for(var i=0;i<this.state.tweets.length;i++){
            var tweet = this.state.tweets[i];
            this.addInput(tweet);
        }
        var ret = twttr.widgets.load().then(function(){
            self.dom.modal('refresh');
        });
    }

    addInput(tweet){
        var self = this;
        var value = '';
        var id = '';
        if(tweet.url!==undefined){
            value= tweet.url;
            id = tweet.id;
        }
        var newInput = `<div class='input-container' id='input-container-${id}'><div class="ui icon input">
                            <input type="text" placeholder="Insert the tweet link" value='${value}'/>
                            <i class="circular remove link icon"></i>
                        </div></div>`;

        var el = $.parseHTML(newInput);
        $(el).find("i.link").click(function(){
            $(this).parent().remove();
        });

        this.dom.find(".inputs-tweet").first().append(el);
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

    generateThreadId(){
        var randomId = new Date().getTime() + '-' + (Math.floor(Math.random() * 9999));
        return "twp-thread-" + randomId;
    }
}

ModalThread.defaultProps = {};

export default ModalThread;

/**
https://twitter.com/bolcheplumazo/status/861500932990881792
https://twitter.com/bolcheplumazo/status/861501321811304448
https://twitter.com/bolcheplumazo/status/861501677186281472
**/
