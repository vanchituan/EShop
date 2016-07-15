(function (app) {
    'use strict';

    app.controller('CategoryAddController', CategoryAddController);

    CategoryAddController.$inject = [
        '$uibModalInstance',
        '$filter',
        'notificationService',
        'commonService',
        'apiService',
    ];

    function CategoryAddController($uibModalInstance, $filter, notificationService, commonService, apiService) {
        var vm = this;

        vm.addCategory = addCategory;
        vm.cancel = cancel;
        vm.frmParentCategory = {
            isCollapsed : false,
            addParentCategory: addParentCategory,
            addVsSelectParentCategory: addVsSelectParentCategory
        }

        function addVsSelectParentCategory() {
            addParentCategory(function (result) {
                vm.ParentCategoryId = result;
                vm.frmParentCategory.isCollapsed = false;
            });
        }

        function addParentCategory(callback) {
            if (vm.ParentCategoryName == '') {
                notificationService.displayWarning('Chưa điền đầy đủ thông tin..');
            }
            else {
                var parentCategory = {
                    ParentCategoryName: $filter('capitalizeFilter')(vm.frmParentCategory.ParentCategoryName)
                }

                apiService.post('/api/parentcategory/add', parentCategory, function (res) {
                    if (res.statusText === 'Created') {
                        loadParentCategory();
                        vm.frmParentCategory.ParentCategoryName == ''; // clear form
                        vm.frmParentCategory.isCollapsed = false;
                        notificationService.displaySuccess(res.data.ParentCategoryName + ' đã được lưu..');
                        if (callback) {
                            callback(res.data.ParentCategoryId);
                        }
                    }

                }, function (error) {
                    if (error.statusText === 'Conflict') {
                        notificationService.displayWarning('Trùng tên loại sản phẩm');
                    }
                    else if (error.statusText === 'BadRequest') {
                        notificationService.displayWarning('Đối tượng gửi lên chưa chính xác')
                    }
                    else {
                        notificationService.displayWarning('Thêm mới không thành công');
                    }
                });
            }
        }

        function addCategory(frmCategory) {
            if (frmCategory.$valid) {
                var category = {
                    Name: $filter('capitalizeFilter')(vm.Name),
                    Alias: commonService.getSeoTitle(vm.Name),
                    ParentCategoryId: vm.ParentCategoryId,
                    CreatedDate: new Date(),
                    Status: true
                }

                apiService.post('/api/productcategory/add', category,
                    function (result) {
                        if (result.statusText === 'Created') {
                            cancel();
                            notificationService.displaySuccess(result.data.Name + ' đã được lưu !!');
                        }
                    },
                    function (error) {
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
                notificationService.displayWarning('Chưa nhập đầy đủ thông tin..')
            }
        }

        function cancel() {
            $uibModalInstance.dismiss();
        }

        function loadParentCategory() {
            apiService.get('/api/parentcategory/getall', null,
                function (res) {
                    vm.ParentCategories = res.data;
                },
            function (error) {
                notificationService.displayError('Có lỗi gì đó rồi ông bạn ơi');
            });
        }

        loadParentCategory();
    };

})(angular.module('eshop.categories'));