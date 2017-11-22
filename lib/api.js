// proxy from dev env - remove when cloning
var rp = require('request-promise').defaults({
    proxy: 'http://internet-proxy.dc.vodafone.com.au:8080'
});

// API Constructor
var dotaWebAPI = function (apiKey, appId) {
	this.apiKey = apiKey;
	this.appId = appId;
}

// API Methods
dotaWebAPI.prototype.getAPIKey = function() {
	return this.apiKey;
}


// dotaWebAPI.prototype.getAppID = function(cb) {
	// rp("http://api.steampowered.com/ISteamApps/GetAppList/v2")
	// 	.then(response => JSON.parse(response))
	// 	.then(data => data.applist.apps.find(app => app.name === "Dota 2" ?  cb(app.appid) : null))
// }

module.exports = dotaWebAPI;