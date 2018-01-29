import { combineReducers } from 'redux';
import test from './test_reducer';

const rootReducer = combineReducers({
  test: test
});

export default rootReducer;