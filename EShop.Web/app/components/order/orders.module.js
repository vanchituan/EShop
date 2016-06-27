(function () {
    'use strict';

    angular.module('eshop.orders', ['eshop.common']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider.state('orders', {
            url: '/orders',
            controller: 'OrderListController',
            templateUrl: '/app/components/orders/order-list.view.html'
        });
    }
})();