"use strict";

(function () {
    angular
        .module("FoodTruck")
        .controller("FooterController", FooterController);

    function FooterController($scope, $location) {
        $scope.$location = $location;
    }
})();