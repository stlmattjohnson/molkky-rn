import {CREATE_GAME} from '../actions/types';

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_GAME:
      let game = action.payload;
      game = {
        ...game,
        players: game.players.map((player, index) => {
          return {player, currentMisses: 0, currentPoints: 0};
        }),
      };

      state.push(game);

      return state;

    default:
      return state;
  }
}
