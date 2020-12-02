import {assert} from 'chai';
import {DotaWebAPI} from '../lib/api';
import {ErrorMessages, ValidResources} from './utils';

let api;

before('API Setup', () => {
  console.log('Setting up configurations for API test...');
  api = new DotaWebAPI(ValidResources.apiKey);
});

describe('getMatchDetails()', () => {
  const requestMatchId = ValidResources.requestMatchId;

  it('should return a valid response containing the correct properties of ' +
    'the JSON object', async () => {
    try {
      const response = await api.getMatchDetails(requestMatchId);

      assert.exists(response.result, ErrorMessages.missingProp);
      assert.isAtLeast(Object.keys(response.result).length, 1,
          ErrorMessages.missingResult);

      assert.equal(response.result.match_id, requestMatchId,
          ErrorMessages.mismatchId);

      assert.exists(response.result.players, ErrorMessages.missingProp);
      assert.isArray(response.result.players, ErrorMessages.missingArrayType);
      assert.isAtLeast(response.result.players.length, 1,
          ErrorMessages.missingResult);
      assert.isAtMost(response.result.players.length, 10,
          ErrorMessages.tooManyResults);
    } catch (error) {
      assert(false, error);
    }
  });
});

describe('getLiveLeagueGames()', () => {
  it('should return a valid response containing the correct properties of ' +
    'the JSON object', async () => {
    try {
      const response = await api.getLiveLeagueGames();

      assert.exists(response.result, ErrorMessages.missingProp);
      assert.isAtLeast(Object.keys(response.result).length, 1,
          ErrorMessages.missingResult);

      assert.exists(response.result.games, ErrorMessages.missingProp);
      assert.isArray(response.result.games, ErrorMessages.missingArrayType);
      assert.isAtLeast(response.result.games.length, 1,
          ErrorMessages.missingResult);
      assert.exists(response.result.games[0].spectators,
          ErrorMessages.missingProp);
    } catch (error) {
      assert(false, error);
    }
  });
});

describe('getMatchHistory()', () => {
  it('should return a valid response given a hero_id parameter', async () => {
    const requestHeroId = ValidResources.requestHeroId;

    try {
      const response = await api.getMatchHistory(requestHeroId);
      assert.exists(response.result, ErrorMessages.missingProp);

      assert.exists(response.result.num_results, ErrorMessages.missingProp);
      assert.isAtLeast(response.result.num_results, 1,
          ErrorMessages.missingResult);

      assert.exists(response.result.matches, ErrorMessages.missingProp);
      assert.isArray(response.result.matches, ErrorMessages.missingArrayType);
      assert.isAtLeast(response.result.matches.length, 1,
          ErrorMessages.missingResult);

      assert.exists(response.result.matches[0].players,
          ErrorMessages.missingProp);

      const heroIds = response.result.matches[0].players
          .filter((item) => item.hero_id === requestHeroId);
      assert.isNotEmpty(heroIds, ErrorMessages.missingMembers);
    } catch (error) {
      assert(false, error);
    };
  });

  it('should return a valid response given a user_id parameter', async () => {
    const requestAccountId = ValidResources.requestAccountId;

    try {
      const response = await api.getMatchHistory(null, null, null, null,
          requestAccountId);
      assert.exists(response.result, ErrorMessages.missingProp);

      assert.exists(response.result.num_results, ErrorMessages.missingProp);
      assert.isAtLeast(response.result.num_results, 1,
          ErrorMessages.missingResult);

      assert.exists(response.result.matches, ErrorMessages.missingProp);
      assert.isArray(response.result.matches, ErrorMessages.missingArrayType);
      assert.isAtLeast(response.result.matches.length, 1,
          ErrorMessages.missingResult);

      assert.exists(response.result.matches[0].players,
          ErrorMessages.missingProp);

      const accountIds = response.result.matches[0].players
          .filter((item) => item.account_id === requestAccountId);
      assert.isNotEmpty(accountIds, ErrorMessages.missingMembers);
    } catch (error) {
      assert(false, error);
    }
  });

  it('should return a valid response given the number of matches ' +
    'requested', async () => {
    const requestNumberOfMatches = 10;

    try {
      const response = await api.getMatchHistory(null, null, null, null, null,
          null, null, requestNumberOfMatches);

      assert.exists(response.result, ErrorMessages.missingProp);

      assert.exists(response.result.num_results, ErrorMessages.missingProp);
      assert.isAtLeast(response.result.num_results, 1,
          ErrorMessages.missingResult);

      assert.exists(response.result.matches, ErrorMessages.missingProp);
      assert.isArray(response.result.matches, ErrorMessages.missingArrayType);
      assert.isAtLeast(response.result.matches.length, 1,
          ErrorMessages.missingResult);
      assert.isAtMost(response.result.matches.length, 10,
          ErrorMessages.tooManyResults);
    } catch (error) {
      assert(false, error);
    }
  });
});

