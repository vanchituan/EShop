(function (app) {
    'use strict';

    app.factory('notificationService', notificationService);

    function notificationService() {
        toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": false,
            "progressBar": true,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }

        return {
            displaySuccess: success,

            displayError: error,

            displayInfo: info,

            displayWarning: warning
        }

        function success(msg) {
            toastr.success(msg);
        }

        function warning(msg) {
            toastr.warning(msg);
        }

        function info(msg) {
            toastr.info(msg);
        }

        function error(msg) {
            if (Array.isArray(error)) {
                error.each(function () {
                    toastr.error(error);
                })
            }
            else {
                toastr.error(error);
            }
        }


    }
})(angular.module('eshop.common'));