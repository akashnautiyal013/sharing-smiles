'use strict';

angular.module('sharingsmilesApp').controller('EventCtrl', function ($scope, $http) {
    $scope.message = 'Hello';
    $http.get("http://www.w3schools.com/angular/customers.php")
  .success(function (response) {$scope.names = response.records;});
  
});