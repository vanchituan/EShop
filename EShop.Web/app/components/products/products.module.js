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
            templateUrl: '/app/components/products/views/product-list.view.html',
            controller: 'ProductListController',
            controllerAs : 'product',
            resolve: {
                productsPrepService: productsPrepService
            }
        });
    }

    function productsPrepService(prepService){
        var searchingVm = {
            Page: 0,
            PageSize: 10,
            IsHomePage: false
        }
        var response = prepService.post('/api/product/getlist', searchingVm);
        //var response = prepService.getProductList(searchingVm);
        return response;
    }
})();