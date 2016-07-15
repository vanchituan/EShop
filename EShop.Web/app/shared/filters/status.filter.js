(function (app) {
    'use strict';
    
    app.filter('statusFilter', statusFilter);

    function statusFilter() {
        return function (input) {
            if (input) {
                return 'Kinh doanh';
            }
            else {
                return 'Ngừng k.doanh';
            }
        }
    }
})(angular.module('eshop.common'));