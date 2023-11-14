mainApp.controller('teamManagerCtrl', function ($scope, $rootScope, $log, $location, $timeout, $window, mainFactory) {
   
    // Properties

    // get a firebase service
    $scope.authObj = mainFactory.getAuth;
    $scope.schedule = mainFactory.getSchedule;
    $scope.managePlayers = mainFactory.getPlayers;
    $scope.manOffStats = mainFactory.getOffStats;
    $scope.manDefStats = mainFactory.getDefStats;
    $scope.manSPStats = mainFactory.getSPStats;

    //Watches
    $scope.authObj.$onAuth(function (authData) {
        $rootScope.authData = authData;
    });

    //Filters
    $scope.playerFilter = function (player) {
        if (player.team == $scope.userData.teamId && player.active == true) return true;
        return false;
    };

    $scope.statFilter = function (stat) {
        var statday = new Date(stat.time).getFullYear();
        var today = new Date().getFullYear();
        if (stat.team == $scope.userData.teamId && stat.week == $scope.selectedItem.id && statday == today) return true;
        return false;
    };

    //Methods
    $scope.loadTeamManager = function () {
        var authData = $scope.authObj.$getAuth();
        if (authData) {
            console.log("Logged in as:", authData.uid);
            $scope.games = [];
            $scope.players = [];
            var userList = mainFactory.getUser;
            var userIdArray = authData.uid.split(":");
            var userId = userIdArray.length > 1 ? userIdArray[1] : userIdArray[0];

            //Change this!
            //$scope.userData = userList.$getRecord(userId);
            angular.forEach(userList, function (value, index) {
                if (value.userId == userId) {
                    $scope.userData = value;
                }
            });

            $scope.getTeamGames($scope.userData.teamId);
            //Load Roster
            $scope.getTeamPlayers($scope.userData.teamId);

            //LoadStats - ng-change
        } else {
            console.log("Logged out");
        }
    };

    $scope.getTeamGames = function (teamId) {
        var title, id, year;
        angular.forEach($scope.schedule, function (value, index) {
            title = value.title;
            id = value.id;
            year = value.year;
            angular.forEach(value.games, function (value, index) {
                if ((value.homeId == teamId || value.awayId == teamId) && year == new Date().getFullYear()) {
                    $scope.games.push({
                        "id": id,
                        "title": title,
                        "year" : year,
                        "homeName": value.homeName,
                        "homeImage": value.homeImage,
                        "awayName": value.awayName,
                        "awayImage": value.awayImage
                    });
                };
            });
        });
    };

    $scope.getTeamPlayers = function (teamId) {
        angular.forEach($scope.managePlayers, function (value, index) {
            if (value.team == teamId && value.active == true) {
                $scope.players.push(value);
            };
        });
    };

    $scope.setIndex = function (index) {
        $scope.tempIndex = index;
    }

    $scope.setPlayer = function (stat, manStat, selectedPlayer) {
        stat.num = selectedPlayer.number;
        stat.name = selectedPlayer.name;
        manStat.$save(stat);
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
            stf: $scope.addDefStatInt ? $scope.addDefStatStf : 0,
            stfy: $scope.addDefStatIntY ? $scope.addDefStatStfY : 0,
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
