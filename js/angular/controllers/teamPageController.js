mainApp.controller('teamPageCtrl', function ($scope, $rootScope, $log, $location, $timeout, $window, mainFactory) {
   
    // Properties
    $scope.predicate = ["number | num"];

    // get a firebase service
    $scope.managePlayers = mainFactory.getPlayers;
    $scope.manOffStats = mainFactory.getOffStats;
    $scope.manDefStats = mainFactory.getDefStats;
    $scope.manSPStats = mainFactory.getSPStats;
    $scope.teams = mainFactory.getTeams;

    //Watches

    //Filters
    $scope.teamFilter = function (player) {
        if (player.team == $rootScope.teamId && player.active == true) return true;
        return false;
    };

    //Methods
    $scope.loadTeamPage = function () {
        if ($rootScope.teamId) {
            // Get current selected team info
            angular.forEach($scope.teams, function (division, index) {
                angular.forEach(division.teams, function (team, index) {
                    if (team.id == $rootScope.teamId) {
                        $scope.selectedTeam = team;
                    };
                });
            });

            // Linq to json - retrieve and sum up the stats
            $scope.offStats = Enumerable.From($scope.manOffStats)
                                .Where(function (x) {
                                    var statday = new Date(x.time).getFullYear();
                                    var today = new Date().getFullYear();
                                    return x.team == $rootScope.teamId
                                        && statday == today
                                })
                                .GroupBy("$.num", null,
                                    function (key, g) {
                                        var result = {
                                            num: key,
                                            comp: g.Sum("Number($.comp)"),
                                            pAtt: g.Sum("Number($.pAtt)"),
                                            pYds: g.Sum("Number($.pYds)"),
                                            pTD: g.Sum("Number($.pTD)"),
                                            int: g.Sum("Number($.int)"),

                                            ruAtt: g.Sum("Number($.ruAtt)"),
                                            ruYds: g.Sum("Number($.ruYds)"),
                                            ruTD: g.Sum("Number($.ruTD)"),

                                            rec: g.Sum("Number($.rec)"),
                                            reYds: g.Sum("Number($.reYds)"),
                                            reTD: g.Sum("Number($.reTD)"),

                                            FUM: g.Sum("Number($.FUM)"),
                                            Lost: g.Sum("Number($.Lost)")
                                        }
                                        return result;
                                    })
                                .ToArray();

            $scope.defStats = Enumerable.From($scope.manDefStats)
                                .Where(function (x) {
                                    var statday = new Date(x.time).getFullYear();
                                    var today = new Date().getFullYear();
                                    return x.team == $rootScope.teamId
                                        && statday == today
                                })
                                .GroupBy("$.num", null,
                                    function (key, g) {
                                        var result = {
                                            num: key,
                                            tack: g.Sum("Number($.tack)"),
                                            ast: g.Sum("Number($.ast)"),
                                            sck: g.Sum("Number($.sck)"),
                                            sfty: g.Sum("Number($.sfty)"),
                                            pDef: g.Sum("Number($.pDef)"),
                                            int: g.Sum("Number($.int)"),
                                            inty: g.Sum("Number($.inty)"),
                                            ff: g.Sum("Number($.ff)"),
                                            fr: g.Sum("Number($.fr)"),
                                            stf: g.Sum("Number($.stf)"),
                                            stfy: g.Sum("Number($.stfy)"),
                                            tds: g.Sum("Number($.tds)")
                                        }
                                        return result;
                                    })
                                .ToArray();
        } else {
            $location.path("home");
        }
    };
    
    //Navigation & Modals
    $scope.proveIt = function () {
        $location.path('register');
    };
});
