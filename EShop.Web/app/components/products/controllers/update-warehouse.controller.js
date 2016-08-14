(function (app) {
    'use strict';

    app.controller('UpdateWarehouseController', UpdateWarehouseController);
    UpdateWarehouseController.$inject = [
        '$uibModalInstance',
        'apiService',
        'notificationService',
        'commonService'
    ];

    function UpdateWarehouseController($uibModalInstance, apiService, notificationService, commonService) {
        var vm = this;
        vm.itemList = [];
        //binding events
        vm.cancel = cancel;
        vm.updateWarehouse = updateWarehouse
        vm.getProductsByCategory = getProductsByCategory;
        vm.addItemList = addItemList;
        vm.setClass = setClass;
        vm.removeProduct = removeProduct;

        function cancel() {
            $uibModalInstance.dismiss();
        }

        function removeProduct(productName) {
            var index = -1;
            for (var i = 0; i < vm.itemList.length; i++) {
                if (vm.itemList[i].Name === productName) {
                    index = i;
                    break;
                }
            }
            vm.itemList.splice(index, 1);//1 is number is removed
        }

        function updateWarehouse(frmProduct) {
            var itemList = vm.itemList;
            
            if (frmProduct.$valid) {
                var productList = new Array();
                for (var i = 0; i < itemList.length; i++) {
                    productList.push({
                        Id: itemList[i].Id,
                    });
                    for (var j = 0; j < itemList[i].WarehouseDetails.length; j++) {
                        console.log('WarehouseDetails.length have length : ' + itemList[i].WarehouseDetails.length);
                        productList[i].WarehouseDetails = new Array();
                        productList[i].WarehouseDetails.push({
                            Quantity: parseInt(itemList[i].WarehouseDetails[j].AddonQuantity),
                            WarehouseId: itemList[i].WarehouseDetails[j].Warehouse.WarehouseId,
                            ProductId: itemList[i].Id
                        });
                    }
                }
                //    //console.log(itemList[i].WarehouseDetails);
                //    //for (var item in itemList[i].WarehouseDetails) {
                //    //    productList[i].WarehouseDetails = new Array();
                //    //    productList[i].WarehouseDetails.push({
                //    //        WarehouseId: itemList[i].WarehouseDetails[item].Warehouse.WarehouseId,
                //    //        ProductId: itemList[i].Id,
                //    //        Quantity: parseInt(itemList[i].WarehouseDetails[item].AddonQuantity)
                //    //    });
                //    //}
                //}
                //console.log(productList);

                console.log(itemList);
                return;
                apiService.post('/api/warehousedetail/updatewarehouse', whDetail, function (res) {
                    if (res.statusText === 'OK') {
                        notificationService.displaySuccess(res.data + ' đã được cập nhật số lượng ');
                        cancel();
                    }
                }, function (error) {
                    notificationService.displayWarning(error.data);
                });
            }
            else {
                notificationService.displayWarning('Chưa điền đầy đủ thông tin!!');
            }
        }

        function getProductsByCategory(category) {
            apiService.post('/api/product/getlistbycategory?categoryId=' + category.Id, null,
            function (res) {
                vm.list = res.data;
            }, function (error) {
                notificationService.displayError(error);
            });

        }

        function addItemList(product) {
            var isExisted = false;
            for (var item in vm.itemList) {
                if (vm.itemList[item].Name === product.Name) {
                    isExisted = true;
                    break;
                }
            }

            if (!isExisted) {
                apiService.post('/api/product/getrelatedbyid?id=' + product.Id, null, function (res) {
                    vm.currentProduct = res.data;
                    vm.itemList.push(res.data);
                });
            }
            //console.log(vm.itemList);
        }

        function loadCategory() {
            apiService.get('/api/productcategory/getall/', null, function (res) {
                vm.productCategories = res.data;
            }, function (error) {
                notificationService.displayError(error);
            });
        }

        function loadWarehouses() {
            apiService.get('/api/warehouse/getall', null, function (res) {
                vm.warehouses = res.data;
            }, function (error) {
                notificationService.displayError('Lỗi lấy dữ liệu');
            });
        }

        function setClass(quantity) {
            return commonService.setClassForQuantity(quantity);
        }

        loadCategory();
        loadWarehouses();
    };

})(angular.module('eshop.products'));