"use strict";

(function () {
    angular
        .module("FoodTruck")
        .controller("RegisterFoodTruckController", RegisterFoodTruckController);

    function RegisterFoodTruckController($scope, $location, $rootScope, $routeParams, FoodTruckService) {
        $scope.$location = $location;
        $scope.place = null;
        $scope.geolocate = geolocate;
        $scope.autocompleteResponse = autocompleteResponse;
        $scope.registerFoodTruck = registerFoodTruck;
        $scope.updateFoodTruck = updateFoodTruck;
        $scope.addMenuItem = addMenuItem;
        $scope.updateMenuItem = updateMenuItem;
        $scope.deleteMenuItem = deleteMenuItem;
        $scope.selectMenuItem = selectMenuItem;
        $scope.user = $rootScope.currentUser;
        $scope.createError = null;
        $scope.menu = [];
        $scope.updater = -1;
        $scope.selectedFoodTruck = {};
    	$rootScope.selectedFoodTruck = {};

    	var autoComplete;
    	
        function init() {
        	FoodTruckService.FindById($routeParams["foodTruck"])
            .then(function (foodTruck) {
                if (foodTruck) {
                	$scope.selectedFoodTruck = foodTruck;
                    	$rootScope.selectedFoodTruck = foodTruck;
                    	$scope.name = $scope.selectedFoodTruck.name;
                        $scope.cuisine = $scope.selectedFoodTruck.cuisine;
                        $scope.open = $scope.selectedFoodTruck.open;
                        $scope.close = $scope.selectedFoodTruck.close;
                        $scope.placedetails = $scope.selectedFoodTruck.placedetails;
                        $scope.addr1 = $scope.selectedFoodTruck.addr1;
                        $scope.addr2 = $scope.selectedFoodTruck.addr2;
                        $scope.city = $scope.selectedFoodTruck.city;
                        $scope.state = $scope.selectedFoodTruck.state;
                        $scope.zip = $scope.selectedFoodTruck.zip;
                        $scope.soda = $scope.selectedFoodTruck.soda;
                        $scope.coffee = $scope.selectedFoodTruck,coffee;
                        $scope.monday = $scope.selectedFoodTruck.monday;
                        $scope.tuesday = $scope.selectedFoodTruck.tuesday;
                        $scope.wednesday = $scope.selectedFoodTruck.wednesday;
                        $scope.thursday = $scope.selectedFoodTruck.thursday;
                        $scope.friday = $scope.selectedFoodTruck.friday;
                        $scope.saturday = $scope.selectedFoodTruck.saturday;
                        $scope.sunday = $scope.selectedFoodTruck.sunday;
                        $scope.menu = $scope.selectedFoodTruck.menu;
                        $scope.description = $scope.selectedFoodTruck.description;
                        $scope.review_details = $scope.selectedFoodTruck.review_details;
                } else {
                    $scope.createError = true;
                }
            });
        }
        
        if ($routeParams["foodTruck"]) {
        	init();
        }
        initAutocomplete();
        
        
        function initAutocomplete() {
            // Create the autocomplete object, restricting the search to geographical
            // location types.
            autoComplete = new google.maps.places.Autocomplete(
            		(document.getElementById('autocomplete')),
                {types: ['geocode']});

            // When the user selects an address from the dropdown, populate the address
            // fields in the form.
            autoComplete.addListener('place_changed', autocompleteResponse);
          }
        
        $scope.placedetails = {
            street_number: null,
            route: null,
            administrative_area_level_1: null,
            locality: null,
            postal_code: null,
            country: null
        };

        var componentForm = {
            street_number: 'short_name',
            route: 'long_name',
            locality: 'long_name',
            administrative_area_level_1: 'short_name',
            country: 'long_name',
            postal_code: 'short_name'
        };

        // Bias the autocomplete object to the user's geographical location,
        // as supplied by the browser's 'navigator.geolocation' object.
        function geolocate() {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
              var geolocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };
              var circle = new google.maps.Circle({
                center: geolocation,
                radius: position.coords.accuracy
              });
              autoComplete.setBounds(circle.getBounds());
            });
          }
        }
        
        function autocompleteResponse() {
        	
        	var tempPlace = autoComplete.getPlace();
            var addressComponents = tempPlace.address_components;

            for (var i = 0; i < addressComponents.length; i++) {
            	var addressType = addressComponents[i].types[0];
            	if (componentForm[addressType]) {
            		var val = addressComponents[i][componentForm[addressType]];
                    $scope.placedetails[addressType] = val;
                }
           }
            $scope.placedetails.displayAddress = $scope.placedetails.street_number + " " + $scope.placedetails.route;
            $scope.placedetails.formatted_address = tempPlace.formatted_address;
            $scope.placedetails.lat = tempPlace.geometry.location.lat();
            $scope.placedetails.lng = tempPlace.geometry.location.lng();
        }
        
        function addMenuItem() {
        	if ($scope.newMenuItem.dish.length <= 0) {
        		return;
        	}
        	$scope.menu.push($scope.newMenuItem);
        	$scope.updater = -1;
        	$scope.newMenuItem = {};
        }
        
        function updateMenuItem() {
        	for (var i = 0; i < $scope.menu.length; i++) {
        		if (i == $scope.updater) {
        			$scope.menu[i].dish = $scope.newMenuItem.dish;
        			$scope.menu[i].cost = $scope.newMenuItem.cost;
        			$scope.updater = -1;
        			$scope.newMenuItem = {};
        			return;
        		}
        	}
        }
        
        function deleteMenuItem(index) {
        	for (var i = 0; i < $scope.menu.length; i++) {
        		if (i == index) {
        			$scope.menu.splice(index, 1);
        			$scope.updater = -1;
        			$scope.newMenuItem = {};
        		}
        	}
        	
        }
        
        function selectMenuItem(index) {
        	for (var i = 0; i < $scope.menu.length; i++) {
        		if (i == index) {
        			$scope.updater = index;
                	$scope.newMenuItem.dish = $scope.menu[i].dish;
                	$scope.newMenuItem.cost = $scope.menu[i].cost;
        		}
        	}	
        }

        function registerFoodTruck() {
            var foodTruck = {};
            foodTruck['name'] = $scope.name;
            foodTruck['cuisine'] = $scope.cuisine;
            foodTruck['userid'] = $scope.user._id;
            foodTruck['open'] = $scope.open;
            foodTruck['close'] = $scope.close;
            foodTruck['place_details'] = $scope.placedetails;
            foodTruck['soda'] = $scope.soda;
            foodTruck['coffee'] = $scope.coffee;
            foodTruck['monday'] = $scope.monday;
            foodTruck['tuesday'] = $scope.tuesday;
            foodTruck['wednesday'] = $scope.wednesday;
            foodTruck['thursday'] = $scope.thursday;
            foodTruck['friday'] = $scope.friday;
            foodTruck['saturday'] = $scope.saturday;
            foodTruck['sunday'] = $scope.sunday;
            foodTruck['menu'] = $scope.menu;
            foodTruck['description'] = $scope.description;
            foodTruck['review_details'] = $scope.reviews;

            FoodTruckService.Create(foodTruck, $scope.user._id)
                .then(function (foodTruck) {
                    if (foodTruck) {
                        $location.url('myTrucks/' + $scope.user._id);
                    } else {
                        $scope.createError = true;
                    }
                });
        }
        
        function updateFoodTruck() {
            var foodTruck = {};
            foodTruck['name'] = $scope.name;
            foodTruck['cuisine'] = $scope.cuisine;
            foodTruck['userid'] = $scope.user._id;
            foodTruck['open'] = $scope.open;
            foodTruck['close'] = $scope.close;
            foodTruck['place_details'] = $scope.placedetails;
            foodTruck['soda'] = $scope.soda;
            foodTruck['coffee'] = $scope.coffee;
            foodTruck['monday'] = $scope.monday;
            foodTruck['tuesday'] = $scope.tuesday;
            foodTruck['wednesday'] = $scope.wednesday;
            foodTruck['thursday'] = $scope.thursday;
            foodTruck['friday'] = $scope.friday;
            foodTruck['saturday'] = $scope.saturday;
            foodTruck['sunday'] = $scope.sunday;
            foodTruck['menu'] = $scope.menu;
            foodTruck['description'] = $scope.description;
            foodTruck['review_details'] = [];
        
            FoodTruckService.Update(foodTruck, $scope.selectedFoodTruck._id)
                .then(function (foodTruck) {
                    if (foodTruck) {
                    	$scope.selectedFoodTruck = {};
                        $location.url('myTrucks/' + $scope.user._id);
                    } else {
                        $scope.createError = true;
                    }
                });
        }
    }
})();