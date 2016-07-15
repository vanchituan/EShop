//storage authentication info after login
(function (app) {
    app.factory('authDataService', authDataService);

    authDataService.$inject = [];

    function authDataService() {
        //var authentication = {
        //    isAuthenticated: false,
        //    userName: ''
        //}

        //return {
        //    authenticationData: authentication
        //}
        var authDataFactory = {};

        var authentication = {
            IsAuthenticated: false,
            userName: ""
        };
        authDataFactory.authenticationData = authentication;

        return authDataFactory;
    }
})(angular.module('eshop.common'));