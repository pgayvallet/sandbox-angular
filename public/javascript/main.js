

var myApp = angular.module('myApp', ["ngRoute", "ngAnimate", "ngResource"]);


myApp.config(["$routeProvider", function($routeProvider) {

    $routeProvider
        .when("/login", {
            controller: "LoginController",
            templateUrl: '/javascript/login/templates/Login.html'
        })
        .when('/home', {
            controller: "HomeController",
            templateUrl: 'templates/home.html'
        })
        .otherwise({redirectTo : "/login"})
}]);


myApp.run(["$rootScope", function($rootScope) {
    $rootScope.$on("$routeChangeStart", function(event, next, current) {
        console.log("$routeChangeStart", arguments);
    });
}]);



myApp.controller("HomeController", ["$scope", "favoriteService", "$http", function($scope, favoriteService, $http) {

    $scope.test = "Koin";


    $scope.foo = function() {
        console.log("fooooo !");
    };

    favoriteService.getFavorites().success(function(favorites) {
        $scope.favorites = favorites;
    });

}]);

myApp.directive('myDirective', function() {

    return {
        restrict: 'E',
        templateUrl: '/templates/my-directive.html',
        replace: true,
        transclude: false,
        scope: false,
        controller: function($scope, $element, $attrs, $transclude) {

        },
        link: function(scope, element, attrs) {
            console.log("link : arguments", arguments);
        }
        // require: 'siblingDirectiveName', // or // ['^parentDirectiveName', '?optionalDirectiveName', '?^optionalParent'],
    };
});

myApp.service("favoriteService", ["$http", function($http) {

    return {
        getFavorites : function() {
            return $http.get("/data/list.json", {
                params : { q : 2}, cache : false
            });
        }
    }

}]);

// http://blog.xebia.com/2013/08/28/bootstraps-tabs-and-lazy-data-loading-in-angularjs/

// http://pascalprecht.github.io/angular-translate/

// http://www.nganimate.org/

// https://github.com/angular-ui/bootstrap/blob/gh-pages/ui-bootstrap-0.5.0.js -> $dialog

myApp.directive('myPills', function () {

    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        controller: function($scope) {

            var controller = this;
            var tabs = $scope.tabs = [];

            this.addTab = function (tab) {
                if (tabs.length == 0) {
                    controller.selectTab(tab);
                }
                tabs.push(tab);
            };

            this.selectTab = function (tab) {
                _.each(tabs, function (tab) {
                    tab.selected = false;
                });
                tab.selected = true;
            };
        },
        template:
            '<div class="pills">' +
                '<div class="nav nav-tabs" ng-transclude></div>' +
                '</div>'
    };
});

myApp.directive('myPill', function () {
    return {
        restrict: 'E',
        replace: true,
        require: '^myPills',
        scope: {
            label: '@'
        },
        link: function($scope, $element, $attrs, pillsController) {
            $scope.selected = false;

            pillsController.addTab($scope);

            $scope.select = function () {
                pillsController.selectTab($scope);
            };

        },
        template:
            '<div class="pill" ng-class="{active: selected}">' +
                '<a href="#" ng-click="select()">{{ label }}</a>' +
                '</div>'
    };
});

myApp.directive("uiButton", function() {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
            class : "@",
            clickHandler : '&click'
        },
        controller : function($scope) {
            $scope.onClick = function($event) {
                $event.preventDefault();
                if($scope.clickHandler) {
                    $scope.clickHandler();
                }
            };
        },
        template: '<a href="#" class="button {{class}}" ng-click="onClick($event);" ng-transclude></a>'
    };

});