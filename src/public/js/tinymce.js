webpackJsonp([5],{432:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(2),r=n.n(a),i=n(1),o=(n.n(i),n(5)),d=(n.n(o),n(11)),s=(n.n(d),n(7)),l=n(187);window.__editing=!0,window.__replaced_components=[],s.a.set("twitterManager",new l.a),n(182),n(180),n(183),n(184),n(181),n(186),n(185);var p=(n(11),["twp-post-img","twp-post-link","twp-post-mention","twp-gallery","twp-tweet-thread","twp-tweet"]),c=function(){for(var e=0;e<p.length;e++){var t=p[e],n=document.getElementsByTagName(t);if(n.length>0)for(var a=0;a<n.length;a++){var r=n[a],i=r.getAttribute("id");if(-1===window.__replaced_components.indexOf(i)){window.__replaced_components.push(i);for(var o=r.attributes.length,d=document.createElement(t),s=0;s<o;s++)d.setAttribute(r.attributes[s].localName,r.attributes[s].value);var l=r.innerHTML;d.innerHTML=l,r.parentNode.replaceChild(d,r)}}}};if(!n.i(d.isMsieBrowser)()){var w=new MutationObserver(function(e,t){e.forEach(function(e){if(e.addedNodes.length>0)for(var t=0;t<e.addedNodes.length;t++){var n=e.addedNodes[t];if(void 0!==n.tagName){var a=n.tagName.toLowerCase();if(-1!==p.indexOf(a)){var i=n.getAttribute("id");if(-1===window.__replaced_components.indexOf(i)){for(var o=document.createElement(a),d=0,s=n.attributes.length;d<s;d++)o.setAttribute(n.attributes[d].localName,n.attributes[d].value);for(var l=n.getElementsByTagName("twp-data");l.length>0;){var c=l[0];o.appendChild(c)}window.__replaced_components.push(i),r()(n).replaceWith(o)}}}}})}),u={childList:!0,subtree:!0};w.observe(document.getElementsByTagName("body")[0],u)}n.i(d.isMsieBrowser)()&&window.setInterval(c,4e3),c()},899:function(e,t,n){e.exports=n(432)}},[899]);