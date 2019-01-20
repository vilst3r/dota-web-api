import "isomorphic-fetch";
import { handleResponse, query } from './util';
import { API_URL, STATIC_CDN, MATCH_INTERFACE, ECONOMY_INTERFACE } from '../config/urls';

/**
 * This is a ES6 wrapper class that is constructed by providing a steam api key and acts as an interface to 
 * make requests to the Steam DotA 2 Web API that is publicly available.
 */
class dotaWebAPI {

	/**
	 * Provide a Steam API key in the form of a string. Available here - https://steamcommunity.com/dev/apikey.
	 * @param {string} apiKey 
	 */
	constructor(apiKey) {
		this.apiKey = apiKey
	}

	/***
	 * Match Interface Methods
	 */

	/**
	 * Provide a match id from any given completed game to receive match details.
	 * @param {string} matchId 
	 */
	getMatchDetails(matchId) {
		let parameters = {
			"key": this.apiKey,
			"match_id": matchId
		}

		return fetch(API_URL + MATCH_INTERFACE + "GetMatchDetails/v1?" + query(parameters))
		.then(response => handleResponse(response))
		.catch(error => error)
	}
	
	/**
	 * @deprecated Steam no longer supports this endpoint.
	 * @param {string} [lang]  (optional - ISO639-1 char-set string)
	 */
	getLeagueListing(lang) {
		let parameters = {
			"key" : this.apiKey,
			"language" : lang
		}	

		return fetch(API_URL + MATCH_INTERFACE + "GetLeagueListing/v1?" + query(parameters))
		.then(response => handleResponse(response))
		.catch(error => error)
	}

	/**
	 * No parameters are required. Returns a list of live league games and current match details in each.
	 */
	getLiveLeagueGames() {
		let parameters = {
			"key" : this.apiKey
		}

		return fetch(API_URL + MATCH_INTERFACE + "GetLiveLeagueGames/v1?" + query(parameters))
		.then(response => handleResponse(response))
		.catch(error => error)
	}

	/**
	 * Provide a list of optional parameters to collect a list of previous matches filtered under those parameters, use null to skip parameter filter.
	 * @param {number} [heroId] (optional - uint32)
	 * @param {string} [gameMode] (optional - uint32) 
	 * 	0 - None
		1 - All Pick
		2 - Captain's Mode
		3 - Random Draft
		4 - Single Draft
		5 - All Random
		6 - Intro
		7 - Diretide
		8 - Reverse Captain's Mode
		9 - The Greeviling
		10 - Tutorial
		11 - Mid Only
		12 - Least Played
		13 - New Player Pool
		14 - Compendium Matchmaking
		16 - Captain's Draft
	 * @param {number} [skill] (uint32)
		0 - Any
		1 - Normal
		2 - High
		3 - Very High
	 * @param {string} [minPlayers] (optional)
	 * @param {string} [accountId] (optional)
	 * @param {string} [leagueId] (optional)
	 * @param {string} [startAtMatchId] (optional)
	 * @param {string} [matchesRequested] ((optional) default: 25)
	 * @param {string} [tournamentGamesOnly] ((optional) 0 = false, 1 = true)
	 */
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

	/**
	 * Provide starting match id and number of matches to collect history of matches under those filters.
	 * @param {number} [startMatchSeqNum] (optional - uint64) 
	 * @param {number} [matchesRequested] (optional - uint32)
	 */
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

	/**
	 * Provide a list of league games by date ranges
	 * @param {number} [dateMin] (optional - uint32 Unix Timestamp)
	 * @param {number} [dateMax] (optional - uint32 Unix Timestamp)
	 */
	getScheduledLeagueGames(dateMin, dateMax) {
		let parameters = {
			"key" : this.apiKey
		}
		return fetch(API_URL + MATCH_INTERFACE + "GetScheduledLeagueGames/v1?" + query(parameters))
		.then(response => handleResponse(response))
		.catch(error => error)
	}

	/**
	 * Returns list of teams provided by starting id and amount
	 * @param {number} [startTeamId] (optional - uint64)
	 * @param {number} [teamsRequested] (optional - uint32)
	 */
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

	/**
	 * Provide a tournament player's account id to collect his stats in tournaments
	 * @param {string} accountId 
	 * @param {string} [leagueId] (optional)
	 * @param {string} [heroId] (optional)
	 * @param {string} [timeFrame] (optional)
	 */
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

	/***
	 * Economy Interface Methods
	 */

	/**
	 * Returns a list of game items that are available depending on the latest version of the patch
	 * @param {string} [lang] (optional)
	 */
	getItems(lang) {
		let parameters = {
			"key" : this.apiKey,
			"language" : lang
		}
		return fetch(API_URL + ECONOMY_INTERFACE + "GetGameItems/v1?" + query(parameters))
		.then(response => handleResponse(response))
		.catch(error => error)
	}

	/**
	 * Returns a list of heroes that are available depending on the latest version of the patch
	 * @param {string} [lang] (optional)
	 * @param {bool} [ifItemized] (optional)
	 */
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

	/***
	 * Static Asset Interface
	 */

	/**
	 * Provide a item name to collect it's icon image. Default size is 'lg.png'
	 * @param {string} name 
	 */
	getItemIconPath(name) {
		name = name.replace(/item_/gi, '') + '_';
		return STATIC_CDN + name + 'lg.png';
	}

	/**
	 * Provide a hero name and image format to collect it's icon image. Default size is 'lg.png'
	 * @param {string} name 
	 * @param {string} size (sb.png, lg.png, full.png, vert.jpg)
	 */
	getHeroIconPath(name, size) {
		name = name.replace(/npc_dota_hero_/gi, '') + '_';
		return STATIC_CDN + name + size;
	}
}

module.exports = {
	dotaWebAPI: dotaWebAPI
}