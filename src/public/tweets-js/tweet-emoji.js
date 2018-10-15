var styleString ="img.emoji{width:16px}";
var css = document.createElement('style');
css.innerText = styleString;

var body = document.getElementsByTagName('body')[0]
var js = document.createElement('script');
js.id  = 'emoji-script';
js.src = "//twemoji.maxcdn.com/2/twemoji.min.js?2.3.0";
js.onload = function(){
    twemoji.size = '72x72';
    twemoji.parse(document.body);
}
body.appendChild(css);
body.appendChild(js);
