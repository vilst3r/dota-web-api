// proxy from dev env - remove proxy options on your machine
var rp = require('request-promise').defaults({
    proxy: 'http://internet-proxy.dc.vodafone.com.au:8080'
});

var dotaWebAPI = require('./lib/api');

// "use strict"


var test = new dotaWebAPI("1F72FF9BF1B0C1DF25A8CFA722DA0019")
test.getMatchDetails("3574415631")
.then(data => console.log(data))

module.exports = require('./lib/api');