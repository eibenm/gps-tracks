export interface AppState {
  test: object | null;
  gpx: object | null;
}

export interface Track {
  id: number;
  name: string;
  geojson: string;
}

export interface GPXFormData {
  name: string | null;
  file: File | null;
}

export type NewGpxCallback = (success: Promise<boolean> | boolean) => void;
