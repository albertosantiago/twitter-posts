
var debounce = function(fn, delay, key) {
    var self = this;
    if(this.timers == undefined){
        this.timers = [];
    }
    return function () {
        var context = this, args = arguments;
        clearTimeout(self.timers[key]);
        self.timers[key] = setTimeout(function () {
            fn.apply(context, args);
        }, delay);
    };
}

export default debounce;
