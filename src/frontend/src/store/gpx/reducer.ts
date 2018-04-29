import { Reducer } from 'redux';

import {
  GPXState,
  GPXActionTypes
} from '@src/store/gpx/types';

import { AppActions } from '@src/store';

// These are equivalent
// const newState = Object.assign({}, state, {test: action.payload});
// const newState = {...state, test: action.payload};

// Type-safe initialState!
export const initialState: GPXState = {
  newGpxSuccess: false,
  tracks: [],
};

// Unfortunately, typing of the `action` parameter seems to be broken at the moment.
// This should be fixed in Redux 4.x, but for now, just augment your types.

const reducer: Reducer<GPXState> = (state: GPXState = initialState, action: AppActions) => {
  // We'll augment the action type on the switch case to make sure we have
  // all the cases handled.
  switch (action.type) {
    case GPXActionTypes.NEW_GPX:
      const { callback } = action.meta;
      if (callback) {
        action.meta.callback(action.payload);
      }
      return Object.assign({}, state, {newGpxSuccess: action.payload});
    case GPXActionTypes.GET_GPX:
      return Object.assign({}, state, {newGpxSuccess: false, tracks: action.payload});
    default:
      return state;
  }
};

export default reducer;
