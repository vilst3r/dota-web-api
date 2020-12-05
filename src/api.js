import fetch from 'node-fetch';

// Private constants
const APP_ID = 570;
const API_URL = 'http://api.steampowered.com';
const STATIC_CDN = 'http://cdn.dota2.com/apps/dota2/images';
const MATCH_INTERFACE = `IDOTA2Match_${APP_ID}`;
const ECONOMY_INTERFACE = `IEconDOTA2_${APP_ID}`;

/**
 * This is a wrapper class that is constructed by providing a steam api key
 * and acts as an interface to make requests to the Steam DotA 2 Web API that is
 * publicly available.
 */
export class DotaWebAPI {
  /**
   * Provide a Steam API key in the form of a string.
   * Available here - https://steamcommunity.com/dev/apikey.
   *
   * @param {string} apiKey
   */
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.heroes = {};
    this.items = {};

    // Load heroes & items data asynchronously
    this.getHeroes()
        .then((data) => data.result.heroes)
        .then((heroes) => heroes.map((hero) => {
          hero.localized_name = hero.name.replace(/npc_dota_hero_/gi, '');
          hero.images = {};
          ['sb', 'lg', 'full'].map((size) =>
            hero.images[size] =
            `${STATIC_CDN}/heroes/${hero.localized_name}_${size}.png`,
          );
          hero.images.vert =
            `${STATIC_CDN}/heroes/${hero.localized_name}_vert.jpg`;
          this.heroes[hero.localized_name] = hero;
        }));
    this.getItems()
        .then((data) => data.result.items)
        .then((items) => items.map((item) => {
          item.localized_name = item.name.replace(/item_/gi, '');
          item.images = {};
          item.images.lg = `${STATIC_CDN}/items/${item.localized_name}_lg.png`;
          this.items[item.localized_name] = item;
        }));
  }

  /**
   * Retrieves match details based on the `matchId` passed in
   * @param {string} matchId
   */
  async getMatchDetails(matchId) {
    const parameters = {
      'key': this.apiKey,
      'match_id': matchId,
    };

    const queryString = buildQueryString(parameters);

    try {
      const response = await fetch(
          `${API_URL}/${MATCH_INTERFACE}/GetMatchDetails/v1?${queryString}`);
      return handleResponse(response);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieves a list of all the tournaments in the game.
   * @deprecated Steam no longer supports this endpoint.
   *
   * @param {string} [lang]  (optional - ISO639-1 char-set string)
   */
  async getLeagueListing(lang) {
    const parameters = {
      'key': this.apiKey,
      'language': lang,
    };

    const queryString = buildQueryString(parameters);

    try {
      const response = fetch(
          `${API_URL}/${MATCH_INTERFACE}/GetLeagueListing/v1?${queryString}`);
      return handleResponse(response);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Returns a list of live league games & the current match details in each.
   */
  async getLiveLeagueGames() {
    const parameters = {
      'key': this.apiKey,
    };

    const queryString = buildQueryString(parameters);

    try {
      const response = fetch(
          `${API_URL}/${MATCH_INTERFACE}/GetLiveLeagueGames/v1?${queryString}`);
      return handleResponse(response);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Provide a list of optional parameters to collect a list of previous matches
   * filtered under those parameters, use null to skip parameter filter.
   * @param {number} [heroId] (optional - uint32)
   * @param {string} [gameMode] (optional - uint32)
   *  0 - None
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
  async getMatchHistory(heroId, gameMode, skill, minPlayers, accountId,
      leagueId, startAtMatchId, matchesRequested, tournamentGamesOnly) {
    const parameters = {
      'key': this.apiKey,
      'hero_id': heroId,
      'game_mode': gameMode,
      'skill': skill,
      'minPlayers': minPlayers,
      'account_id': accountId,
      'league_id': leagueId,
      'start_at_match_id': startAtMatchId,
      'matches_requested': matchesRequested,
      'tournament_games_only': tournamentGamesOnly,
    };

    const queryString = buildQueryString(parameters);

    try {
      const response = fetch(
          `${API_URL}/${MATCH_INTERFACE}/GetMatchHistory/v1?${queryString}`);
      return handleResponse(response);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Provide starting match id and number of matches to collect history of
   * matches under those filters.
   *
   * @param {number} [startMatchSeqNum] (optional - uint64)
   * @param {number} [matchesRequested] (optional - uint32)
   */
  async getMatchHistoryBySequenceNumber(startMatchSeqNum, matchesRequested) {
    const parameters = {
      'key': this.apiKey,
      'start_at_match_seq_num': startMatchSeqNum,
      'matches_requested': matchesRequested,
    };

    const queryString = buildQueryString(parameters);

    try {
      const response = fetch(
          `${API_URL}/${MATCH_INTERFACE}/GetMatchHistoryBySequenceNum` +
          `/v1?${queryString}`);
      return handleResponse(response);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Provide a list of league games by date ranges
   * @deprecated Steam no longer supports this endpoint.
   *
   * @param {number} [dateMin] (optional - uint32 Unix Timestamp)
   * @param {number} [dateMax] (optional - uint32 Unix Timestamp)
   */
  async getScheduledLeagueGames(dateMin, dateMax) {
    const parameters = {
      'key': this.apiKey,
    };

    const queryString = buildQueryString(parameters);

    try {
      const response = fetch(
          `${API_URL}/${MATCH_INTERFACE}/GetScheduledLeagueGames` +
          `/v1?${queryString}`);
      return handleResponse(response);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Returns list of teams provided by starting id and amount
   * @param {number} [startTeamId] (optional - uint64)
   * @param {number} [teamsRequested] (optional - uint32)
   */
  async getTeamInfo(startTeamId, teamsRequested) {
    const parameters = {
      'key': this.apiKey,
      'start_at_team_id': startTeamId,
      'teams_requested': teamsRequested,
    };

    const queryString = buildQueryString(parameters);

    try {
      const response = fetch(`${API_URL}/${MATCH_INTERFACE}` +
      `/GetTeamInfoByTeamID/v1?${queryString}`);
      return handleResponse(response);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Provide a tournament player's account id to collect his stats in
   * tournaments
   *
   * @param {string} accountId
   * @param {string} [leagueId] (optional)
   * @param {string} [heroId] (optional)
   * @param {string} [timeFrame] (optional)
   */
  async getTournamentPlayerStats(accountId, leagueId, heroId, timeFrame) {
    const parameters = {
      'key': this.apiKey,
      'account_id': accountId,
      'league_id': leagueId,
      'hero_id': heroId,
      'time_frame': timeFrame,
    };

    const queryString = buildQueryString(parameters);

    try {
      const response = fetch(
          `${API_URL}/${MATCH_INTERFACE}/GetTournamentPlayerStats` +
          `/v1?${queryString}`);
      return handleResponse(response);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Returns a list of game items that are available depending on the latest
   * version of the patch
   *
   * @param {string} [lang] (optional)
   */
  async getItems(lang) {
    // Use cache if asynchronously loaded from constructor
    if (Object.keys(this.items).length > 0) {
      return this.items;
    }

    const parameters = {
      'key': this.apiKey,
      'language': lang,
    };

    const queryString = buildQueryString(parameters);

    try {
      const response = fetch(
          `${API_URL}/${ECONOMY_INTERFACE}/GetGameItems/v1?${queryString}`);
      return handleResponse(response);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Returns a list of heroes that are available depending on the latest version
   * of the patch
   *
   * @param {string} [lang] (optional)
   * @param {bool} [ifItemized] (optional)
   */
  async getHeroes(lang, ifItemized) {
    // Use cache if asynchronously loaded from constructor
    if (Object.keys(this.heroes).length > 0) {
      return this.heroes;
    }

    const parameters = {
      'key': this.apiKey,
      'language': lang,
      'itemizedonly': ifItemized,
    };

    const queryString = buildQueryString(parameters);

    try {
      const response = fetch(
          `${API_URL}/${ECONOMY_INTERFACE}/GetHeroes/v1?${queryString}`);
      return handleResponse(response);
    } catch (error) {
      throw error;
    }
  }
}

/** Private Functions **/

/**
 * Parses the response body from HTTP requests
 * @param {Promise<any>} response from  HTTP response
 * @return {Promise<any>} The deserialized response body
 */
async function handleResponse(response) {
  const res = await response;

  if (res.ok) {
    return res.json();
  } else {
    return res.statusText;
  }
}


/**
 * Constructs the query parameter string from a given object
 * @param {object} parameters wrapped in an object literal
 * @return {string}  the query string for the request
 */
function buildQueryString(parameters) {
  return Object.keys(parameters)
      .filter((key) => parameters[key])
      .map((key) => `${key}=${parameters[key]}`)
      .join('&');
}
