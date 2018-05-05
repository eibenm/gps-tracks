// Inspired By:
// https://dev.to/resir014/a-type-safe-approach-to-redux-stores-in-typescript--5ajm

import {
  combineReducers,
  Action,
  AnyAction,
  Reducer
} from 'redux';

import { GPXActions, GpxState } from '@src/store/gpx/types';
import gpxReducer from '@src/store/gpx/reducer';

// The top-level state object
export interface AppState {
  gpx: GpxState;
}

interface OtherAction extends Action {
  type: '__any_other_action_type__';
}

// The top-level actions type
export type AppActions = GPXActions | OtherAction;

// Whenever an action is dispatched, Redux will update each top-level application state property
// using the reducer with the matching name. It's important that the names match exactly, and that
// the reducer acts on the corresponding ApplicationState property type.
export const rootReducer: Reducer<AppState> = combineReducers<AppState, AnyAction>({
  gpx: gpxReducer
});
