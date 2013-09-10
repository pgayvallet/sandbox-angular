
angular.module("common.ui").directive('fieldOnOff', function() {

    return {
        restrict: 'EA',
        replace: true,
        scope: {
            model: '='
        },
        template:
            '<div class="switch" ng-click="toggle()">' +
                '<div class="" ng-class="{\'switch-off\': !model, \'switch-on\': model}">' +
                    '<span class="switch-left">On</span>' +
                    '<span class="knob">&nbsp;</span>' +
                '   <span class="switch-right">Off</span>' +
                '</div>' +
            '</div>',
        link: function($scope, element, attrs) {
            if ($scope.model == null) {
                $scope.model = false;
            }
            return $scope.toggle = function() {
                element.children().addClass("switch-animate");
                return $scope.model = !$scope.model;
            };
        }
    };
});