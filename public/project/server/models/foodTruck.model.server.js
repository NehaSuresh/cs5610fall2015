"use strict";

module.exports = function (mongoose, db) {
    var q = require('q');
    var FoodTruckSchema = require('./foodTruck.schema.server.js')(mongoose);
    var FoodTruckModel = db.model('FoodTruckModel', FoodTruckSchema);

    var api = {
        Register: registerFoodTruck,
        Update: updateFoodTruck,
        FindAll: findAllForUser,
        FindById: findFoodTruckById,
        Delete: deleteFoodTruck,
        AddReview : addReview,
        SearchFoodTrucks: searchFoodTrucks
    };

    return api;

    function registerFoodTruck(foodTruck) {
        var deferred = q.defer();
        console.log(foodTruck);
        FoodTruckModel.create(foodTruck, function (err, newFoodTruck) {
            if (err) {
            	console.log(err);
                deferred.reject(err);
            } else {
            	console.log(newFoodTruck);
                deferred.resolve(newFoodTruck);
            }
        });

        return deferred.promise;
    }
    
    function addReview(id, reviewDetails) {
    	var deferred = q.defer();
    	
    	FoodTruckModel.findById(id, function(err, foodTruck) {
    		foodTruck.review_details = reviewDetails;
    		
    		foodTruck.save(function (err, foodTruck) {
    			if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(updateFoodTruck);
                }
    		});
    	});
    	return deferred.promise;
    }

    function updateFoodTruck(id, foodTruck) {
        var deferred = q.defer();

        FoodTruckModel.findById(id, function (err, updateFoodTruck) {
        	updateFoodTruck.name = foodTruck.name;
        	updateFoodTruck.userid = foodTruck.userid;
        	updateFoodTruck.cuisine = foodTruck.cuisine;
        	updateFoodTruck.open = foodTruck.open;
        	updateFoodTruck.close = foodTruck.close;
        	updateFoodTruck.menu = foodTruck.menu;
        	updateFoodTruck.place_details = foodTruck.place_details;
        	updateFoodTruck.coffee = foodTruck.coffee;
        	updateFoodTruck.soda = foodTruck.soda;
        	updateFoodTruck.monday = foodTruck.monday;
        	updateFoodTruck.tuesday = foodTruck.tuesday;
        	updateFoodTruck.wednesday = foodTruck.wednesday;
        	updateFoodTruck.thursday = foodTruck.thursday;
        	updateFoodTruck.friday = foodTruck.friday;
        	updateFoodTruck.saturday = foodTruck.saturday;
        	updateFoodTruck.sunday = foodTruck.sunday;
        	updateFoodTruck.description = foodTruck.description;
        	updateFoodTruck.images = foodTruck.images;
        	updateFoodTruck.review_details = foodTruck.review_details;
        	
        	updateFoodTruck.save(function (err, updateFoodTruck) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(updateFoodTruck);
                }
            });
        });
        return deferred.promise;
    }

    function findAllForUser(userid) {
        var deferred = q.defer();

        FoodTruckModel.find({userid: userid}, function (err, foodTrucks) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(foodTrucks);
            }
        });

        return deferred.promise;
    }

    function findFoodTruckById(foodTruckId) {
        var deferred = q.defer();

        FoodTruckModel.findById(foodTruckId, function (err, foodTruck) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(foodTruck);
            }
        });

        return deferred.promise;
    }

    function deleteFoodTruck(foodTruckid, userid) {
        var deferred = q.defer();

        FoodTruckModel.remove({_id: foodTruckid}, function (err, status) {
        	FoodTruckModel.find({userid: userid}, function (err, foodTrucks) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(foodTrucks);
                }
            });
        });

        return deferred.promise;
    }

    function searchFoodTrucks(searchTerm) {
        var deferred = q.defer();

        FoodTruckModel
        .find({$or: [{'name' : searchTerm.toString()}, {'place_details.locality' : searchTerm.toString()}, {'place_details.postal_code': searchTerm.toString()}]},
        		function (err, trucks) {
        			if (err) {
        				deferred.reject(err);
        				} 
        			else {
        				deferred.resolve(trucks);
        				}
        			});
        return deferred.promise;
    }

};