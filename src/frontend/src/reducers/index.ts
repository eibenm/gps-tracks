import { combineReducers, ReducersMapObject } from 'redux';
import { AppState } from '../types/index';

import gpx from './gpx_reducer';

const reducers: ReducersMapObject = {
  gpx: gpx
};

export default combineReducers<AppState>(reducers);
