import { Reducer } from 'redux';

import {
  GpxState,
  GpxActionTypes
} from '@src/store/gpx/types';

import { AppActions } from '@src/store';

// These are equivalent
// const newState = Object.assign({}, state, {test: action.payload});
// const newState = {...state, test: action.payload};

export const initialState: GpxState = {
  newGpxSuccess: false,
  tracks: [],
};

const reducer: Reducer<GpxState> = (state: GpxState = initialState, action: AppActions) => {
  // We'll augment the action type on the switch case to make sure we have
  // all the cases handled.
  switch (action.type) {
    case GpxActionTypes.NEW_GPX:
      const { callback } = action.meta;
      if (callback) {
        action.meta.callback(action.payload);
      }
      return Object.assign({}, state, {newGpxSuccess: action.payload});
    case GpxActionTypes.GET_GPX:
      return Object.assign({}, state, {newGpxSuccess: false, tracks: action.payload});
    default:
      return state;
  }
};

export default reducer;
