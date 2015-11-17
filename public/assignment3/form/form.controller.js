"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController",FormController);


    function FormController($scope, $location, $rootScope, FormService){
        $scope.$location = $location;
        $scope.newForm = {};
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;
        
        var userId;
        if ($rootScope.user != undefined) {
        	var userId = $rootScope.user.userId;
        	FormService.findAllFormsForUser(userId, getUserForms);
        }

        function addForm(){
            if($scope.newForm.name.length <= 0)
            {
                return;
            }
            FormService.createFormForUser(userId, $scope.newForm, callback);
        }

        function selectForm(index){
            var selectedForm = $scope.forms[index];
            $scope.newForm.name = selectedForm.name;
            $scope.selectedForm = selectedForm;
        }

        function updateForm(){
        	
        	if ($scope.selectedForm) {
        		FormService.updateFormById($scope.selectedForm.formId, $scope.newForm, callback)
        	}
        }

        function deleteForm(index){  
            FormService.deleteFormById($scope.forms[index].formId, callback);
        }
        
        function callback(form){
            console.log(form);
            FormService.findAllFormsForUser(userId, getUserForms);
        }
        
        function getUserForms(forms){
        	$scope.forms = forms;
		}

    }

})();