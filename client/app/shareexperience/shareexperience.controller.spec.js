'use strict';

describe('Controller: ShareexperienceCtrl', function () {

  // load the controller's module
  beforeEach(module('sharingsmilesApp'));

  var ShareexperienceCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ShareexperienceCtrl = $controller('ShareexperienceCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
