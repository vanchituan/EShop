/// <reference path="D:\Git\EShop.Web\Assets/admin/libs/angular/angular.js" />

(function (app) {
    app.factory('notificationService',  function () {
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
            displaySuccess: function (msg) {
                toastr.success(msg);
            },

            displayError: function (error) {
                if (Array.isArray(error)) {
                    error.each(function () {
                        toastr.error(error);
                    })
                }
                else {
                    toastr.error(error);
                }
            },

            displayInfo: function (msg) {
                toastr.info(msg);
            },

            displayWarning: function (msg) {
                toastr.warning(msg);
            }
        }
    });
})(angular.module('eshop.common'));