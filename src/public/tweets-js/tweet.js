var tweetId = window.frameElement.getAttribute('data-tweet-id');
var userScreenName = document.getElementsByClassName('Identity-screenName')[0].getAttribute('title');

var sendMessage = function (msg) {
    window.parent.postMessage(msg, '*');
};
var reply = function(ev){
    ev.preventDefault();
    sendMessage('reply:'+tweetId+':'+userScreenName);
};
var like = function(ev){
    ev.preventDefault();
    sendMessage('like:'+tweetId);
};
var retweet = function(ev){
    ev.preventDefault();
    sendMessage('retweet:'+tweetId);
};
var addEvent = function(obj,type,fn){
    if(obj.attachEvent){
        obj['e'+ type+ fn] = fn;
        obj[type+fn] = function(){obj['e'+type+fn]( window.event );}
        obj.attachEvent('on'+type, obj[type+fn] );
    } else {
        obj.addEventListener( type, fn, false );
    }
}
var removeEvent = function(obj,type,fn){
    if ( obj.detachEvent ) {
        obj.detachEvent( 'on'+type, obj[type+fn] );
        obj[type+fn] = null;
    } else{
        obj.removeEventListener( type, fn, false );
    }
}
var removeClass = function(el, removedClass){
    var regex = "/(?:^|\s)"+removedClass+"(?!\S)/g";
    el.className = el.className.replace(regex, '' );
    return el;
}

var currentActions = document.getElementsByClassName('Tweet-actions')[0];
var newActions = currentActions.cloneNode(true);
var links = newActions.getElementsByTagName('a');

for(var i=0;i<links.length;i++){
    links[i].setAttribute('href','#');
    links[i].setAttribute('onclick','');
    links[i] = removeClass(links[i], 'web-intent');
    removeEvent(links[i], 'click');

    if(links[i].className.search('reply')!==-1){
        links[i].addEventListener("click", reply, false);
    }
    if(links[i].className.search('retweet')!==-1){
        links[i].addEventListener("click", retweet, false);
    }
    if(links[i].className.search('heart')!==-1){
        links[i].addEventListener("click", like, false);
    }
}
currentActions.parentNode.replaceChild(newActions, currentActions);
