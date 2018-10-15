const http    = require('http');
const https   = require('https');
const fs      = require('fs');
const phantom = require('phantom');
const atob    = require('atob');
const m3u8stream = require('m3u8stream');
const { URL } = require('url');


var skip = 0;
if(process.argv.length>2){
    skip = process.argv[2];
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async function() {
    const instance = await phantom.create(['--ignore-ssl-errors=yes', '--web-security=false']);
    const page = await instance.createPage();
    page.property('onUrlChanged', function(targetUrl) {
        console.log('New URL: ' + targetUrl);
    });
    var url = "https://twitter-posts.com/snp/pendingHtml?key=__caca__";
    if(skip!==0){
        url += '&skip='+skip;
    }
    var status = await page.open(url);
}());
