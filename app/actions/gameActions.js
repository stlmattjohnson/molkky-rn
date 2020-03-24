import {CREATE_GAME} from './types';

export const createGame = game => dispatch => {
  dispatch({type: CREATE_GAME, payload: game});
};
