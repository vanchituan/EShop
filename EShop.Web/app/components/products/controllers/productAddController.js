(function (app) {
    'use strict';

    app.controller('productAddController', ['$scope', '$filter', '$uibModalInstance', 'apiService', 'notificationService', 'commonService', 'warehouseList',
        function ($scope, $filter, $uibModalInstance, apiService, notificationService, commonService, warehouseList) {

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            }

            $scope.addProduct = function (form) {
                if (form.$valid) {
                    var arr = new Array();
                    var whDetailList = $scope.warehouses;
                    for (var item in whDetailList) {
                        arr.push(whDetailList[item]);
                    }

                    var product = {
                        Name: $filter('capitalizeFilter')($scope.Name),
                        Alias: commonService.getSeoTitle($scope.Name),
                        OrderedDate: commonService.getCurrentDate(),
                        CreatedDate: commonService.getCurrentDate(),
                        Unit: $scope.Unit,
                        Warranty: $scope.Warranty,
                        Status: $scope.Status,
                        Price: $scope.Price,
                        PriceImport: $scope.PriceImport,
                        CategoryId: $scope.CategoryId,
                        Description: $scope.Description || '',
                        WarehouseDetails: arr

                    }

                    console.log(product);
                    return false;

                    apiService.post('/api/product/add', product, function (res) {
                        notificationService.displaySuccess(res.data.Name + ' đã được thêm thành công');
                    }, function (error) {
                        notificationService.displayError('Có lỗi gì đó rồi ông bạn ơi');
                    });
                }
                else {
                    notificationService.displayError('Chưa điền vào các ô đỏ !!');
                }
            }

            function loadWarehouse() {
                var whArr = {};
                for (var i in warehouseList) {
                    whArr[i] = warehouseList[i];
                }
                $scope.warehouses = whArr;
            }

            function loadCategories() {
                apiService.get('/api/productcategory/getall', null, function (res) {
                    $scope.productCategories = res.data;
                }, function (error) {
                    notificationService.displayError('Có lỗi gì đó rồi ông bạn ơi!!')
                })
            }



            loadWarehouse();
            loadCategories();
        }]);

})(angular.module('eshop.products'));