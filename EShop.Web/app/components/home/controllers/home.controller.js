(function (app) {
    'use strict';

    app.controller('HomeController', HomeController);

    HomeController.$inject = [
        '$uibModal',
        'notificationService',
        'apiService',
        'commonService',
    ];

    function HomeController($uibModal, notificationService, apiService, commonService) {
        var vm = this;
        vm.cart = [];
        vm.productInCart = false;
        vm.modalIsOpened = false;
        vm.total = 0;
        vm.keyName = '';
        vm.searchingVm = {
            Page: 1,
            PageSize: 8,
            ProductName: '',
            SortBy: true,
            Status : true
        }

        vm.clearProduct = clearProduct;
        vm.clearCategory = clearCategory;
        vm.sort = sort;
        vm.setClass = setClass;
        vm.getPage = getPage;
        vm.completeInvoice = completeInvoice;
        vm.loadProductList = loadProductList;
        vm.addToCart = addToCart;
        vm.updateQuantity = updateQuantity;
        vm.deleteProduct = deleteProduct;
        vm.deleteOrder = deleteOrder;
        vm.getProductByCategory = getProductByCategory;
        vm.addInvoice = addInvoice;

        function clearProduct() {
            vm.product.selected = null;
            loadProductList(vm.searchingVm);
        }

        function clearCategory() {
            vm.category.selected = null;
            vm.searchingVm.CategoryId = null;
            loadProductList(vm.searchingVm);
        }

        function sort(keyName) {
            vm.searchingVm.SortBy = !vm.searchingVm.SortBy;
            vm.searchingVm.OrderBy = keyName;
            vm.keyName = keyName;
            loadProductList(vm.searchingVm);
        }

        function setClass(quantity) {
            return commonService.setClassForQuantity(quantity);
        }

        function getPage(currenPage) {
            vm.searchingVm.Page = currenPage;
            loadProductList(vm.searchingVm);
        }

        function completeInvoice() {
            var modalInstance = $uibModal.open({
                templateUrl: '/app/components/home/views/complete-invoice.view.html',
                controller: 'CompleteInvoiceController',
                controllerAs: 'ctrl',
                backdrop: 'static',
                resolve: {
                    total: vm.total
                }
            });

            modalInstance.result.then(function (response) {
                if (response) {
                    addInvoice();
                }
            }, function () {
                console.log('Modal dismissed at: ' + new Date());
            });
        }

        function deleteOrder() {
            vm.productInCart = false;
            vm.cart = [];
        }

        function loadProductList(searchingVm) {
            apiService.post('/api/product/getlist', searchingVm, function (res) {
                vm.products = commonService.addOutOfStockAttribute(res.data.Items);
                vm.totalItems = res.data.TotalCount;
                vm.currentPage = res.data.Page;
            }, function (error) {
                notificationService.displayError('Có lỗi gì đó rồi ông bạn');
            });
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

        function loadCategory() {
            apiService.get('/api/productcategory/getall', null, function (res) {
                vm.categories = res.data;
            });
        }

        function addToCart(product) {
            if (product.IsOutOfStock) {
                notificationService.displayWarning('Sản phẩm này đã hết hàng!!');
            }
            else {
                var productIsExisted = false;
                vm.productInCart = true;
                //check this product is available in cart
                for (var i = 0; i < vm.cart.length; i++) {
                    if (vm.cart[i].Name === product.Name) {
                        productIsExisted = true;
                    }
                }

                // add new this product
                if (!productIsExisted) {
                    vm.cart.push({
                        Id: product.Id,
                        Name: product.Name,
                        Price: product.Price,
                        PriceImport: product.PriceImport,
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
            }
        }

        function addInvoice() {
            var frmIsValid = true;
            if (vm.total <= 0) {
                frmIsValid = false;
            }
            if (vm.cart.length == 0) {
                frmIsValid = false;
            }

            if (frmIsValid) {
                var invoiceDetailList = new Array();
                var profit = 0;
                for (var i = 0; i < vm.cart.length; i++) {
                    invoiceDetailList.push({
                        ProductId: vm.cart[i].Id,
                        Price: vm.cart[i].Price,
                        Quantity: vm.cart[i].Quantity
                    });
                    profit += (vm.cart[i].Price - vm.cart[i].PriceImport) * vm.cart[i].Quantity;
                }
                var invoice = {
                    Total: vm.total,
                    Profit: profit,
                    CreatedBy: 'admin',
                    CreatedDate: commonService.getCurrentDateTime(),
                    InvoiceDetails: invoiceDetailList
                }
                apiService.post('/api/invoice/add', invoice, function (res) {
                    deleteOrder();
                    notificationService.displaySuccess('Lập hóa đơn hoàn tất');
                    loadProductList(vm.searchingVm);
                }, function (error) {
                    notificationService.displayWarning(error.data);
                });
            }
            else {
                notificationService.displayWarning('Chưa có sản phẩm trong giỏ hàng');
            }
        }

        function updateQuantity() {
            for (var i = 0; i < vm.cart.length; i++) {
                vm.cart[i].Amount = vm.cart[i].Quantity * vm.cart[i].Price;
            }
            updateTotal();
        }

        function deleteProduct(productName) {
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

        function updateTotal() {
            var total = 0;
            for (var i = 0; i < vm.cart.length; i++) {
                total += vm.cart[i].Amount;
            }
            vm.total = total;
        }

        function loadWarehouseList() {
            apiService.get('/api/warehouse/getall', null, function (res) {
                vm.warehouses = res.data;
            }, function (error) {
                notificationService.displayError(error);
            })
        }

        loadWarehouseList();
        loadCategory();
        loadProductList(vm.searchingVm);
    };
})(angular.module('eshop'));
