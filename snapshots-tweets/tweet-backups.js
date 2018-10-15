const http    = require('http');
const https   = require('https');
const fs      = require('fs');
const phantom = require('phantom');
const atob    = require('atob');
const m3u8stream = require('m3u8stream');
const { URL } = require('url');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var skip = 0;
if(process.argv.length>2){
    skip = process.argv[2];
}

var tweetId = undefined;
var width   = undefined;
var height  = undefined;
var protocol = "https";
var domain = "twitter-posts.com";
var app_key = "__caca__";

(async function() {
    const instance = await phantom.create(['--ignore-ssl-errors=yes', '--web-security=false']);
    const page = await instance.createPage();
    page.property('viewportSize', {width: 1280,height: 800});
    page.property('onResourceReceived', function(response) {
        console.log('Receive ' + JSON.stringify(response.contentType, undefined, 4));
        if(response.contentType.search("mp")!==-1){
            console.log(JSON.stringify(response, undefined, 4));
        }
    });

    var pendingUrl = protocol+'://'+domain+'/snp/pending?key='+app_key;
    if(skip!==0){
        pendingUrl += '&skip='+skip;
    }
    console.log("Requesting pending job: "+pendingUrl);
    var status = await page.open(pendingUrl);
    var content = await page.property('content');
    await sleep(2000);
    page.evaluate(function() {
        var meta = document.querySelector("meta[name=tweet_id]");
        if(meta!==null){
            return meta.getAttribute('content');
        }
        return null;
    }).then(function(ret){
        tweetId = ret;
    });
    await sleep(2000);
    var pendingUrl = protocol+'://'+domain+'/snp/rendered_tweet?id='+tweetId+'&withMedia=true&key='+app_key;
    console.log("Requesting pending job: "+pendingUrl);
    var status = await page.open(pendingUrl);
    var content = await page.property('content');
    //Extraemos imagenes y videos.
    await sleep(4000);
    console.log("Extracting videos....");
    var videoURL = "";
    page.evaluate(function() {
        return getVideo();
    }).then(function(ret){
        videoURL = ret;
    });
    await sleep(2000);
    if(videoURL!==null){
        extractVideo(videoURL);
        await sleep(2000);
    }
    //Cogemos el código de youtube.
    var youtubeCode = undefined;
    page.evaluate(function(){
        return getYoutubeIframe();
    }).then(function(ret){
        youtubeCode = ret;
    });
    //Cogemos el código html del tweet.
    var htmlCode = undefined;
    page.evaluate(function(){
        return getHtmlCode();
    }).then(function(ret){
        htmlCode = ret;
    });
    await sleep(5000);
    //Extraemos imagenes
    console.log("Extracting images....");
    var images = [];
    page.evaluate(function() {
        return getImages();
    }).then(function(ret){
        images = ret;
    });
    await sleep(5000);
    var uploadImgs = [];
    if(images.length!==0){
        console.log(images);
        for(var i=0;i< images.length;i++){
            var ext = getImageExtension(images[i]);
            var fileName = "tmp/img_"+tweetId+"_"+i+"_small."+ext;
            var file    = fs.createWriteStream(fileName);
            var request = https.get(images[i], function(response) {
                response.pipe(file);
            });
            await sleep(1000);
        }
        for(var i=0;i< images.length;i++){
            var ext = getImageExtension(images[i]);
            var fileName = "tmp/img_"+tweetId+"_"+i+"."+ext;
            uploadImgs.push(fileName);
            var file    = fs.createWriteStream(fileName);
            var request = https.get(images[i].replace(":small",""), function(response) {
                response.pipe(file);
            });
            await sleep(1000);
        }
    }
    //Extraemos un backup del tweet.
    await sleep(2000);
    page.evaluate(function() {
        return getWidth();
    }).then(function(ret){
        width = ret;
    });
    page.evaluate(function() {
        return getHeight();
    }).then(function(ret){
        height = ret;
    });
    await sleep(2000);
    page.property('clipRect', { top: 0, left: 0, width: width, height: height });
    if((tweetId===null)||(tweetId==='0')){
        await instance.exit();
        return;
    }
    var path = 'tmp/snapshot_' + tweetId +'.png';
    page.render(path);

    //Ahora sin media.
    status  = await page.open(protocol+'://'+domain+'/snp/rendered_tweet?id='+tweetId+'&withMedia=false&key='+app_key);
    content = await page.property('content');
    await sleep(4000);

    page.evaluate(function() {
        return getWidth();
    }).then(function(ret){
        width = ret;
    });
    page.evaluate(function() {
        return getHeight();
    }).then(function(ret){
        height = ret;
    });
    await sleep(2000);
    page.property('clipRect', { top: 0, left: 0, width: width, height: height });
    path = 'tmp/snapshot_' + tweetId +'_nomedia.png';
    page.render(path);


    //Ahora para moviles.
    page.property('viewportSize', {width:360,height:500});
    status = await page.open(protocol+'://'+domain+'/snp/rendered_tweet?id='+tweetId+'&withMedia=true&key='+app_key);
    content = await page.property('content');
    await sleep(6000);
    page.evaluate(function() {
        return getWidth();
    }).then(function(ret){
        width = ret;
    });
    page.evaluate(function() {
        return getHeight();
    }).then(function(ret){
        height = ret;
    });
    await sleep(2000);
    page.property('clipRect', { top: 0, left: 0, width: width, height: height });
    path = 'tmp/snapshot_' + tweetId +'_mobile.png';
    page.render(path);


    //Ahora sin media
    page.property('viewportSize', {width:360,height:500});
    status = await page.open(protocol+'://'+domain+'/snp/rendered_tweet?id='+tweetId+'&withMedia=false&key='+app_key);
    content = await page.property('content');
    await sleep(4000);
    page.evaluate(function() {
        return getWidth();
    }).then(function(ret){
        width = ret;
    });
    page.evaluate(function() {
        return getHeight();
    }).then(function(ret){
        height = ret;
    });
    await sleep(2000);
    page.property('clipRect', { top: 0, left: 0, width: width, height: height });
    path = 'tmp/snapshot_' + tweetId +'_mobile_nomedia.png';
    page.render(path);

    console.log("Sending update....");

    var insertFormFunction = getInsertFormFunction(youtubeCode, htmlCode);
    await page.evaluate(insertFormFunction);
    page.uploadFile('input[name=snapshot]', 'tmp/snapshot_' + tweetId +'.png');
    page.uploadFile('input[name=snapshot_mobile]', 'tmp/snapshot_' + tweetId +'_mobile.png');
    page.uploadFile('input[name=snapshot_nomedia]', 'tmp/snapshot_' + tweetId +'_nomedia.png');
    page.uploadFile('input[name=snapshot_mobile_nomedia]', 'tmp/snapshot_' + tweetId +'_mobile_nomedia.png');

    if(uploadImgs.length>0){
        page.uploadFile('input[name=img_0]', uploadImgs[0]);
    }
    if(uploadImgs.length>1){
        page.uploadFile('input[name=img_1]', uploadImgs[1]);
    }
    if(uploadImgs.length>2){
        page.uploadFile('input[name=img_2]', uploadImgs[2]);
    }
    if(uploadImgs.length>3){
        page.uploadFile('input[name=img_3]', uploadImgs[3]);
    }
    page.uploadFile('input[name=video]', "tmp/video_"+tweetId+".mp4");
    await page.evaluate(function() {
        return submitUpdate();
    });
    await sleep(45000);
    var content = await page.property('content');
    console.log(content);
    await instance.exit();
}());

