(function (app) {
    'use strict';

    app.controller('ProductListController', ProductListController);
    ProductListController.$inject = [
        '$uibModal',
        'apiService',
        'commonService',
        'notificationService',
    ];

    function ProductListController($uibModal, apiService, commonService, notificationService) {
        var vm = this
        vm.sortKey = '';
        vm.outOfStock = false;
        vm.searchingVm = {
            Page: 0,
            PageSize: 10,
            SortBy: true
        }
        vm.setClass = setClass;
        //cause when routing over pages, ng-include losing script tag
        vm.modalIsOpened = false;
        //binding events
        vm.clearCategory = clearCategory;
        vm.clearProduct = clearProduct;
        vm.getPage = getPage;
        vm.loadProductList = loadProductList;
        vm.getProductByCategory = getProductByCategory;
        vm.changePageSize = changePageSize;
        vm.sort = sort;

        vm.showModalAdd = showModalAdd;
        vm.showModalEdit = showModalEdit;
        vm.showModalUpdateWarehouse = showModalUpdateWarehouse;
        vm.showModalDeliveryOrder = showModalDeliveryOrder;
        function setClass(quantity) {
            return commonService.setClassForQuantity(quantity);
        }

        function getPage(page) {
            vm.searchingVm.Page = page;
            loadProductList(vm.searchingVm);
        }

        function changePageSize(pageSize) {
            vm.searchingVm.PageSize = pageSize;
            loadProductList(vm.searchingVm);
        }

        function sort(keyName){
            vm.searchingVm.SortBy = !vm.searchingVm.SortBy;
            vm.searchingVm.OrderBy = keyName;
            vm.keyName = keyName;
            loadProductList(vm.searchingVm);
        }

        function loadProductList(searchingVm) {
            apiService.post('/api/product/getlist', searchingVm, function (res) {
                vm.list = commonService.addOutOfStockAttribute(res.data.Items);
                vm.currentPage = res.data.Page;
                vm.totalItems = res.data.TotalCount;
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

        function clearProduct() {
            vm.product.selected = null;
            loadProductList(vm.searchingVm);
        }

        function clearCategory() {
            vm.category.selected = null;
            vm.searchingVm.CategoryId = null;
            loadProductList(vm.searchingVm);
        }

        function loadCategoryList() {
            apiService.get('/api/productcategory/getall', null, function (res) {
                vm.categories = res.data;
            }, function (error) {
                notificationService.displayError(error);
            })
        }

        function getProductByCategory(category) {
            var categoryId = category.Id;
            vm.searchingVm.CategoryId = categoryId;
            apiService.post('/api/product/getlistbycategory?categoryId=' + categoryId, null, function (res) {
                vm.productsByCategory = commonService.addOutOfStockAttribute(res.data);
                loadProductList(vm.searchingVm);
            }, function (error) {
                notificationService.displayWarning(error.data);
            })
        }

        function showModalAdd() {
            var modalInstance = $uibModal.open({
                templateUrl: '/app/components/products/views/product-add.view.html',
                controller: 'ProductAddController',
                controllerAs: 'product',
                backdrop: 'static',
                size: 'lg'
            });

            modalInstance.result.then(function (response) {
                if (response) {
                    loadProductList(vm.searchingVm);
                }
            }, function () {
                console.log('Modal dismissed at: ' + new Date());
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

        function showModalDeliveryOrder() {
            vm.modalIsOpened = true;
            $uibModal.open({
                templateUrl: '/app/components/products/views/delivery-order.view.html',
                controller: 'DeliveryOrderController',
                controllerAs: 'deor',
                backdrop: 'static',
                size: 'lg',
            });
        }

        loadProductList(vm.searchingVm);
        loadWarehouseList();
        loadCategoryList();
    };

})(angular.module('eshop.products'));