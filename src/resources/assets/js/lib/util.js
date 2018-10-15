"use strict";

const browser = require('detect-browser');

var exports = module.exports = {};

var timers = [];

exports.bindEvent = function(element, eventName, eventHandler) {
   if (element.addEventListener){
       element.addEventListener(eventName, eventHandler, false);
   } else if (element.attachEvent) {
       element.attachEvent('on' + eventName, eventHandler);
   }
};

exports.debounce = function(fn, delay, key) {
    return function () {
        var context = this, args = arguments;
        clearTimeout(timers[key]);
        timers[key] = setTimeout(function () {
            fn.apply(context, args);
        }, delay);
    };
};

exports.unique = function(){
    var n = {},r=[];
    for(var i = 0; i < this.length; i++)
    {
        if (!n[this[i]])
        {
            n[this[i]] = true;
            r.push(this[i]);
        }
    }
    return r;
};

exports.formatDateDiff = function(date1, date2){
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    if(diffDays>365){
        var years = Math.round(diffDays/365);
        var strYear = 'year';
        if(years!==1){
            strYear += 's';
        }
        return "More than "+years+' '+strYear+' ago';
    }
    if(diffDays>30){
        var months = Math.round(diffDays/30);
        var strMonth = 'month';
        if(months!==1){
            strMonthr += 's';
        }
        return months+' '+strMonth+' ago';
    }
    if(diffDays>7){
        var weeks = Math.round(diffDays/7);
        var strWeek = 'week';
        if(weeks!==1){
            strYear += 's';
        }
        return weeks+'  '+strWeek+' ago';
    }
    if(diffDays>1){
        return diffDays+' days ago';
    }
    var diffMinutes = Math.round(timeDiff / (60*1000));
    if(diffMinutes>60){
        var hours = Math.round(diffMinutes/60);
        var strHour = 'hour';
        if(hours!==1){
            strHour += 's';
        }
        return hours+' '+strHour+' ago';
    }
    return diffMinutes+' minutes ago';
};

exports.isMsieBrowser = function(){
    if(browser.name==='ie'){
        return true;
    }else{
        return false;
    }
}
