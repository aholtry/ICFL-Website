mainApp.filter('num', function () {
    return function (input) {
        return parseInt(input, 10) == null ? input : parseInt(input, 10);
    }
});