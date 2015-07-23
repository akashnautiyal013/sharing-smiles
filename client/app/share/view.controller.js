'use strict';
angular.module('sharingsmilesApp')
  .controller('viewCtrl', function ($scope, $stateParams, $http) {
  	
  	$http.get("/api/ngoss")
  .success(function(ngos){
   //$scope.ngo=ngos
   for(var i=0; i<ngos.length; i++) {
   	if (ngos[i]._id == $stateParams.id )
   	 {$scope.ngo = ngos[i]}

   	};
   
  });

  	 });