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
    api.dispatch<NewGpxAction>({
      type: GpxActionTypes.NEW_GPX,
      payload: this.gpsApi.newGpx(data),
      meta: {
        callback: callback
      }
    });
  }

  public getGpx(api: MiddlewareAPI, action: AppAction<null>): void {
    api.dispatch<GetGpxAction>({
      type: GpxActionTypes.GET_GPX,
      payload: this.gpsApi.getGpx()
    });
  }
}
