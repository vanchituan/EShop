(function (app) {
    'use strict';

    app.controller('CategoryEditController', CategoryEditController);
    CategoryEditController.$inject = [
        '$uibModalInstance',
        'notificationService',
        'apiService',
        'currentCategory'
    ];

    function CategoryEditController($uibModalInstance, notificationService, apiService, currentCategory) {
        var vm = this;

        vm.category = {
            Name: currentCategory.Name,
            ParentCategoryId: currentCategory.ParentCategoryId,
            Status: currentCategory.Status,
            Alias: currentCategory.Alias,
            CreatedDate : currentCategory.CreatedDate,
            UpdatedDate : new Date()
        }

        vm.submitForm = submitForm;
        vm.cancel = cancel;

        function cancel() {
            $uibModalInstance.dismiss();
        }

        function submitForm(frmCategory) {
            if (frmCategory.$valid) {
                apiService.put('/api/productcategory/update', vm.category,
                    function (result) {
                        if (result.statusText === 'OK') {
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
                notificationService.displayWarning('Chưa điền đầy đủ thông tin..')
            }
        }

        function loadParentCategory() {
            apiService.get('/api/parentcategory/getall', null,
                function (res) {
                    vm.parentCategories = res.data;

                }, function (error) {
                    notificationService.displayError('Có lỗi gì đấy rồi ông bạn ơi');
                })
        }

        loadParentCategory();
    };

})(angular.module('eshop.categories'));