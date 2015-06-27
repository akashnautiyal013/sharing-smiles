'use strict';

angular.module('sharingsmilesApp')
  .controller('NewsCtrl', function ($scope, $mainInfo) {
    $scope.message = 'Hello';
    var a = [1, 2]
    var b = {
    	name: 'hur',
    	id: '1'
    };
    var routingApiUrl = 'http//sharingsmilesApp/client/app/news/test.JSON_CALLBACK' + $scope.number;
$http({
    method: 'jsonp',
    url: routingApiUrl + '&callback=JSON_CALLBACK',
    responseType: "json"
}).
success(function(data){
    console.log('Success: ' + data);
}).
error(function(data){
    console.log('Error: ' + data);
});
 
 })