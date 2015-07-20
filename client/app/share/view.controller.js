'use strict';
angular.module('sharingsmilesApp')
  .controller('ViewCtrl', function ($scope, $routeParams) {
  	$scope.ngo=$scope.ngos[$routeParams.id]

  	 });