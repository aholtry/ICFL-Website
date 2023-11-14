var mainApp = angular.module('mainApp', ['ui.router', 'firebase']);

mainApp.constant("moment", moment);

mainApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'home.html',
            resolve: {
                mainFactory: 'mainFactory',
                home: function (mainFactory) {
                    var data = mainFactory.getSchedule;
                    // This line is updated to return the promise
                    return data.$loaded();
                }
            },
            controller: 'mainCtrl'
        })
        .state('schedule', {
            url: '/schedule',
            templateUrl: 'schedule.html',
            resolve: {
                mainFactory: 'mainFactory',
                home: function (mainFactory) {
                    var data = mainFactory.getSchedule;
                    // This line is updated to return the promise
                    return data.$loaded();
                }
            },
            controller: 'scheduleCtrl'
        })
        .state('teams', {
            url: '/teams',
            templateUrl: 'teams.html',
            controller: 'teamsCtrl'
        })
        .state('seasonAwards', {
            url: '/seasonAwards',
            templateUrl: 'seasonawards.html',
            resolve: {
                mainFactory: 'mainFactory',
                home: function (mainFactory) {
                    var data = mainFactory.getSeasonAwards;
                    // This line is updated to return the promise
                    return data.$loaded();
                }
            },
            controller: 'seasonAwardsCtrl'
        })
        .state('allStars', {
            url: '/allStars',
            templateUrl: 'allstars.html',
            controller: 'allStarsCtrl'
        })
        .state('hall', {
            url: '/hall',
            templateUrl: 'hall.html',
            controller: 'hallOfFameCtrl'
        })
        .state('champions', {
            url: '/champions',
            templateUrl: 'champions.html',
            controller: 'championsCtrl'
        })
        .state('about', {
            url: '/about',
            templateUrl: 'about.html',
            controller: 'mainCtrl'
        })
        .state('admissions', {
            url: '/admissions',
            templateUrl: 'admissions.html',
            controller: 'mainCtrl'
        })
        .state('contact', {
            url: '/contact',
            templateUrl: 'contact.html',
            resolve: {
                mainFactory: 'mainFactory',
                home: function (mainFactory) {
                    var data = mainFactory.getLocations;
                    // This line is updated to return the promise
                    return data.$loaded();
                }
            },
            controller: 'contactCtrl'
        })
        .state('sponsors', {
            url: '/sponsors',
            templateUrl: 'sponsorpage.html',
            controller: 'sponsorsCtrl'
        })
        .state('register', {
            url: '/register',
            templateUrl: 'registration.html',
            controller: 'registrationCtrl'
        })
        .state('teamManager', {
            url: '/teamManager',
            templateUrl: 'teamManager.html',
            controller: 'teamManagerCtrl',
            resolve: {
                mainFactory: 'mainFactory',
                home: function (mainFactory) {
                    var data = mainFactory.getUser;
                    // This line is updated to return the promise
                    return data.$loaded();
                },
                // controller will not be loaded until $requireAuth resolves
                // Auth refers to our $firebaseAuth wrapper in the example above
                "currentAuth": ["mainFactory", function (mainFactory) {
                    // $requireAuth returns a promise so the resolve waits for it to complete
                    // If the promise is rejected, it will throw a $stateChangeError (see above)
                    return mainFactory.getAuth.$requireAuth();
                }]
            }
        })
        .state('siteManager', {
            url: '/siteManager',
            templateUrl: 'siteManager.html',
            controller: 'siteManagerCtrl',
            resolve: {
                mainFactory: 'mainFactory',
                home: function (mainFactory) {
                    var data = mainFactory.getUser;
                    // This line is updated to return the promise
                    return data.$loaded();
                },
                // controller will not be loaded until $requireAuth resolves
                // Auth refers to our $firebaseAuth wrapper in the example above
                "currentAuth": ["mainFactory", function (mainFactory) {
                    // $requireAuth returns a promise so the resolve waits for it to complete
                    // If the promise is rejected, it will throw a $stateChangeError (see above)
                    return mainFactory.getAuth.$requireAuth();
                }]
            }
        })
        .state('teamPage', {
            url: '/teamPage',
            templateUrl: 'teamPage.html',
            controller: 'teamPageCtrl',
            resolve: {
                mainFactory: 'mainFactory',
                home: function (mainFactory) {
                    var data = mainFactory.getPlayers;
                    // This line is updated to return the promise
                    return data.$loaded();
                }
            }
        })
        .state('individualStats', {
            url: '/individualStats',
            templateUrl: 'individualStats.html',
            controller: 'individualStatsCtrl',
            resolve: {
                mainFactory: 'mainFactory',
                home: function (mainFactory) {
                    var data = mainFactory.getOffStats;
                    // This line is updated to return the promise
                    return data.$loaded();
                }
            }
        })
        .state('teamStats', {
            url: '/teamStats',
            templateUrl: 'teamStats.html',
            controller: 'teamStatsCtrl',
            resolve: {
                mainFactory: 'mainFactory',
                home: function (mainFactory) {
                    var data = mainFactory.getOffStats;
                    // This line is updated to return the promise
                    return data.$loaded();
                }
            }
        })
        .state('recordsSeason', {
            url: '/recordsSeason',
            templateUrl: 'recordsSeason.html',
            controller: 'recordsSeasonCtrl',
            resolve: {
                mainFactory: 'mainFactory',
                home: function (mainFactory) {
                    var data = mainFactory.getOffStats;
                    // This line is updated to return the promise
                    return data.$loaded();
                }
            }
        })
        .state('commingSoon', {
            url: '/commingSoon',
            templateUrl: 'commingsoon.html',
            controller: 'mainCtrl'
        })

}]);

//mainApp.config(function($routeProvider) {
//  //ROUTES
//  $routeProvider.
//  when('/home', {
//    templateUrl: 'home.html',
//    controller: 'mainCtrl'
//  }).
//  // when('/route2', {
//  //   templateUrl: 'team.html',
//  //   controller: 'teamCtrl'
//  // }).
//  // when('/route3', {
//  //   templateUrl: 'stats.html',
//  //   controller: 'statsCtrl'
//  // }).
//  // when('/route4', {
//  //   templateUrl: 'schedule.html',
//  //   controller: 'scheduleCtrl'
//  // }).
//  otherwise({
//        redirectTo: '/home'
//      });
//});



