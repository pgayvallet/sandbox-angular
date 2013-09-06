

var myApp = angular.module('myApp', ["ngRoute", "ngAnimate", "ngResource"]);


myApp.config(["$routeProvider", "$httpProvider", function($routeProvider, $httpProvider) {

    $httpProvider.interceptors.push('unwrappingResponseInterceptor');

    $routeProvider
        .when("/login", {
            controller: "LoginController",
            templateUrl: '/js/login/templates/Login.html',
            resolve : {
                "user" : ["$q", "$http", function($q, $http) {
                    console.log("loading user");
                    return $http.get("/rest/user");
                    // return $q.defer().promise;
                }]
            },
            security : { level : "public" }
        })
        .when('/home', {
            controller: "HomeController",
            templateUrl: 'templates/home.html'
        })
        .otherwise({
            redirectTo : "/login"
        });
}]);


myApp.run(["$rootScope", "$location", "securityService", function($rootScope, $location, securityService) {
    $rootScope.$on("$routeChangeStart", function(event, next, current) {
        var routeSecurity = next.$$route.security;
        var securityLevel = routeSecurity && routeSecurity.level || "private";
        if(securityLevel=="private") {
            $location.path("/login");
        }
    });
}]);


myApp.factory("unwrappingResponseInterceptor", ["$q", function($q) {

    return {
        'response': function(response) {
            console.log("*** response interceptor, ", response.headers("Content-Type"), response.data);
            if(/json/.test(response.headers("Content-Type"))) {
                response.data = response.response;
            }
            return response;
        }
    }

}]);

myApp.provider("securityService", [function() {

    var provider = this;

    provider.roles = {

    }

    this.$get = ["$http", function($http) {
        return {
            roles : provider.roles
        }
    }];

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

myApp.service("loaderService", [function() {

    return {

        show : function() {
            $.blockUI({
                message : '<div class="circle"></div><div class="circle1"></div>',
                css : {
                    backgroundColor: "transparent",
                    border: "none"
                }

            });

        },

        hide : function() {
            $.unblockUI();
        },

        showUntil : function(promise) {
            // TODO
        }


    }

}]);


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