# dota-web-api

[![NPM
version](https://img.shields.io/npm/v/dota-web-api)](https://www.npmjs.com/package/dota-web-api)
[![NPM total
downloads](https://img.shields.io/npm/dt/dota2_web_api)](https://www.npmjs.com/package/dota-web-api)
[![Linux Build
Status](https://img.shields.io/travis/com/vilst3r/dota-web-api)](https://travis-ci.com/github/vilst3r/dota-web-api)

NodeJS Wrapper for the DotA 2 Web API written -
http://wiki.teamfortress.com/wiki/WebAPI#Dota_2.

## Usage
First get your personalised API key by following this link -
http://steamcommunity.com/dev/apikey

From terminal/shell :
```
npm install --save dota-web-api
```


In source file :

```javascript
  // server.js (NodeJS)
  let DotaWebAPI = require('dota-web-api');
  let api = new DotaWebAPI("Your Steam API key");

  api.getHeroes().
  then(data => console.log(data))
```


### Responses
Every request to the API wrapper will return a promise of which you handle.
#### Get Match Details
Get match detail by id

Parameters:
  - match_id

Usage:
```javascript
  const matchId = 3574415631;
  const response = await api.getMatchDetails(matchId);
  console.log(response);
  console.log(response.result.players[0]);
```

Output:
```
{
  result: {
    players: [
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object]
    ],
    radiant_win: true,
    duration: 3087,
    pre_game_duration: 90,
    start_time: 1511268571,
    match_id: 3574415631,
    match_seq_num: 3108849206,
    tower_status_radiant: 1846,
    tower_status_dire: 0,
    barracks_status_radiant: 63,
    barracks_status_dire: 0,
    cluster: 172,
    first_blood_time: 77,
    lobby_type: 7,
    human_players: 10,
    leagueid: 0,
    positive_votes: 0,
    negative_votes: 0,
    game_mode: 22,
    flags: 0,
    engine: 1,
    radiant_score: 52,
    dire_score: 41
  }
}

{
  account_id: 4294967295,
  player_slot: 0,
  hero_id: 79,
  item_0: 180,
  item_1: 46,
  item_2: 254,
  item_3: 102,
  item_4: 108,
  item_5: 36,
  backpack_0: 0,
  backpack_1: 0,
  backpack_2: 0,
  item_neutral: 0,
  kills: 6,
  deaths: 8,
  assists: 22,
  leaver_status: 0,
  last_hits: 99,
  denies: 3,
  gold_per_min: 358,
  xp_per_min: 666,
  level: 25
}
```

#### Get Live League Games
Retrieves league games from most recent to oldest.

No Parameters

Usage:
```javascript
  const response = await api.getLiveLeagueGames();
  console.log(response);
  console.log(response.result.games[0])
```

Output:
```
{
  result: {
    games: [
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object]
    ],
    status: 200
  }
}

{
  players: [
    {
      account_id: 202128398,
      name: '-(MYNAMEIVAN)',
      hero_id: 0,
      team: 4
    },
    { account_id: 200698317, name: 'Kyeota', hero_id: 0, team: 1 },
    { account_id: 231496755, name: 'Vz-', hero_id: 0, team: 1 },
    { account_id: 258370439, name: 'P!nk', hero_id: 0, team: 0 },
    { account_id: 277812252, name: 'Strelizia', hero_id: 0, team: 0 },
    { account_id: 370878753, name: '说谎者', hero_id: 0, team: 1 },
    { account_id: 198436921, name: '¡°·DMA¡', hero_id: 0, team: 0 },
    { account_id: 194295897, name: 'yourwife', hero_id: 0, team: 0 },
    { account_id: 456992947, name: 'SUNEO', hero_id: 0, team: 1 },
    { account_id: 162220523, name: 'L', hero_id: 0, team: 0 },
    { account_id: 165699712, name: '[R]aisa6690', hero_id: 0, team: 2 },
    { account_id: 863586444, name: 'aboy', hero_id: 0, team: 1 }
  ],
  radiant_team: {
    team_name: 'IRFAN GANTENG',
    team_id: 5143006,
    team_logo: 999179297226704300,
    complete: false
  },
  dire_team: {
    team_name: 'ABOY GAMING',
    team_id: 8144835,
    team_logo: 0,
    complete: false
  },
  lobby_id: 26958866250628464,
  match_id: 5726059230,
  spectators: 0,
  league_id: 12633,
  league_node_id: 0,
  stream_delay_s: 120,
  radiant_series_wins: 0,
  dire_series_wins: 0,
  series_type: 0,
  scoreboard: {
    duration: 2630.818115234375,
    roshan_respawn_timer: 0,
    radiant: {
      score: 0,
      tower_state: 1844,
      barracks_state: 63,
      picks: [Array],
      bans: [Array],
      players: [Array],
      abilities: [Array]
    },
    dire: {
      score: 0,
      tower_state: 1830,
      barracks_state: 63,
      picks: [Array],
      bans: [Array],
      players: [Array],
      abilities: [Array]
    }
  }
}
```
#### Get Match History
Get match history with optional parameters.

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

Usage:
```javascript
  const accId = 128432259
  const response = await api.getMatchHistory(null, null, null, null, accId);
  console.log(response);
  console.log(response.result.matches[0]);
```

Output:
```
{
  result: {
    status: 1,
    num_results: 100,
    total_results: 500,
    results_remaining: 400,
    matches: [
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object]
    ]
  }
}

{
  match_id: 5365775515,
  match_seq_num: 4498998378,
  start_time: 1587293214,
  lobby_type: 0,
  radiant_team_id: 0,
  dire_team_id: 0,
  players: [
    { account_id: 84332844, player_slot: 0, hero_id: 106 },
    { account_id: 9102784, player_slot: 1, hero_id: 126 },
    { account_id: 2433328, player_slot: 2, hero_id: 18 },
    { account_id: 4294967295, player_slot: 3, hero_id: 68 },
    { account_id: 162516, player_slot: 4, hero_id: 69 },
    { account_id: 397438367, player_slot: 128, hero_id: 50 },
    { account_id: 211661719, player_slot: 129, hero_id: 14 },
    { account_id: 402121290, player_slot: 130, hero_id: 39 },
    { account_id: 128432259, player_slot: 131, hero_id: 10 },
    { account_id: 383401850, player_slot: 132, hero_id: 2 }
  ]
}

```
#### Get Match History By Sequence Number
Get match history starting from a lower bound ID plus the number of matches

Parameters:
  - startMatchSeqNum
  - matchesRequested

Usage:
```javascript
    const startSeqNum = 3000000
    const numOfMatches = 10
    const response = await api.getMatchHistoryBySequenceNumber(3000000,
        numOfMatches)
    console.log(response);
    console.log(response.result.matches[0]);
 ```

Output:
```
{
  result: {
    status: 1,
    matches: [
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object]
    ]
  }
}

{
  players: [
    {
      account_id: 4294967295,
      player_slot: 0,
      hero_id: 1,
      item_0: 31,
      item_1: 46,
      item_2: 145,
      item_3: 63,
      item_4: 147,
      item_5: 0,
      backpack_0: 0,
      backpack_1: 0,
      backpack_2: 0,
      item_neutral: 0,
      kills: 4,
      deaths: 6,
      assists: 6,
      leaver_status: 0,
      last_hits: 180,
      denies: 36,
      gold_per_min: 454,
      xp_per_min: 471,
      level: 18
    },
    {
      account_id: 4294967295,
      player_slot: 1,
      hero_id: 39,
      item_0: 96,
      item_1: 77,
      item_2: 77,
      item_3: 60,
      item_4: 63,
      item_5: 46,
      backpack_0: 0,
      backpack_1: 0,
      backpack_2: 0,
      item_neutral: 0,
      kills: 8,
      deaths: 2,
      assists: 21,
      leaver_status: 0,
      last_hits: 81,
      denies: 8,
      gold_per_min: 379,
      xp_per_min: 648,
      level: 21
    },
    {
      account_id: 4294967295,
      player_slot: 2,
      hero_id: 38,
      item_0: 41,
      item_1: 194,
      item_2: 88,
      item_3: 63,
      item_4: 9,
      item_5: 117,
      backpack_0: 0,
      backpack_1: 0,
      backpack_2: 0,
      item_neutral: 0,
      kills: 9,
      deaths: 5,
      assists: 17,
      leaver_status: 0,
      last_hits: 129,
      denies: 16,
      gold_per_min: 430,
      xp_per_min: 576,
      level: 20
    },
    {
      account_id: 4294967295,
      player_slot: 3,
      hero_id: 53,
      item_0: 96,
      item_1: 33,
      item_2: 63,
      item_3: 108,
      item_4: 65,
      item_5: 8,
      backpack_0: 0,
      backpack_1: 0,
      backpack_2: 0,
      item_neutral: 0,
      kills: 3,
      deaths: 3,
      assists: 21,
      leaver_status: 0,
      last_hits: 241,
      denies: 4,
      gold_per_min: 535,
      xp_per_min: 575,
      level: 20
    },
    {
      account_id: 2807504,
      player_slot: 4,
      hero_id: 30,
      item_0: 48,
      item_1: 42,
      item_2: 46,
      item_3: 57,
      item_4: 73,
      item_5: 69,
      backpack_0: 0,
      backpack_1: 0,
      backpack_2: 0,
      item_neutral: 0,
      kills: 15,
      deaths: 5,
      assists: 14,
      leaver_status: 0,
      last_hits: 39,
      denies: 2,
      gold_per_min: 338,
      xp_per_min: 446,
      level: 17
    },
    {
      account_id: 22268895,
      player_slot: 128,
      hero_id: 25,
      item_0: 79,
      item_1: 46,
      item_2: 29,
      item_3: 36,
      item_4: 42,
      item_5: 0,
      backpack_0: 0,
      backpack_1: 0,
      backpack_2: 0,
      item_neutral: 0,
      kills: 2,
      deaths: 7,
      assists: 9,
      leaver_status: 0,
      last_hits: 50,
      denies: 7,
      gold_per_min: 194,
      xp_per_min: 359,
      level: 16
    },
    {
      account_id: 91950980,
      player_slot: 129,
      hero_id: 13,
      item_0: 104,
      item_1: 1,
      item_2: 41,
      item_3: 63,
      item_4: 88,
      item_5: 42,
      backpack_0: 0,
      backpack_1: 0,
      backpack_2: 0,
      item_neutral: 0,
      kills: 6,
      deaths: 8,
      assists: 5,
      leaver_status: 0,
      last_hits: 132,
      denies: 5,
      gold_per_min: 308,
      xp_per_min: 575,
      level: 20
    },
    {
      account_id: 4294967295,
      player_slot: 130,
      hero_id: 41,
      item_0: 172,
      item_1: 145,
      item_2: 0,
      item_3: 36,
      item_4: 63,
      item_5: 11,
      backpack_0: 0,
      backpack_1: 0,
      backpack_2: 0,
      item_neutral: 0,
      kills: 7,
      deaths: 8,
      assists: 4,
      leaver_status: 0,
      last_hits: 141,
      denies: 16,
      gold_per_min: 313,
      xp_per_min: 502,
      level: 19
    },
    {
      account_id: 89268074,
      player_slot: 131,
      hero_id: 29,
      item_0: 125,
      item_1: 63,
      item_2: 0,
      item_3: 0,
      item_4: 44,
      item_5: 0,
      backpack_0: 0,
      backpack_1: 0,
      backpack_2: 0,
      item_neutral: 0,
      kills: 1,
      deaths: 10,
      assists: 8,
      leaver_status: 0,
      last_hits: 31,
      denies: 0,
      gold_per_min: 153,
      xp_per_min: 307,
      level: 14
    },
    {
      account_id: 4294967295,
      player_slot: 132,
      hero_id: 70,
      item_0: 50,
      item_1: 11,
      item_2: 125,
      item_3: 152,
      item_4: 81,
      item_5: 7,
      backpack_0: 0,
      backpack_1: 0,
      backpack_2: 0,
      item_neutral: 0,
      kills: 3,
      deaths: 6,
      assists: 2,
      leaver_status: 0,
      last_hits: 150,
      denies: 0,
      gold_per_min: 321,
      xp_per_min: 462,
      level: 18
    }
  ],
  radiant_win: true,
  duration: 2266,
  pre_game_duration: 0,
  start_time: 1326128100,
  match_id: 3001608,
  match_seq_num: 3000000,
  tower_status_radiant: 1983,
  tower_status_dire: 0,
  barracks_status_radiant: 63,
  barracks_status_dire: 2,
  cluster: 131,
  first_blood_time: 199,
  lobby_type: 0,
  human_players: 10,
  leagueid: 0,
  positive_votes: 0,
  negative_votes: 0,
  game_mode: 0,
  flags: 0,
  engine: 0,
  radiant_score: 0,
  dire_score: 0
}
```
#### Get Team Info
Get professional team information based on ID

Parameters:
  - startTeamId
  - teamsRequested

Usage:
```javascript
    const response = await api.getTeamInfo(1, 100);
    console.log(response);
    console.log(response.result.teams[0]);
```

Output:
```
{
  result: {
    status: 1,
    teams: [
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object]
    ]
  }
}

{
  name: 'Zenith',
  tag: 'Zenith',
  time_created: 1338330222,
  logo: 711904559424929200,
  logo_sponsor: 711904559424929700,
  country_code: 'sg',
  url: 'www.dota2.com.sg',
  games_played: 439,
  player_0_account_id: 84772440,
  player_1_account_id: 85417034,
  player_2_account_id: 86011339,
  admin_account_id: 86011339
}
```
#### Get Tournament Player stats
Get tournament stats for a professional player

Parameters:
  - accountId
  - leagueId
  - heroId (optional)
  - timeFrame (optional)

Usage:
```javascript
    let accountId = 87278757 // NaVi.Puppey
    let leagueId = 65006     // TI3
    const response = await api.getTournamentPlayerStats(accountId, leagueId)
    console.log(response);
    console.log(response.result.matches[0]);
```

Output:
```
{
  result: {
    status: 1,
    matches: [
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object]
    ],
    account_id: 87278757,
    persona: 'Puppey',
    num_results: 31,
    wins: 20,
    losses: 11,
    kills: 57,
    deaths: 118,
    assists: 290,
    kills_average: 1.8387096774193548,
    deaths_average: 3.806451612903226,
    assists_average: 9.35483870967742,
    gpm_average: 262.61290322580646,
    xpm_average: 269.06451612903226,
    networth_average: 0,
    last_hits_average: 69.45161290322581,
    best_kills: 6,
    best_kills_heroid: 58,
    best_gpm: 445,
    best_gpm_heroid: 33,
    best_networth: 0,
    best_networth_heroid: 0,
    heroes_played: [
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object]
    ]
  }
}

{
  player_slot: 0,
  hero_id: 33,
  item_0: 178,
  item_1: 116,
  item_2: 79,
  item_3: 40,
  item_4: 48,
  item_5: 1,
  backpack_0: 0,
  backpack_1: 0,
  backpack_2: 0,
  item_neutral: 0,
  kills: 1,
  deaths: 3,
  assists: 11,
  last_hits: 193,
  denies: 4,
  gold_per_min: 339,
  xp_per_min: 361,
  level: 17,
  networth: 0,
  win: false,
  match_id: '271145478',
  duration: 2625
}
```
#### Get Items
Map of item name to item objects

Usage:
```javascript
    const items = await api.getItems();
    console.log(items.blink);
    console.log(items.blink.cost);
    console.log(items.blink.images.lg);

```

Output:
```
{
  id: 1,
  name: 'item_blink',
  cost: 2250,
  secret_shop: 0,
  side_shop: 0,
  recipe: 0,
  localized_name: 'blink',
  images: { lg: 'http://cdn.dota2.com/apps/dota2/images/items/blink_lg.png' }
}
2250
http://cdn.dota2.com/apps/dota2/images/items/blink_lg.png
```
#### Get Heroes
Map of hero item to hero objects

Usage:
```javascript
    const heroes = await api.getHeroes();
    console.log(heroes.naga_siren);
    console.log(heroes.naga_siren.id);
    console.log(heroes.naga_siren.images.full);
```

Output:
```
{
  name: 'npc_dota_hero_naga_siren',
  id: 89,
  localized_name: 'naga_siren',
  images: {
    sb: 'http://cdn.dota2.com/apps/dota2/images/heroes/naga_siren_sb.png',
    lg: 'http://cdn.dota2.com/apps/dota2/images/heroes/naga_siren_lg.png',
    full: 'http://cdn.dota2.com/apps/dota2/images/heroes/naga_siren_full.png',
    vert: 'http://cdn.dota2.com/apps/dota2/images/heroes/naga_siren_vert.jpg'
  }
}
89
http://cdn.dota2.com/apps/dota2/images/heroes/naga_siren_full.png
```
