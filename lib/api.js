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
dotaWebAPI.prototype.getMatchDetails = function (matchId) {
	var parameters = {
		"key" : this.apiKey,
		"match_id" : matchId
	}	
	return rp(url + "IDOTA2Match_" + this.appId + "/GetMatchDetails/v1" + query(parameters))
			.then(response => JSON.parse(response));
}

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

dotaWebAPI.prototype.getMatchHistoryBySequenceNumber = function(startMatchSeqNum, matchesRequested) {
	var parameters = {
		"key" : this.apiKey,
		"start_at_match_seq_num" : startMatchSeqNum,
		"matches_requested" : matchesRequested
	}
	return rp(url + "IDOTA2Match_" + this.appId + "/GetMatchHistoryBySequenceNum/v1" + query(parameters))
			.then(response => JSON.parse(response))
}

dotaWebAPI.prototype.getScheduledLeagueGames = function(dateMin, dateMax) {
	var parameters = {
		"key" : this.apiKey,
		"date_min" : dateMin,
		"date_max" : dateMax
	}
	return rp(url + "IDOTA2Match_" + this.appId + "/GetScheduledLeagueGames/v1/" + query(parameters))
			.then(response => JSON.parse(response))
}

dotaWebAPI.prototype.getTeamInfo = function(startTeamId, teamsRequested) {
	var parameters = {
		"key" : this.apiKey,
		"start_at_team_id" : startTeamId,
		"teams_requested" : teamsRequested
	}
	return rp(url + "IDOTA2Match_" + this.appId + "/GetTeamInfoByTeamID/v1" + query(parameters))
			.then(response => JSON.parse(response))
}

dotaWebAPI.prototype.getTournamentPlayerStats = function(accountId, leagueId, heroId, timeFrame) {
	var parameters = {
		"key" : this.apiKey,
		"account_id" : accountId,
		"league_id" : leagueId,
		"hero_id" : heroId,
		"time_frame" : timeFrame
	}
	return rp(url + "IDOTA2Match_" + this.appId + "/GetTournamentPlayerStats/v1" + query(parameters))
			.then(response => JSON.parse(response))
}

module.exports = dotaWebAPI;

