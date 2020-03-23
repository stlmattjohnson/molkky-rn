import {CHANGE_THEME, CHANGE_MODE, CHANGE_USE_DEVICE_MODE} from './types';

export const changeTheme = index => dispatch => {
  dispatch({type: CHANGE_THEME, payload: index});
};

export const changeMode = index => dispatch => {
  dispatch({type: CHANGE_MODE, payload: index});
};

export const changeDeviceMode = index => dispatch => {
  dispatch({type: CHANGE_USE_DEVICE_MODE, payload: index});
};
