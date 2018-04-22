import { combineReducers, ReducersMapObject } from 'redux';

import gpx from '@src/reducers/gpx_reducer';

const reducers: ReducersMapObject = {
  gpx: gpx
};

export default combineReducers(reducers);
