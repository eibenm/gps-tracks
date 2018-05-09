import {
  createStore,
  applyMiddleware,
  Store,
  Middleware,
  AnyAction,
  Dispatch
} from 'redux';
import { AppState, rootReducer } from '@src/store';
import { gpsMiddleware } from '@src/middlewares/gps_middleware';
import { GpsMiddlewareHandler } from '@src/middlewares/gps_middlware_handler';
import { promiseMiddleware } from '@src/middlewares/promise_middleware';
import { GpsApi } from '@src/api/gps_api';

export default function configureStore(initialState: AppState): Store<AppState> {

  const gpsApi = new GpsApi();

  const middlewares: Array<Middleware> = [
    gpsMiddleware(new GpsMiddlewareHandler(gpsApi)),
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
