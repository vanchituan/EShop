(function (app) {
    'use strict';

    app.controller('CompleteInvoiceController', CompleteInvoiceController);

    CompleteInvoiceController.$inject = [
        '$uibModalInstance',
        'notificationService',
        'labelConstant',
        'total'
    ];

    function CompleteInvoiceController($uibModalInstance, notificationService, labelConstant, total) {
        var vm = this;
        vm.total = total;
        vm.cancel = cancel;
        vm.ok = ok;
        vm.setColorForCharge = setColorForCharge;

        function cancel() {
            $uibModalInstance.dismiss();
        }

        function ok(frmPayment) {
            if (frmPayment.$valid) {
                if (vm.receipt >= vm.total) {
                    $uibModalInstance.close(true);
                }
                else {
                    notificationService.displayWarning('Chưa nhận đủ tiền..');
                }
            }
            else {
                notificationService.displayWarning('Chưa điền đầy đủ thông tin..');
            }
        }

        function setColorForCharge(result) {
            var className = '';
            if (result >= 0) {
                className = labelConstant.success;
            }
            else if (result < 0) {
                className = labelConstant.danger;
            }
            return className;
        }
    }
})(angular.module('eshop'));
