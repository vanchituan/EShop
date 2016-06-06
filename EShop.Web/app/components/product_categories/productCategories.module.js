/// <reference path="\Assets/admin/libs/angular/angular.js" />
(function () {
    angular.module('eshop.product_categories', ['eshop.common']).
        config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('product_categories', {
                    url: '/product_categories',
                    templateUrl: '/app/components/product_categories/productcategoryListView.html',
                    controller: 'productCategoryListController'
                })

                .state('add_product_category', {
                    url: '/add_product_category',
                    templateUrl: '/app/components/product_categories/productCategoryAddView.html',
                    controller: 'productCategoryAddController'
                })

                .state('edit_product_category', {
                    url: '/edit_product_category/:id',
                    templateUrl: '/app/components/product_categories/productcategoryEditView.html',
                    controller: 'productCategoryEditController'
                });
        }]);
})();