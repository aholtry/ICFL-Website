mainApp.controller('mainCtrl', function ($scope, $rootScope, $log, $location, $timeout, $window, mainFactory) {
   
    //Properties
    $scope.predicate = ["-win","-(pointFor - pointAgainst)"];
    $scope.facebookLink = "https://www.facebook.com/pages/Idaho-Contact-Football-League/114533205256160";
    $scope.standings = [];

    // get a firebase service
    $scope.authObj = mainFactory.getAuth;
    $scope.hallOfFame = mainFactory.getHallOfFame;
    $scope.locations = mainFactory.getLocations;
    $scope.teams = mainFactory.getTeams;
    $scope.events = mainFactory.getEvents;
    $scope.schedule = mainFactory.getSchedule;
    
    $scope.slideTeams = [];
    $scope.allTeams = [];
    var div = { teams: [] };

    //Watches
    $scope.authObj.$onAuth(function (authData) {
        $rootScope.authData = authData;
    });

    //Filters
    $scope.scheduleFilter = function (schedule) {
        if (schedule.year == new Date().getFullYear()) return true;
        return false;
    };

    $scope.standingsFilter = function (team) {
        if (team.active == true) return true;
        return false;
    };

    //Methods
    $scope.teamSelect = function (teamId) {
        $rootScope.teamId = teamId;
        $location.path("teamPage");
    };

    //Pre-Scripts
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

    
    $scope.teams.$loaded(function(){
        $scope.divisionStandings = $scope.teams;
    });

    $scope.schedule.$loaded(function (){
        angular.forEach($scope.schedule, function (week, index) {
            if (week.year == new Date().getFullYear()) {
                angular.forEach(week.games, function (game, index) {
                    if (game.homeId != 0 && game.awayId != 0) {
                        var homeExists = false;
                        var awayExists = false;
                        angular.forEach($scope.standings, function (team, index) {
                            if (game.homeId == team.id) {
                                //add up total scores and records
                                team.pointFor += game.homeScore;
                                team.pointAgainst += game.awayScore;
                                team.win += game.homeScore > game.awayScore ? 1 : 0;
                                team.loss += game.homeScore < game.awayScore ? 1 : 0;
                                homeExists = true;
                            };
                            if (game.awayId == team.id) {
                                //add up total scores and records  
                                team.pointFor += game.awayScore;
                                team.pointAgainst += game.homeScore;
                                team.win += game.homeScore < game.awayScore ? 1 : 0;
                                team.loss += game.homeScore > game.awayScore ? 1 : 0;
                                awayExists = true;
                            };
                        });
                        if (!homeExists) {
                            //add team to standings
                            $scope.standings.push({
                                id: game.homeId,
                                name: game.homeName,
                                image: game.homeImage,
                                pointFor: game.homeScore,
                                pointAgainst: game.awayScore,
                                win: game.homeScore > game.awayScore ? 1 : 0,
                                loss: game.homeScore < game.awayScore ? 1 : 0
                            });
                        };
                        if (!awayExists) {
                            //add team to standings
                            $scope.standings.push({
                                id: game.awayId,
                                name: game.awayName,
                                image: game.awayImage,
                                pointFor: game.awayScore,
                                pointAgainst: game.homeScore,
                                win: game.homeScore < game.awayScore ? 1 : 0,
                                loss: game.homeScore > game.awayScore ? 1 : 0
                            });
                        };
                    };
                });
            }
        });
        //Extra code added back in for divisions once again
        angular.forEach($scope.divisionStandings, function (div, index) {
            angular.forEach(div.teams, function (team, index) {
                angular.forEach($scope.standings, function (standTeam, index) {
                    if (team.id == standTeam.id) {
                        //transfer
                        team.pointFor = standTeam.pointFor;
                        team.pointAgainst = standTeam.pointAgainst;
                        team.win = standTeam.win;
                        team.loss = standTeam.loss;
                    };
                });
            });
        });
    });

    //Navigation & Modals
    $scope.goHome = function () {
        $('#loginModal').modal('hide');
        $timeout(function () { $location.path("#/"); }, 500);
        //$location.path("#/");
    };

    $scope.proveIt = function () {
        $location.path('register');
    };

});
