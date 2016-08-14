(function (app) {
    app.controller('StatisticController', StatisticController);
    StatisticController.$inject = [
        '$filter',
        'apiService',
        'commonService',
        'notificationService'
    ];

    function StatisticController($filter, apiService, commonService, notificationService) {
        var vm = this;
        vm.fromDate = new Date(commonService.getDateOfMonthAgo());
        vm.toDate = new Date(commonService.getCurrentDate());
        vm.chart = {
            series: [
                'Doanh thu',
                'Lợi nhuận',
                'Tỷ số'
            ],
            colours: [
                '#FD1F5E',
                '#1EF9A1',
                '#7FFD1F',
                '#68F000',
                '#3883cc'
            ],
            datasetOverride: [
                { yAxisID: 'y-axis-1' },
                { yAxisID: 'y-axis-2' }
            ],
            options: {

                multiTooltipTemplate: function (data) {

                    var tooltip = '';
                    if (data.datasetLabel === 'Doanh thu') {
                        tooltip += 'Doanh thu: ' + $filter('number')(data.value);
                    }
                    else if (data.datasetLabel === 'Lợi nhuận') {
                        tooltip += 'Lợi nhuận: ' + $filter('number')(data.value);
                    }
                    else if (data.datasetLabel === 'Tỷ số') {
                        tooltip += 'Tỷ số: ' + data.value.toFixed(2) + ' %';
                    }
                    return tooltip;
                },
                scales: {
                    yAxes: [
                      {
                          id: 'y-axis-1',
                          type: 'linear',
                          display: true,
                          position: 'left'
                      },
                      {
                          id: 'y-axis-2',
                          type: 'linear',
                          display: true,
                          position: 'right'
                      }
                    ]
                },
                scaleLabel: function (label) {
                    return $filter('number')(label.value);
                }
            },
            labels: new Array(),
            dataChart: new Array()
        }
        vm.fromDatePopup = {
            datePickerOpen: false,
            openDatePicker: function ($event) {
                vm.fromDatePopup.datePickerOpen = true;
            },
            selectedDate: selectedDate
        }

        vm.toDatePopup = {
            datePickerOpen: false,
            openDatePicker: function ($event) {
                vm.toDatePopup.datePickerOpen = true;
            },
            selectedDate: selectedDate
        }

        function selectedDate() {
            vm.chart.labels = [];
            vm.chart.dataChart = [];
            getStatistic(vm.fromDate, vm.toDate);
        }

        function getStatistic(fromDate, toDate) {
            apiService.get('/api/statistic/getrevenues?fromDate=' + $filter('date')(fromDate, 'MM/dd/yyyy') + '&toDate=' + $filter('date')(toDate, 'MM/dd/yyyy'), null,
                function (res) {
                    var totalArray = new Array();
                    var revenueArray = new Array();
                    var percentArray = new Array();
                    for (var item in res.data) {
                        var percent = (res.data[item].Profit / res.data[item].Total) * 100;
                        vm.chart.labels.push($filter('date')(res.data[item].Date, 'dd/MM/yyyy'));
                        totalArray.push(res.data[item].Total);
                        revenueArray.push(res.data[item].Profit);
                        percentArray.push(percent);
                    }
                    vm.chart.dataChart.push(totalArray,revenueArray, percentArray);
                    vm.dataTable = res.data;
                }, function (error) {
                    notificationService.displayWarning('Có lỗi xãy ra!!');
                })
        }

        getStatistic(null, null);
    }
})(angular.module('eshop.reports'));