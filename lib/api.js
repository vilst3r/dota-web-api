var rp = require('request-promise');

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

dotaWebAPI.prototype.getMatchHistory = function(heroId, gameMode, skill, minPlayers, accountId, leagueId, startAtMatchId, matchesRequested, tournamentGamesOnly) {
	var parameters = {
		"key" : this.apiKey,
		"hero_id" : heroId, 
		"game_mode" : gameMode,
		"skill" : skill,
		"minPlayers" : minPlayers,
		"account_id" : accountId,
		"league_id" : leagueId,
		"start_at_match_id" : startAtMatchId,
		"matches_requested" : matchesRequested,
		"tournament_games_only" : tournamentGamesOnly
	}
	return rp(url + "IDOTA2Match_" + this.appId + "/GetMatchHistory/v1/" + query(parameters))
			.then(response => JSON.parse(response))
}



module.exports = dotaWebAPI;