"use strict";

(function()
		{	
			angular
			.module("FormBuilderApp")
			.controller("RegisterController", RegisterController);
			
			function RegisterController($scope, $location, UserService, $rootScope) {
				
				$scope.$location = $location;
				$scope.register = register;
				$scope.user = {};
				
				function register() {
					console.log($scope.user);
					UserService.createUser($scope.user).then(function(user) {
						console.log(user);
						$rootScope.user = user; 
						$location.url('/profile');
					});
				}
			}
		})();