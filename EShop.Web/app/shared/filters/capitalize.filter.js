(function (app) {
    'use strict';
    
    app.filter('capitalizeFilter', capitalizeFilter);

    function capitalizeFilter() {
        return function (input) {
            return (!!input) ? input.split(' ').map(function (wrd) {
                return wrd.charAt(0).toUpperCase() + wrd.substr(1).toLowerCase();
            }).join(' ') : '';
        }
    }
})(angular.module('eshop.common'));