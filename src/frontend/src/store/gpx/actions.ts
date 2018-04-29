import { ActionCreator } from 'redux';

import {
  GPXActionTypes,
  NewGPXAction,
  GetGPXAction,
  GPXFormData,
  NewGpxCallback
} from '@src/store/gpx/types';

// Type these action creators with `: ActionCreator<ActionTypeYouWantToPass>`.
// Remember, you can also pass parameters into an action creator. Make sure to
// type them properly.

export const newGpx: ActionCreator<NewGPXAction> = (
  data: GPXFormData,
  callback: NewGpxCallback
) => {

  let formData = new FormData();
  formData.append('name', data.name as string);
  formData.append('file', data.file as File);

  const promise: Promise<boolean> = fetch('http://localhost:82/gpx_new.php', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json());

  return {
    type: GPXActionTypes.NEW_GPX,
    payload: promise,
    meta: {
      callback: callback,
    }
  };
};

export const getGpx: ActionCreator<GetGPXAction> = () => {
  const promise: Promise<object> = fetch('http://localhost:82/gpx_get.php', {
    method: 'GET'
  })
  .then(response => response.json());

  return {
    type: GPXActionTypes.GET_GPX,
    payload: promise,
  };
};
