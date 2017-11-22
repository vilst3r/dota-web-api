"use strict"
var dotaWebAPI = require('./lib/api');


var test = new dotaWebAPI("1F72FF9BF1B0C1DF25A8CFA722DA0019")

// test.getMatchDetails("3574415631")
// .then(data => console.log(data))

// german 
// test.getLeagueListing("de")
// .then(data => console.log(data.result.leagues[0]))

// english
// test.getLeagueListing()
// .then(data => console.log(data.result.leagues[0]))

// test.getLiveLeagueGames()
// .then(data => console.log(data.result.games[0]))

// random guy with one game in his history
test.getMatchHistory("vilst3r","1")
.then(data => console.log(data))



module.exports = require('./lib/api');