// proxy from dev env - remove proxy options on your machine
var rp = require('request-promise').defaults({
    proxy: 'http://internet-proxy.dc.vodafone.com.au:8080'
});

var url = "http://api.steampowered.com/";

// utility
var query = function(parameters) {
	var query = "?";
	for (var property in parameters) {
	    if (parameters.hasOwnProperty(property) && parameters[property] != undefined) {
	    	query += (property + "=" + parameters[property] + "&") 
	    }
	}

	// remove the extra parameter symbol
	query = query.substring (0, query.length - 1)
	console.log(query)
	return query
}

// API Constructor
var dotaWebAPI = function (apiKey) {
	this.apiKey = apiKey;
	this.appId = 570;
	
}

// API Methods
// get latest up to date match ID
dotaWebAPI.prototype.getMatchDetails = function (matchId) {
	var parameters = {
		"key" : this.apiKey,
		"match_id" : matchId
	}	
	return rp(url + "IDOTA2Match_" + this.appId + "/GetMatchDetails/v1" + query(parameters))
			.then(response => JSON.parse(response));
}

// https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes : for language parameter
dotaWebAPI.prototype.getLeagueListing = function(lang) {
	var parameters = {
		"key" : this.apiKey,
		"language" : lang
	}	
	return rp(url + "IDOTA2Match_" + this.appId + "/GetLeagueListing/v1/" + query(parameters))
			.then(response => JSON.parse(response));
}

dotaWebAPI.prototype.getLiveLeagueGames = function() {
	var parameters = {
		"key" : this.apiKey
	}
	return rp(url + "IDOTA2Match_" + this.appId + "/GetLiveLeagueGames/v1/" + query(parameters))
			.then(response => JSON.parse(response));
}

// player_name=<name> # Search matches with a player name, exact match only
// hero_id=<id> # Search for matches with a specific hero being played, hero id's are in dota/scripts/npc/npc_heroes.txt in your Dota install directory
// skill=<skill>  # 0 for any, 1 for normal, 2 for high, 3 for very high skill
// date_min=<date> # date in UTC seconds since Jan 1, 1970 (unix time format)
// date_max=<date> # date in UTC seconds since Jan 1, 1970 (unix time format)
// account_id=<id> # Steam account id (this is not SteamID, its only the account number portion)
// league_id=<id> # matches for a particular league
// start_at_match_id=<id> # Start the search at the indicated match id, descending
// matches_requested=<n> # Defaults is 25 matches, this can limit to less
dotaWebAPI.prototype.getMatchHistory = function(player_name, gameMode, skill, minPlayers, accountId, leagueId, startAtMatchId, matchesRequested, tournamentGamesOnly) {
	var parameters = {
		"key" : this.apiKey,
		"player_name" : player_name,
		"maches_requested" : gameMode
	}
	return rp(url + "IDOTA2Match_" + this.appId + "/GetLiveLeagueGames/v1/" + query(parameters))
			.then(response => JSON.parse(response))
}

module.exports = dotaWebAPI;