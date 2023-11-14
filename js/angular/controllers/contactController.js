mainApp.controller('contactCtrl', function ($scope, $rootScope, $timeout, $log, $location, $timeout, $window, mainFactory) {
   
    // get a firebase service
    //$scope.emailTo = "aholtry@gmail.com";
    $scope.emailTo = "icflboise@gmail.com";
    $scope.locations = mainFactory.getLocations;

    //Watches

    //Filters

    //Methods
    // Emails / Alerts
    $scope.sendTheMail = function () {
        // create a new instance of the Mandrill class with your API key
        var m = new mandrill.Mandrill('1Gr7iX48dGRqN9_iRjY_ZA');

        // create a variable for the API call parameters
        var params = {
            "message": {
                "from_email": $scope.emailFrom,
                "to": [{ "email": $scope.emailTo }],
                "subject": "Email from: " + $scope.emailName,
                "text": $scope.emailText
            }
        };

        // Send the email!
        m.messages.send(params, function (res) {
            $scope.successAlert("Your message has been sent.\n You will hear from us shortly.");
            //$log.log(res);
        }, function (err) {
            $log.warn(err);
        });

    };

    // Alerts
    $scope.successAlert = function (message) {
        swal({
            title: "Thank You!",
            text: message,
            type: "success"
        },
        function () {
            $location.path('home');
        });
    }
    
    //Navigation & Modals
    $scope.proveIt = function () {
        $location.path('register');
    };
});
