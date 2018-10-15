"use strict";

var exports = module.exports = {};

var htmlparser = require("htmlparser2");

function parse(content, allowedTags){
    var parsedContent = '';
    var level = 0;
    var bullshit  = false;
    var startedTag = false;

    var parser = new htmlparser.Parser({
    	onopentag: function(name, attribs){
            if(allowedTags.indexOf(name)!==-1){
                let attribsStr = '';
                for(let prop in attribs){
                    if(prop!=='style'){
                        if((attribs[prop]!==undefined) ||
                            (attribs[prop]!=='')){
                            attribsStr += prop+'="'+attribs[prop]+'" ';
                        }else{
                            attribsStr += prop+' ';
                        }
                    }
                }
                if(attribsStr.length>0){
                    attribsStr = attribsStr.trim();
                }
                parsedContent += '<'+name+' '+attribsStr+'>';
    		}else{
                if(name==='script'){
                    return;
                }
                bullshit = true;
            }
            startedTag = true;
    	},
    	ontext: function(text){
            if(startedTag){
                parsedContent += text;
            }
    	},
    	onclosetag: function(name){
            if(name==='script'){
                return;
            }
            if(allowedTags.indexOf(name)!==-1){
                parsedContent += '</'+name+'>';
    		}
        }
    }, {decodeEntities: false});

    parser.write(content);
    parser.end();
    if(bullshit){
        return '';
    }
    return parsedContent;
}

exports.tweetParser = function(tweet){
    var allowedTags = ['blockquote','p','a','div'];
    return parse(tweet, allowedTags);
}

exports.mediaParser = function(media){
    var allowedTags = ['iframe'];
    return parse(media, allowedTags);
}
