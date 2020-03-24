import {ADD_PLAYER} from './types';

export const addPlayer = player => dispatch => {
  dispatch({type: ADD_PLAYER, payload: player});
};
