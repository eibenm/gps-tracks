import {
  createStore,
  applyMiddleware,
  Store,
  Middleware,
  AnyAction,
  Dispatch
} from 'redux';
import { AppState, rootReducer } from '@src/store';
import { promiseMiddleware } from '@src/middlewares/promise_middleware';
// import promiseMiddleware from 'redux-promise-middleware';

export default function configureStore(initialState: AppState): Store<AppState> {

  const middlewares: Array<Middleware> = [
    promiseMiddleware()
  ];

  // We'll create our store with the combined reducers and the initial Redux state that
  // we'll be passing from our entry point.
  return createStore<AppState, AnyAction, {
    dispatch: Dispatch<AnyAction>;
  }, {}>(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares)
  );
}
