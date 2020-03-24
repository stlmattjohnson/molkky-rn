import {
  CREATE_PLAYER,
  CREATE_GAME,
  RECORD_SCORE,
  GAME_WON,
} from '../actions/types';
import {create} from 'react-test-renderer';

const initialState = {games: [], players: []};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_PLAYER:
      state.players.push(action.payload);
      return state;

    case CREATE_GAME:
      let game = action.payload;
      let createState = state;

      game = {
        ...game,
        players: game.players.map(player => {
          return {player, currentMisses: 0, currentPoints: 0};
        }),
      };

      createState.games.push(game);

      for (let p of game.players) {
        createState.players[p.player].totalGames++;
      }

      return state;

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

      return state;

    case GAME_WON:
      let finishedGameIndex = action.payload.game;
      let winningPlayerIndex = action.payload.player;

      let winState = state;

      winState.games[finishedGameIndex].active = false;
      winState.games[finishedGameIndex].winner =
        winState.players[
          winState.games[finishedGameIndex].players[winningPlayerIndex].player
        ].name;
      winState.players[
        winState.games[finishedGameIndex].players[winningPlayerIndex].player
      ].totalWins++;

      return state;

    default:
      return state;
  }
}
