"use strict";

(function () {
    angular
        .module("FoodTruck")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location, $rootScope, UserService) {
        $scope.$location = $location;
        $scope.logout = logout;

        function logout() {
            UserService.Logout().then(function() {
                $rootScope.currentUser = null;
                $location.url("/home");
            });
        }
    }
})();