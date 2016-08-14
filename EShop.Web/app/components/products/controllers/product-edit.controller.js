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
        var vm = this;
        vm.product = {
            Id: currentProduct.Id,
            CategoryId: {
                Id: currentProduct.ProductCategory.Id,
                Name: currentProduct.ProductCategory.Name
            },
            Alias : currentProduct.Alias,
            Name: currentProduct.Name,
            OrderedDate: currentProduct.OrderedDate,
            Price: currentProduct.Price,
            PriceImport: currentProduct.PriceImport,
            Status: currentProduct.Status,
            Unit: currentProduct.Unit,
            Warranty: currentProduct.Warranty,
            OrderedDate : currentProduct.OrderedDate,
            WarehouseDetails: currentProduct.WarehouseDetails
        }

        vm.cancel = cancel;
        vm.updateProduct = updateProduct;

        function updateProduct(frmProduct) {
            if (frmProduct.$valid) {
                var array = new Array();
                var whDetailList = vm.product.WarehouseDetails;
                for (var item in whDetailList) {
                    array.push({
                        WarehouseId: whDetailList[item].Warehouse.WarehouseId,
                        ProductId : vm.product.Id,
                        Quantity : whDetailList[item].Quantity
                    });
                }

                vm.product.WarehouseDetails = array;
                console.log(vm.product);

                apiService.put('/api/product/update', vm.product, function (res) {
                    if (res.statusText === 'OK') {
                        cancel();
                        notificationService.displaySuccess(res.data.Name + ' đã được cập nhật');
                    }
                },function(error){
                    if (error.statusText === 'Conflict') {
                        notificationService.displayWarning('Trùng tên loại sản phẩm');
                    }
                    else if (error.statusText === 'BadRequest') {
                        notificationService.displayWarning('Đối tượng gửi lên chưa chính xác')
                    }
                    else {
                        notificationService.displayWarning('Thêm mới không thành công');
                    }
                })
            }
            else {
                notificationService.displayWarning('Chưa điền đầy đủ thông tin!!');
            }
        }

        function cancel() {
            $uibModalInstance.dismiss();
        }

        function loadCategories() {
            apiService.get('/api/productcategory/getall', null, function (res) {
                vm.categories = res.data;
            }, function (error) {
                notificationService.displayError(error);
            })
        }

        loadCategories();
    };
})(angular.module('eshop.products'));