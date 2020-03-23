import {
  CHANGE_THEME,
  CHANGE_MODE,
  CHANGE_USE_DEVICE_MODE,
} from '../actions/types';

const initialState = {
  darkMode: false,
  useDeviceMode: false,
  theme: 0,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CHANGE_THEME:
      return {
        ...state,
        theme: action.payload,
      };

    case CHANGE_MODE:
      return {
        ...state,
        darkMode: action.payload,
      };

    case CHANGE_USE_DEVICE_MODE:
      return {
        ...state,
        useDeviceMode: action.payload,
      };

    default:
      return state;
  }
}
