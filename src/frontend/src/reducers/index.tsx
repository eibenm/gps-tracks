import { combineReducers } from 'redux';
import { AppState } from '../types/index';
import test from './test_reducer';

const rootReducer = combineReducers<AppState>({
  test: test
});

export default rootReducer;