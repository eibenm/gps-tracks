import { AppActions, AppActionTypes } from '@src/actions';
import { AppState, initialState } from '@src/types';

// These are equivalent
// const newState = Object.assign({}, state, {test: action.payload});
// const newState = {...state, test: action.payload};

export default function(state: AppState = initialState, action: AppActions ) {

  window.console.log(`>>> action.type: ${action.type}`);

  switch (action.type) {
    case AppActionTypes.NEW_GPX:
      const { callback } = action.meta;
      if (callback) {
        action.meta.callback(action.payload);
      }
      return Object.assign({}, state, {newGpxSuccess: action.payload});
    case AppActionTypes.GET_GPX:
      return Object.assign({}, state, {newGpxSuccess: false, tracks: action.payload});
    default:
      return state.gpx;
  }
}
