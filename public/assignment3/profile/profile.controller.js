"use strict";

(function()
	{
    	angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);


    function ProfileController($scope, $location, UserService, $rootScope){
        
    	$scope.$location = $location;
    	
        var user = $rootScope.user;
        if(typeof user != "undefined") {
        	updateForm();
        }

        $scope.update = update;

        function update(){
            UserService.updateUser(user.id,$scope.user,updateCallback);
        }

        function updateCallback(user){
            console.log(user);
        }

        function updateForm(){
            $scope.user.username = user.username,
            $scope.user.password = user.password,
            $scope.user.firstName = user.firstNname,
            $scope.user.lastName = user.lastName,
            $scope.user.email = user.email
        }
    }
})();