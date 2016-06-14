(function (app) {
    app.factory('prepService', prepService);

    prepService.$inject = ['$http'];

    function prepService($http) {
        return {
            get: get,
            post: post
        }

        function get(url, params) {
            var promise = $http({
                method: 'GET',
                url: url,
                data: params,
            }).success(function (data, status, headers, config) {
                return data;
            });
            return promise;
        }

        function post(url, params) {
            var promise = $http({
                method: 'POST',
                url: url,
                data: params,
            }).success(function (data, status, headers, config) {
                return data;
            });
            return promise;
        }
    }
})(angular.module('eshop.common'));