'use strict';

angular.module('sharingsmilesApp')

.directive('fileUpload', function () {
    return {
        scope: true,        
        link: function (scope, el, attrs) {
            el.bind('change', function (event) {
                var files = event.target.files;
               
                for (var i = 0;i<files.length;i++) {
                   
                    scope.$emit("fileSelected", { file: files[i] });
                }                                       
            });
        }
    };
})
  .controller('ShareexperienceCtrl', function ($scope ,$http) {
  	

   $scope.model = {
        name: "",
        experience: ""
    };
    
    $scope.files = [];

    $scope.$on("fileSelected", function (event, args) {
        $scope.$apply(function () {            
            $scope.files.push(args.file);
        });
    });
    
    $scope.upload= function() {
         if($scope.files === ''){
            return;
         }
        $http({
            method: 'POST',
            url: "/Api/postexperiences",
           
            headers: { 'Content-Type': undefined },
          
            transformRequest: function (data) {
                var formData = new FormData();
              
                formData.append("model", angular.toJson(data.model));
                              for (var i = 0; i < data.files; i++) {
                    
                    formData.append("file" + i, data.files[i]);
                }
                return formData;
            },
            //Create an object that contains the model and files which will be transformed
            // in the above transformRequest method
            data: {model:$scope.files, files: $scope.files }
        }).
        success(function (data, status, headers, config) {
            alert("success!");
            console.log()
        }).
        error(function (data, status, headers, config) {
            alert("failed!");
        });
    };


    

  });

  