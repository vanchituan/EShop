(function (app) {
    'use strict';

    app.controller('CategoryAddController', CategoryAddController);

    CategoryAddController.$inject = [
        '$uibModalInstance',
        'notificationService',
        'apiService',
    ];

    function CategoryAddController($uibModalInstance, notificationService, apiService) {
        var vm = this;

        vm.AddCategory = addCategory;

        function addCategory() {
            var productCategory = {
                CreatedDate: new Date(),
                Status: true
            }

            apiService.post('/api/productcategory/create', $scope.productCategory,
                function (result) {
                    notificationService.displaySuccess(result.data.Name + ' đã được lưu !!');
                    $state.go('product_categories');
                },
                function (error) {
                    notificationService.displayError('Thêm mới không thành công');
                })
        }

        function loadParentCategory() {
            apiService.get('/api/parentcategory/getall', null,
                function (res) {
                    $scope.ParentCategories = res.data;
                },
            function (error) {
                notificationService.displayError('Có lỗi gì đó rồi ông bạn ơi');
            });
        }

        loadParentCategory();
    };

})(angular.module('eshop.categories'));