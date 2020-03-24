import {combineReducers} from 'redux';
import settingReducer from './settingReducer';
import gameReducer from './gameReducer';

export default combineReducers({
  setting: settingReducer,
  data: gameReducer,
});
