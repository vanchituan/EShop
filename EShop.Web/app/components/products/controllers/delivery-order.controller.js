(function (app) {
    'use strict';
    app.controller('DeliveryOrderController', DeliveryOrderController);

    DeliveryOrderController.$inject = [
        'apiService',
        'notificationService',
        '$uibModalInstance'
    ];

    function DeliveryOrderController(apiService, notificationService, $uibModalInstance) {
        var vm = this;
        vm.cancel = cancel;
        vm.getProductsByCategory = getProductsByCategory;

        function cancel() {
            $uibModalInstance.dismiss();
        }

        function getProductsByCategory(category) {
            apiService.post('/api/product/getlistbycategory?categoryId=' + category.Id, null,
            function (res) {
                console.log(res.data);
                vm.list = res.data;
            }, function (error) {
                notificationService.displayError(error);
            });

        }

        function loadCategory() {
            apiService.get('/api/productcategory/getall/', null, function (res) {
                vm.productCategories = res.data;
            }, function (error) {
                notificationService.displayError(error);
            });
        }

        loadCategory();

    }
})(angular.module('eshop.products'));