(function (app) {
    'use strict';

    app.controller('CategoryListController', CategoryListController);
    CategoryListController.$inject = [
        '$uibModal',
        'apiService',
    ];

    function CategoryListController($uibModal, apiService) {
        var vm = this;
        vm.searchingVm = {
            Page: 0,
            PageSize : 8
        }
        vm.loadCategoryList = loadCategoryList;
        vm.showModalAdd = showModalAdd;
        vm.showModalEdit = showModalEdit;
        vm.getPage = getPage;

        function getPage(currentPage) {
            vm.searchingVm.Page = currentPage;
            loadCategoryList(vm.searchingVm);
        }

        function loadCategoryList(searchingVm) {
            apiService.post('/api/productcategory/getlist', searchingVm, function (res) {
                vm.list = res.data.Items;
                vm.currentPage = res.data.Page;
                vm.totalItems = res.data.TotalCount;
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

        loadCategoryList(vm.searchingVm);
    }
})(angular.module('eshop.categories'));