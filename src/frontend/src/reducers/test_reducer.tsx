import { AppAction } from '../actions/index';
import { AppState } from '../types/index';
import { FormReducer } from 'redux-form';

const initialState: AppState = {
  test: {},
  form: {} as FormReducer
};

export default function(state: AppState = initialState, action: AppAction ) {
  switch (action.type) {
    case 'TEST':
      return action.payload;
    default:
      return state;
  }
}
