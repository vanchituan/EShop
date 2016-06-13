(function(){
    'use strict';

    angular.module('eshop.orders', ['eshop.common']).config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider.state('orders', {
                url: '/orders',
                controller: 'orderListController',
                templateUrl: '/app/components/products/orderListView.html'
            });
        }]);
})();