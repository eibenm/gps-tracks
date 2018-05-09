import {
  Action,
  Dispatch,
  Middleware,
  MiddlewareAPI
} from 'redux';

import {
  GpxActionTypes,
  GpxFormData,
  NewGpxCallback
} from '@src/store/gpx/types';

import { GpsApi } from '@src/api/gps_api';

export interface AppAction<T> extends Action {
  meta?: T;
}

export interface NewGpxMeta {
  data: GpxFormData;
  callback: NewGpxCallback;
}

export function gpsMiddleware(handler: GpsApiHandler): Middleware {

  const actions = new Map<GpxActionTypes, Function>()
    .set(GpxActionTypes.NEW_GPX_REQUEST, handler.newGpx)
    .set(GpxActionTypes.GET_GPX_REQUEST, handler.getGpx);

  return (api: MiddlewareAPI) => (next: Dispatch) => <T>(action: AppAction<T>) => {
    if (actions.has(action.type)) {
      actions.get(action.type)!.apply(handler, [api, action]);
    }
    return next(action);  
  };
}

export abstract class GpsApiHandler {

  private _gpsApi: GpsApi;
  public get gpsApi() { return this._gpsApi; }

  constructor(gpsApi: GpsApi) {
    this._gpsApi = gpsApi;
  }

  abstract newGpx(api: MiddlewareAPI, action: AppAction<NewGpxMeta>): void;

  abstract getGpx(api: MiddlewareAPI, action: AppAction<null>): void;
}
