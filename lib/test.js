/* Module */
var chai = require('chai');
var dotaWebAPI = require('../index'); // module entry point

/* Chai API */
var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

var myAPIKey = "1F72FF9BF1B0C1DF25A8CFA722DA0019";
var api = new dotaWebAPI(myAPIKey);

// fetches a existing match from the api
describe("getMatchDetails()", function() {
	var matchId = 3574415631

	it("should return a valid response containing the correct properties of the JSON object", done => {
		api.getMatchDetails(matchId)
		.then(data => {
			expect(data).to.have.property('result');
			assert.isAtLeast(Object.keys(data.result).length, 1, "Not a single result was returned from this request")
			assert(data.result.match_id, '3574415631');
			done()
		})
	})			
})

// fetches a existing league from the api
describe("getLeagueListing()", function() {
	it("should return a valid response containing the correct properties of the JSON object (english response)", done => {
		api.getLeagueListing()
		.then(data => {
			expect(data).to.have.property('result');
			assert.isAtLeast(Object.keys(data.result).length, 1, "Not a single result was returned from this request")

			assert.isAtLeast(Object.keys(data.result.leagues).length, 1, "Not a single league in the result");

			expect(data.result.leagues[3]).to.have.property('description');
			assert(data.result.leagues[3].description, "#DOTA_Item_desc_Wild_Cards_West")
			done();
		})	
	})


	it("should return a valid response containing the correct properties of the JSON object (german response)", done => {
		var german = "de";

		api.getLeagueListing(german)
		.then(data => {
			expect(data).to.have.property('result');
			assert.isAtLeast(Object.keys(data.result).length, 1, "Not a single result was returned from this request")

			assert.isAtLeast(Object.keys(data.result.leagues).length, 1, "Not a single league in the result");

			expect(data.result.leagues[3]).to.have.property('description');
			assert(data.result.leagues[3].description, "Sehen Sie acht der besten Dota-2-Teams zu, wie sie um einen Platz in The International kämpfen")
			done();
		})			
	})
})

// fetches a live league game (can only test through its spectator property which could be 0)
describe("getLiveLeagueGames()", function() {
	it("should return a valid response containing the correct properties of the JSON object", done => {
		api.getLiveLeagueGames()
		.then(data => {
			expect(data).to.have.property('result');
			assert.isAtLeast(Object.keys(data.result).length, 1, "Not a single result was returned from this request")
			
			expect(data.result.games[0]).to.have.property('spectators');
			done()
		})
	})	
})

// fetches the match history of my personal dota account
describe("getMatchHistory()", function() {
	it("should return a valid response given a hero_id parameter", done => {
		var numOfMatches = 1

		api.getMatchHistory(numOfMatches,null,null,null,null,null,null, null, null)
		.then(data => {
			expect(data).to.have.property('result');
			assert.isAtLeast(data.result.num_results, 1, "Not a single result was returned from this request")
			
			expect(data.result).to.have.property('matches');
			assert.isAtLeast(data.result.matches.length, 1, "Not a single match from this search request")
			assert.isAtMost(data.result.matches.length, 100, "Too many matches from this search request")

			var players = data.result.matches[0].players;

			var heroes = []
			players.forEach(function(e){
				e.hero_id === 1 ? heroes.push(e.hero_id): null
			})
			expect(heroes).to.have.members([1]);
			done()
		})
	})		

	it("should return a valid response given a user_id parameter", done => {
		var accId = 128432259
		api.getMatchHistory(null,null,null,null,accId,null,null, null, null)
		.then(data => {
			expect(data).to.have.property('result');
			assert.isAtLeast(data.result.num_results, 1, "Not a single result was returned from this request")
			
			expect(data.result).to.have.property('matches');
			assert.isAtLeast(data.result.matches.length, 1, "Not a single match from this search request")
			assert.isAtMost(data.result.matches.length, 100, "Too many matches from this search request")

			var players = data.result.matches[0].players;

			var users = []
			players.forEach(function(e){
				e.account_id === 128432259 ? users.push(e.account_id): null
			})
			expect(users).to.have.members([128432259]);		
			done()
		})
	})	
})

// fetches the match history from match ids 3000000
describe("getMatchHistoryBySequenceNumber()", function() {
	it("should return a valid response containing the correct properties of the JSON object", done => {
		var seqNumber = 3000000
		var numOfMatches = 10;		

		api.getMatchHistoryBySequenceNumber(seqNumber, numOfMatches)
		.then(data => {
			expect(data).to.have.property('result');
			assert.isAtLeast(Object.keys(data.result).length, 1, "Not a single result was returned from this request")
			
			assert.isAtLeast(data.result.matches[0].match_seq_num, 3000000)
			done()
		})
	})	
})

// // fetches all leagues between two timestamps (currently not working on the source web api)
// describe("getScheduledLeagueGames()", function() {
// 	it("should return a valid response containing the correct properties of the JSON object", done => {
// 		var currentTimeStamp = Math.round((new Date()).getTime() / 1000);
// 		var startOf2017 = 1483228800		

// 		api.getScheduledLeagueGames(currentTimeStamp, startOf2017)
// 		.then(data => {
// 			expect(data).to.have.property('result');
// 			assert.isAtLeast(Object.keys(data.result).length, 1, "Not a single result was returned from this request")
// 			console.log(data)
// 			done()
// 		})
// 	})	
// })

// fetches the team Na'Vi 
describe("getTeamInfo()", function() {
	it("should return a valid response containing the correct properties of the JSON object", done => {
		var startTeamId = 1
		var numOfTeams = 100;		

		api.getTeamInfo()
		.then(data => {
			expect(data).to.have.property('result');
			assert.isAtLeast(Object.keys(data.result).length, 1, "Not a single result was returned from this request")
			
			var result = data.result.teams;

			var teams = []
			result.forEach(function(e){
				teams.push(e.name)
			})
			expect(teams).to.include.members(["Natus Vincere"]);
			done()
		})
	})	
})

// fetches Puppey's stats from TI3 (database isn't up to date sometimes)
describe("getTournamentPlayerStats()", function() {
	it("should return a valid response containing the correct properties of the JSON object", done => {
		var accountId = 87278757;
		var leagueId = 65006

		api.getTournamentPlayerStats(accountId, leagueId)
		.then(data => {
			expect(data).to.have.property('result');
			assert.isAtLeast(Object.keys(data.result).length, 1, "Not a single result was returned from this request")
			
			assert(data.result.persona, "Puppey")
			done()
		})
	})	
})

// fetches the item boot
describe("getItems()", function() {
	it("should return a valid response containing the correct properties of the JSON object", done => {
		api.getItems()
		.then(data => {
			expect(data).to.have.property('result');
			assert.isAtLeast(Object.keys(data.result).length, 1, "Not a single result was returned from this request")

			var result = data.result.items

			var items = []
			result.forEach(function(e) {
				items.push(e.name)
			});

			expect(items).to.include.members(["item_boots"])
			done();
		})	
	})
})

// fetches boot form the request
describe("getHeroes()", function() {
	it("should return a valid response containing the correct properties of the JSON object", done => {
		api.getHeroes()
		.then(data => {
			expect(data).to.have.property('result');
			assert.isAtLeast(Object.keys(data.result).length, 1, "Not a single result was returned from this request")

			var result = data.result.heroes

			var heroes = []
			result.forEach(function(e) {
				heroes.push(e.name)
			});

			expect(heroes).to.include.members(["npc_dota_hero_antimage"])
			done();
		})	
	})
})
