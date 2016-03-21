"use strict";

(function () {
    angular
        .module("FoodTruck")
        .controller("LoginController", LoginController);

    function LoginController($scope, $location, $rootScope, UserService) {
        $scope.$location = $location;
        $scope.login = login;
        $scope.loginerror = false;

        function login(user) {
            $scope.loginerror = false;
            var userName = $scope.user.username;
            var password = $scope.user.password;

            if (!userName || !password) {
                $scope.loginErrorMessage = "Please enter your username and password";
                $scope.loginerror = true;
            }

            if ($scope.loginerror == false) {
                UserService.Login(user).then(function (user) {
                    if (user) {
                        $scope.user = user;
                        $rootScope.currentUser = user;
                        $location.url("/home");
                    } else {
                        $scope.loginerror = true;
                        $scope.loginErrorMessage = "Username and passwor do not match. Please try again."
                    }
                });
            }
        }
    }
})();