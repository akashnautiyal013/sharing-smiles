'use strict';

describe('Controller: ShareCtrl', function () {

  // load the controller's module
  beforeEach(module('sharingsmilesApp'));

  var ShareCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope,$http) {
    scope = $rootScope.$new();
    ShareCtrl = $controller('ShareCtrl', {
      $scope: scope
    });

        $http.post('/api/ngos', {
          name:tempAwesome.name,
          
        }).
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
