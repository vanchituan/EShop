/// <reference path="\Assets/admin/libs/angular/angular.js" />
(function (app) {
    app.filter('statusFilter', function () {
        return function (input) {
            if (input) {
                return 'Kích hoạt';
            }
            else {
                return 'Khóa';
            }
        }
    });
})(angular.module('eshop.common'));