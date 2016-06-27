(function () {
    'use strict';

    angular.module('eshop.categories', ['eshop.common']).config(config);

    config.$inject = [
        '$stateProvider',
        '$urlRouterProvider'
    ];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('categories', {
                url: '/categories',
                templateUrl: '/app/components/categories/views/category-list.view.html',
                controller: 'CategoryListController',
                controllerAs : 'category'
            });
    }
})();