function getImageExtension(url){
    console.log("Getting extension:"+url)
    var params = url.split("?");
    if(params.length>1){
        var params = params[1].split("&");
        for(var i=0;i<params.length;i++){
            var param = params[i].split("=");
            if(param[0]==='format'){
                return param[1];
            }
        }
    }
    var chunks = url.replace(":small","").replace(":large","").split(".");
    return chunks[(chunks.length-1)];
}

function extractVideo(url){
    console.log("Extracting video from:" + url);
    if(url.match("m3u8")!==null){
        var body = [];
        https.get(url, function(res) {
            res.on('data', (chunk) => {
                body.push(chunk);
            }).on('end', function() {
                body = Buffer.concat(body).toString().split(/\r?\n/);
                const mainURL = new URL(url);
                console.log("*******************************************");
                if(body.length>0){
                    for(var i=0;i<body.length;i++){
                        var line = body[i];
                        if(line.match("m3u8")!==null){
                            console.log("Getting definition....");
                            url = mainURL.origin + line;
                            console.log("Extracting final video from url:"+url);
                        }
                    }
                }
                m3u8stream(url)
                    .pipe(fs.createWriteStream('tmp/video_'+tweetId+'.mp4'));
            });
        });
    }else{
        var file    = fs.createWriteStream('tmp/video_'+tweetId+".mp4");
        var request = https.get(url, function(response) {
            response.pipe(file);
        });
    }
}

function getInsertFormFunction(youtubeCode, htmlCode){
    var funcBody = "var youtubeCode = '" + youtubeCode + "';";
    if(htmlCode!==null){
        htmlCode = htmlCode.replace(/'/g, "&#39;");
    }else{
        htmlCode = "";
    }
    funcBody += "var html='"+htmlCode+"';";
    funcBody += "setFormValues(youtubeCode, html);";
    console.log(funcBody);
    return new Function(funcBody);
}
