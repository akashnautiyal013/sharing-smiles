'use strict';

angular.module('sharingsmilesApp')
  .controller('ShareCtrl', function ($scope, $http) {
    $scope.message = 'Hello';

 $scope.url = "/api/selectcitess";
    $scope.selectedselectcites = null;
    $scope.selectcitess = null;
    $scope.loadcity= function () {
        $http.get($scope.url).then(function (response) {
            $scope.selectcitess = response.data;
        });
    };


 });