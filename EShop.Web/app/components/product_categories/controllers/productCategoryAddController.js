(function (app) {
    app.controller('productCategoryAddController', ['$scope', '$state', 'notificationService', 'apiService',
        function ($scope, $state, notificationService, apiService) {
            $scope.productCategory = {
                CreatedDate: new Date(),
                Status: true
            };

            $scope.AddProductCategory = function () {
                apiService.post('/api/productcategory/create',$scope.productCategory,
                    function (result) {
                        notificationService.displaySuccess(result.data.Name + ' đã được lưu !!');
                        $state.go('product_categories');
                    },
                    function (error) {
                        notificationService.displayError('Thêm mới không thành công');
                    })
            };



            function loadParentCategory() {
                apiService.get('/api/parentcategory/getall', null,
                    function (res) {
                        $scope.ParentCategories = res.data;
                    },
                function (error) {
                    notificationService.displayError('Có lỗi gì đó rồi ông bạn ơi');
                });
            }

            loadParentCategory();
        }
    ]);
})(angular.module('eshop.product_categories'));