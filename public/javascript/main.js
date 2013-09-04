

var myApp = angular.module('myApp', ["ngRoute", "ngAnimate", "ngResource"]);


myApp.config(["$routeProvider", function($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'templates/home.html',
            controller: "HomeController"
        })
        .otherwise({redirectTo : "/home"})
}]);


myApp.run(function() {

});



myApp.controller("HomeController", [function() {

}]);
