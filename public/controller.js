var app = angular.module('miApp', []);

app.controller('symbolsController', function ($scope, DataServiceSymbols) {
    DataServiceSymbols.getDataSymbols().then(function (response) {
        $scope.dataSymbols = response.data.symbolsList;
    });
});

app.service('DataServiceSymbols', function ($http) {
    this.getDataSymbols = function () {
        return $http.get('http://localhost:9090/api/symbols');
    };
});

app.controller('historicalController', function ($scope, DataServiceHistorical) {
    $scope.historicalSymbol = 'Pricing Table'
    var myChart;

    $scope.cambiarValorSymbol = function (newValue) {
        DataServiceHistorical.getDataHistoricals(newValue).then(function (response) {
            let xValues = [], yValues = [];

            $scope.dataHistorical = response.data.historical;
            $scope.historicalSymbol = newValue

            for (let i = response.data.historical.length - 20; i < response.data.historical.length; i++) {
                xValues.push(response.data.historical[i].date);
                yValues.push(response.data.historical[i].close);
            }

            const ctx = document.getElementById('myChart');

            if (myChart) {
                myChart.destroy();
            }

            myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: xValues,
                    datasets: [{
                        label: 'Prices',
                        data: yValues
                    }]
                },
            });
        });
    }
});

app.service('DataServiceHistorical', function ($http) {
    this.getDataHistoricals = function (newValue) {
        return $http.get('http://localhost:9090/api/Historical/' + newValue);
    };
});