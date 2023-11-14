mainApp.controller('siteManagerCtrl', function ($scope, $rootScope, $log, $location, $timeout, $window, mainFactory, moment) {
   
    // Properties
    $scope.recordType = "game";
    $scope.freeAgentFilter = {team:0};
    $scope.nonActiveFilter = { active: false };
    $scope.agentFilter = $scope.freeAgentFilter;

    // get a firebase service
    $scope.authObj = mainFactory.getAuth;
    $scope.schedule = mainFactory.getSchedule;
    $scope.managePlayers = mainFactory.getPlayers;

    $scope.manOffStats = mainFactory.getOffStats;
    $scope.manDefStats = mainFactory.getDefStats;
    $scope.manSPStats = mainFactory.getSPStats;

    $scope.manOffStatsHistory = mainFactory.getHistoryOffStats;
    $scope.manDefStatsHistory = mainFactory.getHistoryDefStats;
    $scope.manSPStatsHistory = mainFactory.getHistorySPStats

    $scope.teams = mainFactory.getTeams;
    $scope.users = mainFactory.getUser;
    $scope.allTeams = [];

    //Pre-Scripts
    $scope.teams.$loaded(function () {
        angular.forEach($scope.teams, function (value, index) {
            angular.forEach(value.teams, function (value, index) {
                //capture all teams
                $scope.allTeams.push(value);
            });
        });
        $scope.allTeams.push({
            descr: "Free Agents",
            id: "0",
            image: "img/teams/wildcats.png",
            loss: 0,
            name: "Free Agents",
            pointAgainst: 0,
            pointFor: 0,
            win: 0
        });
    });

    //Watches
    $scope.authObj.$onAuth(function (authData) {
        $rootScope.authData = authData;
    });

    $scope.setUserTeam = function (user, team) {
        if (team) {
            user.team = team.name;
            user.image = team.image;
            user.teamId = parseInt(team.id);
        }
    }

    $scope.setHomeTeam = function (game, homeTeam) {
        if (homeTeam) {
            game.homeName = homeTeam.name;
            game.homeImage = homeTeam.image;
            game.homeId = parseInt(homeTeam.id);
        }
    }

    $scope.setAwayTeam = function (game, awayTeam) {
        if (awayTeam) {
            game.awayName = awayTeam.name;
            game.awayImage = awayTeam.image;
            game.awayId = parseInt(awayTeam.id);
        }
    }

    //Filters
    $scope.scheduleFilter = function (schedule) {
        if (schedule.year == new Date().getFullYear()) return true;
        return false;
    };

    $scope.weekFilter = function (week) {
        if ($scope.selectedItem) {
            if (week.id == $scope.selectedItem.id) return true;
            return false;
        };
    };

    $scope.playerFilter = function (player) {
        if (player.team == $scope.userData.teamId && player.active == true) return true;
        return false;
    };

    $scope.statFilter = function (stat) {
        if ($scope.selectedItem) {
            if (stat.team == $scope.userData.teamId && stat.week == $scope.selectedItem.id) return true;
        }
        return false;
    };

    //Methods
    $scope.loadSiteManager = function () {
        var authData = $scope.authObj.$getAuth();
        if (authData) {
            console.log("Logged in as:", authData.uid);
            $scope.games = [];
            var userList = mainFactory.getUser;
            var userIdArray = authData.uid.split(":");
            var userId = userIdArray.length > 1 ? userIdArray[1] : userIdArray[0];

            //Change this!
            //$scope.userData = userList.$getRecord(userId);
            angular.forEach(userList, function (value, index) {
                if (value.userId === parseInt(userId)) {
                    $scope.userData = value;
                }
            });

            $scope.getTeamGames($scope.userData.teamId);
            //Load Roster

            //LoadStats - ng-change
        } else {
            console.log("Logged out");
        }
    };

    $scope.setTeam = function () {
        $scope.userData.teamId = parseInt($scope.selectedTeam.id);
        $scope.userData.team = $scope.selectedTeam.name;
        $scope.userData.image = $scope.selectedTeam.image;
        $scope.games = [];
        $scope.getTeamGames($scope.userData.teamId);
    };

    $scope.getTeamGames = function (teamId) {
        var title, id;
        angular.forEach($scope.schedule, function (value, index) {
            title = value.title;
            id = value.id;
            angular.forEach(value.games, function (value, index) {
                if (value.homeId == teamId || value.awayId == teamId) {
                    $scope.games.push({
                        "id": id,
                        "title": title,
                        "homeName": value.homeName,
                        "homeImage": value.homeImage,
                        "awayName": value.awayName,
                        "awayImage": value.awayImage
                    });
                };
            });
        });
    };

    $scope.setIndex = function (index) {
        $scope.tempIndex = index;
    }

    $scope.addGame = function (week) {
        week.games.push({
            awayId: 0,
            awayImage: "img/teams/3.png",
            awayName: "TBD",
            awayScore: 0,
            homeId: 0,
            homeImage: "img/teams/3.png",
            homeName: "TBD",
            homeScore: 0,
            location: "TBD",
            time: "TBD"
        });
    }

    $scope.addWeek = function () {
        $scope.schedule.$add({
            games: [{
                awayId: 0,
                awayImage: "img/teams/3.png",
                awayName: "TBD",
                awayScore: 0,
                homeId: 0,
                homeImage: "img/teams/3.png",
                homeName: "TBD",
                homeScore: 0,
                location: "TBD",
                time: "TBD"
            }],
            id: "0",
            title: "Empty",
            year: new Date().getFullYear()
        });
    }

    $scope.addUser = function () {
        $scope.users.$add({
            active: true,
            image: "",
            email: "",
            name: "",
            team: "",
            teamId: 0,
            useriD: ""
        });
    }

    $scope.addPlayer = function () {
        $scope.managePlayers.$add({
            team: $scope.userData.teamId,
            number: $scope.addPlayerNumber ? $scope.addPlayerNumber : " ",
            pos: $scope.addPlayerPos ? $scope.addPlayerPos : " ",
            name: $scope.addPlayerName ? $scope.addPlayerName : " ",
            height: $scope.addPlayerHeight ? $scope.addPlayerHeight : " ",
            weight: $scope.addPlayerWeight ? $scope.addPlayerWeight : " ",
            email: $scope.addPlayerEmail ? $scope.addPlayerEmail : " ",
            phone: $scope.addPlayerPhone ? $scope.addPlayerPhone : " ",
            high: $scope.addPlayerHigh ? $scope.addPlayerHigh : " ",
            hsExp: $scope.addPlayerHSExp ? $scope.addPlayerHSExp : " ",
            college: $scope.addPlayerCollege ? $scope.addPlayerCollege : " ",
            coExp: $scope.addPlayerCoExp ? $scope.addPlayerCoExp : " ",
            active: true,
            time: new Date().toJSON()
        });
    };

    $scope.deletePlayer = function (player) {
        swal({
            title: "Are you sure?",
            text: "Would you rather release the player as a free agent or continue to remove the player permanently?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete player!",
            closeOnConfirm: false
        },
        function () {
            swal("Deleted", "Your player has been removed.", "success");
            player.active = false;
            $scope.managePlayers.$save(player);
            //$scope.managePlayers.$remove(player);
            //$scope.$apply();
        });
    }

    $scope.releasePlayer = function (player) {
        swal({
            title: "Are you sure?",
            text: "Your player will be released to the Free Agents list",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, release player!",
            closeOnConfirm: false
        },
        function () {
            swal("Released", "Your player is now a free agent.", "success");
            player.team = 0;
            $scope.managePlayers.$save(player);
            //$scope.$apply();
        });
    }

    $scope.addOffStatsHistory = function () {
        $scope.manOffStatsHistory.$add({
            team: $scope.addOffStatTeamHistory ? $scope.addOffStatTeamHistory : 0,
            week: 0,
            playerName: $scope.addOffStatNameHistory ? $scope.addOffStatNameHistory : 0,
            num: $scope.addOffStatNumHistory ? $scope.addOffStatNumHistory : 0,
            comp: $scope.addOffStatCompHistory ? $scope.addOffStatCompHistory : 0,
            pAtt: $scope.addOffStatPAttHistory ? $scope.addOffStatPAttHistory : 0,
            pYds: $scope.addOffStatPYdsHistory ? $scope.addOffStatPYdsHistory : 0,
            pTD: $scope.addOffStatPTDHistory ? $scope.addOffStatPTDHistory : 0,
            int: $scope.addOffStatIntHistory ? $scope.addOffStatIntHistory : 0,
            ruAtt: $scope.addOffStatRuAttHistory ? $scope.addOffStatRuAttHistory : 0,
            ruYds: $scope.addOffStatRuYdsHistory ? $scope.addOffStatRuYdsHistory : 0,
            ruTD: $scope.addOffStatRuTDHistory ? $scope.addOffStatRuTDHistory : 0,
            rec: $scope.addOffStatRecHistory ? $scope.addOffStatRecHistory : 0,
            reYds: $scope.addOffStatReYdsHistory ? $scope.addOffStatReYdsHistory : 0,
            reTD: $scope.addOffStatReTDHistory ? $scope.addOffStatReTDHistory : 0,
            FUM: $scope.addOffStatFUMHistory ? $scope.addOffStatFUMHistory : 0,
            Lost: $scope.addOffStatLostHistory ? $scope.addOffStatLostHistory : 0,
            fgAtt: $scope.addOffStatFgAttHistory ? $scope.addOffStatFgAttHistory : 0,
            fg: $scope.addOffStatFgHistory ? $scope.addOffStatFgHistory : 0,
            time: $scope.addOffStatTimeHistory ? $scope.addOffStatTimeHistory : 0,
            type: $scope.recordType
        });
    }

    $scope.addDefStatsHistory = function () {
        $scope.manDefStatsHistory.$add({
            team: $scope.addDefStatTeamHistory ? $scope.addDefStatTeamHistory : 0,
            week: 0,
            playerName: $scope.addDefStatNameHistory ? $scope.addDefStatNameHistory : 0,
            num: $scope.addDefStatNumHistory ? $scope.addDefStatNumHistory : 0,
            tack: $scope.addDefStatTackHistory ? $scope.addDefStatTackHistory : 0,
            ast: $scope.addDefStatAstHistory ? $scope.addDefStatAstHistory : 0,
            sck: $scope.addDefStatSckHistory ? $scope.addDefStatSckHistory : 0,
            sfty: $scope.addDefStatSftyHistory ? $scope.addDefStatSftyHistory : 0,
            pDef: $scope.addDefStatPDefHistory ? $scope.addDefStatPDefHistory : 0,
            int: $scope.addDefStatIntHistory ? $scope.addDefStatIntHistory : 0,
            inty: $scope.addDefStatIntYHistory ? $scope.addDefStatIntYHistory : 0,
            ff: $scope.addDefStatFfHistory ? $scope.addDefStatFfHistory : 0,
            fr: $scope.addDefStatFrHistory ? $scope.addDefStatFrHistory : 0,
            stf: $scope.addDefStatStfHistory ? $scope.addDefStatStfHistory : 0,
            stfy: $scope.addDefStatStfYHistory ? $scope.addDefStatStfYHistory : 0,
            tds: $scope.addDefStatTdsHistory ? $scope.addDefStatTdsHistory : 0,
            time: $scope.addDefStatTimeHistory ? $scope.addDefStatTimeHistory : 0,
            type: $scope.recordType
        });
    }

    $scope.addSPStatsHistory = function () {
        $scope.manSPStatsHistory.$add({
            team: $scope.addSPStatTeamHistory ? $scope.addSPStatTeamHistory : 0,
            week: 0,
            playerName: $scope.addSPStatNameHistory ? $scope.addSPStatNameHistory : 0,
            num: $scope.addSPStatNumHistory ? $scope.addSPStatNumHistory : 0,
            fga: $scope.addSPStatFgaHistory ? $scope.addSPStatFgaHistory : 0,
            fgm: $scope.addSPStatFgmHistory ? $scope.addSPStatFgmHistory : 0,
            xpa: $scope.addSPStatXpaHistory ? $scope.addSPStatXpaHistory : 0,
            xpm: $scope.addSPStatXpmHistory ? $scope.addSPStatXpmHistory : 0,
            twopt: $scope.addSPStatTwoPtHistory ? $scope.addSPStatTwoPtHistory : 0,
            pnt: $scope.addSPStatPntHistory ? $scope.addSPStatPntHistory : 0,
            pnty: $scope.addSPStatPntYHistory ? $scope.addSPStatPntYHistory : 0,
            pr: $scope.addSPStatPrHistory ? $scope.addSPStatPrHistory : 0,
            pry: $scope.addSPStatPrYHistory ? $scope.addSPStatPrYHistory : 0,
            kr: $scope.addSPStatKrHistory ? $scope.addSPStatKrHistory : 0,
            kry: $scope.addSPStatKrYHistory ? $scope.addSPStatKrYHistory : 0,
            time: $scope.addSPStatTimeHistory ? $scope.addSPStatTimeHistory : 0,
            type: $scope.recordType
        });
    }

    // Here is a very cool seperator

    $scope.addOffStats = function () {
        $scope.manOffStats.$add({
            team: $scope.userData.teamId,
            week: $scope.selectedItem.id,
            num: $scope.addOffStatNum ? $scope.addOffStatNum : 0,
            comp: $scope.addOffStatComp ? $scope.addOffStatComp : 0,
            pAtt: $scope.addOffStatPAtt ? $scope.addOffStatPAtt : 0,
            pYds: $scope.addOffStatPYds ? $scope.addOffStatPYds : 0,
            pTD: $scope.addOffStatPTD ? $scope.addOffStatPTD : 0,
            int: $scope.addOffStatInt ? $scope.addOffStatInt : 0,
            ruAtt: $scope.addOffStatRuAtt ? $scope.addOffStatRuAtt : 0,
            ruYds: $scope.addOffStatRuYds ? $scope.addOffStatRuYds : 0,
            ruTD: $scope.addOffStatRuTD ? $scope.addOffStatRuTD : 0,
            rec: $scope.addOffStatRec ? $scope.addOffStatRec : 0,
            reYds: $scope.addOffStatReYds ? $scope.addOffStatReYds : 0,
            reTD: $scope.addOffStatReTD ? $scope.addOffStatReTD : 0,
            FUM: $scope.addOffStatFUM ? $scope.addOffStatFUM : 0,
            Lost: $scope.addOffStatLost ? $scope.addOffStatLost : 0,
            fgAtt: $scope.addOffStatFgAtt ? $scope.addOffStatFgAtt : 0,
            fg: $scope.addOffStatFg ? $scope.addOffStatFg : 0,
            time: new Date().toJSON()
        });
    }

    $scope.addDefStats = function () {
        $scope.manDefStats.$add({
            team: $scope.userData.teamId,
            week: $scope.selectedItem.id,
            num: $scope.addDefStatNum ? $scope.addDefStatNum : 0,
            tack: $scope.addDefStatTack ? $scope.addDefStatTack : 0,
            ast: $scope.addDefStatAst ? $scope.addDefStatAst : 0,
            sck: $scope.addDefStatSck ? $scope.addDefStatSck : 0,
            sfty: $scope.addDefStatSfty ? $scope.addDefStatSfty : 0,
            pDef: $scope.addDefStatPDef ? $scope.addDefStatPDef : 0,
            int: $scope.addDefStatInt ? $scope.addDefStatInt : 0,
            inty: $scope.addDefStatIntY ? $scope.addDefStatIntY : 0,
            ff: $scope.addDefStatFf ? $scope.addDefStatFf : 0,
            fr: $scope.addDefStatFr ? $scope.addDefStatFr : 0,
            stf: $scope.addDefStatStf ? $scope.addDefStatStf : 0,
            stfy: $scope.addDefStatStfY ? $scope.addDefStatStfY : 0,
            tds: $scope.addDefStatTds ? $scope.addDefStatTds : 0,
            time: new Date().toJSON()
        });
    }

    $scope.addSPStats = function () {
        $scope.manSPStats.$add({
            team: $scope.userData.teamId,
            week: $scope.selectedItem.id,
            num: $scope.addSPStatNum ? $scope.addSPStatNum : 0,
            fga: $scope.addSPStatFga ? $scope.addSPStatFga : 0,
            fgm: $scope.addSPStatFgm ? $scope.addSPStatFgm : 0,
            xpa: $scope.addSPStatXpa ? $scope.addSPStatXpa : 0,
            xpm: $scope.addSPStatXpm ? $scope.addSPStatXpm : 0,
            twopt: $scope.addSPStatTwoPt ? $scope.addSPStatTwoPt : 0,
            pnt: $scope.addSPStatPnt ? $scope.addSPStatPnt : 0,
            pnty: $scope.addSPStatPntY ? $scope.addSPStatPntY : 0,
            pr: $scope.addSPStatPr ? $scope.addSPStatPr : 0,
            pry: $scope.addSPStatPrY ? $scope.addSPStatPrY : 0,
            kr: $scope.addSPStatKr ? $scope.addSPStatKr : 0,
            kry: $scope.addSPStatKrY ? $scope.addSPStatKrY : 0,
            time: new Date().toJSON()
        });
    }

    $scope.updateTime = function () {
        angular.forEach($scope.managePlayers, function (value, key) {
            if (value.time == null || value.time == undefined)
            {
                value.time = moment().format();
                $scope.managePlayers.$save(value);
            }
        });

        //angular.forEach($scope.manOffStats, function (value, key) {
        //    value.time = moment().format();
        //    $scope.manOffStats.$save(value);
        //});

        //angular.forEach($scope.manDefStats, function (value, key) {
        //    value.time = moment().format();
        //    $scope.manDefStats.$save(value);
        //});

        //angular.forEach($scope.manSPStats, function (value, key) {
        //    value.time = moment().format();
        //    $scope.manSPStats.$save(value);
        //});
    }

    $scope.managerChangePassword = function () {
        $scope.authObj.$changePassword({
            email: $scope.email,
            oldPassword: $scope.password,
            newPassword: $scope.newPassword
        }).then(function () {
            $('#passwordModal').modal('hide');
            $scope.modalError = false;
            // Sweet Alert
            swal({
                title: "Success!",
                text: "Your password has been changed",
                type: "success"
            });
            console.log("Password changed successfully!");
        }).catch(function (error) {
            //Error Password Not Changed
            $scope.modalError = error;
            console.error("Error: ", error);
        });
    };

    //Navigation & Modals
    $scope.goHome = function () {
        $('#loginModal').modal('hide');
        $timeout(function () { $location.path("#/"); }, 500);
        //$location.path("#/");
    };

    $scope.proveIt = function () {
        $location.path('register');
    };

    $scope.popPasswordModal = function () {
        $('#passwordModal').modal('show');
    };
});
