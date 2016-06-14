(function (app) {
    'use strict';

    app.controller('ProductEditController', ProductEditController);

    ProductEditController.$inject = [
        '$uibModalInstance',
        '$filter',
        'apiService',
        'notificationService',
        'currentProduct'
    ];

    function ProductEditController($uibModalInstance, $filter, apiService, notificationService, currentProduct) {
        vm.cancel = cancel;
        vm.updateProduct = updateProduct;

        function categoryList() {
            apiService.get('/api/productcategory/getall', null, function (res) {
                vm.productCategories = res.data;
            }, function (error) {
                notificationService.displayError('Có lỗi gì đó rồi ông bạn ơi!!');
            });
        }

        function updateProduct(frmProduct){
            if (frmProduct.$valid) {
                var product = {
                    CategoryId: vm.CategoryId,
                    Name: vm.Name,
                    OrderedDate: vm.OrderedDate,
                    Price: vm.Price,
                    PriceImport: vm.PriceImport,
                    Status: vm.Status,
                    Unit: vm.Unit,
                    Warranty: vm.Warranty,
                    WarehouseDetails: vm.WarehouseDetails
                }
            }
            else {
                notificationService.displayWarning('Chưa điền đầy đủ thông tin!!');
            }
        }
        function loadProductToInput() {
            vm.product = {
                Id: currentProduct.Id,
                CategoryId: currentProduct.CategoryId,
                Name: currentProduct.Name,
                OrderedDate: currentProduct.OrderedDate,
                Price: currentProduct.Price,
                PriceImport: currentProduct.PriceImport,
                Status: currentProduct.Status,
                Unit: currentProduct.Unit,
                Warranty: currentProduct.Warranty,
                WarehouseDetails: currentProduct.WarehouseDetails
            }
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        categoryList();
        loadProductToInput();

    };
})(angular.module('eshop.products'));