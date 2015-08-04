'use strict';

angular.module('sharingsmilesApp')



.controller('ShareexperienceCtrl', function ($scope ,$http,Upload,Auth,User,multipartForm) {

$http.get("/api/imagess")
    .success(function (response) {
      $scope.imgs = response;
    });

filepicker.setKey("AUj3OjbhUTWaRIIKsBKxmz");


$scope.files = [];
$scope.isLoggedIn = Auth.isLoggedIn;
$scope.getCurrentUser = Auth.getCurrentUser;
var getCurrentUser = $scope.getCurrentUser ;


        $('#big-freaking-button').click(function() {
 
    var getCurrentUser = $scope.getCurrentUser ;
  var user ={};
  user.getuser = getCurrentUser;
    var from  = $("#contents").val();
     var msg   = $("#ngoname").val();


    // Settings
    filepicker.pick({
        mimetype: 'image/*', /* Images only */
        maxSize: 1024 * 1024 * 5, /* 5mb */
        imageMax: [1500, 1500], /* 1500x1500px */
        cropRatio: 1/1, /* Perfect squares */
        services: ['*'] /* From anywhere */
    }, function(blob) {

        // Returned stuff for example
        var filename = blob.filename;
        var url = blob.url;
        var id = blob.id;
        var isWriteable = blob.isWriteable;
        var mimetype = blob.mimetype;
        var size = blob.size;

        // Save to a database somewhere
        // Alternatively you can have filepicker do it for you: https://www.filepicker.com/documentation/storage/
        $.ajax({
            url: '/api/imagess',
            type: 'POST',
            data: {
                user:getCurrentUser().name,
                ngoname:msg,
                contents:from,
                url: blob.url,
            },
            success: function(data) {

                // Response from storing the URL successfully
                console.log(data);

            }
        });

    });

});


    
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


  