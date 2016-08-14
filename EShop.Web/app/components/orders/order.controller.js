(function (app) {
    app.controller('OrderController', OrderController);

    OrderController.$inject = [
        '$scope',
        'apiService',
        'notificationService'
    ];

    function OrderController($scope, apiService, notificationService) {

        function loadCategories() {
            apiService.get('/api/productcategory/getall', null, function (res) {
                $scope.productCategories = res.data;
                //$scope.categoryId = {
                //    Id: 15,
                //    Name: 'Dây xích'
                //};
            })
        }

        $scope.changed = function (item,model) {
            //console.log(item);
            console.log(model);
        }

        loadCategories();
    }
})(angular.module('eshop.orders'));