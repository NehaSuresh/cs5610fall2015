"use strict";

(function () {
    angular
        .module("FoodTruck")
        .controller("ResultController", ResultController);

    function ResultController($scope, $location, $rootScope, $routeParams, FoodTruckService, UserService) {
        $scope.$location = $location;
        $scope.selectedFoodTruck = {};
        $scope.map = null;
        $scope.marker = null;
        $scope.addReview = addReview;
        $scope.updateReview = updateReview;
        $scope.deleteReview = deleteReview;
        $scope.selectReview = selectReview;
        $scope.showUserFavorite = showUserFavorite;
        $scope.addToFavorites = addToFavorites;
        $scope.removeFavorites = removeFavorites;
        $scope.favorite = false;
        $scope.user = $rootScope.currentUser;
        $scope.userFavorite = {};
        $scope.userReview = {};
        $scope.updater = -1;

        function initMap() {
        	$scope.userFavorite = $rootScope.currentUser.favorite;
        	FoodTruckService.FindById($routeParams["foodTruck"])
            .then(function (foodTruck) {
            	if (foodTruck) {
            		$rootScope.selectedFoodTruck = foodTruck;
            		$scope.selectedFoodTruck = foodTruck;
            		$scope.userReview = $rootScope.selectedFoodTruck.review_details;
            		
            		for (var i=0; i< $scope.userFavorite.length; i++) {
                    	if($scope.userFavorite[i] == $scope.selectedFoodTruck._id) {
                    		$scope.favorite = true;
                    	}
                    }
            		
            		var mapcoords = {latitude: $scope.selectedFoodTruck.place_details.lat, longitude: $scope.selectedFoodTruck.place_details.lng};
                    $scope.map = {center: mapcoords, zoom: 16};
                    $scope.marker = {id:0, coords: mapcoords};
            	} else {
                    $scope.createError = true;
                }
            });
       
        }

        initMap();

        function addToFavorites(foodTruck) {
        	$scope.userFavorite.push(foodTruck._id);
        	$scope.user.favorite = $scope.userFavorite;
        	UserService.Update($scope.user._id, $scope.user).then(function (updatedUser) {
        		$rootScope.currentUser = updatedUser;
                $scope.updated = true;
                $scope.selectedFoodTruck = foodTruck;
                $rootScope.selectedFoodTruck = foodTruck;
                $rootScope.$broadcast('foodTruck', foodTruck);
                $location.url('favorite/' + $scope.user._id);
             });
        }
        
        function removeFavorites(foodTruck) {
        	for (var i=0; i< $scope.userFavorite.length; i++) {
        		if($scope.userFavorite[i] == foodTruck._id) {
        			$scope.userFavorite.splice(i, 1);
        			$scope.user.favorite = $scope.userFavorite;
        			UserService.Update($scope.user._id, $scope.user).then(function (updatedUser) {
                        $rootScope.currentUser = updatedUser;
                        $scope.updated = true;
                        $scope.selectedFoodTruck = foodTruck;
                        $rootScope.selectedFoodTruck = foodTruck;
                        $rootScope.$broadcast('foodTruck', foodTruck);
                        $location.url('favorite/' + $scope.user._id);
                    });
        		}
        	}	
        }
        
        function addReview(newReview) {
        	if (newReview.length <= 0) {
        		return;
        	}
        	
    		var userReviewDetail = {};
    		userReviewDetail.user = $rootScope.currentUser;
    		userReviewDetail.review = newReview;
    		$scope.userReview.push(userReviewDetail);
    		
        	FoodTruckService.AddReview($scope.userReview, $scope.selectedFoodTruck._id)
        	.then(function (foodTruck) {
        		$scope.newReview = "";
        		$scope.updater = -1;
        		
        	});
        }
        
        function updateReview(newReview) {
        	for (var i = 0; i < $scope.userReview.length; i++) {
        		if (i == $scope.updater) {
        			$scope.userReview[i].review = newReview;
        			
        			FoodTruckService.AddReview($scope.userReview, $scope.selectedFoodTruck._id)
        			.then(function (foodTruck) {
                		$scope.newReview = "";
                		$scope.updater = -1;
                		return;
                	});
        		}
        	}
        }
        
        function deleteReview(index) {
        	for (var i = 0; i < $scope.userReview.length; i++) {
        		if (i == index) {
        			$scope.userReview.splice(index, 1);
        			FoodTruckService.AddReview($scope.userReview, $scope.selectedFoodTruck._id)
        			.then(function (foodTruck) {
                		$scope.newReview = "";
                		$scope.updater = -1;
                		return;
                	});
        		}
        	}	
        }
        
        function selectReview(index) {
        	for (var i = 0; i < $scope.userReview.length; i++) {
        		if (i == index) {
        			$scope.updater = index;
                	$scope.newReview = $scope.userReview[i].review;
        		}
        	}	
        }
        
        function showUserFavorite(reviewDetail) {
        	$location.url('favorite/' + reviewDetail.user._id);
        }
    }
})();