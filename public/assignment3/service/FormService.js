"use strict";

(function(){

    angular
        .module("FormBuilderApp")
        .factory("FormService",FormService);

    function FormService(){

        var forms = [];
				
				var service = {
						createFormForUser: createFormForUser,
						findAllFormsForUser: findAllFormsForUser,
						deleteFormById: deleteFormById,
						updateFormById: updateFormById
				};
				return service;
				
				function createFormForUser(userId, form, callback) {
					var guid = getNewGuid();
					form.formId = guid;
					form.userId = userId;
					forms.push(form);
					return callback(form);
				}
				
				function findAllFormsForUser(userId, callback) {
					var userForms = [];
					for(var i=0; i<forms.length; i++) {
						if(forms[i].userId == userId) {
							userForms.push(forms[i]);
						}
					}
					return callback(userForms);
				}
				
				function deleteFormById(formId, callback) {
					for(var i=0; i<forms.length; i++) {
						if(forms[i].formId == formId) {
							var form = form[i];
							forms.splice(i, 1);
							return callback(form);
						}
					}
					return callback(null);
				}
				
				function updateFormById(formId, newForm, callback) {
					for(var i=0; i<forms.length; i++) {
						if(forms[i].formId == formId) {
							forms[i].name = newForm.name;
							return callback(forms[i]);
						}
					}
				}

       function getNewGuid() {
	            return Math.floor((1 + Math.random()) * 0x10000)
	              .toString(16)
	              .substring(1);
	        }
    }
})();