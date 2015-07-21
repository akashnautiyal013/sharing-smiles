'use strict';

angular.module('sharingsmilesApp')
  .config(function ($stateProvider, $routeProvider) {
    $stateProvider
      .state('share', {
        url: '/share',
        templateUrl: 'app/share/share.html',
        controller: 'ShareCtrl'
      })
      .state('view', {
        url: '/view/:id',
        templateUrl: 'app/share/view.html',
        controller: 'viewCtrl'
      });
      
  

  });