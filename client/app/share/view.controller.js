'use strict';
angular.module('sharingsmilesApp')
  .controller('viewCtrl', function ($scope, $routeParams) {
  	$scope.ngo=$scope.ngos[$routeParams.id]

  	 });