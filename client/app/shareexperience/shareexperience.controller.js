'use strict';

angular.module('sharingsmilesApp')
.directive('myFile', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.myFile);
            var modelSetter = model.assign;

            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };

}])
.service('API', ['$http', function ($http) {
    return {
        uploadLogo: function(logo) {
            var formData = new FormData();
            formData.append("file", logo);
            return $http.post('/api/imagess/', formData, {
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            });
        }
       }; 
    }])


.controller('ShareexperienceCtrl', function ($scope ,$http,Upload,Auth,User,API) {

$scope.uploadLogo = function(myFile) {
      API.uploadLogo(myFile).success(function (uploadResponse) {
          // Handle response from server
        console.log(uploadResponse);
      }).error(function (error) {
        // Handle error from server
        console.log(error);
      });
    };


//By setting ‘Content-Type’: undefined, the browser sets the Content-Type to multipart/form-data for us and fills in the correct boundary. Manually setting ‘Content-Type’: multipart/form-data will fail to fill in the boundary parameter of the request.



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
        console.log('hur')
    if (files && files.length) {
            for(var i = 0; i < files.length; i++) {
                var file = files[i];
                Upload.upload({
                    url: '/api/imagess',
                    fields: {'username': $scope.username},
                    file: file
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


  