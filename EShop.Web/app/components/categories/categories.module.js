(function () {
    'use strict';

    angular.module('eshop.categories', ['eshop.common']).config(config);

    config.$inject = [
        '$stateProvider',
        
    ];

    function config($stateProvider) {
        $stateProvider
            .state('categories', {
                url: '/categories',
                parent : 'base',
                templateUrl: '/app/components/categories/views/category-list.view.html',
                controller: 'CategoryListController',
                controllerAs : 'category'
            });
    }
})();