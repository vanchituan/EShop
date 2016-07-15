(function (app) {
	app.controller('LoginController', LoginController);

	LoginController.$inject = [
        '$scope',
        '$injector',
        'loginService',
        'notificationService'
    ];

	function LoginController($scope, $injector, loginService, notificationService) {
	    $scope.loginData = {
	        userName: '',
            passWord : ''
	    }

	    $scope.loginSubmit = loginSubmit;

	    function loginSubmit() {
		    loginService.login($scope.loginData.userName, $scope.loginData.passWord).
                then(function (response) {
		        if (response != null && response.error != undefined) {
		            notificationService.displayWarning("Đăng nhập không đúng.");
		        }
		        else {
		            var stateService = $injector.get('$state');
		            stateService.go('home');
		        }
		    });
		}
	}

})(angular.module('eshop'));