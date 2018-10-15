const phantom = require('phantom');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var tweets = undefined;
var width   = undefined;
var height  = undefined;
var protocol = "https";
var domain = "twitter-posts.com";
var app_key = "__caca__";

(async function() {
    var instance = await phantom.create();
    var page = await instance.createPage();
    page.property('settings.userAgent', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/28.0.1500.71 Safari/537.36');
    page.property('viewportSize', {width: 1280,height: 800});
    var pendingURL = protocol+'://'+domain+'/snp/pending_thread?key='+app_key;
    console.log("Requesting pending jobs: "+pendingURL);
    var status = await page.open(pendingURL);
    var ret = await page.property('plainText');
    ret = JSON.parse(ret);
    var thread = ret.thread;
    console.log("Processing "+thread.url+" ...");
    status = await page.open(thread.url);
    await sleep(4000);
    console.log("Loading more replies....");
    for(var i=0;i<8;i++){
        console.log("Loading more...");
        await page.evaluate(function(){
            $(".ThreadedConversation-moreRepliesLink").click();
            return true;
        });
        await sleep(2000);
    }
    console.log("Extracting tweets...");
    var parserFunction = createParserFunction(thread);
    await page.evaluate(parserFunction).then(function(ret){
        tweets = ret;
    });
    console.log(tweets);
    tweets = tweets.join();
    var url = protocol+'://'+domain+'/snp/update_thread?tweets='+tweets+'&id='+thread._id+'&key='+app_key;
    console.log("sending update....");
    console.log(url);
    status = await page.open(url);
    await sleep(60000);
    var content = await page.property('content');
    console.log("Response:"+content);
    await instance.exit();
}());



function createParserFunction(thread)
{
    console.log(thread);
    if((thread.main_conversation_url===null)||
        (thread.main_conversation_url===undefined)){
            if((thread.extra_authors==='')
            ||(thread.extra_authors===undefined)){
                console.log("Creating simple parser");
                return createSimpleParser();
            }
    }
    return createMixedParser(thread);
}

function createMixedParser(thread){

    var mainConversationId = thread.main_conversation_id;
    var screenName = thread.screen_name;
    var extraAuthors = thread.extra_authors;

    if((extraAuthors!==undefined)&&(extraAuthors!=='')){
        var authors = extraAuthors.split(",");
        extraAuthors = "[";
        for(var i=0;i<authors.length;i++){
            extraAuthors += '"'+authors[i]+'",';
        }
        extraAuthors += '""]';
    }else{
        extraAuthors = '[]';
    }

    var funcBody = `var tweets = [];
        var tweet = $(".PermalinkOverlay-modal .permalink-tweet-container .tweet.permalink-tweet");
        var mainTweetId = $(tweet).attr("data-tweet-id");
        var userScreenName = $(tweet).attr("data-screen-name");
        var userId = $(tweet).attr("data-user-id");

        var alternativeParent = '${mainConversationId}';
        var screenName   = '${screenName}';
        var extraAuthors = '${extraAuthors}';

        tweets.push(mainTweetId);

        $("div.tweet").each(function(){
            var convId = $(this).attr("data-conversation-id");
            var tweetScreenName = $(this).attr("data-screen-name");
            var total = tweets.length;
            for(var i=0;i<total;i++){
                if((convId===tweets[i])||(convId===alternativeParent)){
                    if((screenName === tweetScreenName)||(extraAuthors.indexOf(screenName)!==-1)){
                        var id = $(this).attr("data-tweet-id");
                        if((id!==undefined)&&(id!=='')){
                            if(tweets.indexOf(id)===-1){
                                tweets.push(id);
                            }
                        }
                    }
                }
            }
        });
        return tweets;
    `;
    console.log("Created function:");
    console.log(funcBody);
    return new Function(funcBody);
}

function createSimpleParser(){
    var func = function()
    {
        var tweets = [];
        var tweet = $(".PermalinkOverlay-modal .permalink-tweet-container .tweet.permalink-tweet");
        var mainTweetId = $(tweet).attr("data-tweet-id");
        var userScreenName = $(tweet).attr("data-screen-name");
        var userId = $(tweet).attr("data-user-id");

        tweets.push(mainTweetId);
        $("div.tweet").each(function(){
            var convId = $(this).attr("data-conversation-id");
            var total = tweets.length;
            for(var i=0;i<total;i++){
                if(convId===tweets[i]){
                    if(userId === $(this).attr("data-user-id")){
                        var id = $(this).attr("data-tweet-id");
                        if((id!==undefined)&&(id!=='')){
                            if(tweets.indexOf(id)===-1){
                                tweets.push(id);
                            }
                        }
                    }
                }
            }
        });
        return tweets;
    };
    return func;
}
