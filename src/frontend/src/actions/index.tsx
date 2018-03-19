import {
  AppAction,
  CallbackMeta,
  GPXFormData,
  NewGpxCallback
} from '../types/index';

export enum AppActionTypes {
  NEW_GPX = 'NEW_GPX',
  GET_GPX = 'GET_GPX',
  OTHER_ACTION = '__any_other_action_type__'
}

interface NewGpxAction extends AppAction<Promise<boolean>, CallbackMeta> {
  type: AppActionTypes.NEW_GPX;
  payload: Promise<boolean>;
  meta: CallbackMeta;
}

interface GetGpxAction extends AppAction<Promise<object>, null> {
  type: AppActionTypes.GET_GPX;
  payload: Promise<object>;
}

interface OtherAction extends AppAction<null, null> {
  type: AppActionTypes.OTHER_ACTION;
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
  .then(response => response.json());

  return {
    type: AppActionTypes.NEW_GPX,
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
  .then(response => response.json());

  return {
    type: AppActionTypes.GET_GPX,
    payload: promise
  };
};
