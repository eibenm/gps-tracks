import { AppAction } from '../actions/index';
import { AppState } from '../types/index';

const initialState: AppState = {
  test: {}
};

export default function(state: AppState = initialState, action: AppAction ) {
  switch (action.type) {
    case 'TEST':
      return action.payload;
    default:
      return state;
  }
}
