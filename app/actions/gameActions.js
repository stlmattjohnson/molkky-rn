import {CREATE_PLAYER, CREATE_GAME, RECORD_SCORE, GAME_WON} from './types';

export const createPlayer = player => dispatch => {
  dispatch({type: CREATE_PLAYER, payload: player});
};

export const createGame = game => dispatch => {
  dispatch({type: CREATE_GAME, payload: game});
};

export const recordScore = (game, player, score) => dispatch => {
  dispatch({type: RECORD_SCORE, payload: {game, player, score}});
};

export const gameWon = (game, player) => dispatch => {
  dispatch({type: GAME_WON, payload: {game, player}});
};
