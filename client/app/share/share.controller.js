'use strict';

angular.module('sharingsmilesApp')
  .controller('ShareCtrl', function ($scope, $http) {
    $scope.message = 'Hello';
  $http.get("app/aboutus/city.json")
    .success(function (test) {
      $scope.names = test.records;
    });
   $http.post("app/aboutus/city.json")
    .success(function (records) {
      $scope.names = records.records;});
 });