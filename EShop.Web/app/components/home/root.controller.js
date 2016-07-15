(function (app) {
    app.controller('RootController', RootController);

    RootController.$inject = [
        '$scope',
        '$state',
        'authDataService',
        'loginService',
        'authenticationService'
    ];

    function RootController($scope, $state, authDataService, loginService, authenticationService) {
        $scope.logout = logout;
        $scope.authentication = authDataService.authenticationData;

        function logout() {
            loginService.logout();
            $state.go('login');
        }

        //check user login ?
        //authenticationService.validateRequest();
    }
})(angular.module('eshop'));