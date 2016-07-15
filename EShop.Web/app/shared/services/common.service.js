(function (app) {
    'use strict';

    app.factory('commonService', commonService);

    commonService.$inject = ['labelConstant', 'quantityConstant'];

    function commonService(labelConstant, quantityConstant) {
        return {
            getSeoTitle: getSeoTitle,
            getCurrentDate: getCurrentDate,
            getDateOfMonthAgo : getDateOfMonthAgo,
            getCurrentDateTime: getCurrentDateTime,
            setClassForQuantity: setClassForQuantity,
            checkOutOfStock: checkOutOfStock,
            addOutOfStockAttribute: addOutOfStockAttribute
        }
        

        function getSeoTitle(inputString) {
            if (inputString == undefined || inputString == '') {
                return '';
            }

            //Đổi chữ hoa thành chữ thường
            var slug = inputString.toLowerCase();

            //Đổi ký tự có dấu thành không dấu
            slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
            slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
            slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
            slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
            slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
            slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
            slug = slug.replace(/đ/gi, 'd');
            //Xóa các ký tự đặt biệt
            slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
            //Đổi khoảng trắng thành ký tự gạch ngang
            slug = slug.replace(/ /gi, "-");
            //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
            //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
            slug = slug.replace(/\-\-\-\-\-/gi, '-');
            slug = slug.replace(/\-\-\-\-/gi, '-');
            slug = slug.replace(/\-\-\-/gi, '-');
            slug = slug.replace(/\-\-/gi, '-');
            //Xóa các ký tự gạch ngang ở đầu và cuối
            slug = '@' + slug + '@';
            slug = slug.replace(/\@\-|\-\@|\@/gi, '');

            return slug;
        }

        function getCurrentDate() {
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!
            var yyyy = today.getFullYear();

            if (dd < 10) {
                dd = '0' + dd;
            }

            if (mm < 10) {
                mm = '0' + mm;
            }

            today = mm + '/' + dd + '/' + yyyy;
            return today;
        }

        function getCurrentDateTime() {

            var now = new Date();
            var year = now.getFullYear();
            var month = now.getMonth() + 1;
            var day = now.getDate();
            var hour = now.getHours();
            var minute = now.getMinutes();
            var second = now.getSeconds();
            if (month.toString().length == 1) {
                var month = '0' + month;
            }
            if (day.toString().length == 1) {
                var day = '0' + day;
            }
            if (hour.toString().length == 1) {
                var hour = '0' + hour;
            }
            if (minute.toString().length == 1) {
                var minute = '0' + minute;
            }
            if (second.toString().length == 1) {
                var second = '0' + second;
            }
            var dateTime = month + '/' + day + '/' +  year + ' ' + hour + ':' + minute;
            return dateTime;
        }

        function getDateOfMonthAgo(){
            var date = new Date();
            var dd = date.getDate();
            var mm = date.getMonth() + 1; //January is 0!
            var yyyy = date.getFullYear();

            if (dd < 10) {
                dd = '0' + dd;
            }

            if (mm < 10) {
                mm = '0' + mm;
            }

            date = mm - 1 + '/' + dd + '/' + yyyy;
            return date;
        }

        function setClassForQuantity(quantity) {
            var result = '';
            if (quantity <= quantityConstant.danger) {
                result = labelConstant.danger;
            }
            else if (quantity > quantityConstant.danger && quantity <= quantityConstant.warning) {
                result = labelConstant.warning;
            }
            else if (quantity > quantityConstant.warning && quantity <= quantityConstant.normal) {
                result = labelConstant.normal;
            }
            else if (quantity > quantityConstant.normal && quantity <= quantityConstant.safe) {
                result = labelConstant.success;
            }
            else {
                result = labelConstant.info;
            }
            return result;
        }

        function checkOutOfStock(whDetailItem) {
            var result = false;
            if (whDetailItem[0].Quantity == 0 && whDetailItem[0].Warehouse.WarehouseId == 1) {
                result = true;
            }
            return result;
        }

        //assign for item IsOutOfStock attribute if quantity = 0
        function addOutOfStockAttribute(list) {
            for (var item in list) {
                if (list[item].WarehouseDetails[0].Quantity == 0 && list[item].WarehouseDetails[0].Warehouse.WarehouseId == 1) {
                    list[item].IsOutOfStock = true;
                }
                else {
                    list[item].IsOutOfStock = false;
                }
            }
            return list;
        }
    };
})(angular.module('eshop.common'));