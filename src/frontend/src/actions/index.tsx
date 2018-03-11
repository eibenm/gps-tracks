import { GPXFormData, NewGpxCallback } from '../types/index';

export enum AppActionKeys {
  NEW_GPX = 'NEW_GPX',
  NEW_GPX_FULFILLED = 'NEW_GPX_FULFILLED',
  GET_GPX = 'GET_GPX',
  GET_GPX_FULFILLED = 'GET_GPX_FULFILLED',
  OTHER_ACTION = '__any_other_action_type__'
}

interface NewGpxAction {
  type: AppActionKeys.NEW_GPX | AppActionKeys.NEW_GPX_FULFILLED;
  payload: Promise<boolean>;
  meta: {
    callback: NewGpxCallback
  };
}

interface GetGpxAction {
  type: AppActionKeys.GET_GPX | AppActionKeys.GET_GPX_FULFILLED;
  payload: Promise<object>;
}

interface OtherAction {
  type: AppActionKeys.OTHER_ACTION;
}

export type AppActions = NewGpxAction
  | GetGpxAction
  | OtherAction;

// GPX

export const newGpx = (data: GPXFormData, callback: NewGpxCallback): AppActions => {

  let formData = new FormData();
  formData.append('name', data.name as string);
  formData.append('file', data.file as File);

  const promise: Promise<boolean> = fetch('http://localhost:82/gpx_new.php', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .catch(error => window.console.log(`Error: ${error}`));

  return {
    type: AppActionKeys.NEW_GPX,
    payload: promise,
    meta: {
      callback: callback
    }
  };
};

export const getGpx = (): AppActions => {
  const promise: Promise<object> = fetch('http://localhost:82/gpx_get.php', {
    method: 'GET'
  })
  .then(response => response.json())
  .catch(error => window.console.log(`Error: ${error}`));

  return {
    type: AppActionKeys.GET_GPX,
    payload: promise
  };
};
