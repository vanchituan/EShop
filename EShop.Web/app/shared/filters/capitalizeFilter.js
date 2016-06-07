/// <reference path="D:\Git\EShop.Web\Assets/admin/libs/angular/angular.min.js" />
(function (app) {
    app.filter('capitalizeFilter', [function () {
        return function (input) {
            return (!!input) ? input.split(' ').map(function (wrd) {
                return wrd.charAt(0).toUpperCase() + wrd.substr(1).toLowerCase();
            }).join(' ') : '';
        }
    }]);
})(angular.module('eshop.common'));