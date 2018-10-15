window.__editing = true;
window.__replaced_components = [];

import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import {isMsieBrowser} from 'app/lib/util';

import App from 'app/app';
import TwitterManager from 'app/lib/TwitterManager';
App.set('twitterManager', new TwitterManager());

require("app/components/tags/twp-post-img");
require("app/components/tags/twp-example");
require("app/components/tags/twp-post-link");
require("app/components/tags/twp-post-mention");
require("app/components/tags/twp-gallery");
require("app/components/tags/twp-tweet");
require("app/components/tags/twp-tweet-thread");

var util = require('./lib/util.js');

var tagsToReplace = [
    "twp-post-img",
    "twp-post-link",
    "twp-post-mention",
    "twp-gallery",
    "twp-tweet-thread",
    "twp-tweet"
];

var replaceTags = function(){
    for(var i=0; i< tagsToReplace.length;i++){
        var tagName     = tagsToReplace[i];
        var currentTags = document.getElementsByTagName(tagName);
        if(currentTags.length>0){
            for(var x=0; x <currentTags.length;x++){
                var node = currentTags[x];
                var nodeId = node.getAttribute('id');
                if(window.__replaced_components.indexOf(nodeId)===-1){
                    window.__replaced_components.push(nodeId);
                    var attrLength = node.attributes.length;
                    var tag  = document.createElement(tagName);
                    for(var f=0;f<attrLength;f++){
                        tag.setAttribute(node.attributes[f].localName, node.attributes[f].value);
                    }
                    var html = node.innerHTML;
                    tag.innerHTML = html;
                    node.parentNode.replaceChild(tag, node);
                }
            }
        }
    }
};


if(!isMsieBrowser()){
    var observer = new MutationObserver(function(mutations, mutationObserver) {
        mutations.forEach(function(mutation) {
          if(mutation.addedNodes.length>0){
              for(var i=0; i < mutation.addedNodes.length; i++){
                  var node = mutation.addedNodes[i];
                  if(node.tagName===undefined){
                      continue;
                  }
                  var tagName = node.tagName.toLowerCase();
                  if(tagsToReplace.indexOf(tagName)!==-1){
                      var nodeId = node.getAttribute('id');
                      if(window.__replaced_components.indexOf(nodeId)===-1){
                          var newTag = document.createElement(tagName);
                          for(var x=0,n=node.attributes.length; x<n;x++){
                              newTag.setAttribute(node.attributes[x].localName, node.attributes[x].value);
                          }
                          var childs = node.getElementsByTagName('twp-data');
                          while(childs.length>0){
                              var child = childs[0];
                              newTag.appendChild(child);
                          }
                          window.__replaced_components.push(nodeId);
                          $(node).replaceWith(newTag);
                      }
                  }
              }
          }
      });
    });
    var config = {childList: true, subtree: true};
    observer.observe(document.getElementsByTagName('body')[0], config);
}

if(isMsieBrowser()){
    window.setInterval(replaceTags, 4000);
}

replaceTags();
