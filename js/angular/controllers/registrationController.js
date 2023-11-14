mainApp.controller('registrationCtrl', function ($scope, $rootScope, $log, $location, $timeout, $window, mainFactory) {
   
    // Properties
    //$scope.emailTo = "aholtry@gmail.com";
    //$scope.emailTo = "icflboise@gmail.com";
    var userList = mainFactory.getUser;
    var userEmails = [];

    //All team managers emails
    angular.forEach(userList, function (value, index) {
        if (value.active === true) {
            userEmails.push({
                "email": value.email,
                "name": value.name,
                "type": "to"
            })
        }
    });

    // get a firebase service

    //Watches

    //Filters

    //Methods
    $scope.sendPlayerMail = function () {
        // create a new instance of the Mandrill class with your API key
        var m = new mandrill.Mandrill('1Gr7iX48dGRqN9_iRjY_ZA');

        // create a variable for the API call parameters
        var params = {
            "message": {
                "from_email": $scope.playerEmail,
                "to": userEmails,
                "subject": "Email from: " + $scope.playerName,
                "html": "<div>This player wishes to join the ICFL<br/>\
                             Player Name: " + $scope.playerName + "<br/>\
                             Email: " + $scope.playerEmail + "<br/>\
                             Phone: " + $scope.playerPhone + "<br/>\
                             Position: " + $scope.playerPosition + "<br/>\
                             Height: " + $scope.playerHeight + "<br/>\
                             Weight: " + $scope.playerWeight + "<br/>\
                             High School: " + $scope.playerHigh + " " + $scope.playerHighExp + "<br/>\
                             College: " + $scope.playerCollege + " " + $scope.playerCollegeExp + "<br/>\
                        </div>",
                "autotext": true,
                "track_opens": true
            }
        };

        // Send the email!
        m.messages.send(params, function (res) {
            $scope.successAlert("Your registration has been sent.\n You will hear from us shortly.");
            //$log.log(res);
        }, function (err) {
            $log.warn(err);
        });
    };
    
    $scope.successAlert = function (message) {
        swal({
            title: "Thank You!",
            text: message,
            type: "success"
        },
        function () {
            window.location.replace("index.html");
        });
    }

    //Navigation & Modals
    $scope.proveIt = function () {
        $location.path('register');
    };
});
