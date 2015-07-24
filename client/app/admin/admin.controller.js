'use strict';

angular.module('sharingsmilesApp')
  .controller('AdminCtrl', function ($scope, $http, Auth, User,) {

    // Use the User $resource to fetch all users
    $scope.users = User.query();

    $scope.delete = function(user) {
      User.remove({ id: user._id });
      angular.forEach($scope.users, function(u, i) {
        if (u === user) {
          $scope.users.splice(i, 1);
        }
      });
    };
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
      $http.post('/api/ngoss', {city: $scope.newcity,name:$scope.newngo ,category:$scope.newcategory ,info:$scope.newinfo,latitude:$scope.place.lat,longitude:$scope.place.lng});
      $scope.newcity = '';
      $scope.newngo = '';
      $scope.newcategory ='';
      $scope.newinfo ='';
      $scope.place.lat ='';
      $scope.place.lng ='';

    };
  $scope.addcity = function() {
      if($scope.city === '',$scope.lat=== '',$scope.lng==='') {
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

   $(document).ready(function(){
  $('#search').click(function(){
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({address:$('#address').val(),region:'no'},function(results,status){
      if(status.toLowerCase() == 'ok'){
        var coords = new google.maps.LatLng(results[0]['geometry']['location'].lat(),results[0]['geometry']['location'].lng());
        $('#lat').val(coords.lat());
        $('#lng').val(coords.lng());
      }
    });
  });
});
  });
