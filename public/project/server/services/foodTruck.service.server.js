"use strict";

module.exports = function (app, model) {
    app.post('/api/project/foodTruck/:userid', registerFoodTruck);
    app.put('/api/project/foodTruck/:foodTruckid', updateFoodTruck);
    app.put('/api/project/foodTruck/reviewDetail/:foodTruckid', addReview);
    app.get('/api/project/foodTruck/user/:userid', findAllFoodTrucksForUser);
    app.get('/api/project/foodTruck/:foodTruckid', findFoodTruckByid);
    app.delete('/api/project/foodTruck/:foodTruckid/user/:userid', deleteFoodTruck);
    app.get('/api/project/search', searchFoodTrucks);

    function registerFoodTruck(req, res) {
        var foodTruck = req.body; 
        var userid = req.params.userid;
        console.log(foodTruck)
        model.Register(foodTruck)
            .then(function (newFoodTruck) {
            	console.log(newFoodTruck);
                res.json(newFoodTruck);
            });
    }
    
    function addReview(req, res) {
    	var review = req.body;
    	var foodTruckid = req.params.foodTruckid;
    	model.AddReview(foodTruckid, review)
    		.then(function (updatedFoodTruck) {
    			res.json(updatedFoodTruck);
    		});
    }
    
    function updateFoodTruck(req, res) {
        var foodTruck = req.body;
        var id = req.params.foodTruckid;
        
        model.Update(id, foodTruck)
            .then(function (updatedFoodTruck) {
                res.json(updatedFoodTruck);
            });
    }

    function findAllFoodTrucksForUser(req, res) {
        var userid = req.params.userid;

        model.FindAll(userid)
            .then(function (foodTrucks) {
                res.json(foodTrucks);
            });
    }

    function findFoodTruckByid(req, res){
        var foodTruckid = req.params.foodTruckid;

        model.FindById(foodTruckid)
            .then(function (foodTruck) {
                res.json(foodTruck);
            });
    }

    function deleteFoodTruck(req, res) {
        var foodTruckid = req.params.foodTruckid;
        var userid = req.params.userid;

        model.Delete(foodTruckid, userid)
            .then(function (foodTrucks) {
                res.json(foodTrucks);
            });
    }

    function searchFoodTrucks(req, res) {
        var searchTerm = req.query.searchterm;

        model.SearchFoodTrucks(searchTerm)
        	.then(function (foodTrucks) {
        		res.json(foodTrucks);
        	});3
    }
};