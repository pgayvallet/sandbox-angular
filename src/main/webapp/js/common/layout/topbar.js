
angular.module("common.layout")
    .directive("appTopbar", function() {
        return {
            restrict: 'E',
            replace: true,
            link: function($scope, $element, $attrs) {
            },
            template: [
                '<div class="navbar navbar-fixed-top">',
                    '<div class="navbar-inner">',
                    '</div>',
                '</div>'
            ].join("")
        };
    });