import "isomorphic-fetch";
import { handleResponse, query } from './util';
import { API_URL, STATIC_CDN, MATCH_INTERFACE, ECONOMY_INTERFACE } from '../config/urls';

class dotaWebAPI {
	constructor(apiKey) {
		this.apiKey = apiKey
	}

	getMatchDetails(matchId) {
		let parameters = {
			"key": this.apiKey,
			"match_id": matchId
		}

		return fetch(API_URL + MATCH_INTERFACE + "GetMatchDetails/v1?" + query(parameters))
		.then(response => handleResponse(response))
		.catch(error => error)
	}

	getLeagueListing(lang) {
		let parameters = {
			"key" : this.apiKey,
			"language" : lang
		}	

		return fetch(API_URL + MATCH_INTERFACE + "GetLeagueListing/v1?" + query(parameters))
		.then(response => handleResponse(response))
		.catch(error => error)
	}

	getLiveLeagueGames() {
		let parameters = {
			"key" : this.apiKey
		}

		return fetch(API_URL + MATCH_INTERFACE + "GetLiveLeagueGames/v1?" + query(parameters))
		.then(response => handleResponse(response))
		.catch(error => error)
	}

	getMatchHistory(heroId, gameMode, skill, minPlayers, accountId, leagueId, startAtMatchId, matchesRequested, tournamentGamesOnly) {
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
		return fetch(API_URL + MATCH_INTERFACE + "GetMatchHistory/v1?" + query(parameters))
		.then(response => handleResponse(response))
		.catch(error => error)
	}

	getMatchHistoryBySequenceNumber(startMatchSeqNum, matchesRequested) {
		let parameters = {
			"key" : this.apiKey,
			"start_at_match_seq_num" : startMatchSeqNum,
			"matches_requested" : matchesRequested
		}
		return fetch(API_URL + MATCH_INTERFACE + "GetMatchHistoryBySequenceNum/v1?" + query(parameters))
		.then(response => handleResponse(response))
		.catch(error => error)
	}

	// Deprecated
	// getScheduledLeagueGames(dateMin, dateMax) {
	// 	let parameters = {
	// 		"key" : this.apiKey,
	// 		"date_min" : dateMin,
	// 		"date_max" : dateMax
	// 	}
	// 	return fetch(API_URL + MATCH_INTERFACE + "GetScheduledLeagueGames/v1?" + query(parameters))
	// 	.then(response => {
	// 		if (response.ok) {
	// 			return response.json()
	// 		}
	// 		else{
	// 			throw response.json()
	// 		}
	// 	})
	// 	.catch(error => error)
	// }

	getTeamInfo(startTeamId, teamsRequested) {
		let parameters = {
			"key" : this.apiKey,
			"start_at_team_id" : startTeamId,
			"teams_requested" : teamsRequested
		}
		return fetch(API_URL + MATCH_INTERFACE + "GetTeamInfoByTeamID/v1?" + query(parameters))
		.then(response => handleResponse(response))
		.catch(error => error)
	}

	getTournamentPlayerStats(accountId, leagueId, heroId, timeFrame) {
		let parameters = {
			"key" : this.apiKey,
			"account_id" : accountId,
			"league_id" : leagueId,
			"hero_id" : heroId,
			"time_frame" : timeFrame
		}
		return fetch(API_URL + MATCH_INTERFACE + "GetTournamentPlayerStats/v1?" + query(parameters))
		.then(response => handleResponse(response))
		.catch(error => error)
	}

	// Economy Interface Methods
	getItems(lang) {
		let parameters = {
			"key" : this.apiKey,
			"language" : lang
		}
		return fetch(API_URL + ECONOMY_INTERFACE + "GetGameItems/v1?" + query(parameters))
		.then(response => handleResponse(response))
		.catch(error => error)
	}

	getHeroes(lang, ifItemized) {
		let parameters = {
			"key" : this.apiKey,
			"language" : lang,
			"itemizedonly" : ifItemized
		}
		return fetch(API_URL + ECONOMY_INTERFACE + "GetHeroes/v1?" + query(parameters))
		.then(response => handleResponse(response))
		.catch(error => error)
	}

	getItemIconPath(name) {
		name = name.replace(/item_/gi, '') + '_';
		return STATIC_CDN + name + 'lg.png';
	}

	// sb.png, lg.png, full.png, vert.jpg
	getHeroIconPath(name, size) {
		name = name.replace(/npc_dota_hero_/gi, '') + '_';
		return STATIC_CDN + name + size;
	}
}

module.exports = {
	dotaWebAPI: dotaWebAPI
}