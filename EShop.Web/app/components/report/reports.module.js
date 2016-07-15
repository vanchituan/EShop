(function () {
    angular.module('eshop.reports', ['eshop.common']).config(config);

    config.$inject = ['$stateProvider'];
    function config($stateProvider) {
        $stateProvider
            .state('statistic_revenue', {
                url: '/revenue',
                parent: 'base',
                templateUrl: '/app/components/report/views/statistic.view.html',
                controller: 'StatisticController',
                controllerAs: 'statistic'
            })
            .state('investment',{
                url: '/investment',
                parent: 'base',
                templateUrl: '/app/components/report/views/investment.view.html',
                controller: 'InvestmentController',
                controllerAs : 'investment'
            });
    }
})();