(function (app) {
    app.controller('OrderController', OrderController);

    OrderController.$inject = [
        'apiService', 
        'notificationService'
        ];

    function OrderController(apiService, notificationService) {
        var vm = this;
        vm.datePickerOpen = false;
        vm.dt = new Date('06/30/2016');
        vm.openDatePicker = openDatePicker;
        function openDatePicker($event) {
            vm.datePickerOpen = true;
        }
    }
})(angular.module('eshop.orders'));