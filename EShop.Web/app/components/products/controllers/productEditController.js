(function (app) {
    'use strict';
    
    app.controller('productEditController', ['$scope', '$uibModalInstance', '$filter', 'apiService', 'notificationService', 'currentProduct',
        function ($scope, $uibModalInstance, $filter, apiService, notificationService, currentProduct) {
            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            }

            $scope.updateProduct = function (frmProduct) {
                if (frmProduct.$valid) {
                    var product = {
                        CategoryId: $scope.CategoryId,
                        Name: $scope.Name,
                        OrderedDate: $scope.OrderedDate,
                        Price: $scope.Price,
                        PriceImport: $scope.PriceImport,
                        Status: $scope.Status,
                        Unit: $scope.Unit,
                        Warranty: $scope.Warranty,
                        WarehouseDetails: $scope.WarehouseDetails
                    }
                }
                else {
                    notificationService.displayWarning('Chưa điền đầy đủ thông tin!!');
                }
            }

            function categoryList() {
                apiService.get('/api/productcategory/getall', null, function(res) {
                    $scope.productCategories = res.data;
                }, function(error) {
                    notificationService.displayError('Có lỗi gì đó rồi ông bạn ơi!!');
                });
            };


            function loadProductToInput() {
                $scope.product = {
                    Id: currentProduct.Id,
                    CategoryId: currentProduct.CategoryId,
                    Name: currentProduct.Name,
                    OrderedDate: currentProduct.OrderedDate,
                    Price: currentProduct.Price,
                    PriceImport : currentProduct.PriceImport,
                    Status: currentProduct.Status,
                    Unit: currentProduct.Unit,
                    Warranty: currentProduct.Warranty,
                    WarehouseDetails: currentProduct.WarehouseDetails
                }
            };

            categoryList();
            loadProductToInput();

        }]);
})(angular.module('eshop.products'));