/// <reference path="D:\Git\EShop.Web\Assets/admin/libs/angular/angular.js" />

(function (app) {
    app.controller('productAddController', ['$scope', '$uibModalInstance', 'apiService', 'notificationService', 'warehouseList',
        function ($scope, $uibModalInstance, apiService, notificationService, warehouseList) {

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
                        Name: $scope.Name,
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