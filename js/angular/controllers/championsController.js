mainApp.controller('championsCtrl', function ($scope, $rootScope, $timeout, $log, $location, $timeout, $window, mainFactory) {
   
    // get a firebase service
    $scope.champions = mainFactory.getChampions;

    //Watches

    //Filters

    //Methods
    
    //Navigation & Modals
    $scope.proveIt = function () {
        $location.path('register');
    };
});
