import { Action } from 'redux';

// Our gpx-level state object

export type GpxState = {
  newGpxSuccess: boolean
  tracks: Track[]
};

// Other types

export type Track = {
  id: number;
  name: string;
  geojson: string;
};

export interface GpxFormData {
  name: string | null;
  file: File | null;
}

export type NewGpxCallback = (success: Promise<boolean> | boolean) => void;

// Actions

export enum GpxActionTypes {
  NEW_GPX = '@@gpx/NEW_GPX',
  NEW_GPX_REQUEST = '@@gpx/NEW_GPX_REQUEST',
  GET_GPX = '@@gpx/GET_GPX',
  GET_GPX_REQUEST = '@@gpx/GET_GPX_REQUEST',
}

// ACTION REQUESTS

export interface NewGpxActionRequest extends Action {
  type: GpxActionTypes.NEW_GPX_REQUEST;
  meta: {
    callback: NewGpxCallback;
  };
}

export interface GetGpxActionRequest extends Action {
  type: GpxActionTypes.GET_GPX_REQUEST;
}

// ACTIONS

export interface NewGpxAction extends Action {
  type: GpxActionTypes.NEW_GPX;
  payload: Promise<boolean>;
  meta: {
    callback: NewGpxCallback;
  };
}

export interface GetGpxAction extends Action {
  type: GpxActionTypes.GET_GPX;
  payload: Promise<object>;
}

// GPXActions

export type GPXActions = NewGpxAction
  | NewGpxActionRequest
  | GetGpxAction
  | GetGpxActionRequest;
