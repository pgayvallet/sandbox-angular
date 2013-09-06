

var myApp = angular.module('myApp', ["ngRoute", "ngAnimate", "ngResource"]);


myApp.config(["$routeProvider", function($routeProvider) {

    $routeProvider
        .when('/home', {
            templateUrl: 'templates/home.html',
            controller: "HomeController"
        })
        .otherwise({redirectTo : "/home"})
}]);


myApp.run(["$rootScope", function($rootScope) {
    $rootScope.$on("$routeChangeStart", function(event, next, current) {
        console.log("$routeChangeStart", arguments);
    });
}]);



myApp.controller("HomeController", ["$scope", "favoriteService", "$http", function($scope, favoriteService, $http) {

    $scope.test = "Koin";

    favoriteService.getFavorites().success(function(favorites) {
        $scope.favorites = favorites;
    });

}]);

myApp.directive('myDirective', function() {
    var directive = {
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
    return directive;
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


myApp.directive("myTabs", function() {

});

myApp.directive("myTab", function() {

})