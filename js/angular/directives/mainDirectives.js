mainApp.directive('myScripts', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/main.js'
    };
});

mainApp.directive('icflFacebook', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/angular/templates/facebook.html'
    };
});

mainApp.directive('myHeader', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/angular/templates/header.html'
    };
});

mainApp.directive('myFooter', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/angular/templates/footer.html'
    };
});

mainApp.directive('proveIt', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/angular/templates/proveit.html'
    };
});

mainApp.directive('mySponsors', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/angular/templates/sponsors.html'
    };
});

mainApp.directive('loginModal', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/angular/templates/loginModal.html'
    };
});

mainApp.directive('passwordModal', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/angular/templates/passwordModal.html'
    };
});

mainApp.directive('resetModal', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/angular/templates/resetModal.html'
    };
});

mainApp.directive('myMap', function () {
    var link = function (scope, element, attrs) {
        // Get Locations
        var mapMarkers = scope.$eval(attrs.myMap);

        // Map Initial Location
        var initLatitude = 43.613280;
        var initLongitude = -116.357188;

        // Setup Map Markers
        for(var i; i <= mapMarkers.length; i++){
            mapMarkers[i].html = function () { return "<strong>" + mapMarkers[i].title + "</strong><br>" + mapMarkers[i].address + "<br><br><button class='btn-link' onclick='mapCenterAt({ latitude: " + mapMarkers[i].latitude + ", longitude: " + mapMarkers[i].longitude + ", zoom: 16 }, event)'>[+] zoom here</button>"; },
            mapMarkers[i].icon = {
                    image: "img/img-theme/pin.png",
                    iconsize: [26, 46],
                    iconanchor: [12, 46]
                }
        }

        // Map Extended Settings
        var mapSettings = {
            controls: {
                panControl: true,
                zoomControl: true,
                mapTypeControl: true,
                scaleControl: true,
                streetViewControl: true,
                overviewMapControl: true
            },
            scrollwheel: false,
            markers: mapMarkers,
            latitude: initLatitude,
            longitude: initLongitude,
            zoom: 5
        };

        $(element).gMap(mapSettings);
    }
    return {
        restrict: "A",
        link: link
    };
});

mainApp.directive('focusMe', function($timeout) {
  return {
    scope: { trigger: '=focusMe' },
    link: function(scope, element) {
      scope.$watch('trigger', function(value) {
        if(value === true) {
          //console.log('trigger',value);
          $timeout(function() {
            element[0].focus();
            scope.trigger = false;
          },500);
        }
      });
    }
  };
});

mainApp.directive('onlyNumbers', function() {
  return {
    require: 'ngModel',
    link: function (scope, element, attr, ngModelCtrl) {
      function fromUser(text) {
        var transformedInput = text.replace(/[^0-9.-]/g, '');
        console.log(transformedInput);
        if(transformedInput !== text) {
            ngModelCtrl.$setViewValue(transformedInput);
            ngModelCtrl.$render();
        }
        return transformedInput;  // or return Number(transformedInput)
      }
      ngModelCtrl.$parsers.push(fromUser);
    }
  };
});

mainApp.directive('whenReady', ['$interpolate', function($interpolate) {
  return {
    restrict: 'A',
    priority: Number.MIN_SAFE_INTEGER, // execute last, after all other directives if any.
    link: function($scope, $element, $attributes) {
      var expressions = $attributes.whenReady.split(';');
      var waitForInterpolation = false;
      var hasReadyCheckExpression = false;

      function evalExpressions(expressions) {
        expressions.forEach(function(expression) {
          $scope.$eval(expression);
        });
      }

      if ($attributes.whenReady.trim().length === 0) { return; }

    if ($attributes.waitForInterpolation && $scope.$eval($attributes.waitForInterpolation)) {
        waitForInterpolation = true;
    }

      if ($attributes.readyCheck) {
        hasReadyCheckExpression = true;
      }

      if (waitForInterpolation || hasReadyCheckExpression) {
        requestAnimationFrame(function checkIfReady() {
          var isInterpolated = false;
          var isReadyCheckTrue = false;

          if (waitForInterpolation && $element.text().indexOf($interpolate.startSymbol()) >= 0) { // if the text still has {{placeholders}}
            isInterpolated = false;
          }
          else {
            isInterpolated = true;
          }

          if (hasReadyCheckExpression && !$scope.$eval($attributes.readyCheck)) { // if the ready check expression returns false
            isReadyCheckTrue = false;
          }
          else {
            isReadyCheckTrue = true;
          }

          if (isInterpolated && isReadyCheckTrue) { evalExpressions(expressions); }
          else { requestAnimationFrame(checkIfReady); }

        });
      }
      else {
        evalExpressions(expressions);
      }
    }
  };
}]);