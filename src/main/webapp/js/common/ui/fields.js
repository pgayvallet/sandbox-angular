
angular.module("common.ui").directive("validateOnBlur", function() {

    return {
        restrict: 'A',
        require: ["ngModel", "^form"],
        link: function($scope, element, attrs, controllers) {

            var modelController = controllers[0];
            var formController = controllers[1];


            var qtip = $(element).qtip({
                content: {
                    text: 'You moused over the first H1 element on the document.'
                },
                show : {
                    event : false
                },
                hide: false
            }).qtip('api');

            // $('.selector').qtip('toggle', true);
            // $('.selector').qtip('option', 'content.text', 'New content');

            $(element).blur(function(event) {
                $scope.$apply(function() {
                    if(modelController.$valid) {
                        $(element).removeClass("has-error");
                        qtip.toggle(false);
                    } else {
                        $(element).addClass("has-error");
                        qtip.set('content.text', modelController.$error);
                        qtip.toggle(true);
                    }
                });
            });

            /*
            $scope.$watch(function() {
                return modelController.$viewValue;
            }, function(newValue, oldValue) {
                console.log("model value changed !", modelController.$valid)
            });
            */

        }
    };


});

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