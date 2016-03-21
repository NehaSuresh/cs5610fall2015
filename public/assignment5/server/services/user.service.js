"use strict";

module.exports = function(app, userModel) {
	
	app.post('/api/assignment/user', function(req, res) {
		res.json(userModel.AddNewUser(req.body));
	});
	
	app.get('/api/assignment/user', function(req, res) {
		var username = req.param('username');
		var password = req.param('password');
		
		if (username == null && password == null) {
			res.json(userModel.FindAllUsers());
		} else if (password == null) {
			res.json(userModel.FindUserByUsername(username));
		} else {
			res.json (userModel.FindUserByCredential({
				username: username,
				password: password
			}));
		}
	});
	
	app.get('/api/assignment/user/:id', function(req, res) {
		res.json(userModel.FindByUserId(req.params.id));
	});
	
	app.put('/api/assignment/user/:id', function(req, res) {
		res.json(userModel.UpdateUser(req.params.id, req.body));
	});
	
	app.delete('/api/assignment/user/:id', function(req, res) {
		res.json(userModel.DeleteUser(req.params.id))
	});
	
};