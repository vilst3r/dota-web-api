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
#### Get Match History By Sequence Number
Parameters:
  - startMatchSeqNum
  - matchesRequested
```javascript
api.getMatchHistoryBySequenceNumber(parameters)
 .then(data => console.log(data);
 ```
#### Get Team Info
Note: At the time of testing, some teams were missing from the production db, it may not be up to date


Parameters:
  - startTeamId
  - teamsRequested
```javascript
  api.getTeamInfo(parameters)
  .then(data => console.log(data);
```
#### Get Tournament Player stats
Note: At the time of testing, only players up to TI4 were available, it may not be up to date
 
 
Parameters:
  - accountId
  - leagueId
  - heroId
  - timeFrame
```javascript
  api.getTeamInfo(parameters)
  .then(data => console.log(data);
```
#### Get Items
Parameters:
  - lang
```javascript
  api.getItems(parameters)
  .then(data => console.log(data);
```
#### Get Item Icon
Note: Use getItems() to get the correct item name parameter to use this


Parameters:
  - name
```javascript
  api.getItems(parameters)
  .then(data => {
    var item = data.result.items[0].name;
    api.getItems(item)
    .then(url => console.log(url))
  }
```
#### Get Heroes
Parameters:
  - lang
  - ifItemized (1 or 0 value)
```javascript
  api.getHeroes(parameters)
  .then(data => console.log(data);
```
#### Get Hero Icon
Note: Similarly like getItemIcon(), use getHeroes() to get the correct hero name parameter to use this


Parameters:
  - name
  - size (available sizes: "sb.png", "lg.png", "full.png", "vert.jpg")
```javascript
  api.getHeroes(parameters)
  .then(data => {
    var hero = data.result.heroes[0].name;
    api.getHeroIconPath(hero, "full.png")
    .then(url => console.log(url))
  }
```  
