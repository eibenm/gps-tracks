import { combineReducers } from 'redux';
import { AppState } from '../types/index';
import { reducer as formReducer } from 'redux-form';
import test from './test_reducer';

const rootReducer = combineReducers<AppState>({
  test: test,
  form: formReducer
});

export default rootReducer;