
angular.module("security.login").factory('loginBox', ['$http', '$q', '$location', 'securityRetryQueue', '$dialog', function($http, $q, $location, queue, $dialog) {

    // Redirect to the given url (defaults to '/')
    function redirect(url) {
        url = url || '/';
        $location.path(url);
    }

    // Login form dialog stuff
    var loginDialog = null;

    return {

        openLoginDialog : function() {
            if ( loginDialog ) {
                throw new Error('Trying to open a dialog that is already open!');
            }
            loginDialog = $dialog.dialog({
                backdropClick : false,
                keyboard : false,
                dialogFade : true,
                transitionClass : "shake"
            });
            loginDialog.open('/js/common/security/login/Login.html', 'LoginController')
                .then(this.onLoginDialogClose);
        },

        closeLoginDialog : function (success) {
            if (loginDialog) {
                loginDialog.close(success);
            }
        },

        onLoginDialogClose : function (success) {
            loginDialog = null;

            if ( success ) {
                queue.retryAll();
            } else {
                queue.cancelAll();
                // redirect();
            }
        }

    };

}]);