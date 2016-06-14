(function (app) {
    'use strict';
    
    app.filter('statusFilter', statusFilter);

    function statusFilter() {
        return function (input) {
            if (input) {
                return 'Kích hoạt';
            }
            else {
                return 'Khóa';
            }
        }
    }
})(angular.module('eshop.common'));