describe('getMatchHistoryBySequenceNumber()', () => {
  it('should return a valid response containing the correct properties of ' +
    'the JSON object', async () => {
    const requestStartSeqNumber = 3000000;
    const requestNumberOfMatches = 10;

    try {
      const response = await api.getMatchHistoryBySequenceNumber(
          requestStartSeqNumber, requestNumberOfMatches);

      assert.exists(response.result, ErrorMessages.missingProp);
      assert.isAtLeast(Object.keys(response.result).length, 1,
          ErrorMessages.missingResult);

      assert.exists(response.result.matches, ErrorMessages.missingProp);
      assert.isArray(response.result.matches, ErrorMessages.missingArrayType);
      assert.isAtLeast(response.result.matches.length, 1,
          ErrorMessages.missingResult);

      assert.exists(response.result.matches[0].match_seq_num,
          ErrorMessages.missingProp);
      assert.isAtLeast(response.result.matches[0].match_seq_num,
          requestStartSeqNumber, ErrorMessages.mismatchId);
    } catch (error) {
      assert(false, error);
    }
  });
});

// @deprecated
// describe('getScheduledLeagueGames()', () => {
//   it('should return a valid response containing the correct properties of ' +
//   'the JSON object', async () => {
//     const requestDateMin = new Date('January 1, 2017 00:00:00').getTime();
//     const requestDateMax = new Date('January 1, 2018 00:00:00').getTime();

//     try {
//       const response = await api.getScheduledLeagueGames(
//           requestDateMin, requestDateMax);

//       assert.exists(response.result, ErrorMessages.missingProp);
//       assert.isAtLeast(Object.keys(response.result).length, 1,
//           ErrorMessages.missingResult);
//     } catch (error) {
//       assert(false, error);
//     }
//   });
// });

describe('getTeamInfo()', () => {
  it('should return a valid response containing the correct properties of ' +
    'the JSON object', async () => {
    try {
      const response = await api.getTeamInfo();

      assert.exists(response.result, ErrorMessages.missingProp);
      assert.isAtLeast(Object.keys(response.result).length, 1,
          ErrorMessages.missingResult);

      assert.exists(response.result.teams, ErrorMessages.missingProp);
      assert.isArray(response.result.teams, ErrorMessages.missingArrayType);
      assert.isAtLeast(response.result.teams.length, 1,
          ErrorMessages.missingResult);

      const team = response.result.teams
          .filter((team) => team.name === 'Natus Vincere');
      assert.isNotEmpty(team, ErrorMessages.missingMembers);
    } catch (error) {
      assert(false, error);
    }
  });
});

describe('getTournamentPlayerStats()', () => {
  it('should return a valid response containing the correct properties of ' +
    'the JSON object', async () => {
    const requestTournamentAccountId= ValidResources.requestTournamentAccountId;
    const requestLeagueId = ValidResources.requestLeagueId;

    try {
      const response = await api.getTournamentPlayerStats(
          requestTournamentAccountId, requestLeagueId);

      assert.exists(response.result, ErrorMessages.missingProp);
      assert.isAtLeast(Object.keys(response.result).length, 1,
          ErrorMessages.missingResult);

      assert.exists(response.result.persona, ErrorMessages.missingProp);
      assert.equal(response.result.persona, 'Puppey', ErrorMessages.mismatchId);
    } catch (error) {
      assert(false, error);
    }
  });
});

describe('getItems()', () => {
  it('should return a valid response containing the correct properties of ' +
    'the JSON object', async () => {
    const requestItem = ValidResources.requestItem;

    try {
      const response = await api.getItems();

      assert.exists(response.result, ErrorMessages.missingProp);
      assert.isAtLeast(Object.keys(response.result).length, 1,
          ErrorMessages.missingResult);

      assert.exists(response.result.items, ErrorMessages.missingProp);
      assert.isArray(response.result.items, ErrorMessages.missingArrayType);
      assert.isAtLeast(response.result.items.length, 1,
          ErrorMessages.missingResult);

      const items = response.result.items
          .filter((item) => item.name === requestItem);
      assert.isNotEmpty(items, ErrorMessages.missingMembers);
    } catch (error) {
      assert(false, error);
    }
  });
});

describe('getHeroes()', () => {
  it('should return a valid response containing the correct properties of ' +
  'the JSON object', async () => {
    const requestHero = ValidResources.requestHero;

    try {
      const response = await api.getHeroes();

      assert.exists(response.result, ErrorMessages.missingProp);
      assert.isAtLeast(Object.keys(response.result).length, 1,
          ErrorMessages.missingResult);

      assert.exists(response.result.heroes, ErrorMessages.missingProp);
      assert.isArray(response.result.heroes, ErrorMessages.missingArrayType);
      assert.isAtLeast(response.result.heroes.length, 1,
          ErrorMessages.missingResult);

      const heroes = response.result.heroes
          .filter((hero) => hero.name === requestHero);
      assert.isNotEmpty(heroes, ErrorMessages.missingMembers);
    } catch (error) {
      assert(false, error);
    }
  });
});
