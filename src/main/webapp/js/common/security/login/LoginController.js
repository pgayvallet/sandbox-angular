
angular.module("security.login").controller("LoginController", ["$scope", "security", function($scope, security) {

    $scope.username = "";
    $scope.password = "";

    $scope.onLoginSubmit = function() {
        security.login($scope.username, $scope.password);
    }

}]);