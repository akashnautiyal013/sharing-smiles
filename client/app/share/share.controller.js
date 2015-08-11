'use strict';
     var app = angular.module('sharingsmilesApp');
     app.service('Map', function($q) {
    
    this.init = function() {
        if(!!navigator.geolocation) {
       
        var mapOptions = {
            zoom: 6,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
  
        this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
        console.log('init', this);

        var map = this.map;

        navigator.geolocation.getCurrentPosition(function(position) {
        
            var geolocate = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            var infowindow = new google.maps.InfoWindow({
                map: map,
                position: geolocate,
                content:
                    'hi {{ getCurrentUser().name }} <br>ngos near you'
                    
            });

            map.setCenter(geolocate);
            
        });
        
    } else {
        document.getElementById('map').innerHTML = 'No Geolocation Support.';
    }
        // this.map = new google.maps.Map(
        //     document.getElementById("map"), mapOptions
        // );
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
            map:this.map,
          
            position: res.geometry.location,
            animation: google.maps.Animation.LatLngBounds
        });
        this.map.setCenter(res.geometry.location);
    }

    
      this.addNgoMarker = function(ngo) {
      if (!ngo) return;
      if (!this.ngoMarkers) this.ngoMarkers = [];
      console.log(ngo)
      var markerimage = /assets/images/marker.png;
      var marker = new google.maps.Marker({
        map: this.map,
        zoom:10,
        position: new google.maps.LatLng(Number(ngo.position.latitude), Number(ngo.position.longitude)),
        animation: google.maps.Animation.DROP,
        icon:markerimage
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


app.controller('ShareCtrl', function ($scope, $http, Map, $timeout,Auth,$location) {


  $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  
    $http.get("/api/selectcitess")
    .success(function (response) {
      $scope.cities = response;
    });

     $http.get('/api/ngoss').success(function(response) {
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
    
      
    

    
    
     $scope.search = "";
    $scope.geoCode = function () {
        if ($scope.search && $scope.search.length > 0) {
            if (!this.geocoder) this.geocoder = new google.maps.Geocoder();
            this.geocoder.geocode({ 'address': $scope.search }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var loc = results[0].geometry.location;
                    $scope.search = results[0].formatted_address;
                    $scope.gotoLocation(loc.lat(), loc.lng());
                } else {
                    alert("Sorry, this search produced no results.");
                }
            });
        }
    };

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
})

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

    
    
   