(function () {
    'use strict';

    angular.module('eshop.orders', ['eshop.common']).config(config);

    config.$inject = ['$stateProvider'];

    function config($stateProvider) {
        $stateProvider.state('orders', {
            url: '/orders',
            parent: 'base',
            templateUrl: '/app/components/orders/order.view.html',
            controller: 'OrderController',
            controllerAs : 'order'

        });
    }
})();