'use strict';

  app.controller('ShareexperienceCtrl', function ($scope, $http ,Map,$timeout) {
   $scope.place = {};
    
  


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
      if($scope.newngo === '',$scope.newcity === '',$scope.newcategory === '',$scope.newinfo === '',$scope.place.lat=== '',$scope.place.lng==='') {
        return;
      }
      $http.post('/api/ngoss', {city: $scope.newcity,name:$scope.newngo ,category:$scope.newcategory ,info:$scope.newinfo,latitude:$scope.lat,longitude:$scope.lon});
      $scope.newcity = '';
      $scope.newngo = '';
      $scope.newcategory ='';
      $scope.newinfo ='';
      $scope.place.lat ='';
      $scope.place.lng ='';

    };
  $scope.addcity = function() {
      if($scope.city === '',$scope.lat=== '',$scope.lon==='') {
        return;
      }
      $http.post('/api/selectcitess', {name: $scope.city,latitude:$scope.lat,longitude:$scope.lon});
      $scope.city = '';
      $scope.lat = '';
      $scope.lon ='';
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
 