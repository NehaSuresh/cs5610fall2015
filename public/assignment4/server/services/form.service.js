"use strict";

module.exports = function (app, formModel) {
	
	app.get('/api/assignment/user/:userId/form', function(req, res) {
		res.json(formModel.FindFormsByUserId(req.params.userId));
	});
	
	app.get('/api/assignment/form/:formId', function(req, res) {
		res.json(formModel.FindFormById(req.params.formId));
	});
	
	app.delete('/api/assignment/form/:formId', function(req, res){
		res.json(formModel.DeleteForm(req.params.formId));
	});
	
	app.post('/api/assignment/user/:userId/form', function(req, res) {
		var newForm = req.body;
		newForm.userId = Number(req.params.userId);
		res.json(formModel.AddForm(newForm));
	});
	
	app.put('/api/assignment/form/:formId', function(req, res) {
		res.json(formModel.UpdateForm(req.params.formId, req.body));
	});
};