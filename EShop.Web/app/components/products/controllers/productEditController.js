/// <reference path="\Assets/admin/libs/angular/angular.min.js" />
(function (app) {
    app.controller('productEditController', ['$scope', '$uibModalInstance', 'apiService', 'notificationService', 'currentProduct',
        function ($scope, $uibModalInstance, apiService, notificationService, currentProduct) {
            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            }

            function categoryList() {
                apiService.get('/api/productcategory/getall', null, function (res) {
                    $scope.productCategories = res.data;
                }, function (error) {
                    notificationService.displayError('Có lỗi gì đó rồi ông bạn ơi!!');
                })
            };

            console.log(currentProduct);
            function loadProductToInput() {
                $scope.product = {
                    Id: currentProduct.Id,
                    CategoryId: currentProduct.CategoryId,
                    Name: currentProduct.Name,
                    OrderedDate: currentProduct.OrderedDate,
                    Price: currentProduct.Price,
                    PriceImport: currentProduct.PriceImport,
                    Status: currentProduct.Status,
                    Unit: currentProduct.Unit,
                    Warranty: currentProduct.Warranty,
                    WarehouseDetails: currentProduct.WarehouseDetails
                }

            };

            categoryList();
            loadProductToInput();

        }]);
})(angular.module('eshop.products'));