mainApp.controller('seasonAwardsCtrl', function ($scope, $rootScope, $timeout, $log, $location, $timeout, $window, mainFactory) {
   
    // get a firebase service
    $scope.seasonAwards = mainFactory.getSeasonAwards;

    //Watches

    //Filters

    //Methods
    
    //Navigation & Modals
    $scope.proveIt = function () {
        $location.path('register');
    };
});
