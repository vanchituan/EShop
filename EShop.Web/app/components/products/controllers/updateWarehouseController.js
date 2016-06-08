(function (app) {
    'use strict';

    app.controller('updateWarehouseController', ['$scope', '$uibModalInstance', 'apiService', 'notificationService', function ($scope, $uibModalInstance, apiService, notificationService) {

        $scope.updateWarehouse = function (frmProduct) {

        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.getCategoryByParent = function (parentCategory) {
            console.log(parentCategory);
        }

            function loadWarehouse() {
            apiService.get('/api/warehouse/getall', null, function (res) {
                $scope.warehouses = res.data;
            }, function (error) {
                notificationService.displayError(error);
            });
        };

            function loadParentCategories() {
            var valueInitForParentCategory = 1;
            apiService.get('/api/parentcategory/getall', null, function (res) {
                $scope.parentCategories = res.data;
                $scope.ParentCategory = valueInitForParentCategory;
                //$scope.productCategories = getProductCategoryByParent(valueInitForParentCategory);
                console.log(getProductCategoryByParent(valueInitForParentCategory));

            }, function (error) {
                notificationService.displayError(error);
            });
        }

            function getProductCategoryByParent(valueInitForParentCategory) {
            var productCategories = new Array();
            apiService.post('/api/productcategory/x', valueInitForParentCategory, function (res) {
               productCategories = res.data;
            }, function (error) {
                notificationService.displayError(error);
            });
            console.log(productCategories);
            return productCategories;
        };


        loadWarehouse();
            //getProductCategoryByParent(1);
            //loadParentCategories();
    }])
})(angular.module('eshop.products'));