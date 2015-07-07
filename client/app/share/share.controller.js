'use strict';

angular.module('sharingsmilesApp')
.controller('ShareCtrl', function ($scope, $http) {
  $scope.message = 'Hello';
    $http.get("/api/selectcitess").success(function (response) {
    $scope.cities = response;
  });
     $http.get('/api/ngoss').success(function(response) {
     $scope.ngos = response;
  });
   
});