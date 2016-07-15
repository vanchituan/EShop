(function () {
    'use strict';

    angular.module('eshop', [
        'eshop.products',
        'eshop.categories',
        'eshop.reports',
        'eshop.orders',
        'eshop.common'
    ])
        .config(config);

    config.$inject = [
        '$stateProvider',
        '$urlRouterProvider'
    ];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider.
            state('base', {
                url: '',
                templateUrl: '/app/shared/views/base.view.html',
                abstract: true
            }).
            state('login', {
                url: "/login",
                templateUrl: "/app/components/login/login.view.html",
                controller: "LoginController"
            }).
            state('home', {
                url: "/admin",
                parent: 'base',
                templateUrl: "/app/components/home/views/home.view.html",
                controller: "HomeController",
                controllerAs: 'ctrl'
            });

        $urlRouterProvider.otherwise('/login');
    }

    function configAuthentication($httpProvider) {
        $httpProvider.interceptors.push(function ($q, $location) {
            return {
                request: function (config) {
                    return config;
                },

                requestError: function (rejection) {
                    return $q.reject(rejection);
                },

                response: function (response) {
                    if (response.status == "401") {
                        $location.path('/login');
                    }
                    //the same response/modified/or a new one need to be returned.
                    return response;
                },

                responseError: function (rejection) {
                    if (rejection.status == "401") {
                        $location.path('/login');
                    }
                    return $q.reject(rejection);
                }
            }
        });
    }
})();