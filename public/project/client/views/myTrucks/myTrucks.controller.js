"use strict";

(function () {
    angular
        .module("FoodTruck")
        .controller("MyTrucksController", MyTrucksController);

    function MyTrucksController($scope, $location, $rootScope, FoodTruckService) {
        $scope.$location = $location;
        $scope.user = $rootScope.currentUser;
        $scope.deleteFoodTruck = deleteFoodTruck;
        $scope.updateFoodTruck = updateFoodTruck;
        $scope.showDetails = showDetails;
        $scope.myTrucks = null;
        $scope.noTrucks = false;
        $scope.truck = null;

        function init() {
        	FoodTruckService.FindAll($scope.user._id)
                .then(function (userTrucks) {
                    if (userTrucks) {
                        $scope.myTrucks = userTrucks;
                    } else {
                        $scope.noTrucks = true;
                    }
                });
        }

        if ($scope.user) {
            init();
        }

        function deleteFoodTruck(foodTruckId) {
            FoodTruckService.Delete(foodTruckId, $scope.user._id)
                .then(function (userTrucks) {
                    if (userTrucks) {
                        $scope.myTrucks = userTrucks;
                    } else {
                        $scope.noTrucks = true;
                    }
                })
        }
        
        function updateFoodTruck(foodTruck) {
        	$location.url('registerFoodTruck/' + foodTruck._id);
        }

        function showDetails(foodTruck) {
            $location.url('result/' + foodTruck._id);
        }
    }
})();