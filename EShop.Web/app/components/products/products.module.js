(function () {
    'use strict';

    angular.module('eshop.products', ['eshop.common']).config(config);

    config.$inject = [
        '$stateProvider',
        '$urlRouterProvider',
    ];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider.state('products', {
            url: '/products',
            parent: 'base',
            templateUrl: '/app/components/products/views/product-list.view.html',
            controller: 'ProductListController',
            controllerAs: 'product'
        });
    }
})();