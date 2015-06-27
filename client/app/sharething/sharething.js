'use strict';

angular.module('sharingsmilesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('sharething', {
        url: '/sharething',
        templateUrl: 'app/sharething/sharething.html',
        controller: 'SharethingCtrl'
      });
  });