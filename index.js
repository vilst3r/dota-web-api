// proxy from dev env - remove when cloning
var rp = require('request-promise').defaults({
    proxy: 'http://internet-proxy.dc.vodafone.com.au:8080'
});

var dotaWebAPI = require('./lib/api');

// "use strict"

rp("http://api.steampowered.com/ISteamApps/GetAppList/v2")
	.then(response => JSON.parse(response))
	.then(data => data.applist.apps.find(app => {
		if (app.name === "Dota 2")  {
			var test = new dotaWebAPI("1F72FF9BF1B0C1DF25A8CFA722DA0019", app.appid)
			test.getMatchDetails("3574415631")
			.then(data => console.log(data))
		}
	}))

module.exports = require('./lib/api');