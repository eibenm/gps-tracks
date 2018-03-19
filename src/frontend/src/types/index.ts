import { Action } from 'redux';

// App State

export type Track = {
  id: number;
  name: string;
  geojson: string;
};

export type Gpx = {
  newGpxSuccess: boolean
  tracks: Track[]
};

export type AppState = {
  gpx: Gpx;
};

// Initial App State

export const initialState: AppState = {
  gpx: {
    newGpxSuccess: false,
    tracks: []
  }
};

// --------------

export interface GPXFormData {
  name: string | null;
  file: File | null;
}

export interface AppAction<P, M> extends Action {
  payload?: P;
  meta?: M;
}

export type CallbackMeta = {
  callback: NewGpxCallback
};

export type NewGpxCallback = (success: Promise<boolean> | boolean) => void;
