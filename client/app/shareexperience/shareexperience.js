'use strict';

angular.module('sharingsmilesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('shareexperience', {
        url: '/shareexperience',
        templateUrl: 'app/shareexperience/shareexperience.html',
        controller: 'ShareexperienceCtrl'
      });
  });
  