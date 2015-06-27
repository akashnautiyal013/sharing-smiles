'use strict';

describe('Controller: SharethingCtrl', function () {

  // load the controller's module
  beforeEach(module('sharingsmilesApp'));

  var SharethingCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SharethingCtrl = $controller('SharethingCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
