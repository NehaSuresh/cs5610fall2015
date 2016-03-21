"use strict";

(function () {
    angular
        .module("FoodTruck")
        .controller("FavoriteController", FavoriteController);

    function FavoriteController($scope, $routeParams, $location, $rootScope, FoodTruckService, UserService) {
        $scope.$location = $location;
        $scope.user = $rootScope.currentUser;
        $scope.showDetails = showDetails;
        $scope.userFavorite = [];
        $scope.favoriteTruck = [];
        $scope.noTrucks = false;

        function init() {
        	var userId = $routeParams.userid;
        	
        	UserService.FindById(userId)
        		.then(function (tempUser) {
        			$scope.userFavorite = tempUser.favorite;
        			
        			for (var i = 0; i < $scope.userFavorite.length; i++) {
        				FoodTruckService.FindById($scope.userFavorite[i])
        					.then(function (truck) {
        						if (truck) {
        							$scope.favoriteTruck.push(truck);
        						}
        					});
        			}
        		});
        }

        if ($scope.user) {
            init();
        }

        function showDetails(foodTruck) {
        	$location.url('result/' + foodTruck._id);
        }
    }
})();