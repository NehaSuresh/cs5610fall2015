"use strict";

module.exports = function(app) {
	var forms = require('./form.mock.json');
	
	var api = {
			FindAllForms : FindAllForms,
			FindFormById : FindFormById,
			AddForm : AddForm,
			UpdateForm : UpdateForm,
			DeleteForm : DeleteForm,
			FindFormByTitle : FindFormByTitle,
			FindFormsByUserId : FindFormsByUserId,
			FindFieldById : FindFieldById,
			RemoveField : RemoveField,
			AddField : AddField,
			UpdateField : UpdateField
	};
	
	return api;
	
	function FindAllForms() {
		return forms;
	}
	
	function FindFormById(formId) {
		for (var i = 0; i < forms.length; i++) {
			if (forms[i].id == formId) {
				return forms[i];
			}
		}
		return null;
	}
	
	function AddForm(form) {
		form.id = guid();
		forms.push(form);
		return forms;
	}
	
	function UpdateForm(id, newForm) {
		for (var i = 0; i < forms.length; i++) {
			if (forms[i].id == id) {
				forms[i].title = newForm.title;
				break;
			}
		}
		return forms;
	}
	
	function DeleteForm(id) {
		for (var i = 0; i < forms.length; i++) {
			if (forms[i].id == id) {
				forms.splice(i, 1);
				break;
			}
		}
		return forms;
	}
	
	function FindFormByTitle(title) {
		for (var i = 0; i < forms.length; i++) {
			if (forms[i].title == title) {
				return forms[i];
			}
		}
		return null;
	}
	
	function FindFormsByUserId(userId) {
		var userForms = [];
		for (var i = 0; i < forms.length; i++) {
			if (forms[i].userId == userId) {
				userForms.push(forms[i]);
			}
		}
		return userForms;
	}
	
	function FindFieldById(formId, fieldId) {
		var form = FindFormById(formId);
		for (var i = 0; i < form.fields.length; i++) {
			if (form.fields[i].fieldId == filedId) {
				return form.fields[i];
			}
		}
		return null;
	}
	
	function RemoveField(formId, fieldId) {
		var form = FindFormById(formId);
		for (var i = 0; i < form.fields.length; i++) {
			if (form.fields[i].fieldId == filedId) {
				form.fields.splice(i ,1);
				break;
			}
		}
		return form.fields;
	}
	
	function AddField(formId, newField) {
		var form = FindFormById(formId);
		newField.id = guid();
		form.fields.push(newField);
		return form.fields;
	}
	
	function UpdateField(formId, fieldId, newField) {
		var form = FindFormById(formId);
		for (var i = 0; i < form.fields.length; i++) {
			if (form.fields[i].fieldId == filedId) {
				newField.fieldId = fieldId;
				form.fields[i] = newField;
				break;
			}
		}
	}
	
	function guid() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
    }
};