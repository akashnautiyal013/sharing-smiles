'use strict';

angular.module('sharingsmilesApp')
  .config(function ($stateProvider, $routeProvider) {
    $stateProvider
      .state('share', {
        url: '/share',
        templateUrl: 'app/share/share.html',
        controller: 'ShareCtrl'
      });
      
      $routeProvider.
      when('/',{templateUrl:'share/share.html'}).
      when('/view/:id',{templateUrl:'/share/view.html',controller:'viewCtrl'})
  });