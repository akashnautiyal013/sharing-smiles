'use strict';

angular.module('sharingsmilesApp')
var app = angular.module('sharingsmilesApp');

app.service('multipartForm', ['$http', function($http){
    this.post = function(uploadUrl, data){
        var fd = new FormData();
        for(var key in data)
            fd.append(key, data[key]);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.indentity,
            headers: { 'Content-Type': undefined }
        });
    }
}])
app.directive('fileModel', ['$parse', function($parse){
    return {
        restrict: 'A',
        link: function(scope, element, attrs){
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                })
            })
        }
    }
}])
.controller('ShareexperienceCtrl', function ($scope ,$http,Upload,Auth,User,multipartForm) {


$scope.customer = {};
    $scope.Submit = function(){
        var uploadUrl = 'api/imagess';
        multipartForm.post(uploadUrl, $scope.customer);
    }



  $scope.ngoname = '';
  $scope.newexperience = '';
 
    // Grab the initial set of available comments
    $http.get('/api/postexperiences').success(function(experiences) {
    $scope.experiences = experiences;

  });
 
        $scope.addexperience = function() {
        if($scope.newexperience === '',$scope.ngoname === '') {
        return; }
      $http.post('/api/postexperiences', { content: $scope.newexperience, ngoname:$scope.ngoname});
      $scope.newexperience = '';
      $scope.ngoname = '';
    };

   
   

 $scope.$watch('files', function () {
        $scope.upload($scope.files);
    });
    // set default directive values 
    // Upload.setDefaults( {ngf-keep:false ngf-accept:'image/*', ...} ); 
    $scope.upload = function (files) {
    if (files && files.length) {
            for(var i = 0; i < files.length; i++) {
                var file = files[i];
                Upload.upload({
                    url: '/api/imagess',
                    fields: {'username': $scope.username},
                    file: file,
                    fileFormDataName: 'image'
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                }).success(function (data, status, headers, config) {
                    console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
                }).error(function (data, status, headers, config) {
                    console.log('error status: ' + status);
                })
            }

        }
    };

 
  });


  