(function (app) {
    'use strict';

    app.controller('CategoryListController', CategoryListController);
    CategoryListController.$inject = [
        '$uibModal',
        'apiService',
    ];

    function CategoryListController($uibModal, apiService) {
        var vm = this;

        vm.loadCategoryList = loadCategoryList;

        vm.showModalAdd = showModalAdd;

        vm.showModalEdit = showModalEdit;

        function loadCategoryList(page) {
            var searchingVm = {
                Page: page || 0,
                PageSize : 5
            }

            apiService.post('/api/productcategory/getlist', searchingVm, function (res) {
                vm.list = res.data.Items;
                vm.page = res.data.Page;
                vm.pagesCount = res.data.TotalPages;
                vm.totalCount = res.data.TotalCount;
            });
        }

        function showModalAdd() {
            $uibModal.open({
                templateUrl: '/app/components/categories/views/category-add.view.html',
                controller: 'CategoryAddController',
                controllerAs: 'category',
                backdrop: 'static',
                size: 'lg'
            });
        }

        function showModalEdit(currentCategory) {
            $uibModal.open({
                templateUrl: '/app/components/categories/views/category-edit.view.html',
                controller: 'CategoryEditController',
                controllerAs: 'currentCategory',
                backdrop: 'static',
                size: 'lg',
                resolve: {
                    currentCategory: currentCategory
                }
            });
        }

        loadCategoryList();
    }
})(angular.module('eshop.categories'));