angular.module('security.interceptor', ["security.service"])
    /*
     * Intercepts
     */
    .factory("securityInterceptor", ["$q", "securityRetryQueue", function($q, securityRetryQueue) {
        return {
            'responseError': function(response) {
                if(response.status==401) {
                    return securityRetryQueue.pushRetryFn('unauthorized-server', function () {});
                }
                return $q.reject(response);
            }
        }
    }])
    /*
     * Adds the security interceptor to the $http interceptors
     */
    .config(["$httpProvider", function($httpProvider) {
        $httpProvider.interceptors.push('securityInterceptor');
    }]);
