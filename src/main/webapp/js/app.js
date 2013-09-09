
// http://docs.angularjs.org/guide/ie
// https://github.com/angular-app/angular-app/issues/126
http://www.yearofmoo.com/2013/08/remastered-animation-in-angularjs-1-2.html#how-to-make-animations-in-angularjs

var myApp = angular.module('myApp', ["security", "ngRoute", "ngAnimate", "ngResource","pascalprecht.translate"]);


myApp.config(["$routeProvider", "$httpProvider", "$translateProvider", "authorizationProvider",
    function($routeProvider, $httpProvider, $translateProvider, authorizationProvider) {

    $translateProvider.useUrlLoader("/rest/translations");
    $translateProvider.preferredLanguage('en_US');

    // make angular using form data instead of json for $http.post params
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    $httpProvider.defaults.transformRequest.unshift(function(data) {
        /*
        function isFile(obj) {
            return toString.apply(obj) === '[object File]';
        }
        */
        if(_.isObject(data)) {
            return $.param(data);
        }
        return data;
    });


    $httpProvider.interceptors.push('unwrappingResponseInterceptor');


    $routeProvider
        /*
        .when("/login", {
            controller: "LoginController",
            templateUrl: '/js/login/templates/Login.html',
            resolve : {
            },
            security : { level : "public" }
        })
        */
        .when('/home', {
            controller: "HomeController",
            templateUrl: 'templates/home.html',
            resolve : {
                access : authorizationProvider.requireAuthenticatedUser
            }
        })
        .otherwise({
            redirectTo : "/home"
        });
}]);


myApp.run(["$rootScope", "$location", "security", function($rootScope, $location, security) {

    security.requestCurrentUser();
    /*


    $rootScope.$on("$routeChangeStart", function(event, next, current) {
        var routeSecurity = next.$$route.security;
        var securityLevel = routeSecurity && routeSecurity.level || "private";
        if(securityLevel=="private") {
            $location.path("/login");
        }
    });
    */
}]);


myApp.factory("unwrappingResponseInterceptor", ["$q", function($q) {

    return {
        'response': function(response) {
            // console.log("*** response interceptor, ", response.headers("Content-Type"), response.data);
            if(/json/.test(response.headers("Content-Type"))) {
                console.log("*** unwrappingInterceptor");
                response.data = response.data.response;
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
        scope: false
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

// myApp.provider("application")

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