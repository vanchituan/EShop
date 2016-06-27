

(function (app) {
    'use strict';

    app.controller('ProductListController', ProductListController);
    ProductListController.$inject = [
        '$uibModal',
        'apiService',
        'notificationService'
    ];

    function ProductListController($uibModal, apiService, notificationService) {
        var vm = this
        vm.searchingVm = {
            Page: 0,
            PageSize: 10,
            IsHomePage: false
        }
        //cause when routing over pages, ng-include losing script tag
        vm.modalIsOpened = false;
        //binding events
        vm.getPage = getPage;
        vm.showModalAdd = showModalAdd;
        vm.showModalEdit = showModalEdit;
        vm.showModalUpdateWarehouse = showModalUpdateWarehouse;
        vm.loadProductList = loadProductList;
        vm.getProductByCategory = getProductByCategory;
        vm.getProductByName = getProductByName;
        vm.changePageSize = changePageSize;

        function getPage(page) {
            vm.searchingVm.Page = page;
            loadProductList(vm.searchingVm);
        }

        function changePageSize(pageSize) {
            vm.searchingVm.PageSize = pageSize;
            loadProductList(vm.searchingVm);
        }

        function loadProductList(searchingVm) {
            apiService.post('/api/product/getlist', searchingVm, function (res) {
                vm.list = res.data.Items;
                vm.page = res.data.Page;
                vm.pagesCount = res.data.TotalPages;
                vm.totalCount = res.data.TotalCount;
            }, function (error) {
                notificationService.displayError(error);
            });
        }

        function loadWarehouseList() {
            apiService.get('/api/warehouse/getall', null, function (res) {
                vm.warehouses = res.data;
            }, function (error) {
                notificationService.displayError(error);
            })
        }

        function loadCategoryList() {
            apiService.get('/api/productcategory/getall', null, function (res) {
                vm.categories = res.data;
            }, function (error) {
                notificationService.displayError(error);
            })
        }

        function getProductByCategory(category) {
            vm.searchingVm.CategoryId = category.Id;
            loadProductList(vm.searchingVm);
        }

        function getProductByName(product) {
            vm.searchingVm.Name = product.Name;
            loadProductList(vm.searchingVm);
        }

        function showModalAdd() {
            $uibModal.open({
                templateUrl: '/app/components/products/views/product-add.view.html',
                controller: 'ProductAddController',
                controllerAs: 'product',
                backdrop: 'static',
                size: 'lg',
                resolve: {
                    warehouseList: function () {
                        return vm.warehouses;
                    }
                }
            });
        }

        function showModalEdit(currentProduct) {
            $uibModal.open({
                backdrop: 'static',
                templateUrl: '/app/components/products/views/product-edit.view.html',
                controller: 'ProductEditController',
                controllerAs: 'currentProduct',
                size: 'lg',
                resolve: {
                    currentProduct: function () {
                        return currentProduct;
                    },
                    categoriesPrepService: function (prepService) {
                        return prepService.get('/api/productcategory/getall', null);
                    }
                }
            });
        }

        function showModalUpdateWarehouse() {
            vm.modalIsOpened = true;
            $uibModal.open({
                templateUrl: '/app/components/products/views/update-warehouse.view.html',
                controller: 'UpdateWarehouseController',
                controllerAs: 'product',
                backdrop: 'static',
                size: 'lg',
            });
        }

        loadProductList(vm.searchingVm);
        loadWarehouseList();
        loadCategoryList();
    };

})(angular.module('eshop.products'));