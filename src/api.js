import { APP_ID } from '../config/config';
import { API_URL, MATCH_INTERFACE, ECONOMY_INTERFACE } from '../config/urls';

// API Constructor
let dotaWebAPI = function (apiKey) {
	this.apiKey = apiKey;
}

// Match Interface Methods
dotaWebAPI.prototype.getMatchDetails = (matchId) => {
	let parameters = {
		"key" : this.apiKey,
		"match_id" : matchId
	}	
	return fetch(API_URL + MATCH_INTERFACE + APP_ID + "/GetMatchDetails/v1" + query(parameters))
			.then(response => JSON.parse(response));
}

dotaWebAPI.prototype.getLeagueListing = (lang) => {
	let parameters = {
		"key" : this.apiKey,
		"language" : lang
	}	
	return fetch(API_URL + MATCH_INTERFACE + APP_ID + "/GetLeagueListing/v1/" + query(parameters))
			.then(response => JSON.parse(response));
}

dotaWebAPI.prototype.getLiveLeagueGames = () => {
	let parameters = {
		"key" : this.apiKey
	}
	return fetch(API_URL + MATCH_INTERFACE + APP_ID + "/GetLiveLeagueGames/v1/" + query(parameters))
			.then(response => JSON.parse(response));
}

dotaWebAPI.prototype.getMatchHistory = (heroId, gameMode, skill, minPlayers, accountId, leagueId, startAtMatchId, matchesRequested, tournamentGamesOnly) => {
	let parameters = {
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
	return fetch(API_URL + MATCH_INTERFACE + APP_ID + "/GetMatchHistory/v1/" + query(parameters))
			.then(response => JSON.parse(response))
}

dotaWebAPI.prototype.getMatchHistoryBySequenceNumber = (startMatchSeqNum, matchesRequested) => {
	let parameters = {
		"key" : this.apiKey,
		"start_at_match_seq_num" : startMatchSeqNum,
		"matches_requested" : matchesRequested
	}
	return fetch(API_URL + MATCH_INTERFACE + APP_ID + "/GetMatchHistoryBySequenceNum/v1" + query(parameters))
			.then(response => JSON.parse(response))
}

// dotaWebAPI.prototype.getScheduledLeagueGames = (dateMin, dateMax) => {
// 	let parameters = {
// 		"key" : this.apiKey,
// 		"date_min" : dateMin,
// 		"date_max" : dateMax
// 	}
// 	return fetch(API_URL + MATCH_INTERFACE + APP_ID + "/GetScheduledLeagueGames/v1/" + query(parameters))
// 			.then(response => JSON.parse(response))
// }

dotaWebAPI.prototype.getTeamInfo = (startTeamId, teamsRequested) => {
	let parameters = {
		"key" : this.apiKey,
		"start_at_team_id" : startTeamId,
		"teams_requested" : teamsRequested
	}
	return fetch(API_URL + MATCH_INTERFACE + APP_ID + "/GetTeamInfoByTeamID/v1" + query(parameters))
			.then(response => JSON.parse(response))
}

dotaWebAPI.prototype.getTournamentPlayerStats = (accountId, leagueId, heroId, timeFrame) => {
	let parameters = {
		"key" : this.apiKey,
		"account_id" : accountId,
		"league_id" : leagueId,
		"hero_id" : heroId,
		"time_frame" : timeFrame
	}
	return fetch(API_URL + MATCH_INTERFACE + APP_ID + "/GetTournamentPlayerStats/v1" + query(parameters))
			.then(response => JSON.parse(response))
}

// Economy Interface Methods
dotaWebAPI.prototype.getItems = (lang) => {
	let parameters = {
		"key" : this.apiKey,
		"language" : lang
	}
	return fetch(API_URL + ECONOMY_INTERFACE + APP_ID + "/GetGameItems/v1" + query(parameters))
			.then(response => JSON.parse(response))
}

dotaWebAPI.prototype.getHeroes = (lang, ifItemized) => {
	let parameters = {
		"key" : this.apiKey,
		"language" : lang,
		"itemizedonly" : ifItemized
	}
	return fetch(API_URL + ECONOMY_INTERFACE + APP_ID + "/GetHeroes/v1" + query(parameters))
			.then(response => JSON.parse(response))
}

dotaWebAPI.prototype.getItemIconPath = (name) => {
	name = name.replace(/item_/gi, '') + '_';
	return 'http://cdn.dota2.com/apps/dota2/images/items/' + name + 'lg.png';
}
// sb.png, lg.png, full.png, vert.jpg
dotaWebAPI.prototype.getHeroIconPath = (name, size) => {
	name = name.replace(/npc_dota_hero_/gi, '') + '_';
	return 'http://cdn.dota2.com/apps/dota2/images/heroes/' + name + size;
}

module.exports = dotaWebAPI;

// utility
let query = (parameters) => {
	let query = "?";
	for (let property in parameters) {
	    if (parameters.hasOwnProperty(property) && parameters[property] != undefined) {
	    	query += (property + "=" + parameters[property] + "&") 
	    }
	}
	
	// remove the extra parameter symbol
	query = query.substring (0, query.length - 1)
	return query
}