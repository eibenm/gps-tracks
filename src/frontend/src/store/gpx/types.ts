import { Action } from 'redux';

// Our gpx-level state object

export type GPXState = {
  newGpxSuccess: boolean
  tracks: Track[]
};

// Other types

export type Track = {
  id: number;
  name: string;
  geojson: string;
};

export interface GPXFormData {
  name: string | null;
  file: File | null;
}

export type NewGpxCallback = (success: Promise<boolean> | boolean) => void;

// Actions

export enum GPXActionTypes {
  NEW_GPX = '@@gpx/NEW_GPX',
  GET_GPX = '@@gpx/GET_GPX',
}

export interface NewGPXAction extends Action {
  type: GPXActionTypes.NEW_GPX;
  payload: Promise<boolean>;
  meta: {
    callback: NewGpxCallback;
  };
}

export interface GetGPXAction extends Action {
  type: GPXActionTypes.GET_GPX;
  payload: Promise<object>;
}

export type GPXActions = NewGPXAction 
  | GetGPXAction;
