/// <reference path="D:\Git\EShop.Web\Assets/admin/libs/angular/angular.js" />
(function (app) {
    app.controller('productCategoryListController', ['$scope', 'apiService', function ($scope, apiService) {
        apiService.get('/api/productcategory/getall', null, function (res) {
            console.log(res.data);
            $scope.productCategories = res.data;
        });
    }]);
})(angular.module('eshop.product_categories'));