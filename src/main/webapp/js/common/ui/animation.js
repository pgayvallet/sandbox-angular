angular.module("common.ui").animation('.shake', function() {
    return {
        enter : function(element, done) { done(); },
        leave : function(element, done) { done(); },
        move : function(element, done) { done(); },
        addClass : function(element, className, done) {
            $(element).css({
                color:'#FF0000',
                opacity: 0
            });
            $(element).animate({
                opacity: 1
            }, 2000, done);

            return function() {
                $(element).stop().css({opacity : 1});
            };
        },
        removeClass : function(element, className, done) {
            $(element).stop().css({opacity : 1});
            done();
        }
    };
});