import {
  CREATE_PLAYER,
  CREATE_GAME,
  RECORD_SCORE,
  GAME_WON,
} from '../actions/types';

const initialState = {games: [], players: []};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_PLAYER:
      return {...state, players: [...state.players, action.payload]};

    case CREATE_GAME:
      let game = action.payload;
      let createState = state;

      game = {
        ...game,
        players: game.players.map(player => {
          return {player, currentMisses: 0, currentPoints: 0};
        }),
      };

      for (let p of game.players) {
        createState.players[p.player].totalGames++;
      }

      return {
        ...state,
        games: [...state.games, game],
        players: [...createState.players],
      };

    case RECORD_SCORE:
      let gameIndex = action.payload.game;
      let playerIndex = action.payload.player;
      let score = action.payload.score;
      let currentPoints =
        state.games[gameIndex].players[playerIndex].currentPoints;

      let newState = state;

      if (score === 0) {
        newState.games[gameIndex].players[playerIndex].currentMisses++;
        newState.players[newState.games[gameIndex].players[playerIndex].player]
          .totalMisses++;
      } else {
        newState.games[gameIndex].players[playerIndex].currentMisses = 0;

        if (currentPoints + score > 50) {
          newState.games[gameIndex].players[playerIndex].currentPoints = 25;
        } else {
          newState.games[gameIndex].players[playerIndex].currentPoints =
            newState.games[gameIndex].players[playerIndex].currentPoints +
            score;
        }
      }

      newState.players[
        newState.games[gameIndex].players[playerIndex].player
      ].totalPoints =
        newState.players[newState.games[gameIndex].players[playerIndex].player]
          .totalPoints + score;

      newState.players[newState.games[gameIndex].players[playerIndex].player]
        .totalThrows++;

      newState.games[gameIndex].totalThrows++;

      return {
        ...state,
        games: [...newState.games],
        players: [...newState.players],
      };

    case GAME_WON:
      let finishedGameIndex = action.payload.game;
      let winningPlayerIndex = action.payload.player;

      let winState = state;

      winState.games[finishedGameIndex].active = false;
      winState.games[finishedGameIndex].winner =
        winState.players[winningPlayerIndex].name;
      winState.players[winningPlayerIndex].totalWins++;

      return {
        ...state,
        games: [...winState.games],
        players: [...winState.players],
      };

    default:
      return state;
  }
}
