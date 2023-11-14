mainApp.controller('scheduleCtrl', function ($scope, $rootScope, $log, $location, $timeout, $window, mainFactory) {
   
    // get a firebase service
    $scope.locations = mainFactory.getLocations;
    $scope.events = mainFactory.getEvents;
    $scope.schedule = mainFactory.getSchedule;

    //Watches
    
    // Filters
    $scope.scheduleFilter = function (schedule) {
        if (schedule.year == new Date().getFullYear()) return true;
        return false;
    };

    //Methods
    
    //Navigation & Modals
    $scope.proveIt = function () {
        $location.path('register');
    };
});
