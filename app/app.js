var app = angular.module("greedyGame", []);
app.controller("greedyGameController", function($scope, $http) {
    angular.element(document).ready(function() {
        $(function() {
            var options = {
                format: 'yyyy-mm-dd'
            };
            $('.date').datepicker(options);
        });
        google.charts.load('current', {
            packages: ['corechart', 'bar']
        });
        $(window).resize(function() {
            if ($scope.ads.length != 0) {
                drawBarGraph();
            }
        });
    });
    $scope.form = {
        to: null,
        from: null
    };
    $scope.ads = [];
    $scope.viewList = false;
    $scope.error = false;
    $scope.errorMessage = "";
    $scope.submit = function() {
        $scope.dateError = '';
        if ($scope.form.from > $scope.form.to) {
            $scope.viewList = false;
            $scope.ads = [];
            $scope.dateError = 'End Date should be greate than start date';
            return false;
        } else {
            var method = "";
            var url = "";
            method = "GET";
            url = 'http://104.197.128.152/data/adrequests?from=' + $scope.form.from + '&to=' + $scope.form.to;
            $http({
                method: method,
                url: url,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(_success, _error);
        }
    };

    function _success(response) {
        $scope.ads = response.data.data;
        $scope.viewList = true;
        if ($scope.ads.length != 0) {
            $scope.graphdata = [
                ['string', 'ad Requests']
            ];
            for (var i = 0; i < $scope.ads.length; i++) {
                $scope.graphdata.push([response.data.data[i].date, Number(response.data.data[i].adrequest)]);
            }
            google.charts.setOnLoadCallback(drawBarGraph);
        }
    }

    function drawBarGraph() {
        var data = google.visualization.arrayToDataTable($scope.graphdata);
        var options = {
            title: 'Number of Ad Requests',
            chartArea: {
                top: 40,
                left: 150
            },
            hAxis: {
                title: 'adrequests',
            },
            vAxis: {
                title: 'Date',
            }
        };
        var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
        chart.draw(data, options);
    }
    // handling error
    function _error(response) {
        $scope.error = true;
        $scope.errorMessage = response.statusText;
    }
});