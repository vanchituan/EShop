(function (app) {
    'use strict';

    app.controller('updateWarehouseController', [
        '$scope', '$uibModalInstance', 'apiService', 'notificationService', function ($scope, $uibModalInstance, apiService, notificationService) {
            $scope.updateWarehouse = function (frmProduct) {
                var frmIsValid = false;
                var warehouseDetailList = $scope.warehouses;
                for (var i = 0; i < warehouseDetailList.length; i++) {
                    if (warehouseDetailList[i].Quantity != null) {
                        frmIsValid = true;
                    }
                }

                if (frmProduct.$valid && frmIsValid) {
                    var whDetail = new Array();
                    for (var j = 0; j < warehouseDetailList.length; j++) {
                        whDetail.push({
                            WarehouseId: warehouseDetailList[j].WarehouseId,
                            ProductId: $scope.ProductName,
                            Quantity: parseInt(warehouseDetailList[j].Quantity)
                        });
                    }
                    //console.log(whDetail);
                    
                    apiService.post('/api/warehousedetail/updatewarehouse', whDetail, function (res) {
                        notificationService.displaySuccess(res.data + ' đã được cập nhật số lượng ');
                        $uibModalInstance.dismiss('cancel');
                    }, function (error) {
                        notificationService.displayError(error);
                    });
                } else {
                    notificationService.displayWarning('Chưa điền đầy đủ thông tin!!');
                }
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            }

            $scope.getCategoriesByParent = function (parentCategory) {
                apiService.post('/api/productcategory/getbyparent/' + parentCategory, null, function (res) {
                    $scope.productCategories = res.data;
                    console.log(res.data);
                }, function (error) {
                    notificationService.displayError(error);
                });
            }

            $scope.getProductsByCategory = function (categoryId) {
                // change parent but run this event .. unknow ?? then
                if (categoryId == null) {
                    return false;
                } else {
                    apiService.post('/api/product/getbycategory/' + categoryId, null,
                    function (res) {
                        $scope.productList = res.data;
                    }, function (error) {
                        notificationService.displayError(error);
                    });
                }
            };

            function loadWarehouse() {
                apiService.get('/api/warehouse/getall', null, function (res) {
                    $scope.warehouses = res.data;
                }, function (error) {
                    notificationService.displayError(error);
                });
            };

            function loadParentCategories() {
                apiService.get('/api/parentcategory/getall', null, function (res) {
                    $scope.parentCategories = res.data;
                }, function (error) {
                    notificationService.displayError(error);
                });
            }


            loadWarehouse();
            loadParentCategories();
        }
    ]);
})(angular.module('eshop.products'));