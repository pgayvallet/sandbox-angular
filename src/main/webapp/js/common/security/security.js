angular.module('security.service', [])
    .factory('security', ['$http', '$q', '$location', 'securityRetryQueue', "loginBox", function($http, $q, $location, queue, loginBox) {

        // Register a handler for when an item is added to the retry queue
        queue.onItemAddedCallbacks.push(function(retryItem) {
            if ( queue.hasMore() ) {
                service.showLogin();
            }
        });

        var loggedUserDefer = $q.defer();

        // The public API of the service
        var service = {

            // Information about the current user
            currentUser: null,

            // Show the modal login dialog
            showLogin: function() {
                loginBox.openLoginDialog();
            },

            // Attempt to authenticate a user by the given email and password
            login: function(username, password) {
                var request = $http.post('/rest/user/authenticate', {
                    username: username, password: password
                });
                return request.then(function(response) {
                    service.currentUser = response;
                    if ( service.isAuthenticated() ) {
                        loginBox.closeLoginDialog(true);
                    }
                });
            },

            // Logout the current user and redirect
            logout: function(redirectTo) {
                // TODO
                /*
                $http.post('/logout').then(function() {
                    service.currentUser = null;
                    $location.path(redirectTo || "/");
                });
                */
            },

            // Ask the backend to see if a user is already authenticated - this may be from a previous session.
            requestCurrentUser: function() {
                if ( service.isAuthenticated() ) {
                    return $q.when(service.currentUser);
                } else {
                    $http.get('/rest/user').then(function(response) {
                        service.currentUser = response;
                        loggedUserDefer.resolve(response);
                        return service.currentUser;
                    });
                    return service.whenUserIsLogged();
                }
            },

            whenUserIsLogged : function() {
                return loggedUserDefer.promise;
            },

            // Is the current user authenticated?
            isAuthenticated: function(){
                return !!service.currentUser;
            }

        };

        return service;
    }]);