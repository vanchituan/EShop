/// <reference path="D:\Git\EShop.Web\Assets/admin/libs/angular/angular.js" />

(function (app) {
    app.controller('productListController', ['$scope', '$uibModal', 'apiService', 'notificationService', function ($scope, $uibModal, apiService, notificationService) {
        $scope.page = 0;
        $scope.pagesCount = 0;

        $scope.sort = function (keyname) {
            $scope.sortKey = keyname;   //set the sortKey to the param passed
            $scope.reverse = !$scope.reverse; //if true make it false and vice versa
        }

        $scope.showModalAdd = function () {
            var modalInstance = $uibModal.open({
                templateUrl: '/app/components/products/views/productAddView.html',
                controller: 'productAddController',
                backdrop: 'static',
                size: 'lg',
                resolve: {
                    warehouseList: function(){
                        return $scope.warehouses;
                    }
                }
            });
        }

        $scope.search = search;

        $scope.loadProductList = loadProductList;

        $scope.showModalEdit = function (currentProduct) {
            var modalInstance = $uibModal.open({
                backdrop: 'static',
                templateUrl: '/app/components/products/views/productEditView.html',
                controller: 'productEditController',
                size: 'lg',
                resolve: {
                    currentProduct: function () {
                        return currentProduct;
                    }
                }
            });
        }

        function loadProductList(page) {
            page = page || 0;
            var searchingVm = {
                Page: page,
                PageSize: 10,
                ProductName: $scope.ProductName || '',
                CategoryId : $scope.CategoryId 
            }
            console.log(searchingVm);
            apiService.post('/api/product/getlist', searchingVm, function (res) {
                $scope.products = res.data.Items;
                $scope.page = res.data.Page;
                $scope.pagesCount = res.data.TotalPages;
                $scope.totalCount = res.data.TotalCount;
            }, function (error) {
                notificationService.displayError(error);
            });
        };

        function loadWarehouseList() {
            apiService.get('/api/warehouse/getall', null, function (res) {
                $scope.warehouses = res.data;
            }, function (error) {
                notificationService.displayError(error);
            })
        };

        function search() {
            loadProductList();
        }

        function loadCategoryList() {
            apiService.get('/api/productcategory/getall', null, function (res) {
                $scope.productCategories = res.data;
            }, function (error) {
                notificationService.displayError(error);
            })
        }

        loadProductList();
        loadWarehouseList();
        loadCategoryList();
    }]);

})(angular.module('eshop.products'));