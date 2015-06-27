'use strict';

angular.module('sharingsmilesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('aboutus', {
        url: '/aboutus',
        templateUrl: 'app/aboutus/aboutus.html',
        controller: 'AboutusCtrl'
      });
  });