import { GPXFormData } from '../components/Form';

export enum AppActionKeys {
  TEST = 'TEST',
  TEST_FULFILLED = 'TEST_FULFILLED',
  NEW_GPX = 'NEW_GPX',
  NEW_GPX_FULFILLED = 'NEW_GPX_FULFILLED',
  OTHER_ACTION = '__any_other_action_type__'
}

export interface GetTestAction {
  type: AppActionKeys.TEST | AppActionKeys.TEST_FULFILLED;
  payload: Promise<object>;
}

interface GetNewGpxAction {
  type: AppActionKeys.NEW_GPX | AppActionKeys.NEW_GPX_FULFILLED;
  payload: Promise<object>;
}

export interface OtherAction {
  type: AppActionKeys.OTHER_ACTION;
}

export type AppActions = GetTestAction
  | GetNewGpxAction
  | OtherAction;

// Test

export const getTest = (): AppActions => {

  const promise: Promise<object> = fetch('http://localhost:82/test.php', {
    method: 'GET'
  }).then(response => response.json());

  return {
    type: AppActionKeys.TEST,
    payload: promise
  };
};

// GPX

export const newGpx = (data: GPXFormData): AppActions => {

  let formData = new FormData();
  formData.append('name', data.name as string);
  formData.append('file', data.file as File);

  const promise: Promise<object> = fetch('http://localhost:82/gpx.php', {
    method: 'POST',
    body: formData
  }).then(response => response.json());

  return {
    type: AppActionKeys.NEW_GPX,
    payload: promise
  };
};
