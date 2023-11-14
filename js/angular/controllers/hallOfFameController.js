mainApp.controller('hallOfFameCtrl', function ($scope, $rootScope, $timeout, $log, $location, $timeout, $window, mainFactory) {
   
    // get a firebase service
    $scope.hallOfFame = mainFactory.getHallOfFame;

    //Watches

    //Filters

    //Methods
    
    //Navigation & Modals
    $scope.proveIt = function () {
        $location.path('register');
    };
});
