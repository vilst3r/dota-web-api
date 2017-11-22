var rp = require('request-promise')

// API Constructor
var dotaWebAPI = function (apiKey) {
	this.apiKey = apiKey;
}

// API Methods
dotaWebAPI.prototype.printShit = function() {
	console.log("shit printed!");
}

dotaWebAP



module.exports = dotaWebAPI;