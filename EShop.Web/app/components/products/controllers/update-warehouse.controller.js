﻿(function (app) {
    'use strict';

    app.controller('UpdateWarehouseController', UpdateWarehouseController);
    UpdateWarehouseController.$inject = [
        '$uibModalInstance',
        'apiService',
        'notificationService'
    ];

    function UpdateWarehouseController($uibModalInstance, apiService, notificationService) {
        var vm = this;
        vm.updateWarehouse = updateWarehouse
        vm.cancel = cancel;
        vm.getCategoriesByParent = getCategoriesByParent;
        vm.getProductsByCategory = getProductsByCategory;

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        function updateWarehouse(frmProduct){
            var frmIsValid = false;
            var warehouseDetailList = vm.warehouses;
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
                        ProductId: vm.ProductName,
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
        }

        function loadWarehouse() {
            apiService.get('/api/warehouse/getall', null, function (res) {
                vm.warehouses = res.data;
            }, function (error) {
                notificationService.displayError(error);
            });
        }

        function getProductsByCategory(categoryId) {
            // change parent but run this event .. unknow ?? then
            if (categoryId == null) {
                return false;
            } else {
                apiService.post('/api/product/getbycategory/' + categoryId, null,
                function (res) {
                    vm.productList = res.data;
                }, function (error) {
                    notificationService.displayError(error);
                });
            }
        }

        function getCategoriesByParent(parentCategory) {
            apiService.post('/api/productcategory/getbyparent/' + parentCategory, null, function (res) {
                vm.productCategories = res.data;
                console.log(res.data);
            }, function (error) {
                notificationService.displayError(error);
            });
        }

        function loadParentCategories() {
            apiService.get('/api/parentcategory/getall', null, function (res) {
                vm.parentCategories = res.data;
            }, function (error) {
                notificationService.displayError(error);
            });
        }

        loadWarehouse();
        loadParentCategories();
    };

})(angular.module('eshop.products'));