"use strict";

(function () {
	angular
	.module("FoodTruck")
	.config(Config);

	function Config($routeProvider) {
		$routeProvider
		.when("/", {redirectTo: "/home"
		})
		.when("/home", {
			templateUrl: "views/home/home.view.html" 
		})
		.when("/register", {
			templateUrl: "views/register/register.view.html" ,
			controller: "RegisterController"
		})
		.when("/login", {
			templateUrl: "views/login/login.view.html",
			controller: "LoginController"
		})
		.when("/profile/", {
			templateUrl: "views/profile/profile.view.html",
			controller: "ProfileController"//
		})
		.when("/search", {
			templateUrl: "views/search/search.view.html",
			controller: "SearchController"
		})
		.when("/registerFoodTruck/:foodTruck", {
			templateUrl: "views/registerFoodTruck/registerFoodTruck.view.html",
			controller: "RegisterFoodTruckController" //,
		})
		.when("/registerFoodTruck", {
			templateUrl: "views/registerFoodTruck/registerFoodTruck.view.html",
			controller: "RegisterFoodTruckController" //,
		})
		.when("/myTrucks/:userid", {
			templateUrl: "views/myTrucks/myTrucks.view.html",
			controller: "MyTrucksController",
		})
		.when("/favorite/:userid", {
			templateUrl: "views/favorite/favorite.view.html",
			controller: "FavoriteController",
		})
		.when("/result/:foodTruck", {
			templateUrl: "views/result/result.view.html",
			controller: "ResultController",
		})
		.otherwise("/",{
			redirectTo: "/home" //,
		});
	}
})();
