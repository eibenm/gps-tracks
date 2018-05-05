import { ActionCreator } from 'redux';

import {
  GpxActionTypes,
  NewGpxActionRequest,
  GetGpxActionRequest,
  GpxFormData,
  NewGpxCallback
} from '@src/store/gpx/types';

// Type these action creators with `: ActionCreator<ActionTypeYouWantToPass>`.
// Remember, you can also pass parameters into an action creator. Make sure to
// type them properly.

export const newGpx: ActionCreator<NewGpxActionRequest> = (
  data: GpxFormData,
  callback: NewGpxCallback
) => {
  return {
    type: GpxActionTypes.NEW_GPX_REQUEST,
    meta: {
      callback: callback,
      data: data
    }
  };
};

export const getGpx: ActionCreator<GetGpxActionRequest> = () => {
  return {
    type: GpxActionTypes.GET_GPX_REQUEST
  };
};
