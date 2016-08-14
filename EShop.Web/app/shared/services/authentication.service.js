(function (app) {
    'use strict';
    app.service('authenticationService', authenticationService);

    authenticationService.$inect = [
        '$http',
        '$q',
        '$window',
        'authDataService'
    ];

    function authenticationService($http, $q, $window, authDataService) {
        var tokenInfo;

        this.setTokenInfo = function (data) {
            tokenInfo = data;
            $window.localStorage["TokenInfo"] = JSON.stringify(tokenInfo);
        }

        this.getTokenInfo = function () {
            return tokenInfo;
        }

        this.removeToken = function () {
            tokenInfo = null;
            $window.localStorage["TokenInfo"] = null;
        }

        this.init = function () {
            if ($window.localStorage["TokenInfo"]) {
                tokenInfo = JSON.parse($window.localStorage["TokenInfo"]);
                if (tokenInfo != null) {
                    authDataService.authenticationData.IsAuthenticated = true;
                    authDataService.authenticationData.userName = tokenInfo.userName;
                }
            }
        }

        this.setHeader = function () {
            delete $http.defaults.headers.common['X-Requested-With'];
            if ((tokenInfo != undefined) && (tokenInfo.accessToken != undefined)
                && (tokenInfo.accessToken != null) && (tokenInfo.accessToken != "")) {
                $http.defaults.headers.common['Authorization'] = 'Bearer ' + tokenInfo.accessToken;
                $http.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
            }
        }

        this.validateRequest = function () {
            var url = 'api/home/TestMethod';
            var deferred = $q.defer();
            $http.get(url).then(function () {
                deferred.resolve(null);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }

        this.init();
    }
})(angular.module('eshop.common'));