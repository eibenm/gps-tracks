import { combineReducers, ReducersMapObject } from 'redux';
import { AppState } from '../types/index';

import test from './test_reducer';
import gpx from './gpx_reducer';

const reducers: ReducersMapObject = {
  test: test,
  gpx: gpx
};

export default combineReducers<AppState>(reducers);
