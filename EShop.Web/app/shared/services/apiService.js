/// <reference path="\Assets/admin/libs/angular/angular.js" />

(function (app) {
    app.factory('apiService', ['$http', 'notificationService', function ($http, notificationService) {
        return {
            get: function (url, params, success, failure) {
                $http.get(url, params).then(function (result) {
                    success(result);
                }, function (error) {
                    failure(error);
                });
            },

            post: function (url, data, success, failure) {
                $http.post(url, data).then(function (result) {
                    success(result);
                }, function (error) {
                    console.log(error.status)
                    if (error.status === 401) {
                        notificationService.displayError('Authenticate is required.');
                    }
                    else if (failure != null) {
                        failure(error);
                    }

                });
            },

            put: function (url, data, success, failure) {
                $http.put(url, data).then(function (result) {
                    success(result);
                }, function (error) {
                    console.log(error.status)
                    if (error.status === 401) {
                        notificationService.displayError('Authenticate is required.');
                    }
                    else if (failure != null) {
                        failure(error);
                    }
                });
            },

            remove: function () {

            },
        }
    }]);
})(angular.module('eshop.common'));