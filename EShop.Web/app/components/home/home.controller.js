(function (app) {
    'use strict';

    app.controller('HomeController', HomeController);

    HomeController.$inject = [
        'notificationService',
        'apiService'
    ];

    function HomeController(notificationService, apiService) {
        var vm = this;
        vm.cart = [];
        vm.productInCart = true;
        vm.total = 0;
        vm.searchingVm = {
            Page: 0,
            PageSize: 10,
            ProductName: '',
            IsHomePage: true
        }

        //binding event for control pagination
        vm.getPage = function (page) {
            vm.searchingVm.page = page
            loadProductList(vm.searchingVm);
        };

        //binding event for a method of control pagination
        vm.loadProductList = function (page) {
            vm.searchingVm.page = page
            loadProductList(vm.searchingVm);
        };

        vm.addToCart = function (product) {
            var productIsExisted = false;
            vm.productInCart = false;
            //check this product is available in cart
            for (var i = 0; i < vm.cart.length; i++) {
                if (vm.cart[i].Name === product.Name) {
                    productIsExisted = true;
                }
            }

            // add new this product
            if (!productIsExisted) {
                vm.cart.push({
                    Name: product.Name,
                    Price: product.Price,
                    Quantity: 1,
                    Amount: product.Price
                });
            }
            else { // just increase quantity this product
                for (var i = 0; i < vm.cart.length; i++) {
                    if (vm.cart[i].Name === product.Name) {
                        vm.cart[i].Quantity += 1;
                        vm.cart[i].Amount = vm.cart[i].Quantity * vm.cart[i].Price;
                    }
                }
            }

            updateTotal();
        };

        vm.updateQuantity = function () {
            for (var i = 0; i < vm.cart.length; i++) {
                vm.cart[i].Amount = vm.cart[i].Quantity * vm.cart[i].Price;
            }
            updateTotal();
        }

        vm.deleteProduct = function (productName) {
            var index = -1;
            for (var i = 0; i < vm.cart.length; i++) {
                if (vm.cart[i].Name === productName) {
                    index = i;
                    break;
                }
            }
            vm.cart.splice(index, 1);//1 is number is removed
            updateTotal();
        }

        vm.getProductByCategory = function (category) {
            vm.searchingVm.CategoryId = category.Id;
            console.log(vm.searchingVm);
            loadProductList(vm.searchingVm);
        }

        function loadCategory() {
            apiService.get('/api/productcategory/getall', null, function (res) {
                vm.categories = res.data;
            });
        }

        function loadProductList(searchingVm) {

            apiService.post('/api/product/getlist', searchingVm, function (res) {
                vm.products = res.data.Items;
                vm.page = res.data.Page;
                vm.pagesCount = res.data.TotalPages;
                vm.totalCount = res.data.TotalCount;
            }, function (error) {
                notificationService.displayError('Có lỗi gì đó rồi ông bạn');
            });
        };

        function updateTotal() {
            var total = 0;
            for (var i = 0; i < vm.cart.length; i++) {
                total += vm.cart[i].Amount;
            }
            vm.total = total;
        }

        loadCategory();
        loadProductList(vm.searchingVm);
    };
})(angular.module('eshop'));
