mainApp.controller('allStarsCtrl', function ($scope, $rootScope, $timeout, $log, $location, $timeout, $window, mainFactory) {
   
    // get a firebase service
    $scope.allstars = mainFactory.getAllstars;

    //Watches

    //Filters

    //Methods
    
    //Navigation & Modals
    $scope.proveIt = function () {
        $location.path('register');
    };
});
