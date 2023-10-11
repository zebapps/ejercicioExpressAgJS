var app = angular.module('miApp', []);

app.controller('symbolsController', function($scope, DataServiceSymbols) {
    DataServiceSymbols.getDataSymbols().then(function(response) {
        $scope.dataSymbols = response.data.symbolsList;
    });
});

app.service('DataServiceSymbols', function($http) {
    this.getDataSymbols = function() {
        return $http.get('http://localhost:9090/api/symbols');
    };
});

app.controller('historicalController', function($scope, DataServiceHistorical) {
    $scope.cambiarValorSymbol = function(nuevoValor){
        DataServiceHistorical.getDataHistoricals(nuevoValor).then(function(response) {
            $scope.dataHistorical = response.data.historical;
            $scope.historicalSymbol = nuevoValor
        });
    }
});

app.service('DataServiceHistorical', function($http) {
    this.getDataHistoricals = function(nuevoValor) {
        return $http.get('http://localhost:9090/api/Historical/'+nuevoValor);
    };
});