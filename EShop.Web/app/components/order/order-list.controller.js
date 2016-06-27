(function (app) {
    app.controller('OrderListController', OrderListController);

    OrderListController.$inject = [
        'apiService', 
        'notificationService'
        ];

    function OrderListController(apiService, notificationService) {

    }
})(angular.module('eshop.orders'));