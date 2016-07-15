(function (app) {
    'use strict';
    app.service('loginService', loginService);

    loginService.$inject = [
        '$http',
        '$q',
        'authenticationService',
        'authDataService'
    ];

    function loginService($http, $q, authenticationService, authDataService) {
        var userInfo;
        var deferred;

        this.login = function (userName, password) {
            deferred = $q.defer();
            var data = "grant_type=password&username=" + userName + "&password=" + password;
            $http.post('/oauth/token', data, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).success(function (response) {
                userInfo = {
                    accessToken: response.access_token,
                    userName: userName
                };
                authenticationService.setTokenInfo(userInfo);
                authDataService.authenticationData.IsAuthenticated = true;
                authDataService.authenticationData.userName = userName;
                deferred.resolve(null);
            })
            .error(function (err, status) {
                authDataService.authenticationData.IsAuthenticated = false;
                authDataService.authenticationData.userName = "";
                deferred.resolve(err);
            });
            return deferred.promise;
        }

        this.logout = function () {
            authenticationService.removeToken();
            authDataService.authenticationData.IsAuthenticated = false;
            authDataService.authenticationData.userName = "";
        }
    }
})(angular.module('eshop.common'));