"use strict";

(function () {
    angular
        .module("FoodTruck")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $location, $rootScope, UserService) {
        $scope.$location = $location;
        $scope.update = update;
        $scope.updated = false;
        var doUpdate = true;
        $scope.noUpdate = false;
        $scope.passworderror = false;
        $scope.user = $rootScope.currentUser;

        function update(user) {
        	user.favorite = $rootScope.currentUser.favorite;
            UserService.Update($scope.user._id, user).then(function (updatedUser) {
                $rootScope.currentUser = updatedUser;
                $scope.updated = true;
            });
        }
    }
})();