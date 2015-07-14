'use strict';
     var app = angular.module('sharingsmilesApp');
     app.service('Map', function($q) {
    
    this.init = function() {
        var options = {
            center: new google.maps.LatLng(40.7127837, -74.00594130000002),
            zoom: 13,
            disableDefaultUI: true    
        }
        this.map = new google.maps.Map(
            document.getElementById("map"), options
        );
        this.places = new google.maps.places.PlacesService(this.map);
    }
     this.search = function(str) {
        var d = $q.defer();
        this.places.textSearch({query: str}, function(results, status) {
            if (status == 'OK') {
                d.resolve(results[0]);
            }
            else d.reject(status);
        });
        return d.promise;
    }
    
    this.addMarker = function(res) {
        if(this.marker) this.marker.setMap(null);
        this.marker = new google.maps.Marker({
            map: this.map,
            position: res.geometry.location,
            animation: google.maps.Animation.DROP
        });
        this.map.setCenter(res.geometry.location);
    }  
      this.addNgoMarker = function(ngo) {
      if (!ngo) return;
      if (!this.ngoMarkers) this.ngoMarkers = [];
      var marker = new google.maps.Marker({
        map: this.map,
        position: new google.maps.LatLng(Number(ngo.latitude), Number(ngo.longitude)),
        animation: google.maps.Animation.DROP
      });
      this.ngoMarkers.push(marker);
    }  
     this.fitMapToNgoMarkers = function() {
      if (!this.ngoMarkers) return;
      var bounds = new google.maps.LatLngBounds();
      for (var i=0; i<this.ngoMarkers.length; i++) {
          bounds.extend(this.ngoMarkers[i].getPosition());
      };
      this.map.panToBounds(bounds);
    }

    this.centerNgoMarker = function(index) {
      if (this.ngoMarkers[index]) {
        this.map.setCenter(this.ngoMarkers[index].getPosition());

       
          
      }

    }
});


app.controller('ShareCtrl', function ($scope, $http, Map, $timeout) {
    $http.get("/api/selectcitess")
    .success(function (response) {
      $scope.cities = response;
    });
    $http.get('/api/ngoss')
    .success(function(response) {
      $scope.ngos = response;
     Map.init();
     for(var i=0; i<$scope.ngos.length; i++) {
      Map.addNgoMarker($scope.ngos[i]);
     }
    // Map.fitMapToNgoMarkers();
    });

   $scope.place = {};
    
    $scope.searchMap = function() {
        $scope.apiError = false;
        Map.search($scope.searchPlace)
        .then(
            function(res) { // success
                Map.addMarker(res);
                $scope.place.name = res.name;
                $scope.place.lat = res.geometry.location.lat();
                $scope.place.lng = res.geometry.location.lng();
            },
            function(status) { // error
                $scope.apiError = true;
                $scope.apiStatus = status;
            }
        );
    }
    
    $scope.send = function() {
        alert($scope.place.name + ' : ' + $scope.place.lat + ', ' + $scope.place.lng);    
    }
    $timeout(function () {
     
    }, 1000)
      
      $scope.centerMap = function(ngo) {
      Map.centerNgoMarker($scope.ngos.indexOf(ngo));
      
    }
    
    var s = $('input'),
    f  = $('form'),
    a = $('.after'),
        m = $('h4');

s.focus(function(){
  if( f.hasClass('open') ) return;
  f.addClass('in');
  setTimeout(function(){
    f.addClass('open');
    f.removeClass('in');
  }, 1300);
});

a.on('click', function(e){
  e.preventDefault();
  if( !f.hasClass('open') ) return;
   s.val('');
  f.addClass('close');
  f.removeClass('open');
  setTimeout(function(){
    f.removeClass('close');
  }, 1300);
})

f.submit(function(e){
  e.preventDefault();
  m.html('Thanks, high five!').addClass('show');
  f.addClass('explode');
  setTimeout(function(){
    s.val('');
    f.removeClass('explode');
    m.removeClass('show');
  }, 3000);
})
 


    
    
   
});
