import { AppActions, AppActionKeys } from '../actions/index';

// These are equivalent
// const newState = Object.assign({}, state, {test: action.payload});
// const newState = {...state, test: action.payload};

export default function(state: object = {}, action: AppActions ) {
  switch (action.type) {
    case AppActionKeys.NEW_GPX_FULFILLED:
      return Object.assign({}, state, {newGpxSuccess: action.payload});
    default:
      return state;
  }
}
