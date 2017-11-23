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
	it("should return a valid response containing the correct properties of the JSON object", done => {
		api.getMatchDetails("3574415631")
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
		api.getLeagueListing("de")
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
		api.getMatchHistory("1",null,null,null,null,null,null, null, null)
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
		api.getMatchHistory(null,null,null,null,"128432259",null,null, null, null)
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