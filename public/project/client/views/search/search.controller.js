"use strict";

(function () {
    angular
        .module("FoodTruck")
        .controller("SearchController", SearchController);

    function SearchController($scope, $location, $rootScope, FoodTruckService) {
        $scope.$location = $location;
        $scope.user = $rootScope.currentUser;
        $scope.search = search;
        $scope.checkSearchTerm = checkSearchTerm;
        $scope.showDetails = showDetails;
        $scope.listing = null;
        $scope.searchTerm = null;
        $scope.trucks = null;

        function search() {
            if ($scope.searchTerm) {
            	FoodTruckService.SearchTrucks($scope.searchTerm)
                .then(function (trucks) {
                    if (trucks) {
                        $scope.trucks = trucks;
                    } else {
                        console.log("suggest a different method of search")
                    }
                });
            }
        }

        function checkSearchTerm() {
            if ($scope.searchTerm == "" || $scope.searchTerm == null) {
                $scope.trucks = null;
            }
        }
        
        function showDetails(foodTruck) {
            $scope.foodTruck = foodTruck;
            $rootScope.$broadcast('foodTruck', foodTruck);
            $location.url('result/' + foodTruck._id);
        }
    }
})();