//STUB del plugin de login.
(function($){
    $.oauthpopup = function(options){
        options.callback();
    };
    $.fn.oauthpopup = function(options) {
        $this = $(this);
        $this.click($.oauthpopup.bind(this, options));
    };
})(jQuery);
