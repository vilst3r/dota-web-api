import { assert, expect } from 'chai';
import { dotaWebAPI } from './api';

let api

let missingProp
let missingResult
let missingArrayType
let mismatchId
let tooManyResults
let missingMembers


before('API Setup', () => {
	console.log("Setting up configurations for API test...")
	api = new dotaWebAPI("272B58CE89E7A8FD84FE7D4B138966B4");
})

beforeEach('Error Message Setup', () => {
	missingProp = 'Response property does not exist'
	missingResult = 'Not a single result was returned from this request'
	missingArrayType = 'Property type is not an array'
	mismatchId = 'Resulting id does not match request parameter'
	tooManyResults = 'Too many results from this search request'
	missingMembers = 'Result array did not contain member related to the request parameter'
})

describe("getMatchDetails()", () => {
	const requestMatchId = 3574415631	
	
	it("should return a valid response containing the correct properties of the JSON object", done => {
		api.getMatchDetails(requestMatchId)
		.then(response => {
			assert.exists(response.result, missingProp)
			assert.isAtLeast(Object.keys(response.result).length, 1, missingResult)
			assert.equal(response.result.match_id, requestMatchId, mismatchId)

			assert.exists(response.result.players, missingProp)
			assert.isArray(response.result.players, missingArrayType)
			assert.isAtLeast(response.result.players.length, 1, missingResult)
			assert.isAtMost(response.result.players.length, 10, tooManyResults)
		})
		.then(() => done())
	})
})

describe("getLiveLeagueGames()", () => {
	it("should return a valid response containing the correct properties of the JSON object", done => {
		api.getLiveLeagueGames()
		.then(response => {
			assert.exists(response.result, missingProp)
			assert.isAtLeast(Object.keys(response.result).length, 1, missingResult)
			
			assert.exists(response.result.games, missingProp)
			assert.isArray(response.result.games, missingArrayType)
			assert.isAtLeast(response.result.games.length, 1, missingResult)

			assert.exists(response.result.games[0].spectators, missingProp)
		})
		.then(() => done())
	})	
})

describe("getMatchHistory()", () => {
	it("should return a valid response given a hero_id parameter", done => {
		const requestHeroId = 1

		api.getMatchHistory(requestHeroId)
		.then(response => {
			assert.exists(response.result, missingProp)
			
			assert.exists(response.result.num_results, missingProp)
			assert.isAtLeast(response.result.num_results, 1, missingResult)
			
			assert.exists(response.result.matches, missingProp)
			assert.isArray(response.result.matches, missingArrayType)
			assert.isAtLeast(response.result.matches.length, 1, missingResult)

			assert.exists(response.result.matches[0].players, missingProp)

			const heroIds = response.result.matches[0].players.filter(item => item.hero_id === requestHeroId)
			assert.isNotEmpty(heroIds, missingMembers)
		})
		.then(() => done())
	})		

	it("should return a valid response given a user_id parameter", done => {
		const requestAccId = 128432259

		api.getMatchHistory(null, null, null, null, requestAccId)
		.then(response => {
			assert.exists(response.result, missingProp)

			assert.exists(response.result.num_results, missingProp)
			assert.isAtLeast(response.result.num_results, 1, missingResult)

			assert.exists(response.result.matches, missingProp)
			assert.isArray(response.result.matches, missingArrayType)
			assert.isAtLeast(response.result.matches.length, 1, missingResult)

			assert.exists(response.result.matches[0].players, missingProp)

			const accIds = response.result.matches[0].players.filter(item => item.account_id === requestAccId)
			assert.isNotEmpty(accIds, missingMembers)
		})
		.then(() => done())
	})	

	it("should return a valid response given the number of matches requested", done => {
		const requestNumberOfMatches = 10

		api.getMatchHistory(null, null, null, null, null, null, null, requestNumberOfMatches)
		.then(response => {
			assert.exists(response.result, missingProp)

			assert.exists(response.result.num_results, missingProp)
			assert.isAtLeast(response.result.num_results, 1, missingResult)

			assert.exists(response.result.matches, missingProp)
			assert.isArray(response.result.matches, missingArrayType)
			assert.isAtLeast(response.result.matches.length, 1, missingResult)
			assert.isAtMost(response.result.matches.length, 10, tooManyResults) 
		})
		.then(() => done())
	})
})

