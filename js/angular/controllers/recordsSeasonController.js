mainApp.controller('recordsSeasonCtrl', function ($scope, $rootScope, $log, $location, $timeout, $window, mainFactory) {

    // get a firebase service
    $scope.teams = mainFactory.getTeams;
    $scope.players = mainFactory.getPlayers;
    $scope.manOffStats = mainFactory.getOffStats;
    $scope.manDefStats = mainFactory.getDefStats;
    $scope.manSPStats = mainFactory.getSPStats;

    //Watches

    //Filters

    //Methods
    $scope.loadIndividualStats = function () {
        // Linq to json - retrieve and sum up the stats
        $scope.offStats = Enumerable.From($scope.manOffStats)
                            .GroupBy("{team: $.team, num: $.num, time: new Date($.time).getFullYear()}", null,
                                function (key, g) {
                                    var result = {
                                        num: key.num,
                                        team: key.team,
                                        time: key.time,
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
                                }, function (x) { return x.num + ':' + x.team + ':' + x.time })
                            .ToArray();

        $scope.defStats = Enumerable.From($scope.manDefStats)
                            .GroupBy("{team: $.team, num: $.num, time: new Date($.time).getFullYear()}", null,
                                function (key, g) {
                                    var result = {
                                        num: key.num,
                                        team: key.team,
                                        time: key.time,
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
                                }, function (x) { return x.num + ':' + x.team + ':' + x.time })
                            .ToArray();
    };

    $scope.qbRating = function (player) {
        var rating = 0;
        // Completions
        var sumComp = (((player.comp / player.pAtt) - .30) * 0.05) * 100;
        if (sumComp < 0) { sumComp = 0 }
        else if (sumComp > 2.375) { sumComp = 2.375 };

        // Yards
        var sumYards = ((player.pYds / player.pAtt) - 3) * 0.25;
        if (sumYards < 0) { sumYards = 0 }
        else if (sumYards > 2.375) { sumYards = 2.375 };

        // Touchdowns
        var sumTD = ((player.pTD / player.pAtt) * 0.2) * 100;
        if (sumTD > 2.375) { sumTD = 2.375 };

        // Interceptions
        var sumInt = 2.375 - ((player.int / player.pAtt) * 0.25) * 100;
        if (sumInt < 0) { sumInt = 0; };

        rating = ((sumComp + sumYards + sumTD + sumInt) / 6) * 100;

        return rating ? Math.round(rating * 100) / 100 : 0;
    };

    $scope.getTeamImage = function (teamId) {
        var retval = "";
        angular.forEach($scope.teams, function (value, index) {
            angular.forEach(value.teams, function (value, index) {
                if (value.id == teamId) {
                    retval = value.image;
                };
            });
        });
        return retval;
    };

    $scope.getPlayerName = function (teamId, num, year) {
        var retval = "";
        var keepGoing = true;
        angular.forEach($scope.players, function (value, index) {
            if (keepGoing) {
                var playerYear = new Date(value.time).getFullYear();
                if (value.team == teamId && value.number == num && (playerYear == year || playerYear <= year)) {
                    retval = value.name;
                    keepGoing = false;
                };
            }
        });
        return retval;
    };

    //Navigation & Modals
    $scope.proveIt = function () {
        $location.path('register');
    };
});
