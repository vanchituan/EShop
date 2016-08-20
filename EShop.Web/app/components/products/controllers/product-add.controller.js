(function (app) {
    'use strict';

    app.controller('ProductAddController', ProductAddController);
    ProductAddController.$inject = [
        '$filter',
        '$uibModalInstance',
        'apiService',
        'notificationService',
        'commonService',
    ];

    function ProductAddController($filter, $uibModalInstance, apiService, notificationService, commonService) {
        var vm = this;
        vm.Status = true;
        vm.cancel = cancel;
        vm.addProduct = addProduct;
        vm.frmCategory = {
            isCollapsed: false,
            addCategory: addCategory,
            addVsSelectCategory: addVsSelectCategory
        }

        function addCategory(callback) {
            var frmValid = true;
            if (vm.frmCategory.Name === '') {
                frmValid = false;
            }
            if (vm.frmCategory.ParentCategoryId === '') {
                frmValid = false;
            }

            if (frmValid) {
                var category = {
                    Name: $filter('capitalizeFilter')(vm.frmCategory.Name),
                    Alias: commonService.getSeoTitle(vm.frmCategory.Name),
                    ParentCategoryId: vm.frmCategory.ParentCategoryId,
                    CreatedDate: new Date(),
                    Status: true
                }

                apiService.post('/api/productcategory/add', category,
                    function (result) {
                        if (result.statusText === 'Created') {
                            loadCategories();
                            vm.frmCategory.isCollapsed = false;
                            vm.frmCategory.Name = '';
                            vm.frmCategory.ParentCategoryId == '';
                            notificationService.displaySuccess(result.data.Name + ' đã được lưu !!');
                            if (callback) {
                                callback(result.data);
                            }
                        }
                    },
                    function (error) {
                        if (error.statusText === 'Conflict') {
                            notificationService.displayWarning('Trùng tên loại, hoặc loại này có thể đã có sẵn trong hệ thống..');
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
                notificationService.displayWarning('Chưa nhập đầy đủ thông tin..')
            }
        }

        function addVsSelectCategory() {

            addCategory(function (result) {
            console.log(result);
                vm.CategoryId = {
                    Id: result.Id,
                    Name : result.Name
                };
            });
        }

        function addProduct(form) {
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
                    CategoryId: vm.CategoryId.Id,
                    Description: vm.Description || '',
                    WarehouseDetails: arr
                }
                //console.log(product);
                //return;
                apiService.post('/api/product/add', product, function (res) {
                    if (res.statusText === 'Created') {
                        cancel();
                        notificationService.displaySuccess(res.data.Name + ' đã được thêm thành công');
                        $uibModalInstance.close(true);
                    }
                }, function (error) {
                    if (error.statusText === 'Conflict') {
                        notificationService.displayWarning('Trùng tên sản phẩm');
                    }
                    else if (error.statusText === 'BadRequest') {
                        notificationService.displayWarning('Đối tượng gửi lên chưa chính xác')
                    }
                    else {
                        notificationService.displayWarning('Thêm mới không thành công');
                    }
                });
            }
            else {
                notificationService.displayWarning('Chưa điền vào các ô đỏ !!');
            }
        }

        function cancel() {
            $uibModalInstance.dismiss();
        }

        function loadWarehouse() {
            apiService.get('/api/warehouse/getall',null,function(res){
                vm.warehouses = res.data;
            }, function (erorr) {
                notificationService.displayWarning(error);
            })
        }

        function loadCategories() {
            apiService.get('/api/productcategory/getall', null, function (res) {
                vm.productCategories = res.data;
                vm.CategoryId = res.data[0]
            }, function (error) {
                notificationService.displayWarning('Có lỗi gì đó rồi ông bạn ơi!!')
            })
        }

        function loadParentCategory() {
            apiService.get('/api/parentcategory/getall', null, function (res) {
                vm.frmCategory.parentCategories = res.data;
            }, function (error) {
                notificationService.displayWarning('Có lỗi gì đó rồi ông bạn ơi!!')
            })
        }

        loadParentCategory();
        loadWarehouse();
        loadCategories();
    };

})(angular.module('eshop.products'));