"use strict";

(function()
		{
			angular
				.module("FormBuilderApp")
				.controller("LoginController", LoginController);
			
			function LoginController($scope, $location, UserService, $rootScope) {
				$scope.$location = $location;
				$scope.login = login;
				
				function login() {
					UserService.findUserByUsernameAndPassword($scope.username, $scope.password, loginCallback);
				}
				
				function loginCallback(user) {
					if (user != null) {
						$rootScope.user = user; 
						$location.url("/");	
					} else {
						console.log("username and password does not match");
					}
				}
			};
		})();