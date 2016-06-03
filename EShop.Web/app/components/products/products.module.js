/// <reference path="D:\Git\EShop.Web\Assets/admin/libs/angular/angular.js" />

(function () {
    angular.module('eshop.products', ['eshop.common']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider.
            state('products', {
                url: '/products',
                controller: 'productListController',
                templateUrl: '/app/components/products/views/productListView.html'
            });
    }
})();