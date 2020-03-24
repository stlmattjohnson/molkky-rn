import {ADD_PLAYER} from '../actions/types';

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_PLAYER:
      state.push(action.payload);
      return state;

    default:
      return state;
  }
}