describe("getMatchHistoryBySequenceNumber()", () => {
	it("should return a valid response containing the correct properties of the JSON object", done => {
		const requestStartSeqNumber = 3000000
		const requestNumberOfMatches = 10;		

		api.getMatchHistoryBySequenceNumber(requestStartSeqNumber, requestNumberOfMatches)
		.then(response => {
			assert.exists(response.result, missingProp)
			assert.isAtLeast(Object.keys(response.result).length, 1, missingResult)

			assert.exists(response.result.matches, missingProp)
			assert.isArray(response.result.matches, missingArrayType)
			assert.isAtLeast(response.result.matches.length, 1, missingResult)

			assert.exists(response.result.matches[0].match_seq_num, missingProp)
			assert.isAtLeast(response.result.matches[0].match_seq_num, requestStartSeqNumber, mismatchId)
		})
		.then(() => done())
	})	
})

// @deprecated
// describe("getScheduledLeagueGames()", () => {
// 	it("should return a valid response containing the correct properties of the JSON object", done => {
// 		const requestDateMin = new Date('January 1, 2017 00:00:00').getTime()
// 		const requestDateMax = new Date('January 1, 2018 00:00:00').getTime()

// 		api.getScheduledLeagueGames(requestDateMin, requestDateMax)
// 		.then(response => {
// 			assert.exists(response.result, missingProp)
// 			assert.isAtLeast(Object.keys(response.result).length, 1, missingResult)
// 		})
// 		.then(() => done())
// 	})	
// })

describe("getTeamInfo()", () => {
	it("should return a valid response containing the correct properties of the JSON object", done => {
		api.getTeamInfo()
		.then(response => {
			assert.exists(response.result, missingProp)
			assert.isAtLeast(Object.keys(response.result).length, 1, missingResult)

			assert.exists(response.result.teams, missingProp)
			assert.isArray(response.result.teams, missingArrayType)
			assert.isAtLeast(response.result.teams.length, 1, missingResult)

			const team = response.result.teams.filter(team => team.name === 'Natus Vincere')
			assert.isNotEmpty(team, missingMembers)
		})
		.then(() => done())
	})	
})

describe("getTournamentPlayerStats()", () => {
	it("should return a valid response containing the correct properties of the JSON object", done => {
		const requestAccountId = 87278757;
		const requestLeagueId = 65006

		api.getTournamentPlayerStats(requestAccountId, requestLeagueId)
		.then(response => {
			assert.exists(response.result, missingProp)
			assert.isAtLeast(Object.keys(response.result).length, 1, missingResult)

			assert.exists(response.result.persona, missingProp)
			assert.equal(response.result.persona, 'Puppey', mismatchId)
		})
		.then(() => done())
	})	
})

describe("getItems()", () => {
	it("should return a valid response containing the correct properties of the JSON object", done => {
		const requestItem = 'item_boots'

		api.getItems()
		.then(response => {
			assert.exists(response.result, missingProp)
			assert.isAtLeast(Object.keys(response.result).length, 1, missingResult)

			assert.exists(response.result.items, missingProp)
			assert.isArray(response.result.items, missingArrayType)
			assert.isAtLeast(response.result.items.length, 1, missingResult)
			
			const items = response.result.items.filter(item => item.name === requestItem)
			assert.isNotEmpty(items, missingMembers)
		})	
		.then(() => done())
	})
	
})

// fetches boot form the request
describe("getHeroes()", () => {
	it("should return a valid response containing the correct properties of the JSON object", done => {
		const requestHero = 'npc_dota_hero_antimage'

		api.getHeroes()
		.then(response => {
			assert.exists(response.result, missingProp)
			assert.isAtLeast(Object.keys(response.result).length, 1, missingResult)
			
			assert.exists(response.result.heroes, missingProp)
			assert.isArray(response.result.heroes, missingArrayType)
			assert.isAtLeast(response.result.heroes.length, 1, missingResult)

			const heroes = response.result.heroes.filter(hero => hero.name === requestHero)
			assert.isNotEmpty(heroes, missingMembers)
		})	
		.then(() => done())
	})
})
