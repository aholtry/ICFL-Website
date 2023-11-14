mainApp.controller('teamsCtrl', function ($scope, $rootScope, $log, $location, $timeout, $window, mainFactory) {
   
    // Properties
    $scope.loginFocus = false;
    $scope.resetFocus = false;
    $scope.siteAccess = false;

    // get a firebase service
    $scope.teams = mainFactory.getTeams;
    $scope.authObj = mainFactory.getAuth;
    $scope.slideTeams = [];
    $scope.allTeams = [];
    var div = { teams: [] };

    //Watches
    $scope.authObj.$onAuth(function (authData) {
        $rootScope.authData = authData;
    });

    $scope.teams.$loaded(function () {
        // Special Code to sort Teams with Divisions
        angular.forEach($scope.teams, function (value, index) {
            //var div = {teams:[]};
            var divIndex = index;
            $scope.teamLength = value.teams.length;
            angular.forEach(value.teams, function (value, index) {
                if (div.teams.length % 4 == 0 && div.teams.length != 0) {
                    $scope.slideTeams.push(div);
                    div = { teams: [] };
                }
                if (value.active == true) {
                    div.teams.push(value);
                    //capture all teams
                    $scope.allTeams.push(value);
                }
                if (index == $scope.teamLength - 1 && divIndex == $scope.teams.length - 1) {
                    var innerRemainder = 4 - div.teams.length;
                    if (innerRemainder != 0) {
                        for (i = 0; i < innerRemainder; i++) {
                            div.teams.push({
                                image: 'img/teams/3.png',
                                name: 'Your Team Here',
                                descr: 'Want to start a new team? We are here to help.'
                            });
                        }
                    }
                    $scope.slideTeams.push(div);
                }
            });
        });
    });

    // Filters

    //Methods
    $scope.popManagerModal = function () {
        
        var authData = $scope.authObj.$getAuth();
        if (authData) {
            $location.path("teamManager");
        } else {
            $('#loginModal').modal('show');
            $scope.loginFocus = true;
        };
    };

    $scope.popResetModal = function () {
        $('#loginModal').modal('hide');
        $('#resetModal').modal('show');
        $scope.resetFocus = true;
    };

    $scope.teamSelect = function (teamId) {
        $rootScope.teamId = teamId;
        $location.path("teamPage");
    };

    $scope.managerSubmitLogin = function (siteAccess) {
        var location = "teamManager";
        if (siteAccess) {
            if ($scope.magicWord == "ProveIt") { location = "siteManager"; }
            else {
                $scope.modalError = "Incorrect Site Password";
                return;
            };
        }
        $scope.authObj.$authWithPassword({
            email: $scope.email,
            password: $scope.password
        }).then(function (authData) {
            $('#loginModal').modal('hide');
            $scope.modalError = false;
            console.log("Logged in as:", authData.uid);
            $timeout(function () { $location.path(location); }, 500);
        }).catch(function (error) {
            $scope.modalError = error;
            console.error("Authentication failed:", error);
        });
    };

    $scope.toggleSiteAccess = function () {
        $scope.siteAccess = !$scope.siteAccess;
    }

    $scope.sendPasswordReset = function (email) {
        $scope.authObj.$resetPassword({
            email: email
        }).then(function (data) {
                console.log("Password reset email sent successfully");
                swal("New Password Sent", "You will recieve a temporary password shortly", "success");
                $('#resetModal').modal('hide');
        }).catch(function (error) {
                console.log("Error sending password reset email:", error);
                swal({
                    title: "Error, a user with that email does not exist",
                    text: "Error sending password reset email",
                    type: "warning",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Oops, Ok",
                    closeOnConfirm: true
                });
        });
    };
    
    //Navigation & Modals
    $scope.proveIt = function () {
        $location.path('register');
    };
});
