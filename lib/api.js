// proxy from dev env - remove proxy options on your machine
var rp = require('request-promise').defaults({
    proxy: 'http://internet-proxy.dc.vodafone.com.au:8080'
});

var url = "http://api.steampowered.com/";

// utility
var query = function(parameters) {
	var query = "?";
	for (var property in parameters) {
	    if (parameters.hasOwnProperty(property)) {
	    	query += (property + "=" + parameters[property] + "&") 
	    }
	}

	// remove the extra parameter symbol
	query = query.substring (0, query.length - 1)

	return query
}

// API Constructor
var dotaWebAPI = function (apiKey) {
	this.apiKey = apiKey;
	this.appId = 570;
	
}

// API Methods
dotaWebAPI.prototype.getMatchDetails = function (matchId) {
	return rp(url + "IDOTA2Match_" + this.appId + "/GetMatchDetails/v1" + query({"key" : this.apiKey, "match_id" : matchId}))
			.then(response => JSON.parse(response));
}

module.exports = dotaWebAPI;