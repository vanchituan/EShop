/// <reference path="D:\Git\EShop.Web\Assets/admin/libs/angular/angular.js" />

(function () {
    var app = angular.module('eshop', ['eshop.products', 'eshop.product_categories', 'eshop.common']);
    app.config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider.state('home', {
                url: "/admin",
                templateUrl: "/app/components/home/homeView.html",
                controller: "homeController"
            });

            $urlRouterProvider.otherwise('/admin');

            //ngProgressLiteProvider.settings.speed = 1500;
        }]);
})();