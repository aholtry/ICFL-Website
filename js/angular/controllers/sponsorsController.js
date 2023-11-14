mainApp.controller('sponsorsCtrl', function ($scope, $rootScope, $timeout, $log, $location, $timeout, $window, mainFactory) {
   
    // get a firebase service
    $scope.sponsors = mainFactory.getSponsors;

    //Watches

    //Filters

    //Methods
    
    //Navigation & Modals
    $scope.proveIt = function () {
        $location.path('register');
    };
});
