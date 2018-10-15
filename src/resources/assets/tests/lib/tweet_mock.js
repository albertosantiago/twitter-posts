"use strict";

var tweetMock = {
    _id : {
        $oid : "58ef3a69e07e982f6469c972"
    },
    id: 5655645645645645645645,
    id_str: "5655645645645645645645",
    text: "@WetdogCompany @Tweet4Posts ¿Que dices gili?",
    created_at : {
        $date : 1492073064000
    },
    truncated : false,
    entities : {
        hashtags : [ ] ,
        symbols : [ ] ,
        user_mentions : [{
            screen_name : "WetdogCompany" ,
            name : "Chucho" ,
            id : 3979906515 ,
            id_str : "3979906515" ,
            indices : [ 0 , 14]
       },{
            screen_name : "Tweet4Posts",
            name : "Tweet4Posts",
            id : 812023097847115776 ,
            id_str : "812023097847115776" ,
            indices : [ 15 , 27]
       }],
       urls : []
    },
    source : "<a href=\"http://twitter-posts.com\" rel=\"nofollow\">Twitter4Post</a>" ,
    in_reply_to_status_id : 852441847616221184 ,
    in_reply_to_status_id_str : "852441847616221184" ,
    in_reply_to_user_id : 812023097847115776 ,
    in_reply_to_user_id_str : "812023097847115776" ,
    in_reply_to_screen_name : "Tweet4Posts" ,
    geo : null,
    coordinates : null,
    place :  null,
    contributors :  null,
    is_quote_status : false,
    retweet_count : 0 ,
    favorite_count : 0 ,
    favorited : false ,
    retweeted : false ,
    lang : "es" ,
    updated_at : {
        $date : 1492073065000
    },
    embed: {
        url : "https://twitter.com/WetdogCompany/status/852432487393394688",
        author_name : "Chucho",
        author_url  : "https://twitter.com/WetdogCompany",
        html : "<blockquote class=\"twitter-tweet\" align=\"left\"><p lang=\"es\" dir=\"ltr\">Foh que aburrimiento.....</p>- Chucho (@WetdogCompany) <a href=\"https://twitter.com/WetdogCompany/status/852432487393394688\">April 13, 2017</a></blockquote>\n" ,
        width : 550,
        height :  null,
        type : "rich",
        cache_age : "3153600000",
        provider_name : "Twitter",
        provider_url : "https://twitter.com",
        version : "1.0"
    },
    width: 550,
    height:  null,
    type: "rich",
    cache_age: "3153600000",
    provider_name: "Twitter",
    provider_url: "https://twitter.com",
    version: "1.0",
    post_id: "58ef3134e07e980e2173d273",
    user_screen_name: "WetdogCompany",
    user_id: 1212121212121,
    user_id_str: "1212121212121",
    processed : true
};

var exports = module.exports = tweetMock;
