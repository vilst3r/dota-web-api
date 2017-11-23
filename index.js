"use strict"
var dotaWebAPI = require('./lib/api');


var test = new dotaWebAPI("1F72FF9BF1B0C1DF25A8CFA722DA0019")

// get latest game from my account vilst3r 
test.getMatchHistory(null,null,null,null,null,null,null,null,null)
.then(data => console.log(data.result.matches[0]))





module.exports = require('./lib/api');

