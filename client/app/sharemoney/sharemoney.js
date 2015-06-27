'use strict';

angular.module('sharingsmilesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('sharemoney', {
        url: '/sharemoney',
        templateUrl: 'app/sharemoney/sharemoney.html',
        controller: 'SharemoneyCtrl'
      });
  });