(function (app) {
    'use strict';

    app.controller('ProductEditController', ProductEditController);

    ProductEditController.$inject = [
        '$uibModalInstance',
        'apiService',
        'notificationService',
        'currentProduct',
        'categoriesPrepService'
    ];

    function ProductEditController($uibModalInstance, apiService, notificationService, currentProduct, categoriesPrepService) {
        var vm = this;
        vm.categories = categoriesPrepService.data;
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

        vm.cancel = cancel;
        vm.updateProduct = updateProduct;

        function updateProduct(frmProduct) {
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

        function cancel() {
            $uibModalInstance.dismiss();
        }
    };
})(angular.module('eshop.products'));