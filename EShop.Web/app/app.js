(function () {
    'use strict';

    var app = angular.module('eshop', [
        'eshop.products',
        'eshop.categories',
        'eshop.common'
    ]);

    config.$inject = [
        '$stateProvider',
        '$urlRouterProvider'
    ];
    app.config(config);

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider.state('home', {
            url: "/admin",
            templateUrl: "/app/components/home/home.view.html",
            controller: "HomeController",
            controllerAs : 'ctrl'
        });

        $urlRouterProvider.otherwise('/admin');

        //ngProgressLiteProvider.settings.speed = 1500;
    }
})();