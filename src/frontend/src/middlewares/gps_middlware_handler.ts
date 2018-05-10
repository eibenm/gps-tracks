import { MiddlewareAPI } from 'redux';
import { GpsApi } from '@src/api/gps_api';

import {
  GetGpxAction,
  GpxActionTypes,
  GpxFormData,
  NewGpxAction,
  NewGpxCallback
} from '@src/store/gpx/types';

import {
  AppAction,
  GpsApiHandler,
  NewGpxMeta
} from '@src/middlewares/gps_middleware';

export class GpsMiddlewareHandler extends GpsApiHandler {

  constructor(gpsApi: GpsApi) {
    super(gpsApi);
  }

  public newGpx(api: MiddlewareAPI, action: AppAction<NewGpxMeta>): void {
    const data: GpxFormData = action.meta!.data;
    const callback: NewGpxCallback = action.meta!.callback;
    this.gpsApi.newGpxAsync(data).then(value => {
      api.dispatch<NewGpxAction>({
        type: GpxActionTypes.NEW_GPX,
        payload: value,
        meta: {
          callback: callback
        }
      });
    }, err => {
      this.logError(err);
    });
  }

  public getGpx(api: MiddlewareAPI, action: AppAction<null>): void {
    this.gpsApi.getGpxAsync().then(value => {
      api.dispatch<GetGpxAction>({
        type: GpxActionTypes.GET_GPX,
        payload: value
      });
    }, err => {
      this.logError(err);
    });
  }

  private logError(err: Error) {
    window.console.error(`Error: ${err}`);
  }
}
