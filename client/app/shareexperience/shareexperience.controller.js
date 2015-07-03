'use strict';

angular.module('sharingsmilesApp')
  .controller('ShareexperienceCtrl', function ($scope, $http) {
    $scope.message = 'Hello';
   $http.get('/api/ngoss').success(function(names) {
      $scope.ngoss = names;
      socket.syncUpdates('ngos', $scope.ngoss);
    });
    $http.get('/api/selectcitess').success(function(names) {
      $scope.selectcitess = names;
      socket.syncUpdates('selectcites', $scope.selectcitess);
    });

 $scope.addcity = function() {
      $http.post('/api/selectcitess', {name: $scope.newcity });
      $scope.newcity = '';
    };
    $scope.addngo = function() {
       
      $http.post('/api/ngoss', { name: $scope.newngo });
      $scope.newngo = '';
    
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
 