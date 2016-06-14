(function (app) {
    'use strict';

    app.controller('CategoryListController', CategoryListController);
    CategoryListController.$inject = [
        '$scope',
        'apiService'
    ];

    function CategoryListController($scope, apiService) {
        apiService.get('/api/productcategory/getall', null, function (res) {
            console.log(res.data);
            $scope.productCategories = res.data;
        });
    };
})(angular.module('eshop.categories'));