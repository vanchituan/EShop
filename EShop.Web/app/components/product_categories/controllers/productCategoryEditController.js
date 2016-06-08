(function (app) {
    'use strict';

    app.controller('productCategoryEditController', ['$scope', '$state', '$stateParams', 'notificationService', 'apiService',
        function ($scope, $state, $stateParams, notificationService, apiService) {
            $scope.productCategory = {
                CreatedDate: new Date(),
                Status: true
            };

            $scope.UpdateProductCategory = function () {
                apiService.put('/api/productcategory/update',$scope.productCategory,
                    function (result) {
                        notificationService.displaySuccess(result.data.Name + ' đã được lưu !!');
                        $state.go('product_categories');
                    },
                    function (error) {
                        notificationService.displayError('Sửa không thành công');
                    })
            };

            function loadProductCategoryDetail() {
                apiService.get('api/productcategory/getbyid/' + $stateParams.id, null, function (result) {
                    $scope.productCategory = result.data;
                    $scope.productCategory.ParentProductCategory = result.data.ParentCategoryId;
                    console.log(result.data);

                }, function (error) {
                    notificationService.displayError(error.data);
                });
            }

            function loadParentCategory() {
                apiService.get('/api/parentcategory/getall', null,
                    function (res) {
                        $scope.parentCategories = res.data;

                    }, function (error) {
                        notificationService.displayError('Có lỗi gì đấy rồi ông bạn ơi');
                    })
            }


            loadProductCategoryDetail();
            loadParentCategory();
        }
    ]);
})(angular.module('eshop.product_categories'));