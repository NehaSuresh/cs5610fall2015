"use strict";

(function () {
    angular
        .module("FoodTruck")
        .factory("FoodTruckService", FoodTruckService);

    function FoodTruckService($http, $q) {
        var service = {
            Create: registerFoodTruck,
            Update: updateFoodTruck,
            Delete: deleteFoodTruck,
            FindAll: findAllFoodTrucksForUser,
            FindById: findById,
            SearchTrucks: searchTrucks,
            AddReview: addReview
        };

        return service;

        function registerFoodTruck(foodTruck, userid) {
            var deferred = $q.defer();
            var url = '/api/project/foodTruck/' + userid;

            $http.post(url, foodTruck)
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function addReview(reviewDetail, foodTruckId) {
        	var deferred = $q.defer();
            var url = '/api/project/foodTruck/reviewDetail/' + foodTruckId;

            $http.put(url, reviewDetail)
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }
        
        function updateFoodTruck(foodTruck, foodTruckId) {
        	var deferred = $q.defer();
            var url = '/api/project/foodTruck/' + foodTruckId;

            $http.put(url, foodTruck)
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function deleteFoodTruck(foodTruckId, userid) {
            var deferred = $q.defer();
            var url = '/api/project/foodTruck/' + foodTruckId + '/user/' + userid;

            $http.delete(url)
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function findAllFoodTrucksForUser(userid) {
            var deferred = $q.defer();
            var url = '/api/project/foodTruck/user/' + userid;

            $http.get(url)
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function findById(foodTruckId) {
            var deferred = $q.defer();
            var url = '/api/project/foodTruck/' + foodTruckId;

            $http.get(url)
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function searchTrucks(searchTerm) {
            var deferred = $q.defer();
            var url = '/api/project/search?searchterm=' + searchTerm;
            console.log(url);

            $http.get(url)
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }
    }
})();