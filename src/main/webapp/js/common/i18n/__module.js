

angular.module("common.i18n", ["pascalprecht.translate"])
    // .constant('$STORAGE_KEY', 'NG_TRANSLATE_LANG_KEY')
    .config(["$translateProvider", function($translateProvider) {

        $translateProvider.useUrlLoader("/rest/translations");
        $translateProvider.translationNotFoundIndicator("?");
        $translateProvider.preferredLanguage('en_US');

    }]);