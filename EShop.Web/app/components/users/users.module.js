(function () {
    'use strict';

    angular.module('eshop.users', ['eshop.common']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider.state('users', {
            url: '/users',
            parent: 'base',
            controller: 'UserListController',
            templateUrl: '/app/components/users/user-list.view.html'
        });
    }
})();