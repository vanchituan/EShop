(function (app) {
    'use strict';

    app.controller('homeController', ['$scope', 'notificationService', 'apiService',
        function ($scope, notificationService, apiService) {
            $scope.cart = [];
            $scope.productInCart = true;
            $scope.getPage = loadProductList;
            $scope.total = 0;

            $scope.loadProductList = loadProductList;

            $scope.addToCart = function (product) {
                var productIsExisted = false;
                $scope.productInCart = false;
                //check this product is available in cart
                for (var i = 0; i < $scope.cart.length; i++) {
                    if ($scope.cart[i].Name === product.Name) {
                        productIsExisted = true;
                    }
                }

                // add new this product
                if (!productIsExisted) {
                    $scope.cart.push({
                        Name: product.Name,
                        Price: product.Price,
                        Quantity: 1,
                        Amount: product.Price
                    });
                }
                else { // just increase quantity this product
                    for (var i = 0; i < $scope.cart.length; i++) {
                        if ($scope.cart[i].Name === product.Name) {
                            $scope.cart[i].Quantity += 1;
                            $scope.cart[i].Amount = $scope.cart[i].Quantity * $scope.cart[i].Price;
                        }
                    }
                }

                updateTotal();
            };

            $scope.updateQuantity = function () {
                for (var i = 0; i < $scope.cart.length; i++) {
                    $scope.cart[i].Amount = $scope.cart[i].Quantity * $scope.cart[i].Price;
                }
                updateTotal();
            }

            $scope.deleteProduct = function (product) {
                console.log(product);
                //for (var i = 0; i < $scope.cart.length; i++) {
                //    if ($scope.cart[i].Name === productName) {
                        
                //    }
                //}
            }

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
            };

            function updateTotal() {
                var total = 0;
                for (var i = 0; i < $scope.cart.length; i++) {
                    total += $scope.cart[i].Amount;
                }
                $scope.total = total;
                console.log(total);
            }

            loadProductList();
        }]);
})(angular.module('eshop'));
