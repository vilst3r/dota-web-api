# dota2_web_api

NodeJS Wrapper for the DotA 2 Web API written in ES6, - http://wiki.teamfortress.com/wiki/WebAPI#Dota_2.

## Usage
First get your personalised API key by following this link - http://steamcommunity.com/dev/apikey

From terminal/shell : 
``` 
npm install dota2_web_api
```


In source file : 

```javascript
  var dotaWebAPI = require('dota2_web_api');

  var api = new dotaWebAPI(<Your Steam API key>); 
```


### Responses
Every request to the API wrapper will return a promise of which you handle.
#### Get Match Details
Parameters:
  - match_id
```javascript
  api.getMatchDetails(parameters)
  .then(data => console.log(data);
```
#### Get League Listing
Note: The function responds by default with a english description of the leagues. Use this link  https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes to find appropriate values for the parameter


Parameters:
  - language (optional)
```javascript
  api.getLeagueListing(parameters)
  .then(data => console.log(data);
```
#### Get Live League Games
No Parameters
```javascript
  api.getLiveLeagueGames()
  .then(data => console.log(data);
```
#### Get Match History
Note: All parameters are optional but they must be set to null when parsing them to the function.
  - e.g. getMatchHistory(null, null, ... "1", null)


Parameters:
  - hero_id
  - game_mode
  - skill
  - minPlayers
  - account_id
  - league_id
  - start_at_match_id
  - matches_requested
  - tournament_games_only
```javascript
  api.getMatchHistory(parameters)
  .then(data => console.log(data);
```




