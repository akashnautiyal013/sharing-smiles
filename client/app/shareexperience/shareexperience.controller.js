'use strict';

angular.module('sharingsmilesApp')
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


  