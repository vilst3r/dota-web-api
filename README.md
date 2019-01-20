# dota2-web-api

NodeJS Wrapper for the DotA 2 Web API written in ES6, - http://wiki.teamfortress.com/wiki/WebAPI#Dota_2.

## Usage
First get your personalised API key by following this link - http://steamcommunity.com/dev/apikey

From terminal/shell : 
``` 
npm install --save dota2-web-api
```


In source file : 

```javascript
  let dotaWebAPI = require('dota2-web-api');

  let api = new dotaWebAPI("Your Steam API key"); 
```


### Responses
Every request to the API wrapper will return a promise of which you handle.
#### Get Match Details
Parameters:
  - match_id
```javascript
  const matchId = 3574415631
  api.getMatchDetails(matchId)
  .then(data => console.log(data.result));
```
#### Get League Listing - Deprecated
Note: The function responds by default with a english description of the leagues. Use this link  https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes to find appropriate values for the parameter


Parameters:
  - language (optional)
```javascript
  api.getLeagueListing()
  .then(data => console.log(data.result.leagues[0].description));
```
#### Get Live League Games
No Parameters
```javascript
  api.getLiveLeagueGames()
  .then(data => console.log(data.result.games[0])) // should be the most recent;
```
#### Get Match History
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
  const accId = 128432259
  api.getMatchHistory(null, null, null, null, accId)
  .then(data => 
    data.result.matches.map((item, key) =>
      console.log(item) // printing matches of accId (default limit of 200 results)
    )
  )
```
#### Get Match History By Sequence Number
Parameters:
  - startMatchSeqNum
  - matchesRequested
```javascript
const startSeqNum = 3000000
const numOfMatches = 10
api.getMatchHistoryBySequenceNumber(3000000, numOfMatches)
 .then(data => 
    data.result.matches.map((item,key) =>
      console.log(item) // printing match details from id 3000000
    )
 );
 ```
#### Get Team Info
Parameters:
  - startTeamId
  - teamsRequested
```javascript
  api.getTeamInfo(1, 100)
  .then(data => console.log(data.result.teams);
```
#### Get Tournament Player stats
Parameters:
  - accountId
  - leagueId 
  - heroId (optional)
  - timeFrame (optional)
```javascript
  let accountId = 87278757 // NaVi.Puppey
  let leagueId = 65006     // TI3
  api.getTournamentPlayerStats(accountId, leagueId)
  .then(data => {
    console.log(data.result)
    console.log(data.result.persona)
  }
```
#### Get Items
Parameters:
  - lang
```javascript
  api.getItems()
  .then(data => 
    data.result.items.map((item, key) =>
      console.log(item)
    )
  );
```
#### Get Item Icon
Note: This returns a string url path and not a promise object. Use getItems() to get the correct item name parameter to use this

Parameters:
  - name
```javascript
  api.getItems("item_boots")
  .then(data => {
    const item = data.result.items[0];
    const url = api.getItems(item.name)
    
    item.icon_url = url;
  })
```
#### Get Heroes
Parameters:
  - lang (optional)
  - ifItemized (optional : 1 or 0 value)
```javascript
  api.getHeroes()
  .then(data => 
    data.result.heroes.map((item, key) =>
      console.log(item.name)
    )
  );
```
#### Get Hero Icon
Note: Similarly like getItemIcon(), use getHeroes() to get the correct hero name parameter to use this. Also returns a string url path rather than a promise object.

Parameters:
  - name
  - size (available sizes: "sb.png", "lg.png", "full.png", "vert.jpg")
```javascript
  api.getHeroes("npc_dota_hero_abaddon")
  .then(data => {
    const hero = data.result.heroes[0];
    const url = api.getHeroIconPath(hero.name, "full.png")
    
    hero.icon_url = url
  })
```  
