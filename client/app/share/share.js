'use strict';

angular.module('sharingsmilesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('share', {
        url: '/share',
        templateUrl: 'app/share/share.html',
        controller: 'ShareCtrl'
      });
  });