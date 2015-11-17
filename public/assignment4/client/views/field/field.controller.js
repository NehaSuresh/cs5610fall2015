"use strict";

(function() {
    angular
        .module("FormBuilderApp")
        .controller("FieldController", fieldController);

    function fieldController($routeParams, FieldService) {
        var model = this;
        var userId = $routeParams['userId'];
        var formId = $routeParams['formId'];

        FieldService.getFieldsForForm(formId).then(function(fields) {
            model.fields = fields;
        });

        model.addField = function(fieldType) {
            var fieldTemplates = {
                "single": {
                    "id": null,
                    "label": "New Text Field",
                    "type": "TEXT",
                    "placeholder": "New Field"
                },
                "multi": {
                    "id": null,
                    "label": "New Text Field",
                    "type": "TEXTAREA",
                    "placeholder": "New Field"
                },
                "date": {
                    "id": null,
                    "label": "New Date Field",
                    "type": "DATE"
                },
                "dropdown": {
                    "id": null,
                    "label": "New Dropdown",
                    "type": "OPTIONS",
                    "options": [{
                        "label": "Option 1",
                        "value": "OPTION_1"
                    }, {
                        "label": "Option 2",
                        "value": "OPTION_2"
                    }, {
                        "label": "Option 3",
                        "value": "OPTION_3"
                    }]
                },
                "checkbox": {
                    "id": null,
                    "label": "New Checkboxes",
                    "type": "CHECKBOXES",
                    "options": [{
                        "label": "Option A",
                        "value": "OPTION_A"
                    }, {
                        "label": "Option B",
                        "value": "OPTION_B"
                    }, {
                        "label": "Option C",
                        "value": "OPTION_C"
                    }]
                },
                "radiobutton": {
                    "id": null,
                    "label": "New Radio Buttons",
                    "type": "RADIOS",
                    "options": [{
                        "label": "Option X",
                        "value": "OPTION_X"
                    }, {
                        "label": "Option Y",
                        "value": "OPTION_Y"
                    }, {
                        "label": "Option Z",
                        "value": "OPTION_Z"
                    }]
                }
            };

            FieldService.createFieldForForm(formId, fieldTemplates[fieldType])
                .then(function(fields) {
                	model.fields = fields;
                });
        };

        model.removeField = function(field) {
        	FieldService.deleteFieldFromForm(formId, field.id).
        		then(function(fields) {
        			model.fields = fields;
        		});
        };

    }
})();