import { combineReducers, ReducersMapObject } from 'redux';

import gpx from './gpx_reducer';

const reducers: ReducersMapObject = {
  gpx: gpx
};

export default combineReducers(reducers);
