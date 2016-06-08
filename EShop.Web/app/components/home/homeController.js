(function (app) {
    'use strict';

    app.controller('homeController', ['$scope', 'notificationService', 'apiService',
        function ($scope, notificationService, apiService) {


            function loadProductList(page) {
                var searchingVm = {
                    Page: page || 0,
                    PageSize: $scope.pageSize || 10,
                    ProductName: $scope.ProductName || '',
                    CategoryId: $scope.CategoryId,
                    IsHomePage: true
                }

                apiService.post('/api/product/getlist', searchingVm, function (res) {
                    $scope.products = res.data.Items;
                    $scope.page = res.data.Page;
                    $scope.pagesCount = res.data.TotalPages;
                    $scope.totalCount = res.data.TotalCount;
                }, function (error) {
                    notificationService.displayError('Có lỗi gì đó rồi ông bạn');
                });
            }
            
            loadProductList();
        }]);
})(angular.module('eshop'));