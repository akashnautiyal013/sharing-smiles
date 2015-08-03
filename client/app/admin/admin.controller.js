'use strict';

angular.module('sharingsmilesApp')
  .controller('AdminCtrl', function ($scope, $http, Auth, User,socket) {
    
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

    $scope.newNgoBlank = {
      name: '',
      city:'',
      category:'',
      info:'',
      position: {
        latitude:'',
        longitude:''
      },
      active: true,
      address: ''
    }
    $scope.newNgo = {}
    angular.extend($scope.newNgo, $scope.newNgoBlank)

    $scope.addngo = function() {
      if ($scope.newNgo.name.length === 0 ||
      $scope.newNgo.city.length === 0 ||
      $scope.newNgo.category.length === 0 ||
      $scope.newNgo.info.length === 0 ||
      $scope.newNgo.position.longitude.length === 0||
      $scope.newNgo.position.latitude.length === 0) {
        console.log('empty')
        return;
      }
      $http.post('/api/ngoss', $scope.newNgo);
      $scope.newNgo = angular.extend({}, $scope.newNgoBlank)
    };
  $scope.addcity = function() {
      if($scope.city === '',$scope.lat=== '',$scope.lng==='') {
        return;
      }
      $http.post('/api/selectcitess', {name: $scope.city,latitude:$scope.lat,longitude:$scope.lng});
      $scope.city = '';
      $scope.lat = '';
      $scope.lng ='';
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

   $scope.getLatLng = function(){
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({address:$('#address').val(),region:'no'},function(results,status){
      if(status.toLowerCase() == 'ok'){
        var coords = new google.maps.LatLng(results[0]['geometry']['location'].lat(),results[0]['geometry']['location'].lng());
        // $('#lat').val(coords.lat());
        // $('#lng').val(coords.lng());
        $scope.newNgo.position.latitude = coords.lat();
        $scope.newNgo.position.longitude = coords.lng();
      }
    });
  };
});
  });
