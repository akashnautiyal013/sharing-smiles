'use strict';

angular.module('sharingsmilesApp')
  .controller('ShareexperienceCtrl', function ($scope, $http) {
    $scope.message = 'Hello';
      $http.get('/api/ngoss').success(function(names) {
      $scope.ngoss = names;
      socket.syncUpdates('ngos', $scope.ngoss);
    });
       $http.get("/api/selectcitess").success(function (response) {
       $scope.cities = response;
    });
      $http.get('/api/selectcitess').success(function(names) {
      $scope.selectcitess = names;
      socket.syncUpdates('selectcites', $scope.selectcitess);
    });

      $scope.addngo = function() {
      if($scope.newngo === '',$scope.newcity === '',$scope.newcategory === '',$scope.newinfo === '') {
        return;
      }
      $http.post('/api/ngoss', {city: $scope.newcity,name:$scope.newngo ,category:$scope.newcategory ,info:$scope.newinfo});
      $scope.newcity = '';
      $scope.newngo = '';
      $scope.newcategory ='';
      $scope.newinfo ='';
    };
  

      $scope.deleteselectcites = function(selectcites) {
      $http.delete('/api/selectcitess/' + selectcites._id);
    };

      $scope.$on('$destroy', function () {
      socket.unsyncUpdates('selectcites');
    });

      $scope.deletengos = function(ngos) {
      $http.delete('/api/ngoss/' + ngos._id);
    };
      $scope.$on('$destroy', function () {
      socket.unsyncUpdates('ngos');
    });



  });
 