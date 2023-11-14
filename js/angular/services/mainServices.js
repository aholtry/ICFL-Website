mainApp.factory('mainFactory', function ($firebaseObject, $firebaseArray, $firebaseAuth) {
    //Firebase
    var ref = new Firebase("https://icfl.firebaseio.com");
    var mes = new Firebase("https://icfl.firebaseio.com/messages");
    var spo = new Firebase("https://icfl.firebaseio.com/sponsors");
    var saw = new Firebase("https://icfl.firebaseio.com/seasonAwards");
    var ast = new Firebase("https://icfl.firebaseio.com/allStars");
    var chp = new Firebase("https://icfl.firebaseio.com/champions");
    var hal = new Firebase("https://icfl.firebaseio.com/hallOfFame");
    var loc = new Firebase("https://icfl.firebaseio.com/locations");
    var tms = new Firebase("https://icfl.firebaseio.com/teams");
    var eve = new Firebase("https://icfl.firebaseio.com/events");
    var sch = new Firebase("https://icfl.firebaseio.com/schedule");
    var usr = new Firebase("https://icfl.firebaseio.com/users");
    var pla = new Firebase("https://icfl.firebaseio.com/players");

    var ost = new Firebase("https://icfl.firebaseio.com/offStats");
    var dst = new Firebase("https://icfl.firebaseio.com/defStats");
    var sst = new Firebase("https://icfl.firebaseio.com/spStats");

    var host = new Firebase("https://icfl.firebaseio.com/historyOffStats");
    var hdst = new Firebase("https://icfl.firebaseio.com/historyDefStats");
    var hsst = new Firebase("https://icfl.firebaseio.com/historySpStats");

    return {

        // create a synchronized array
        getAuth: $firebaseAuth(ref),
        getMessages : $firebaseArray(mes),
        getSponsors : $firebaseArray(spo),
        getSeasonAwards : $firebaseArray(saw),
        getAllstars : $firebaseArray(ast),
        getChampions : $firebaseArray(chp),
        getHallOfFame : $firebaseArray(hal),
        getLocations : $firebaseArray(loc),
        getTeams : $firebaseArray(tms),
        getEvents : $firebaseArray(eve),
        getSchedule: $firebaseArray(sch),
        getUser: $firebaseArray(usr),
        getPlayers: $firebaseArray(pla),

        getOffStats: $firebaseArray(ost),
        getDefStats: $firebaseArray(dst),
        getSPStats: $firebaseArray(sst),

        getHistoryOffStats: $firebaseArray(host),
        getHistoryDefStats: $firebaseArray(hdst),
        getHistorySPStats: $firebaseArray(hsst),
    }
});