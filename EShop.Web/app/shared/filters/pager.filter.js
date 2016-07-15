(function (app) {
    'use strict'

    app.filter('pagerFilter', pagerFilter);

    function pagerFilter() {
        return function (input, currentPage, pageSize) {
            if (angular.isArray(input)) {
                var start = (currentPage - 1) * pageSize;
                var end = currentPage * pageSize;
                return input.slice(start, end);
            }
        }
    }
})(angular.module('eshop.common'));