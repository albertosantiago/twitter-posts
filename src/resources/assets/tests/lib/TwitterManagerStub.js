
var tweetMock = require("./tweet_mock");

class TwitterManagerStub{

    constructor(){
        this.fail = false;
        this.stub = {
            likes: 0,
            retweets: 0,
            tweetMock: tweetMock,

        };
        this.callback = {
            'forLike' : [],
            'forRetweet' : []
        };
        this.requestedIds = [];
    }

    setStub(key, value){
        this.stub[key] = value;
    }

    getLikesFor(id, callback){
        this.callbacks['forLike'][id] = callback;
        this.getTweetInfo(id);
    }

    getRetweetsFor(id, callback){
        this.callbacks['forRetweet'][id] = callback;
        this.getTweetInfo(id);
    }

    getTweetInfo(params){
        params.callback({
            likes: this.stub.likes,
            retweets: this.stub.retweets
        });
    }

    sendLike(params){
        this.stub.tweetMock.id = params.tweet_id;
        var res = {
            type : 'tweet',
            data : this.stub.tweetMock,
            status : 200
        };
        params.callback(res);
    }

    sendTweet(params){
        var self = this;
        this.stub.tweetMock.in_reply_to_status_id = params.in_reply_to;
        this.stub.tweetMock.in_reply_to_status_id_str = params.in_reply_to;
        this.stub.tweetMock.text = params.tweet;
        if(!this.fail){
            params.success(this.stub.tweetMock);
        }else{
            params.error(e);
        }
    }

    getOembed(url, callback){
        return;
    }

    getExpectedTweetSize(params){
        var content = params.content;
        var links   = /\bhttp.*\b/i;
        var tweet   = content.replace(links, 'http://t.co/SSSSSSSSSSS');
        return tweet.length;
    }

    getRemainingCharsForTweet(params){
        var size = this.getExpectedTweetSize(params);
        return (140 - size);
    }

    renderTweet(params){
        params.done();
    }
}

export default TwitterManagerStub;
