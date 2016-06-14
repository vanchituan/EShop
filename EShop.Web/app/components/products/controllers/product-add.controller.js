(function (app) {
    'use strict';

    app.controller('ProductAddController', ProductAddController);
    ProductAddController.$inject = [
        '$filter',
        '$uibModalInstance',
        'apiService',
        'notificationService',
        'commonService',
        'warehouseList'
    ];

    function ProductAddController($filter, $uibModalInstance, apiService, notificationService, commonService, warehouseList) {
        var vm = this;
        vm.cancel = cancel;
        vm.addProduct = addProduct;

        function addProduct(form){
            if (form.$valid) {
                var arr = new Array();
                var whDetailList = vm.warehouses;
                for (var item in whDetailList) {
                    arr.push(whDetailList[item]);
                }

                var product = {
                    Name: $filter('capitalizeFilter')(vm.Name),
                    Alias: commonService.getSeoTitle(vm.Name),
                    OrderedDate: commonService.getCurrentDate(),
                    CreatedDate: commonService.getCurrentDate(),
                    Unit: vm.Unit,
                    Warranty: vm.Warranty,
                    Status: vm.Status,
                    Price: vm.Price,
                    PriceImport: vm.PriceImport,
                    CategoryId: vm.CategoryId,
                    Description: vm.Description || '',
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

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        function loadWarehouse() {
            var whArr = {};
            for (var i in warehouseList) {
                whArr[i] = warehouseList[i];
            }
            vm.warehouses = whArr;
        }

        function loadCategories() {
            apiService.get('/api/productcategory/getall', null, function (res) {
                vm.productCategories = res.data;
            }, function (error) {
                notificationService.displayError('Có lỗi gì đó rồi ông bạn ơi!!')
            })
        }

        loadWarehouse();
        loadCategories();
    };

})(angular.module('eshop.products'));