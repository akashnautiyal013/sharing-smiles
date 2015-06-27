'use strict';

describe('Controller: SharemoneyCtrl', function () {

  // load the controller's module
  beforeEach(module('sharingsmilesApp'));

  var SharemoneyCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SharemoneyCtrl = $controller('SharemoneyCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
