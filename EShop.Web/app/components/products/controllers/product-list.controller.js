

(function (app) {
    'use strict';

    app.controller('ProductListController', ProductListController);
    ProductListController.$inject = [
        '$uibModal',
        'apiService',
        'notificationService',
        'productsPrepService'
    ];

    function ProductListController($uibModal, apiService, notificationService, productsPrepService) {
        var vm = this
        vm.list = productsPrepService.data.Items;
        vm.page = productsPrepService.data.Page;
        vm.pagesCount = productsPrepService.data.TotalPages;
        vm.totalCount = productsPrepService.data.TotalCount;
        vm.showModalAdd = showModalAdd;
        vm.showModalEdit = showModalEdit;
        vm.showModalUpdateWarehouse = showModalUpdateWarehouse;
        vm.getPage = loadProductList;
        vm.loadProductList = loadProductList;

        function loadProductList(page) {
            //page = ;
            var searchingVm = {
                Page: page || 0,
                PageSize: vm.pageSize || 10,
                ProductName: vm.ProductName || '',
                CategoryId: vm.CategoryId,
                IsHomePage: false
            }
            //console.log(searchingVm);
            apiService.post('/api/product/getlist', searchingVm, function (res) {
                vm.products = res.data.Items;
                vm.page = res.data.Page;
                vm.pagesCount = res.data.TotalPages;
                vm.totalCount = res.data.TotalCount;
            }, function (error) {
                notificationService.displayError(error);
            });
        };

        function loadWarehouseList() {
            apiService.get('/api/warehouse/getall', null, function (res) {
                vm.warehouses = res.data;
            }, function (error) {
                notificationService.displayError(error);
            })
        };

        function loadCategoryList() {
            apiService.get('/api/productcategory/getall', null, function (res) {
                vm.productCategories = res.data;
            }, function (error) {
                notificationService.displayError(error);
            })
        }

        function showModalAdd(){
            $uibModal.open({
                templateUrl: '/app/components/products/views/product-add.view.html',
                controller: 'ProductAddController',
                controllerAs : 'product',
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
                controllerAs: 'product',
                size: 'lg',
                resolve: {
                    currentProduct: function () {
                        return currentProduct;
                    }
                }
            });
        }

        function showModalUpdateWarehouse() {
            $uibModal.open({
                templateUrl: '/app/components/products/views/update-warehouse.view.html',
                controller: 'UpdateWarehouseController',
                controllerAs: 'product',
                backdrop: 'static',
                size: 'lg'
            });
        }

        //loadProductList();
        loadWarehouseList();
        loadCategoryList();
    };

})(angular.module('eshop.products'));