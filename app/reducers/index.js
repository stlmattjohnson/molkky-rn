import {combineReducers} from 'redux';
import settingReducer from './settingReducer';
import playerReducer from './playerReducer';
import gameReducer from './gameReducer';

export default combineReducers({
  setting: settingReducer,
  players: playerReducer,
  games: gameReducer,
});
