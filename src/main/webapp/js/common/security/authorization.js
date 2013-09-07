angular.module('security.authorization', ["security.service"])

    // This service provides guard methods to support AngularJS routes.
    // You can add them as resolves to routes to require authorization levels
    // before allowing a route change to complete
    .provider('authorization', {

        requireAuthenticatedUser: ['authorization', function(authorization) {
            return authorization.requireAuthenticatedUser();
        }],

        $get: ['security', 'securityRetryQueue', function(security, queue) {
            var service = {

                // Require that there is an authenticated user
                requireAuthenticatedUser: function() {
                    return security.whenUserIsLogged();
                }

            };

            return service;
        }]
    });