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
        	var userId = $rootScope.user.id;
        	FormService.findAllFormsForUser(userId).then(getUserForms);
        }


        function addForm(){
            if($scope.newForm.title.length <= 0)
            {
                return;
            }
            FormService.createFormForUser(userId, $scope.newForm).then(callback);
        }

        function selectForm(index){
            var selectedForm = $scope.forms[index];
            $scope.newForm.title = selectedForm.title;
            $scope.selectedForm = selectedForm;
        }

        function updateForm(){
        	
        	if ($scope.selectedForm) {
        		FormService
        			.updateFormById($scope.selectedForm.id, $scope.newForm)
        				.then(callback);
        	}
        }

        function deleteForm(index){  
            FormService.deleteFormById($scope.forms[index].id).then(callback);
        }
        
        function callback(form){
            console.log(form);
            $scope.newForm = {};
            $scope.selectedForm = {};
            FormService.findAllFormsForUser(userId).then(getUserForms);
        }
        
        function getUserForms(forms){
        	$scope.forms = forms;
		}
    }

})();